import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import executeQuery from "../lib/db";
import data from "../data/query.json";
import CountUp from "react-countup";
import PivotBarChart from "../components/Charts/PivotBarChart";
import SliceBarChart from "../components/Charts/SliceBarChart";
const MovieGenre = ({ result }) => {
    const [barData, setBarData] = useState(result.filter((item) => item.year === null && item.genre !== null));
    //console.log(barData);
    const [x, setX] = useState("genre");
    const [selected, setSelected] = useState("");
    const [hovered, setHovered] = useState({ col1: "", col2: -1 });
    const [max, setMax] = useState({ col1: -1, count: -1 });
    const [min, setMin] = useState({ col1: -1, count: -1 });
    const [average, setAverage] = useState(0);

    //if overall genre average ranking (x: "genre", selected: "")
    // else (x: "year", selected:"comedy")

    useEffect(() => {
        if (x === "genre") {
            setBarData(result.filter((item) => item.year === null && item.genre !== null));
            setAverage(result.filter((item) => item.year === null && item.genre === null)[0].average_rank);
        } else {
            setBarData(result.filter((item) => item.year !== null && item.genre === selected));
            setAverage(result.filter((item) => item.year === null && item.genre === selected)[0].average_rank);
        }
    }, [x]);

    useEffect(() => {
        const counts = barData.map((item) => {
            return item.average_rank || 0;
        });
        //        console.log(counts);
        //        console.log("COUNTS", counts);
        const maxCnt = Math.max(...counts);
        const minCnt = Math.min(...counts);

        const maxInd = counts.indexOf(maxCnt);
        const minInd = counts.indexOf(minCnt);

        setMax({ col1: barData[maxInd][x], count: barData[maxInd].average_rank });
        setMin({ col1: barData[minInd][x], count: barData[minInd].average_rank });
    }, [barData]);

    return (
        <Layout active={1} title={"Movie Genre"}>
            <section className="px-2 py-32 min-h-screen ">
                <h2 className="font-semibold text-2xl mb-4 text-center">{data.pivot.name}</h2>
                <p className="text-base mx-16 mb-16 text-gray-600 text-center">{data.pivot.description}</p>
                <div className="flex w-full justify-item item-center">
                    <div className="relative ml-8">
                        {selected === "" ? (
                            <PivotBarChart
                                data={barData}
                                col1={x}
                                col2="average_rank"
                                setSelected={setSelected}
                                setX={setX}
                                setHovered={setHovered}
                            />
                        ) : (
                            <SliceBarChart
                                data={barData}
                                col1={x}
                                col2={"average_rank"}
                                setSelected={setSelected}
                                setX={setX}
                                setHovered={setHovered}
                            />
                        )}
                    </div>
                    <div className="flex flex-wrap w-full justify-between h-80">
                        <div className="w-full bg-gray-50 rounded-md shadow-lg px-4 py-4 ">
                            <h3 className="text-xl font-semibold text-center">
                                Viewing{" "}
                                {selected === ""
                                    ? "All Time Average Rankings of Each Genre"
                                    : `Movie Counts for Each Rating in ${selected}`}
                            </h3>
                            <div className="mt-4 flex">
                                <div className="w-1/2">
                                    <h4 className=" text-lg ">{x.toLocaleUpperCase()}:</h4>
                                    <p>{hovered.col1 === "" ? "--" : hovered.col1}</p>
                                </div>
                                <div className="w-1/2">
                                    <h4 className="text-lg ">{"Average Rating".toLocaleUpperCase()}:</h4>
                                    <p>{hovered.col2 === -1 ? "--" : hovered.col2}</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-80 bg-gray-50 rounded-md shadow-lg mt-2 px-2 py-2">
                            <h4 className="text-sm font-semibold text-center capitalize">
                                {x} with the Highest Average Ranking
                            </h4>
                            <h3 className="text-4xl mt-2 font-light text-center">
                                <CountUp start={0.0} end={max.count} duration={1} decimals={2} decimal={"."} />
                            </h3>
                            <p className="text-gray-500 text-center mt-4">
                                in {selected == "" ? `${max.col1} Genre` : max.col1}
                            </p>
                        </div>
                        <div className="w-80  bg-gray-50 rounded-md shadow-lg mt-2 px-2 py-2">
                            <h4 className="text-sm font-semibold text-center capitalize">
                                {x} with Lowest Average Ranking
                            </h4>
                            <h3 className="text-4xl mt-2 font-light text-center">
                                <CountUp start={0.0} end={min.count} duration={1} decimals={2} decimal={"."} />
                            </h3>
                            <p className="text-gray-500 text-center mt-4">
                                in {selected == "" ? `${min.col1} Genre` : min.col1}
                            </p>
                        </div>
                        <div className="w-full  bg-gray-50 rounded-md shadow-lg mt-2 px-2 py-8">
                            <h4 className="text-sm font-semibold text-center capitalize">
                                Average Rank of Movies in {x === "genre" ? "the 1980-2000" : `${selected}`}
                            </h4>
                            <h3 className="text-4xl mt-2 font-light text-center">
                                <CountUp start={0} end={average} decimals={2} decimal={"."} duration={1} />
                            </h3>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default MovieGenre;

export async function getStaticProps() {
    try {
        const getQuery = await executeQuery({
            query: data.pivot.query,
        });
        const result = JSON.parse(JSON.stringify(getQuery));
        return {
            props: {
                result,
            },
        };
    } catch (error) {
        console.log(error);
    }
}
