import React from "react";
import Navigation from "./Navigation/Navigation";
import SEO from "./seo";

const Layout = ({ children, active, title, desc }) => {
    return (
        <>
            <SEO title={title} desc={desc} />
            <Navigation active={active} />
            <main>{children}</main>
        </>
    );
};

export default Layout;
