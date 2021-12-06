import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import DrillDownBarChart from "../components/Charts/DrillDownBarChart";
import Layout from "../components/layout";
import executeQuery from "../lib/db";
import data from "../data/query.json";

const DecadeRating = ({ result }) => {
    //console.log(result);

    const [select, setSelected] = useState(0);
    const [hovered, setHovered] = useState({ col1: 0, col2: 0 });
    const [max, setMax] = useState({ col1: -1, count: -1 });
    const [min, setMin] = useState({ col1: -1, count: -1 });

    const [ave, setAve] = useState(
        result.filter((item) => item.decade === null && item.year === null)[0].average_movie_rank
    );
    const decade = result.filter((item) => item.decade !== null && item.year === null);
    const drillToYear = result.filter((item) => item.decade === select && item.year !== null);

    const [barData, setBarData] = useState(decade);
    const [x, setX] = useState("decade");

    useEffect(() => {
        if (select !== 0) {
            setBarData(drillToYear);
            setAve(result.filter((item) => item.decade === select && item.year === null)[0].average_movie_rank);
        } else {
            setBarData(decade);
            setAve(result.filter((item) => item.decade === null && item.year === null)[0].average_movie_rank);
        }

        const counts = barData.map((item) => item.average_movie_rank);
        const maxCnt = Math.max(...counts);
        const minCnt = Math.min(...counts);

        const maxInd = counts.indexOf(maxCnt);
        const minInd = counts.indexOf(minCnt);

        setMax({ col1: barData[maxInd][x], count: barData[maxInd].average_movie_rank });
        setMin({ col1: barData[minInd][x], count: barData[minInd].average_movie_rank });
    }, [select, x]);

    return (
        <Layout active={1} title={"Decades & Ratings"}>
            <section className="px-2 py-32 min-h-screen ">
                <h2 className="font-semibold text-2xl mb-4 text-center">{data.drill_down.name}</h2>
                <p className="text-base mx-16 mb-16 text-gray-600 text-center">{data.drill_down.description}</p>
                <div className="flex w-full justify-item item-center">
                    <div className="relative ml-8">
                        <DrillDownBarChart
                            data={barData}
                            col1={x}
                            col2="average_movie_rank"
                            setSelected={setSelected}
                            setX={setX}
                            setHovered={setHovered}
                        />
                    </div>
                    <div className="flex flex-wrap w-full justify-between h-80">
                        <div className="w-full bg-gray-50 rounded-md shadow-lg px-4 py-4 ">
                            <h3 className="text-xl font-semibold text-center">
                                Viewing Average Ranking of Movies{" "}
                                {select === 0 ? " over the Decade (1900-1990)" : `in ${select}`}
                            </h3>
                            <div className="mt-4 flex">
                                <div className="w-1/2">
                                    <h4 className=" text-lg ">{x.toLocaleUpperCase()}:</h4>
                                    <p>{hovered.col1 === 0 ? "--" : hovered.col1}</p>
                                </div>
                                <div className="w-1/2">
                                    <h4 className="text-lg ">{"Count".toLocaleUpperCase()}:</h4>
                                    <p>{hovered.col2 === 0 ? "--" : hovered.col2}</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-80 bg-gray-50 rounded-md shadow-lg mt-2 px-2 py-2">
                            <h4 className="text-sm font-semibold text-center capitalize">
                                {x} with Most Number of Movies
                            </h4>
                            <h3 className="text-4xl mt-2 font-light text-center">
                                <CountUp start={0} end={max.col1} duration={1} />
                            </h3>
                            <p className="text-gray-500 text-center mt-4">
                                with <CountUp start={0} end={max.count} decimal="." decimals={2} duration={1} />
                                &nbsp;Movies
                            </p>
                        </div>
                        <div className="w-80  bg-gray-50 rounded-md shadow-lg mt-2 px-2 py-2">
                            <h4 className="text-sm font-semibold text-center capitalize">
                                {x} with Least Number of Movies
                            </h4>
                            <h3 className="text-4xl mt-2 font-light text-center">
                                <CountUp start={0} end={min.col1} duration={1} />
                            </h3>
                            <p className="text-gray-500 text-center mt-4">
                                with <CountUp start={0} end={min.count} decimal="." decimals={2} duration={1} />
                                &nbsp;Movies
                            </p>
                        </div>
                        <div className="w-full  bg-gray-50 rounded-md shadow-lg mt-2 px-2 py-8">
                            <h4 className="text-sm font-semibold text-center capitalize">
                                Average Ranking of Movies{" "}
                                {select === 0 ? "in the 20th century" : "in the decade " + select}
                            </h4>
                            <h3 className="text-4xl mt-2 font-light text-center">
                                <CountUp start={0} end={ave} decimal={"."} decimals={2} duration={1} />
                            </h3>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default DecadeRating;

export async function getStaticProps() {
    try {
        const getQuery = await executeQuery({
            query: data.drill_down.query,
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
