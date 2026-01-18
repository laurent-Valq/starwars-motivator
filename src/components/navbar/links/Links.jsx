"use client";

import styles from "./links.module.css"
import NavLink from './navLink/navLink'

const Links = ({ isAdmin }) => {
    const links = [
        { title: "Homepage", path: "/" },
        { title: "Motivator", path: "/motivator" },
        { title: "Loginpage", path: "/login" },
        { title: "Registerpage", path: "/register" },
    ]

    if (isAdmin) {
        links.push({ title: "Admin", path: "/admin" })
    }

    return (
        <div className={styles.links}>
            {links.map((link) => (
                <NavLink item={link} key={link.title}/>
            ))}
        </div>
    )
}

export default Links;