"use client";

import styles from "./links.module.css"
import NavLink from './navLink/navLink'
import LogoutButton from '../LogoutButton'

const Links = ({ isAdmin, isConnected }) => {
    const links = []

    // Liens toujours visibles
    links.push({ title: "Homepage", path: "/" })
    links.push({ title: "Motivator", path: "/motivator" })

    if (isConnected) {
        // Si connecté : afficher Admin (si admin) + Logout
        if (isAdmin) {
            links.push({ title: "Admin", path: "/admin" })
        }
    } else {
        // Si déconnecté : afficher Login + Register
        links.push({ title: "Login", path: "/login" })
        links.push({ title: "Register", path: "/register" })
    }

    return (
        <div className={styles.links}>
            {links.map((link) => (
                <NavLink item={link} key={link.title}/>
            ))}
            {isConnected && <LogoutButton />}
        </div>
    )
}

export default Links;