
import { ApiClient, Update } from "b3-store-ts/dist/ApiClient";
import { Command, Nop } from "b3-store-ts/dist/protocol/v100";

interface IFixture {
    client: IClient;
    store: IStore;
}

interface IStore {
    insert(thing: any) : Promise<void>;
    getEntity(id: string) : Promise<any>;
}

interface IClient {
    commit(update: Update | Nop) : Promise<any>;
}


class SimpleFixture implements IFixture {
    client: IClient;
    store: IStore;

    constructor() {
        const apiClient = new ApiClient();
        this.client = apiClient;

        this.store = {
            insert(a: any) {
                return Promise.resolve();
            },
            getEntity(id: string) {
                return Promise.resolve({});
            }
        }
    }
}


export {
     IFixture,
     IStore,
     IClient,
     SimpleFixture
};
