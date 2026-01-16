"use client";

import Link from "next/link";

const Links = () => {

    const links = [
        { 
            title: "Homepage", 
            path: "/",
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
        <div>
            {links.map((link) => (
                <Link href={link.path} key={link.title}>{link.title}</Link>
            ))}
        </div>
    )
}

export default Links;