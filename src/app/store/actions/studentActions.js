import {toast} from 'react-toastify';
import * as actionTypes from './actionTypes';
import StudentService from './../../api/studentService';
import {closeModal} from './modalActions';

const loadingStudents = (loading) => {
    return {type: actionTypes.LOADING_STUDENTS, payload: {loading}};
};

const loadingStudent = (loading) => {
    return {type: actionTypes.LOADING_STUDENT, payload: {loading}};
};

const obtainStudentsAction = (students) => {
    return {type: actionTypes.OBTAIN_STUDENTS, payload: {students}};
};

const obtainStudentAction = (student) => {
    return {type: actionTypes.OBTAIN_STUDENT, payload: {student}};
};

const saveStudentAction = (students) => {
    return {type: actionTypes.SAVE_STUDENT, payload: {students}};
};

const updateStudentAction = (students) => {
    return {type: actionTypes.UPDATE_STUDENT, payload: {students}};
};

const deleteStudentAction = (students) => {
    return {type: actionTypes.DELETE_STUDENT, payload: {students}};
};

export const obtainStudents = () => async (dispatch) => {
    dispatch(loadingStudents(true));
    try {
        const students = await StudentService.obtainStudents();

        dispatch(obtainStudentsAction(students));
        dispatch(loadingStudents(false));
    } catch (error) {
        dispatch(loadingStudents(false));
        toast.error('Se presentó un error al cargar los estudiantes');
    }
};

export const obtainStudent = (id) => async (dispatch) => {
    dispatch(loadingStudents(true));
    try {
        const student = await StudentService.obtainStudent(id);

        dispatch(obtainStudentAction(student));
    } catch (error) {
        toast.error('Se presentó un error al cargar el estudiante seleccionado');
    } finally{
        dispatch(loadingStudents(false));
    }
};

export const saveStudent = (student) => async (dispatch, getState) => {
    dispatch(loadingStudents(true));
    try {
        const newStudent = await StudentService.saveStudent(student);
        const students = [...getState().student.students];
        students.push(newStudent);

        dispatch(saveStudentAction(students));
        dispatch(closeModal());
        toast.success('El estudiante se ha agregado');
    } catch (error) {
        toast.error('Se presentó un error al agregar el estudiante');
    }finally{
        dispatch(loadingStudents(false));
    }
};

export const updateStudent = (student) => async (dispatch, getState) => {
    dispatch(loadingStudents(true));
    try {
        const updatedStudent = await StudentService.updateStudent(student);
        const students = [...getState().student.students];
        const index = students.findIndex(std => std.id === updatedStudent.id);
        students[index] = updatedStudent;

        dispatch(updateStudentAction(students));
        dispatch(closeModal());
        toast.success('El estudiante se ha sido actualizado');
    } catch (error) {
        toast.error('Se presentó un error al actualizar el estudiante');
    }finally{
        dispatch(loadingStudents(false));
    }
};

export const deleteStudent = (id) => async (dispatch, getState) => {
    dispatch(loadingStudents(true));
    try {
        await StudentService.deleteStudent(id);
        let students = [...getState().student.students];

        students = students.filter(std => std.id !== id);

        dispatch(deleteStudentAction(students));
        dispatch(closeModal());
        toast.info('El estudiante se ha eliminado');
    } catch (error) {
        toast.error('Se presentó un error al eliminar el estudiante');
    }finally{
        dispatch(loadingStudents(false));
    }
};