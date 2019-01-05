//import IndexedDB from 'fake-indexeddb';
//import IDBKeyRange from 'fake-indexeddb/lib/FDBKeyRange';

const request = global.indexedDB.open('test', 1);

request.onupgradeneeded = function () {
  const db = request.result;
  const store = db.createObjectStore('books', { keyPath: 'isbn' });

  //store.createIndex('by_title', 'title', { unique: true });

  store.put({ title: 'Quarry Memories', author: 'Fred', isbn: 123456 });
  store.put({ title: 'Water Buffaloes', author: 'Fred', isbn: 234567 });
  store.put({ title: 'Bedrock Nights',  author: 'Barney', isbn: 345678 });
}


//export { request as indexedDB };
