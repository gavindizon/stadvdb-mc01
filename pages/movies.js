import React from "react";
import Layout from "../components/layout";
const movies = () => {
    return (
        <Layout active={1} title={"Movies"}>
            <section className="px-2 py-32 min-h-screen text-center">Movies</section>
        </Layout>
    );
};

export default movies;
