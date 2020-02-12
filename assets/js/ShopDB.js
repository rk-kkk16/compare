import { DB } from '~/assets/js/DB.js';

class ShopDB extends DB {
    constructor() {
        super('ShopDB', 'shop', 'shop_id');
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
                db.createObjectStore(this.storeName, {keyPath: this.keyName, autoIncrement: true});
            };

            req.onsuccess = (event) => {
                this.db = event.target.result;
                resolve(this);
            };
        });
    }
}

export default new ShopDB();

