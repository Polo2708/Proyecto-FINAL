import React, { useState } from 'react';
import { Navbar, Nav, Container, Modal, Button } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa'; 
import Login from '@/componentes/Login';
import Registro from '@/componentes/Registro';
import './Navigation.css';
import logo from '../Imagenes/LOGO1.png';

const Navigation = ({ setUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <>
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

            <button className="btn btn-light" onClick={handleShow}>
              <FaUser />
            </button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLogin ? (
            <Login setUser={setUser} toggleLogin={toggleForm} />
          ) : (
            <Registro setUser={setUser} toggleLogin={toggleForm} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Navigation;
