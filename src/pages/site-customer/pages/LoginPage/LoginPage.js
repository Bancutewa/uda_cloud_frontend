import React, { useState } from 'react'
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { SCREEN_URL } from '../../../../constants/screen/PathScreen';
import { useEffect } from 'react';
import { useRef } from 'react';
import { decodeToken } from 'react-jwt';
import { loginAPI } from '../../../../api/authAPI';
import { useAuth } from '../../../../context/auth.context';


const LoginPage = () => {
    // UseState
    const [error, setError] = useState('');

    const token = localStorage.getItem("token");
    const myDecodedToken = decodeToken(token);

    const navigate = useNavigate()

    // UseEffect
    useEffect(() => {
        if (myDecodedToken?.id) {
            return navigate(SCREEN_URL.HOME);
        }
    }, []);
    // ===========ref===========
    // khai bao ref
    const usernameRef = useRef("");
    const passwordRef = useRef("");

    const { isLoggedIn, setIsLoggedIn } = useAuth();

    const onSubmit = async () => {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        try {
            const loginRes = await loginAPI(username, password);
            if (loginRes.data) {
                localStorage.setItem("token", loginRes.token);
                setIsLoggedIn(loginRes.token.role);
                navigate(SCREEN_URL.HOME);
            }
        } catch (error) {
            if (error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.");
            }
        }
    };



    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Container bsPrefix="col-5" className="">
                <div className="mb-3">
                    <Form.Label htmlFor="exampleInputEmail1" className="form-label">
                        <label>Tên đăng nhập</label>
                    </Form.Label>
                    <Form.Control
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        ref={usernameRef}

                    />
                </div>
                <div className="mb-3">
                    <Form.Label htmlFor="exampleInputPassword1" className="form-label">
                        <label>Mật khẩu</label>
                    </Form.Label>
                    <Form.Control
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        ref={passwordRef}

                    />
                </div>
                <div className="d-flex justify-content-between">
                    <Link to={SCREEN_URL.REGISTER}>Bạn chưa có tài khoản ?</Link>
                </div>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <Button variant="primary" onClick={onSubmit} >
                    Submit
                </Button>
            </Container>
        </div>
    );
}

export default LoginPage
