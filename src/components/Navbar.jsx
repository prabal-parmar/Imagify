import React, { useContext, useState } from 'react'
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./navbar.css"
import ProfileMenu from './ProfileMenu';

function Navbar() {
  const { user, logoutUser } = useContext(UserContext);
  const [onPricing, setOnPricing] = useState(false);
  const navigate = useNavigate();
  return (
    <div className='mb-10'>
      <nav className="fixed top-0 start-0 z-20 w-full border-b border-gray-200 bg-slate-50 backdrop-blur-md shadow-lg rounded-b-2xl">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2">
          <a href="#" className="flex items-center space-x-2 rtl:space-x-reverse">
            <img
              src="/Images/Imagify_logo.svg"
              className="h-6"
              alt="Imagify logo"
              onClick={() => navigate("/")}
            />
          </a>
          <div className="flex md:order-2 space-x-2 md:space-x-0 rtl:space-x-reverse">
            {user ? (
              <ProfileMenu/>
            ) : (
              <a
                className="login-with-google-btn"
                href={`${import.meta.env.VITE_API_URL}/auth/google`}
              >
                Login
              </a>
            )}
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-2 md:p-0 mt-2 font-medium border border-gray-100 rounded-lg md:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
              <li>
                <p
                  onClick={() => navigate("/")}
                  className="block py-1 px-2 text-gray-500 hover:text-black rounded-sm md:p-0"
                >
                  Home
                </p>
              </li>
              <li>
                <p className="block py-1 px-2 text-gray-500 hover:text-black rounded-sm md:p-0">
                  About
                </p>
              </li>
              <li>
                <p
                  onClick={() => navigate("/pricing")}
                  className="block py-1 px-2 text-gray-500 hover:text-black rounded-sm md:p-0"
                >
                  Pricing
                </p>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>

  )
}

export default Navbar