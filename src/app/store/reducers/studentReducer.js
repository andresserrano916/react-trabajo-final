import createReducer from './reducerUtils';

import {
    LOADING_STUDENTS,
    LOADING_STUDENT,
    OBTAIN_STUDENTS,
    OBTAIN_STUDENT,
    SAVE_STUDENT,
    UPDATE_STUDENT,
    DELETE_STUDENT
} from './../actions/actionTypes';

const initialState = {
    students: [],
    student: null,
    loadingStudent: false,
    loadingStudents: false
};

const loadingStudents = (state, payload) => {
    return {...state, loadingStudents: payload.loading };
};

const loadingStudent = (state, payload) => {
    return {...state, loadingStudent: payload.loading };
};

const obtainStudents = (state, payload) => {
    return {...state, students: payload.students };
};

const obtainStudent = (state, payload) => {
    return {...state, student: payload.student };
};

const saveStudent = (state, payload) => {
    return {...state, students: payload.students };
};

const updateStudent = (state, payload) => {
    return {...state, students: payload.students };
};

const deleteStudent = (state, payload) => {
    return {...state, students: payload.students };
};

export default createReducer(initialState, {
    [LOADING_STUDENTS]: loadingStudents,
    [LOADING_STUDENT]: loadingStudent,
    [OBTAIN_STUDENTS]: obtainStudents,
    [OBTAIN_STUDENT]: obtainStudent,
    [SAVE_STUDENT]: saveStudent,
    [UPDATE_STUDENT]: updateStudent,
    [DELETE_STUDENT]: deleteStudent
});