import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Login = ({ setUser, toggleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lógica de validación del login
    const userData = { email }; // Crear el objeto del usuario (puedes agregar más campos como nombre)

    // Guardar el usuario en localStorage para mantener la sesión
    localStorage.setItem('user', JSON.stringify(userData));

    // Establecer el usuario en el estado global
    setUser(userData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Introduce tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Introduce tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Iniciar Sesión
      </Button>
      <Button variant="link" onClick={toggleLogin} style={{ marginLeft: '10px' }}>
        ¿No tienes cuenta? Regístrate
      </Button>
    </Form>
  );
};

export default Login;
