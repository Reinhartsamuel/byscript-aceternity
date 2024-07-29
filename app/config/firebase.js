'use client'

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const app_mode = process.env.NEXT_PUBLIC_APP_MODE;

const firebaseConfig = {
    apiKey: "AIzaSyBrJtG-8_KeYSXal6UR1o3SUCX1NwzfW4g",
    authDomain: "byscript-io.firebaseapp.com",
    projectId: "byscript-io",
    storageBucket: "byscript-io.appspot.com",
    messagingSenderId: "757580490638",
    appId: "1:757580490638:web:ab6bfab9f2f8bad74166df",
    measurementId: "G-T4VFYB93R5"
  };

const firebaseConfigStaging = {
    apiKey: "AIzaSyDJt25hHsouxWKaGAwX5lRqCGtv4v2vr18",
    authDomain: "saudagar-staging.firebaseapp.com",
    // authDomain: "byscript.io",
    projectId: "saudagar-staging",
    storageBucket: "saudagar-staging.appspot.com",
    messagingSenderId: "167715247415",
    appId: "1:167715247415:web:e9b4812bdd936409a6f6b2",
    measurementId: "G-VFCZV24Z8W"
};

const config = app_mode === 'production' ? firebaseConfig : firebaseConfigStaging;

const app = !getApps().length ? initializeApp(config) : getApp();
const authFirebase = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export const analytics = () => {
    if (typeof window !== 'undefined') {
        return getAnalytics(app);
    } else {
        return null;
    }
};

export { authFirebase, db, storage };
