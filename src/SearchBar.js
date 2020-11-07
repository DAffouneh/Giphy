import React, { useState } from "react";
import classes from "./SearchBar.module.css";
const SearchBar = (props) => {
  const [term, setTerm] = useState("Tap to search...");
  const changeHandel = (event) => {
    setTerm(event.target.value);
  };
  const clickHandel = (event) => {
    event.preventDefault();
    props.clickSearchHandeler(term);
  };

  return (
    <div className={classes.Div}>
      <input
        className={classes.Input}
        type="text"
        placeholder={term}
        onChange={changeHandel}
      ></input>

      <div>
        <button className={classes.Button} onClick={clickHandel}>
          Search
        </button>
      </div>
    </div>
  );
};
export default SearchBar;
