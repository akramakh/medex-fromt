import React from 'react';

import Slider from "react-slick";
import FeaturesLogo from '../../../../assets/img/features/feature.png';
import './style.scss';
import {features} from './data';

export default function index() {

    const renderSliderItems = () => {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 3,
            autoplay: true,
            // rows: 5
          };
        const data = features.map(item => {
            return (
                <div key={item.id} className="feature-item text-center">
                    <img src={item.image} className="img-fluid" alt="Feature" />
                    <p>{item.title}</p>
                </div>
            )
        });
        return <Slider {...settings} >{data}</Slider>
    }
    return (
        <section className="section section-features">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-5 features-img">
                        <img src={FeaturesLogo} className="img-fluid" alt="Feature" />
                    </div>
                    <div className="col-md-7">
                        <div className="section-header">	
                            <h2 className="mt-2">Availabe Features in Our Clinic</h2>
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
                        </div>	                            
                           {renderSliderItems()}
                    </div>
                </div>
            </div>
        </section>
    )
}
