import React from "react";
import * as d3 from "d3";
import { useChartDimensions } from "../../service";
import { LineChartWrapper } from "./LineChartStyles";
import { getDeathsPerYearData } from "../../service";

import Chart from "../Chart/Chart";
import Line from "../Chart/Line";
import Axis from "../Chart/Axis";

/*
  First step is, we want to format the data how we're trying to display it...
  We know we want to show a line graph showing the deaths per year
  So the x-axis is always just going to be the year
  The y-axis on the otherhand, it's going to default to ALL or we'll display a dropdown to allow the user to pick based on certain death causes
*/

const LineChart = ({ data, xAccessor, yAccessor, label }) => {
  const [ref, dimensions] = useChartDimensions();
  const dataset = getDeathsPerYearData(data);

  console.log(dataset);

  const xScale = d3.scaleTime()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth]);

  console.log(xScale.ticks());

  const yScale = d3.scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.boundedHeight, 0]);

  const xAccessorScaled = d => xScale(xAccessor(d));
  const yAccessorScaled = d => yScale(yAccessor(d));

  return (
    <LineChartWrapper ref={ ref }>
      <Chart dimensions={ dimensions }>
        <Line
          data={dataset}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
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
    </LineChartWrapper>
  )
};

export default LineChart;