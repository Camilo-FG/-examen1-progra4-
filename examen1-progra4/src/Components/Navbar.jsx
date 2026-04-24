import React from 'react'

import {
    createRootRoute,
    createRoute,
    createRouter,
    Link,
    Outlet,
} from '@tanstack/react-router'
const Navbar = () => {
    return (
        <>
            <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
                <Link to="/">Inicio</Link>
                <Link to="/Carparts">Carparts</Link>

            </nav>

            <section id="enter">
                <Outlet />
            </section>
        </>
    )
}

export default Navbar
