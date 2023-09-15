import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// This is the Put (i.e. update)  
// Added logic to a method that accepts some content and adds it to the db.
export const putDb = async (content) => {
  const jateDb = await openDB('jate', 1);

  // This function states that what's in the db can be updated.
  const tx = jateDb.transaction('jate', 'readwrite');

  // Opens the desired object store.
  const store = tx.objectStore('jate');

  // Uses the .put() method to update the db.
  const request = store.put({id: 1, value: content});

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
}

// This is the Get
// Accesses jate db with a version of 1
export const getDb = async () => {
  const jateDb = await openDB('jate', 1);

  // This function states that what's in the DB can only be read and not written to.
  const tx = jateDb.transaction('jate', 'readonly');

  // Opens the desired object store.
  const store = tx.objectStore('jate');

  // Uses the .getAll() method to get all data in db.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result.value;
}

// When this file is run, this will run the initdb function.
initdb();
