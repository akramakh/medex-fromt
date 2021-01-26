import React from 'react';
import {useSelector} from 'react-redux';
import DoctorDashboard from './doctor';
import PatientDashboard from './patient';

export default function Dashboard() {

    const {authReducer: {user}} = useSelector(state => state);

    if (user.role === 'doctor'){
        return <DoctorDashboard user={user} />
    }

    return <PatientDashboard user={user} />;
}
