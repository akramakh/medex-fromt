import React from 'react';
import {useSelector} from 'react-redux';
import DoctorProfile from './doctor';
import PatientProfile from './patient';
import './index.scss';


export default function Profile({otherUser=null}) {

  let {authReducer: {user}} = useSelector(state => state);
  if (otherUser !== null){
    user = otherUser;
  }

  if (user.role === 'doctor'){
    return <DoctorProfile otherUser={otherUser} />
  }
  

  return <PatientProfile otherUser={otherUser} />;
}
