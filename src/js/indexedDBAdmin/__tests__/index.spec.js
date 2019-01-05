import IndexedDBAdmin from '../';


describe('Tests all', () => {
  let indexedDBAdmin = null;

  beforeAll(() => {
    require('../__mocks__/indexeddb-data.js');

    indexedDBAdmin = new IndexedDBAdmin('test', 1);

    // getAllKeysFromObjectStore('reservations')
  });


  describe('Store', () => {
    test('Should return list store names', async () => {
      const names = await indexedDBAdmin.getStoreNamesToArray();

      expect(names).toEqual(['books']);
    });
  });


  describe('Object Store', () => {
    test('Should return list object stores of keyPath match', async () => {
      const objects = await indexedDBAdmin.getAllKeysFromObjectStore('books');

      expect(objects).toEqual([123456, 234567, 345678]);
    });

    // test('Should return list object stores of keyPath match', async () => {
    //   const objects = await indexedDBAdmin.getAllValuesFromObjectStore('books');

    //   expect(objects).toEqual([123456, 234567, 345678]);
    // });

    //getAllValuesFromObjectStore
  });
});
