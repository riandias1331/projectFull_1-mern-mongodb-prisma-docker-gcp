import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    // const navigate = useNavigate();

    // // VERIFICA SE O USUÁRIO ESTÁ LOGADO
    // useEffect(() => {
    //     if (!localStorage.getItem('token')) {
    //         navigate('/login', { replace: true });
    //     }
    // }, [navigate]);

    const handleLogout = () => {
        // localStorage.removeItem('token');
        // localStorage.removeItem('username');
        navigate('/login');
    };
    return (
    <div className="home-container">
      <header className="home-header">
        <h1>Minha Plataforma</h1>
        <a href="/login" className="logout-btn">Sair</a>
      </header>

      <main className="home-content">
        <h2>Página Inicial</h2>
        <p>Você está logado com sucesso no sistema.</p>

        <div className="features">
          <div className="feature-card">
            <h3>Meu Perfil</h3>
            <p>Gerencie suas informações pessoais.</p>
          </div>

          <div className="feature-card">
            <h3>Configurações</h3>
            <p>Personalize sua experiência.</p>
          </div>
        </div>
      </main>

      <footer>
        © 2025 Minha Plataforma. Todos os direitos reservados.
      </footer>
    </div>
  );

};

export default Home;




