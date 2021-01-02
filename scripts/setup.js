let firebaseConfig = {
    apiKey: "AIzaSyBp2KKZwRWbXpeqXMXgOKhpeMzWmSfKv7A",
    authDomain: "schedule-1aa61.firebaseapp.com",
    databaseURL: "https://schedule-1aa61.firebaseio.com",
    projectId: "schedule-1aa61",
    storageBucket: "schedule-1aa61.appspot.com",
    messagingSenderId: "627663326398",
    appId: "1:627663326398:web:f918846c5aed74c50562ef",
    measurementId: "G-6DD53KKLHR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storageRef = firebase.storage().ref();