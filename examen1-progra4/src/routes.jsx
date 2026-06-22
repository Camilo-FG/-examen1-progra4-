import {
    createRootRoute,
    createRoute,
    createRouter,
    Link,
    Outlet,
} from '@tanstack/react-router'

import CarParts from './Components/CarParts'

import Home from './Components/Home'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'


const rootRoute = createRootRoute({
    component: function RootLayout() {
        return (
            <>
                <Navbar></Navbar>

            </>
        )
    },
})

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Home,
})

const carPartsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/Carparts',
    component: CarParts,
})



const routeTree = rootRoute.addChildren([
    indexRoute,
    carPartsRoute
])

export const router = createRouter({ routeTree })