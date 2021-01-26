import React from 'react';
import {Redirect} from 'react-router-dom';
import Form from '../common/form';
import Joi from 'joi-browser';
import firebase from '../../firebaseConfig';

class LoginForm extends Form {
  state = {
    data: {username: '', password: ''},
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
      .required()
      .label('Username'),
    password: Joi.string()
      .required()
      .min(6)
      .label('Password')
  };

  handleSubmit = e => {
    e.preventDefault();
    this.doLogin();
    console.log('submited');
  };

  isUserLoggedin = () => {
    return this.auth.currentUser && !this.auth.currentUser.isAnonymous;
  };

  doLogin = e => {
    e.preventDefault();
    if (this.isUserLoggedin()) return;
    const email = 'patient_1@gmail.com';
    const password = '123456789';
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('res', res);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    // this.doLogin();
    return (
      <div className='m-3 text-left'>
        {this.state.isLoggedin && <Redirect to='/' />}
        <h2>Login</h2>
        <form onSubmit={this.doLogin}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderSubmitButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
