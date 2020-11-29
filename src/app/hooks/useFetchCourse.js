import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CourseService from '../api/courseService';

const useFetchCourse = (id) => {
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if(id){
            CourseService.obtainCourse(id)
                .then(response => {
                    setCourse(response);
                }).catch(error => toast.error(error));
        }
        setLoading(false);
    }, [id]);
    
    return [course, loading];
};

export default useFetchCourse;
