import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';

import {Dropdown, Menu, Badge, Input} from 'antd';
import { BellFilled, SearchOutlined } from '@ant-design/icons';
import {fetchNotifications, seenNotifications} from '../../actions/index';
import {ROOT_API} from '../../config/constants';
import Avatar from '../avatar';
import NotificationItem from './notificationItem';
import './style.scss';

export default function Notifications() {
    const dispatch = useDispatch()
    const [notifications, setNotifications] = useState([]);
    const [notificationsCount, setNotificationsCount] = useState(0);
    useEffect(() => {
        dispatch(fetchNotifications((success, data) => {
            if(success){
                setNotifications(data.data);
                const unSeenList = data.data.filter(e => !e.seen);
                setNotificationsCount(unSeenList.length);
            }else{
                console.log('error', data);
            }
        }));
        // setNotifications(init_notifications);
        return () => {
            setNotifications([]);
        }
        
    }, [dispatch]);
    

    const handleDelete = (id) => {
        const newNotifi = notifications.filter(item => item.id !== id);
        setNotifications(newNotifi);
    }

    const menu = ()  => {
        if (notifications.length === 0){
            return <Menu ><span className="no-result">You have No Notifications Yet</span></Menu>
        }
        const list = notifications.map(item => {
            return <NotificationItem item={item} onDelete={handleDelete} />
        })
        return(
        <Menu >
          {list}
        </Menu>
      )};
    
      const handleClick = (e) => {
        dispatch(seenNotifications((success, data) => {
            if(success){
                setNotificationsCount(0);
            }else{
                console.log('error', data);
            }
        }));
      }
    return (
        <div>
            <Badge count={notificationsCount} onClick={handleClick}>
                <Dropdown overlayClassName="notifcation-menu" trigger={['click']} overlay={menu} placement="bottomRight" arrow>
                    <BellFilled />
                </Dropdown>
            </Badge>
        </div>
    )
}
