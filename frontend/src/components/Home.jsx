import React from 'react';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
    >
      <h1 style={{ fontSize: '4rem' }}>Voll Store</h1>
      <NavLink to="/login">Login</NavLink>
    </div>
  );
}

export default Home;
