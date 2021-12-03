import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "../config/axios";
import executeQuery from "../lib/db";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { GiDirectorChair, GiDramaMasks, GiFilmStrip } from "react-icons/gi";
import { MdOutlineRecentActors } from "react-icons/md";
import Layout from "../components/layout";
import Link from "next/link";

export default function Home({ actors }) {
    // const [data, setData] = useState([]);

    // async function fetchData() {
    //     setData(res.data);
    //     console.log(res);
    // }
    // useEffect(() => {
    //     fetchData();
    // }, []);

    return (
        <Layout active={0} title={"Home"}>
            <section className="px-2 py-32 min-h-screen text-center">
                <h1 className="font-extralight text-4xl pb-4 ">Welcome to DELUAnalytics!</h1>
                <p>An analytics website that showscases findings from the IMDB IJS Database</p>
                <div className="w-full flex flex-col sm:flex-row justify-center py-8">
                    <Link href="/actors">
                        <a className="block w-full md:w-72 h-32 bg-gray-50 rounded-lg p-2 flex justify-center items-center shadow-lg m-2 transform transition-all hover:-translate-y-2">
                            <GiDramaMasks size="64px" />
                            <span className="text-2xl ml-4">Actors</span>
                        </a>
                    </Link>
                    <Link href="/movies">
                        <a className="block w-full md:w-72 w-72 h-32 bg-gray-50 rounded-lg p-2 flex justify-center items-center shadow-lg m-2 transform transition-all hover:-translate-y-2">
                            <GiFilmStrip size="64px" />
                            <span className="text-2xl ml-4">Movies</span>
                        </a>
                    </Link>
                    <Link href="/directors">
                        <a className="block w-full md:w-72 w-72 h-32 bg-gray-50 rounded-lg p-2 flex justify-center items-center shadow-lg m-2 transform transition-all hover:-translate-y-2">
                            <GiDirectorChair size="64px" />
                            <span className="text-2xl ml-4">Directors</span>
                        </a>
                    </Link>
                </div>
            </section>
            {/* <ul>
                {actors.map((item, index) => (
                    <li key={index}>{item.first_name}</li>
                ))}
            </ul> */}
        </Layout>
    );
}

export async function getStaticProps() {
    try {
        const getActors = await executeQuery({
            query: "SELECT * FROM actors LIMIT 30",
            //            values: [ email ],
        });
        const actors = JSON.parse(JSON.stringify(getActors));
        return {
            props: {
                actors,
            },
        };
    } catch (error) {
        console.log(error);
    }
}
