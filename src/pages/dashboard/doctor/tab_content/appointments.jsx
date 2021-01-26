import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  CheckCircleOutlined,
  LoadingOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import { FaTrash, FaCheck, FaTimes, FaEye} from 'react-icons/fa';
import {Tag, Modal, Empty, Spin} from 'antd';
import Avatar from '../../../../components/avatar';
import {
  fetchPatientAppointments,
  fetchSingleAppointment,
  updateSingleAppointment,
  deleteSingleAppointment
} from '../../../../actions/index';
import AppointmentDetails from '../appointmentDetails';

const { confirm } = Modal;

const init_apps = [
  {
    id: 10,
    title: "Appointment Title",
    date: "14 Nov 2019",
    time: "10.00 AM",
    booking_date: "04 Nov 2019",
    followup_date: "26 Nov 2019",
    status: "unconfirmed", 
    amount: 120,
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
    date: "12 Nov 2019",
    time: "10.00 AM",
    booking_date: "06 Nov 2019",
    followup_date: "26 Nov 2019",
    status: "canceled", 
    amount: 100,
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
    date: "11 Nov 2019",
    time: "8.00 PM",
    booking_date: "01 Nov 2019",
    followup_date: "23 Nov 2019",
    status: "confirmed", 
    amount: 190,
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
    date: "9 Nov 2019",
    time: "9.00 AM",
    booking_date: "22 Oct 2019",
    followup_date: "21 Nov 2019",
    status: "confirmed", 
    amount: 90,
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
    date: "9 Nov 2019",
    time: "01.00 PM",
    booking_date: "04 Nov 2019",
    followup_date: "20 Nov 2019",
    status: "unconfirmed", 
    amount: 210,
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

export default function AppointmentsTab({user}) {
    const dispatch = useDispatch();

    const [appointments, setAppointments] = useState([]);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [itemToShow, setItemToShow] = useState(null);
    const [today, setToday] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      setLoading(true);
      dispatch(fetchPatientAppointments(today, (success, data) => {
        if(success){
            console.log('data', data);
            setAppointments(data);
        }else{
          console.log('data', data);
        }
        setLoading(false);
    }));
        return () => {
            
        }
    }, [dispatch, today]);

    const toggleDrawer = (show=false) => {
      setDrawerVisible(show);
      if(!show){
        setItemToShow(null);
      }
    } 
    

    const viewItem = (id) => {
      toggleDrawer(true);
      dispatch(fetchSingleAppointment(id, (success, data) => {
        if (success){
          console.log('data', data);
          setItemToShow(data);
        }else{
          toggleDrawer(false);
          console.log('error', data);
        }
      }))
    }

    const confirmItem = (id) => {
      const data = {
        status: "confirmed"
      }
      dispatch(updateSingleAppointment(id, data, (success, res) => {
        if (success){
          const newAppts = appointments.map(item => {
            if (item.id === id){
              return {...item, ...data};
            }
            return item;
          });
          setAppointments(newAppts);
          console.log('res', res);
        }else{
          console.log('error', res);
        }
      }))
    }

    const cancelItem = (id) => {
      const data = {
        status: "canceled"
      }
      dispatch(updateSingleAppointment(id, data, (success, res) => {
        if (success){
          console.log('res', res);
          const newAppts = appointments.map(item => {
            if (item.id === id){
              return {...item, ...data};
            }
            return item;
          });
          setAppointments(newAppts);
        }else{
          console.log('error', res);
        }
      }))
    }

    const handleUpdate = (id, data, cb) => {
      dispatch(updateSingleAppointment(id, data, (success, res) => {
        if (success){
          console.log('res', res);
          const newAppts = appointments.map(item => {
            if (item.id === id){
              return {...item, ...data};
            }
            return item;
          });
          setAppointments(newAppts);
        }else{
          console.log('error', res);
        }
        cb && cb(success, res);
      }))
    }

    const deleteItem = (id) => {
      dispatch(deleteSingleAppointment(id, (success, data) => {
        if (success){
          console.log('data', data);
          const newAppts = appointments.filter(item => item.id !== id);
          setAppointments(newAppts);
        }else{
          console.log('error', data);
        }
      }))
    }

    function showDeleteConfirm(id) {
      confirm({
        title: 'Are you sure delete this Appointment?',
        icon: <ExclamationCircleOutlined />,
        content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          deleteItem(id)
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }

    const renderItemOptions = (item) => {
      const nextStatusList = {
        confirmed: ["view"],
        unconfirmed: ["view", "confirm", "cancel", "delete"],
        canceled: ["view", "delete"]
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
      const statusCallbacks = {
        view: viewItem,
        confirm: confirmItem,
        cancel: cancelItem,
        delete: showDeleteConfirm,
      }
      const nextList = nextStatusList[item.status] || ['delete'];
      const list = nextList.map(s => {
        const callback = (id) => {
          statusCallbacks[s](id);
        }
        return (
          <a className={`btn btn-sm bg-${statusClassMap[s]}-light`} onClick={() => callback(item.id)}>
            {statusIconsMap[s]} {s}
          </a>
        );
      })
      return (
        <div className="appointment-action table-action">
          {list}
        </div>
      )
    }

    const renderTag = (item) => {
      const statusMap = {
        confirmed: "success",
        // unconfirmed: "processing",
        unconfirmed: "info",
        canceled: "default"
      }
      const statusIconsMap = {
        confirmed: <CheckCircleOutlined />,
        unconfirmed: <ClockCircleOutlined />,
        canceled: <MinusCircleOutlined />
      }
      return <span className={`badge badge-pill bg-${statusMap[item.status]}-light`}>{item.status}</span>
      return <Tag className="status" color={statusMap[item.status] || 'error'} icon={statusIconsMap[item.status] || <CloseCircleOutlined />} >{item.status}</Tag>
    } 

    const renderAppointments = () => {
      if (loading){
        const antIcon = <LoadingOutlined spin />;
        return (
            <div className="spinner">
                <Spin indicator={antIcon} /> 
            </div>
        )
      }

      if (appointments.length === 0){
        return ( <div className="empty-result"><Empty description="You have no Appointments yet!" /></div>);
      }
      const data = appointments.map(appointment => {
        const patient = appointment.patient_info;
        const patientName = patient.first_name ? `${patient.first_name} ${patient.last_name}` : patient.username;
        const patientUrl = `/patients/${patient.username}`;
        const appointmentNumber = `#PT${appointment.id}`;
        return (
          <tr>
            <td>
                <h2 className="table-avatar">
                  <Avatar width="60px" height="60px" user={patient} />
                    
                    <a href={patientUrl}>{` Dr. ${patientName} `}<span>{appointmentNumber}</span></a>
                </h2>
            </td>
            <td>{appointment.date} <span className="d-block text-info">{appointment.time}</span></td>
            <td>{appointment.purpose || "—"}</td>
            <td>{appointment.type || '—'}</td>
            <td>{`$${appointment.amount}`}</td>
            <td>{renderTag(appointment)}</td>
            <td className="text-right">
              {renderItemOptions(appointment)}
            </td>
        </tr>
        );
      });

      return (
        <div className="table-responsive">
          <table className="table table-hover table-center mb-0">
            <thead>
                <tr>
                    <th>Patient Name</th>
                    <th>Appt Date</th>
                    <th>Purpose</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>{data}</tbody>
          </table>
        </div>)
    }

    

    return (
      <div className="tab-content pt-0">
        <div className="tab-header">

          <h2 className="tab-title">Appointments</h2>
          <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded">
              <li className="nav-item">
                  <a className="nav-link active" href="#upcoming-appointments" data-toggle="tab"  onClick={() => setToday(false)}>All</a>
              </li>
              <li className="nav-item">
                  <a className="nav-link" href="#today-appointments" data-toggle="tab" onClick={() => setToday(true)}>Today</a>
              </li> 
          </ul>
        </div>
        <div id="pat_appointments" className="">
          <div className="card card-table mb-0">
              <div className="card-body">
                {renderAppointments()}                        
              </div>
          </div>
        </div>
        <AppointmentDetails item={itemToShow} visible={drawerVisible} onUpdate={handleUpdate} onClose={() => toggleDrawer(false)} />
      </div>

    )
}
