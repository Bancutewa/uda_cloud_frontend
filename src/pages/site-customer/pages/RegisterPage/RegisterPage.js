import React, { useState } from 'react'
import { Alert, Button, Container, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { SCREEN_URL } from '../../../../constants/screen/PathScreen'
import { useRef } from 'react'
import { regisAPI } from '../../../../api/authAPI'

const RegisterPage = () => {

    const navigate = useNavigate()
    // ===========ref===========
    const emailRef = useRef("");
    const usernameRef = useRef("");
    const nameRef = useRef("");
    const addressRef = useRef("");
    const phoneRef = useRef("");
    const passwordRef = useRef("");
    const confirmPasswordRef = useRef("");

    // ========State=======
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const onSubmit = async () => {
        setError(null);
        setSuccess(false);

        try {
            const email = emailRef.current.value;
            const username = usernameRef.current.value;
            const name = nameRef.current.value;
            const address = addressRef.current.value;
            const phone = phoneRef.current.value;
            const password = passwordRef.current.value;
            const confirmPassword = confirmPasswordRef.current.value;

            if (!email || !username || !password) {
                throw new Error("Vui lòng nhập đầy đủ thông tin");
            }

            if (password !== confirmPassword) {
                throw new Error("Mật khẩu không chính xác.");
            }

            const userBody = {
                email,
                username,
                password,
                name,
                address,
                phone,
            };
            const regisres = await regisAPI(userBody);
            if (regisres.data) {
                setSuccess(true);
                setTimeout(() => {
                    navigate(SCREEN_URL.LOGIN);
                }, 2000);
            }
        } catch (error) {
            if (error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.");
            }
        }

    }
    return (
        <main>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Registration successful! Redirecting...</Alert>}
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Container bsPrefix="col-5" className="">
                    <div className="mb-3">
                        <Form.Label htmlFor="email" className="form-label">
                            <label>Email</label>
                        </Form.Label>
                        <Form.Control type="email" className="form-control" id="email" aria-describedby="emailHelp" ref={emailRef} />
                    </div>
                    <div className="mb-3">
                        <Form.Label htmlFor="userName" className="form-label">
                            <label>Tên đăng nhập</label>
                        </Form.Label>
                        <Form.Control type="text" className="form-control" id="userName" ref={usernameRef} />
                    </div>
                    <div className="mb-3">
                        <Form.Label htmlFor="fullName" className="form-label">
                            <label>Họ và tên</label>
                        </Form.Label>
                        <Form.Control type="text" className="form-control" id="fullName" ref={nameRef} />
                    </div>
                    <div className="mb-3">
                        <Form.Label htmlFor="address" className="form-label">
                            <label>Địa chỉ</label>
                        </Form.Label>
                        <Form.Control type="text" className="form-control" id="address" ref={addressRef} />
                    </div>
                    <div className="mb-3">
                        <Form.Label htmlFor="phone" className="form-label">
                            <label>Số điện thoại</label>
                        </Form.Label>
                        <Form.Control type="text" className="form-control" id="phone" ref={phoneRef} />
                    </div>
                    <div className="mb-3">
                        <Form.Label htmlFor="password1" className="form-label">
                            <label>Mật khẩu</label>
                        </Form.Label>
                        <Form.Control type="password" className="form-control" id="password1" ref={passwordRef} />
                    </div>
                    <div className="mb-3">
                        <Form.Label htmlFor="password2" className="form-label">
                            <label>Nhập lại mật khẩu</label>
                        </Form.Label>
                        <Form.Control type="password" className="form-control" id="password2" ref={confirmPasswordRef} />
                    </div>
                    <div className="d-flex justify-content-between">
                        <Link to={SCREEN_URL.LOGIN}>Đã có tài khoản, quay lại trong đăng nhập</Link>
                    </div>
                    <Button variant="primary" onClick={onSubmit}>
                        Submit
                    </Button>
                </Container>
            </div>
        </main>
    )
}

export default RegisterPage
