import { Form, Button, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { login } from "../actions/userActions";
import Loader from "./../components/loader";
import Message from "./../components/message";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [queryParameters] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    const redirect = queryParameters.get("redirect")
        ? queryParameters.get("redirect")
        : "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, navigate, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            login({
                username: email,
                password: password,
            })
        );
    };

    const ChangeToSignin = () => {
        navigate("/register");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Row
            className="d-flex justify-content-center"
            style={{ width: "100%" }}
        >
            <Col sm={10} md={10} lg={8} xl={8}>
                <div
                    style={{
                        backgroundColor: "rgba(255, 255, 255,0.9)",
                        textAlign: "left",
                    }}
                    className="rounded-2 mt-4 px-5 pt-3 pb-3"
                >
                    <h1 className="d-flex justify-content-center">Sign in</h1>
                    <hr
                        width="80%"
                        size="5px"
                        align="center"
                        style={{ margin: "auto", opacity: "0.25" }}
                    />
                    {error && <Message variant="danger">{error}</Message>}
                    {loading && <Loader />}
                    <Form className="mt-4" onSubmit={submitHandler}>
                        <Form.Text></Form.Text>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </Form.Group>

                        {/* <Form.Group
                            className="mb-3"
                            controlId="formBasicCheckbox"
                        >
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group> */}
                        <Form.Group
                            className="mb-3 d-flex justify-content-center"
                            controlId="formBasicCheckbox"
                        >
                            <Button
                                variant="dark"
                                type="submit"
                                style={{ minWidth: "300px" }}
                                className="mt-4"
                            >
                                Sign in
                            </Button>
                        </Form.Group>
                        <Row className="py-3" style={{ textAlign: "center" }}>
                        <Col>
                                New Customer?{" "}
                                <span
                                    className="authen-change"
                                    onClick={ChangeToSignin}
                                >
                                    Register
                                </span>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Col>
        </Row>
    );
};

export default Signin;
