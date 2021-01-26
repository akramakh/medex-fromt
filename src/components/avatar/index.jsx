import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import DoctorAvatar from '../../assets/img/doctor-avatar.png';
import PatientAvatar from '../../assets/img/patient-avatar.png';
import {ROOT_API} from '../../config/constants';
import './style.scss';

export default function Avatar({user: userObj, circle = false, width=200, height= 200, radius=8, className=""}) {
    let {authReducer: {user}} = useSelector(state => state);
    let profileUrl = ""
    if (!userObj){
        userObj = user;
        profileUrl = `/profile`;
    }else{

        profileUrl = `/${userObj.role === "doctor" ? "doctors" : "patients"}/${userObj.username}`;
    }

    const avatars = {
        doctor: DoctorAvatar,
        patient: PatientAvatar
    }
    let UserAvatar = avatars[userObj.role];
    if (userObj.avatar){

        UserAvatar = ROOT_API + userObj.avatar;
    }
    const avatarStyle = {
        width,
        height,
    }
    const classes = circle ? 'circle' : '';
    return (
        <a href={profileUrl} style={avatarStyle} className={`user-avatar ${classes} ${className}`}>
            <img
            src={UserAvatar}
            alt='Avatar'
            />
        </a>
    )
}
