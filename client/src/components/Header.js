import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import Swal from "sweetalert2";
import SearchInput from "./Form/SearchInput";
import useCategory from "../hooks/useCategory";
import { useCart } from "../context/cart";
import { Badge } from "antd";
import "../styles/navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Logout Succesful!",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  };
  return (
    <>
       <input type="checkbox" id="check" />
      <nav position="fixed">
        <div className="icon">
          <Link to="/" className="navbar-brand">
            🛍️ Jungle
          </Link>
        </div>
        <SearchInput />
        <ol>
          <li>
            <NavLink to="/" className="navs">
              Home
            </NavLink>
          </li>

          <li>
            <Link
              className="navs dropdown-toggle"
              to={"/categories"}
              data-bs-toggle="dropdown"
            >
              Categories
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to={"/categories"}>
                  All Categories
                </Link>
              </li>
              {categories?.map((c) => (
                <li>
                  <Link className="dropdown-item" to={`/category/${c.slug}`}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {!auth.user ? (
            <>
              <li>
                <NavLink to="/register" className="navs">
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className="navs">
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item dropdown">
                <NavLink
                  className="navs dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {auth?.user?.name}
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="dropdown-item"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      className="dropdown-item"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            </>
          )}
          <li>
            <Badge count={cart?.length} showZero>
              <NavLink to="/cart" className="navs ">
                Cart
              </NavLink>
            </Badge>
          </li>
        </ol>

        <label htmlFor="check" className="bar">
          <span id="bars">
            <FaBars />
          </span>
          <span id="times">
            <FaTimes />
          </span>
        </label>
      </nav>
    </>
  );
};

export default Header;
