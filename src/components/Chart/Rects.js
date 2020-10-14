import React from "react";

const Rects = ({ data, xAccessor, yAccessor, width, heightAccessor }) => {
  return (
    <g>
      {data.map(d => (
        <rect
          x={xAccessor(d)}
          y={yAccessor(d)}
          width={width}
          height={heightAccessor(d)}
        />
      ))}
    </g>
  )
};

export default Rects;