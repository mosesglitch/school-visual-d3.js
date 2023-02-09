import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { csv, arc, pie, scaleBand, scaleLinear, max } from "d3";
import "../App.css";
const csvUrl =
  "https://gist.githubusercontent.com/mosesglitch/18fb6b9f52bcd8775ce43f010a82b201/raw/f6bf92f8d7105574f55f69cfac648f17a3b4dcec/SchoolData.csv";

const BarScool = () => {
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
    });
  }, []);

  const width = 460;
  const height = 400;
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const svgRef = useRef();
  useEffect(() => {
    console.log(subjectsList);
    if (subjectsList) {
      const svg = d3.select(svgRef.current);

      const x = scaleBand()
        .domain(Object.keys(subjectsList))
        .range([0, innerW])
        .padding(0.2);

      const y = scaleLinear()
        .domain([0, d3.max(Object.values(subjectsList))])
        .range([innerH, 0]);
      console.log(d3.max(Object.values(subjectsList)));

      svg
        .selectAll("rect")
        .data(Object.entries(subjectsList))
        .join("rect")
        .attr("x", (d) => x(d[0]))
        .attr("y", (d) => y(d[1]))
        .attr("width", x.bandwidth())
        .attr("height", (d) => innerH - y(d[1]))
        .style("fill", "steelblue");

      svg
        .append("g")
        .attr("transform", "translate(0," + innerH + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      const yGridlines = d3
        .axisLeft(y)
        .scale(y)
        .ticks(5)
        .tickSize(-width, 0, 0)
        .tickFormat("");
    }
  }, [subjectsList]);
  if (!subjectsList) {
    return <pre>"....loading</pre>;
  }
  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      transform={`translate(${margin.left},${margin.right})`}
    />
  );
};

export default BarScool;
