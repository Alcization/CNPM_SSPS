import { useEffect } from 'react';
import './Login.css';
import LoginForm from './LoginForm';
import Logo from './Logo';
import person_paper from '../../../assets/person_with_paper.png'
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
const Login = ({ user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/student/student_home'); // Đường dẫn sau đăng nhập
    }
  }, [user, navigate]);

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