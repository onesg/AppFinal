import firebase from 'firebase';
import firestore from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCzeIPk0nRexo_-6H96XN9H39SKoT8dv24",
    authDomain: "reactfinal-8fda4.firebaseapp.com",
    projectId: "reactfinal-8fda4",
    storageBucket: "reactfinal-8fda4.appspot.com",
    messagingSenderId: "1078283647547",
    appId: "1:1078283647547:web:21ce86e2aafc565e197a1e"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;
