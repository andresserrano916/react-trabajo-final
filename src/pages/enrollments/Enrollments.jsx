import React, { useCallback, useEffect, useState } from 'react';
import { Breadcrumb, Button, Container, Divider, Grid, Header, Icon, Popup, Segment, Table } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import LoadingComponent from '../../components/common/LoadingComponent';
import EnrollmentService from '../../app/api/enrollmentService';
import {openModal, closeModal} from '../../app/store/actions/modalActions';

const Enrollments = ({history}) => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    const obtainEnrollments = useCallback(async () => {
        try {
            setLoading(true);
            const enrollments = await EnrollmentService.obtainEnrollments();
            if(enrollments){
                setEnrollments(enrollments);
            }

        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        obtainEnrollments();
    }, [obtainEnrollments]);

    let enrollmentsList = <h4>No hay matrículas</h4>;

    if(enrollments && enrollments.length > 0){
        enrollmentsList = (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width="5">Fecha</Table.HeaderCell>
                        <Table.HeaderCell width="2">Estado</Table.HeaderCell>
                        <Table.HeaderCell width="2"></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {enrollments.map(enrollment => (
                        <Table.Row key={enrollment.id}>
                            <Table.Cell>{new Date(enrollment.fecha).toLocaleDateString()}</Table.Cell>
                            <Table.Cell>{enrollment.estado ? 'Activo' : 'Inactivo'}</Table.Cell>
                            <Table.Cell>
                                <Popup inverted content="Detalle Matrícula"
                                    trigger={<Button color="olive" icon="table"
                                    onClick={() => {history.push(`/enrollment/${enrollment.id}`);}}/>}
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        );
    }

    if(loading){
        return <LoadingComponent content="Cargando matrículas..." />;
    }

    return (
        <Segment>
            <Breadcrumb size="small">
                <Breadcrumb.Section>Administración</Breadcrumb.Section>
                <Breadcrumb.Divider icon="right chevron"></Breadcrumb.Divider>
                <Breadcrumb.Section active>Matrículas</Breadcrumb.Section>
            </Breadcrumb>
            <Divider horizontal>
                <Header as="h4">
                    <Icon name="book" />
                    Matrículas
                </Header>
            </Divider>
            <Container textAlign="center">
                <Grid columns="3">
                    <Grid.Column width="3"></Grid.Column>
                    <Grid.Column width="10">{enrollmentsList}</Grid.Column>
                    <Grid.Column width="3"></Grid.Column>
                </Grid>
            </Container>
        </Segment>
    );
};

Enrollments.propTypes = {
    history: PropTypes.object.isRequired
};

export default Enrollments;
