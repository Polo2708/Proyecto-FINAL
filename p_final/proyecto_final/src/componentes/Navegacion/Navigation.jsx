import React, { useState } from 'react';
import { Navbar, Nav, Container, Modal, Button, Form } from 'react-bootstrap';
import { FaUser, FaShoppingCart, FaCogs } from 'react-icons/fa';  // Importamos el ícono de carrito y el ícono de gestión
import Login from '@/componentes/Login/Login';
import Registro from '@/componentes/Login/Registro';
import Cart from '../Productos/Cart';  
import './Navigation.css';
import logo from '../Imagenes/LOGO1.png';

const Navigation = ({ user, handleLogout, setUser, toggleLogin, toggleCrud, cartItems, onShowCart }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showCartModal, setShowCartModal] = useState(false);  // Estado para mostrar el modal del carrito
  const [searchQuery, setSearchQuery] = useState(""); // Estado para manejar la búsqueda

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const toggleForm = () => setIsLogin(!isLogin);

  const handleCartShow = () => {
    setShowCartModal(!showCartModal);  // Toggle para mostrar/ocultar el modal del carrito
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Aquí puedes agregar la lógica para hacer la búsqueda en tiempo real si lo deseas
  };

  const handleProductManagement = () => {
    // Lógica para abrir el panel de gestión de productos o crud
    toggleCrud();
  };

  return (
    <>
      {/* Barra de navegación */}
      <Navbar className="navbar-custom">
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="Fantasy Logo" className="logo-img" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              {/* Dropdown de productos con categorías */}
              <Nav.Item className="dropdown">
                <Nav.Link href="/productos" className="dropdown-toggle" data-bs-toggle="dropdown">
                  Marcas
                </Nav.Link>
                <ul className="dropdown-menu">
                  <li><Nav.Link href="/productos/nike">Nike</Nav.Link></li>
                  <li><Nav.Link href="/productos/adidas">Adidas</Nav.Link></li>
                  <li><Nav.Link href="/productos/reebok">Reebok</Nav.Link></li>
                  <li><Nav.Link href="/productos/otros">Skechers</Nav.Link></li>
                </ul>
              </Nav.Item>

              {/* Secciones de Hombres, Mujer, Niños */}
              <Nav.Link href="/hombres">Hombres</Nav.Link>
              <Nav.Link href="/mujer">Mujer</Nav.Link>
              <Nav.Link href="/ninos">Niños</Nav.Link>
            </Nav>

            <Form className="d-flex search-form me-auto">
              <Form.Control
                type="search"
                placeholder="Busca en Fantasy"
                className="search-input"
                value={searchQuery}
                onChange={handleSearch}
              />
            </Form>

            {/* Espacio para separar la barra de búsqueda y el botón de inicio de sesión */}
            <div className="d-flex align-items-center ms-auto">
              {/* Carrito de compras */}
              <button 
                className="btn btn-light ms-3" 
                onClick={handleCartShow}
              >
                <FaShoppingCart />
                {cartItems.length > 0 && (
                  <span className="badge bg-danger ms-2">{cartItems.length}</span>
                )}
              </button>

              {/* Botón de gestión de productos (solo visible si el usuario está logueado) */}
              {user && (
                <button 
                  className="btn btn-light ms-3" 
                  onClick={handleProductManagement}
                >
                  <FaCogs /> Gestión de productos
                </button>
              )}

              {/* Botón de Iniciar sesión */}
              <button className="btn btn-light ms-3" onClick={handleShow}>
                <FaUser /> Iniciar sesión
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
            onRemoveFromCart={() => {}}  
            onClearCart={() => {}} 
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Navigation;
