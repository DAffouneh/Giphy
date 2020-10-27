import React from 'react';

const GifItem = ({gif}) => {
    const gifImageInfo=gif.images.fixed_height_small
    return (
        <img src={gifImageInfo.url} alt={gifImageInfo.slug} style={{
            height :'100px',
            width: '100px'
        }}/>
    )
  };
  export default GifItem;