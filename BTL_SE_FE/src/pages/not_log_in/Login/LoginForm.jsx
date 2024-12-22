import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css';
import email1 from '../../../assets/email.png'
import key from '../../../assets/key.png'
import eye from '../../../assets/eye.png'
import { loginUser } from "../../../api";
const LoginForm = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({ user: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setLogin(login => ({ ...login, [e.target.name]: e.target.value }));
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault(); // Prevent default form submission

  //   // Authentication logic
  //   if (login.user.trim() === "admin@hcmut.edu.vn" && login.password === "admin") {
  //     navigate("/admin/admin_home");
  //   } else if (login.user.trim() === "student@hcmut.edu.vn" && login.password === "student") {
  //     navigate("/student/student_home");
  //   } else {
  //     console.log("Wrong credentials");
  //     alert("Invalid email or password.");
  //   }
  // };
  const handleSubmitDB = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser({ email: login.user, password: login.password })
      // Handle successful login
      console.log("response.metaData---------->", response.metaData)
      window.location.reload();
      setTimeout(() => {
        if (response.metaData.admin) {
          navigate("/admin/admin_home");
        } else {
          navigate("/student/student_home");
        }
      }, 3000); // Thực thi navigate sau khi reload (tùy chỉnh thời gian nếu cần)
    } catch (err) {
      // Handle login error
      // setError('Login failed. Please check your username and password.');
      alert(err.message);
    }
  };



  return (
    // <form onSubmit={handleSubmit} className="loginForm">
    <form onSubmit={handleSubmitDB} className="loginForm">
      <div className="form-group">
        <div className="inputWrapper">
          <img src={email1} alt="Email icon" className="inputIcon" />
          <input
            onChange={handleChange}
            type="text"
            name="user"
            placeholder="Email"
            className="input"
            aria-label="Email"
          />
        </div>
      </div>
      <div className="form-group">
        <div className="inputWrapper">
          <img src={key} alt="Password icon" className="inputIcon" />
          <input
            onChange={handleChange}
            type={showPassword ? 'text' : "password"}
            name="password"
            placeholder="Password"
            className="input"
            aria-label="Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="passwordToggle"
            aria-label={showPassword ? 'Hide password' : 'Show password'}>
            <img src={eye} alt="" className="passwordToggleIcon" />
          </button>
        </div>
      </div>

      <button type="submit" className="loginButton">
        Login
      </button>
    </form>
  );
};

export default LoginForm;

