import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';
import logoImg from 'assets/logo.svg';
import api from 'services/api';

import './styles.css';

export default function Profile() {
  const [name, setName] = useState('');
  const [ongId, setOngId] = useState();
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function getIncidents(id) {
      try {
        const response = await api.get('/profile', {
          headers: {
            ong_id: id,
          },
        });
        setIncidents(response.data);
      } catch (e) {
        Swal.fire({
          title: 'Error!',
          text: 'Ocorreu um erro ao buscar os casos',
          icon: 'error',
        });
      }
    }
    const ongObj = JSON.parse(localStorage.getItem('@BeTheHero'));
    if (ongObj) {
      setName(ongObj.name);
      setOngId(ongObj.id);
      getIncidents(ongObj.id);
    } else {
      history.push('/');
    }
  }, []);
  function handleLogout() {
    localStorage.removeItem('@BeTheHero');
    history.push('/');
  }
  async function handleDelete(id) {
    try {
      await api.delete(`/incidents/${id}`, {
        headers: {
          ong_id: ongId,
        },
      });
      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (e) {
      Swal.fire({
        title: 'Error!',
        text: 'Erro ao deletar caso',
        icon: 'error',
      });
    }
  }
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>{`Bem vinda, ${name}`}</span>

        <Link to="/incidents/new" className="btn">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>
      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(incident.value)}
            </p>

            <button type="button" onClick={() => handleDelete(incident.id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
