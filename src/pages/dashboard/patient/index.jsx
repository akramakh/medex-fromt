import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Button } from 'antd';
import { FaColumns, FaMapMarkerAlt, FaMoneyBillAlt, FaPrescription, FaRecordVinyl, FaBirthdayCake } from 'react-icons/fa';
import UserAvatar from '../../../components/avatar';
import ProfileWidget from '../../../components/profileWidget';
import AppointmentsTab from './tab_content/appointments';
import PrescriptionsTab from './tab_content/prescriptions';
import MedicalRecordsTab from './tab_content/medicalRecords';
import BillingTab from './tab_content/billing';
import './style.scss';

const { TabPane } = Tabs;

export default function PatientDashboard() {
    const [activeTab, setActiveTab] = useState('appointments');

    const {authReducer: {user}} = useSelector(state => state);


    const callback = (key) => {
        setActiveTab(key);
    }

    const renderTabContent = () => {
        switch(activeTab){
            case 'appointments':
                return <AppointmentsTab />;
                
            case 'prescriptions':
                return <PrescriptionsTab />
            
            case 'medicalRecords':
                return <MedicalRecordsTab />
            
            case 'billing':
                return <BillingTab />

            default: 
                console.log('dd')
        }
    }

    return (
        <div id="patient-dashboard" className="container-fluid">
            <div className="row">
						
                {/* <!-- Profile Sidebar --> */}
                <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                    <div className="profile-sidebar">
                        <ProfileWidget />
                        <div className="dashboard-widget">
                            <Tabs defaultActiveKey="profile" tabPosition="left" size="large" onChange={callback}>
                                <TabPane 
                                    tab={
                                        <span className="tab-pane-title">
                                            <FaColumns />
                                            <p>Appointments</p>
                                        </span>
                                    } 
                                    key="appointments">
                                </TabPane>
                                
                                <TabPane 
                                    tab={
                                        <span className="tab-pane-title">
                                            <FaPrescription />
                                            <p>Prescriptions</p>
                                        </span>
                                    } 
                                    key="prescriptions">
                                </TabPane>
                                
                                <TabPane 
                                    tab={
                                        <span className="tab-pane-title">
                                            <FaRecordVinyl />
                                            <p>Medical Records</p>
                                        </span>
                                    } 
                                    key="medicalRecords">
                                </TabPane>
                                
                                <TabPane 
                                    tab={
                                        <span className="tab-pane-title">
                                            <FaMoneyBillAlt />
                                            <p>Billing</p>
                                        </span>
                                    } 
                                    key="billing">
                                </TabPane>
                            </Tabs>
                        </div>

                    </div>
                </div>
                {/* <!-- / Profile Sidebar --> */}
                
                <div className="col-md-7 col-lg-8 col-xl-9">
                    
                   {renderTabContent()}
                   
                </div>
            </div>
        </div>
    )
}
