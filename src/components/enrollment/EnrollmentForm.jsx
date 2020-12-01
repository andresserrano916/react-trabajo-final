import React, { useEffect, useState } from 'react';
import { combineValidators, isRequired } from 'revalidate';
import {Form as FinalForm, Field} from 'react-final-form';
import { Button, Form, Grid, Header, ItemMeta, Popup, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from '../../';

import TextInput from '../form/TextInput';
import SelectInput from '../form/SelectInput';
import ErrorMessage from '../form/ErrorMessage';

import {obtainStudents} from './../../app/store/actions/studentActions';
import EnrollmentService from './../../app/api/enrollmentService';
import useFetchCourses from '../../app/hooks/useFetchCourses';
import { toast } from 'react-toastify';

const validate = combineValidators({
    student: isRequired(''),
    courses: isRequired('')
});

const actions = {
    obtainStudents
};

const mapState = (state) => {
    const students = [];

    if(state.student.students && state.student.students.length > 0){
        state.student.students.forEach(item => {
            const student = {
                key: item.id,
                text: `${item.nombres} ${item.apellidos}`,
                value: item.id
            };
            students.push(student);
        });
    }

    return {
        loading: state.student.loadingStudents,
        students
    };
};

const EnrollmentForm = ({obtainStudents, students, loading}) => {

    const [coursesDB] = useFetchCourses();
    const [courses, setCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [items, setItems] = useState([]);
    const [item, setItem] = useState(null);

    useEffect(() => {
        if(students.length === 0){
            obtainStudents();
        }

        setLoadingCourses(true);
        if(coursesDB){
            const courses = [];

            coursesDB.forEach(item => {
                const course = {
                    key: item.id,
                    text: item.nombre,
                    acronym: item.siglas,
                    value: item.id
                };
                courses.push(course);
            });

            setCourses(courses);
            setLoadingCourses(false);
        }
    }, [coursesDB, students.length, obtainStudents]);

    const handleAddingItems = () => {
        const newItems = [...items];
        const coursesList = [...courses];

        const index = newItems.findIndex(a => a.id === item);

        if(index !== -1){
            return;
        }

        const newItem = {
            id: item,
            name: coursesList.filter(a => a.key === item)[0].text,
            acronym: coursesList.filter(a => a.key === item)[0].acronym
        };
        newItems.push(newItem);
        setItems(newItems);
    };

    const handleRemoveItems = (id) => {
        let updateItems = [...items];
        updateItems = updateItems.filter(a => a.id !== id);
        setItems(updateItems);
    };

    const handleAddNewEnrollment = async (values) => {
        const newItems = [...items];
        const coursesForEnrollment = newItems.map(item => {
            return {id: item.id};
        });

        const newEnrollment = {
            fecha: new Date(),
            estado: true,
            estudiante: {id: values.student},
            cursos: coursesForEnrollment
        };

        try{
            const enrollment = await EnrollmentService.saveEnrollment(newEnrollment);
            toast.info('La matrícula fue creada correctamente');
            history.push(`enrollment/${enrollment.id}`);
        }catch(error){
            toast.error(error);
        }
    };

    return (
        <FinalForm onSubmit={(values) => handleAddNewEnrollment(values)}
            validate={validate}
            render={({handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit}) => (
                <Form onSubmit={handleSubmit} error loading={loading || loadingCourses}>
                    <Header as="h2" content="Nueva Matrícula" color="brown" textAlign="center" />
                    <Field name="student" component={SelectInput} placeholder="Seleccione el estudiante"
                        options={students} width="3"/>
                    <Grid columns="2">
                        <Grid.Row columns="2">
                            <Grid.Column width="5">
                                <Field name="courses" component={SelectInput} placeholder="Seleccione un curso"
                                    options={courses} width="3" handleOnChange={(e) => setItem(e)}/>
                            </Grid.Column>
                            <Grid.Column width="5">
                                <Popup inverted content="Agregar Curso"
                                    trigger={
                                        <Button type="button" loading={submitting}
                                            color="green" icon="plus circle" onClick={handleAddingItems} disabled={!item} />
                                    }
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            {items && items.length > 0 && (
                                <Table celled collapsing style={{marginLeft: '2%'}}>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Curso</Table.HeaderCell>
                                            <Table.HeaderCell>Siglas</Table.HeaderCell>
                                            <Table.HeaderCell />
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {items.map(item => (
                                            <Table.Row key={item.id}>
                                                <Table.Cell>{item.name}</Table.Cell>
                                                <Table.Cell>{item.acronym}</Table.Cell>
                                                <Table.Cell>
                                                    <Popup inverted content="Eliminar de matrícula"
                                                        trigger={
                                                            <Button type="button" loading={submitting}
                                                                color="red" icon="remove circle" onClick={() => handleRemoveItems(item.id)}/>
                                                            }
                                                    />
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>
                            )}
                        </Grid.Row>
                    </Grid>
                    <br />
                    <Button fluid disabled={items.length === 0}
                        loading={submitting}
                        color="green" content="Nueva Matrícula"
                    />
                </Form>
            )}
        >
        </FinalForm>
    );
};

EnrollmentForm.propTypes = {
    obtainStudents: PropTypes.func.isRequired,
    students: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
};

export default connect(mapState, actions)(EnrollmentForm);
