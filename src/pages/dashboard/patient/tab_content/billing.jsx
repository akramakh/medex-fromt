import React, {useState, useEffect} from 'react';
import { FaTrash, FaPrint, FaEye} from 'react-icons/fa';
  
  
const init_invoices = [
{
    id: 10,
    invoice_no: "INV-0001",
    date: "14 Nov 2019",
    amount: 200,
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
    invoice_no: "INV-0002",
    date: "12 Nov 2019",
    amount: 120,
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
    invoice_no: "INV-0003",
    date: "11 Nov 2019",
    amount: 100,
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
    invoice_no: "INV-0004",
    date: "9 Nov 2019",
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
    },
    attachment: {
        url: "#",
        name: "rec_103.pdf"
    }
},
{
    id: 14,
    invoice_no: "INV-0005",
    date: "9 Nov 2019",
    amount: 250,
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

export default function BillingTab({user}) {
    
    const [invoices, setInvoices] = useState([]);
    
    useEffect(() => {
        setInvoices(init_invoices);
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

    const renderInvoices = () => {
        const data = invoices.map(invoice => {
          const doctor = invoice.doctor;
          const doctorName = doctor.first_name ? `${doctor.first_name} ${doctor.last_name}` : doctor.username;
          const doctorUrl = `/doctors/${doctor.username}`;
          const INV_ID = `#${invoice.invoice_no}`;
          return (
            <tr>
                  <td><a >{INV_ID}</a></td>
                  <td>
                      <h2 className="table-avatar">
                          <a href={doctorUrl} className="avatar avatar-sm mr-2">
                              <img className="avatar-img rounded-circle" src="assets/img/doctors/doctor-thumb-01.jpg" alt="User Image" />
                          </a>
                          <a href={doctorUrl}>{`Dr. ${doctorName} `}<span>{doctor.speciality}</span></a>
                      </h2>
                  </td>
                  <td>{`$${invoice.amount}`}</td>
                  <td>{invoice.date}</td>                      
                  <td className="text-right">
                      {renderItemOptions(invoice)}
                  </td>
              </tr>
          );
        });
  
        return <tbody>{data}</tbody>;
      }
    

    return (
        <div className="tab-content pt-0">
            <h2 className="tab-title">Billing Information</h2>
            <div id="pat_billing" className="">
                <div className="card card-table mb-0">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover table-center mb-0">
                                <thead>
                                    <tr>
                                        <th>Invoice No</th>
                                        <th>Doctor</th>
                                        <th>Amount</th>
                                        <th>Paid On</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                {renderInvoices()}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    

    )
}
