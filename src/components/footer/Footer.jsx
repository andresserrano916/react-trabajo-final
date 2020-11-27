import React from 'react';
import { Container, Menu } from 'semantic-ui-react';

export const Footer = () => {
    return (
        <Menu fixed="bottom" inverted>
            <Container textAlign="center">
                <Menu.Item content="Curso Spring WebFlux - React" />
            </Container>
        </Menu>
    );
};
