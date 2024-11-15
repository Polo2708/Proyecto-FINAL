import React from 'react';
import './ProductStyle.css';
import 'font-awesome/css/font-awesome.min.css';

const ProductListForCustomer = ({ products, onAddToCart }) => {
  return (
    <div className="product-list">
      {products.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        products.map((product) => (
          <div key={product.id} className="product-card">
            {/* Mostrar todas las imágenes asociadas al producto */}
            <div className="product-image-container">
              {product.imagenes && JSON.parse(product.imagenes).map((imagen, index) => (
                <img
                  key={index}
                  src={`http://localhost:3001/uploads/${imagen}`}
                  alt={`Imagen del producto ${product.nombre}`}
                  className="product-image"
                />
              ))}
            </div>

            {/* Contenido debajo de la imagen */}
            <div className="product-info">
              <h5 className="product-name">{product.nombre}</h5>
              <p className="product-description">{product.descripcion}</p>
              <p className="product-price">${product.precio}</p>
              <button
                className="btn btn-primary"
                onClick={() => onAddToCart(product)}
              >
                <i className="fa fa-shopping-cart"></i> {/* Ícono de carrito */}
                Añadir al carrito
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};


export default ProductListForCustomer;
