import { ENROLLMENTS_ENDPOINT } from '../core/appConstants';
import baseApi from './baseApi';

const obtainEnrollmentUrl = id => `${ENROLLMENTS_ENDPOINT}/${id}`;

class EnrollmentService{
    static obtainEnrollments = () => baseApi.get(ENROLLMENTS_ENDPOINT);

    static obtainEnrollment = (id) => baseApi.get(obtainEnrollmentUrl(id));

    static saveEnrollment = (data) => baseApi.post(ENROLLMENTS_ENDPOINT, data);

}

export default EnrollmentService;