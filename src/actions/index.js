

import * as types from './types.js'
import axios from 'axios';
import {BASE_API} from '../config/constants';

export const loginUser = (token, user, cb) => dispatch =>  {
    const localStorage = window.localStorage;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    console.log('JSON.stringify(user)', JSON.stringify(user))
    dispatch({type: types.LOGIN, payload: {token, user}});
    cb && cb();
}

export const loginUserSession = (cb) => dispatch =>  {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('user00', user);
    dispatch({type: types.LOGIN, payload: {token, user}});
    cb && cb();
}

export const logoutUser = (cb) => dispatch => {
    const localStorage = window.localStorage;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({type: types.LOGOUT});
    cb && cb();
}

export const updateUserProfile = (data, cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}users/update-profile`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    axios.put(url, data, config)
    .then(res => {
        const user = JSON.parse(localStorage.getItem('user'));
        const newUser = {...user, ...data};
        localStorage.setItem('user', JSON.stringify(newUser));
        dispatch({type: types.UPDATE_USER, payload: {user: res.data.data}});
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}

export const updateDoctorSpecialist = (data, cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}specialist/update-doctor-specialist`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    axios.put(url, data, config)
    .then(res => {
        const user = JSON.parse(localStorage.getItem('user'));
        const oldSpecialists = user.specialists || [];
        const newSpecialists = [res.data.data, ...oldSpecialists]
        const newUser = {...user, specialists: newSpecialists};
        localStorage.setItem('user', JSON.stringify(newUser));
        dispatch({type: types.UPDATE_USER, payload: {user: {specialists: newSpecialists}}});
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}

export const uploadUserPhoto = (file, cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}users/upload-photo`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    let data = new FormData();
    data.append('photo', file, "avatar.jpg");
    data.append('x', 0);
    data.append('y', 0);
    data.append('width', 200);
    data.append('height', 200);

    axios.put(url, data, config)
    .then(res => {
        const user = JSON.parse(localStorage.getItem('user'));
        const newUser = {...user, avatar: res.data.data};
        console.log('newUser', newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        dispatch({type: types.UPDATE_USER, payload: {user: {avatar: res.data.data}}});
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}

export const setUserCode = (code, cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}users/set-code`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const data = {
        code
    }
    axios.post(url, data, config)
    .then(res => {
        const user = JSON.parse(localStorage.getItem('user'));
        const newUser = {...user, ...res.data };
        localStorage.setItem('user', JSON.stringify(newUser));
        dispatch({type: types.UPDATE_USER, payload: {user: {code: res.data.code}}});
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}

export const fetchAppountments = (cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}blockchain/list_all_transactions`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    axios.get(url, config)
    .then(res => {
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}

export const fetchDoctors = (cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}users/doctors`;
    const config = {
        headers: {
            Authorization: token ? `Bearer ${token}` : null
        }
    };
    axios.get(url, config)
    .then(res => {
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}

export const fetchAvailibleSpecialists = (cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}specialist/availible`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    axios.get(url, config)
    .then(res => {
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}

export const fetchPatients = (cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}users/patients`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    axios.get(url, config)
    .then(res => {
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}

export const fetchDoctorData = (username, cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}users/doctors?username=${username}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    axios.get(url, config)
    .then(res => {
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}

export const createAppountment = (data, cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}blockchain/create_transaction`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    axios.post(url, data, config)
    .then(res => {
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}

export const createPatientAppountment = (data, cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}appointment/`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    axios.post(url, data, config)
    .then(res => {
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}

export const confirmAppountmentAction = (code, block, cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}blockchain/confirm-transaction-p`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const data = {code, block};
    axios.post(url, data, config)
    .then(res => {
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}

export const viewAppountmentAction = (code, block, cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}blockchain/view_clear_transaction`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const data = {code, block};
    axios.post(url, data, config)
    .then(res => {
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}


export const fetchPatientData = (username, cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}users/patient/profile?username=${username}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    axios.get(url, config)
    .then(res => {
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}

export const fetchPatientConfirmedAppointments = (id, cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}blockchain/patient/${id}/confirmed-transactions`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    axios.get(url, config)
    .then(res => {
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}

export const fetchPatientAppointments = (today=false, cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}appointment/${today ? "?today=1" : ""}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    axios.get(url, config)
    .then(res => {
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}

export const fetchSingleAppointment = (id, cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}appointment/${id}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    axios.get(url, config)
    .then(res => {
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}

export const updateSingleAppointment = (id, data, cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}appointment/${id}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    axios.put(url, data, config)
    .then(res => {
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}

export const deleteSingleAppointment = (id, cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}appointment/${id}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    axios.delete(url, config)
    .then(res => {
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}

export const getDashboardMetadata = (cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}users/dashboard-metadata`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    axios.get(url, config)
    .then(res => {
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}

export const fetchNotifications = (cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}notifications/`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    axios.get(url, config)
    .then(res => {
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}

export const seenNotifications = (cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}notifications/seen`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    axios.get(url, config)
    .then(res => {
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}


export const deleteNotification = (id, cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}notifications/${id}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    axios.delete(url, config)
    .then(res => {
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}

export const fetchUserMessages = (id, cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}chat/?other=${id}`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    axios.get(url, config)
    .then(res => {
        console.log('res.data', res.data)
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}

export const fetchUserChats = (cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}chat/user-chats`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    axios.get(url, config)
    .then(res => {
        console.log('res.data', res.data)
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}

export const createUserMessages = (data, cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}chat/`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    axios.post(url, data, config)
    .then(res => {
        console.log('res.data', res.data)
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}


export const createUserChat = (id, cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}chat/user-chats`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const data = {
        chatter: id
    }
    axios.post(url, data, config)
    .then(res => {
        console.log('res.data', res.data)
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}



export const fetchBlogs = (cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}blog/articles/`;
    const config = {
        headers: {
            Authorization: token ? `Bearer ${token}` : null
        }
    };
    axios.get(url, config)
    .then(res => {
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}

export const fetchLatestBlogs = (cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}blog/articles/`;
    const config = {
        headers: {
            Authorization: token ? `Bearer ${token}` : null
        }
    };
    axios.get(url, config)
    .then(res => {
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}


export const fetchTags = (cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}blog/tags/`;
    const config = {
        headers: {
            Authorization: token ? `Bearer ${token}` : null
        }
    };
    axios.get(url, config)
    .then(res => {
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}

export const fetchCategories = (cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}blog/categories/`;
    const config = {
        headers: {
            Authorization: token ? `Bearer ${token}` : null
        }
    };
    axios.get(url, config)
    .then(res => {
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}


export const uploadBlogImage = (file, cb) => dispatch => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem('token');
    const url = `${BASE_API}blog/articles/create`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    let data = new FormData();
    data.append('image', file, "image.jpg");
    data.append('title', "title10");
    data.append('category', 3);
    data.append('status', "DRAFT");
    data.append('body', "sadfbasjhldf asdfhblha");

    axios.put(url, data, config)
    .then(res => {
        cb && cb(true, res.data)
    })
    .catch(error => {
        console.log('error', error);
        cb && cb(false, error);
    })
}
