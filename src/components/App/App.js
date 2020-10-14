import React, { useState, useEffect } from 'react';
import * as d3 from "d3";
import nyc_deaths from "../../nyc_deaths.csv";
import { formatData, parseTime } from "../../service";
import { Container, Main } from "./AppStyles";

import LineChart from "../LineChart/LineChart";
import BarChart from "../BarChart/BarChart";

const App = () => {
  const [data, setData] = useState([]);
  const [cause, setCause] = useState(null);
  useEffect(() => {
    const retrieveDataset = async () => {
      const dataset = await d3.csv(nyc_deaths, formatData);
      setData(dataset);
      console.log(dataset);
    };
    retrieveDataset();
  }, []);

  return (
    <Container id="container">
      <header>
        <h1>New York City Leading Causes of Death (2007 - 2014)</h1>
      </header>
      <Main>
        <LineChart
          data={ data }
          xAccessor={ d => parseTime(d.year) }
          yAccessor={ d => d.deaths }
        />
        <BarChart
          data={ data }
          xAccessor={ d => d.leadingCause }
          yAccessor={ d => d.deaths }
        />
      </Main>
    </Container>
  )
};

export default App;
