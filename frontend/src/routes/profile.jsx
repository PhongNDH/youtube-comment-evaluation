import { Form, Button, Row, Col } from "react-bootstrap";
import { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader";
import Message from "../components/message";
import Goback from "../components/goback";
import { useNavigate } from "react-router-dom";
import {
    getUserDetails,
    updateUserProfile,
    getUserAvatar,
} from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "./../constants/userConstants";
import axios from "axios";

const Profile = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [image, setImage] = useState("");

    const [message, setMessage] = useState("");

    const [editable, setEditable] = useState(false);
    const [passwordChange, setPasswordChange] = useState(false);
    const [isUpload, setIsUpload] = useState(false);
    const [uploading, setUploading] = useState(false);

    //const [queryParameters] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userDetails = useSelector((state) => state.userDetails);
    const { error, loading, user } = userDetails;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const userAvatar = useSelector((state) => state.userAvatar);
    const { avatar } = userAvatar;

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Password do not match");
        } else {
            dispatch(
                updateUserProfile({
                    id: user._id,
                    first_name: name,
                    last_name: lastname,
                    email: email,
                    password: password,
                })
            );
            setMessage("");
            setEditable(false);
            setPasswordChange(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        if (image !== "") submitAvatarHandle();
    };

    const uploadAvatarHandle = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const submitAvatarHandle = async () => {
        const formData = new FormData();

        formData.append("image", image);
        formData.append("user_id", userInfo._id);
        setUploading(true);

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            await axios.post(
                "/api/user/profile/upload/avatar/",
                formData,
                config
            );
            setUploading(false);
            dispatch(getUserAvatar());
            setImage("");
            setIsUpload(false);
        } catch (error) {
            setUploading(false);
        }
    };

    useEffect(() => {
        if (!userInfo) {
            navigate("/signin");
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch(getUserDetails("profile"));
                dispatch({ type: USER_UPDATE_PROFILE_RESET });
            } else {
                setName(user.name);
                setLastname(user.last_name);
                setEmail(user.email);
            }
        }
    }, [dispatch, navigate, user, userInfo, success]);

    useEffect(() => {
        if (!editable || !passwordChange) {
            setConfirmPassword("");
            setPassword("");
        }
    }, [editable, passwordChange]);

    return (
        <Fragment>
            <Row
                className="d-flex justify-content-center"
                style={{ width: "100%" }}
            >
                <Col sm={10} md={10} lg={8} xl={8}>
                    <div className="mt-3">
                        <Goback variant="outline-light" to="/" />
                    </div>
                    <div
                        style={{
                            backgroundColor: "rgba(255, 255, 255,0.9)",
                            textAlign: "left",
                        }}
                        className="rounded-2 mt-3 px-5 pt-3 pb-3"
                    >
                        <h1 className="d-flex justify-content-center">
                            Profile
                        </h1>
                        <hr
                            width="80%"
                            size="5px"
                            align="center"
                            style={{ margin: "auto", opacity: "0.25" }}
                        />
                        {error && <Message variant="danger">{error}</Message>}
                        {loading && <Loader />}
                        {message && (
                            <Message variant="danger">{message}</Message>
                        )}
                        <Form className="mt-4" onSubmit={submitHandler}>
                            <Form.Group>
                                <Form.Check
                                    label="Editable"
                                    checked={editable}
                                    onChange={(e) => {
                                        setEditable(!editable);
                                        if (!editable) {
                                            setPasswordChange(false);
                                            setIsUpload(false);
                                        }
                                    }}
                                    style={{ marginBottom: "1rem" }}
                                ></Form.Check>
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter first name"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                    disabled={!editable}
                                />
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter last name"
                                    value={lastname}
                                    onChange={(e) => {
                                        setLastname(e.target.value);
                                    }}
                                    disabled={!editable}
                                />
                                <Form.Text className="text-muted"></Form.Text>
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    disabled={!editable}
                                />
                            </Form.Group>
                            {editable && (
                                <Form.Group>
                                    <Form.Check
                                        label="Upload avatar"
                                        checked={isUpload}
                                        onChange={(e) => {
                                            setIsUpload(!isUpload);
                                        }}
                                        style={{ marginBottom: "1rem" }}
                                    ></Form.Check>
                                </Form.Group>
                            )}
                            {isUpload && (
                                <Form.Group
                                    className="mb-3"
                                    controlId="formBasicEmail"
                                >
                                    <Form.Control
                                        type="file"
                                        placeholder="Enter last name"
                                        // value={lastname}
                                        // onChange={(e) => {
                                        //     setLastname(e.target.value);
                                        // }}
                                        // disabled={!editable}
                                        onChange={uploadAvatarHandle}
                                    />
                                    <Form.Text className="text-muted"></Form.Text>
                                    {uploading && <Loader />}
                                </Form.Group>
                            )}
                            {editable && (
                                <Form.Group>
                                    <Form.Check
                                        label="Edit password"
                                        checked={passwordChange}
                                        onChange={(e) => {
                                            setPasswordChange(!passwordChange);
                                        }}
                                        style={{ marginBottom: "1rem" }}
                                    ></Form.Check>
                                </Form.Group>
                            )}

                            {editable && passwordChange && (
                                <div>
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
                                        <Form.Label>
                                            Confirm password
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            onChange={(e) => {
                                                setConfirmPassword(
                                                    e.target.value
                                                );
                                            }}
                                        />
                                    </Form.Group>
                                </div>
                            )}

                            {editable && (
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
                                        Update
                                    </Button>
                                </Form.Group>
                            )}
                        </Form>
                    </div>
                </Col>
            </Row>
        </Fragment>
    );
};

export default Profile;
