import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
    apiKey: "AIzaSyDOAW7xjy5sWlQJ0oRKulD0ma0SEeBLZho",
    authDomain: "talbank-8e8a0.firebaseapp.com",
    projectId: "talbank-8e8a0",
    storageBucket: "talbank-8e8a0.firebasestorage.app",
    messagingSenderId: "535947323689",
    appId: "1:535947323689:web:2b013b8c2a9a41c95e6f38",
    measurementId: "G-FMK26M5Q66"
}

// Prevent duplicate initialization
const app = !getApps().length
    ? initializeApp(firebaseConfig)
    : getApp()

export const auth = getAuth(app)
export const analytics = getAnalytics(app)

export default app