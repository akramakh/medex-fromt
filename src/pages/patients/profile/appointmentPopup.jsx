import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { Modal, Button, Input ,Alert} from 'antd';
import {createAppountment} from '../../../actions/index';

const {TextArea} = Input;
const initStatus = {type: "error", message: "", show: false};
export default function AppointmentPopup(props) {
    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [status, setStatus] = useState(initStatus);
    const [content, setContent] = useState("");

    const closePopup = () => {
        setVisible(false);
        setBtnLoading(false);
        setStatus(initStatus);
        setContent("");
    }

    const handleSubmit = () => {
        setBtnLoading(true);
        setStatus(initStatus);
        const data = {
            patient_id: props.patient.id,
            doctor_id: props.user.id,
            content 
        };
        dispatch(createAppountment(data, (success, data) => {
            if(success){
                console.log('data', data);
                setStatus({type: "success", message: "Appointment was created Successfully !", show: true})
                setContent("");
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
                    <Button disabled={btnLoading || content.length === 0} loading={btnLoading} onClick={() => handleSubmit()} type="primary" key="console">
                    Submit
                    </Button>
                    </>}
                className="create-appointment"
                width={700}
            >
                <div className="content-container">
                {status.show ? <Alert message={status.message} type={status.type} showIcon /> : null}
                <h2>Appointment Details</h2>
                <TextArea onChange={(e) => setContent(e.target.value.trim())} placeholder="Type Your Appointment Details here ..."></TextArea>
                    
                </div>
            </Modal>
      
        )
    }


    return(
        <div>
            <Button type="primary" onClick={() => setVisible(true)}>Start Appointment</Button>
            {visible && renderPopup()}
        </div>
    )
    
}
