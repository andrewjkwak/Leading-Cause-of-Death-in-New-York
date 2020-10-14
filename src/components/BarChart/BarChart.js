import React from "react";
import * as d3 from "d3";
import { BarChartWrapper } from "./BarChartStyles";
import { getDeathsPerValueData, useChartDimensions } from "../../service";
import Chart from "../Chart/Chart";
import Axis from "../Chart/Axis";
import Rects from "../Chart/Rects";

const BarChart = ({ data, xAccessor, yAccessor, label }) => {
  const [ref, dimensions] = useChartDimensions();
  const dataset = getDeathsPerValueData(data, "leadingCause");

  const xScale = d3.scaleBand()
    .domain(dataset.map(d => xAccessor(d)))
    .range([0, dimensions.boundedWidth])
    .padding(0.05);

  const yScale = d3.scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.boundedHeight, 0]);

  const xAccessorScaled = d => xScale(xAccessor(d));
  const yAccessorScaled = d => yScale(yAccessor(d));
  const heightAccessor = d => dimensions.boundedHeight - yAccessorScaled(d);
  const width = xScale.bandwidth();

  return (
    <BarChartWrapper ref={ref}>
      <Chart dimensions={ dimensions }>
        <Rects
          data={dataset}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
          heightAccessor={heightAccessor}
          width={width}
        />
        <Axis
          dimension="x"
          scale={xScale}
        />
        <Axis 
          dimension="y"
          scale={yScale}
        />
      </Chart>
    </BarChartWrapper>
  )
};

export default BarChart;