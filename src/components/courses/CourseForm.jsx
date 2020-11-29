import React, { useEffect, useState } from 'react';
import { combineValidators, isRequired } from 'revalidate';
import {Form as FinalForm, Field} from 'react-final-form';
import useFetchCourse from '../../app/hooks/useFetchCourse';
import { Button, Form, Header } from 'semantic-ui-react';
import TextInput from '../form/TextInput';
import ErrorMessage from '../form/ErrorMessage';
import PropTypes from 'prop-types';

const validate = combineValidators({
    nombre: isRequired({message: 'El nombre es requerido'}),
    siglas: isRequired({message: 'Las siglas son requeridas'})
});

const CourseForm = ({courseId, submitHandler}) => {
    const [actionLabel, setActionLabel] = useState('Agregar Curso');
    const [course, loading] = useFetchCourse(courseId);

    useEffect(() => {
        if(courseId){
            setActionLabel('Editar Curso');
        } else{
            setActionLabel('Agregar Curso');
        }
    }, [courseId]);

    return (
        <FinalForm
            onSubmit={values => submitHandler(values)}
            initialValues={courseId && course}
            validate={validate}
            render={({handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit}) => (
                <Form onSubmit={handleSubmit} error loading={loading}>
                    <Header as="h2" content={actionLabel} color="brown" textAlign="center" />
                    <Field name="nombre" component={TextInput} placeholder="Escriba el nombre" />
                    <Field name="siglas" component={TextInput} placeholder="Siglas el nombre" />
                    {submitError && !dirtySinceLastSubmit && (
                        <ErrorMessage error={submitError} text="Datos invalidos" />
                    )}
                    <Button fluid disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                        loading={submitting}
                        color="green" content={actionLabel}
                    />
                </Form>
            )}
        />
    );
};

CourseForm.propTypes = {
    courseId: PropTypes.string,
    submitHandler: PropTypes.func.isRequired
};

CourseForm.defaultProps = {
    courseId: null
};

export default CourseForm;
