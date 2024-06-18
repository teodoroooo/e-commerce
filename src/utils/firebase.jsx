
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, writeBatch } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SANDER_ID,
  appId: import.meta.env.VITE_APP_ID,
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore()

export const addCollentionAdDocuments = async (collentionKey, objectsToAdd) => {
  const collectionRef = collection(db, collentionKey)
  const batch = writeBatch(db)

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  })

  await batch.commit()
  console.log("done")
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef)

  const querySnapShot = await getDocs(q)
  const categoryMap  = querySnapShot.docs.reduce((acc, docSnapShot) => {
    const { title, items } = docSnapShot.data()
    acc[title.toLowerCase()] = items
    return acc
  }, {})

  return categoryMap
}

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt:'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)


export const createAuthUserWithEmailPassword = async (email, password) => {
  if (!email || !password) return 

  return await createUserWithEmailAndPassword(auth, email, password)
}

export const createUserDocumentFromAuth = async (userAuth, informacoesAdicionais = {}) => {
  if (!userAuth) return

  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapShot = await getDoc(userDocRef)

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...informacoesAdicionais
      })
    } catch (e) {
      console.log(e.message)
    }
  }

  return userDocRef
}

export const signInAuthUserWithEmailPassword = async (email, password) => {
  if (!email || !password) return 
  
  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutAuthUser = async () => {
  await signOut(auth)
}

export const onAuthStateChangeListerner = (callback) => onAuthStateChanged(auth, callback)