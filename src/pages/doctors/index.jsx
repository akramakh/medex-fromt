import React, {useEffect, useState} from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import DoctorProfilePage from './profile';
import DoctorsListPage from './list';
import InputCode from '../../components/inputCode';
import './style.scss';

export default function Doctors() {

    const [isProfile, setIsProfile] = useState(false);
    const [loading, setLoading] = useState(true);
    const [doctor, setDoctor] = useState(null);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const pathname = window.location.pathname;
        let username = pathname.split('/doctors/')[1];
        if (username !== undefined && username.length > 0){
            username = username.split('/')[0]
            setIsProfile(true);
            setDoctor(username);
            // fetch the specific Doctor Object
        }else{
            // fetch all Doctor objects
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
        return <DoctorProfilePage username={doctor} />
    }

    return (
        <div>
            <DoctorsListPage />
        </div>
    )
}
