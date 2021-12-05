import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import CountUp from "react-countup";
import executeQuery from "../lib/db";
import data from "../data/query.json";
import PieChart from "../components/SliceBarChart/PieChart";
import SliceBarChart2 from "../components/SliceBarChart/SliceBarChart2";

const Movies = ({ result }) => {
    const [year, setYear] = useState(2000);
    const total = result.filter((item) => item.year === null && item.gender === null)[0].gender_count;
    const totalMaleRoles = result.filter((item) => item.year === null && item.gender === null)[0].gender_count;
    //    const total = result.filter((item) => item.rank === null && item.year !== null);
    const [barData, setBarData] = useState(result.filter((item) => item.year !== null && item.gender === null));

    const [pieData, setPieData] = useState(result.filter((item) => item.year === year && item.gender !== null));
    const [parsedData, setParsedData] = useState(
        pieData.reduce((acc, cur) => ({ ...acc, [cur.gender]: cur.gender_count }), {})
    );
    const [peepSum, setPeepSum] = useState(pieData.reduce((prev, curr) => prev + curr.gender_count, 0));
    const [x, setX] = useState("year");
    const [select, setSelected] = useState(0);
    const [hovered, setHovered] = useState({ year: -1, M: -1, F: -1 });

    const [togglePie, setToggledPie] = useState(true);

    useEffect(() => {
        console.log("TOTAL", total);
        setPieData(result.filter((item) => item.year === year && item.gender !== null));
        console.log("PARSED", parsedData);

        // const counts = barData.map((item) => item.count);
        // const maxCnt = Math.max(...counts);
        // const minCnt = Math.min(...counts);
        // const maxInd = counts.indexOf(maxCnt);
        // const minInd = counts.indexOf(minCnt);

        // setMax({ col1: barData[maxInd][x], count: barData[maxInd].count });
        // setMin({ col1: barData[minInd][x], count: barData[minInd].count });
    }, [year]);

    useEffect(() => {
        setParsedData(pieData.reduce((acc, cur) => ({ ...acc, [cur.gender]: cur.gender_count }), {}));
        setPeepSum(pieData.reduce((prev, curr) => prev + curr.gender_count, 0));
    }, [year, pieData]);

    function range(start, end) {
        return Array(end - start + 1)
            .fill()
            .map((_, idx) => start + idx);
    }

    return (
        <Layout active={1} title={"Movies"}>
            <section className="px-2 py-32 min-h-screen ">
                <h2 className="font-semibold text-2xl mb-4 text-center">{data.roll_up.name}</h2>
                <p className="text-base mx-16 mb-16 text-gray-600 text-center">{data.roll_up.description}</p>
                <div className="flex w-full justify-item item-center">
                    <div className="relative ml-8">
                        {/* <SliceBarChart
                            data={barData}
                            col1={x}
                            col2="count"
                            setSelected={setSelected}
                            setX={setX}
                            setHovered={setHovered}
                        /> */}
                        {togglePie ? (
                            <PieChart data={parsedData} sum={peepSum} />
                        ) : (
                            <SliceBarChart2
                                data={barData}
                                col1={"year"}
                                col2={"gender_count"}
                                setHovered={setHovered}
                                setYear={setYear}
                                setToggledPie={setToggledPie}
                                year={year}
                            />
                        )}
                    </div>
                    <div className="flex flex-wrap w-full justify-between h-80">
                        <div className="w-full bg-gray-50 rounded-md shadow-lg px-4 py-4 ">
                            <h3 className="text-xl font-semibold text-center">
                                Viewing{" "}
                                {togglePie ? "Male/Female Roles Ratio in " + year : "Total Roles over the Years"}
                            </h3>
                            <div className="mt-4 flex">
                                <div className="w-1/2">
                                    <h4 className=" text-lg ">Select Year:</h4>
                                    <select
                                        value={year}
                                        onChange={(e) => setYear(parseInt(e.target.value))}
                                        disabled={togglePie === false}
                                    >
                                        {range(1890, 2007).map((item, key) => (
                                            <option key={key} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="w-1/2">
                                    <button
                                        className={`px-4 py-2 rounded-md text-white transform transition-all hover:bg-gray-600 ${
                                            togglePie ? "bg-black" : "bg-gray-800"
                                        }`}
                                        onClick={() => setToggledPie(!togglePie)}
                                    >
                                        TOGGLE ROLLUP
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="w-80 bg-gray-50 rounded-md shadow-lg mt-2 px-2 py-2">
                            <h4 className="text-xs font-semibold text-center capitalize">
                                Number of Roles starred by a Male in {year}
                            </h4>
                            <h3 className="text-4xl mt-2 font-light text-center">
                                <CountUp start={0} end={parsedData.M || 0} duration={1} />
                            </h3>
                        </div>
                        <div className="w-80  bg-gray-50 rounded-md shadow-lg mt-2 px-2 py-2">
                            <h4 className="text-xs font-semibold text-center capitalize">
                                Number of Roles starred by a Female in {year}
                            </h4>
                            <h3 className="text-4xl mt-2 font-light text-center">
                                <CountUp start={0} end={parsedData.F || 0} duration={1} />
                            </h3>
                        </div>
                        <div className="w-full  bg-gray-50 rounded-md shadow-lg mt-2 px-2 py-8">
                            <h4 className="text-sm font-semibold text-center capitalize">
                                {togglePie
                                    ? "Total Number of Roles Starred by an Actor/ Actress in " + year
                                    : "Total Number of Roles Over the Years"}
                            </h4>
                            <h3 className="text-4xl mt-2 font-light text-center">
                                {togglePie ? (
                                    <CountUp start={0} end={peepSum} duration={1} />
                                ) : (
                                    <CountUp start={0} end={total} duration={1} />
                                )}
                            </h3>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Movies;

export async function getStaticProps() {
    try {
        const getQuery = await executeQuery({
            query: data.roll_up.query,
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
