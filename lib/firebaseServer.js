import * as admin from "firebase-admin";
import { storageDir } from "../utils/data";
var serviceAcct = require("../queens-recon-firebase-adminsdk-qanbe-865b8d7c67.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAcct),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  });
}

export default admin;

export const getPageData = async () => {
  const db = admin.firestore();
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

export const getImageByName = async (imageName = "") => {
  try {
    const ref = admin.storage().ref().child(`${storageDir}/${imageName}`);
    const url = await ref.getDownloadURL();
    return url;
  } catch (e) {
    console.log(`Couldn't get image named "${imageName}".`);
  }
  return null;
};
