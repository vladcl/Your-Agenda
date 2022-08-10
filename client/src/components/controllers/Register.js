import React, { useState, useEffect } from "react";
import Axios from 'axios';
import '../views/Register.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



function Register() {

    const navigate = useNavigate()
    const [emailReg, setEmailReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token !== null) {
            navigate('/agenda')
        };
    })



    const register = () => {
        Axios.post('http://localhost:3002/registerment', {
            email: emailReg,
            password: passwordReg,
        }).then((response) => {
            console.log(response);
            navigate('/login')
        });
    };



    return (
        <main>
            <form>

                <div className='register'>
                    <div>
                        <h1 className="registerName">Cadastro</h1>
                        <label className="name">E-mail</label>
                        <input type='text'
                            name="email"
                            placeholder='Digite o seu e-mail'
                            className="form--field"
                            required='required'
                            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                            onChange={(e) => { setEmailReg(e.target.value) }} />
                        <label className="name">Password</label>
                        <input type='password'
                            name="password"
                            placeholder='Digite a sua senha'
                            required='required'
                            pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@+#$])[a-zA-Z0-9@+#$]{8,50}$"
                            title='A senha deve possuir no mínimo 8 carecteres.'
                            minLength={8}
                            className='form--field'
                            onChange={(e) => { setPasswordReg(e.target.value) }} />
                        <button onClick={register}
                            className='button--register'>Registrar</button>
                    </div>
                    <br></br>
                    <p className="text3">Se já possui cadastro:
                        <Link to='/login' className="login--link"> Login</Link>
                    </p>
                </div>
            </form>
        </main>

    )


}

export default Register;