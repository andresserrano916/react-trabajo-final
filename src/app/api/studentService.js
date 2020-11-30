import { STUDENTS_ENDPOINT } from '../core/appConstants';
import baseApi from './baseApi';

const obtainStudentUrl = id => `${STUDENTS_ENDPOINT}/${id}`;

class StudentService{
    static obtainStudents = () => baseApi.get(STUDENTS_ENDPOINT);

    static obtainStudent = async (id) => baseApi.get(obtainStudentUrl(id));

    static saveStudent = async (data) => baseApi.post(STUDENTS_ENDPOINT, data);

    static updateStudent = async (data) => baseApi.put(obtainStudentUrl(data.id), data);

    static deleteStudent = async (id) => baseApi.delete(obtainStudentUrl(id));
}

export default StudentService;