import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { clearState } from "./store";

initializeApp({
  apiKey: "AIzaSyCviqycJTe31in2x48xfOsXL7wabvPFIaM",
  authDomain: "lift-count.firebaseapp.com",
  databaseURL: "https://lift-count.firebaseio.com",
  projectId: "lift-count",
  storageBucket: "lift-count.appspot.com",
  messagingSenderId: "381826461570",
  appId: "1:381826461570:web:b0a0288322466e159fe99b",
});

const database = getFirestore();
const provider = new GoogleAuthProvider();

const auth = getAuth();

const googleLogin = async () => {
  const result = await signInWithPopup(auth, provider);

  try {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
    return { token, user };
  } catch (error: any) {
    const errorMessage = error.message;
    console.error(errorMessage);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    clearState();
  } catch (error: any) {
    const errorMessage = error.message;
    console.error(errorMessage);
  }
};

export { database, googleLogin, logout, auth };
