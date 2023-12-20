import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBSq2Py5_NusvJ56U4-zGMHPnrTS8jRh6g",
  authDomain: "login-facebook-8515f.firebaseapp.com",
  projectId: "login-facebook-8515f",
  storageBucket: "login-facebook-8515f.appspot.com",
  messagingSenderId: "1012604985795",
  appId: "1:1012604985795:web:c674080e8f12dd2f6c5d76",
  measurementId: "G-PM3QB6LMRS",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const providerFB = new FacebookAuthProvider();
const providerGG = new GoogleAuthProvider();

export { auth, providerFB, providerGG };
