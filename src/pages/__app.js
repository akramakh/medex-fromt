import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/fontawesome.min.css';
import '../assets/css/style.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';

import 'jquery/dist/jquery';
import 'bootstrap/dist/js/bootstrap.js';
import 'antd/dist/antd.css';

import Todo from '../components/todo/Todo';
import Blog from '../components/blog';
import Profile from '../components/profile';
import Settings from '../pages/settings';
import Appointments from '../components/appointments';
import Header from '../components/header';
import Footer from '../components/footer';
import Dashboard from '../pages/dashboard';
import DoctorsPage from '../pages/doctors';
import PatientsPage from '../pages/patients';
import BlogsPage from '../pages/blogs';
import ChatPage from '../pages/chat';
import LoginPage from '../pages/auth/login';
import RegisterPage from '../pages/auth/register';
import ForgetPasswordPage from '../pages/auth/forgetPassword';
import ChangePasswordPage from '../pages/auth/changePassword';
import DoctorChangePasswordPage from '../pages/auth/doctor/changePassword';
import DoctorRegisterPage from '../pages/auth/doctor/register';
import HomePage from '../pages/home';
import BreadcrumbBar from '../components/breadcrumbBar';

function App() {
  const {authReducer: {user, token}} = useSelector(state => state);
  console.log('user', user);

  var isAuth = token;
  // console.log('isAuth', isAuth)

//   useEffect(() => {
//       const localStorage = window.localStorage;
//       isAuth = localStorage.getItem('token');
//       console.log("localStorage.getItem('token')", localStorage.getItem('token'))
//   }, []);

  console.log('isAuth', isAuth);
  // const isAuth = false;

  const breadcrumbData = {
    list: [
      {
        title: "Home",
        link: "/"
      },
      {
        title: "Profile",
        link: "/profile"
      },
      {
        title: "Change Password",
        link: "/profile/change-password"
      },
    ],
    pageTitle: "Change Password"
  };
  
  if (!isAuth){
  return (
    <main className='main-wrapper'>
        <Header isAuth={isAuth} />
        <div className="content">
          <Switch>
            <Route path='/register' component={RegisterPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/forgot-password' component={ForgetPasswordPage} />
            <Route path='/doctor/register' component={DoctorRegisterPage} />
            <Route path='/doctors' component={DoctorsPage} />
            <Route path='/patients' component={PatientsPage} />
            <Route path='/blogs' component={BlogsPage} />
            <Route path='/' component={HomePage} />
            <Redirect to='/' />
          </Switch>
        </div>
        <Footer />
    </main>
  );
}

  return (
    <main className='main-wrapper'>
        <Header isAuth={isAuth} />
        {/* <BreadcrumbBar {...breadcrumbData}/> */}
        <div className="content">
          <Switch>
            <Route path='/profile/change-password' component={ChangePasswordPage} />
            <Route path='/doctor/profile/change-password' component={DoctorChangePasswordPage} />
            {/* <Route path='/blogs' component={Blog} /> */}
            <Route path='/profile' component={Profile} />
            <Route path='/settings' component={Settings} />
            <Route path='/appointments' component={Appointments} />
            {/* <Route path='/doctors/:akram' component={DoctorProfilePage} /> */}
            <Route path='/doctors' component={DoctorsPage} />
            <Route path='/patients' component={PatientsPage} />
            <Route path='/blogs' component={BlogsPage} />
            <Route path='/chat' component={ChatPage} />
            <Route path='/' component={Dashboard} />
            <Redirect to='/' />
          </Switch>
        </div>
        <Footer />
    </main>
  );
}

export default App;
