import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Swal from 'sweetalert2';

import './styles.css';
import logoImg from 'assets/logo.svg';
import api from 'services/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const response = await api.post('/ongs', {
        name,
        email,
        whatsapp,
        city,
        uf,
      });

      Swal.fire({
        title: 'Successo!',
        text: `Seu ID de acesso: ${response.data.id}`,
        icon: 'success',
      }).then((ok) => {
        if (ok) {
          history.push('/');
        }
      });
    } catch (err) {
      let message = 'Ocorreu um erro ao salvar a ONG';
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
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </p>
          <Link to="/" className="custom-link">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para o Logon
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome da ONG"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Seu e-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Whatsapp"
            onChange={(e) => setWhatsapp(e.target.value)}
          />
          <div className="input-group">
            <input
              type="text"
              placeholder="Cidade"
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="UF"
              onChange={(e) => setUf(e.target.value)}
              style={{ width: 80 }}
            />
          </div>
          <button className="btn" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
