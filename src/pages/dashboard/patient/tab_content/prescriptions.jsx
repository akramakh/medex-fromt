import React, {useState, useEffect} from 'react';
import { FaTrash, FaPrint, FaEye} from 'react-icons/fa';
  
  
  const init_pres = [
    {
      id: 10,
      title: "Prescription Title 1",
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
      }
    },
    {
      id: 11,
      title: "Prescription Title 2",
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
      }
    },
    {
      id: 12,
      title: "Prescription Title 3",
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
      }
    },
    {
      id: 13,
      title: "Prescription Title 4",
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
      }
    },
    {
      id: 14,
      title: "Prescription Title 5",
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
      }
    },
    
  ]
  
export default function PrescriptionsTab({user}) {
    
    const [prescriptions, setPrescriptions] = useState([]);
    
    useEffect(() => {
        setPrescriptions(init_pres);
        return () => {
            
        }
    }, []);

    const renderItemOptions = (item) => {
      const statusList =  ["view", "print", "delete"]
      const statusIconsMap = {
        view: <FaEye />,
        print: <FaPrint />,
        delete: <FaTrash />,
      }
      const statusClassMap = {
        view: "info",
        print: "success",
        delete: "danger",
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
          <a className={`btn btn-sm bg-${statusClassMap[s]}-light`} onClick={callback}>
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

    const renderPrescriptions = () => {
      const data = prescriptions.map(prescription => {
        const doctor = prescription.doctor;
        const doctorName = doctor.first_name ? `${doctor.first_name} ${doctor.last_name}` : doctor.username;
        const doctorUrl = `/doctors/${doctor.username}`;
        const title = prescription.title ? prescription.title : `Prescription ${prescription.id}`;
        return (
          <tr>
                <td>{prescription.date}</td>
                <td>{title}</td>
                <td>
                    <h2 className="table-avatar">
                        <a href={doctorUrl} className="avatar avatar-sm mr-2">
                            <img className="avatar-img rounded-circle" src="assets/img/doctors/doctor-thumb-01.jpg" alt="User Image" />
                        </a>
                        <a href={doctorUrl}>{`Dr. ${doctorName} `}<span>{doctor.speciality}</span></a>
                    </h2>
                </td>
                <td className="text-right">
                    {renderItemOptions(prescription)}
                </td>
        </tr>
        );
      });

      return <tbody>{data}</tbody>;
    }

    return (
        <div className="tab-content pt-0">
            <h2 className="tab-title">Prescriptions</h2>
            <div className="" id="pat_prescriptions">
                <div className="card card-table mb-0">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover table-center mb-0">
                                <thead>
                                    <tr>
                                        <th>Date </th>
                                        <th>Name</th>									
                                        <th>Created by </th>
                                        <th></th>
                                    </tr>     
                                </thead>
                                {renderPrescriptions()}	
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
