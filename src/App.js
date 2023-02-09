import "./App.css";
import React, { useState, useEffect } from "react";
import * as d3 from "d3";
// import Barchart from "./components/Barchart";
import BarScool from "./components/BarSchool";
import BarDict from "./components/BarDict";
import BarSchool2 from "./components/Barschool2";

const csvUrl =
  "https://gist.githubusercontent.com/mosesglitch/18fb6b9f52bcd8775ce43f010a82b201/raw/f6bf92f8d7105574f55f69cfac648f17a3b4dcec/SchoolData.csv";
function App() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   const convInt = (d) => {
  //     d.Class = +d.Class;
  //     d.English = +d.English;
  //     d.Kiswahili = +d.Kiswahili;
  //     d.Math = +d.Math;
  //     d.GHCRE = +d.GHCRE;
  //     d.Science = +d.Science;
  //     return d;
  //   };

  //   d3.csv(csvUrl, convInt).then((data) => {
  //     setData(data);

  //     // console.log(data.map((d) => d.English));
  //   });
  // }, []);
  const data = [
    { label: "A", value: 100 },
    { label: "B", value: 200 },
    { label: "C", value: 50 },
    { label: "D", value: 80 },
  ];
  return (
    <div className="App">
      <BarSchool2 />
    </div>
  );
}

export default App;
