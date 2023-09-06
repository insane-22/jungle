import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container mt-5">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            // height="300"
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h3>Name : {product.name}</h3>
          <h6>Description : {product.description}</h6>
          <h6>Price : ${product.price}</h6>
          <h6>Category : {product?.category?.name}</h6>
          {/* <button className="btn btn-secondary ms-1">ADD TO CART</button> */}
          <button
            className="btn btn-secondary ms-1"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
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
      <hr />
      <div className="row">
        <h6>Similar Products </h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        {relatedProducts?.map((p) => (
          <div className="card m-2" style={{ width: "18rem" }}>
            <img
              src={`/api/v1/product/product-photo/${p._id}`}
              className="card-img-top"
              alt={p.name}
            />
            <div className="card-body">
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text">{p.description.substring(0, 30)}...</p>
              <p className="card-text"> $ {p.price}</p>
              <button
                class="btn btn-info ms-1"
                onClick={() => navigate(`/product/${p.slug}`)}
              >
                More Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ProductDetails;
