import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase'
import 'firebase/firestore'

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAgSUHS3edsK0Pq_1ZBlXiInamwWCzDtqU",
  authDomain: "onenote-d2949.firebaseapp.com",
  projectId: "onenote-d2949",
  storageBucket: "onenote-d2949.appspot.com",
  messagingSenderId: "863240246148",
  appId: "1:863240246148:web:1bc2db6cceacb1a484c3d1"
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
