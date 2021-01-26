import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FaBookmark, FaCheckCircle, FaMapMarkerAlt} from 'react-icons/fa';
import {Rate, DatePicker, Checkbox} from 'antd';
import {ROOT_API} from '../../../config/constants';
import moment from 'moment';

import {patients as patientsData}from './data.jsx';
import Avatar from '../../../components/avatar';
import {fetchPatients} from '../../../actions/index';
import './style.scss';
// import PatientPH from '../../../assets/img/patients/patient-01.jpg';

const initialList = [];

export default function List() {
    
    const dispatch = useDispatch();
    const [patients, setPatients] = useState(initialList);
    const [hasNext, setHasNext] = useState(false);

    useEffect(() => {
        dispatch(fetchPatients((success, data) => {
            if(success){
                setPatients(data.data);
                setHasNext(data.next);
            }else{

            }
        }));
        return () => {
            
        }
    }, [dispatch]);

    const renderPatientInfo = (item) => {
        
        var years = item.dob ? moment().diff(item.dob, 'years',false) : "-";
        return (
            <div className="patient-info">
                <ul>
                    <li>Phone <span>{item.phoneNumber}</span></li>
                    <li>Age <span>{`${years} Years, ${item.gender}`}</span></li>
                    <li>Blood Group <span>{item.blood ? item.blood.toUpperCase() : null}</span></li>
                </ul>
            </div>
        )
    }

    const renderPatientsList = () => {
        const data = patients.map(patient => {
            const fullName = patient.first_name ? `${patient.first_name} ${patient.last_name}` : patient.username;
            const profileUrl = `/patients/${patient.username}`;
            const location = `${patient.country ? patient.country : ""}${patient.city ? ", " + patient.city : ""}${patient.address ? ", " + patient.address : ""}`;
            return (

                <div className="col-md-6 col-lg-4 col-xl-3">
                    <div className="card widget-profile pat-widget-profile">
                        <div className="card-body">
                            <div className="pro-widget-content">
                                <div className="profile-info-widget">
                                    <Avatar user={patient} width="150px" height="150px" circle />
                                    <div className="profile-det-info">
                                        <h3><a href={profileUrl}>{fullName}</a></h3>
                                        
                                        <div className="patient-details">
                                            <h5><b>Patient ID :</b> {patient.id}</h5>
                                            <h5 className="mb-0"><FaMapMarkerAlt /> {location}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {renderPatientInfo(patient)}
                        </div>
                    </div>
                </div>
            );
        });
        return <div className="row row-grid">{data}</div>
    }

    const onChange = (date, dateString) => {
        console.log(date, dateString);
      }

    return (
        <div id="patients-list" className="container-fluid">
            <div className="row">
                <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                <div className="card search-filter">
                    <div className="card-header">
                        <h4 className="card-title mb-0">Search Filter</h4>
                    </div>
                    <div className="card-body">
                    <div className="filter-widget">
                        <DatePicker size="large" style={{width: "100%"}} onChange={onChange} />			
                    </div>
                    <div className="filter-widget">
                        <h4>Gender</h4>
                        <div>
                            <Checkbox onChange={onChange}>Male Patient</Checkbox>
                        </div>
                        <div>
                            <Checkbox onChange={onChange}>Female Patient</Checkbox>
                        </div>
                    </div>
                    <div className="filter-widget">
                        <h4>Select Specialist</h4>
                        <div>
                            <Checkbox onChange={onChange}>Urology</Checkbox>
                        </div>
                        <div>
                            <Checkbox onChange={onChange}>Neurology</Checkbox>
                        </div>
                        <div>
                            <Checkbox onChange={onChange}>Dentist</Checkbox>
                        </div>
                        <div>
                            <Checkbox onChange={onChange}>Orthopedic</Checkbox>
                        </div>
                        <div>
                            <Checkbox onChange={onChange}>Cardiologist</Checkbox>
                        </div>
                        <div>
                            <Checkbox onChange={onChange}>Cardiologist</Checkbox>
                        </div>
                    </div>
                        <div className="btn-search">
                            <button type="button" className="btn btn-block">Apply Filters</button>
                        </div>	
                    </div>
                </div>    
                </div>
                <div className="col-md-7 col-lg-8 col-xl-9">
                    {renderPatientsList()}    
                    {hasNext ? <div className="load-more text-center">
                        <a className="btn btn-primary btn-sm" href="javascript:void(0);">Load More</a>	
                    </div> : null}
                </div>
            </div>
        </div>
    )
}
