import React, { useEffect } from 'react';
import { Breadcrumb, Button, Container, Divider, Grid, Header, Icon, Popup, Segment, Tab, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {obtainStudents, deleteStudent} from './../../app/store/actions/studentActions';
import {openModal, closeModal} from '../../app/store/actions/modalActions';
import LoadingComponent from '../../components/common/LoadingComponent';
import StudentsForm from '../../components/students/StudentsForm';

const actions = {
    obtainStudents,
    openModal,
    deleteStudent
};

const mapState = (state) => ({
    students: state.student.students,
    loading: state.student.loadingStudents,
    loadingStudent: state.student.loadingStudent
});

const Students = ({students, loading, loadingStudent, obtainStudents, openModal, deleteStudent}) => {
    useEffect(() => {
        obtainStudents();
    }, [obtainStudents]);

    let studentsList = <h4>No existen estudiantes inscritos</h4>;

    if(students && students.length > 0){
        studentsList = (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width="4">Nombres</Table.HeaderCell>
                        <Table.HeaderCell width="4">Apellidos</Table.HeaderCell>
                        <Table.HeaderCell width="2">DNI</Table.HeaderCell>
                        <Table.HeaderCell width="2">Edad</Table.HeaderCell>
                        <Table.HeaderCell width="2"></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {students.map((student) => (
                        <Table.Row key={student.id}>
                            <Table.Cell>{student.nombres}</Table.Cell>
                            <Table.Cell>{student.apellidos}</Table.Cell>
                            <Table.Cell>{student.dni}</Table.Cell>
                            <Table.Cell>{student.edad}</Table.Cell>
                            <Table.Cell>
                                <Popup inverted content="Actualizar estudiante"
                                    trigger={
                                        <Button basic color="olive" icon="edit" loading={loadingStudent}
                                            onClick={() => {openModal(<StudentsForm id={student.id}/>);}} />
                                    }
                                />
                                <Popup inverted content="Eliminar estudiante"
                                    trigger={
                                        <Button basic color="red" icon="trash" loading={loadingStudent}
                                            onClick={() => deleteStudent(student.id)} />
                                    }
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        );
    }
    if(loading) return <LoadingComponent content="Cargando Estudiantes..." />;

    return (
        <>
            <Segment>
                <Breadcrumb size="small">
                    <Breadcrumb.Section>Administración</Breadcrumb.Section>
                    <Breadcrumb.Divider icon="right chevron"></Breadcrumb.Divider>
                    <Breadcrumb.Section active>Estudiantes</Breadcrumb.Section>
                </Breadcrumb>

                <Divider horizontal>
                    <Header as="h4">
                        <Icon name="unordered list" />
                        Estudiantes
                    </Header>
                </Divider>
                <Segment>
                    <Button size="large" content="Nuevo" icon="plus square"
                        color="green" onClick={() => {
                            openModal(<StudentsForm />);
                        }} />
                </Segment>
                <Container textAlign="center">
                    <Grid columns="3">
                        <Grid.Column width="2"></Grid.Column>
                        <Grid.Column width="12">{studentsList}</Grid.Column>
                        <Grid.Column width="2"></Grid.Column>
                    </Grid>
                </Container>
            </Segment>
        </>
    );
};

Students.propTypes = {
    students: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    loadingStudent: PropTypes.bool.isRequired,
    obtainStudents: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    deleteStudent: PropTypes.func.isRequired
};

export default connect(mapState, actions)(Students);
