import { combineReducers } from 'redux';
import authReducer from './authReducer';
import modalReducer from './modalReducer';
import studentReducer from './studentReducer';

const rootReducer = combineReducers({
    modal: modalReducer,
    auth: authReducer,
    student: studentReducer
});

export default rootReducer;