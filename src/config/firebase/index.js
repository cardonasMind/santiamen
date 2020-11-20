import firebase from "firebase/app";
import firebaseConfig from "./config";

import "firebase/firestore";
import "firebase/auth";
import "firebase/storage"

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;