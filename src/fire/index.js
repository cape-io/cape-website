import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDNuZRCjZuq7P5mHsbG_68E9bOK-wCngeo',
  authDomain: 'cape-io.firebaseapp.com',
  databaseURL: 'https://cape-io.firebaseio.com',
  storageBucket: 'cape-io.appspot.com',
}
firebase.initializeApp(config)

export const TIMESTAMP = firebase.database.ServerValue.TIMESTAMP
export const auth = firebase.auth()
export const googleAuth = new firebase.auth.GoogleAuthProvider()
googleAuth.addScope('https://www.googleapis.com/auth/plus.login')
export const db = firebase.database().ref()
export const entity = db.child('entity')
