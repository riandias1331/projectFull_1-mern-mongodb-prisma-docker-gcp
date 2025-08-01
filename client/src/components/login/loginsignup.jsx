import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';

const LoginSignup = () => {
    const [action, setAction] = useState("Login");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const endpoint = action === "Login" 
                ? 'http://localhost:3333/api/login' 
                : 'http://localhost:3333/api/register';
            
            const payload = action === "Login"
                ? { email: formData.email, password: formData.password }
                : formData;

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Algo deu errado');
            }

            if (action === "Sign Up") {
                setSuccessMessage('Conta criada com sucesso!');
                setFormData({
                    name: '',
                    email: '',
                    password: ''
                });
                setTimeout(() => {
                    setAction("Login");
                    setSuccessMessage('');
                }, 3000);
            } else {
                // Login bem-sucedido - Parte modificada
                setSuccessMessage('Login realizado com sucesso! Redirecionando...');
                
                // Armazena os dados de autenticação
                localStorage.setItem('token', data.token || '');
                localStorage.setItem('username', data.user?.username || 'Usuário');
                
                // Redireciona para a página inicial após 1 segundo
                setTimeout(() => {
                    navigate('/', { 
                        replace: true, // Impede que o usuário volte para a página de login com o botão "voltar"
                        state: { fromLogin: true } // Opcional: estado que pode ser usado na página inicial
                    });
                }, 1000);
            }

        } catch (err) {
            console.error('Error:', err);
            setError(err.message || 'Erro ao processar sua requisição');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            
            {/* Mensagens de feedback */}
            {error && <div className="error-message">{error}</div>}
            {successMessage && (
                <div className={`success-message ${action === "Login" ? 'login-success' : ''}`}>
                    {successMessage}
                </div>
            )}
            
            <div className="inputs">
                {action === "Sign Up" && <div className="input">
                    <input 
                        type="text" 
                        name="name"
                        placeholder='Name' 
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>}
               
                <div className="input">
                    <input 
                        type="email" 
                        name="email"
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input">
                    <input 
                        type="password" 
                        name="password"
                        placeholder='Password' 
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength="6"
                    />
                </div>
            </div>
            
            {action === "Sign Up" ? <div></div> : 
                <div className="forgot-password">Lost Password <span>Click Here!</span></div>}
 
            <div className="submit-container">
                <div 
                    className={action === "Login" ? "submit gray" : "submit"} 
                    onClick={() => {
                        setAction("Sign Up");
                        setError('');
                        setSuccessMessage('');
                    }}
                > 
                    Sign Up
                </div>
                <div 
                    className={action === "Sign Up" ? "submit gray" : "submit"}
                    onClick={() => {
                        setAction("Login");
                        setError('');
                        setSuccessMessage('');
                    }}
                >
                    Login
                </div>
            </div>
            
            <div 
                className="submit" 
                style={{ margin: '20px auto' }}
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? 'Processing...' : action}
            </div>
        </div>
    );
};

export default LoginSignup;