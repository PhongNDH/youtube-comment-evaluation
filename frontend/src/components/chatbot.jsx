import { ProgressBar, Image, Button } from "react-bootstrap";
import { useEffect, useState, Fragment } from "react";
import { validateYouTubeUrl, youtubeJson } from "../check";
import Message from "./message";
import Loader from "./loader";
import { useDispatch, useSelector } from "react-redux";
import { getChatInfo, getChatQuantityComment } from "../actions/chatAction";
import { useNavigate } from "react-router-dom";
import {
    CHAT_COMMENT_QUANTITY_RESET,
    CHAT_INFO_RESET,
} from "../constants/chatConstants";
import RangeSlider from "react-bootstrap-range-slider";

import YoutubeImg from "./../assets/imgs/youtube.png";

const Chatbot = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [negative, setNegative] = useState(0);
    const [positive, setPositive] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [name, setName] = useState("");
    const [rangeSliderValue, setRangeSliderValue] = useState(0);
    // const [channelName, setChannelName] = useState("BRIGHT SIDE");
    // const [imageLink, setImageLink] = useState(
    //     "https://yt3.ggpht.com/QnTNTL6lvpKA-OWYdSwke3kF9GEBoriwaaHlbOOo4E7hRuXBEiO1mrYsvmk8xQznjg3GKWUT=s88-c-k-c0x00ffffff-no-rj"
    // );
    const [isSearchFirstTimes, setIsSearchFirstTimes] = useState(false);

    const [isValid, setIsValid] = useState(true);
    const [link, setLink] = useState("");
    const [isOk, setIsOK] = useState(false);
    const [isShowQuantity, setIsShowQuantity] = useState(false);
    const [isEvaluate, setIsEvaluate] = useState(false);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const chatInfo = useSelector((state) => state.chatInfo);
    const {
        chat,
        //error: infoError,
        loading: infoLoading,
        success,
    } = chatInfo;

    const chatQuantityComment = useSelector(
        (state) => state.chatQuantityComment
    );
    const {
        data,
        //error: quantityError,
        loading: quantityLoading,
    } = chatQuantityComment;

    const submitLinkHandler = () => {
        if (!userInfo) {
            navigate("/signin");
        } else {
            setIsValid(validateYouTubeUrl(link));
            // if (isValid && link !== "") {
            //     dispatch(getChatInfo(link));
            // }
            setIsOK(true);
            setIsSearchFirstTimes(true);
        }
    };
    const onContinueHandler = () => {
        if (Object?.keys(data).length !== 0 && rangeSliderValue > 0) {
            dispatch(getChatInfo(data.link, rangeSliderValue));
            setIsShowQuantity(false);
            setIsEvaluate(true);
        }
    };

    const onExitHandler = () => {
        setLink("");
        setName("");
        setNegative(0);
        setPositive(0);
        setNeutral(0);
        setIsEvaluate(false);
        dispatch({ type: CHAT_COMMENT_QUANTITY_RESET });
        dispatch({ type: CHAT_INFO_RESET });
    };

    const onClickNewChat = () => {
        setLink("");
        setName("");
        setNegative(0);
        setPositive(0);
        setNeutral(0);
        setIsEvaluate(false);
        dispatch({ type: CHAT_COMMENT_QUANTITY_RESET });
        dispatch({ type: CHAT_INFO_RESET });
        setIsShowQuantity(false);
    };

    const onClickDetail = () => {
        navigate(`/comment/${chat?.info?._id}`);
    };

    useEffect(() => {
        if (!userInfo) {
            setName("");
        } else {
            if (!isSearchFirstTimes) {
            } else {
                if (isOk && isValid && link !== "") {
                    dispatch(getChatQuantityComment(link));
                    setIsOK(false);
                } else {
                    if (Object?.keys(data).length !== 0)
                        setName(
                            data?.title ? data?.title : "Comment not found"
                        );
                }
            }
        }
    }, [isValid, link, dispatch, isOk, userInfo, isSearchFirstTimes, data]);

    useEffect(() => {
        if (Object?.keys(data).length !== 0) {
            setIsShowQuantity(true);
            setRangeSliderValue(0);
            setName(data?.title);
            setLink(data?.link);
        } else setIsShowQuantity(false);
    }, [data]);

    useEffect(() => {
        if (isEvaluate) setName(data?.title);
    }, [data, isEvaluate]);

    useEffect(() => {
        if (Object?.keys(chat).length !== 0) {
            setIsEvaluate(true);
            setIsShowQuantity(false);
        }
    }, [chat]);
    useEffect(() => {
        if (success === true) {
            setNegative(chat?.info?.negative);
            setPositive(chat?.info?.positive);
            setNeutral(chat?.info?.neutral);
        }
    }, [success, chat]);

    useEffect(() => {
        if (!userInfo) {
            setNegative(0);
            setPositive(0);
            setNeutral(0);
            setName("");
            setLink("");
            setIsEvaluate(false);
            setIsOK(false);
            setIsShowQuantity(false);
        }
    }, [userInfo]);

    return (
        <div
            className="chatbot-container"
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <div
                style={{
                    height: "65vh",
                    backgroundColor: "white",
                    position: "relative",
                }}
                className="rounded-2 opacity-75 p-3"
            >
                <div
                    style={
                        isEvaluate
                            ? { minHeight: "10vh" }
                            : { minHeight: "15vh" }
                    }
                >
                    <div className="d-flex justify-content-center">
                        <Image
                            src={YoutubeImg}
                            width="6%"
                            className="mb-2"
                        ></Image>
                    </div>
                    <h2 style={{ fontSize: "1rem", fontWeight: "bold" }}>
                        {name}
                    </h2>
                    {Object?.keys(data).length !== 0 &&
                        isShowQuantity &&
                        !isEvaluate && (
                            <div className="d-flex flex-column">
                                <span>
                                    Please select the number of comments from a
                                    total of {data?.quantity}
                                </span>
                                <RangeSlider
                                    value={rangeSliderValue}
                                    onChange={(e) =>
                                        setRangeSliderValue(e.target.value)
                                    }
                                    max={data.quantity}
                                    step={1}
                                    style={{ width: "50%" }}
                                />
                            </div>
                        )}
                    {isShowQuantity && (
                        <div className="mt-2">
                            <Button
                                variant="primary"
                                className="btn-sm"
                                style={{ minWidth: "20vh" }}
                                onClick={onContinueHandler}
                            >
                                Continue
                            </Button>
                            <Button
                                variant="warning"
                                className="btn-sm mx-3"
                                style={{ minWidth: "20vh" }}
                                onClick={onExitHandler}
                            >
                                Exit
                            </Button>
                        </div>
                    )}
                </div>

                {/* <div className="d-flex justify-content-center">
                    <Image
                        src={imageLink}
                        alt="Channel"
                        width="24vh"
                        height="24vh"
                        fluid
                        style={{ borderRadius: "50%" }}
                    ></Image>
                    &nbsp;
                    <span style={{ fontWeight: "bold" }}>{channelName}</span>
                </div> */}
                <div
                    className={`d-flex flex-column ${
                        isEvaluate ? "mt-5" : " mt-2"
                    }`}
                    style={{ width: "100%", gap: "1rem" }}
                >
                    <div
                        style={{ width: "80%", margin: "0 auto" }}
                        className="d-flex justify-content-center flex-column"
                    >
                        <label
                            htmlFor="positive"
                            style={{ textAlign: "left", color: "green" }}
                        >
                            Positve
                        </label>
                        <ProgressBar
                            variant="success"
                            now={positive}
                            label={positive + "%"}
                            style={{ width: "100%" }}
                            id="positive"
                        />
                    </div>
                    <div
                        style={{ width: "80%", margin: "0 auto" }}
                        className="d-flex justify-content-center flex-column"
                    >
                        <label
                            htmlFor="neutral"
                            style={{ textAlign: "left", color: "#00bcd4" }}
                        >
                            Neutral
                        </label>
                        <ProgressBar
                            variant="info"
                            now={neutral}
                            label={neutral + "%"}
                            style={{ width: "100%" }}
                            id="neutral"
                        />
                    </div>

                    <div
                        style={{ width: "80%", margin: "0 auto" }}
                        className="d-flex justify-content-center flex-column"
                    >
                        <label
                            htmlFor="negative"
                            style={{ textAlign: "left", color: "red" }}
                        >
                            Negative
                        </label>
                        <ProgressBar
                            variant="danger"
                            now={negative}
                            label={negative + "%"}
                            style={{ width: "100%" }}
                            id="negative"
                        />
                    </div>
                </div>
                {!infoLoading && isEvaluate && (
                    <div className="btn-newchat">
                        <Button
                            variant="outline-primary"
                            onClick={onClickNewChat}
                            disabled={infoLoading}
                            style={{ minWidth: "12vw" }}
                        >
                            <i class="fa-solid fa-right-to-bracket fa-rotate-180"></i>
                            &nbsp; New
                        </Button>
                        <Button
                            variant="outline-dark"
                            onClick={onClickDetail}
                            disabled={infoLoading}
                            style={{ marginLeft: "2vw", minWidth: "12vw" }}
                        >
                            Detail &nbsp;
                            <i className="fa-solid fa-right-to-bracket"></i>
                        </Button>
                    </div>
                )}
                {quantityLoading && (
                    <div className="mt-5">
                        <Loader />
                    </div>
                )}
                {infoLoading && (
                    <div className="mt-5">
                        <Loader />
                    </div>
                )}
                {!isValid && (
                    <div className="mt-4">
                        <Message variant="danger">This link is invalid</Message>
                    </div>
                )}
            </div>
            <div className="rounded-2 opacity-75 mt-3 d-flex mb-1">
                <input
                    //style={{width: '100%'}}
                    className="w-100 ps-2 py-1 me-2"
                    type="text"
                    id="message"
                    name="message"
                    placeholder="Send a youtube link ..."
                    onChange={(e) => {
                        setLink(e.target.value);
                    }}
                    value={link}
                    disabled={
                        quantityLoading
                            ? quantityLoading
                            : isShowQuantity
                            ? isShowQuantity
                            : isEvaluate
                    }
                />
                <Button
                    variant="outline-light"
                    disabled={
                        quantityLoading
                            ? quantityLoading
                            : isShowQuantity
                            ? isShowQuantity
                            : isEvaluate
                    }
                    onClick={submitLinkHandler}
                >
                    OK
                </Button>
            </div>
            {/* {rangeSliderValue === 0 && <Message variant="danger">Number of comments selected must be greater than 0</Message>} */}
        </div>
    );
};

export default Chatbot;
