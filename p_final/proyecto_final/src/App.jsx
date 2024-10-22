import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './componentes/Navegacion/Navigation';
import Inicio from './componentes/Inicio';
import ErrorBoundary from './componentes/Error/ErrorBoundary';

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  // Al cargar la aplicación, verificar si hay un usuario guardado en localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleLoginForm = () => setShowLogin(!showLogin);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Eliminar el usuario de localStorage al cerrar sesión
    setUser(null);
  };

  return (
    <ErrorBoundary>
      <div className="App">
        <Navigation user={user} handleLogout={handleLogout} setUser={setUser} toggleLogin={toggleLoginForm} /> 
        {showLogin && <Login setUser={setUser} />} 

        {!user ? (
          <Inicio user={user} />
        ) : (
          <p>Bienvenido, {user.email}!</p>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
