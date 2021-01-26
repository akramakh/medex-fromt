import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import DefaultImage from '../../assets/img/notification-img.png';
import PatientAvatar from '../../assets/img/patient-avatar.png';
import {ROOT_API} from '../../config/constants';
import './style.scss';

export default function Image({image, circle = false, width=200, height= 200, radius=8, className=""}) {

    const notificationImage = image ? ROOT_API + image : DefaultImage ;
    
    const avatarStyle = {
        width,
        height,
    }
    const classes = circle ? 'circle' : '';
    return (
        <a style={avatarStyle} className={`notificatio-image ${classes} ${className}`}>
            <img
            src={notificationImage}
            alt='Image'
            />
        </a>
    )
}
