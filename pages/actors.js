import React from "react";
import Layout from "../components/layout";
const actors = () => {
    return (
        <Layout active={1} title={"Actors"}>
            <section className="px-2 py-32 min-h-screen text-center">Actors</section>
        </Layout>
    );
};

export default actors;
