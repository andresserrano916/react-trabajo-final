import React from 'react';
import { combineValidators, isRequired } from 'revalidate';
import {Form as FinalForm, Field} from 'react-final-form';

import {login} from './../../app/store/actions/authActions';
import { FORM_ERROR } from 'final-form';
import { Button, Form, Header } from 'semantic-ui-react';
import TextInput from '../form/TextInput';
import ErrorMessage from '../form/ErrorMessage';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const validate = combineValidators({
    username: isRequired('username'),
    password: isRequired('password')
});

const actions = {
    login
};

const LoginForm = ({login}) => {
    return (
        <FinalForm
            onSubmit={(values) => login(values).catch(error => ({[FORM_ERROR]: error}))}
            validate={validate}
            render={({handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit}) => (
                <Form onSubmit={handleSubmit} error>
                    <Header as="h2" content="Iniciar Sesión" color="brown" textAlign="center" />
                    <Field name="username" component={TextInput} placeholder="Usuario" />
                    <Field name="password" component={TextInput} placeholder="Contraseña" type="password" />
                    {submitError && !dirtySinceLastSubmit && (
                        <ErrorMessage error={submitError} text="Datos inválidos" />
                    )}
                    <Button fluid disabled={(invalid && !dirtySinceLastSubmit) || pristine} loading={submitting}
                        color="green" content="Entrar" />
                </Form>
            )}
        />

    );
};

LoginForm.propTypes = {
    login: PropTypes.func.isRequired
};

export default connect(null, actions)(LoginForm);