import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserStorage } from './UserContext';

import Home from './components/Home';
import Login from './components/login/Login';
import ProductsList from './components/poductsList/ProductsList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserStorage>
          <main className="AppBody">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login/*" element={<Login />} />
              <Route path="products" element={<ProductsList />} />
            </Routes>
          </main>
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
