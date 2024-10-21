import React, { useEffect, useState } from 'react';
import './Productos.css';

export function Productos() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');
  
  // Cargar los productos desde el backend
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:3001/productos');
        const data = await response.json();
        if (response.ok) {
          setProductos(data); // Asumimos que `data` es un array de productos
        } else {
          setError('Error al cargar los productos');
        }
      } catch (err) {
        setError('Error de conexión');
      }
    };
    
    fetchProductos();
  }, []);

  return (
    <div className="productos-container">
      <h2>Lista de Productos</h2>
      {error && <p>{error}</p>}
      <div className="productos-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="producto-card">
            <img src={producto.imagen} alt={producto.nombre} className="producto-imagen" />
            <h3>{producto.nombre}</h3>
            <p>Precio: ${producto.precio}</p>
            <button>Añadir al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
}
