import React from "react";
import GifItem from "./GifItem";
const GifList = ({ gifs }) => {
  const gifItems = gifs.map((gif) => {
    
    return (
      <div key={gif.id}>
        <GifItem gif={gif} />
      </div>
    );
  });
  return (
    <div style={{ display: "block" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {gifItems}
      </div>
    </div>
  );
};

export default GifList;
