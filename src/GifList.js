import React from 'react';
import GifItem from './GifItem';
const GifList = ({gifs}) => {
  const gifItems =gifs.map((gif,i) => 
    <div className="column" key={i} >
        <div className="ui one column grid">
      <GifItem key={gif.id} gif={gif} />
      </div>
      </div> 

  )

  return (
<div className="ui column centered grid">
      <div className="sixteen wide column">
        <div className="ui six column grid" style={{display:"flex",flexDirection:"row", flexWrap:"wrap"}}>
          {gifItems}
        </div>
      </div>
    </div>  );
};

export default GifList;