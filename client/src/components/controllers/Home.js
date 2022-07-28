import React from "react";
import { Link } from "react-router-dom";
import '../views/Home.css';

function Home () {
    return (
        <main>
        <form className='forms'>
            <p className='Title'> Olá, bem vindo à minha aplicação!</p>
            <p className='centerText'> Por favor escolha a sua opção abaixo:</p>
            <p className="text">Se você já possui cadastro: 
                <Link to='/login' className="login--link"> Login</Link>
            </p>
            
            <p className="text2">Se ainda não possui cadastro: 
                <Link to='/registro' className="registro--link"> Registre-se</Link>
            </p>

        </form>
        </main>
    );
}

export default Home;