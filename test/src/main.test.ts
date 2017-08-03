import { RestClient } from 'typed-rest-client/RestClient';
import { expect } from 'chai'

const bbCommitApiUrl = process.env.BB_API_URL || 'http://localhost:7770/';

console.log('base url', bbCommitApiUrl);


abstract class Update {
    constructor(public id: number) {}
    public type: string;
}

function update<T extends {new(...args:any[]):{}}>(target: T) {
    return class extends target {
        updateType = target.name
    }
}


@update
class Nop extends Update {
    
}

@update
class CreateProduct extends Update {
    
}


describe('updater', () => {
    let api: RestClient;

    before(async () => {
        api = new RestClient('bb-client', bbCommitApiUrl);
    });

    it('api is available', async () => {
        const resp = await api.get('prod/hello');
        expect(resp.statusCode).to.equal(200);
    });

    it('can commit update', async () => {        
        const update = new Nop(1);

        const response = await api.create('prod/update', update);
        
        expect(response.statusCode).to.equal(200);
        expect(response.result).to.eql({ ok: true });
    });

});


//For purposes of testing, need to be able to summon
//auxiliary services, close them down, etc.
//
//eg to test that updates can also be fetched - we need to summon fresh updater and data store each time
//(or maybe everything can be namespaced to avoid recreation)
