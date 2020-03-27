import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';
import api from 'services/api';

import heroesImg from 'assets/heroes.png';
import logoImg from 'assets/logo.svg';

export default function Logon() {
  const [id, setId] = useState();
  async function handleSubmit(e) {
    e.preventDefault();
    await api.post('/sessions', {
      id,
    });
  }
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero." />
        <form onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>

          <input
            type="text"
            placeholder="Seu ID"
            onChange={(e) => setId(e.target.value)}
          />
          <button type="submit" className="btn">
            Entrar
          </button>
          <Link to="/register" className="custom-link">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
