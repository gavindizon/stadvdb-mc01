import * as d3 from "d3";
import { useD3 } from "../../hooks/useD3";
import React, { useEffect } from "react";

const PieChart = ({ data, sum }) => {
    const ref = useD3(
        (svg) => {
            const height = 500;
            const width = 700;
            const radius = Math.min(width, height) / 2 - 20;

            //CLEAR
            d3.selectAll("g > *").remove();
            // VIZ AREA
            const g = svg
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", `translate(${width / 2}, ${height / 2})`);

            //

            const color = d3.scaleOrdinal().range(["#0000ff", "#00ff00"]);

            const pie = d3.pie().value((d) => d[1]);

            const data_ready = pie(Object.entries(data));

            console.log("DATA READY", data_ready);

            g.selectAll("whatever")
                .data(data_ready)
                .join("path")
                .on("mouseover", function (d, i) {
                    console.log(d, i);
                })
                .style("opacity", 0.1)
                .transition()
                .duration(1000)
                .attr("d", d3.arc().innerRadius(0).outerRadius(radius))
                .attr("fill", function (d) {
                    return color(d.data[1]);
                })
                .attr("stroke", "white")
                .style("stroke-width", "5px")
                .style("opacity", 0.7);

            g.selectAll("whatever")
                .data(data_ready)
                .enter()
                .append("text")
                .text(function (d) {
                    return "(" + d.data[0] + ") " + ((d.data[1] / sum) * 100).toFixed(2) + "%";
                })
                .attr("transform", function (d) {
                    return "translate(" + d3.arc().innerRadius(0).outerRadius(radius).centroid(d) + ")";
                })
                .style("opacity", 0)
                .transition()
                .duration(1000)

                .style("text-anchor", "middle")
                .style("font-size", 17)
                .style("opacity", 1);
        },
        [data.length, data]
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
        ></svg>
    );
};

export default PieChart;
