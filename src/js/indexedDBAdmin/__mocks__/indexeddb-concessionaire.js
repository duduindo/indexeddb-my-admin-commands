const request = global.indexedDB.open('concessionaire', 2);

request.onupgradeneeded = function () {
  const db = request.result;
  const store = db.createObjectStore('cars', { keyPath: 'code' });

  store.createIndex('by_price', 'price', { unique: false });

  store.put({ title: 'Red car', price: 15000, code: 123 });
  store.put({ title: 'Green car', price: 10000, code: 1234 });
  store.put({ title: 'Blue car', price: 21500, code: 12345 });
}


