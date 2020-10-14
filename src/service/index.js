import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

export const parseTime = d3.timeParse("%Y");

export const formatData = data => ({
  age: Number(data["Age Adjusted Death Rate"]),
  deathRate: Number(data["Death Rate"]),
  deaths: Number(data["Deaths"]) || 0,
  leadingCause: data["Leading Cause"],
  ethnicity: data["Race Ethnicity"],
  sex: data["Sex"],
  year: data["Year"],
});

const combineChartDimensions = dimensions => {
  let newDimensions = {
    marginTop: 30,
    marginRight: 30,
    marginBottom: 30,
    marginLeft: 50,
    ...dimensions
  };
  newDimensions.boundedWidth = newDimensions.width - newDimensions.marginLeft - newDimensions.marginRight;
  newDimensions.boundedHeight = newDimensions.height - newDimensions.marginTop - newDimensions.marginBottom;
  
  return newDimensions;
};

export const useChartDimensions = passedDimensions => {
  const ref = useRef();
  const dimensions = combineChartDimensions(passedDimensions);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (dimensions.width && dimensions.height) return [ref, dimensions];
    const element = ref.current;

    const resizeObserver = new ResizeObserver(entries => {
      if (!Array.isArray(entries) || !entries.length) return;
      const entry = entries[0];
      if (width !== entry.contentRect.width) setWidth(entry.contentRect.width);
      if (height !== entry.contentRect.height) setHeight(entry.contentRect.height);
    });

    resizeObserver.observe(element);
    return () => resizeObserver.unobserve(element);
  }, [width, height, dimensions, passedDimensions]);

  const newDimensions = combineChartDimensions({
    ...dimensions,
    width: width || 0,
    height: height || 0,
  });
  return [ref, newDimensions];
};

export const getDeathsPerValueData = (data, value) => {
  const deathsPerValue = {};
  data.forEach(d => {
    deathsPerValue[d[value]] = deathsPerValue[d[value]] + d.deaths || 0
  });
  const dataset = Object.entries(deathsPerValue).map(([k, v]) => ({
    [value]: k,
    deaths: v
  }));
  return dataset;
};