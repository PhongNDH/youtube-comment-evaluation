import {
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_REQUEST,
    //
    USER_LOGOUT,
    //
    USER_REGISTER_FAIL,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_REQUEST,
    //
    USER_DETAILS_FAIL,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    //
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_REQUEST,
    //
    USER_AVATAR_FAIL,
    USER_AVATAR_SUCCESS,
    USER_AVATAR_REQUEST,
    USER_AVATAR_RESET,
    //
} from "../constants/userConstants";

import { CHAT_INFO_RESET, CHAT_LIST_RESET, CHAT_COMMENT_QUANTITY_RESET } from "../constants/chatConstants";

import axios from "axios";

export const login = (info) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });
        const config = {
            header: {
                "Content-type": "application/json",
            },
        };

        const { data } = await axios.post("/api/user/login/", info, config);

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({
        type: USER_LOGOUT,
    });
    dispatch({
        type: USER_DETAILS_RESET,
    });
    dispatch({
        type: USER_AVATAR_RESET,
    });
    dispatch({
        type: CHAT_INFO_RESET,
    });
    dispatch({
        type: CHAT_LIST_RESET,
    });
    dispatch({
        type: CHAT_COMMENT_QUANTITY_RESET,
    });
};

export const register = (info) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        });
        const config = {
            header: {
                "Content-type": "application/json",
            },
        };

        const { data } = await axios.post("/api/user/register/", info, config);

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/user/${id}/`, config);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `/api/user/profile/update/`,
            user,
            config
        );

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        });
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const getUserAvatar = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_AVATAR_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/user/avatar/`, config);

        dispatch({
            type: USER_AVATAR_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_AVATAR_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};
