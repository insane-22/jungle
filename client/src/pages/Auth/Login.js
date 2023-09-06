import React, { useState } from "react";
import Layout from "../../components/Layout";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res.data.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.data.message,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Somethimg went wrong!",
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <Layout title={"Register"}>
      <section>
        <div className="wrapper">
          <div className="form-wrapper sign-in">
            <form onSubmit={handleSubmit}>
              <h2>Login Page</h2>
              <div className="input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  required
                />
                <label htmlFor="">Email</label>
              </div>
              <div className="input-group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  required
                />
                <label htmlFor="">Password</label>
              </div>
              <button className="submit" type="submit">
                Login
              </button>
              <div className="signUp-link">
                <p>
                  Don't have an account?
                  <NavLink to="/register" className="dignUpBtn-link">
                     Sign Up
                  </NavLink>
                </p>
                <p>
                  Forgot Password?
                  <NavLink to="/forgot-password" className="dignUpBtn-link">
                     Recover
                  </NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
