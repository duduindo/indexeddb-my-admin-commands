
import Commands from '../';


describe('Tests all', () => {
  let command = null;

  beforeAll(() => {
    require('../../indexedDBAdmin/__mocks__/indexeddb-library.js');

    command = new Commands;
  });

  test('Should return list store names', async () => {
    const action = {
      type: 'GET_STORE_NAMES_TO_ARRAY',
      payload: {
        name: 'library',
        version: 1,
      }
    };

    const data = await command.exec(action);

    expect(data).toEqual(['books', 'e-readers']);
  });

  test('Should return data from store names', async () => {
    const action = {
      type: 'GET_ALL_OBJECT_STORE',
      payload: {
        name: 'library',
        version: 1,
        store: 'books'
      }
    };

    const result = {
      keyPath: 'isbn',
      keys: [ 123456, 234567, 345678 ],
      values:[
        { title: 'Quarry Memories', author: 'Fred', isbn: 123456 },
        { title: 'Water Buffaloes', author: 'Fred', isbn: 234567 },
        { title: 'Bedrock Nights', author: 'Barney', isbn: 345678 }
      ]
    };

    const data = await command.exec(action);

    expect(data).toEqual(result);
  });

  test('Should tree store names and indexes', async () => {
    const action = {
      type: 'GET_DATABASE_TREE',
      payload: {
        name: 'library',
        version: 1,
      }
    };

    const result = {
      name: 'library',
      version: 1,
      stores: [
        {
          name: 'books',
          indexes: [ 'by_title' ]
        },
        {
          name: 'e-readers',
          indexes: [ 'by_maker', 'by_title' ]
        }
      ]
    };

    const data = await command.exec(action);

    expect(data).toEqual(result);
  });
});
