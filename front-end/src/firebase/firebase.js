import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDCcIHBtuLqa_0KXJi8w4ndpao7I2kFKHw",
  authDomain: "aushadhimitra-ef844.firebaseapp.com",
  databaseURL: "https://aushadhimitra-ef844-default-rtdb.firebaseio.com",
  projectId: "aushadhimitra-ef844",
  storageBucket: "aushadhimitra-ef844.firebasestorage.app",
  messagingSenderId: "273374219403",
  appId: "1:273374219403:web:32862fdc62f839f759d88e",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const database = firebase.database();

export { auth, database};
