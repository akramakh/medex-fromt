import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyCeNWnHfNtWn3m6-U_v2L5OWe3Teo3yp8c',
  authDomain: 'react-todo-38763.firebaseapp.com',
  databaseURL: 'https://react-todo-38763.firebaseio.com',
  projectId: 'react-todo-38763',
  storageBucket: 'react-todo-38763.appspot.com',
  messagingSenderId: '853317841493',
  appId: '1:853317841493:web:6fa49c80410d8136da5adc',
  measurementId: 'G-FSPG4HB5ER'
};
// Initialize Firebase
const data = firebase.initializeApp(firebaseConfig);
export default data;
//   firebase.analytics();
