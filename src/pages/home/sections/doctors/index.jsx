import React from 'react';
import {Rate} from 'antd';
import Slider from "react-slick";

import {doctors}from './data';

export default function index() {
    

    const renderDoctorInfo = (info) => {
        const data = info.map(item => {
            return (
                <li key={item.codename}>
                    <i className={`${item.icon}`}></i>{`${item.codename === "available-date" ? " Available on " : " "} ${item.text}`}
                    {item.moreInfo ? <i className={`${item.moreInfo.icon}`} data-toggle="tooltip" title={item.moreInfo.text}></i> : null}
                </li>
            )
        });
        return (<ul className="available-info"> {data} </ul>);
    }

    const renderDoctorsList = () => {
        const contentStyle = {
            height: '160px',
            margin: "0 10px",
            // color: '#fff',
            lineHeight: '160px',
            textAlign: 'center',
            background: '#364d79',
          };
          const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 2,
            // rows: 5
          };
        const data = doctors.map(doctor => {
            const doctorFullname = doctor.firstname ? `${doctor.firstname} ${doctor.lastname}` : doctor.username;
            return (
                <div key={doctor.id} className="profile-widget" >
                    <div className="doc-img">
                        <a href={`/doctor/profile/${doctor.username}`}>
                            <img className="img-fluid" alt="User Image" src={doctor.avatar} />
                        </a>
                        <a href="javascript:void(0)" className="fav-btn">
                            <i className="far fa-bookmark"></i>
                        </a>
                    </div>
                    <div className="pro-content">
                        <h3 className="title">
                            <a href={`/doctor/profile/${doctor.username}`}>{doctorFullname}</a> 
                            <i className={`fas fa-check-circle${doctor.verified ? " verified" : ""}`}></i>
                        </h3>
                        <p className="speciality">{doctor.specialityDescription}</p>
                        <div className="rating">
                            <Rate disabled allowHalf value={doctor.rate.avarage} /> {` (${doctor.rate.numOfRaters}) `}
                        </div>
                        {renderDoctorInfo(doctor.info)}
                        <div className="row row-sm">
                            <div className="col-6">
                                <a href={`/doctor/profile/${doctor.username}`} className="btn btn-light view-btn">View Profile</a>
                            </div>
                            <div className="col-6">
                                <a href="/" className="btn btn-primary book-btn">Book Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
        return <Slider {...settings} className="doctor-slider slider"> {data} </Slider>
    };

    return (
        <section className="section section-doctor">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-4">
                        <div key="section-header" className="section-header ">
                            <h2>Book Our Doctor</h2>
                            <p>Lorem Ipsum is simply dummy text </p>
                        </div>
                        <div key="about-content" className="about-content">
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.</p>
                            <p>web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes</p>					
                            <a href="#" className="btn btn-primary">Read More..</a>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        {renderDoctorsList()}
                    </div>
                </div>
            </div>
        </section>
    )
}
