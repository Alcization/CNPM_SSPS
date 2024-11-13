import React from 'react';
import './Login.css';
import LoginForm from './LoginForm';
import Logo from './Logo';
import person_paper from '../../../assets/person_with_paper.png'
const Login = () => {
  return (
    <main className="loginPage">
      <div className="container">
        <div className="content">
          <section className="formSection">
            <div className="formWrapper">
              <Logo />
              <h1 className="title">Đăng nhập</h1>
              <LoginForm />
            </div>
          </section>
          <section className="imageSection">
            <img src={person_paper} alt="Login illustration" className="loginImage" />
          </section>
        </div>
      </div>
    </main>
  );
};

export default Login;