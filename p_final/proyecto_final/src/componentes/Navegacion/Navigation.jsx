import React, { useState } from 'react';
import { Navbar, Nav, Container, Modal, Button } from 'react-bootstrap';
import { FaUser, FaShoppingCart } from 'react-icons/fa';  // Importamos el ícono de carrito
import Login from '@/componentes/Login';
import Registro from '@/componentes/Registro';
import Cart from '../Productos/Cart';  // Importamos el componente Cart
import './Navigation.css';
import logo from '../Imagenes/LOGO1.png';

const Navigation = ({ user, handleLogout, setUser, toggleLogin, toggleCrud, cartItems, onShowCart }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showCartModal, setShowCartModal] = useState(false);  // Estado para mostrar el modal del carrito

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const toggleForm = () => setIsLogin(!isLogin);

  const handleCartShow = () => {
    setShowCartModal(!showCartModal);  // Toggle para mostrar/ocultar el modal del carrito
  };

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

            <div className="d-flex align-items-center">
              <button className="btn btn-light" onClick={handleShow}>
                <FaUser />
              </button>
              {user && (
                <button className="btn btn-primary ms-2" onClick={toggleCrud}>
                  Gestionar Productos
                </button>
              )}

              {/* Botón del carrito de compras */}
              <button 
                className="btn btn-light ms-3" 
                onClick={handleCartShow}
              >
                <FaShoppingCart />
                {cartItems.length > 0 && (
                  <span className="badge bg-danger ms-2">{cartItems.length}</span>
                )}
              </button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal de Login */}
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

      {/* Modal del carrito de compras */}
      <Modal show={showCartModal} onHide={handleCartShow} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Carrito de Compras</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Cart 
            cartItems={cartItems}  // Aquí pasamos cartItems al componente Cart
            onRemoveFromCart={() => {}}  // Debes pasar la función para eliminar productos
            onClearCart={() => {}}  // Pasar la función para vaciar el carrito si la necesitas
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Navigation;
