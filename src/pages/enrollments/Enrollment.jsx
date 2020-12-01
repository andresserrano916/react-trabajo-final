import React from 'react';
import { Breadcrumb, Button, Container, Divider, Grid, Header, Icon, Popup, Segment, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import EnrollmentForm from '../../components/enrollment/EnrollmentForm';

const Enrollment = () => {
    return (
        <Segment>
            <Breadcrumb size="small">
                <Breadcrumb.Section>Administración</Breadcrumb.Section>
                <Breadcrumb.Divider icon="right chevron"></Breadcrumb.Divider>
                <Breadcrumb.Section as={Link} to="/enrollments">Matrículas</Breadcrumb.Section>
                <Breadcrumb.Divider icon="right chevron"></Breadcrumb.Divider>
                <Breadcrumb.Section active>Nueva Matrícula</Breadcrumb.Section>
            </Breadcrumb>
            <Divider horizontal>
                <Header as="h4">
                    <Icon name="pencil alternate" />
                    Nueva de Matrícula
                </Header>
            </Divider>
            <Container>
                <Grid columns="3">
                    <Grid.Column width="3"></Grid.Column>
                    <Grid.Column width="10">
                        <EnrollmentForm />
                    </Grid.Column>
                    <Grid.Column width="3"></Grid.Column>
                </Grid>
            </Container>
        </Segment>
    );
};

export default Enrollment;
