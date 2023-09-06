import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import Swal from "sweetalert2";
import "../styles/card.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length ) getAllProducts();
  }, [checked.length]);

  useEffect(() => {
    if (checked.length) filterProduct();
  }, [checked]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Products - Best offers "}>
      <div className="container-fluid row mt-3">
        <div className="col-md-2">
          <h4>Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <div className="d-flex flex-column">
            <button
              className="btn btn-danger mt-4"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col out">
          <div className="  container upper">
            {products?.map((p) => (
              <div className="cards">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <h5 className="cards-title">{p.name}</h5>
                <p className="cards-text"> $ {p.price}.00</p>
                <div className="cards-btext">
                  <p className="text">{p.description}</p>
                  <div className="btns">
                    <button
                      className="button-79 ms-1 "
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="buttons-79 ms-4"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        Swal.fire({
                          position: "center",
                          icon: "success",
                          title: `Item added to your cart`,
                          showConfirmButton: false,
                          timer: 3000,
                          timerProgressBar: true,
                        });
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
