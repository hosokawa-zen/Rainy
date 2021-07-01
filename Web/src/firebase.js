import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCj0UE4NVEdvMTwZG0FSXyIuUj9nJYymJo",
  authDomain: "deallocker-fb7ef.firebaseapp.com",
  databaseURL: "https://deallocker-fb7ef-default-rtdb.firebaseio.com",
  projectId: "deallocker-fb7ef",
  storageBucket: "deallocker-fb7ef.appspot.com",
  messagingSenderId: "541669291562",
  appId: "1:541669291562:web:35bcd3bea59505d3f83553"
};

firebase.initializeApp(config);

let authWorkerApp = firebase.initializeApp(firebase.app().options, 'auth-worker');
let authWorkerAuth = firebase.auth(authWorkerApp);
authWorkerAuth.setPersistence(firebase.auth.Auth.Persistence.NONE); // disables caching of account credentials

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const authWork = authWorkerAuth;