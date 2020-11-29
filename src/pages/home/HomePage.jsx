import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Icon, Segment } from 'semantic-ui-react';
import { getJwt } from '../../app/config/auth/credentials';
import LoginForm from '../../components/auth/LoginForm';
import {openModal} from './../../app/store/actions/modalActions';

const mapState = (state) => ({
    currentUser: state.auth.currentUser,
    token: getJwt()
});

const actions = {
    openModal
};

const HomePage = ({currentUser, token, openModal}) => {
    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as="h1" inverted>
                    <Icon name="hand point right outline"/> Inscríbete
                </Header>
                {currentUser && token ? (
                    <>
                        <Header as="h2" inverted content="Bievenido! Este es el lugar donde te ayudaremos a elevar tus concocimientos" />
                        <Button size="huge" inverted content="Ver cursos" as={Link} to="/courses"/>
                    </>
                ) : (
                    <>
                        <Header as="h2" inverted content="Bievenido al lugar con el mejor contenido" />
                        <Button size="huge" inverted content="Entrar" onClick={() => openModal(<LoginForm />)} />
                    </>
                )}
            </Container>
        </Segment>
    );
};

export default connect(mapState, actions)(HomePage);
