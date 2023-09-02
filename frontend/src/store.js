import {
    legacy_createStore as createStore,
    combineReducers,
    applyMiddleware,
} from "redux";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userGetAvatarReducer,
} from "./reducers/userReducers";

import {
    chatCommentReducer,
    chatInfoReducer,
    chatListReducer,
    chatCommentQuantityReducer
} from "./reducers/chatReducers";

const userInfoFromStore = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userAvatar: userGetAvatarReducer,
    //
    chatInfo: chatInfoReducer,
    chatList: chatListReducer,
    chatComment: chatCommentReducer,
    chatQuantityComment: chatCommentQuantityReducer
});

const initialState = {
    userLogin: { userInfo: userInfoFromStore },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
