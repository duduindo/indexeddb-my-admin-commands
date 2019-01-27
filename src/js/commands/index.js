import IndexedDBAdmin from '../indexedDBAdmin';


class Commands {
  reducer(action) {
    const { type, payload } = action;
    const request = new IndexedDBAdmin(payload.name, payload.version);

    switch(action.type) {
      case 'GET_STORE_NAMES_TO_ARRAY':
        return request.getStoreNamesToArray();
        break;

      case 'GET_ALL_OBJECT_STORE':
        return request.getAllFromObjectStore(payload.store);
        break;

      case 'GET_DATABASE_TREE':
        return request.getDatabaseTree(payload.store);
        break;

      default:
        return 'Error default command';
    }
  }

  async exec(action) {
    if (action['type'] || payload['payload']['name'] || payload['payload']['version']) {
      try {
        return await this.reducer(action);
      } catch(err) {
        console.error(err);
      }
    }
  }
}


export default Commands;
