import { Row, Col, Button, Table } from "react-bootstrap";
import { getChatList } from "../actions/chatAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/loader";
import Message from "../components/message";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Goback from "../components/goback";

const History = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const chatList = useSelector((state) => state.chatList);
    const { loading, error, list } = chatList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            navigate("/signin");
        }
        dispatch(getChatList());
    }, [dispatch, userInfo, navigate]);

    return (
        <div style={{ width: "100%" }}>
            <Row className="align-items-center mt-3 mb-2">
                <Col>
                    <div className="mt-2 mb-2">
                        <Goback variant="outline-light" to="/" />
                    </div>
                    <h1 style={{ color: "white", fontWeight: "bold" }}>Your chats</h1>
                </Col>
                {/* <Col style={{ textAlign: "right" }}>
                    <Button
                        variant="dark"
                        className="my-3"
                        //onClick={createProductHanlder}
                    >
                        <i className="fas fa-plus"></i>
                        <span className="m-lg-2">Create Product</span>
                    </Button>
                </Col> */}
            </Row>
            {/* {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}

            {loadingCreate && <Loader />}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>} */}

            {loading ? (
                <Loader />
            ) : error ? (
                <div style={{ width: "75%", margin: "0 auto" }}>
                    <Message variant="info">{error}</Message>
                </div>
            ) : (
                <div>
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        className="table-sm"
                    >
                        <thead>
                            <tr>
                                <th className="px-3">ID</th>
                                <th style={{ width: "50%" }}>Name</th>
                                <th className="px-1 text-danger">Negative</th>
                                <th className="px-1 text-primary">Neutral</th>
                                <th className="px-1 text-success">Positive</th>
                                <th className="px-1">Search at</th>
                                <th className="px-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list?.map((l, index) => {
                                return (
                                    <tr key={l._id}>
                                        <td>{index + 1}</td>
                                        <td
                                            className="px-2"
                                            style={{ textAlign: "left" }}
                                        >
                                            {l.name}
                                        </td>
                                        <td className="text-danger">{l.negative} %</td>
                                        <td className="text-primary">{l.neutral} %</td>
                                        <td className="text-success">{l.positive} %</td>
                                        <td>{l.createAt.substring(0, 10)}</td>
                                        <td>
                                            <LinkContainer
                                                //to={user._id === userInfo._id ? '/profile':`/admin/user/${user._id}/edit`}
                                                to={
                                                    userInfo
                                                        ? `/comment/${l._id}`
                                                        : "/signin"
                                                }
                                            >
                                                <Button
                                                    variant="outline-dark"
                                                    className="btn-sm"
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    {/* <div className="mt-5">
                        <PaginationControl
                            page={page}
                            between={4}
                            total={pages * 4}
                            limit={4}
                            changePage={(page) => {
                                navigate(
                                    `/admin/productlist/?keyword=${keyword}&page=${page}`
                                );
                            }}
                            ellipsis={1}
                        />
                    </div> */}
                </div>
            )}
        </div>
    );
};

export default History;
