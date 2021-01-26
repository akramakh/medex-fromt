import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { Modal, Button, Input ,Alert} from 'antd';
import {createPatientAppountment} from '../../../actions/index';

const {TextArea} = Input;
const initStatus = {type: "error", message: "", show: false};
export default function AppointmentPopup(props) {
    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [status, setStatus] = useState(initStatus);
    const [description, setDescription] = useState("");
    const [purpose, setPurpose] = useState("");

    const closePopup = () => {
        setVisible(false);
        setBtnLoading(false);
        setStatus(initStatus);
        setDescription("");
    }

    const handleSubmit = () => {
        setBtnLoading(true);
        setStatus(initStatus);
        const data = {
            doctor: props.doctor.id,
            patient: props.user.id,
            description,
            purpose 
        };
        dispatch(createPatientAppountment(data, (success, data) => {
            if(success){
                console.log('data', data);
                setStatus({type: "success", message: "Appointment was created Successfully !", show: true})
                setDescription("");
                setPurpose("");
            }else{
                setStatus({type: "error", message: data, show: true});
            }
            setBtnLoading(false);
        }));
    }
    
    const renderPopup = () => {
        return (
            <Modal
                maskClosable
                centered
                closable
                visible={visible}
                onCancel={closePopup}
                footer={<>
                    <Button onClick={() => {closePopup()}} type="ghost" key="cancel">
                    Cancel
                    </Button>
                    <Button disabled={btnLoading || description.length === 0 || purpose.length === 0} loading={btnLoading} onClick={() => handleSubmit()} type="primary" key="console">
                    Submit
                    </Button>
                    </>}
                className="create-appointment"
                width={700}
            >
                <div className="content-container">
                <h2>Appointment Details</h2>
                {status.show ? <Alert message={status.message} type={status.type} showIcon /> : null}
                <Input className="in" onChange={(e) => setPurpose(e.target.value.trim())} value={purpose} placeholder="Purpose" />
                <TextArea className="in" onChange={(e) => setDescription(e.target.value.trim())} value={description} placeholder="Description"></TextArea>
                    
                </div>
            </Modal>
      
        )
    }


    return(
        <div>
            <Button type="primary" size="large" block onClick={() => setVisible(true)}>{props.text ? props.text : "Start Appointment"}</Button>
            {visible && renderPopup()}
        </div>
    )
    
}
