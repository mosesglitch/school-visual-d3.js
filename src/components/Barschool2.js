import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { csv, arc, pie, scaleBand, scaleLinear, max } from "d3";
import "../App.css";
const csvUrl =
  "https://gist.githubusercontent.com/mosesglitch/18fb6b9f52bcd8775ce43f010a82b201/raw/f6bf92f8d7105574f55f69cfac648f17a3b4dcec/SchoolData.csv";

const BarSchool2 = () => {
  const [data, setData] = useState(null);
  const [alldata, setAllData] = useState(null);
  const [selName, setselName] = useState("Michele Gray");
  const svgRef = useRef();
  let margin = { top: 20, right: 20, bottom: 30, left: 40 };
  let svgWidth = 720,
    svgHeight = 300;
  let height = svgHeight - margin.top - margin.bottom,
    width = svgWidth - margin.left - margin.right;

  const onNameSelect = (e) => {
    setselName(e.target.outerText);
  };
  console.log(selName);
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
      //   setAllData(data);
      const studentsList = data.map((d) => (
        <p onClick={(e) => onNameSelect(e)}>{d.Name}</p>
      ));
      setAllData(studentsList);

      const selectedStudent = data.filter((d) => d.Name === selName);
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

      setData(result);
    });

    let svg = d3.select(svgRef.current);

    let sourceNames = [],
      sourceCount = [];

    let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        sourceNames.push(key);
        sourceCount.push(parseInt(data[key]));
      }
    }
    x.domain(sourceNames);
    y.domain([0, d3.max(sourceCount, (d) => d)]);

    svg = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    svg.append("g").attr("class", "axis axis--y").call(d3.axisLeft(y).ticks(5));

    // Create rectangles
    let bars = svg.selectAll(".bar").data(sourceNames).enter().append("g");
    bars.exit().remove();
    bars
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d))
      .attr("y", (d) => y(data[d]))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(data[d]));

    bars
      .append("text")
      .text((d) => data[d])
      .attr("x", (d) => x(d) + x.bandwidth() / 2)
      .attr("y", (d) => y(data[d]) - 5)
      .attr("font-family", "sans-serif")
      .attr("font-size", "14px")
      .attr("fill", "black")
      .attr("text-anchor", "middle");
  }, [selName]);
  if (!data) {
    return <pre>"....loading</pre>;
  }
  return (
    <div style={{ flex: 1, flexDirection: "row" }}>
      <div style={{ flex: 1 }}>{alldata}</div>
      <div style={{ flex: 1 }}>
        <svg
          id="svgDisplay"
          ref={svgRef}
          width={svgWidth}
          height={svgHeight}
          transform={`translate(${margin.left},${margin.right})`}
        />
      </div>
    </div>
  );
};

export default BarSchool2;
