import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Icon, Segment } from 'semantic-ui-react';

const HomePage = () => {
    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as="h1" inverted>
                    <Icon name="hand point right outline"/> Inscríbete
                </Header>
                <Header as="h2" inverted content="Te ayudaremos a elevar tus concocimientos" />
                <Button size="huge" inverted content="Ver cursos" as={Link} to="/courses"/>
                <Button size="huge" inverted content="Entrar" />
            </Container>
        </Segment>
    );
};

export default HomePage;
