import React from 'react';
import {Button} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import './style.scss';


export default function index() {
    return (
        <section className="section section-search">
            <div className="container-fluid">
                <div className="banner-wrapper">
                    <div className="banner-header text-center">
                        <h1>Search Doctor, Make an Appointment</h1>
                        <p>Discover the best doctors, clinic & hospital the city nearest to you.</p>
                    </div>
                        
                    <div className="search-box">
                        <form action="search.html">
                            <div className="form-group search-location">
                                <input type="text" className="form-control" placeholder="Search Location" />
                                <span className="form-text">Based on your Location</span>
                            </div>
                            <div className="form-group search-info">
                                <input type="text" className="form-control" placeholder="Search Doctors, Clinics, Hospitals, Diseases Etc" />
                                <span className="form-text">Ex : Dental or Sugar Check up etc</span>
                            </div>
                            <Button type="primary" icon={<SearchOutlined />} className="btn-search"></Button>
                        </form>
                    </div>
                    
                </div>
            </div>
        </section>
    )
}
