// import { indexedDB } from '../__mocks__/indexeddb-data';
import IndexedDB from 'fake-indexeddb';
import Commands from '../';



describe('Stores', () => {
  let commands = null;

  beforeAll(() => {
    global.indexedDB = IndexedDB;
    require('../__mocks__/indexeddb-data');

    commands = new Commands('test', 2);
  });

  afterAll(() => {
    delete global.indexedDB;
  });

  test('', () => {
    // const stores = await commands.exec('GET_STORES_NAMES');

    // expect(stores).toEqual(['ebooks']);
    // console.log(stores);
  });


});
