export class EntityOpertion {
    constructor(id, isSuccess = false, error = '') {
        this.id = id;
        this.isSuccess = isSuccess;
        this.error = error;
    }
}
export class RecDefinition {
    constructor(primaryKey, code, value, description, dateCreate = new Date(Date.now()), dateUpdate = dateCreate) {
        this.primaryKey = primaryKey;
        this.code = code;
        this.value = value;
        this.description = description;
        this.dateCreate = dateCreate;
        this.dateUpdate = dateUpdate;
    }
}
;
export class Source {
    constructor(name) {
        this._name = name;
    }
    static get instance() {
        return this._instance;
    }
    static Create(name = 'FirstWebDB') {
        if (!Source._instance) {
            this._instance = new Source(name);
        }
    }
    get db() {
        if (this._db) {
            return this._db;
        }
        else {
            throw `${this._name}: IndexedDB was not open!`;
        }
    }
    Open(resolve) {
        if (!window.indexedDB) {
            throw 'This browser does not support IndexedDB';
        }
        this._openRequest = indexedDB.open(this._name, 1);
        this._openRequest.onupgradeneeded = (e) => { this.OnOpenUpgradeNeeded(e); };
        this._openRequest.onsuccess = (e) => { this.OnOpenSuccess(e, resolve); };
        this._openRequest.onerror = (e) => { this.OnOpenError(e); };
    }
    AddDicDefinition(rec, resolve, reject) {
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
    UpdateDicDefinition(rec, resolve, reject) {
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
    LoadDicDefinition(records, resolve) {
        let transaction = this.db.transaction(Source.objDefinitions);
        let definitions = transaction.objectStore(Source.objDefinitions);
        let idbRequest = definitions.openCursor();
        idbRequest.onsuccess = (e) => { this.OnLoad(e, records, resolve); };
        idbRequest.onerror = () => { throw (`Error ${idbRequest.error.code}-${idbRequest.error.name}\n${idbRequest.error.message}`); };
    }
    RemoveDicDefinition(entities, resolve, reject) {
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
    OnOpenUpgradeNeeded(e) {
        this._db = e.target.result;
        switch (this._db.version) {
            case 1: this.DBInitOne();
        }
    }
    DBInitOne() {
        let objStore = this._db.createObjectStore('Definitions', { keyPath: 'primaryKey', autoIncrement: true });
        objStore.createIndex('code_idx', 'code', { unique: true });
        objStore.createIndex('value-idx', 'value', { unique: true });
    }
    OnOpenSuccess(e, resolve) {
        this._db = e.target.result;
        resolve(true);
    }
    OnOpenError(e) {
        throw (`Error ${this._openRequest.error.code}-${this._openRequest.error.name}\n${this._openRequest.error.message}`);
    }
    OnLoad(e, records, resolve) {
        let cursor = event.target.result;
        if (cursor) {
            records.push(new RecDefinition(cursor.value.primaryKey, cursor.value.code, cursor.value.value, cursor.value.description, cursor.value.dateCreate, cursor.value.dateUpdate));
            cursor.continue();
        }
        else {
            resolve(true);
        }
    }
}
Source.objDefinitions = 'Definitions';
Source._instance = undefined;
//# sourceMappingURL=_firstwebdb.js.map