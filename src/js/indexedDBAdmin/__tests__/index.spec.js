import IndexedDBAdmin from '../';


describe('Tests all', () => {
  let indexedDBAdminBooks = null;
  let indexedDBAdminCar = null;

  beforeAll(() => {
    require('../__mocks__/indexeddb-library.js');
    //require('../__mocks__/indexeddb-concessionaire.js');

    indexedDBAdminBooks = new IndexedDBAdmin('library', 1);
    //indexedDBAdminCar = new IndexedDBAdmin('concessionaire', 2);
  });


  describe('Store', () => {
    test('Should return list store names', async () => {
      const names = await indexedDBAdminBooks.getStoreNamesToArray();

      expect(names).toEqual(['books', 'e-readers']);
    });
  });

  describe('Store and Indexes', () => {
    test('Should tree store names and indexes', async () => {
      const tree = await indexedDBAdminBooks.getTree();
      const result = [
        {
          storeName: 'books',
          indexNames: [ 'by_title' ]
        },
        {
          storeName: 'e-readers',
          indexNames: [ 'by_maker', 'by_title' ]
        }
      ];

      expect(tree).toEqual(result);
    });
  });

  describe('Object Store', () => {
    test('Should return list object stores of keyPath match', async () => {
      const list = await indexedDBAdminBooks.getAllKeysFromObjectStore('books');

      expect(list).toEqual([123456, 234567, 345678]);
    });

    test('Should return list object stores', async () => {
      const list = await indexedDBAdminBooks.getAllValuesFromObjectStore('books');
      const result = [
        { title: 'Quarry Memories', author: 'Fred', isbn: 123456 },
        { title: 'Water Buffaloes', author: 'Fred', isbn: 234567 },
        { title: 'Bedrock Nights', author: 'Barney', isbn: 345678 }
      ];

      expect(list).toEqual(result);
    });

    test('Should return full object stores', async () => {
      const list = await indexedDBAdminBooks.getAllFromObjectStore('books');
      const result = {
        keyPath: 'isbn',
        keys: [ 123456, 234567, 345678 ],
        values: [
          { title: 'Quarry Memories', author: 'Fred', isbn: 123456 },
          { title: 'Water Buffaloes', author: 'Fred', isbn: 234567 },
          { title: 'Bedrock Nights', author: 'Barney', isbn: 345678 }
        ]
      };

      expect(list).toEqual(result);
    });

    test('Should return list indexes from Store', async () => {
      const listBooks = await indexedDBAdminBooks.getIndexesFromObjectStore('books');
      const listReaders = await indexedDBAdminBooks.getIndexesFromObjectStore('e-readers');

      expect(listBooks).toEqual(['by_title']);
      expect(listReaders).toEqual(['by_maker', 'by_title']);
    });
  });


  describe('Cursors', () => {
    test('Should return values', async () => {
      const list = await indexedDBAdminBooks.getCursors('books');
      const result = [
        { title: 'Quarry Memories', author: 'Fred', isbn: 123456 },
        { title: 'Water Buffaloes', author: 'Fred', isbn: 234567 },
        { title: 'Bedrock Nights', author: 'Barney', isbn: 345678 }
      ];

      expect(list).toEqual(result);
    });
  });
});
