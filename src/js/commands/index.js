const IndexedDBAdmin = require('../indexedDBAdmin')
const Tab = require('../tab')


class Commands {
  constructor(props) {
    this.action = {}
  }

  async handleIndexedDB() {
    const { type, payload } = this.action
    const request = new IndexedDBAdmin(payload.name, payload.version)

    switch(type) {
      case 'GET_DATABASE_TREE':
        return request.getDatabaseTree(payload.store);
        break;

      default:
        throw new Error('Error default command');
    }

    return request
  }

  async handleTab() {
    const { type, payload } = this.action
    const request = new Tab()

    switch(type) {
      case 'GET_TAB_HOST':
        return request.getHost();
        break;

      default:
        throw new Error('Error default command');
    }

    return request
  }

  reducer() {
    const { type } = this.action
    let request = null

    if (type.startsWith('GET_DATABASE')) {
      request = this.handleIndexedDB()
    }

    if (type.startsWith('GET_TAB')) {
      request = this.handleTab()
    }

    return request
  }

  async exec(action) {
    this.action = action

    if (action['type']) {
      try {
        return {
          data: await this.reducer(action),
          origin: window.location.host,
          type: action.type
        }
      } catch(err) {
        return {
          data: null,
          origin: window.location.host,
          type: 'ERROR'
        }
      }
    }
  }
}

module.exports = Commands
