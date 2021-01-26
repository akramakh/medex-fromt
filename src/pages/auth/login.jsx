import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Button } from 'antd';
import {BASE_API} from '../../config/constants';
import {loginUser} from '../../actions/index';
import LoginBanner from '../../assets/img/login-banner.png';
import {FaFacebookF, FaGoogle} from 'react-icons/fa';
import './style.scss';

export default function Login() {

	const [email, setEmail] = useState("patient_1@gmail.com");
	const [password, setPassword] = useState("123456789");
	const [errors, setErrors] = useState([]);
	const [buttonLoading, setButtonLoading] = useState(false);

	const history = useHistory();
	const dispatch = useDispatch();

	const validateForm = () => {
		let isValid = true;
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
		const url = `${BASE_API}users/login`;
		const data = {
			email,
			password
		};
		const config = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
		    }
		}
		axios.post(url, data, config)
		.then(res => {
			const {data: {token, user}} = res;
			dispatch(loginUser(token, user, () => {
				history.push('/');
			}));
			return;
		})
		.catch(err => {
			console.log('err', err);
		})
		
		setButtonLoading(false); 
	}


    return (
        <div>
            <div className="container-fluid">
					
					<div className="row">
						<div className="col-md-8 offset-md-2">
							
							<div className="account-content">
								<div className="row align-items-center justify-content-center">
									<div className="col-md-7 col-lg-6 login-left">
										<img src={LoginBanner} className="img-fluid" alt="MedEX Login" />	
									</div>
									<div className="col-md-12 col-lg-6 login-right">
										<div className="login-header">
											<h3>Login <span>MedEX</span></h3>
										</div>
										<form onSubmit={handleSubmit}>
											<div className="form-group form-focus">
												<input type="email" className="form-control focus-visible" data-focus-visible-added value={email} onChange={(e) => setEmail(e.target.value)} />
												<label className="focus-label">Email</label>
											</div>
											<div className="form-group form-focus">
												<input type="password" className="form-control floating focus-visible" data-focus-visible-added value={password} onChange={(p) => setPassword(p.target.value)} />
												<label className="focus-label">Password</label>
											</div>
											<div className="text-right">
												<a className="forgot-link" href="/forgot-password">Forgot Password ?</a>
											</div>
											<Button 
											className="login-btn" 
											type="primary" 
											htmlType="submit"
											size="large" 
											block 
											loading={buttonLoading}
											>
												Login
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
											<div className="text-center dont-have">Don’t have an account? <a href="/register">Register</a></div>
										</form>
									</div>
								</div>
							</div>
								
						</div>
					</div>

				</div>
        </div>
    )
}
