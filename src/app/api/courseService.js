import { COURSES_ENDPOINT } from '../core/appConstants';
import baseApi from './baseApi';

const obtainCourseUrl = id => `${COURSES_ENDPOINT}/${id}`;

class CourseService{
    static obtainCourses = () => baseApi.get(COURSES_ENDPOINT);

    static obtainCourse = id => baseApi.get(obtainCourseUrl(id));

    static saveCourse = data => baseApi.post(COURSES_ENDPOINT, data);

    static updateCourse = (data) => baseApi.put(obtainCourseUrl(data.id), data);

    static deleteCourse = id => baseApi.delete(obtainCourseUrl(id));
}

export default CourseService;