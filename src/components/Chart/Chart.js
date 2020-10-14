import React, { createContext, useContext } from "react";

const ChartContext = createContext();
export const useChartDimensions = () => useContext(ChartContext);

const Chart = ({ dimensions, children }) => (
  <ChartContext.Provider value={ dimensions }>
    <svg
      width={ dimensions.width }
      height={ dimensions.height }
    >
      <g
        transform={`translate(${
          dimensions.marginLeft
        }, ${
          dimensions.marginRight
        })`}
      >
        { children }
      </g>
    </svg>
  </ChartContext.Provider>
);

export default Chart;