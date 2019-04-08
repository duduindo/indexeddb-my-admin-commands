import IndexedDBFake from 'fake-indexeddb';
import lodash from 'lodash'
import IDBKeyRange from 'fake-indexeddb/lib/FDBKeyRange';


global.indexedDB = IndexedDBFake;
global.IDBKeyRange = IDBKeyRange;
global._ = lodash;
