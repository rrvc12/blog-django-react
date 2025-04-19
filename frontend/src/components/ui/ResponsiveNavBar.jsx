import { NavLink } from "react-router-dom"

const ResponsiveNavBar = ({ isAuthenticated, username, logout }) => {

    return (
        <nav className="max-container padding-x py-6 max-md:block hidden dark:text-[#FFFFFF]">
            <ul className="flex items-center justify-center gap-6 text-[#3B3C4A] lg:flex-1 flex-col dark:text-[#FFFFFF]">

                {isAuthenticated ?
                    <>
                        <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>Hi, {username}</NavLink>
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
        </nav>

    )
}

export default ResponsiveNavBar