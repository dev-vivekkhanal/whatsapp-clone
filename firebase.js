import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC34bnsXwO_jLwtG3oc-pFRdTTatyETsK0",
  authDomain: "whatsapp-v3-5239a.firebaseapp.com",
  projectId: "whatsapp-v3-5239a",
  storageBucket: "whatsapp-v3-5239a.appspot.com",
  messagingSenderId: "1028625185421",
  appId: "1:1028625185421:web:818d0eddc0c436922700c4",
  measurementId: "G-0ZSWWN0VKQ",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
