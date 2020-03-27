import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import './styles.css';
import api from 'services/api';

import heroesImg from 'assets/heroes.png';
import logoImg from 'assets/logo.svg';

export default function Logon() {
  const [id, setId] = useState();
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post('/sessions', {
        id,
      });
      localStorage.setItem('@BeTheHero', JSON.stringify(response.data));
      history.push('/profile');
    } catch (err) {
      let message = 'Não foi possível fazer login';
      if (err) {
        if (err.response) {
          if (err.response.data) {
            if (err.response.error) {
              message = err.response.error;
            }
          }
        }
      }
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
      });
    }
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
