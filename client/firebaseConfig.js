import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBaAEju0zqIIiXoo41v8goVAEWzhaYhBec",
  authDomain: "beyond-school-575ad.firebaseapp.com",
  projectId: "beyond-school-575ad",
  storageBucket: "beyond-school-575ad.appspot.com",
  messagingSenderId: "184000375220",
  appId: "1:184000375220:web:1bd93313cebff745426ae1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
