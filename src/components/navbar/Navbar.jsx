import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Dropdown, Icon, Image, Menu } from 'semantic-ui-react';

const Navbar = () => {
    return (
        <Menu fixed="top" inverted>
            <Container>
                <Menu.Item header as={Link} to="/">
                    <Icon name="hand point right outline" />Inscríbete
                </Menu.Item>
                <Menu.Item>
                    <Dropdown pointing="top left" text="Administración">
                        <Dropdown.Menu>
                            <Dropdown.Item text="Cursos" icon="folder outline" as={Link} to="/courses"/>
                            <Dropdown.Item text="Estudiantes" icon="unordered list" as={Link} to="/students"/>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
                <Menu.Item>
                    <Dropdown pointing="top left" text="Matrículas">
                        <Dropdown.Menu>
                            <Dropdown.Item text="Ver Matrículas" icon="book" as={Link} to="/enrollments"/>
                            <Dropdown.Item text="Nueva Matrícula" icon="pencil alternate" as={Link} to="/enrollment"/>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
                <Menu.Item position="right">
                    <Image avatar spaced="right" src="/assets/user.png" />
                    <Dropdown pointing="top left" text="username">
                        <Dropdown.Menu>
                            <Dropdown.Item text="Cerrar Sesión" icon="log out" onClick={() => console.log('Salir')}/>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    );
};

export default Navbar;
