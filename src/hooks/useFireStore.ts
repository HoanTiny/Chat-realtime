import { useState, useEffect } from 'react'
import { collection, query, where, onSnapshot, Query, CollectionReference, WhereFilterOp } from 'firebase/firestore'
import { db } from '~/firebase/confg'

interface Condition {
  fieldName: string
  operator: WhereFilterOp
  compareValue: string
}

const useFireStore = <T extends { id: string; name: string }>(collectionName: string, condition: Condition): T[] => {
  const [documents, setDocuments] = useState<T[]>([])

  useEffect(() => {
    const collectionRef: CollectionReference = collection(db, collectionName)
    let q: Query

    if (condition) {
      if (condition.compareValue === '' || condition.compareValue === undefined) return

      q = query(collectionRef, where(condition.fieldName, condition.operator, condition.compareValue))
    } else {
      q = collectionRef as unknown as Query // Nếu không có điều kiện, truy vấn toàn bộ collection
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
