import * as d3 from "d3";
import { useD3 } from "../../hooks/useD3";
import React, { useEffect } from "react";

const PivotBarChart = ({ data, col1, col2, setSelected, setX, setHovered }) => {
    const ref = useD3(
        (svg) => {
            const margin = { top: 20, right: 30, bottom: 30, left: 90 };
            const width = 700 - margin.left - margin.right;
            const height = 500;

            svg.attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(0, ${margin.top})`);

            const x = d3.scaleLinear().domain([0, 10]).range([0, width]);

            svg.append("g")
                .attr("transform", `translate(70, ${height})`)
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "translate(0,0)")
                .style("text-anchor", "end");

            const y = d3
                .scaleBand()
                .range([0, height])
                .domain(data.map((d) => d[col1]))
                .padding(0.2);

            svg.append("g")
                .attr("transform", "translate (" + 70 + " 0)")
                .call(d3.axisLeft(y));

            svg.selectAll("myRect")
                .data(data)
                .join("rect")
                .on("click", function clickMe(d, i) {
                    if (col1 === "genre") {
                        setSelected(i[col1]);
                        setX("year");
                    } else {
                        setSelected(0);
                        setX("year");
                    }
                })
                .on("mouseover", function (d, i) {
                    setHovered((prev) => {
                        return { col1: i[col1], col2: i[col2] };
                    });
                })
                .on("mouseout", function (d, i) {
                    setHovered((prev) => {
                        return { col1: "", col2: -1 };
                    });
                })
                .attr("x", x(0))
                .attr("class", "bar")
                .attr("transform", "translate (" + 70 + " 0)")
                .attr("y", (d) => y(d[col1]))
                .attr("width", (d) => x(0))

                .transition()
                .duration(1000)

                .attr("width", (d) => x(d[col2]))
                .attr("height", y.bandwidth())
                .attr("fill", "black");

            // const xAxis = (g) =>
            //     g.attr("transform", `translate(0,${height - margin.bottom})`).call(
            //         d3
            //             .axisBottom(x)
            //             .tickValues(d3.ticks(...d3.extent(x.domain()), width / 40).filter((v) => x(v) !== undefined))
            //             .tickSizeOuter(0)
            //     );

            // const y1Axis = (g) =>
            //     g
            //         .attr("transform", `translate(${margin.left},0)`)
            //         .style("color", "black")
            //         .call((g) =>
            //             g
            //                 .append("text")
            //                 .attr("x", -margin.left)
            //                 .attr("y", 10)
            //                 .attr("fill", "currentColor")
            //                 .attr("text-anchor", "start")
            //         );

            // svg.select(".x-axis").call(xAxis);
            // svg.select(".y-axis").call(y1Axis);

            // svg.append("text")
            //     .attr("class", "y label")
            //     .attr("text-anchor", "end")
            //     .attr("y", 0)
            //     .attr("dy", ".75em")
            //     .attr("transform", "rotate(-90)")
            //     .text("Average Rating");

            // svg.select(".plot-area")
            //     .attr("fill", "black")
            //     .selectAll(".bar")
            //     .data(data)
            //     .join("rect")
            //     .attr("class", "bar")
            //     .attr("x", (d) => x(d[col1]))
            //     .attr("y", (d) => y1(d[col2]))
            //     .attr("width", x.bandwidth())
            //     .on("click", function clickMe(d, i) {
            //         if (col1 === "genre") {
            //             setSelected(i[col1]);
            //             setX("year");
            //         } else {
            //             setSelected(0);
            //             setX("year");
            //         }
            //     })
            //     .on("mouseover", function (d, i) {
            //         setHovered((prev) => {
            //             return { col1: i[col1], col2: i[col2] };
            //         });
            //     })
            //     .on("mouseout", function (d, i) {
            //         setHovered((prev) => {
            //             return { col1: 0, col2: 0 };
            //         });
            //     })
            //     .attr("height", (d) => 0)
            //     .transition()
            //     .duration(1000)
            //     .attr("height", (d) => y1(0) - y1(d[col2]));
        },
        [data.length]
    );
    return (
        <svg ref={ref}>
            {/* <g className="plot-area" />
            <g className="x-axis" />
            <g className="y-axis" /> */}
        </svg>
    );
};

export default PivotBarChart;
