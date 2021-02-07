import React from "react";
import firebase from "firebase/app";
import "firebase/auth"; // If you need it
import "firebase/firestore"; // If you need it
import "firebase/storage"; // If you need it
import "firebase/analytics"; // If you need it
import { cleanStringForFirebaseKey, storageDir } from "../utils/data";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check that `window` is in scope for the analytics module!
if (typeof window !== "undefined" && !firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
  // To enable analytics. https://firebase.google.com/docs/analytics/get-started
  if ("measurementId" in clientCredentials) firebase.analytics();
}
export default firebase;

/**
 * DB STUFF
 */
export const useDatabase = () => {
  const getData = async () => {
    const db = firebase.firestore();
    const ref = db.collection("pages").doc("landing");
    try {
      const doc = await ref.get();
      if (doc.exists) {
        const data = doc.data();
        return data;
      }

      alert("Doc does not exist!");
      return null;
    } catch (e) {
      alert(e.message);
      return null;
    }
  };

  const updateData = async (data) => {
    const db = firebase.firestore();
    const ref = db.collection("pages").doc("landing");
    try {

      await ref.set({ ...data }, { merge: true });
    } catch (e) {
      alert(e.message);
    }
  };

  const updateEmailList = async (email) => {
    const db = firebase.firestore();
    const cleanEmail = cleanStringForFirebaseKey(email);
    const ref = db.collection("emails").doc(cleanEmail);
    try {
      await ref.set({
        email,
        dateCreated: new Date(Date.now()).toLocaleString()
      });
    } catch (e) {
      console.log("error saving email.");
      console.error(e);
    }
  }

  return { getData, updateData, updateEmailList };
};

/**
 * AUTH STUFF
 */
export const useAuth = () => {
  const login = async ({ email, password }) => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);

      if (userCredential.user) {
        // signedIn!
        return userCredential.user;
      }
    } catch (e) {
      alert(e.message);
    }

    return null;
  };

  const logout = async () => {
    try {
      await firebase.auth().signOut();
      return;
    } catch (e) {
      alert(e.message);
    }

    return null;
  };

  return { login, logout };
};

/**
 * STORAGE STUFF
 */
export const useStorage = () => {
  const uploadImage = (file, imageName = "") => {
    try {
      const ref = firebase.storage().ref().child(`landingV2/${imageName}`);
      const uploadTask = ref.put(file);
      return uploadTask;
    } catch (e) {
      console.error(e);
    }
  };

  const getImageURL = async (imageName = "") => {
    try {
      const ref = firebase.storage().ref().child(`${storageDir}/${imageName}`);
      const url = await ref.getDownloadURL();
      return url;
    } catch (e) {
      console.log(`Couldn't get image named "${imageName}".`);
    }
    return null;
  };

  return { uploadImage, getImageURL };
};
