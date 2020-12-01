import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

const NotFound = () => {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name="search" />
                Ups! Contenido no encontrado.
            </Header>
            <Segment.Inline>
                <Button as={Link} to="/courses" primary>
                    Volver a los cursos
                </Button>
            </Segment.Inline>
        </Segment>
    );
};

export default NotFound;
