// src/App.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './componentes/Navegacion/navigation';
import Inicio from './componentes/Inicio';
import Login from './componentes/Login'; // Asegúrate de que el componente Login existe
import Registro from './componentes/Registro'; // Asegúrate de que el componente Registro existe
import ErrorBoundary from './componentes/Error/ErrorBoundary';

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false); // Estado para mostrar el formulario de inicio de sesión
  const [showRegistro, setShowRegistro] = useState(false); // Estado para mostrar el formulario de registro

  const handleLogout = () => {
    setUser(null);
  };

  const toggleLoginForm = () => {
    setShowLogin((prev) => !prev); // Alterna el estado del formulario de inicio de sesión
    setShowRegistro(false); // Asegúrate de ocultar el formulario de registro
  };

  const toggleRegistroForm = () => {
    setShowRegistro((prev) => !prev); // Alterna el estado del formulario de registro
    setShowLogin(false); // Asegúrate de ocultar el formulario de inicio de sesión
  };

  return (
    <ErrorBoundary>
      <div className="App">
        <Navigation toggleLogin={toggleLoginForm} toggleRegistro={toggleRegistroForm} /> {/* Pasar funciones a Navigation */}
        
        {showLogin && <Login setUser={setUser} />} {/* Mostrar el formulario de inicio de sesión si showLogin es true */}
        {showRegistro && <Registro setUser={setUser} />} {/* Mostrar el formulario de registro si showRegistro es true */}
        
        <Inicio user={user} /> {/* Pantalla de inicio */}
      </div>
    </ErrorBoundary>
  );
}

export default App;
