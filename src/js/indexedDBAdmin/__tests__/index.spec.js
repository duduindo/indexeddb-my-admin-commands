import IndexedDBAdmin from '../';


describe('Tests all', () => {
  let indexedDBAdmin = null;

  beforeAll(() => {
    require('../__mocks__/indexeddb-data.js');

    indexedDBAdmin = new IndexedDBAdmin('test', 1);
  });


  describe('Store', () => {
    test('Should return list store names', async () => {
      const names = await indexedDBAdmin.getStoreNamesToArray();

      expect(names).toEqual(['books']);
    });
  });


  describe('Object Store', () => {
    test('Should return list object stores of keyPath match', async () => {
      const list = await indexedDBAdmin.getAllKeysFromObjectStore('books');

      expect(list).toEqual([123456, 234567, 345678]);
    });

    test('Should return list object stores', async () => {
      const list = await indexedDBAdmin.getAllValuesFromObjectStore('books');
      const result = [
        { title: 'Quarry Memories', author: 'Fred', isbn: 123456 },
        { title: 'Water Buffaloes', author: 'Fred', isbn: 234567 },
        { title: 'Bedrock Nights', author: 'Barney', isbn: 345678 }
      ];

      expect(list).toEqual(result);
    });

    test('Should return full object stores', async () => {
      const list = await indexedDBAdmin.getAllFromObjectStore('books');
      const result = {
        keyPath: 'isbn',
        keys: [ 123456, 234567, 345678 ],
        values:[
          { title: 'Quarry Memories', author: 'Fred', isbn: 123456 },
          { title: 'Water Buffaloes', author: 'Fred', isbn: 234567 },
          { title: 'Bedrock Nights', author: 'Barney', isbn: 345678 }
        ]
      };

      expect(list).toEqual(result);
    });
  });


  describe('Cursors', () => {
    test('Should return values', async () => {
      const list = await indexedDBAdmin.getCursors('books');
      const result = [
        { title: 'Quarry Memories', author: 'Fred', isbn: 123456 },
        { title: 'Water Buffaloes', author: 'Fred', isbn: 234567 },
        { title: 'Bedrock Nights', author: 'Barney', isbn: 345678 }
      ];

      expect(list).toEqual(result);
    });
  });
});
