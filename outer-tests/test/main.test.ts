import { RestClient } from 'typed-rest-client/RestClient'
import { expect } from 'chai'
import { Nop, PutProduct, PutImage } from 'b3-store-ts'
import { IFixture, SimpleFixture } from './fixtures'
import * as _ from 'lodash'

const bbCommitApiUrl = process.env.BB_API_URL || 'http://localhost:7770/';

console.log('base url', bbCommitApiUrl);


const fx : IFixture = new SimpleFixture();


describe('updater', () => {
    let fx: IFixture;

    before(async () => {
        fx = new SimpleFixture();
    });

    it('can commit a Nop', async () => {
        const result = await fx.client.commit(new Nop());
        expect(result).to.be.true;
    });

    it('committed events appear immediately in local repo', async () => {
        const events = _.range(0, 5)
                        .map(i => new PutProduct({ productId: `p${i}` }));

        const results = await Promise.all(
                            events.map(ev => fx.client.commit(ev))
                        );

        results.forEach(r => {
            expect(r).to.be.true;
        });       

        const stored = await fx.store.getEvents(0, 5);
        expect(stored).to.eql(events);
    });


    describe('on updating a product', () => {
        it('product is accepted', async () => {        
            const update = new PutProduct();
            const result = await fx.client.commit(update);
            expect(result).to.be.true;
        });




        it('once committed, product is summonable', async () => {
            const update = new PutProduct({ productId: '123' });
            const result = await fx.client.commit(update);

            const stored = await fx.store.getEntity('123');
            expect(stored).to.be.instanceOf(PutProduct);
        });

        //the idea is to have both server and client-side aggregation of events, using the same
        //underlying stuff. So: server-side indices will build the same as client-side ones, for instance.

        //the store is then an interface of use, behind which data is aggregated nicely.
        //you put to it, magical aggregations happen. The idea is to use scala for the aggregation magic.

        //So, when putting a product, we expect our local repository to be updated.
        //But we also expect it to be appended to the log. This is our first concern: persistence.

        //So, the simplest guarantee, is: on flush, future repositories can see what we've sent.
        //This goes for hosting on AWS too. Simples.

    });

});


//For purposes of testing, need to be able to summon
//auxiliary services, close them down, etc.
//
//eg to test that updates can also be fetched - we need to summon fresh updater and data store each time
//(or maybe everything can be namespaced to avoid recreation)
