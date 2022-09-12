import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import { getFirestore } from 'firebase/firestore'
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import { getMessaging } from "firebase/messaging/sw";


export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = app.auth()
export const messaging = getMessaging(app);


export const getTokenn = (setTokenFound) => {
  return getToken(messaging, {vapidKey: process.env.REACT_APP_VAPID_KEY}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});


export default app 