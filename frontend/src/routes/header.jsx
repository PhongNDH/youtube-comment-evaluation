import {
    Navbar,
    Container,
    Nav,
    Button,
    Image,
    NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import { getUserAvatar } from "../actions/userActions";
import { useEffect } from "react";
import Logo from "./../assets/imgs/logo.png"


const Header = () => {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userAvatar = useSelector((state) => state.userAvatar);
    const { avatar } = userAvatar;

    useEffect(() => {
        if (userInfo) {
            dispatch(getUserAvatar());
        }
    }, [userInfo, dispatch]);

    return (
        <header style={{ fontFamily: "Candara", fontWeight: "bold" }}>
            <Navbar
                expand="lg"
                collapseOnSelect
                className="pt-2 pb-2"
                sticky="top"
                style={{ backgroundColor: "rgba(255,255,255,0.5" }}
            >
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>
                            <Image className="logo-image" src={Logo} width="50" alt=""/>
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse
                        id="basic-navbar-nav"
                        className="justify-content-end"
                    >
                        <Nav className="mr-auto">
                            {!userInfo ? (
                                <div className="authenticate-group d-flex">
                                    <LinkContainer to="/signin">
                                        <Nav.Link>
                                            <Button
                                                variant="light"
                                                style={{
                                                    minWidth: "100px",
                                                    border: "none",
                                                    color: "black",
                                                    fontWeight: "bold",
                                                }}
                                                className="pt-1 pb-1"
                                            >
                                                Sign in
                                            </Button>
                                        </Nav.Link>
                                    </LinkContainer>{" "}
                                    <LinkContainer to="/register">
                                        <Nav.Link>
                                            <Button
                                                variant="light"
                                                style={{
                                                    minWidth: "100px",
                                                    border: "none",
                                                    color: "black",
                                                    fontWeight: "bold",
                                                }}
                                                className="pt-1 pb-1"
                                            >
                                                Register
                                            </Button>
                                        </Nav.Link>
                                    </LinkContainer>
                                </div>
                            ) : (
                                <div
                                    className="d-flex align-items-center"
                                    style={{ gap: "1rem" }}
                                >
                                    <NavDropdown
                                        title={
                                            <Image
                                                src={
                                                    avatar !==
                                                    "Avatar was not found"
                                                        ? avatar?.image
                                                        : "/images/user-default.png"
                                                }
                                                alt="User"
                                                fluid
                                                width="36rem"
                                                className={
                                                    avatar !==
                                                    "Avatar was not found"
                                                        ? "profile-access"
                                                        : "profile-access-default"
                                                }
                                            ></Image>
                                        }
                                        id="username"
                                    >
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>
                                                Profile
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/history">
                                            <NavDropdown.Item>
                                                History
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to={`${avatar?.image}`}>
                                            <NavDropdown.Item>
                                                Avatar
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>  
                                    <LinkContainer to="/">
                                        <Nav.Link>
                                            <Button
                                                variant="warning"
                                                style={{
                                                    minWidth: "100px",
                                                    border: "none",
                                                    color: "black",
                                                    fontWeight: "bold",
                                                }}
                                                className="pt-1 pb-1"
                                                onClick={logoutHandler}
                                            >
                                                Log out &nbsp;
                                                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                            </Button>
                                        </Nav.Link>
                                    </LinkContainer>
                                </div>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
