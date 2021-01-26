import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import InputCode from '../../../components/inputCode';
import { Modal, Button, Result, Alert } from 'antd';
import {setUserCode} from '../../../actions/index';


export default function ChangePassword() {
    const dispatch = useDispatch();

    let {authReducer: {user}} = useSelector(state => state);

    const [confirmVisible, setConfirmVisible] = useState(false);
    const [code, setCode] = useState(null);
    const [clearCode, setClearCode] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);

    useEffect(() => {
        if (user.code){
            setCode(user.code);
        }else{
            setCode(null);
        }
        return () => {
            setCode(null);
            setClearCode(true);
        }
    }, [user.code]);

    useEffect(() => {
        if (code && code.length < 4){
            setClearCode(false);
        }
    }, [code]);

    const closeConfirm = () => {
        setConfirmVisible(false);
        setCode(null);
        setClearCode(true);
    }

    const submitCode = () => {
        setBtnLoading(true);
        dispatch(setUserCode(code, (success, data) => {
            if (success){
                console.log('data', data);
                setClearCode(true);
            }else{
                console.log('error', data);
            }
            setBtnLoading(false);
        }) );
    }

    const renderConfirm = () => {
        return (
          <Modal
            centered
            closable={false}
            visible={confirmVisible}
            footer={null}
        >
          <Result
            status="warning"
            title="Be careful, You will not be able to change it in the future!"
            extra={
              <>
              <Button onClick={() => closeConfirm()} type="ghost" key="cancel">
                Cancel
              </Button>
              <Button loading={btnLoading} onClick={() => submitCode()} type="primary" key="console">
                Confirm
              </Button>
              </>
            }
          />
        </Modal>
      )
  
      }

    return (
        <>
        <div className="card">
            <div className="card-header">
                <h4>Change Password</h4>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12 col-lg-6">
                    
                        <form>
                            <div className="form-group">
                                <label>Old Password</label>
                                <input type="password" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input type="password" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input type="password" className="form-control" />
                            </div>
                            <div className="submit-section">
                                <button type="submit" className="btn btn-primary submit-btn">Save Changes</button>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>  
        {user.role === 'patient' ?
        <div className="card">
            <div className="card-header">
                <h4>Secret Code</h4>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12 col-lg-6">
                        {user.code ? 
                        <Alert message="Your CODE is set successfully" type="success" />
                        :
                        <form>
                        <InputCode
                            length={4}
                            label="Type Your Code"
                            confirmVisible={confirmVisible}
                            clear={clearCode}
                            onComplete={code => {
                                setConfirmVisible(true);
                                setCode(code);
                            // setTimeout(() => setLoading(false), 1000);
                            }}
                        />
                        {/* <div className="submit-section">
                            <button disabled={!code || code.length < 4} onClick={() => setConfirmVisible(true)} type="submit" className="btn btn-primary submit-btn">Set Code</button>
                        </div> */}
                        {renderConfirm()}
                    </form>
                    }
                        
                        
                    </div>
                </div>
            </div>
        </div> 
        : null} 

        </>  
    )
}
