
const NAME = 'gih-reservations';
const VERSION = 2;
let CALLED = false;


class IndexedDBAdmin {
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
  async objectStore(name, mode = 'readonly') {
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
    const objectStore = await this.objectStore(name);

    return new Promise((resolve, reject) => {
      const keys = objectStore.getAllKeys();

      keys.onsuccess = (e, i) => resolve(e.target.result);
      keys.onerror = reject;
    });
  }

  // @public
  async getAllValuesFromObjectStore(name) {
    const objectStore = await this.objectStore(name);

    return new Promise((resolve, reject) => {
      const keys = objectStore.getAll();

      keys.onsuccess = (e, i) => resolve(e.target.result);
      keys.onerror = reject;
    });
  }

  // @public
  async getAllFromObjectStore(name) {
    const { keyPath } = await this.objectStore(name);
    const keys = await this.getAllKeysFromObjectStore(name);
    const values = await this.getAllValuesFromObjectStore(name);

    return {keyPath, keys, values};
  }
}

export default IndexedDBAdmin;

// const i = new IndexedDBAdmin(NAME, VERSION);

// i.getStoreNamesToArray().then(e => console.log(e)).catch(e => console.error(e));
// i.getAllKeysFromObjectStore('reservations').then(e => console.log(e)).catch(e => console.error(e));
// i.getAllValuesFromObjectStore('reservations').then(e => console.log(e)).catch(e => console.error(e));
// i.getAllFromObjectStore('reservations').then(e => console.log(e)).catch(e => console.error(e));
