import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';

import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './assets/css/bootstrap.min.css';
import './assets/css/fontawesome.min.css';
import './assets/css/style.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';

import 'jquery/dist/jquery';
import 'bootstrap/dist/js/bootstrap.js';
import 'antd/dist/antd.css';
import 'antd/es/modal/style';
import 'antd/es/slider/style';

import Navbar from './components/global/navbar';
import LoginForm from './components/auth/Login';
import RegestrationForm from './components/auth/registrationForm';
import Todo from './components/todo/Todo';
import Blog from './components/blog';
import Header from './components/header';
import Footer from './components/footer';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import ForgetPasswordPage from './pages/auth/forgetPassword';
import ChangePasswordPage from './pages/auth/changePassword';
import DoctorChangePasswordPage from './pages/auth/doctor/changePassword';
import DoctorRegisterPage from './pages/auth/doctor/register';
import HomePage from './pages/home';
import BreadcrumbBar from './components/breadcrumbBar';
import AppPage from './pages/__app';
import {loginUserSession} from './actions/index';

function App() {
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginUserSession(() => { }));
  }, [dispatch]);

  
  return <AppPage />
}

export default App;
