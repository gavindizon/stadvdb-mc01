import { GiDirectorChair, GiDramaMasks, GiFilmStrip } from "react-icons/gi";
import Layout from "../components/layout";
import Link from "next/link";

export default function Home() {
    return (
        <Layout active={0} title={"Home"}>
            <section className="px-2 py-32 min-h-screen text-center">
                <h1 className="font-extralight text-4xl pb-4 ">Welcome to DELUAnalytics!</h1>
                <p>An analytics website that showscases findings from the IMDB IJS Database</p>
                <div className="w-full flex flex-col sm:flex-row justify-center py-8">
                    <Link href="/moviegender">
                        <a className="block w-full md:w-72 h-32 bg-gray-50 rounded-lg p-2 flex justify-center items-center shadow-lg m-2 transform transition-all hover:-translate-y-2">
                            <GiDramaMasks size="64px" />
                            <span className="text-2xl ml-4">Movies & Gender</span>
                        </a>
                    </Link>
                    <Link href="/movieratings">
                        <a className="block w-full md:w-72 w-72 h-32 bg-gray-50 rounded-lg p-2 flex justify-center items-center shadow-lg m-2 transform transition-all hover:-translate-y-2">
                            <GiFilmStrip size="64px" />
                            <span className="text-2xl ml-4">Movies & Ratings</span>
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
        </Layout>
    );
}
