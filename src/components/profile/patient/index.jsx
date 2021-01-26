import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FaCheckCircle, FaPhone, FaEnvelope, FaHome} from 'react-icons/fa';
import Avatar from '../../../assets/img/avatar_1.jpg';
import {Button, Input} from 'antd';
import {updateUserProfile} from '../../../actions/index';
import UserAvatar from '../../../components/avatar';


const {TextArea} = Input;

export default function DoctorProfile({otherUser=null}) {

    const dispatch = useDispatch();
  let {authReducer: {user}} = useSelector(state => state);
  if (otherUser !== null){
    user = otherUser;
  }
  const [edit, setEdit] = useState(false);
  const [bio, setBio] = useState(user.bio);
  const [country, setCountry] = useState(user.country);
  const [city, setCity] = useState(user.city);
  const [address, setAddress] = useState(user.address);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [buttoLoading, setButtoLoading] = useState(false);
  const [buttoDisabled, setButtoDisabled] = useState(true);

  
  const isUpdated = (val1, val2) => {
    const val_1 = val1? String(val1).trim(): null;
    const val_2 = val2? String(val2).trim(): null;
    return val_1 !== val_2;
  }

  const validateData = () => {
    const data = {};
    if (isUpdated(user.bio, bio)){
      data['bio'] = bio;
    }
    if (isUpdated(user.country, country)){
      data['country'] = country;
    }
    if (isUpdated(user.city, city)){
      data['city'] = city;
    }
    if (isUpdated(user.address, address)){
      data['address'] = address;
    }
    if (isUpdated(user.phoneNumber, phoneNumber)){
      data['phoneNumber'] = phoneNumber;
    }
    if (Object.keys(data).length === 0){
      setButtoDisabled(true);
      return;
    }else{
      setButtoDisabled(false);
      return;

    }
  }

  useEffect(() => {
    validateData();
    return () => {
      setButtoDisabled(true);
    }
  }, [bio, country, city, address, phoneNumber, validateData])


  const handleSubmit = () => {
    setButtoLoading(true);
    setButtoDisabled(true);
    const data = {};
    if (isUpdated(user.bio, bio)){
      data['bio'] = bio;
    }
    if (isUpdated(user.country, country)){
      data['country'] = country;
    }
    if (isUpdated(user.city, city)){
      data['city'] = city;
    }
    if (isUpdated(user.address, address)){
      data['address'] = address;
    }
    if (isUpdated(user.phoneNumber, phoneNumber)){
      data['phoneNumber'] = phoneNumber;
    }
    if (Object.keys(data).length === 0){
      setButtoLoading(false);
      return;
    }
    dispatch(updateUserProfile(data, (success, data) => {
      if(success){
        setEdit(false);
        console.log('data', data);  
      }else{
        console.log('error', data);
      }
      setButtoLoading(false);
      setButtoDisabled(true);
    }))
  }

    return (
        <div id="profile">
            <section className='hero is-info is-medium is-bold'>
                <div className='hero-body'>
                <div className='container has-text-centered'>
                
                </div>
                </div>
            </section>

            <div className='container'>
            <section className='articles'>
            <div className='column is-8 is-offset-2'>
                
                <div className='card article'>
                <div className='card-content'>
                    <div className='media'>
                    <UserAvatar className={"media-center avatar"} user={user} circle width={150} height={150} />
                    <div className='media-content has-text-centered'>
                        <h2 className="user-name">{user.first_name ? `${user.first_name} ${user.last_name}` : user.username}{user.is_verified || true ? <FaCheckCircle className="badge" />: null}</h2>
                        {otherUser !== null ? <Button type="primary" className="contact-btn" >Contact</Button> : null}
                    </div>
                    
                    </div>
                    <div className="info">
                        <div className='info-item'>
                        <span>BIO</span>
                        {edit ?
                            <TextArea value={bio} onChange={(e) => {setBio(e.target.value)}} placeholder="type a short Bio ..."></TextArea>:
                            <p>{bio}</p> 
                        }
                        </div>
                        <hr />
                        <div className='info-item'>
                        <span>Contact</span>
                        {edit ?
                        <div className="contact-form">
                            <label>Country</label><Input style={{ width: '150px' }} size="middle"  value={country} onChange={(e) => {setCountry(e.target.value)}} placeholder="Your Country" />
                            <br />
                            <label>City</label><Input size="middle" style={{ width: '150px' }} value={city} onChange={(e) => {setCity(e.target.value)}} placeholder="Your City" />
                            <br />
                            <label>Address</label><Input size="middle" style={{ width: '300px' }} value={address} onChange={(e) => {setAddress(e.target.value)}} placeholder="Your Address" />
                        </div>:
                        <p>
                            <FaHome />
                            {`${country ? country : ""}${city ? ", " + city : ""}${address ? ", " + address : ""}`}
                        </p>}
                        {edit ? null : 
                        <p>
                            <FaEnvelope />
                            <a href={`mailto:${user.email}`} >
                            {`${user.email}`}
                            </a>
                        </p>}
                        {edit?
                        <div className="phone-form">
                            <label>Phone No.</label><Input style={{ width: '100px' }} size="middle" value={phoneNumber} onChange={(e) => {setPhoneNumber(e.target.value)}} placeholder="Your Phone No." />
                        </div>:
                        <p>
                            <FaPhone />
                            {`${phoneNumber}`}
                        </p>
                        }
                        {edit ?
                        (<div className="action-btns">
                            <Button className="submit-btn" type="primary" loading={buttoLoading} disabled={buttoDisabled} onClick={handleSubmit}  >Update</Button>
                            <Button className="submit-btn" type="default" onClick={() => {setEdit(false)}} >Cancel</Button>
                        </div>
                        ):
                        <Button className="submit-btn" type="primary" onClick={() => {setEdit(true)}}>Edit</Button>}
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
        </div>
        </div>
    )
}
