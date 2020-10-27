import React,{useState} from 'react';
import GifList from './GifList';
import SearchBar from './SearchBar';
import request from 'superagent';
import Modal from './modal';
import './App.css';
import InfiniteScroll from 'react-infinite-scroller';


const App =() =>
{
  const [gifs,setGifs]= useState([]);
        
    
  const loadItems=(page) =>{
    handleTermChange();
  }

    const handleTermChange=(term)=> {
        const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=ybaPDWvW02i61gblWgdFkxkrsfhsZzhi`;

        request.get(url, (err, res) => {
          setGifs( res.body.data)
        });
    }
  

  
        return (
          <Modal>
                <SearchBar onTermChange={handleTermChange} />

            <InfiniteScroll  
              pageStart={1}
                loadMore={handleTermChange}>
                <GifList gifs={gifs} />
                </InfiniteScroll>
                </Modal>

        );
    }


export default App;