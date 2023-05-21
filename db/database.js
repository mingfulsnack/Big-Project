import React from "react";
import firebase from "@firebase/app";
import "firebase/firestore";
import "firebase/auth";
firebase.initializeApp({
    apiKey:"",
    authDomain:"reactjst3h-74f93.firebaseapp.com",
    projectId:"reactjst3h-74f93"

});
export default firebase.firestore();