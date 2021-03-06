import React, { useCallback, useEffect, useState } from 'react';
import { Breadcrumb, Button, Container, Divider, Grid, Header, Icon, Popup, Segment, Table } from 'semantic-ui-react';
import CourseService from '../../app/api/courseService';
import LoadingComponent from '../../components/common/LoadingComponent';
import {openModal, closeModal} from '../../app/store/actions/modalActions';
import { connect } from 'react-redux';
import CourseForm from '../../components/courses/CourseForm';
import { toast } from 'react-toastify';
import useFetchCourses from '../../app/hooks/useFetchCourses';

const actions = {
    openModal,
    closeModal
};

const Courses = ({openModal, closeModal}) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [coursesDB] = useFetchCourses();

    useEffect(() => {
        setLoading(true);
        if(coursesDB){
            setCourses(coursesDB);
            setLoading(false);
        }
    }, [coursesDB]);


    const handlerCreateOrEdit = async (values) => {
        const coursesLst = [...courses];
        try {
            if(values.id){
                const updatedCourse = await CourseService.updateCourse(values);
                const index = coursesLst.findIndex(a => a.id === values.id);
                coursesLst[index] = updatedCourse;
                toast.success('El curso se ha sido actualizado');
            }else{
                const course = {
                    nombre: values.nombre,
                    siglas: values.siglas,
                    estado: true
                };
                const newCourse = await CourseService.saveCourse(course);
                coursesLst.push(newCourse);
                toast.success('El curso se ha agregado');
            }
            setCourses(coursesLst);
        } catch (error) {
            toast.error(error);
        }

        closeModal();
    };

    const handleDeleteCourse = async (id) => {
        setLoading(true);
        try {
            let coursesUpdateLst = [...courses];
            await CourseService.deleteCourse(id);
            coursesUpdateLst = coursesUpdateLst.filter(c => c.id !== id);
            setCourses(coursesUpdateLst);
            toast.success('El curso se ha eliminado');
        } catch (error) {
            toast.error(error);
        } finally{
            setLoading(false);
        }
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
                                    trigger={<Button color="red" icon="trash" onClick={() => handleDeleteCourse(course.id)} />}
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        );
    }

if(loading){
    return <LoadingComponent content="Cargando cursos..." />;
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
