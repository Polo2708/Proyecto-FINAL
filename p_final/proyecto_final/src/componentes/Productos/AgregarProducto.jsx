import React, { useState } from 'react';
import axios from 'axios';
import './AgregarProducto.css';

const AgregarProducto = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null); // Cambiado a null para manejar el archivo

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]); // Obtener el archivo seleccionado
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    if (imagen) {
      formData.append('imagen', imagen);
    }
  
    try {
      const response = await axios.post('http://localhost:3001/api/productos', formData);
      console.log('Producto agregado:', response.data);
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Producto</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*" // Aceptar solo archivos de imagen
        onChange={handleImageChange}
        required // Hacer que este campo sea obligatorio
      />
      <button type="submit">Agregar Producto</button>
    </form>
  );
};

export default AgregarProducto;
