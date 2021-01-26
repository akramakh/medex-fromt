import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { FaPhone, FaEye} from 'react-icons/fa';
import Avatar from  '../../../../components/avatar';
import {fetchPatients} from '../../../../actions/index';
import moment from 'moment';
  
const init_rec = [
{
    id: 10,
    description: "Medical Record Discription 1",
    date: "14 Nov 2019",
    doctor: {
    id: 100,
    first_name: "Richard",
    last_name: "Wilson",
    username: "richard",
    avatar: null,
    email: "richard@example.com",
    phone: "+1 923 782 4575",
    location: "Newyork, United States"
    },
    attachment: {
        url: "#",
        name: "rec_100.pdf"
    }
},
{
    id: 11,
    description: "Medical Record Discription 2",
    date: "12 Nov 2019",
    doctor: {
    id: 100,
    first_name: "Charlene",
    last_name: "Reed",
    username: "charlenereed",
    avatar: null,
    email: "charlenereed@example.com",
    phone: "+1 828 632 9170",
    location: "North Carolina, United States"
    },
    attachment: {
        url: "#",
        name: "rec_101.pdf"
    }
},
{
    id: 12,
    description: "Medical Record Discription 3",
    date: "11 Nov 2019",
    doctor: {
    id: 100,
    first_name: "Travis",
    last_name: "Trimble",
    username: "travistrimble",
    avatar: null,
    email: "travistrimble@example.com",
    phone: "+1 207 729 9974",
    location: "Maine, United States"
    },
    attachment: {
        url: "#",
        name: "rec_102.pdf"
    }
},
{
    id: 13,
    description: "Medical Record Discription 4",
    date: "9 Nov 2019",
    doctor: {
    id: 100,
    first_name: "Carl",
    last_name: "Kelly",
    username: "carlkelly",
    avatar: null,
    email: "carlkelly@example.com",
    phone: "+1 260 724 7769",
    location: "Newyork, United States"
    },
    attachment: {
        url: "#",
        name: "rec_103.pdf"
    }
},
{
    id: 14,
    description: "Medical Record Discription 5",
    date: "9 Nov 2019",
    doctor: {
    id: 100,
    first_name: "Michelle",
    last_name: "Fairfax",
    username: "michellefairfax",
    avatar: null,
    email: "michellefairfax@example.com",
    phone: "+1 504 368 6874",
    location: "Indiana, United States"
    },
    attachment: {
        url: "#",
        name: "rec_104.pdf"
    }
},

]
  

export default function MedicalRecordsTab({user}) {
    
    const [medicalRecords, setMedicalRecords] = useState([]);
    const dispatch = useDispatch();
    const [patients, setPatients] = useState([]);
    const [hasNext, setHasNext] = useState(false);
    
    useEffect(() => {
        dispatch(fetchPatients((success, data) => {
            if(success){
                setPatients(data.data);
                setHasNext(data.next);
            }else{

            }
        }));
        setMedicalRecords(init_rec);
        return () => {
            
        }
    }, [dispatch]);

    const renderItemOptions = (item) => {
      const statusList =  ["visit", "contact"]
      const statusIconsMap = {
        visit: <FaEye />,
        contact: <FaPhone />,
      }
      const statusClassMap = {
        visit: "info",
        contact: "success",
      }
      const statusLinksMap = {
        visit: `/patients/${item.username}`,
        contact: "/chat",
      }
      const list = statusList.map(s => {
        // const url = `/status/${s}`;
        // let callback = () => changeStatus(item.id, url);
        // if (s === 'confirm' || s === 'view'){
        const callback = () => {
          // setAction(s);
          // showCodePopup(item);
        }
        // }
        return (
          <a className={`btn btn-sm bg-${statusClassMap[s]}-light`} href={statusLinksMap[s]}>
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

    const renderMedicalRecords = () => {
      const data = patients.map(patient => {
        const patientName = patient.first_name ? `${patient.first_name} ${patient.last_name}` : patient.username;
        const patientUrl = `/patients/${patient.username}`;
        return (
          <tr>
                <td><a >{patient.id}</a></td>
                <td>
                    <h2 className="table-avatar">
                        <Avatar width={60} height={60} circle user={patient} />
                        {/* <a href={patientUrl} className="avatar avatar-sm mr-2">
                            <img className="avatar-img rounded-circle" src="assets/img/patients/patient-thumb-01.jpg" alt="User Image" />
                        </a> */}
                        <a href={patientUrl}>{`${patientName} `}<span></span></a>
                    </h2>
                </td>
                <td>{patient.dob || "--"}</td>
                <td>{patient.gender || "--"}</td>
                <td>{patient.blood || "--"}</td>
                    
                <td className="text-right">
                    {renderItemOptions(patient)}
                </td>
            </tr>
        );
      });

      return <tbody>{data}</tbody>;
    }

    return (
        <div className="tab-content pt-0">
            <h2 className="tab-title">My Patients</h2>
            <div id="pat_medical_records " className="">
                <div className="card card-table mb-0">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover table-center mb-0">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Full Name</th>
                                        <th>Date of Birth</th>
                                        <th>gender</th>
                                        <th>Blood</th>
                                        <th></th>
                                    </tr>     
                                </thead>
                                {renderMedicalRecords()} 	
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    

    )
}
