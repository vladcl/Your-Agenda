import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../views/Login.css'
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [loginStatus, setLoginStatus] = useState(false)

    Axios.defaults.withCredentials = true;


    const login = () => {
        Axios.post('http://localhost:3001/login', {
            email: email,
            password: password,
        }).then((response) => {

            if (!response.data.auth) {
                setLoginStatus(false);
            } else {
                localStorage.setItem('token', response.data.token)
                setLoginStatus(true);
            }


        });
    };

    const userAuth = () => {
        Axios.get('http://localhost:3001/isUserAuth', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        }).then((response) => {
            if (response.data.token !== null) {
                navigate('/agenda')
            }
        })
    }



    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {

            if (response.data.loggedIn === true) {
                setLoginStatus(true)

            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])





    return (

        <main>
            <div className='container'>
                <h1 className='login'>Fazer Login</h1>
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

                {loginStatus && (
                    <button onClick={userAuth} className='button2'>Checar Autenticação</button>
                )}


            </div>
        </main>
    );
}

export default Login;