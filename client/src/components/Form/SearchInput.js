import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import "../../styles/navbar.css";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // <div className="search_box" role="search" onSubmit={handleSubmit}>
    //     <input
    //       // className="form-control me-2"
    //       type="search"
    //       placeholder="Search"
    //       aria-label="Search"
    //       values={values.keyword}
    //       onChange={(e) => setValues({ ...values, keyword: e.target.value })}
    //     />
    //     <button  type="submit">
    //       Search
    //     </button>
    // </div>
    <form role="search" className="search-bar" onSubmit={handleSubmit}>
      <input
        type="search"
        name="search"
        pattern=".*\S.*"
        required
        values={values.keyword}
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
      />
      <button className="search-btn" type="submit">
        <span>Search</span>
      </button>
    </form>
  );
};

export default SearchInput;
