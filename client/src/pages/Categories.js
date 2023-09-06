import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout";
import "../styles/Categories.css";
const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="containers">
        {/* <div className="row"> */}
          {categories.map((c) => (
            <div className="containerr" key={c._id}>
              <Link to={`/category/${c.slug}`}  className="Link">
                {c.name}
              </Link>
            </div>
          ))}
        {/* </div> */}
      </div>
    </Layout>
  );
};

export default Categories;
