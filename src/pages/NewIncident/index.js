import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Swal from 'sweetalert2';

import './styles.css';
import logoImg from 'assets/logo.svg';
import api from 'services/api';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ongObj = JSON.parse(localStorage.getItem('@BeTheHero'));

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post(
        '/incidents',
        { title, description, value },
        { headers: { ong_id: ongObj.id } }
      );
      history.push('/profile');
    } catch (e) {
      Swal.fire({
        title: 'Error!',
        text: 'Ocorreu um erro ao cadastrar o novo caso',
        icon: 'error',
      });
    }
  }
  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>
          <Link to="/profile" className="custom-link">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título do caso"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Valor em reais"
            onChange={(e) => setValue(e.target.value)}
          />

          <button className="btn" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
