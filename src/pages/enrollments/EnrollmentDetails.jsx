import React, { useCallback, useEffect, useState } from 'react';
import LoadingComponent from '../../components/common/LoadingComponent';
import EnrollmentService from '../../app/api/enrollmentService';
import StudentService from '../../app/api/studentService';
import CourseService from '../../app/api/courseService';
import { toast } from 'react-toastify';
import { Breadcrumb, Container, Divider, Grid, Header, Icon, Segment, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const EnrollmentDetails = ({match}) => {

    const [enrollment, setEnrollment] = useState(null);
    const [loading, setLoading] = useState(false);

    const obtainEnrollment = useCallback(async () => {
        try {
            setLoading(true);
            const enrollment = await EnrollmentService.obtainEnrollment(match.params.id);

            if(enrollment){
                const student = await StudentService.obtainStudent(enrollment.estudiante.id);
                const courses = [];

                if(enrollment.cursos.length > 0){
                    enrollment.cursos.forEach((course) => {
                        CourseService.obtainCourse(course.id).then(response => {
                            if(response){
                                const courseItem = {
                                    nombre: response.nombre,
                                    siglas: response.siglas,
                                    estado: response.estado
                                };
                                courses.push(courseItem);
                            }

                            const enrollmentDetail = {
                                id: enrollment.id,
                                createdAt: new Date(enrollment.fecha).toLocaleDateString(),
                                student,
                                courses
                            };

                            setEnrollment(enrollmentDetail);

                        }).catch(error => toast.error(error));
                    });
                }
            }
        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    }, [match.params.id]);

    useEffect(() => {
        obtainEnrollment();
    }, [obtainEnrollment]);

    if(loading){
        return <LoadingComponent content="Cargando detalles de la matrícula..." />;
    }

    let enrollmentDetailArea = <h4>Detalles Matrícula</h4>;

    if(enrollment){
        enrollmentDetailArea = (
            <Segment.Group>
                <Segment>
                    <Header as="h4" block color="brown">
                        Estudiante
                    </Header>
                </Segment>
                <Segment.Group>
                    <Segment>
                        <p>
                            <b>Nombre: </b>
                            {`${enrollment.student.nombres} ${enrollment.student.apellidos}`}
                        </p>
                    </Segment>
                </Segment.Group>
                <Segment>
                    <Header as="h4" block color="brown">
                        Matrícula
                    </Header>
                </Segment>
                <Segment.Group>
                    <Segment>
                        <p>
                            <b>Código: </b>
                            {enrollment.id}
                        </p>
                        <p>
                            <b>Fecha registro: </b>
                            {enrollment.createdAt}
                        </p>
                    </Segment>
                </Segment.Group>
                <Segment>
                    <Table celled striped color="brown">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan="3">
                                    <Icon name="book" />
                                    Matrículas
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Nombre</Table.HeaderCell>
                                <Table.HeaderCell>Siglas</Table.HeaderCell>
                                <Table.HeaderCell>Estado</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {enrollment.courses.length > 0 && enrollment.courses.map(course => (
                                <Table.Row key={course.id}>
                                    <Table.Cell>{course.nombre}</Table.Cell>
                                    <Table.Cell>{course.siglas}</Table.Cell>
                                    <Table.Cell>{course.estado ? 'Activo' : 'Inactivo'}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Segment>
            </Segment.Group>
        );
    }

    return (
        <Segment>
            <Breadcrumb size="small">
                <Breadcrumb.Section>Administración</Breadcrumb.Section>
                <Breadcrumb.Divider icon="right chevron"></Breadcrumb.Divider>
                <Breadcrumb.Section as={Link} to="/enrollments">Matrículas</Breadcrumb.Section>
                <Breadcrumb.Divider icon="right chevron"></Breadcrumb.Divider>
                <Breadcrumb.Section active>Detalle Matrícula</Breadcrumb.Section>
            </Breadcrumb>
            <Divider horizontal>
                <Header as="h4">
                    <Icon name="table" />
                    Detalle de Matrícula
                </Header>
            </Divider>
            <Container>
                <Grid columns="3">
                    <Grid.Column width="3"></Grid.Column>
                    <Grid.Column width="10">{enrollmentDetailArea}</Grid.Column>
                    <Grid.Column width="3"></Grid.Column>
                </Grid>
            </Container>
        </Segment>
    );
};

export default EnrollmentDetails;
