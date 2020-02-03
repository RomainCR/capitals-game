import firebase from "firebase";
import "firebase/firestore";

// firebase init goes here
const config = {
  apiKey: "AIzaSyDmpMf5e7wzMaKYPYZ8WeUcwnzfSW76-Wk",
  authDomain: "the-capitals-game.firebaseapp.com",
  databaseURL: "https://the-capitals-game.firebaseio.com",
  projectId: "the-capitals-game",
  storageBucket: "the-capitals-game.appspot.com",
  messagingSenderId: "601949106495",
  appId: "1:601949106495:web:da34bcede2702f01a5638a"
};
firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

// firebase collections
const usersCollection = db.collection("users");
const scoresCollection = db.collection("scores");

export { db, auth, currentUser, usersCollection, scoresCollection };
