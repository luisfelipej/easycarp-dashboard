import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: `AIzaSyAntxIw_7SEH_HtidwH5RtZdFNJfBw0cFc`,
  authDomain: `easycarp-748d1.firebaseapp.com`,
  databaseURL: `https://easycarp-748d1.firebaseio.com`,
  projectId: `easycarp-748d1`,
  storageBucket: `easycarp-748d1.appspot.com`,
  messagingSenderId: `419881116262`,
  appId: `1:419881116262:web:5254e3160afd442c5543a7`,
  measurementId: `G-TLWTEXZ73H`,
}

// Inicializacion de app firebase
const app = firebase.initializeApp(firebaseConfig)
// auth
export const auth = app.auth()
// db
export const userRef = app.firestore().collection(`users`)
export const taskRef = app.firestore().collection(`tasks`)
// storage
export const storage = app.storage()
export const storageRef = storage.ref()

export default app
