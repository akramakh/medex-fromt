import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Button} from 'antd';
import {updateDoctorSpecialist, fetchAvailibleSpecialists} from '../../../actions/index';
import AvatarCropper from '../../../components/cropper';


export default function Specialists({user}) {
    const dispatch = useDispatch();
    const [specialist, setSpecialist] = useState("");
    const [specialists, setSpecialists] = useState([]);
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    

    useEffect(() => {
        const sp = user.specialists.length ? user.specialists[0] : null;
        user.specialist = sp;
        
        dispatch(fetchAvailibleSpecialists((success, data) => {
          if(success){
            setSpecialists(data.data);
          }else{

          }
        }));
        if(sp){
          setDescription(sp.description);
          setSpecialist(sp.id);
        }
        return () => {
            
        }
    }, [dispatch, user]);


    const isUpdated = (val1, val2) => {
        const val_1 = val1? String(val1).trim(): null;
        const val_2 = val2? String(val2).trim(): null;
        return val_1 !== val_2;
      }

    const validateData = () => {
        const data = {};
        if (isUpdated(user.specialist, specialist)){
            data['specialist'] = specialist;
        }
        if (isUpdated(user.description, description)){
            data['description'] = description;
        }
        
        if (Object.keys(data).length === 0){
          setDisabled(true);
          return;
        }else{
          setDisabled(false);
          return;
    
        }
      }
    
      useEffect(() => {
        validateData();
        return () => {
          setDisabled(true);
        }
      }, [validateData])
    

    const handleSubmit = () => {
        setLoading(true);
        setDisabled(true);
        const data = {};
        if (isUpdated(user.specialist, specialist)){
            data['specialist'] = specialist;
        }
        if (isUpdated(user.description, description)){
            data['description'] = description;
        }
        if (Object.keys(data).length === 0){
          setLoading(false);
          return;
        }
        dispatch(updateDoctorSpecialist(data, (success, data) => {
          if(success){
            console.log('data', data);  
          }else{
            console.log('error', data);
          }
          setLoading(false);
          setDisabled(true);
        }))
      }

      console.log('specialist', specialist)

    return (
        <div className="card">
            <div className="card-body">
                
                <form>
                    <div className="row form-row">
                        
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>Specialist</label>
                                <select onChange={(e) => setSpecialist(e.target.value)} placeholder="select ..." value={specialist} className="form-control select">
                                  <option value={null}>Select ...</option>
                                  {specialists.map(sp => {
                                    return (
                                      
                                      <option key={sp.id} id={sp.id} value={sp.id}>{sp.title}</option>
                                    )
                                  })}
                                    
                                </select>
                            </div>
                        </div>
                        <div className="col-12 col-md-6"> </div>
                        <div className="col-12 col-md-12">
                            <div className="form-group">
                                <label>Description</label>
                                <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="form-control">{description}</textarea>
                            </div>
                        </div>
                        
                    </div>
                    <div className="submit-section">
                        <Button loading={loading} disabled={disabled} onClick={handleSubmit} htmlType="submit" className="btn btn-primary submit-btn">Save Changes</Button>
                    </div>
                </form>
                
            </div>
           
        </div>
    )
}
