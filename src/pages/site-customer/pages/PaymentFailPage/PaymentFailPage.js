import React, { useEffect, useState } from 'react'
import { SCREEN_URL } from '../../../../constants/screen/PathScreen'
import './style.css'
import { Link, useNavigate } from 'react-router-dom/dist'

import { Button } from 'react-bootstrap'

const PaymentSuccess = () => {

    return (
        <div className="container mt-5 text-center">
            <div className="jumbotron">
                <h1 className="display-4">Thanh toán không thành công</h1>
                <p className="lead">
                    Rất tiếc, đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại.
                </p>
                <hr className="my-4" />
                <p>
                    Nếu bạn tiếp tục gặp sự cố, vui lòng liên hệ với bộ phận hỗ trợ khách hàng.
                </p>
                <Link to={SCREEN_URL.CART}>
                    <Button variant="primary" size="lg">
                        Quay lại giỏ hàng
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default PaymentSuccess
