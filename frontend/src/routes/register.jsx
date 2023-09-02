import { Form, Button, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader";
import Message from "../components/message";
import { useSearchParams, useNavigate } from "react-router-dom";
import { register } from "../actions/userActions";

const Register = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const [queryParameters] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userRegister = useSelector((state) => state.userRegister);
    const { error, loading, userInfo } = userRegister;

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
        if (password !== confirmPassword) {
            setMessage("Password do not match");
        } else {
            setMessage("");
            dispatch(
                register({
                    first_name: name,
                    last_name: lastname,
                    email: email,
                    password: password,
                })
            );
            window.scrollTo(0,0);
        }
    };

    const ChangeToSignin = () => {
        navigate("/signin");
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
                    <h1 className="d-flex justify-content-center">Register</h1>
                    <hr
                        width="80%"
                        size="5px"
                        align="center"
                        style={{ margin: "auto", opacity: "0.25" }}
                    />
                    {error && <Message variant="danger">{error}</Message>}
                    {loading && <Loader />}
                    {message && <Message variant="danger">{message}</Message>}
                    <Form className="mt-4" onSubmit={submitHandler}>
                        <Form.Text></Form.Text>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                            <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                onChange={(e) => {
                                    setLastname(e.target.value);
                                }}
                            />
                            <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
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
                                autoComplete="off"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
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
                                className="mt-3"
                            >
                                Submit
                            </Button>
                        </Form.Group>
                        <Row className="py-3" style={{ textAlign: "center" }}>
                            <Col>
                                Have an Account?{" "}
                                <span
                                    className="authen-change"
                                    onClick={ChangeToSignin}
                                >
                                    Sign in
                                </span>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Col>
        </Row>
    );
};

export default Register;
