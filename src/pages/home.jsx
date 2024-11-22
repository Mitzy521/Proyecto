import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [registro, setRegistro] = useState(false);
  const navigate = useNavigate();

  const manejarCambioNombre = (evento) => {
    setNombre(evento.target.value);
  };

  const manejarCambioContraseña = (evento) => {
    setContraseña(evento.target.value);
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) ?? [];
    usuarios.push({ nombre, contraseña });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Después de registrarse, redirigimos al inicio de sesión
    setRegistro(false); // Cambiar el estado a "Iniciar sesión"
    navigate('/'); // Redirigir a la página de inicio de sesión
  };

  const toggleRegistro = () => {
    setRegistro(!registro);
  };

  const irAAbout = () => {
    navigate('/about'); // Redirigir a la página de About
  };

  return (
    <div className="container">
      <h2>{registro ? 'Registro' : 'Iniciar Sesión'}</h2>
      <form onSubmit={manejarEnvio}>
        <label className='info'>
          Nombre
          <input type="text" value={nombre} onChange={manejarCambioNombre} />
        </label>
        <label className='info'>
          Contraseña
          <input type="password" value={contraseña} onChange={manejarCambioContraseña} />
        </label>
        <button type="submit">{registro ? 'Registrarse' : 'Iniciar Sesión'}</button>
      </form>

      {/* Mostrar solo el botón de registro cuando no estamos en el formulario de registro */}
      {!registro && (
        <>
          <button onClick={toggleRegistro}>Regístrate</button>
        </>
      )}

      {/* Si estamos en el modo de registro, eliminar el botón de "Iniciar sesión" */}
      {registro && (
        <button onClick={irAAbout}>Iniciar Sesión</button> // Redirigir a /about después de registro
      )}
    </div>
  );
}

export default Home;
