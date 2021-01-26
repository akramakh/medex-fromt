import React from 'react';
import {Redirect} from 'react-router-dom';
import Form from '../common/form';
import Joi from 'joi-browser';
import firebase from '../../firebaseConfig';

class RegestrationForm extends Form {
  state = {
    data: {
      username: '',
      password: '',
      name: ''
    },
    errors: {},
    isLoggedin: false
  };

  componentWillMount() {
    let isLoggedin = false;
    firebase.auth().onAuthStateChanged(user => {
      if (user && !user.isAnonymous) {
        isLoggedin = true;
        this.setState({isLoggedin});
      }
    });
  }

  database = firebase.database();
  auth = firebase.auth();
  usersRef = this.database.ref('/users/');

  scheme = {
    username: Joi.string()
      .email()
      .required(),
    name: Joi.string().required(),
    password: Joi.string()
      .min(6)
      .required()
  };

  onSubmit = () => {
    // call backend services
    console.log('submitted');
  };

  isUserLoggedin = () => {
    return this.auth.currentUser && !this.auth.currentUser.isAnonymous;
  };

  addUser = user => {
    this.usersRef.child(user.uid).set({
      uid: user.uid,
      name: user.name,
      email: user.email,
      photoURL: user.photoURL,
      createdAt: new Date().getTime()
    });
  };

  doSignup = e => {
    e.preventDefault();
    if (this.isUserLoggedin()) return;
    const email = 'test4@mail.com';
    const password = '123456789';
    const name = 'John Doe';
    const photoURL = 'https://example.com/jane-q-user/profile.jpg';
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('res', res);
        res.user
          .updateProfile({
            displayName: name,
            photoURL: photoURL
          })
          .then()
          .catch(error => {
            console.error(error);
          });
        const {uid, email} = res.user;
        this.addUser({uid, email, name, photoURL});
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <div className='container m-2 text-left'>
        {this.state.isLoggedin && <Redirect to='/' />}
        <h2>Register</h2>
        <form onSubmit={this.doSignup}>
          {this.renderInput('username', 'Username', 'email')}
          {this.renderInput('name', 'Name')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderSubmitButton('Register')}
        </form>
      </div>
    );
  }
}

export default RegestrationForm;
