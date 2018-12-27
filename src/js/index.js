
const NAME = 'gih-reservations';
const VERSION = 2;
let CALLED = false;


class IndexedDBMySQL {
  constructor(name, version) {
    this.name = name;
    this.version = version;
  }

  // @private
  open() {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.name, this.version);

      request.onsuccess = resolve;
      request.onerror = reject;
    });
  }

  // @private
  async objectStore(name, mode) {
    const db = await this.open();

    return db.target.result.transaction(name, mode).objectStore(name);
  }

  // @public
  async getStoreNamesToArray() {
    const db = await this.open();
    const list = db.target.result.objectStoreNames;
    const arList = [];

    for (let n = 0; n < list.length; n++)
      arList.push(list.item(n));

    return arList;
  }

  // @public
  async getAllKeysFromObjectStore(name) {
    const objectStore = await this.objectStore(name, 'readonly');

    return new Promise((resolve, reject) => {
      const keys = objectStore.getAllKeys();

      keys.onsuccess = (e, i) => resolve(e.target.result);
      keys.onerror = reject;
    });
  }

  // @public
  async getAllValuesFromObjectStore(name) {
    const objectStore = await this.objectStore(name, 'readonly');

    return new Promise((resolve, reject) => {
      const keys = objectStore.getAll();

      keys.onsuccess = (e, i) => resolve(e.target.result);
      keys.onerror = reject;
    });
  }

  // @public
  async getAllFromObjectStore(name) {
    const { keyPath } = await this.objectStore(name, 'readonly');
    const keys = await this.getAllKeysFromObjectStore(name);
    const values = await this.getAllValuesFromObjectStore(name);

    return {keyPath, keys, values};
  }
}

export default IndexedDBMySQL;

// const i = new IndexedDBMySQL(NAME, VERSION);

// i.getStoreNamesToArray().then(e => console.log(e)).catch(e => console.error(e));
