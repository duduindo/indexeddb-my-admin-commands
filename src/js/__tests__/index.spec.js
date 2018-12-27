import { indexedDB } from '../__mocks__/indexeddb-data';
import IndexedDBMySQL from '../';

// const i = new IndexedDBMySQL(NAME, VERSION);
// i.getStoreNamesToArray().then(e => console.log(e)).catch(e => console.error(e));


describe('Stores', () => {

  beforeAll(() => {
    global.indexedDB = indexedDB;
  });

  afterAll(() => {
    delete global.indexedDB;
  });


  test('List Stores', () => {
    // const i = new IndexedDBMySQL('test', 3);

    // i.open();

    // i.getStoreNamesToArray()
    //   .then(e => console.log(e))
    //   .catch(e => console.error(e));

    // const request = window.indexedDB.open('test', 1);

    console.log(window.indexedDB);

  });

});
