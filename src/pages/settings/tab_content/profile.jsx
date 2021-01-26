import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import {DatePicker, Upload, Spin, message, Button} from 'antd';
import {uploadUserPhoto} from '../../../actions/index';
import UserAvatar from '../../../components/avatar';
import {updateUserProfile} from '../../../actions/index';
import AvatarCropper from '../../../components/cropper';
import { data } from 'jquery';

const IMAGES_URL = "sssss";

export default function Profile({user}) {
    const dispatch = useDispatch();
    const [uploading, setUploading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState(null);
    const [blood, setBlood] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [buttoLoading, setButtoLoading] = useState(false);
    const [buttoDisabled, setButtoDisabled] = useState(true);
    const [cropperVisible, setCropperVisible] = useState(false);
    const [image, setImage] = useState(null);

    useEffect(() => {
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setDob(user.dob);
        setBlood(user.blood);
        setEmail(user.email);
        setPhoneNumber(user.phoneNumber);
        setAddress(user.address);
        setCity(user.city);
        setCountry(user.country);
        setZip(user.zip);
        console.log('user', user);
        return () => {
            
        }
    }, [user]);

    const onChange = (e) => {
        console.log('e', e);
    }

    const isUpdated = (val1, val2) => {
        const val_1 = val1? String(val1).trim(): null;
        const val_2 = val2? String(val2).trim(): null;
        return val_1 !== val_2;
      }

    const validateData = () => {
        const data = {};
        if (isUpdated(user.first_name, firstName)){
            data['first_name'] = firstName;
        }
        if (isUpdated(user.last_name, lastName)){
            data['last_name'] = lastName;
        }
        if (isUpdated(user.dob, dob)){
            data['dob'] = dob;
        }
        if (isUpdated(user.blood, blood)){
            data['blood'] = blood;
        }
        if (isUpdated(user.country, country)){
          data['country'] = country;
        }
        if (isUpdated(user.zip, zip)){
          data['zip'] = zip;
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
      }, [firstName, lastName, dob, blood, country, zip, city, address, phoneNumber, validateData])
    

    const handleSubmit = () => {
        setButtoLoading(true);
        setButtoDisabled(true);
        const data = {};
        if (isUpdated(user.first_name, firstName)){
          data['first_name'] = firstName;
        }
        if (isUpdated(user.last_name, lastName)){
          data['last_name'] = lastName;
        }
        if (isUpdated(user.dob, dob)){
          data['dob'] = dob;
        }
        if (isUpdated(user.blood, blood)){
          data['blood'] = blood;
        }
        if (isUpdated(user.country, country)){
          data['country'] = country;
        }
        if (isUpdated(user.zip, zip)){
            data['zip'] = zip;
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
            console.log('data', data);  
          }else{
            console.log('error', data);
          }
          setButtoLoading(false);
          setButtoDisabled(true);
        }))
      }

    const handleDateChange = (date, dateString) => {
        setDob(dateString);
    }

    const renderMessage = (status) => {
        if (!uploading){
            if(status.status === "success"){
                message.success(status.text);
            }else if(status.status === "error"){
                message.error(status.text);
            }
        }
    }

    const handlePhotoChanged = (dataUrl) => {
      // setImage(dataUrl);
      setCropperVisible(true);
    }
    function dataURItoBlob(dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      var byteString = atob(dataURI.split(',')[1]);
    
      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    
      // write the bytes of the string to an ArrayBuffer
      var ab = new ArrayBuffer(byteString.length);
    
      // create a view into the buffer
      var ia = new Uint8Array(ab);
    
      // set the bytes of the buffer to the correct values
      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }
    
      // write the ArrayBuffer to a blob, and you're done
      var blob = new Blob([ab], {type: mimeString});
      return blob;
    
    }

    const handleFileChangeProfile = (dataURI) => {
        const file = dataURItoBlob(dataURI);
        setUploading(true);
        let status = {status: "info", text: "text"};
        dispatch(uploadUserPhoto(file, (success, data) => {
            if(success){
              console.log('data', data);  
              setUploading(false);
              status = {
                  status: "success",
                  text: "Profile Photo was uploaded Successfully"
              };
            }else{
                console.log('error', data);
                setUploading(false);
                status = {
                    status: "error",
                    text: "Profile Photo has some issues"
                };
            }
            renderMessage(status);
          }))
      };

      const renderUploadButton = () => {
          if (uploading){
            return <span><Spin spinning /> Uploading </span>
          }
          return (
            <span><i className="fa fa-upload"></i> Upload Photo</span>
          )
      }

      

    const profileProps = {
        name: 'file',
        accept: 'image/*',
        action: IMAGES_URL,
        beforeUpload: (file) => {
          let reader = new FileReader();
          var file = file;
          if (!file) return;
          reader.onload = function (img) {
            // handleFileChangeProfile(file);
            handlePhotoChanged(file);
            setImage(img.target.result);
          };
          reader.readAsDataURL(file);
          return false;
        },
      };

    return (
        <div className="card">
            <div className="card-body">
                
                <form>
                    <div className="row form-row">
                        <div className="col-12 col-md-12">
                            <div className="form-group">
                                <div className="change-avatar">
                                    <UserAvatar width={100} height={100} />
                                    
                                    <div className="upload-img">
                                        <div className="change-photo-btn">
                                        <Upload {...profileProps}>
                                            {renderUploadButton()}
                                        </Upload>
                                        </div>
                                        <small className="form-text text-muted">Allowed JPG, GIF or PNG. Max size of 2MB</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>First Name</label>
                                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>Last Name</label>
                                <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <div className="cal-icon">
                                    <DatePicker onChange={handleDateChange} defaultValue={dob ? moment(dob, 'YYYY-MM-DD') : null} value={dob ? moment(dob, 'YYYY-MM-DD') : null} className="form-control datetimepicker" />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>Blood Group</label>
                                <select onChange={(e) => setBlood(e.target.value)} placeholder="select ..." value={blood} className="form-control select">
                                    <option value={null}>Select ...</option>
                                    <option value="a-">A-</option>
                                    <option value="a+">A+</option>
                                    <option value="b-">B-</option>
                                    <option value="a+">B+</option>
                                    <option value="ab-">AB-</option>
                                    <option value="ab+">AB+</option>
                                    <option value="o-">O-</option>
                                    <option value="o-">O+</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>Email ID</label>
                                <input value={email} disabled type="email" className="form-control" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>Mobile</label>
                                <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                            <label>Address</label>
                                <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>City</label>
                                <input value={city} onChange={(e) => setCity(e.target.value)} type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>State</label>
                                <input value={state} onChange={(e) => setState(e.target.value)} type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>Zip Code</label>
                                <input value={zip} type="text" onChange={(e) => setZip(e.target.value)} className="form-control" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>Country</label>
                                <input value={country} onChange={(e) => setCountry(e.target.value)} type="text" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="submit-section">
                        <Button loading={buttoLoading} disabled={buttoDisabled} onClick={handleSubmit} htmlType="submit" className="btn btn-primary submit-btn">Save Changes</Button>
                    </div>
                </form>
                
            </div>
            {image ? <AvatarCropper
              modalSize='520px'
              onRequestHide={() => { setCropperVisible(false)}}
              cropperOpen={cropperVisible}
              onCrop={(croppedImage) => {setImage(croppedImage); setCropperVisible(false); handleFileChangeProfile(croppedImage)}}
              image={image}
              width={340}
              height={340}
              targetWidth={340}
              targetHeight={340}
              title='Change profile picture'
            /> : null}
            {/* <Cropper visible={cropperVisible} image={image} setCroppedImage={(croppedImage) => {setImage(croppedImage); setCropperVisible(true); handleFileChangeProfile(croppedImage)}} /> */}
        </div>
    )
}
