import React from "react";
import * as d3 from "d3";

const Line = ({ data, xAccessor, yAccessor, interpolation, ...props }) => {
  const lineGenerator = d3.line()
    .x(xAccessor)
    .y(yAccessor)
    .curve(interpolation);

  return (
    <path {...props} 
      d={lineGenerator(data)}
      fill={"none"}
      stroke={"black"}
    />
  );
};

Line.defaultProps = {
  interpolation: d3.curveMonotoneX,
}

export default Line;