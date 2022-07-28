import React, { useState } from 'react';
import Axios from 'axios';
import '../views/Login.css';
import { useNavigate} from 'react-router-dom';

function Login() {

    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const login = () => {
        Axios.post('http://localhost:3001/login', {
            email: email,
            password: password,
        }).then((response) => {
            console.log(response);
            navigate('/agenda');
        })        
    };

    return (
        <main>
        <div className='container'>
            <h1>Fazer Login</h1>
            <label className='name'>E-mail</label>
            <input
                type='text'
                placeholder='Digite o seu e-mail'
                className="form--field"
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            />
            <label className="name">Senha</label>
            <input
                type='password'
                placeholder='Digite a sua senha'
                className="form--field2"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <div className='buttons'>
                <button onClick={login} className='button'>Entrar</button>
            </div>

        </div>
        </main>
    );
}

export default Login;