export class EntityOpertion {
    constructor(
        public id: number,
        public isSuccess: boolean = false,
        public error: string = ''
    ) { }
}

export class RecDefinition {
    primaryKey: number;
    code: string;
    value: string;
    description: string
    dateCreate: Date;
    dateUpdate: Date;
    constructor(
        primaryKey: number,
        code: string,
        value: string,
        description: string,
        dateCreate: Date = new Date(Date.now()),
        dateUpdate: Date = dateCreate
    ) {
        this.primaryKey = primaryKey;
        this.code = code;
        this.value = value;
        this.description = description;
        this.dateCreate = dateCreate;
        this.dateUpdate = dateUpdate;
    }
};

export class Source {

    // Sourse objects
    static objDefinitions: string = 'Definitions';
    // Fields
    private _name: string;
    private _openRequest: IDBOpenDBRequest;
    private _db: IDBDatabase;

    // Singleton
    private static _instance: Source = undefined;
    private constructor(name: string) {
        this._name = name;
    }
    static get instance(): Source {
        return this._instance;
    }
    static Create(
        name: string = 'FirstWebDB'
    ): void {
        if (!Source._instance) {
            this._instance = new Source(
                name
            );
        }
    }

    // Properties
    get db(): IDBDatabase {
        if (this._db) {
            return this._db;
        } else {
            throw `${this._name}: IndexedDB was not open!`;
        }
    }

    // Methods
    Open(resolve): void {
        if (!window.indexedDB) {
            throw 'This browser does not support IndexedDB';
        }
        this._openRequest = indexedDB.open(this._name, 1);
        this._openRequest.onupgradeneeded = (e) => { this.OnOpenUpgradeNeeded(e); };
        this._openRequest.onsuccess = (e) => { this.OnOpenSuccess(e, resolve); };
        this._openRequest.onerror = (e) => { this.OnOpenError(e); };
    }

    // Methods for manipulating data
    AddDicDefinition(rec: RecDefinition, resolve, reject): void {
        let transaction = this.db.transaction(Source.objDefinitions, 'readwrite');
        let definitions = transaction.objectStore(Source.objDefinitions);
        let idbRequest = definitions.add({
            code: rec.code,
            value: rec.value,
            description: rec.description,
            dateCreate: rec.dateCreate,
            dateUpdate: rec.dateUpdate
        });
        idbRequest.onsuccess = () => { resolve(true); };
        idbRequest.onerror = () => { reject(`Error ${idbRequest.error.code}-${idbRequest.error.name}\n${idbRequest.error.message}`); };
    }

    UpdateDicDefinition(rec: RecDefinition, resolve, reject): void {
        let transaction = this.db.transaction(Source.objDefinitions, 'readwrite');
        let definitions = transaction.objectStore(Source.objDefinitions);
        let idbRequest = definitions.put({
            primaryKey: rec.primaryKey,
            code: rec.code,
            value: rec.value,
            description: rec.description,
            dateCreate: rec.dateCreate,
            dateUpdate: rec.dateUpdate
        });
        idbRequest.onsuccess = () => { resolve(true); };
        idbRequest.onerror = () => { reject(`Error ${idbRequest.error.code}-${idbRequest.error.name}\n${idbRequest.error.message}`); };
    }

    LoadDicDefinition(records: RecDefinition[], resolve): void {
        let transaction = this.db.transaction(Source.objDefinitions);
        let definitions = transaction.objectStore(Source.objDefinitions);
        let idbRequest = definitions.openCursor();
        idbRequest.onsuccess = (e) => { this.OnLoad(e, records, resolve); };
        idbRequest.onerror = () => { throw (`Error ${idbRequest.error.code}-${idbRequest.error.name}\n${idbRequest.error.message}`); };
    }

    RemoveDicDefinition(entities: EntityOpertion[], resolve, reject): void {
        let transaction = this.db.transaction(Source.objDefinitions, 'readwrite');
        let definitions = transaction.objectStore(Source.objDefinitions);
        let count = 0;
        for (let entity of entities) {
            let idbRequest = definitions.delete(entity.id);
            idbRequest.onsuccess = () => {
                entity.isSuccess = true;
                count++;
                if (count == entities.length) {
                    resolve(true);
                }
            };
            idbRequest.onerror = () => {
                entity.isSuccess = false;
                entity.error = `Error ${idbRequest.error.code}-${idbRequest.error.name}\n${idbRequest.error.message}`;
                reject(entity.error);
            };
        }
    }


    // Helpers
    private OnOpenUpgradeNeeded(e: IDBVersionChangeEvent) {
        this._db = (<IDBOpenDBRequest>e.target).result;
        switch (this._db.version) {
            case 1: this.DBInitOne();
        }
    }

    private DBInitOne(): void {
        let objStore = this._db.createObjectStore('Definitions', { keyPath: 'primaryKey', autoIncrement: true });
        objStore.createIndex('code_idx', 'code', { unique: true });
        objStore.createIndex('value-idx', 'value', { unique: true });
    }

    private OnOpenSuccess(e: Event, resolve) {
        this._db = (<IDBOpenDBRequest>e.target).result;
        resolve(true);
    }

    private OnOpenError(e: Event) {
        throw (`Error ${this._openRequest.error.code}-${this._openRequest.error.name}\n${this._openRequest.error.message}`);
    }

    private OnLoad(e: Event, records: RecDefinition[], resolve) {
        let cursor: IDBCursorWithValue = (<IDBRequest>event.target).result;
        if (cursor) {
            records.push(new RecDefinition(
                <number>cursor.value.primaryKey,
                <string>cursor.value.code,
                <string>cursor.value.value,
                <string>cursor.value.description,
                <Date>cursor.value.dateCreate,
                <Date>cursor.value.dateUpdate
            ));
            cursor.continue();
        } else {
            resolve(true);
        }
    }

}
