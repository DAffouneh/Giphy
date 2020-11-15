import React, { useState, useEffect, useRef } from "react";
import classes from "./SearchBar.module.css";
const WAIT_INTERVAL = 500;
const SearchBar = (props) => {
  let timer = null;
  const [term, setTerm] = useState("Tap to search...");

  const onSearchChange = (event) => {
    event.stopPropagation();
    clearTimeout(timer);
    setTerm(event.target.value);
    timer = setTimeout(triggerChange, WAIT_INTERVAL);
  };

  const triggerChange = () => {
    props.clickSearchHandeler(term);
  };

  return (
    <div className={classes.Div}>
      <input
        className={classes.Input}
        type="text"
        placeholder={term}
        onChange={onSearchChange}
      ></input>
    </div>
  );
};
export default SearchBar;
