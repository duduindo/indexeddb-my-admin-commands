
import Commands from '../'


describe('Tests all', () => {
  let command = null

  beforeAll(() => {
    require('../../indexedDBAdmin/__mocks__/indexeddb-library.js')

    command = new Commands
  })

  describe('IndexedDB', () => {
    test('Should tree store names and indexes', async () => {
      const action = {
        type: 'GET_DATABASE_TREE',
        payload: {
          name: 'library',
          version: 1,
        },
        origin: window.location.host
      }

      const result = {
        type: 'GET_DATABASE_TREE',
        data: {
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
        },
        origin: window.location.host
      }

      const data = await command.exec(action)

      expect(data).toEqual(result)
    })
  })


  describe('Tab', () => {
    test('Should to return the host', async () => {
      const action = {
        type: 'GET_TAB_HOST'
      }

      const result = {
        data: 'localhost',
        origin: window.location.host,
        type: 'GET_TAB_HOST'
      }

      const data = await command.exec(action)

      expect(data).toEqual(result)
    })
  })
})
