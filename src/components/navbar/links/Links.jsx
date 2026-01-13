"use client";

import Link from "next/link";
import styles from "./links.module.css"
import NavLink from './navLink/navLink'

const Links = () => {

    const links = [
        { 
            title: "Homepage", 
            path: "/",
        },
        { 
            title: "Motivator", 
            path: "/motivator",
        },
        { 
            title: "Loginpage", 
            path: "/login",
        },
        { 
            title: "Registerpage", 
            path: "/register",
        },
    ]
    return (
        <div className={styles.links}>
            {links.map((link) => (
                <NavLink item={link} key={link.title}/>
            ))}
        </div>
    )
}

export default Links;