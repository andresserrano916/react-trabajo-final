import React, { useEffect, useState } from 'react';
import { combineValidators, isRequired } from 'revalidate';
import {Form as FinalForm, Field} from 'react-final-form';
import { Button, Form, Header } from 'semantic-ui-react';
import TextInput from '../form/TextInput';
import {obtainStudent, saveStudent, updateStudent} from './../../app/store/actions/studentActions';
import ErrorMessage from '../form/ErrorMessage';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const validate = combineValidators({
    nombres: isRequired({message: 'El nombre es requerido'}),
    apellidos: isRequired({message: 'El apellido es requerido'}),
    dni: isRequired({message: 'El DNI es requerido'}),
    edad: isRequired({message: 'La edad es requerida'})
});

const actions = {
    obtainStudent,
    saveStudent,
    updateStudent
};

const mapState = (state) => ({
    student: state.student.student,
    loading: state.student.loadingStudent
});

const StudentsForm = ({id, student, obtainStudent, saveStudent, updateStudent, loading}) => {
    const [actionLabel, setActionLabel] = useState('Agregar Estudiante');

    useEffect(() => {
        if(id){
            obtainStudent(id);
            setActionLabel('Editar Estudiante');
        } else{
            setActionLabel('Agregar Estudiante');
        }
    }, [obtainStudent, id]);

    const handleCreateOrEdit = (values) => {
        if(id){
            updateStudent(values);
        }else{
            const newStudent = {
                nombres: values.nombres,
                apellidos: values.apellidos,
                dni: values.dni,
                edad: values.edad
            };
            saveStudent(newStudent);
        }
    };

    return (
        <FinalForm onSubmit={(values) => handleCreateOrEdit(values)}
            initialValues={id && student}
            validate={validate}
            render={({handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit}) => (
                <Form onSubmit={handleSubmit} error loading={loading}>
                    <Header as="h2" content={actionLabel} color="brown" textAlign="center" />
                    <Field name="nombres" component={TextInput} placeholder="Escriba los nombres" />
                    <Field name="apellidos" component={TextInput} placeholder="Escriba los apellidos" />
                    <Field name="dni" component={TextInput} placeholder="Escriba el DNI" />
                    <Field name="edad" component={TextInput} type="number" placeholder="Escriba la edad" />
                    {submitError && !dirtySinceLastSubmit && (
                        <ErrorMessage error={submitError} text="Datos inválidos" />
                    )}
                    <Button fluid disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                        loading={submitting}
                        color="green" content={actionLabel}
                    />
                </Form>
            )}
        >
        </FinalForm>
    );
};

StudentsForm.propTypes = {
    id: PropTypes.string,
    student: PropTypes.object,
    obtainStudent: PropTypes.func.isRequired,
    saveStudent: PropTypes.func.isRequired,
    updateStudent: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

StudentsForm.defaultProps = {
    id: null,
    student: null
};

export default connect(mapState, actions)(StudentsForm);
