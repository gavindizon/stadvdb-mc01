import React from "react";
import * as d3 from "d3";
import { useD3 } from "../../hooks/useD3";

const SliceBarChart = ({ data, col1, col2, setSelected, setX, setHovered }) => {
    const ref = useD3(
        (svg) => {
            const height = 500;
            const width = 700;
            const margin = { top: 20, right: 30, bottom: 30, left: 40 };

            const x = d3
                .scaleBand()
                .domain(data.map((d) => d[col1]))
                .rangeRound([margin.left, width - margin.right])
                .padding(0.1);

            const y1 = d3
                .scaleLinear()
                .domain([0, d3.max(data, (d) => d[col2])])
                .rangeRound([height - margin.bottom, margin.top]);

            const xAxis = (g) =>
                g.attr("transform", `translate(0,${height - margin.bottom})`).call(
                    d3
                        .axisBottom(x)
                        .tickValues(d3.ticks(...d3.extent(x.domain()), width / 40).filter((v) => x(v) !== undefined))
                        .tickSizeOuter(0)
                );
            const y1Axis = (g) =>
                g
                    .attr("transform", `translate(${margin.left},0)`)
                    .style("color", "black")
                    .call(d3.axisLeft(y1).ticks(null, "s"))
                    .call((g) => g.select(".domain").remove())
                    .call((g) =>
                        g
                            .append("text")
                            .attr("x", -margin.left)
                            .attr("y", 10)
                            .attr("fill", "currentColor")
                            .attr("text-anchor", "start")
                    );
            svg.select(".x-axis").call(xAxis);
            svg.select(".y-axis").call(y1Axis);

            svg.append("text")
                .attr("class", "y label")
                .attr("text-anchor", "end")
                .attr("y", 0)
                .attr("dy", ".75em")
                .attr("transform", "rotate(-90)")
                .text("Number of Movies");

            svg.select(".plot-area")
                .attr("fill", "black")
                .selectAll(".bar")
                .data(data)
                .join("rect")
                .attr("class", "bar")
                .attr("x", (d) => x(d[col1]))
                .attr("y", (d) => y1(d[col2]))
                .attr("width", x.bandwidth())
                .on("click", function clickMe(d, i) {
                    if (col1 === "year") {
                        setSelected(i[col1]);
                        setX("rank");
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
                        return { col1: 0, col2: 0 };
                    });
                })
                .attr("height", (d) => 0)
                .transition()
                .duration(1000)
                .attr("height", (d) => y1(0) - y1(d[col2]));
        },
        [data.length]
    );

    return (
        <svg
            ref={ref}
            style={{
                height: 600,
                width: 750,
                marginRight: "0px",
                marginLeft: "0px",
            }}
        >
            <g className="plot-area" />
            <g className="x-axis" />
            <g className="y-axis" />
        </svg>
    );
};

export default SliceBarChart;
