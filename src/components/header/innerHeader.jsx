/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import {FaCommentDots} from 'react-icons/fa';

import {Dropdown, Menu, Badge, Input} from 'antd';
import { BellFilled, CommentOutlined } from '@ant-design/icons';
import {logoutUser} from '../../actions/index';
import {ROOT_API} from '../../config/constants';
import Avatar from '../avatar';
import Notifications from '../notifications';
import './style.scss';

const {Search} = Input;

export default function InnerHeader() {

    const history = useHistory();
    const dispatch = useDispatch();

    const {authReducer: {user}} = useSelector(state => state);
    const UserAvatar = ROOT_API + user.avatar;

    const logout = () => {
        dispatch(logoutUser(() => {
            history.push('/login');
        }));
        return
    }

    const menu = (
        <Menu>
          <Menu.Item>
            <a href='/profile'>
              Profile
            </a>
          </Menu.Item>
          <Menu.Item>
            <a  href='/settings'>
              Settings
            </a>
          </Menu.Item>
          <Menu.Item>
            <a onClick={logout}>
              Logout
            </a>
          </Menu.Item>
        </Menu>
      );

    const renderLeftMenu = () => {
        if (user.role === 'patient'){

            return (
                <ul className="main-nav">
                    <li>
                        <a href="/">Dashboard</a>
                    </li>
                    <li >
                        <a href="/doctors">Doctors</a>
                    </li>	
                    <li>
                        <a href="/appointments">My Records</a>
                    </li>
                    <li>
                        <a href="/blogs">Blogs</a>
                    </li>
                </ul>
            );
        }else{
            return (
                <ul className="main-nav">
                    <li>
                        <a href="/">Dashboard</a>
                    </li>
                    <li >
                        <a href="/patients">Patients</a>
                    </li>	
                    <li>
                        <a href="#">Manage</a>
                    </li>
                    <li>
                        <a href="/blogs">Blogs</a>
                    </li>
                </ul>
            );
        }
    }

    const renderRightMenu = () => {
        if (user.role === 'patient'){

            return (
                <ul className="nav header-navbar-rht">
                    <li className="nav-item bell-icon">
                        <a href="/chat">
                            <Badge count={5}>
                                    <FaCommentDots />
                            </Badge>
                        </a>
                    </li>
                    <li className="nav-item bell-icon">
                        <Notifications />
                    </li>
                    <li className="nav-item">
                    <Dropdown overlay={menu} placement="bottomRight" arrow>
                        <div className="user">
                            <Avatar width="32px" height="32px" circle /> 
                             {user.username}
                        </div>
                    </Dropdown>
                    </li>
                </ul>
            );
        }else{
            return (
                <ul className="nav header-navbar-rht">
                    <li>
                        <a href="/blogs/publish">Publish Blog</a>
                    </li>
                    <li className="nav-item bell-icon">
                        <a href="/chat">
                            <Badge count={5}>
                                    <FaCommentDots />
                            </Badge>
                        </a>
                    </li>
                    <li className="nav-item bell-icon">
                        <Notifications />
                    </li>
                    <li className="nav-item">
                    <Dropdown overlay={menu} placement="bottomRight" arrow>
                        <div className="user">
                        <Avatar width="32px" height="32px" circle /> 
                             {user.username}
                        </div>
                    </Dropdown>
                    </li>
                </ul>
            );
        }
    }


    return (
        <header className="header0">
            <nav className="navbar navbar-expand-lg header-nav">
                <div className="navbar-header">
                    <a id="mobile_btn" href="javascript:void(0);">
                        <span className="bar-icon">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </a>
                    <a href="/" className="navbar-brand logo">
                        MedEX
                    </a>
                </div>
                <div className="main-menu-wrapper">
                    <div className="menu-header">
                        <a href="/" className="menu-logo">
                            MedEX
                        </a>
                        <a id="menu_close" className="menu-close" href="javascript:void(0);">
                            <i className="fas fa-times"></i>
                        </a>
                    </div>
                    {renderLeftMenu()}
                </div>
                <Search
                    size="middle"
                    placeholder="input search text"
                    allowClear
                    style={{ width: 400, margin: '0 10px 0 100px' }}
                />	
                {renderRightMenu()}	 
                
            </nav>
        </header>
    )
}