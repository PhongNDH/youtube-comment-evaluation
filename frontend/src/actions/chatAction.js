import {
    CHAT_INFO_REQUEST,
    CHAT_INFO_SUCCESS,
    CHAT_INFO_FAIL,
    //
    CHAT_LIST_REQUEST,
    CHAT_LIST_SUCCESS,
    CHAT_LIST_FAIL,
    //
    CHAT_COMMENT_REQUEST,
    CHAT_COMMENT_SUCCESS,
    CHAT_COMMENT_FAIL,
    //
    CHAT_COMMENT_QUANTITY_REQUEST,
    CHAT_COMMENT_QUANTITY_SUCCESS,
    CHAT_COMMENT_QUANTITY_FAIL,
} from "../constants/chatConstants";
import axios from "axios";

export const getChatInfo = (url, quantity) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CHAT_INFO_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        console.log(userInfo);

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const info = {
            url: url,
            number: quantity,
        };

        const { data } = await axios.post(`/api/chat/`, info, config);

        dispatch({
            type: CHAT_INFO_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CHAT_INFO_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const getChatQuantityComment = (url) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CHAT_COMMENT_QUANTITY_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        console.log(userInfo);

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const info = {
            url: url,
        };

        const { data } = await axios.post(`/api/chat/quantity/`, info, config);

        dispatch({
            type: CHAT_COMMENT_QUANTITY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CHAT_COMMENT_QUANTITY_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const getChatList = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: CHAT_LIST_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        console.log(userInfo);

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/chat/list/`, config);

        dispatch({
            type: CHAT_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CHAT_LIST_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const getChatComment = (id, page) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CHAT_COMMENT_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        console.log(userInfo);

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(
            `/api/chat/comment/${id}?page=${page}`,
            config
        );

        dispatch({
            type: CHAT_COMMENT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CHAT_COMMENT_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};
