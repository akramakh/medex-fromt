import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {FaClock, FaMapMarkerAlt, FaEnvelope, FaPhone, FaTrash, FaCheck, FaTimes, FaEye, FaBirthdayCake, FaHome} from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {Tooltip, Tag, DatePicker, Checkbox, Spin, Modal, Button, Alert, message, Col, Row} from 'antd';
import InputCode from '../../components/inputCode';
import {
  CheckCircleOutlined,
  LoadingOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import {fetchAppountments, confirmAppountmentAction, viewAppountmentAction} from '../../actions/index';
// import UserAvatar from '../avatar';
import Avatar from '../avatar';
import './index.scss';


const init_apps = [
  {
    id: 10,
    title: "Appointment Title",
    date: "14 Nov 2019, 10.00 AM",
    status: "unconfirmed", 
    doctor: {
      id: 100,
      first_name: "Richard",
      last_name: "Wilson",
      username: "richard",
      avatar: null,
      email: "richard@example.com",
      phone: "+1 923 782 4575",
      location: "Newyork, United States"
    }
  },
  {
    id: 11,
    title: "Appointment Title",
    date: "12 Nov 2019, 5.00 PM",
    status: "canceled", 
    doctor: {
      id: 100,
      first_name: "Charlene",
      last_name: "Reed",
      username: "charlenereed",
      avatar: null,
      email: "charlenereed@example.com",
      phone: "+1 828 632 9170",
      location: "North Carolina, United States"
    }
  },
  {
    id: 12,
    title: "Appointment Title",
    date: "11 Nov 2019, 8.00 PM",
    status: "confirmed", 
    doctor: {
      id: 100,
      first_name: "Travis",
      last_name: "Trimble",
      username: "travistrimble",
      avatar: null,
      email: "travistrimble@example.com",
      phone: "+1 207 729 9974",
      location: "Maine, United States"
    }
  },
  {
    id: 13,
    title: "Appointment Title",
    date: "9 Nov 2019, 9.00 AM",
    status: "confirmed", 
    doctor: {
      id: 100,
      first_name: "Carl",
      last_name: "Kelly",
      username: "carlkelly",
      avatar: null,
      email: "carlkelly@example.com",
      phone: "+1 260 724 7769",
      location: "Newyork, United States"
    }
  },
  {
    id: 13,
    title: "Appointment Title",
    date: "9 Nov 2019, 1.00 PM",
    status: "unconfirmed", 
    doctor: {
      id: 100,
      first_name: "Michelle",
      last_name: "Fairfax",
      username: "michellefairfax",
      avatar: null,
      email: "michellefairfax@example.com",
      phone: "+1 504 368 6874",
      location: "Indiana, United States"
    }
  },
  
]

export default function Appointments() {

  const dispatch = useDispatch();
  let {authReducer: {user}} = useSelector(state => state);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemToProceed, setItemToProceed] = useState(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [code, setCode] = useState(null);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [action, setAction] = useState("view");
 
  

  
  useEffect(() => {
    // setAppointments(init_apps);
    dispatch(fetchAppountments((success, data) => {
      if (success){
        setAppointments(data);
        console.log('data', data);
      }else{
        console.log('error', data);
      }
      setLoading(false);
    }));
    return () => {
    }
  }, [dispatch]);

  const changeStatus = (id, url) => {
    console.log('id, url', id, url);
  }

  const renderTag = (item) => {
    const statusMap = {
      confirmed: "success",
      unconfirmed: "processing",
      canceled: "default"
    }
    const statusIconsMap = {
      confirmed: <CheckCircleOutlined />,
      unconfirmed: <ClockCircleOutlined />,
      canceled: <MinusCircleOutlined />
    }
    return <Tag className="status" color={statusMap[item.status] || 'error'} icon={statusIconsMap[item.status] || <CloseCircleOutlined />} >{item.status}</Tag>
  } 

  const renderItemOptions = (item) => {
    const nextStatusList = {
      confirmed: ["view"],
      unconfirmed: ["view", "confirm", "delete"],
      canceled: ["view"]
    }
    const statusIconsMap = {
      view: <FaEye />,
      confirm: <FaCheck />,
      cancel: <FaTimes />,
      delete: <FaTrash />,
    }
    const statusClassMap = {
      view: "info",
      confirm: "success",
      cancel: "default",
      delete: "danger",
    }
    const nextList = nextStatusList[item.status] || ['delete'];
    const list = nextList.map(s => {
      const url = `/status/${s}`;
      let callback = () => changeStatus(item.id, url);
      if (s === 'confirm' || s === 'view'){
        callback = () => {
          setAction(s);
          showCodePopup(item);
        }
      }
      return (
        <Tooltip title={s}>
          <a className={`btn btn-sm bg-${statusClassMap[s]}-light`} onClick={callback} >
            {statusIconsMap[s]}
          </a>
        </Tooltip>
      );
    })
    return (
      <div className="appointment-action">
        {list}
      </div>
    )
  }

  const renderDoctorInfo = (doctor) => {
    const doctorName = doctor.first_name ? `Dr. ${doctor.first_name} ${doctor.last_name}` : `Dr. ${doctor.username}`;
    const doctorUrl = doctor ? `/doctors/${doctor.username}` : "";
    return(
        <Row >
            <Col span={24}>
            <h2 className="table-avatar">
                <Avatar width="120px" height="120px" user={doctor} />
                <div className="doctor-info">
                    <a className="name" href={doctorUrl}>{`${doctorName} `}<span>{`${doctor.gender} `}</span></a>
                    <p className="info-item-iconed">
                        <FaHome />
                        {`${doctor.country ? doctor.country : ""}${doctor.city ? ", " + doctor.city : ""}${doctor.address ? ", " + doctor.address : ""}`}
                    </p>
                    <p className="info-item-iconed">
                        <FaEnvelope />
                        <a href={`mailto:${doctor.email}`} >
                        {doctor.email || "--"}
                        </a>
                    </p>
                    <p className="info-item-iconed">
                        <FaPhone />
                        {doctor.phoneNumber || "--"}
                    </p>
                    <p className="info-item-iconed">
                        <FaBirthdayCake />
                        {doctor.dob || "--"}
                    </p>
                </div>
            </h2>
            </Col>
        </Row> 
    )
}

  const renderAppointments = () => {
    if (appointments.length === 0)
      return <p className='alert alert-warning'>No Appointments yet</p>;
    
    const data = appointments.map(appointment => {
      const doctor = appointment.doctor;
      
      
      return(
      <div key={appointment.id} className="appointment-list">
        <div className="profile-info-widget">
          {renderDoctorInfo(doctor)}
          <h3 className="title">
            {renderTag(appointment)}
          </h3>
         
        {renderItemOptions(appointment)}
        </div>
            {appointment.content ? <p><strong>Content: </strong>{appointment.content}</p> : null}
      </div>
      
    )});
    return <div className="appointments">{data}</div>
   
  }

  const showCodePopup = (item) => {
    setItemToProceed(item);
    setConfirmVisible(true);
  }

  const closeConfirm = () => {
    setConfirmVisible(false);
    setCode(null);
    setShowError(false);
    setItemToProceed(null);
  }

  const confirmAppointment = () => {
    setBtnLoading(true);
    dispatch(confirmAppountmentAction(code, itemToProceed.id, (success, data) => {
        if (success){
          const newAppointments = appointments.map(item => {
            if (item.id === itemToProceed.id){
              return {...item, status: "confirmed"}
            }
            return item;
          })
          setAppointments(newAppointments);
          message.success('Appointment was confirmed Successfully');
          setShowError(false);
          closeConfirm();
        }else{
          setShowError(true);
          setError("invalid code");
        }
        setBtnLoading(false);
    }) );
  }

  const viewAppointment = () => {
    setBtnLoading(true);
    dispatch(viewAppountmentAction(code, itemToProceed.id, (success, data) => {
        if (success){
          console.log('data-decrypted', data);
          const newAppointments = appointments.map(item => {
            if (item.id === itemToProceed.id){
              return {...item, content: data.content}
            }
            return item;
          })
          console.log('newAppointments', newAppointments)
          setAppointments(newAppointments);
          setShowError(false);
          closeConfirm();
        }else{
          setShowError(true);
          setError("invalid code");
        }
        setBtnLoading(false);
    }) );
  }

  const confirmAction = () => {
    switch(action){
      case 'view':
        viewAppointment();
        break;
      case 'confirm':
        confirmAppointment();
        break;
      default:
        return;
    }
  }

  const renderConfirm = () => {
    return (
      <Modal
      maskClosable
        centered
        closable={false}
        visible={confirmVisible}
        footer={null}
        className="patient-confirm-view"
        width={400}
    >
      <>
      {showError ? <Alert message={error} type="error" showIcon /> : null}
      <InputCode
        length={4}
        label={`Type Your Secret Code to ${action}`}
        // confirmVisible={confirmVisible}
        // clear={clearCode}
        onComplete={code => {
            // setConfirmVisible(true);
            setCode(code);
        // setTimeout(() => setLoading(false), 1000);
        }}
      />
        <>
        <Button onClick={() => {closeConfirm()}} type="ghost" key="cancel">
          Cancel
        </Button>
        <Button loading={btnLoading} onClick={() => confirmAction()} type="primary" key="console">
          Confirm
        </Button>
        </>
        </>
    </Modal>
  )

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
    <div id="appointments" className="container-fluid">

      <div className="row">
        <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
        
        <div className="card search-filter">
          <div className="card-header">
              <h4 className="card-title mb-0">Appointments Filter</h4>
          </div>
          <div className="card-body">
          <div className="filter-widget">
              <DatePicker size="large" style={{width: "100%"}} onChange={onChange} />			
          </div>
          <div className="filter-widget">
              <h4>Current State</h4>
              <div>
                  <Checkbox onChange={onChange}>Confirmed</Checkbox>
              </div>
              <div>
                  <Checkbox onChange={onChange}>Un-Confirmed</Checkbox>
              </div>
              <div>
                  <Checkbox onChange={onChange}>Canceled</Checkbox>
              </div>
          </div>
              <div className="btn-search">
                  <button type="button" className="btn btn-block">Apply Filters</button>
              </div>	
          </div>
      </div>    
      
        </div>
        
        <div className="col-md-7 col-lg-8 col-xl-9">
          <div className="appointments">
          
            {renderAppointments()}
            
          </div>
          {confirmVisible ? renderConfirm() : null}
        </div>
      </div>

    </div>
  )

}
