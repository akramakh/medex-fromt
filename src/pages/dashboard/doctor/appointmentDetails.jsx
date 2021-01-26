import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Spin, Divider } from 'antd';
import {FaTimes, FaMapMarkerAlt, FaEnvelope, FaPhone, FaHome, FaBirthdayCake, FaEdit, FaPencilAlt, FaVenusMars} from 'react-icons/fa';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Avatar from '../../../components/avatar';

const { Option } = Select;
export default function AppointmentDetails({item, visible, onClose, onUpdate}) {
    const dispatch = useDispatch();

    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const [followupDate, setFollowupDate] = useState("");
    const [purpose, setPurpose] = useState("");
    const [suggestedPurpose, setSuggestedPurpose] = useState("");
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");
    const [suggestedType, setSuggestedType] = useState("");
    const [patient, setPatient] = useState(null);
    const [edit, setEdit] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [purposeList, setPurposeList] = useState(['Gneral', 'Review']);
    const [typeList, setTypeList] = useState(['Public', 'Private', 'VIP']);

    useEffect(() => {
        if (item){
            setId(item.id);
            setTitle(item.title);
            setDescription(item.description);
            setAmount(item.amount);
            setFollowupDate(item.followup_date);
            setPurpose(item.purpose);
            setStatus(item.status);
            setType(item.type);
            setPatient(item.patient_info);
        }
        return () => {
            setId("");
            setTitle("");
            setDescription("");
            setAmount(0);
            setFollowupDate("");
            setPurpose("");
            setStatus("");
            setType("");
            setPatient(null);
            setEdit(false);
        }
    }, [item]);

    const isUpdated = (val1, val2) => {
        const val_1 = val1? String(val1).trim(): null;
        const val_2 = val2? String(val2).trim(): null;
        return val_1 !== val_2;
      }

    const getChanged = () => {
        if(item){
            const data = {};
            if (isUpdated(item.title, title)){
                data['title'] = title;
            }
            if (isUpdated(item.description, description)){
                data['description'] = description;
            }
            if (isUpdated(item.amount, amount)){
                data['amount'] = amount;
            }
            if (isUpdated(item.followup_date, followupDate)){
                data['followup_date'] = followupDate;
            }
            if (isUpdated(item.purpose, purpose)){
                data['purpose'] = purpose;
            }
            if (isUpdated(item.status, status)){
                data['status'] = status;
            }
            if (isUpdated(item.type, type)){
                data['type'] = type;
            }

            return data;
        }else{
            return {};
        }
    }

    const checkValuesChanged = () => {
        const data = getChanged();

        if (Object.keys(data).length === 0){
            return false;
        }else{
            return true;
        }
    }

    useEffect(() => {
        const valuesChanged = checkValuesChanged();
        if (edit && valuesChanged){
            setBtnDisabled(false);
        }else{
            setBtnDisabled(true);
        }
    }, [checkValuesChanged, edit]);

    const handleSubmit = () => {
        setBtnLoading(true);
        const data = getChanged();
        onUpdate(id, data, (success, res) => {
            if (success){
              console.log('res', res);
            }else{
              console.log('error', res);
            }
            setBtnLoading(false);
          })
    }

    const handleDateChange = (date, dateString) => {
        setFollowupDate(dateString);
    }

    const renderPatientInfo = () => {
        const patientName = patient ? patient.title ? `${patient.first_name} ${patient.last_name}` : patient.username : "";
        const patientUrl = patient ? `/patients/${patient.username}` : "";
        const appointmentNumber = `#PT${id}`;
        return(
            <Row >
                <Col span={24}>
                <h2 className="table-avatar">
                    <Avatar width="120px" height="120px" user={patient} />
                    <div className="patient-info">
                        <a className="name" href={patientUrl}>{`${patientName} `}<span>{`${patient.gender}  (${patient.blood ? patient.blood.toUpperCase() : "-"})`}</span></a>
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
                    </div>
                </h2>
                </Col>
            </Row> 
        )
    }

    const renderItemOptions = () => {
        const nextStatusList = {
          confirmed: ["confirmed", "deleted"],
          unconfirmed: ["unconfirmed", "confirmed", "canceled", "deleted"],
          canceled: ["canceled", "deleted"]
        }
        const statusClassMap = {
          view: "",
          confirmed: "",
          canceled: "",
          deleted: "danger",
        }
        
        const nextList = nextStatusList[status] || ['deleted'];
        const list = nextList.map(s => {
          return (
            <Option className={`bg-${statusClassMap[s]}-light`} id={s} value={s}>{s}</Option>
          );
        })
        return (
            <Select onSelect={(v) => setStatus(v)} defaultValue={status} value={status} placeholder="Please select an purpose">
                {list}
            </Select>
        )
      }
      
      const renderStatus = () => {
        const statusMap = {
            confirmed: "success",
            // unconfirmed: "processing",
            unconfirmed: "info",
            canceled: "default"
        }
        //   const statusIconsMap = {
        //     confirmed: <CheckCircleOutlined />,
        //     unconfirmed: <ClockCircleOutlined />,
        //     canceled: <MinusCircleOutlined />
        //   }
        return <span className={`badge badge-pill bg-${statusMap[status]}-light`}>{status}</span>
    }
            

    const renderPurposeOptions = () => {
        const dropdownRender = menu => (
            <div>
              {menu}
              <Divider style={{ margin: '4px 0' }} />
              <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                <Input style={{ flex: 'auto' }} value={suggestedPurpose} onChange={(e) => {setSuggestedPurpose(e.target.value); }} />
                <a
                  style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                  onClick={() => setPurposeList([...purposeList, suggestedPurpose])}
                >
                  <PlusOutlined /> Add item
                </a>
              </div>
            </div>
          )
        
        const list = purposeList.map(pur => {
            return (
            <Option key={pur}  id={pur} value={pur}>{pur}</Option>
            );
        })
        return (
            <Select dropdownRender={dropdownRender} onSelect={(v) => setPurpose(v)} defaultValue={purpose} value={purpose} placeholder="Please select an purpose">
                {list}
            </Select>
        )
    }

    const renderTypeOptions = () => {
        const dropdownRender = menu => (
            <div>
              {menu}
              <Divider style={{ margin: '4px 0' }} />
              <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                <Input style={{ flex: 'auto' }} value={suggestedType} onChange={(e) => {setSuggestedType(e.target.value); }} />
                <a
                  style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                  onClick={() => setTypeList([...typeList, suggestedType])}
                >
                  <PlusOutlined /> Add item
                </a>
              </div>
            </div>
          )

        const list = typeList.map(t => {
            return (
            <Option key={t} id={t} value={t}>{t}</Option>
            );
        })
        return (
            <Select dropdownRender={dropdownRender} onSelect={(v) => setType(v)} defaultValue={type} value={type} placeholder="Please select a type">
                {list}
            </Select>
        )
    }
    
    
    const renderContent = () => {
        console.log('item', item)
        if (id === ""){
            const antIcon = <LoadingOutlined spin />;
            return (
                <div className="spinner">
                    <Spin indicator={antIcon} /> 
                </div>
            )
        }else{
            
            return (
                <Form className="appontment-details-content" layout="vertical" hideRequiredMark>
                {status === "unconfirmed"  ? <span onClick={() => setEdit(!edit)} className="edit-btn">
                    {edit ? <FaTimes /> : <FaPencilAlt />}
                </span> : null}
                {renderPatientInfo()}  
                <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: 'Please enter user name' }]}
                    >
                    {edit ? 
                    <Input placeholder="Please enter Title" defaultValue={title} value={title} onChange={(e) => setTitle(e.target.value)} />:
                    <p>{title}</p>
                    }
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true, message: 'Please enter status' }]}
                    >
                    {edit ? 
                    renderItemOptions():
                    <p>{renderStatus()}</p>
                    }
                    </Form.Item>
                    
                </Col>
                </Row>
                <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                    name="purpose"
                    label="Purpose"
                    rules={[{ required: true, message: 'Please select an purpose' }]}
                    >
                    {edit ? 
                    renderPurposeOptions():
                    <p>{purpose}</p>
                    }      
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                    name="type"
                    label="Type"
                    rules={[{ required: true, message: 'Please choose the type' }]}
                    >
                     {edit ? 
                    renderTypeOptions():
                    <p>{type}</p>
                    }
                    </Form.Item>
                </Col>
                </Row>
                <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                    name="amount"
                    label="Amount"
                    rules={[{ required: true, message: 'Please choose the amount' }]}
                    >
                    {edit ? 
                    <Input value={amount} defaultValue={amount} onChange={(e) => setAmount(e.target.value)} addonBefore="$" placeholder="Please choose the amount" />:
                    <p>{`$${amount}`}</p>
                    }
                        
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                    name="followupDate"
                    label="Followup Date"
                    rules={[{ required: true, message: 'Please choose the dateTime' }]}
                    >
                    {edit ? 
                    <DatePicker
                        style={{ width: '100%' }}
                        onChange={handleDateChange} defaultValue={followupDate ? moment(followupDate, 'YYYY-MM-DD') : null} 
                        value={followupDate ? moment(followupDate, 'YYYY-MM-DD') : null}
                        getPopupContainer={trigger => trigger.parentElement}
                    />:
                    <p>{followupDate ? followupDate.split('T')[0] : "—"}</p>
                    }
                    </Form.Item>
                </Col>
                </Row>
                <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                        {
                        required: true,
                        message: 'please enter url description',
                        },
                    ]}
                    >
                    {edit ? 
                    <Input.TextArea rows={4} placeholder="please enter url description" defaultValue={description} onChange={(e) => setDescription(e.target.value)} >{description}</Input.TextArea>:
                    <p>{description}</p>
                    }
                    </Form.Item>
                </Col>
                </Row>
            </Form>
            )
        }
    }

    return (
      <>
        <Drawer
          title="Appointment Details"
          width={720}
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button disabled={btnDisabled} loading={btnLoading} onClick={handleSubmit} type="primary">
                update
              </Button>
            </div>
          }
        >
          {renderContent()}
        </Drawer>
      </>
    );
  


}
