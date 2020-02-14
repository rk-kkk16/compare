import { DB } from '~/assets/js/DB.js';

class ItemDB extends DB {
    constructor() {
        super('ItemDB', 'item', 'item_id');
    }

    //DB接続、インデックス定義
    async connect() {
        return new Promise((resolve, reject) => {
            if (this.db) {
                resolve(this);
                return;
            }

            const req = indexedDB.open(this.dbName);

            req.onupgradeneeded = (event) => {
                const db = event.target.result;
                var store = db.createObjectStore(this.storeName, {keyPath: this.keyName, autoIncrement: true});
                store.createIndex('parent_id', 'parent_id', {unique: false});
            };

            req.onsuccess = (event) => {
                this.db = event.target.result;
                resolve(this);
            };
        });
    }

    // parent_id指定してのリスト取得
    async getChilds(parent_id) {
        return new Promise((resolve, reject) => {
            var items = []; 
            var store = this.getStore();
            var range= IDBKeyRange.only(parent_id);
            var req = store.index('parent_id').openCursor(range, 'next');
            req.onsuccess = function() {
                var cursor = req.result;
                if (cursor) {
                    var row = cursor.value;
                    items.push(row);
                    cursor.continue();
                }
                resolve(items);
            };
        });
    }

    //parent_id指定、一番最後に追加したitemの取得
    async getLatestItem(parent_id) {
        return new Promise((resolve, reject) => {
            var item = null;
            var store = this.getStore();
            var range= IDBKeyRange.only(parent_id);
            var req = store.index('parent_id').openCursor(range, 'prev');
            req.onsuccess = function() {
                var cursor = req.result;
                if (cursor) {
                    item = cursor.value;
                }
                resolve(item);
            };
        });
    }
}

export default new ItemDB();

