import React, { useState } from "react";
import Axios from 'axios';
import '../views/Register.css'
import { useNavigate } from 'react-router-dom'



function Register() {

    const navigate = useNavigate()
    const [emailReg, setEmailReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')

    const register = () => {
        Axios.post('http://localhost:3001/registerment', {
            email: emailReg, 
            password: passwordReg,
        }).then((response) => {
            console.log(response);
            navigate('/agenda');
        });       
    };



    return (
        <main>
        <div className='register'>
            <div className='registration'>
                <h1>Cadastro</h1>
                <label className="name">E-mail</label>
                <input type='text' placeholder='Digite o seu e-mail' className="form--field" onChange={(e) => { setEmailReg(e.target.value) }} />
                <label className="name">Password</label>
                <input type='password'placeholder='Digite a sua senha' className="form--field" onChange={(e) => { setPasswordReg(e.target.value) }} />
                <button onClick={register} className='button'>Registrar</button>
            </div>
           
        </div>
        </main>
        
    )

    
}

export default Register;