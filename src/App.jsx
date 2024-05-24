import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  const focusGuardRef = useRef();

  useEffect(() => {
    if (focusGuardRef.current) {
      focusGuardRef.current.focus();
    }
  }, []);

  return (
    <div>
      <Outlet />
      <div tabIndex={0} ref={focusGuardRef} onFocus={() => {
        // Quando o elemento de guarda de foco é focado, mova o foco de volta para o início da sua aplicação.
        // Substitua 'inicioDaAplicacao' pelo id do primeiro elemento focável da sua aplicação.
        document.getElementById('Navbar').focus();
      }}></div>
    </div>
  );
}

export default App;