import { addDoc, collection } from 'firebase/firestore'
import firebase, { db } from './confg'

export const addDocument = async (collectionName: string, data: object) => {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createAt: firebase.firestore.FieldValue.serverTimestamp()
  })

  return docRef
}
