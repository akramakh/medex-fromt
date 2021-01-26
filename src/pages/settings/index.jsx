import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import { Tabs, Button } from 'antd';
import { CreditCardFilled, LockFilled, UserOutlined, ReconciliationOutlined} from '@ant-design/icons';
import {FaMapMarkerAlt, FaCalendarAlt} from 'react-icons/fa';
// import UserAvatar from '../../assets/img/avatar_1.jpg';
import ProfileTabContent from './tab_content/profile';
import ChangePasswordTabContent from './tab_content/changePassword';
import PaymentTabContent from './tab_content/payment';
import SpecialistsTabContent from './tab_content/specialists';
import UserAvatar from '../../components/avatar';
import ProfileWidget from '../../components/profileWidget';

import './style.scss';
const { TabPane } = Tabs;

export default function Settings() {

    const [activeTab, setActiveTab] = useState('profile')

    let {authReducer: {user}} = useSelector(state => state);
    const isDoctor = user.role === "doctor";

    const callback = (key) => {
        setActiveTab(key);
        switch(key){
            case 'profile':
                console.log('ss');
                break;
            case 'password':
                console.log('sa');
                break;
            default: 
                console.log('dd')
        }
    }
    
    const renderTabContent = () => {
        switch(activeTab){
            case 'profile':
                return <ProfileTabContent user={user} />
                
            case 'password':
                return <ChangePasswordTabContent />
            
            case 'payment':
                return <PaymentTabContent />
            
            case 'specialists':
                return <SpecialistsTabContent user={user} />

            default: 
                console.log('dd')
        }
    }
    
    const renderTabs = () => {
        return(
            <Tabs defaultActiveKey="profile" tabPosition="left" size="large" onChange={callback}>
                <TabPane 
                    tab={
                        <span className="tab-pane-title">
                            <UserOutlined />
                            <p>Profile Settings</p>
                        </span>
                    } 
                    key="profile">
                    Content of Tab Pane 1
                </TabPane>
                
                {isDoctor ?
                    <TabPane 
                        tab={
                            <span className="tab-pane-title">
                                <ReconciliationOutlined />
                                <p>Specialists</p>
                            </span>
                        } 
                        key="specialists">
                        Content of Tab Pane 3
                    </TabPane>
                : null}

                <TabPane 
                    tab={
                        <span className="tab-pane-title">
                            <LockFilled />
                            <p>{user.role === 'patient' ? "Password & Code" : "Change Password"}</p>
                        </span>
                    } 
                    key="password">
                    Content of Tab Pane 2
                </TabPane>
                
                <TabPane 
                    tab={
                        <span className="tab-pane-title">
                            <CreditCardFilled />
                            <p>Payment Method</p>
                        </span>
                    } 
                    key="payment">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
        )
    }

    return (
        <div id="settings-page" className="container-fluid">
            <div className="row">
            
                <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                    <div className="profile-sidebar">
                        <ProfileWidget />
                        <div className="dashboard-widget">
                            {renderTabs()}
                        
                        </div>

                    </div>
                    <Button block  type="ghost" danger >Remove Account</Button>
                </div>
                
                <div className="col-md-7 col-lg-8 col-xl-9">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );

    
}
