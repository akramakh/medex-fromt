import React from 'react';
import InnerHeader from './innerHeader';
import OuterHeader from './outerHeader';

export default function Header(props) {
    const localStorage = window.localStorage;
    const isAuth = localStorage.getItem('token');
    return isAuth ? <InnerHeader /> : <OuterHeader />;
}
