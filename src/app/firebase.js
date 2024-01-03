// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDlK69HymvgwsOxqSZVGwP8I0ARqCYGPjQ",
    authDomain: "nextjs-auth-87e9f.firebaseapp.com",
    projectId: "nextjs-auth-87e9f",
    storageBucket: "nextjs-auth-87e9f.appspot.com",
    messagingSenderId: "712806917057",
    appId: "1:712806917057:web:5e79f60b25b59e38dac540"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);