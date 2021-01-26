import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {FaCheckCircle} from 'react-icons/fa';
import {FaClock, FaMapMarkerAlt, FaEnvelope, FaPhone, FaHome, FaBirthdayCake, FaHeartbeat, FaEye, FaVenusMars} from 'react-icons/fa';
import {Tooltip, Tag, Result, Empty, Spin, Modal, Button, Alert, message} from 'antd';
import InputCode from '../../../components/inputCode';
import {
  CheckCircleOutlined,
  LoadingOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import {fetchPatientData, fetchPatientConfirmedAppointments, viewAppountmentAction, createUserChat} from '../../../actions/index';
import ImagePH from '../../../assets/img/patients/patient1.jpg';
import AppointmentPopup from './appointmentPopup';
import Avatar from '../../../components/avatar';

import './style.scss';

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
        avatar: ImagePH,
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
        avatar: ImagePH,
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
        avatar: ImagePH,
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
        avatar: ImagePH,
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
        avatar: ImagePH,
        email: "michellefairfax@example.com",
        phone: "+1 504 368 6874",
        location: "Indiana, United States"
      }
    },
    
  ]

export default function PatientProfile(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  let {authReducer: {user}} = useSelector(state => state);

  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [itemToProceed, setItemToProceed] = useState(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [code, setCode] = useState(null);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [action, setAction] = useState("view");
  const [patient, setPatient] = useState(null);

    useEffect(() => {
        // load user data
        const {patient} = props;
        dispatch(fetchPatientData(patient, (success, data) => {
          if(success){
            const {data:patient} = data;
            setPatient(patient);
            dispatch(fetchPatientConfirmedAppointments(patient.id, (successApt, dataApt) => {
              if(successApt){
                setAppointments(dataApt);
                console.log('dataApt', dataApt);
              }else{
                console.log('data error', data);
              }
            }));
            console.log('data', data);
          }else{
            console.log('error', data);
          }
          setLoading(false);
        }));
        
        return () => {
        }
    }, [dispatch, props]);

    
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
    return (
        <div className="appointment-action">
            <Tooltip title="View">
                <a className={`btn btn-sm bg-info-light`} onClick={() => showCodePopup(item)} >
                    <FaEye />
                </a>
            </Tooltip>
        </div>
    );
  }


  const renderAppointments = () => {
    if (appointments.length === 0)
      return ( <div className="empty-result"><Empty description="No Appointments yet!" /></div>);
    
    const data = appointments.map(appointment => {
      const doctor = appointment.doctor;
      const doctorName = doctor.first_name ? `Dr. ${doctor.first_name} ${doctor.last_name}` : `Dr. ${doctor.username}`;
      const doctorUrl = doctor ? `/doctors/${doctor.username}` : "";
      return(
      <div key={appointment.id} className="appointment-list">
        <div className="profile-info-widget">
          
          <Avatar user={doctor} width="120px" height="120px"  className="booking-doc-img" />
          <div className="profile-det-info">
            <h3 className="title">
              <a href={doctorUrl}>{doctorName}</a>
              {renderTag(appointment)}
            </h3>
            
            <div className="patient-details">
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
              {/* <h5><FaClock /> {appointment.date}</h5>
              <h5><FaMapMarkerAlt /> {doctor.location}</h5>
              <h5><FaEnvelope /> <a href={`mailto:${doctor.email}`}>{doctor.email}</a></h5>
              <h5 className="mb-0"><FaPhone /> {doctor.phone}</h5> */}
            </div>
          </div>
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

  
  const renderConfirm = () => {
    return (
      <Modal
      maskClosable
        centered
        closable={false}
        visible={confirmVisible}
        footer={null}
        className="doctor-confirm-view"
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
        <Button loading={btnLoading} onClick={() => viewAppointment()} type="primary" key="console">
          Confirm
        </Button>
        </>
        </>
    </Modal>
  )

  }

  const renderInfo = () => {
      return(
        <div className="info">
            <div className='info-item'>
                <span>BIO</span>
                <p>{patient.bio}</p> 
            </div>
            <div className='info-item'>
                <span>Contact</span>
            
                <p className="info-item-iconed">
                    <FaHome />
                    {`${patient.country ? patient.country : ""}${patient.city ? ", " + patient.city : ""}${patient.address ? ", " + patient.address : ""}`}
                </p>
                <p className="info-item-iconed">
                    <FaEnvelope />
                    <a href={`mailto:${patient.email}`} >
                    {patient.email}
                    </a>
                </p>
                <p className="info-item-iconed">
                    <FaPhone />
                    {patient.phoneNumber}
                </p>
                <p className="info-item-iconed">
                    <FaBirthdayCake />
                    {patient.dob}
                </p>
                <p className="info-item-iconed">
                    <FaHeartbeat />
                    {patient.blood && patient.blood.toUpperCase()}
                </p>
                <p className="info-item-iconed">
                    <FaVenusMars />
                    {patient.gender && patient.gender}
                </p>
            </div>
            
        </div>
    
      );
  }

  const onContact = () => {
    dispatch(createUserChat(patient.id, (success, data) => {
      if(success){
        history.push('/chat');
        return
      }
    }))
  }

  if (loading){
    const antIcon = <LoadingOutlined spin />;
    return (
        <div className="spinner">
            <Spin indicator={antIcon} /> 
        </div>
    )
  }

  if(!patient){
    return(
      <div className="patient-profile">
        <Result
          status="404"
          title="Patient Does not exists !"
          subTitle="Sorry, the Patient you requested does not exist."
          extra={<a href="/" className="btn btn-primary" type="primary">Back Home</a>}
        />,
      </div>
    )
  }
    const patientName = patient.first_name ? `${patient.first_name} ${patient.last_name}` : patient.username;
    return (
        <div className="patient-profile">
            <div className="top-part">
                
                <Avatar user={patient} width="200px" height="200px" circle className="avatar" />
                <div className="info">
                <h2 className="user-name">{patientName} {true || patient.is_verified ? <FaCheckCircle className="badge" />: null}</h2>

                </div>
                <div className="counts">
                  <div className="count-item">
                    <span className="count">500</span>
                    <span className="title">Appts</span>
                  </div>
                  <div className="count-item">
                    <span className="count">100</span>
                    <span className="title">Doctors</span>
                  </div>
                  <div className="count-item">
                    <span className="count">1.5k</span>
                    <span className="title">Paid</span>
                  </div>
                </div>
                <div className="action-btns">
                    <AppointmentPopup patient={patient} user={user} />
                    <a className="btn btn-ghost"  onClick={onContact}>Contact</a>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col col-md-6">
                    <div className="user-info">
                        <h3>Patient Info</h3>
                        {renderInfo()}
                    </div>
                </div>
                <div className="col col-md-6">
                    <div className="appointments">
                        <h3>Confirmed Appointments</h3>
                        {renderAppointments()}
                    </div>
                </div>
            </div>
            {confirmVisible ? renderConfirm() : null}
        </div>
    )
}
