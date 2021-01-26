import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Progress, Tabs } from 'antd';
import { FaColumns, FaMapMarkerAlt, FaMoneyBillAlt, FaPrescription, FaRecordVinyl, FaUser } from 'react-icons/fa';
import Icon1 from '../../../assets/img/icon-01.png';
import Icon2 from '../../../assets/img/icon-02.png';
import Icon3 from '../../../assets/img/icon-03.png';
import UserAvatar from '../../../components/avatar';
import { getDashboardMetadata } from '../../../actions/index';
import ProfileWidget from '../../../components/profileWidget';
import AppointmentsTab from './tab_content/appointments';
import PrescriptionsTab from './tab_content/prescriptions';
import MedicalRecordsTab from './tab_content/medicalRecords';
import BillingTab from './tab_content/billing';
import './style.scss';

const { TabPane } = Tabs;
const init_metadata = {
    total_patients: 0,
    total_appointments: 0
}

export default function DoctorDashboard() {
    const dispatch = useDispatch();

    const history = useHistory();

    const [activeTab, setActiveTab] = useState('appointments');
    const [metadata, setMetadata] = useState(init_metadata);

    const {authReducer: {user}} = useSelector(state => state);

    useEffect(() => {
        dispatch(getDashboardMetadata((success, data) => {
            if(success){
                setMetadata(data.data);
                console.log('data', data);
            }else{
                console.log('data', data);
            }
        }))
    }, [dispatch]) ;
    const callback = (key) => {
        setActiveTab(key);
    }

    const renderTabContent = () => {
        switch(activeTab){
            case 'appointments':
                return <AppointmentsTab />;
                
            case 'prescriptions':
                return <PrescriptionsTab />
            
            case 'patients':
                return <MedicalRecordsTab />
            
            case 'billing':
                return <BillingTab />

            case 'profile-settings':
                history.push('/settings');
                return ;

            default: 
                console.log('dd')
        }
    }

    return (
        <div id="doctor-dashboard" className="container-fluid">

            <div className="row">
                <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                    
                    {/* <!-- Profile Sidebar --> */}
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
                                        <p>Message</p>
                                    </span>
                                } 
                                key="prescriptions">
                            </TabPane>
                            
                            <TabPane 
                                tab={
                                    <span className="tab-pane-title">
                                        <FaRecordVinyl />
                                        <p>My Patients</p>
                                    </span>
                                } 
                                key="patients">
                            </TabPane>
                            
                            <TabPane 
                                tab={
                                    <span className="tab-pane-title">
                                        <FaMoneyBillAlt />
                                        <p>Invoices</p>
                                    </span>
                                } 
                                key="billing">
                            </TabPane>
                            <TabPane 
                                tab={
                                    <span className="tab-pane-title">
                                        <FaUser />
                                        <p>Profile Settings</p>
                                    </span>
                                } 
                                key="profile-settings">
                            </TabPane>
                        </Tabs>
                        </div>
                    </div>
                    {/* <!-- /Profile Sidebar --> */}
                    
                </div>
                
                <div className="col-md-7 col-lg-8 col-xl-9">

                    <div className="row">
                        <div className="col-md-12">
                            <div className="card dash-card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12 col-lg-4">
                                            <div className="dash-widget dct-border-rht">
                                                <div className="circle-bar circle-bar1">
                                                    {/* <div className="circle-graph1" data-percent="75">
                                                        <img src="assets/img/icon-01.png" className="img-fluid" alt="patient" />
                                                    </div> */}
                                                    <Progress type="circle" percent={metadata.total_patients} format={percent => <img src={Icon1} />} />
                                                </div>
                                                <div className="dash-widget-info">
                                                    <h6>Total Patient</h6>
                                                    <h3>{metadata.total_patients}</h3>
                                                    <p className="text-muted">Till Today</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-12 col-lg-4">
                                            <div className="dash-widget dct-border-rht">
                                                <div className="circle-bar circle-bar2">
                                                    {/* <div className="circle-graph2" data-percent="65">
                                                        <img src="assets/img/icon-02.png" className="img-fluid" alt="Patient" />
                                                    </div> */}
                                                    <Progress type="circle" percent={metadata.total_patients} format={percent => <img src={Icon2} />} />
                                                </div>
                                                <div className="dash-widget-info">
                                                    <h6>Today Patient</h6>
                                                    <h3>{metadata.total_patients}</h3>
                                                    <p className="text-muted">06, Nov 2019</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-12 col-lg-4">
                                            <div className="dash-widget">
                                                <div className="circle-bar circle-bar3">
                                                    {/* <div className="circle-graph3" data-percent="50">
                                                        <img src="assets/img/icon-03.png" className="img-fluid" alt="Patient" />
                                                    </div> */}
                                                    <Progress type="circle" percent={metadata.total_appointments} format={percent => <img src={Icon3} />} />
                                                </div>
                                                <div className="dash-widget-info">
                                                    <h6>Appoinments</h6>
                                                    <h3>{metadata.total_appointments}</h3>
                                                    <p className="text-muted">06, Apr 2019</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {renderTabContent()}
                    
                </div>
            </div>

        </div>
    )
}
