import React, { useEffect, useState } from 'react'
import { SCREEN_URL } from '../../../../constants/screen/PathScreen'
import './style.css'
import { Link, useNavigate } from 'react-router-dom/dist'

import { Button } from 'react-bootstrap'

const PaymentSuccess = () => {

    return (
        <div className="container mt-5 text-center">
            <div className="jumbotron">
                <h1 className="display-4">Cảm ơn bạn đã mua hàng!</h1>
                <p className="lead">Đơn hàng của bạn đã được xử lý thành công.</p>
                <hr className="my-4" />
                <Link to={SCREEN_URL.HOME}>
                    <Button variant="primary" size="lg">
                        Tiếp tục mua sắm
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default PaymentSuccess
