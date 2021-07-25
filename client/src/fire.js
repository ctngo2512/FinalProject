import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAlWsxQaeQM2Wu0w4Ds3IOCeZGMwoAu-rU",
    authDomain: "login-e839c.firebaseapp.com",
    projectId: "login-e839c",
    storageBucket: "login-e839c.appspot.com",
    messagingSenderId: "480460476798",
    appId: "1:480460476798:web:8f6068b74a99c7d815632f"
  };
  // Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;