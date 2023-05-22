import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBtfsaXvs7U9_agDx1UYNkoA8mRkFE8YRw",
  authDomain: "ameenmohammed-fcae3.firebaseapp.com",
  projectId: "ameenmohammed-fcae3",
  storageBucket: "ameenmohammed-fcae3.appspot.com",
  messagingSenderId: "524660464296",
  appId: "1:524660464296:web:20418eefe1ca573491809d",
  measurementId: "G-FYZJ8DYKLJ"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app) //authendication db eduthuh
const db = getFirestore(app);
const storage = getStorage(app)
export {db,auth,storage}