import React from 'react';
import Slider from "react-slick";
import './style.scss';
import {specialities} from './data';

export default function index() {

    const renderSpecialities = () => {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 3,
            // rows: 5
          };
          
        const data = specialities.map(item => {
            return (
                <div key={item.id} className="speicality-item text-center" >
                    <div className="speicality-img">
                        <img src={item.image} className="img-fluid" alt="Speciality" />
                        <span><i className="fa fa-circle" aria-hidden="true"></i></span>
                    </div>
                    <p>{item.title}</p>
                </div>
            )
        });
        return <Slider {...settings} >{data}</Slider>
    }

    return (
        <section className="section section-specialities">
            <div className="container-fluid">
                <div className="section-header text-center">
                    <h2>Clinic and Specialities</h2>
                    <p className="sub-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-9">
                        {renderSpecialities()}                        
                    </div>
                </div>
            </div>   
        </section>
    )
}
