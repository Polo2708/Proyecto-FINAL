import React from 'react';
import './Cart.css'; 

const Cart = ({ cartItems = [], onRemoveFromCart, onClearCart }) => {
    console.log("Estado actual del carrito en Cart:", cartItems);
  
    const calculateTotal = () => {
      return cartItems.reduce((total, item) => total + item.precio * item.quantity, 0);
    };
  
    return (
      <div className="cart-container">
        <h3 className="cart-title">Carrito de Compras</h3>
        {cartItems.length === 0 ? (
          <p className="empty-cart-message">Tu carrito está vacío</p>
        ) : (
          <div>
            <ul className="cart-items-list">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.imagen} alt={item.nombre} className="cart-item-img" />
                  </div>
                  <div className="cart-item-details">
                    <p className="cart-item-name">{item.nombre}</p>
                    <p className="cart-item-quantity">{item.quantity} x ${item.precio}</p>
                  </div>
                  <button
                    className="btn-remove"
                    onClick={() => onRemoveFromCart(item.id)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
            <div className="total-container">
              <strong className="total-price">Total: ${calculateTotal()}</strong>
            </div>
            <div className="cart-actions">
              <button className="btn-clear" onClick={onClearCart}>Vaciar Carrito</button>
              <button className="btn-checkout">Proceder a la compra</button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  

export default Cart;
