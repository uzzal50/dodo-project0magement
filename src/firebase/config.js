import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyB353U47oxN3U8JSbP31n_s85KTTX_lIUE',
  authDomain: 'dodo-project-a3317.firebaseapp.com',
  projectId: 'dodo-project-a3317',
  storageBucket: 'dodo-project-a3317.appspot.com',
  messagingSenderId: '711704727598',
  appId: '1:711704727598:web:659ade98e66ece1c79cfbf',
}

//initiliz=e firebase
firebase.initializeApp(firebaseConfig)

//init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp, projectStorage }
