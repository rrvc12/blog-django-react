import { Outlet } from 'react-router'
import Footer from './Footer'
import NavBar from './Navbar'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';

const AppLayout = ({ isAuthenticated, setIsAuthenticated, username, setUsername }) => {

    useEffect(function () {
        if (localStorage.getItem("dark") === null) {
            localStorage.setItem("dark", "false")
        }
    }, [])

    const [darkMode, setDarkMode] = useState(localStorage.getItem("dark") === "true");

    const handleDarkMode = () => {
        const newDarkMode = !darkMode
        setDarkMode(newDarkMode)
        localStorage.setItem("dark", newDarkMode ? "true" : "false")
    }

    return (
        <div className={darkMode ? "dark" : ""}>
            <main className="w-full bg-[#ffffff] dark:bg-[#181A2A]">
                <NavBar darkModel={darkMode} handleDarkMode={handleDarkMode} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} username={username} setUsername={setUsername} />
                <ToastContainer />
                <Outlet />
                <Footer />
            </main>
        </div>

    )
}

export default AppLayout