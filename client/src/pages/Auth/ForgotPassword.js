import React, { useState } from "react";
import Layout from "../../components/Layout";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate  } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { NavLink } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        question,
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
        
        navigate("/login");
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
    <Layout title={"Forgot-Password"}>
      <section>
        <div className="wrapper">
          <div className="form-wrapper sign-in">
            <form onSubmit={handleSubmit}>
              <h2>Reset Password</h2>
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
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  id="question"
                  required
                />
                <label htmlFor="">Your Favourite Color?</label>
              </div>
              <div className="input-group">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  id="newpassword"
                  required
                />
                <label htmlFor="">New Password</label>
              </div>
              <button className="submit" type="submit">
                Reset Password
              </button>
              <div className="signUp-link">
                <p>
                  Don't have an account?
                  <NavLink to="/register" className="dignUpBtn-link">
                    Sign Up
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

export default ForgotPassword;
