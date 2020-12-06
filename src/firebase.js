// import * as firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/storage";
// import "firebase/auth";
import firebase from "firebase"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyANT3ZHKAfaOzWMmCysllUxJBKcHSuTjTI",
    authDomain: "sicilian-shop.firebaseapp.com",
    projectId: "sicilian-shop",
    storageBucket: "sicilian-shop.appspot.com",
    messagingSenderId: "263118152033",
    appId: "1:263118152033:web:40840d8fc0826822bfe520",
    measurementId: "G-5R8HSMYK8D"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

// export const provider = new firebase.auth.GoogleAuthProvider();

// export default firebase;
