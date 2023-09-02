import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Row, Col, Table } from "react-bootstrap";
import Message from "../components/message";
import Loader from "../components/loader";
import { getChatComment } from "../actions/chatAction";
import Goback from "../components/goback";

import { PaginationControl } from "react-bootstrap-pagination-control";

const Comment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [queryParameters] = useSearchParams();
    const { id } = useParams();
    let pageQuery = queryParameters.get("page");

    const chatComment = useSelector((state) => state.chatComment);
    const { error, comments, loading } = chatComment;

    useEffect(() => {
        dispatch(getChatComment(id, pageQuery));
    }, [dispatch, id, pageQuery]);

    return (
        <div style={{ width: "100%" }}>
            <Row className="align-items-center mt-3 mb-2">
                <Col>
                    <div className="mt-2 mb-3">
                        <Goback variant="outline-light" to="/history" />
                    </div>
                    <h5
                        className="mt-2 mb-3"
                        style={{ color: "white", fontWeight: "bold" }}
                    >
                        {comments?.name}
                    </h5>
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
                                <th className="px-1">Negative</th>
                                <th className="px-1">Neutral</th>
                                <th className="px-1">Positive</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comments?.info?.map((c) => {
                                return (
                                    <tr key={c?._id}>
                                        <td>
                                            {c?._id -
                                                chatComment?.comments?.index +
                                                1}
                                        </td>
                                        <td
                                            className="px-2"
                                            style={{ textAlign: "justify" }}
                                        >
                                            {c?.content}
                                        </td>
                                        <td>
                                            {c?.sentiment === 0 && (
                                                <i className="text-danger fa-solid fa-check"></i>
                                            )}
                                        </td>
                                        <td>{c?.sentiment === 1 && (
                                                <i className="text-primary fa-solid fa-check"></i>
                                            )}</td>
                                        <td>{c?.sentiment === 2 && (
                                                <i className="text-success fa-solid fa-check"></i>
                                            )}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    <div className="mt-5">
                        <PaginationControl
                            page={comments.page}
                            between={4}
                            total={comments.pages * 4}
                            limit={4}
                            changePage={(page) => {
                                navigate(`/comment/${id}?page=${page}`);
                                window.scrollTo(0, 0);
                            }}
                            ellipsis={1}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Comment;
