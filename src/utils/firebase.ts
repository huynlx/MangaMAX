import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FacebookAuthProvider
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env['NEXT_PUBLIC_API_KEY'],
  authDomain: process.env['NEXT_PUBLIC_AUTH_DOMAIN'],
  projectId: process.env['NEXT_PUBLIC_PROJECT_ID'],
  storageBucket: process.env['NEXT_PUBLIC_STORAGE_BUCKET'],
  messagingSenderId: process.env['NEXT_PUBLIC_MESSAGE_SENDER_ID'],
  appId: process.env['NEXT_PUBLIC_APP_ID'],
  measurementId: process.env['NEXT_PUBLIC_MEASURE_ID']
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        bookmarks: []
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message.replace('Firebase: ', ''));
  }
};

const facebookProvider = new FacebookAuthProvider();
const signInWithFacebook = async () => {
  try {
    const res = await signInWithPopup(auth, facebookProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "facebook",
        email: user.email,
        bookmarks: []
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message.replace('Firebase: ', ''));
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};
const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;
  await addDoc(collection(db, "users"), {
    uid: user.uid,
    name,
    authProvider: "local",
    email,
    bookmarks: []
  });
};
const sendPasswordReset = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
  alert("Password reset link sent!");
};
const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  signInWithFacebook,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout
};
