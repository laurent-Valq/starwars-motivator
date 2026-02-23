"use client";

import styles from "./links.module.css"
import NavLink from './navLink/navLink'
import LogoutButton from '../LogoutButton'

const Links = ({ isAdmin, isConnected }) => {
    const links = []

    // Liens toujours visibles
    links.push({ title: "Home", path: "/" })
    links.push({ title: "Motivator", path: "/motivator" })

    if (isConnected) {
        // Si connecté : afficher Settings, Favorites, Admin (si admin) + Logout
        links.push({ title: "Settings", path: "/settings" })
        if (!isAdmin) {
        links.push({ title: "Favorites", path: "/favorites" })
        }
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