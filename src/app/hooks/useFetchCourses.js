import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CourseService from '../api/courseService';

const useFetchCourses = () => {
    const [courses, setCourses] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        CourseService.obtainCourses()
            .then(response => {
                setCourses(response);
            }).catch(error => toast.error(error));

        setLoading(false);
    }, []);

    return [courses, loading];
};

export default useFetchCourses;
