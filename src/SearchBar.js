import React, { useState } from "react";
import classes from "./SearchBar.module.css";

const WAIT_INTERVAL = 1000

const SearchBar = (props) => {
  const [term, setTerm] = useState("Tap to search...");

let timer = null;

  const changeHandel = (event) => {
    setTerm(event.target.value);

    clearTimeout(timer)


    timer = setTimeout(triggerChange, WAIT_INTERVAL)

  };
  const triggerChange = () => {
    props.clickSearchHandeler(term);

  }

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

      {/* <div>
        <button className={classes.Button} onClick={clickHandel}>
          Search
        </button>
      </div> */}
    </div>
  );
};
export default SearchBar;
