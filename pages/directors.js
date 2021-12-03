import React from "react";
import Layout from "../components/layout";
const directors = () => {
    return (
        <Layout active={1} title={"Directors"}>
            <section className="px-2 py-32 min-h-screen text-center">Movies</section>
        </Layout>
    );
};

export default directors;
