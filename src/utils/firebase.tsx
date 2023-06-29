import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAQdj4lmmu0eXHtujQQylEqCzrf3La4Xgw",
    authDomain: "react-my-pets-70661.firebaseapp.com",
    projectId: "react-my-pets-70661",
    storageBucket: "react-my-pets-70661.appspot.com",
    messagingSenderId: "1087084468879",
    appId: "1:1087084468879:web:54cb295bed47d7e682eefa"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

 
  export default firebase;

  export const auth = firebase.auth();