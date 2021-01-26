import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import Avatar from '../avatar';
import NotificationImage from './notificationImage';
import {FaTrash} from 'react-icons/fa';
import {
    deleteNotification
  } from '../../actions/index';
  import {Rate, DatePicker, Checkbox, Spin} from 'antd';
  import { LoadingOutlined } from '@ant-design/icons';
import './style.scss';

export default function NotificationItem({item, onDelete}) {
     const dispatch = useDispatch();

     const [loading, setLoading] = useState(false);

    const deleteItem = () => {
        setLoading(true);
        dispatch(deleteNotification(item.id, (success, data) => {
          if (success){
            console.log('data', data);
            onDelete(item.id);
          }else{
            console.log('error', data);
          }
          setLoading(false);
        }))
      }
    const spin = () => {
        const antIcon = <LoadingOutlined spin />;
        return (
                <Spin indicator={antIcon} /> 
        )
    }

    var a = moment(item.created_at);
    var b = moment();
    return (
        <div key={item.id} className={`notification-item ${item.seen ? " seen" : ""}`}>
            <div className="avatar-cont">
                {item.image ? 
                <NotificationImage image={item.image} width="46px" height="46px" circle />:
                <Avatar width="46px" height="46px" circle user={item.from_user} />}
            </div>
            <div className="notification-content">
                <p className="text">{item.text}</p>
                <span className="date">{a.to(b)}</span>
                <span className="options" onClick={deleteItem}>{loading ? spin() :<FaTrash />}</span>
            </div>
        </div>
    )
}
