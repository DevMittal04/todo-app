import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyApddatajsRrVGwJnbGTL_vAR65tY0sOQE",
  authDomain: "todo-app-b9568.firebaseapp.com",
  projectId: "todo-app-b9568",
  storageBucket: "todo-app-b9568.appspot.com",
  messagingSenderId: "977010653104",
  appId: "1:977010653104:web:614e750edc8ca63408c875"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
