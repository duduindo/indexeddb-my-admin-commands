import IndexedDBAdmin from '../indexedDBAdmin';

class Commands {
  constructor(name, version = 1) {
    const cache = [];

    this.request = new IndexedDBAdmin(name, version);
  }


}


export default Commands;
