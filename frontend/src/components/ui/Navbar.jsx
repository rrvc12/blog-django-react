import { Switch } from "@/components/ui/switch";
import { FaHamburger } from "react-icons/fa";
import ResponsiveNavBar from "./ResponsiveNavBar";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const NavBar = ({ darkMode, handleDarkMode, isAuthenticated, setIsAuthenticated, username, setUsername }) => {
    const [showNavBar, setShowNavBar] = useState(false)

    const navigate = useNavigate()


    function logout() {
        // removemos el token
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        setIsAuthenticated(false)
        setUsername(null)
        navigate("/")
    }

    return (
        <>
            <nav className="max-container padding-x py-6 flex justify-between items-center  gap-6 sticky top-0 z-10 bg-[#FFFFFF] dark:bg-[#141624]">
                <Link to="/" className="text-[#141624] text-2xl dark:text-[#FFFFFF]">
                    DevFolio
                </Link>
                <ul className="flex items-center  justify-end gap-9 text-[#3B3C4A] lg:flex-1 max-md:hidden dark:text-[#FFFFFF]">

                    {isAuthenticated ?
                        <>
                            <NavLink to={`/profile/${username}`} className={({ isActive }) => isActive ? "active" : ""}>Hi, {username}</NavLink>
                            <li onClick={logout} className="cursor-pointer">Logout</li>
                        </>
                        :
                        <>
                            <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>
                                Sign in
                            </NavLink>

                            <NavLink to="/signup" className={({ isActive }) => isActive ? "active" : ""}>
                                Register
                            </NavLink>
                        </>

                    }
                    <li className="font-semibold">
                        <NavLink to="/create" className={({ isActive }) => isActive ? "active" : ""}>
                            Create a post
                        </NavLink>
                    </li>
                </ul>

                <Switch onCheckedChange={handleDarkMode} checked={darkMode} />
                <FaHamburger className="text-2xl cursor-pointer hidden max-md:block dark:text-white" onClick={() => setShowNavBar(curr => !curr)} />
            </nav >

            {showNavBar && <ResponsiveNavBar isAuthenticated={isAuthenticated} username={username} logout={logout} />
            }

        </>
    );
};

export default NavBar;