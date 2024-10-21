// src/componentes/Navegacion/navigation.jsx
import React from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import './navigation.css';
import logo from '../Imagenes/LOGO1.png';

const Navigation = ({ toggleLogin, toggleRegistro }) => { // Recibe las funciones como props
  return (
    <Navbar className="navbar-custom" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="Fantasy Logo" className="logo-img" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/productos">Productos</Nav.Link>
            <Nav.Link href="/contacto">Contacto</Nav.Link>
            <Nav.Link href="/acerca">Acerca</Nav.Link>
          </Nav>

          {/* Menú para iniciar sesión o registrarse */}
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              Iniciar Sesión
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={toggleLogin}>Iniciar Sesión</Dropdown.Item> {/* Llama a la función para mostrar el formulario */}
              <Dropdown.Item onClick={toggleRegistro}>Registrarse</Dropdown.Item> {/* Llama a la función para mostrar el formulario de registro */}
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
