// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { getAuth, FacebookAuthProvider } from 'firebase/auth'
import firebase from 'firebase/compat/app'
const firebaseConfig = {
  apiKey: 'AIzaSyD7JWy3XtGOmoo2pu41THao2JkbBvabmNQ',
  authDomain: 'chat-app-6a751.firebaseapp.com',
  projectId: 'chat-app-6a751',
  storageBucket: 'chat-app-6a751.appspot.com',
  messagingSenderId: '19123326560',
  appId: '1:19123326560:web:d91ca64adf8dd79debbd05',
  measurementId: 'G-GFZ1E8NGYN'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)
export const fbProvider = new FacebookAuthProvider()
// fbProvider.addScope('email')
export { analytics, app, auth }
export default firebase