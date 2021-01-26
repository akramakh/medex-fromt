import React, {useEffect, useState} from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import PatientProfilePage from './profile';
import PatientsListPage from './list';
import InputCode from '../../components/inputCode';
import './style.scss';

export default function Patients() {

    const [isProfile, setIsProfile] = useState(false);
    const [loading, setLoading] = useState(true);
    const [patient, setPatient] = useState(null);
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const pathname = window.location.pathname;
        let username = pathname.split('/patients/')[1];
        if (username !== undefined && username.length > 0){
            username = username.split('/')[0]
            setIsProfile(true);
            setPatient(username);
            // fetch the specific Patient Object
        }else{
            // fetch all Patient objects
        }

        setLoading(false);
        return () => {
            
        }
    }, []);

    if (loading){
        const antIcon = <LoadingOutlined spin />;
        return (
            <div className="spinner">
                <Spin indicator={antIcon} /> 
            </div>
        )
    }

    if (isProfile){
        return <PatientProfilePage patient={patient} />
    }

    return (
        <div>
            <PatientsListPage />
        </div>
    )
}
