import React, { useState } from "react";
import styles from "./Navigation.module.scss";
import Link from "next/link";
import { FaBars, FaHamburger, FaHome, FaTimes } from "react-icons/fa";
import { MdOutlineRecentActors } from "react-icons/md";
import { GiDramaMasks, GiFilmStrip, GiHouse } from "react-icons/gi";

const Navigation = () => {
    const [toggle, setToggle] = useState(false);

    return (
        <nav className={`${styles.container} px-8 py-2 flex justify-start items-center`}>
            <button onClick={() => setToggle(!toggle)}>
                <FaBars size="32px" />
            </button>
            <Link href="/">
                <a className={`${styles.logo} ml-4 hidden sm:block`}>
                    DELU<span>Analytics</span>
                </a>
            </Link>
            <Link href="/">
                <a className={`${styles.logo} ml-4 block sm:hidden`}>
                    D<span>A</span>
                </a>
            </Link>
            <div
                className={`bg-white h-full fixed ${
                    toggle ? "left-0" : "-left-80"
                }  top-0 w-80 z-50 transform transition-all py-12 px-4 shadow-md`}
            >
                <button className="absolute right-0 top-0 mr-2 mt-2" onClick={() => setToggle(false)}>
                    <FaTimes size="32px" />
                </button>
                <Link href="/">
                    <a className={`${styles.logo} absolute left-0 top-0 ml-2 mt-2 ml-4`}>
                        D<span>A</span>
                    </a>
                </Link>
                <ul className="block mt-8">
                    <li>
                        <Link href="/">
                            <a className="font-semibold text-lg flex justify-start items-end pb-2 ">
                                <FaHome size="28px" className="mr-2" /> <span className="leading-4">Home</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/moviegender">
                            <a className="font-semibold text-lg flex justify-start items-end pb-2 ">
                                <GiDramaMasks size="28px" className="mr-2" />{" "}
                                <span className="leading-4">Movies & Gender</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/movieratings">
                            <a className="font-semibold text-lg flex justify-start items-end pb-2">
                                <GiFilmStrip size="28px" className="mr-2" />
                                <span className="leading-4">Movies & Ratings</span>
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;
