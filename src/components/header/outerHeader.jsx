// eslint-disable-next-line
import React from 'react';
import './style.scss';

export default function OuterHeader() {
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
                    <ul className="main-nav">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li className="has-submenu">
                            <a href="/doctors">Doctors</a>
                            
                        </li>	
                        <li className="has-submenu active">
                            <a href="/features">Features</a>
                            
                        </li>
                        <li className="has-submenu">
                            <a href="/ToU">Term of Use</a>
                            
                        </li>	
                        <li className="has-submenu">
                            <a href="/blogs">Blog</a>
                            
                        </li>
                        
                    </ul>
                </div>		 
                <ul className="nav header-navbar-rht">
                    
                    <li className="nav-item">
                        <a className="nav-link header-login" href="/login">login</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link header-signup" href="/register">join now</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
