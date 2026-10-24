import { Firestore } from '@google-cloud/firestore'

// Two interchangeable stores: Firestore (default, used on Cloud Run) and an
// in-memory one for local dev and tests (STORE=memory). Both expose create().

function firestoreStore() {
  const db = new Firestore()
  return {
    // Returns true if created, false if a doc with this id already existed.
    async create(collection, id, data) {
      try {
        await db.collection(collection).doc(id).create(data)
        return true
      } catch (err) {
        if (err.code === 6) return false // ALREADY_EXISTS
        throw err
      }
    },
  }
}

function memoryStore() {
  const data = new Map()
  return {
    data,
    async create(collection, id, doc) {
      const key = `${collection}/${id}`
      if (data.has(key)) return false
      data.set(key, doc)
      return true
    },
  }
}

export function createStore() {
  return process.env.STORE === 'memory' ? memoryStore() : firestoreStore()
}
