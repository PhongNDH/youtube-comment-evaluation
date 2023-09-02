import {
    CHAT_INFO_REQUEST,
    CHAT_INFO_SUCCESS,
    CHAT_INFO_FAIL,
    CHAT_INFO_RESET,
    //
    CHAT_LIST_REQUEST,
    CHAT_LIST_SUCCESS,
    CHAT_LIST_FAIL,
    CHAT_LIST_RESET,
    //
    CHAT_COMMENT_REQUEST,
    CHAT_COMMENT_SUCCESS,
    CHAT_COMMENT_FAIL,
    CHAT_COMMENT_RESET,
    //
    CHAT_COMMENT_QUANTITY_REQUEST,
    CHAT_COMMENT_QUANTITY_SUCCESS,
    CHAT_COMMENT_QUANTITY_FAIL,
    CHAT_COMMENT_QUANTITY_RESET,
} from "../constants/chatConstants";

export const chatInfoReducer = (state = { chat: {} }, action) => {
    switch (action.type) {
        case CHAT_INFO_REQUEST:
            return { ...state,success: false, loading: true };
        case CHAT_INFO_SUCCESS:
            return { loading: false,success: true, chat: action.payload };
        case CHAT_INFO_FAIL:
            return { loading: false,success: false, error: action.payload };
        case CHAT_INFO_RESET:
            return { chat: {} };
        default:
            return state;
    }
};

export const chatCommentQuantityReducer = (state = { data: {} }, action) => {
    switch (action.type) {
        case CHAT_COMMENT_QUANTITY_REQUEST:
            return { ...state, loading: true };
        case CHAT_COMMENT_QUANTITY_SUCCESS:
            return { loading: false, data: action.payload };
        case CHAT_COMMENT_QUANTITY_FAIL:
            return { loading: false, error: action.payload };
        case CHAT_COMMENT_QUANTITY_RESET:
            return { data: {} };
        default:
            return state;
    }
};

export const chatListReducer = (state = { list: [] }, action) => {
    switch (action.type) {
        case CHAT_LIST_REQUEST:
            return { ...state, loading: true };
        case CHAT_LIST_SUCCESS:
            return { loading: false, list: action.payload };
        case CHAT_LIST_FAIL:
            return { loading: false, error: action.payload };
        case CHAT_LIST_RESET:
            return { list: [] };
        default:
            return state;
    }
};

export const chatCommentReducer = (state = { comments: [] }, action) => {
    switch (action.type) {
        case CHAT_COMMENT_REQUEST:
            return { ...state, loading: true };
        case CHAT_COMMENT_SUCCESS:
            return { loading: false, comments: action.payload };
        case CHAT_COMMENT_FAIL:
            return { loading: false, error: action.payload };
        case CHAT_COMMENT_RESET:
            return { comments: [] };
        default:
            return state;
    }
};
