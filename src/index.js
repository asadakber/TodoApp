import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDeuP2uiwxEhbn7T9pDNgJ_gXFwaGoAuFI",
    authDomain: "todoapp-1f673.firebaseapp.com",
    databaseURL: "https://todoapp-1f673.firebaseio.com",
    projectId: "todoapp-1f673",
    storageBucket: "todoapp-1f673.appspot.com",
    messagingSenderId: "644777658341"
  };
  firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
