/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../views/Main.css';
import Axios from 'axios';
import Card from '../../components/cards/card';
import { useNavigate } from 'react-router-dom'



function Main() {
  const navigate = useNavigate();
  const [values, setValues] = useState();
  const [listActivities, setListActivities] = useState();


  const handleChangeValues = (value) => {
    setValues(prevValue => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleClickButton = () => {
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      description: values.description,
      date_and_hour_initial: values.date_and_hour_initial,
      date_and_hour_final: values.date_and_hour_final,
      status: values.status,
    }, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      }
    }).then(() => {
      setListActivities([
        ...listActivities,
        {
          name: values.name,
          description: values.description,
          date_and_hour_initial: values.date_and_hour_initial,
          date_and_hour_final: values.date_and_hour_final,
          status: values.status,
        }
      ]);
    }).catch((err) => {
      if (err.response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
    });

    const select = document.getElementById('status');
    if (select) {
      select.value = ''
    }
  };

  useEffect(() => {
    Axios.get('http://localhost:3001/getCards', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      }
    }).then((response) => {
      setListActivities(response.data);
    }).catch((err) => {
      if (err.response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
    });
  }, []);

  return (
    <div className='app--container'>
      <div className='register--container'>
        <h1>Sua agenda</h1>

        <p className='info'>Atividade:</p>
        <input type='text'
          name='name'
          placeholder='Nome da atividade'
          className='register--input'
          onChange={handleChangeValues}
        />

        <p className='info'>Descrição da Atividade:</p>
        <input type='text'
          name='description'
          placeholder='Descreva a atividade'
          className='register--input'
          onChange={handleChangeValues}
        />

        <p className='info'>Data e Hora Início:</p>
        <input type='datetime-local'
          name='date_and_hour_initial'
          placeholder='Qual a data e a hora de ínicio?'
          className='register--input'
          onChange={handleChangeValues}
        />

        <p className='info'>Data e Hora Término:</p>
        <input type='datetime-local'
          name='date_and_hour_final'
          placeholder='Qual a data e a hora do término?'
          className='register--input'
          onChange={handleChangeValues}
        />

        <label htmlFor='status' className='info'>Status:</label>
        <br></br>
        <select name='status' id='status' onChange={handleChangeValues}>
          <option disabled selected value>Selecione um Status</option>
          <option key='concluida' value='Concluída'>Concluída</option>
          <option key='pendente' value='Pendente'>Pendente</option>
          <option key='cancelada' value='Cancelada'>Cancelada</option>
        </select><br></br><br></br>

        <button onClick={() => handleClickButton()}
          className='register--button'>
          Cadastrar
        </button>
        <br />
        <p >
          <Link to='/calendar' className="calendar--link"> Acessar o Calendário</Link>
        </p>
        <p className="text4">
          <Link to='/logout' className="registro--link"> Sair</Link>
        </p>

      </div>
      <div className='allCards'>
        {typeof listActivities !== 'undefined' && listActivities.map((value) => {
          return <Card key={value.id}
            listCard={listActivities}
            setListCard={setListActivities}
            id={value.idactivities}
            name={value.name}
            description={value.description}
            date_and_hour_initial={value.date_and_hour_initial}
            date_and_hour_final={value.date_and_hour_final}
            status={value.status}
          ></Card>
        })};
      </div>
    </div>
  );
};


export default Main;
