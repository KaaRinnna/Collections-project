import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAIU2-1VqkWruDSyt7sa_xI7FApZUmNwvI",
    authDomain: "make-collections-54f7e.firebaseapp.com",
    projectId: "make-collections-54f7e",
    storageBucket: "make-collections-54f7e.appspot.com",
    messagingSenderId: "933456066731",
    appId: "1:933456066731:web:0a8434f4d8bc704f9fdfee"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);