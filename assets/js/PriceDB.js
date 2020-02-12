import { DB } from '~/assets/js/DB.js';

class PriceDB extends DB {
    constructor() {
        super('PriceDB', 'price', 'idx_key');
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
                var store = db.createObjectStore(this.storeName, {keyPath: this.keyName});
                store.createIndex('item_id', 'item_id', {unique: false});
                store.createIndex('shop_id', 'shop_id', {unique: false});
                //store.createIndex('idx_key', 'idx_key', {unique: true});
            };

            req.onsuccess = (event) => {
                this.db = event.target.result;
                resolve(this);
            };
        });
    }

    genIdxKey(item_id, shop_id) {
        return item_id + ';' + shop_id;
    }

    //item_id+shop_id:priceの登録 既存idx_keyについては上書きする
    save(item_id, shop_id, price) {
        var idx_key = this.genIdxKey(item_id, shop_id);
        var data = {idx_key:idx_key, item_id:item_id, shop_id:shop_id, price:price, updated: Math.floor(new Date().getTime() / 1000)};
        const store = this.getStore().put(data);
        store.onsuccess = function() {
            console.log('price save success.');
        };
    }

    //item_id指定で全取得
    async getByItemId(item_id) {
        return new Promise((resolve, reject) => {
            var items = [];
            var store = this.getStore();
            var range= IDBKeyRange.only(item_id);
            var req = store.index('item_id').openCursor(range, 'next');
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
}

export default new PriceDB();

