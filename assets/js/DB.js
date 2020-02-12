/**
 * indexedDBを用いたデータベース 雛形クラス
 *
 **/

export class DB {
    constructor(dbName, storeName, keyName) {
        this.dbName = dbName;
        this.storeName = storeName;
        this.keyName = keyName;
    }

    static get DB_NAME() {
        return this.dbName;
    }
    static get STORE_NAME() {
        return this.storeName;
    }

    //DB接続 async connect() はインデックス定義などもあるので個々のDBクラスに実装する

    getTransaction(stores, readWrite = 'readwrite') {
        return this.db.transaction(stores, readWrite);
    }

    getStore() {
        return this.getTransaction([this.storeName]).objectStore(this.storeName);
    }

    add(data) {
        const store = this.getStore().add(data);
        store.onsuccess = function() {
            console.log('save success.');
        };
    }

    remove(id) {
        console.log(id);
        const store = this.getStore().delete(id);
        store.onsuccess = function() {
            console.log('delete success.');
        };
    }

    update(id, data) {
        data[this.keyName] = id;
        const store = this.getStore().put(data);
        store.onsuccess = function() {
            console.log('update success.');
        };
    }

    //requestオブジェクトの形で取得 onsuccessでデータが得られた後の処理を実装
    async get(id) {
        return new Promise((resolve, reject) => {
            var req = this.getStore().get(id);
            req.onsuccess = function() {
                var row = req.result;
                resolve(row);
            };
            req.onerror = reject;
        });
    }

    //件数取得
    async getCount() {
        return new Promise((resolve, reject) => {
            const store = this.getStore();
            var countReq = store.count();
            countReq.onsuccess = function() {
                resolve(countReq.result);
            };
        });
    }

    //全件取得
    async getAll() {
        return new Promise((resolve, reject) => {
            let rows = [];
            const store = this.getStore();
            store.openCursor().onsuccess = function(event) {
                var cursor = event.target.result;
                if (cursor) {
                    var row = cursor.value;
                    rows.push(row);
                    cursor.continue();
                }
                resolve(rows);
            };
        });
    }


}

