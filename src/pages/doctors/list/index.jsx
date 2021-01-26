import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FaBookmark, FaCheckCircle} from 'react-icons/fa';
import {Rate, DatePicker, Checkbox, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {ROOT_API} from '../../../config/constants';
import Avatar from '../../../components/avatar';
import AppointmentPopup from '../profile/appointmentPopup';

import {doctors as doctorsData}from './data.jsx';

import {fetchDoctors} from '../../../actions/index';
import './style.scss';
// import DoctorPH from '../../../assets/img/doctors/doctor-01.jpg';

const initialList = [];

export default function List() {
    const dispatch = useDispatch();

    const [doctors, setDoctors] = useState(initialList);
    const [loading, setLoading] = useState(true);

    
    let {authReducer: {user}} = useSelector(state => state);

    useEffect(() => {
        dispatch(fetchDoctors((success, data) => {
            if(success){
                setDoctors(data.data);
            }else{

            }
            setLoading(false);
        }));
        return () => {
            
        }
    }, [dispatch]);

    const renderDoctorInfo = (info) => {
        return null;
        const data = info.map(item => {
            return (
                <li key={item.codename}>
                    {item.icon}{`${item.codename === "available-date" ? " Available on " : " "} ${item.text}`}
                    {item.moreInfo ? item.moreInfo.icon : null}
                </li>
            )
        });
        return (<ul className="available-info"> {data} </ul>);
    }

    const renderDoctorsList = () => {
        const data = doctors.map(doctor => {
            const fullName = doctor.first_name ? `${doctor.first_name} ${doctor.last_name}` : doctor.username;
            const profileUrl = `/doctors/${doctor.username}`;
            const specialist = doctor.specialists.length ? doctor.specialists[0] : null;
            return (
                <div className="col-md-6 col-lg-4 col-xl-3">
                    <div className="profile-widget">
                        <div className="doc-img">
                            <Avatar width="240px" height="240px" user={doctor} />
                            <a href="javascript:void(0)" className="fav-btn">
                                <FaBookmark />
                            </a>
                        </div>
                        <div className="pro-content">
                            <h3 className="title">
                                <a href={profileUrl}>{`Dr. ${fullName}`}</a> 
                                {doctor.is_verified ? <FaCheckCircle className="verified" /> : null }
                            </h3>
                            <p className="speciality">{specialist ? specialist.description : "Un-specified Specialist."}</p>
                            <div className="rating">
                                <Rate disabled allowHalf value={doctor.rate.avarage} /> {` (${doctor.rate.numOfRaters}) `}
                            </div>
                            {renderDoctorInfo(doctor.info)}
                            <div className="row row-sm">
                                <div className="col-6">
                                    <AppointmentPopup doctor={doctor} user={user} text={"Book Now"} />
                                    {/* <a href="#" className="btn btn-primary book-btn">Book Now</a> */}
                                </div>
                                <div className="col-6">
                                    <a href={profileUrl} className="btn btn-light view-btn">View Profile</a>
                                </div>
                            </div>
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
    
      if (loading){
        const antIcon = <LoadingOutlined spin />;
        return (
            <div className="spinner">
                <Spin indicator={antIcon} /> 
            </div>
        )
    }

    return (
        <div id="doctors-list" className="container-fluid">
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
                            <Checkbox onChange={onChange}>Male Doctor</Checkbox>
                        </div>
                        <div>
                            <Checkbox onChange={onChange}>Female Doctor</Checkbox>
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
                    {renderDoctorsList()}    
                    <div className="load-more text-center">
                        <a className="btn btn-primary btn-sm" href="javascript:void(0);">Load More</a>	
                    </div>
                </div>
            </div>
        </div>
    )
}
