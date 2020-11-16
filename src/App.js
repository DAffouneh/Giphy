import React, { useState, useEffect } from "react";
import Modal from "./modal";
import GifList from "./GifList";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";
import Gif from "./gif.png";
import classes from "./App.module.css";
var GphApiClient = require("giphy-js-sdk-core");

const App = () => {
  const [paginate, setPaginate] = useState(0);
  const [gifs, setGifs] = useState([]);
  const [term, setTerm] = useState("");
  const [show, setShow] = useState(false);
  const [giphy] = useState(GphApiClient("ybaPDWvW02i61gblWgdFkxkrsfhsZzhi"));
  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = () => {
    giphy.trending();
    giphy.trending("gifs", { offset: paginate }).then((response) => {
      setGifs([]);
      setGifs(response.data);
    });
  };

  const loadMore = () => {
    setPaginate(paginate + 6);
    loadFeed();
  };

  const search = (event) => {
    event.preventDefault();
    setTerm(event.target.value);
    if (term === "") return;

    giphy.search("gifs", { q: term }).then((response) => {
      setGifs(response.data);
    });
  };

  const ModalShow = () => {
    setShow(!show);
  };

  const modalremovalHandler = () => {
    setShow(false);
  };

  const onSearchChange = (event) => {
    event.stopPropagation();
    updateQuery(event);
  };

  const updateQuery = (event) => {
    setTerm(event.target.value);
    search(event);
  };
  const spinner = <Spinner></Spinner>;
  return (
    <div className={classes.OuterDiv}>
      <Modal show={show} modalClosed={modalremovalHandler}>
        <input
          className={classes.Input}
          type="text"
          placeholder={term}
          onChange={onSearchChange}
        ></input>

        <InfiniteScroll
          dataLength={gifs.length}
          next={loadMore}
          height={"200px"}
          hasMore={true}
          loader={spinner}
          scrollThreshold={0.6}
          className={classes.Scroll}
        >
          <GifList gifs={[...gifs]} />
        </InfiniteScroll>
      </Modal>
      <div className={classes.GifDiv}>
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
