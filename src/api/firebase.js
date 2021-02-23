const firebaseConfig = {
  apiKey: "AIzaSyD-O3DabZGajxNhqpGbos1mdK-LQjRzWdE",
  authDomain: "innowise-practice-level-1.firebaseapp.com",
  projectId: "innowise-practice-level-1",
  storageBucket: "innowise-practice-level-1.appspot.com",
  messagingSenderId: "779327789150",
  appId: "1:779327789150:web:02033825de1495b993fccf",
  measurementId: "G-PGHX1BK4SQ",
  databaseURL: "https://innowise-practice-level-1-default-rtdb.firebaseio.com/",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const database = firebase.database();

export default database;
