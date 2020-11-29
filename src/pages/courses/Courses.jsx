import React, { useCallback, useEffect, useState } from 'react';
import { Breadcrumb, Button, Container, Divider, Grid, Header, Icon, Popup, Segment, Table } from 'semantic-ui-react';
import CourseService from '../../app/api/courseService';
import LoadingComponent from '../../components/common/LoadingComponent';
import {openModal, closeModal} from '../../app/store/actions/modalActions';
import { connect } from 'react-redux';
import CourseForm from '../../components/courses/CourseForm';

const actions = {
    openModal,
    closeModal
};

const Courses = ({openModal, closeModal}) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const obtainCourses = useCallback(async () => {
        try {
            setLoading(true);
            const courses = await CourseService.obtainCourses();
            if(courses){
                setCourses(courses);
            }
            
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        obtainCourses();
    }, [obtainCourses]);


    const handlerCreateOrEdit = (values) => {
        console.log(values);
    };

    let coursesList = <h4>No hay cursos disponibles</h4>;

    if(courses && courses.length > 0){
        coursesList = (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width="5">Nombre</Table.HeaderCell>
                        <Table.HeaderCell width="2">Código</Table.HeaderCell>
                        <Table.HeaderCell width="2"></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {courses.map(course => (
                        <Table.Row key={course.id}>
                            <Table.Cell>{course.nombre}</Table.Cell>
                            <Table.Cell>{course.siglas}</Table.Cell>
                            <Table.Cell>
                                <Popup inverted content="Modificar" 
                                    trigger={<Button color="olive" icon="edit"
                                    onClick={() => openModal(<CourseForm courseId={course.id} submitHandler={handlerCreateOrEdit}/>)} />}
                                />
                                <Popup inverted content="Eliminar" 
                                    trigger={<Button color="red" icon="trash" onClick={() => console.log("eliminar " + course.id)} />}
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        );
    }

if(loading){
    return <LoadingComponent content="Cargando cursos..." />
}

return (
    <Segment>
        <Breadcrumb size="small">
            <Breadcrumb.Section>Administración</Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron"></Breadcrumb.Divider>
            <Breadcrumb.Section active>Cursos</Breadcrumb.Section>
        </Breadcrumb>
        <Divider horizontal>
            <Header as="h4">
                <Icon name="folder outline" />
                Cursos Disponibles
            </Header>
        </Divider>
        <Segment>
            <Button size="large" content="Nuevo" icon="plus square"
                color="green" onClick={() => {
                    openModal(<CourseForm submitHandler={handlerCreateOrEdit}/>)
            }} />
        </Segment>
        <Container textAlign="center">
            <Grid columns="3">
                <Grid.Column width="3"></Grid.Column>
                <Grid.Column width="10">{coursesList}</Grid.Column>
                <Grid.Column width="3"></Grid.Column>
            </Grid>
        </Container>
    </Segment>
);
};

export default connect(null, actions)(Courses);
