import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import UserMenu from "../../components/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import "../../styles/AuthStyles.css";
import Swal from "sweetalert2";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [auth, setAuth] = useAuth();

  useEffect(()=>{
    const {name,email,password,phone,address} = auth.user
    setName(name)
    setEmail(email)
    // setPassword(password)
    setPhone(phone)
    setAddress(address)
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if(data?.error){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data?.error,
          timer: 3000,
          timerProgressBar: true,
        })
      }else{
        setAuth({...auth, user:data?.updatedUser})
        let ls = localStorage.getItem("auth")
        ls = JSON.parse(ls)
        ls.user = data.updatedUser
        localStorage.setItem('auth',JSON.stringify(ls))
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Profile updated successfully",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
      // if (res && res.data.success) {
      //   Swal.fire({
      //     position: "top",
      //     icon: "success",
      //     title: res.data.message,
      //     showConfirmButton: false,
      //     timer: 3000,
      //     timerProgressBar: true,
      //   });
      // } else {
      //   Swal.fire({
      //     icon: "error",
      //     title: "Oops...",
      //     text: res.data.message,
      //     timer: 3000,
      //     timerProgressBar: true,
      //   });
      // }
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
    <Layout>
      {/* <section> */}
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 try">
            <div className="wrapper">
              <div className="form-wrapper sign-in">
                <form onSubmit={handleSubmit}>
                  <h2>User Profile</h2>
                  <div className="input-group">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      id="fName"
                    />
                    <label htmlFor="">Name</label>
                  </div>
                  <div className="input-group">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                    />
                    <label htmlFor="">Password</label>
                  </div>
                  <div className="input-group">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      id="phone"
                    />
                    <label htmlFor="">Phone Number</label>
                  </div>
                  <div className="input-group">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      id="address"
                    />
                    <label htmlFor="">Address</label>
                  </div>
                  <button type="submit" className="submit">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </section> */}
    </Layout>
  );
};

export default Profile;
