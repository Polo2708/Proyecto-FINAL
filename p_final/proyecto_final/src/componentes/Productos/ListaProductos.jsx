import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);

  const fetchProductos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/Products');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            <h3>{producto.nombre}</h3>
            <p>Precio: ${producto.precio}</p>
            {producto.imagen && <img src={`http://localhost:3001/uploads/${producto.imagen}`} alt={producto.nombre} width="100" />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaProductos;
