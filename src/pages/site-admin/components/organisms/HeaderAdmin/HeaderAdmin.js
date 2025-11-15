import React from 'react'

import { SCREEN_URL } from '../../../../../constants/screen/PathScreen'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../../context/auth.context';

const HeaderAdmin = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuth();

    const LogOut = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        return navigate(SCREEN_URL.ADMIN_LOGIN);
    };
    return (
        <div id="header" className="d-flex justify-content-between align-items-center">
            <div id="branding">
                <h1 id="site-name">Hello administration</h1>
            </div>
            <div id="user-tools">
                Welcome,
                <strong>admin</strong>.
                <a href="/" className="mx-2">View site</a>
                <i className="mx-2" onClick={LogOut}>Log Out</i>
            </div>
        </div>
    )
}

export default HeaderAdmin
