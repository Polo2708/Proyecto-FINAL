import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import Navigation from './componentes/Navegacion/Navigation';
import Inicio from './componentes/Inicio';
import ErrorBoundary from './componentes/Error/ErrorBoundary';
import Footer from './componentes/Footer/Footer';
import Productos from './componentes/Productos';
import Cart from './componentes/Productos/Cart';
import { fetchProducts } from './componentes/Productos/api';
import ProductListForCustomer from './componentes/Productos/ProductListForCustomer';
import Login from './componentes/Login'; 

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCrud, setShowCrud] = useState(false); 
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Cargar productos desde la API
  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data); 
    };

    loadProducts();
  }, []);

  // Alternar el estado del modal
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Añadir un producto al carrito
  const addToCart = (product) => {
    console.log("Añadiendo al carrito:", product);
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        const updatedCart = prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        console.log("Carrito actualizado después de agregar:", updatedCart);
        return updatedCart;
      } else {
        const newCart = [...prevCart, { ...product, quantity: 1 }];
        console.log("Carrito actualizado después de agregar:", newCart);
        return newCart;
      }
    });
  };

  // Eliminar producto del carrito de compras
  const removeFromCart = (productId) => {
    console.log("Intentando eliminar el producto con ID:", productId);
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(item => item.id !== productId);
      console.log("Carrito actualizado después de la eliminación:", updatedCart);
      return updatedCart;
    });
  };

  // Limpiar carrito
  const clearCart = () => {
    setCart([]);
  };

  // Mostrar u ocultar el carrito
  const handleShowCart = () => {
    setShowCart(!showCart);
  };

  // Cargar el usuario almacenado en el localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Alternar el formulario de login
  const toggleLoginForm = () => setShowLogin(!showLogin);

  // Alternar el CRUD
  const toggleCrud = () => setShowCrud(!showCrud);

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <ErrorBoundary>
      <div className="App">
        <Navigation 
          user={user} 
          handleLogout={handleLogout} 
          setUser={setUser} 
          toggleLogin={toggleLoginForm} 
          toggleCrud={toggleCrud} 
          cartItems={cart}
          onShowCart={handleShowCart} 
        />

        {/* Modal para mostrar la lista de productos y el CRUD */}
        <Modal show={showCrud} onHide={() => setShowCrud(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Gestionar Productos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Productos />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCrud(false)}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Muestra la lista de productos para el cliente en la vista principal */}
        <ProductListForCustomer products={products} onAddToCart={addToCart} />

        {/* Muestra el carrito si showCart es verdadero */}
        {showCart && (
          <Cart
            cartItems={cart}  
            onRemoveFromCart={removeFromCart}
            onClearCart={clearCart}
          />
        )}

        {/* Mostrar formulario de login si showLogin es verdadero */}
        {showLogin && <Login setUser={setUser} />}

        {/* Si el usuario no está autenticado, muestra la pantalla de inicio */}
        {!user ? (
          <Inicio user={user} />
        ) : (
          <>
            <p>Bienvenido, {user.email}!</p>
          </>
        )}
        
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
