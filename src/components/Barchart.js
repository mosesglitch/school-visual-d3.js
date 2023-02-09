import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import { csv, arc, pie, scaleBand, scaleLinear, max } from "d3";
// import Dropdownselect from "./Dropdown";
const csvUrl =
  "https://gist.githubusercontent.com/mosesglitch/18fb6b9f52bcd8775ce43f010a82b201/raw/f6bf92f8d7105574f55f69cfac648f17a3b4dcec/SchoolData.csv";

export default function Barchart() {
  const [data, setData] = useState(null);
  const [subjectsList, setSubjectList] = useState(null);
  useEffect(() => {
    const convInt = (d) => {
      d.Class = +d.Class;
      d.English = +d.English;
      d.Kiswahili = +d.Kiswahili;
      d.Math = +d.Math;
      d.GHCRE = +d.GHCRE;
      d.Science = +d.Science;
      return d;
    };

    d3.csv(csvUrl, convInt).then((data) => {
      setData(data);
      console.log(data);
      const selectedStudent = data.filter((d) => d.Name === "Michele Gray");
      const subjects = ["English", "Kiswahili", "Math", "GHCRE", "Science"];
      const first = selectedStudent[0];
      const filteredDict = Object.keys(first);
      const result = filteredDict.reduce((next, key) => {
        if (subjects.includes(key)) {
          return { ...next, [key]: first[key] };
        } else {
          return next;
        }
      }, {});
      setSubjectList(result);
      console.log("It", subjectsList, data);
    });
  }, []);
  const width = 960;
  const height = 500;
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  if (subjectsList) {
    const xScale = scaleBand()
      .domain(Object.keys(subjectsList))
      .range([0, innerW]);
    const yScale = scaleLinear()
      .domain(d3.max(Object.values(subjectsList)))
      .range([innerH, 0]);
    console.log("how", Object.keys(subjectsList));
  }
  // console.log()
  if (!subjectsList) {
    return <pre>"....loading</pre>;
  } else {
  }
  return (
    <div>
      <svg height={height} width={width}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {xScale.ticks((tickValue) => {
            <line
              x1={xScale(tickValue)}
              y1={0}
              x2={xScale(tickValue)}
              y2={innerH}
              stroke=""
            />;
          })}
          {data.map((d) => (
            <rect
              x={(d) => xScale(d[0])}
              y={(d) => yScale(d[1])}
              width={xScale.bandwidth()}
              height={(d) => innerH - yScale(d[1])}
            />
          ))}
        </g>
      </svg>
      <p>Holla</p>
    </div>
  );
}
