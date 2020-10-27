import React from 'react';
import GifItem from './GifItem';
const GifList = ({gifs}) => {
  const gifItems =gifs.map((gif,i) => 
    <div><ul className="gifs">
      <ui key={gif.id}>
      <GifItem 
    style={{display : 'flex',
    flexdirection: 'row'}} 
    key={gif.id} gif={gif} />
      </ui>
    </ul>
      </div> 

  )

  return (
    <ul>{gifItems}</ul>
  );
};

export default GifList;