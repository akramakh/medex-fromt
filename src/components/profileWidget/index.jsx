import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { FaMapMarkerAlt, FaBirthdayCake } from 'react-icons/fa';
import UserAvatar from '../avatar';
import './style.scss';

export default function Widget({userObj = null}) {
    const {authReducer: {user}} = useSelector(state => state);
    if (!userObj){
        userObj = user;
    }
    const fullName = userObj.first_name ? `${userObj.first_name} ${userObj.last_name}` : userObj.username;
    const prefix = userObj.role === 'doctor' ? 'Dr. ' : '';
    const location = userObj.country ? `${userObj.country}${userObj.city ? ', ' + userObj.city : null }` : null;
    const years = userObj.dob ? moment().diff(userObj.dob, 'years') : 0;
    const speciality = userObj.role === 'doctor' ? 'BDS, MDS - Oral & Maxillofacial Surgery' : null;
    return (
        <div className="widget-profile pro-widget-content">
            <div className="profile-info-widget">
                <UserAvatar circle width={150} height={150} />
                <div className="profile-det-info">
                    <h3>{prefix + fullName}</h3>
                    {userObj.role === 'doctor' ?
                    <div className="patient-details">
                        <p>{speciality}</p>
                    </div>
                    :
                    <div className="patient-details">
                        {userObj.dob ? <h5><FaBirthdayCake /> {`${userObj.dob}, ${years} years`}</h5> : null }
                        {location ? <h5 className="mb-0"><FaMapMarkerAlt />{location}</h5> : null }
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}
