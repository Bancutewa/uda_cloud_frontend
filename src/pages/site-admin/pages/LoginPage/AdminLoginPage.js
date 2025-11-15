import { useEffect, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { SCREEN_URL } from "../../../../constants/screen/PathScreen";
import { loginAPI } from "../../../../api/authAPI";
import { decodeToken } from "react-jwt";
import { useAuth } from "../../../../context/auth.context";

const AdminLoginPage = (props) => {
    const navigate = useNavigate()
    const { setIsLoggedIn } = useAuth();

    // UseState
    const [error, setError] = useState('');

    // ===========ref===========
    // Khai báo ref
    const usernameRef = useRef("");
    const passwordRef = useRef("");

    // Xử lý event
    const onSubmit = async () => {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        try {
            const loginRes = await loginAPI(username, password);
            if (loginRes.data && loginRes.data.role === 'admin') {
                localStorage.setItem("token", loginRes.token);
                navigate(SCREEN_URL.ADMIN_HOME);
            } else {
                setError('Bạn không phải admin ');
            }

        } catch (error) {
            if (error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.");
            }
        }
    };
    useEffect(() => {
        const token = localStorage.getItem("token");
        const myDecodedToken = decodeToken(token);
        const isAdmin = myDecodedToken?.role === 'admin';

        if (myDecodedToken?.id && isAdmin) {
            return navigate(SCREEN_URL.ADMIN_HOME);
        }
    }, []);


    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Container bsPrefix="col-5" className="">
                <div className="mb-3">
                    <Form.Label htmlFor="exampleInputEmail1" className="form-label">
                        <label>Tên đăng nhập ADMIN</label>
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
                        <label>Mật khẩu ADMIN</label>
                    </Form.Label>
                    <Form.Control
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        ref={passwordRef}
                    />
                </div>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <Button variant="primary" onClick={onSubmit}>
                    Submit
                </Button>
            </Container>
        </div>
    );
};

export default AdminLoginPage;
