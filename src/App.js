import React, { useState, useEffect } from "react";
import Modal from "./modal";
import GifList from "./GifList";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";
import Gif from "./gif.png";
import classes from "./App.module.css";

const WAIT_INTERVAL = 300;
const ENTER_KEY = 13;

const App = () => {
  const [paginate, setPaginate] = useState(0);
  const [limit] = useState(6);
  const [gifs, setGifs] = useState([]);
  const [term, setTerm] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    loadGifs();
  }, [term]);

  const loadGifs = (termFromSearchBar) => {
    setGifs([]);
    setTerm(termFromSearchBar);
    fetch(
      `https://api.giphy.com/v1/gifs/search?q=${term}&offset=${paginate}&api_key=ybaPDWvW02i61gblWgdFkxkrsfhsZzhi`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          alert("Error");
        } else {
          setGifs([...json.data]);
        }
      });
  };

  const loadMore = () => {
    setPaginate(paginate + 6);

    fetch(
      `https://api.giphy.com/v1/gifs/search?q=${term}&limit=${limit}&offset=${paginate}&api_key=ybaPDWvW02i61gblWgdFkxkrsfhsZzhi`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          alert("Error");
        } else {
          setGifs([...gifs, ...json.data]);
        }
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
    setTerm(event.target.value);
    loadGifs(term);
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
