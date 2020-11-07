import React, { useState, useEffect } from "react";
import Modal from "./modal";
import SearchBar from "./SearchBar";
import axios from "axios";
import GifList from "./GifList";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";
import Gif from "./gif.png";
import classes from "./App.module.css";
const App = () => {
  const [paginate, setPaginate] = useState(1);
  const [limit, setLimit] = useState(6);
  const [gifs, setGifs] = useState([]);
  const [term, setTerm] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    loadGifs();
  }, []);

  const loadGifs = (termFromSearchBar) => {
    setTerm(termFromSearchBar);
    console.log(term);
    fetch(
      `https://api.giphy.com/v1/gifs/search?q=${term}&limit=${limit}&offset=${paginate}&api_key=ybaPDWvW02i61gblWgdFkxkrsfhsZzhi`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          alert("Error");
        } else {
          console.log(json);
          setGifs([...gifs, ...json.data]);
        }
      });
    setPaginate(paginate + 1);
    console.log(paginate);
  };

  const loadMore = () => {
    setTimeout(() => {
      loadGifs(term);
    }, 1500);
  };

  const ModalShow = () => {
    setShow(!show);
  };

  const modalremovalHandler = () => {
    setShow(false);
  };

  const spinner = <Spinner></Spinner>;
  return (
    <div className={classes.OuterDiv}>
      <Modal show={show} modalClosed={modalremovalHandler}>
        <SearchBar clickSearchHandeler={loadGifs}></SearchBar>
        <InfiniteScroll
          dataLength={gifs.length}
          next={loadMore}
          height={"200px"}
          hasMore={true}
          loader={spinner}
          scrollThreshold={0.8}
          className={classes.Scroll}
        >
          <GifList gifs={[...gifs]} />
        </InfiniteScroll>
      </Modal>
      <div style={{ marginLeft: "34px", marginTop: "3px" }}>
        <img
          onClick={ModalShow}
          src={Gif}
          alt="search"
          className={classes.Img}
        ></img>
      </div>
    </div>
  );
};

export default App;
