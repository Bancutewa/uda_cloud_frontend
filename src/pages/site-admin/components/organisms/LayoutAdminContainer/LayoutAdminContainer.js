import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin';
import SidebarAdmin from '../SidebarAdmin/SidebarAdmin';
import { SCREEN_URL } from '../../../../../constants/screen/PathScreen';
import './style.css';
import { decodeToken } from 'react-jwt';
import { useAuth } from '../../../../../context/auth.context';
const LayoutAdminContainer = ({ component: Component, isHeader, isSidebar, title }) => {

    // const navigate = useNavigate();
    // const { isLoggedIn, setIsLoggedIn } = useAuth();
    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     const DecodedToken = decodeToken(token);
    //     const isAdmin = DecodedToken?.role === 'admin';
    //     setIsLoggedIn(isAdmin);
    //     if (!isAdmin) {
    //         return navigate(SCREEN_URL.ADMIN_LOGIN);
    //     }
    // }, [navigate, setIsLoggedIn, isLoggedIn]);

    return (
        <>
            {isHeader && <HeaderAdmin />}
            {isSidebar && (
                <div className='row'>
                    <div className='col-2 bg-dark min-height-100vh'>
                        < SidebarAdmin />
                    </div>
                    <div className='col-10 d-flex justify-content-center mt-3'>
                        <Component />
                    </div>
                </div>
            )}
            {!isSidebar && !isHeader && <Component />}
        </>
    );

};

export default LayoutAdminContainer;
