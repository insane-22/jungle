import React, { useState } from "react";
import Layout from "../../components/Layout";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { NavLink } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        question,
      });
      if (res && res.data.success) {
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
    <Layout title={"Register"}>
      <section>
        <div className="wrapper">
          <div className="form-wrapper sign-in">
            <form onSubmit={handleSubmit}>
              <h2>Register Page</h2>
              <div className="input-group">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="fName"
                  required
                />
                <label htmlFor="">Name</label>
              </div>
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
              <div className="input-group">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="phone"
                  required
                />
                <label htmlFor="">Phone Number</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  id="address"
                  required
                />
                <label htmlFor="">Address</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  id="question"
                  required
                />
                <label htmlFor="">Your Favourite Color</label>
              </div>
              <button type="submit" className="submit">
                Submit
              </button>
              <div className="signUp-link">
                <p>
                  Already have an account?{" "}
                  <NavLink to="/login" className="dignUpBtn-link">
                    Sign In
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

export default Register;
