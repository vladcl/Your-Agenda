/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../views/Login.css'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";



function Login() {

    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [loginStatus, setLoginStatus] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token !== null || loginStatus === true) {
            navigate('/agenda')
        };
    }, [])


    Axios.defaults.withCredentials = true;



    const Login = () => {

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
        }).finally(() => {
            Axios.get('http://localhost:3001/isUserAuth', {
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                }
            }).then((response) => {
                navigate('/agenda')
            })
        })

    }



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
                    required='required'
                    pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@+#$])[a-zA-Z0-9@+#$]{8,50}$"
                    title='A senha deve possuir no mínimo 8 carecteres'
                    minLength={8}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <div className='buttons'>
                    <button onClick={Login}
                        type='submit'
                        className='button'>Entrar</button>
                </div>
                <p className="text4">Se ainda não possui cadastro:
                    <Link to='/registro' className="registro--link"> Registre-se</Link>
                </p>
            </div>
        </main>
    );
}

export default Login;