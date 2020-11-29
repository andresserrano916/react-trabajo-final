import createReducer from './reducerUtils';
import {LOGIN_USER, LOGOUT_USER, CURRENT_USER} from './../actions/actionTypes';

const initialState = {
    currentUser: null
};

const loginUser = (state) => {
    return {
        ...state
    };
};

const setCurrentUser = (state, payload) => {
    return {
        ...state,
        currentUser: payload.currentUser
    };
};

const signOutUser = () => {
    return {currentUser: null};
};

export default createReducer(initialState, {
    [LOGIN_USER]: loginUser,
    [LOGOUT_USER]: signOutUser,
    [CURRENT_USER]: setCurrentUser
});