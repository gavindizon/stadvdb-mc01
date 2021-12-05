import React, { useState, useEffect } from "react";
import SliceBarChart from "../components/SliceBarChart/SliceBarChart";
import Layout from "../components/layout";
import executeQuery from "../lib/db";
import data from "../data/query.json";
import CountUp from "react-countup";
const Actors = ({ result }) => {
    const total = result.filter((item) => item.rank === null && item.year !== null);
    const [barData, setBarData] = useState(total);
    const [x, setX] = useState("year");
    const [select, setSelected] = useState(0);
    const [hovered, setHovered] = useState({ col1: 0, col2: 0 });
    const [max, setMax] = useState({ col1: -1, count: -1 });
    const [min, setMin] = useState({ col1: -1, count: -1 });
    const [sum, setSum] = useState(0);

    useEffect(() => {
        if (select !== 0) {
            setBarData(result.filter((item) => item.rank !== null && item.year === select));
        } else {
            setBarData(total);
        }

        const counts = barData.map((item) => item.count);
        const maxCnt = Math.max(...counts);
        const minCnt = Math.min(...counts);

        const maxInd = counts.indexOf(maxCnt);
        const minInd = counts.indexOf(minCnt);

        setMax({ col1: barData[maxInd][x], count: barData[maxInd].count });
        setMin({ col1: barData[minInd][x], count: barData[minInd].count });
    }, [select, result, x]);
    useEffect(() => {
        setSum(barData.reduce((p, t) => p + t.count, 0));
    }, [x]);

    return (
        <Layout active={1} title={"Actors"}>
            <section className="px-2 py-32 min-h-screen ">
                <h2 className="font-semibold text-2xl mb-4 text-center">Number of Movies and Ratings in the Years</h2>
                <p className="text-base mx-16 mb-16 text-gray-600 text-center">
                    In this data visualization, we will be looking at the number of movies in a Year from the 1980 to
                    2000 with a Rating from 5 to 10.
                </p>
                <div className="flex w-full justify-item item-center">
                    <div className="relative ml-8">
                        <SliceBarChart
                            data={barData}
                            col1={x}
                            col2="count"
                            setSelected={setSelected}
                            setX={setX}
                            setHovered={setHovered}
                        />
                    </div>
                    <div className="flex flex-wrap w-full justify-between h-80">
                        <div className="w-full bg-gray-50 rounded-md shadow-lg px-4 py-4 ">
                            <h3 className="text-xl font-semibold text-center">
                                Viewing{" "}
                                {select === 0
                                    ? "Movie Counts per Year (1980-2000)"
                                    : `Movie Counts for Each Rating in ${select}`}
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
                                with <CountUp start={0} end={max.count} duration={1} />
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
                                with <CountUp start={0} end={min.count} duration={1} />
                                &nbsp;Movies
                            </p>
                        </div>
                        <div className="w-full  bg-gray-50 rounded-md shadow-lg mt-2 px-2 py-8">
                            <h4 className="text-sm font-semibold text-center capitalize">
                                Total Number of Movies in {select === 0 ? "1980-2000" : select}
                            </h4>
                            <h3 className="text-4xl mt-2 font-light text-center">
                                <CountUp start={0} end={sum} duration={1} />
                            </h3>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Actors;

export async function getStaticProps() {
    try {
        const getQuery = await executeQuery({
            query: data.slice.query,
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
