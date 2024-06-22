import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from './confg'

export const addDocument = async (collectionName: string, data: object) => {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp()
  })

  return docRef
}

// tao keywords cho displayName, su dung cho search
export const generateKeywords = (displayName: string): string[] => {
  // liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
  // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
  const name: string[] = displayName.split(' ').filter((word) => word)

  const length: number = name.length
  const flagArray: boolean[] = []
  const result: string[] = []
  const stringArray: string[] = []

  /**
   * khoi tao mang flag false
   * dung de danh dau xem gia tri
   * tai vi tri nay da duoc su dung
   * hay chua
   **/
  for (let i = 0; i < length; i++) {
    flagArray[i] = false
  }

  const createKeywords = (name: string): string[] => {
    const arrName: string[] = []
    let curName = ''
    name.split('').forEach((letter) => {
      curName += letter
      arrName.push(curName)
    })
    return arrName
  }

  const findPermutation = (k: number): void => {
    for (let i = 0; i < length; i++) {
      if (!flagArray[i]) {
        flagArray[i] = true
        result[k] = name[i]

        if (k === length - 1) {
          stringArray.push(result.join(' '))
        }

        findPermutation(k + 1)
        flagArray[i] = false
      }
    }
  }

  findPermutation(0)

  const keywords: string[] = stringArray.reduce<string[]>((acc, cur) => {
    const words: string[] = createKeywords(cur)
    return [...acc, ...words]
  }, [])
  return keywords
}
