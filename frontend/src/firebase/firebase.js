// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJOkOpsUs2msvHNuckU-IXeqd1ff5JwiU",
  authDomain: "react-http-9e817.firebaseapp.com",
  databaseURL: "https://react-http-9e817-default-rtdb.firebaseio.com",
  projectId: "react-http-9e817",
  storageBucket: "react-http-9e817.appspot.com",
  messagingSenderId: "774026933621",
  appId: "1:774026933621:web:6d1f4b18ebe3d5dcc4cf3c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;