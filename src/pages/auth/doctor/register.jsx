import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'antd';
import {BASE_API} from '../../../config/constants';
import LoginBanner from '../../../assets/img/login-banner.png';
import {FaFacebookF, FaGoogle} from 'react-icons/fa';
// import './style.scss';

export default function Register() {

	const [username, setUsername] = useState("test");
	const [email, setEmail] = useState("doctor_1@mail.com");
	const [password, setPassword] = useState("123456789");
	const [errors, setErrors] = useState([]);
	const [buttonLoading, setButtonLoading] = useState(false);

	const history = useHistory();

	const validateForm = () => {
		let isValid = true;
		if (username.trim().length === 0){
			isValid = false;
			setErrors([...errors, 'Username field is required !']);
		}
		if (email.trim().length === 0){
			isValid = false;
			setErrors([...errors, 'Email field is required !']);
		}
		if (password.trim().length === 0){
			isValid = false;
			setErrors([...errors, 'Password field is required !']);
		}
		return isValid;
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		setButtonLoading(true);
		if (!validateForm()){
			return;
		}
		const url = `${BASE_API}users/signup`;
		const data = {
			email,
			username,
			password,
			role: "doctor"
		};
		const config = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
		    }
		}
		axios.post(url, data, config)
		.then(res => {
			console.log('res.data', res.data);
			history.push('/login');
		})
		.catch(err => {
			console.log('err', err);
		})
		
		setButtonLoading(false); 
	}

	return (
        <div className="container-fluid">
					
					<div className="row">
						<div className="col-md-8 offset-md-2">
								
							<div className="account-content">
								<div className="row align-items-center justify-content-center">
									<div className="col-md-7 col-lg-6 login-left">
										<img src={LoginBanner} className="img-fluid" alt="MedEX Register" />	
									</div>
									<div className="col-md-12 col-lg-6 login-right">
										<div className="login-header">
											<h3>Doctor Register <a href="/register">Not a Doctor?</a></h3>
										</div>
										
										<form onSubmit={handleSubmit}>
											<div className="form-group form-focus">
												<input type="text" className="form-control floating" value={username} onChange={(u) => setUsername(u.target.value)} />
												<label className="focus-label">Username</label>
											</div>
											<div className="form-group form-focus">
												<input type="email" className="form-control floating" value={email} onChange={(e) => setEmail(e.target.value)} />
												<label className="focus-label">Email</label>
											</div>
											<div className="form-group form-focus">
												<input type="password" className="form-control floating" value={password} onChange={(p) => setPassword(p.target.value)} />
												<label className="focus-label">Create Password</label>
											</div>
											<div className="text-right">
												<a className="forgot-link" href="/login">Already have an account?</a>
											</div>
											<Button 
											className="btn btn-primary btn-block btn-lg login-btn" 
											type="primary" 
											htmlType="submit"
											size="large" 
											// block 
											loading={buttonLoading}
											>
												Signup
											</Button>
											<div className="login-or">
												<span className="or-line"></span>
												<span className="span-or">or</span>
											</div>
											<div className="row form-row social-login">
												<div className="col-6">
													<a href="#" className="btn btn-facebook btn-block"><FaFacebookF /> Login</a>
												</div>
												<div className="col-6">
													<a href="#" className="btn btn-google btn-block"><FaGoogle /> Login</a>
												</div>
											</div>
										</form>
										
									</div>
								</div>
							</div>
								
						</div>
					</div>

				</div>
    )
}
