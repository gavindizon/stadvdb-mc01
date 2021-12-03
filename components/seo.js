import React from "react";
import Head from "next/head";

const SEO = ({ title, desc }) => {
    return (
        <Head>
            <title> {title} | DELU Analytics</title>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;800&display=swap"
                rel="stylesheet"
            ></link>
        </Head>
    );
};

export default SEO;
