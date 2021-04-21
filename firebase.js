import * as firebase from "firebase"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAhKJ2b3ez9U_cyYAx5FG7qpORwODEBDtM",
    authDomain: "signal-clone-e2ed1.firebaseapp.com",
    projectId: "signal-clone-e2ed1",
    storageBucket: "signal-clone-e2ed1.appspot.com",
    messagingSenderId: "3477298879",
    appId: "1:3477298879:web:879a04990486bd7130f00a"
};


// Only initialize app if it hasnt been -- OPTIMIZATION
let app

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

const db = app.firestore()
const auth = firebase.auth()

export { db, auth }