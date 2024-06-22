import { useState, useEffect } from 'react'
import {
  collection,
  query,
  where,
  onSnapshot,
  Query,
  CollectionReference,
  WhereFilterOp,
  orderBy
} from 'firebase/firestore'
import { db } from '~/firebase/confg'

interface Condition {
  fieldName: string
  operator: WhereFilterOp
  compareValue: string | string[] // Cho phép compareValue là string hoặc một mảng string
}

const useFireStore = <T extends { id: string }>(collectionName: string, condition?: Condition): T[] => {
  const [documents, setDocuments] = useState<T[]>([])

  useEffect(() => {
    const collectionRef: CollectionReference = collection(db, collectionName)
    let q: Query = collectionRef

    if (condition && condition.compareValue !== undefined) {
      q = query(
        collectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue),
        orderBy('createdAt')
      )
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data()
          }) as T
      )
      setDocuments(docs)
    })

    // Cleanup listener khi component unmount
    return () => unsubscribe()
  }, [collectionName, condition])

  return documents
}

export default useFireStore
