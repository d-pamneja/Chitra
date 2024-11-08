import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {Menu,X} from 'lucide-react'
import { useState } from 'react';
import logo from '../assets/chitra_logo.png'


const Header = () => {
    const [mobileDrawerOpen,setMobileDrawerOpen] = useState(false)

    const toggleNavbar = () => {
        setMobileDrawerOpen(!mobileDrawerOpen)
    }

    const handleLinkClick = () => {
        setMobileDrawerOpen(false)
    }

    const auth = useAuth();
    const handleLogout = async () => {
        try {
            if(auth){
                await auth.logout();
                handleLinkClick
            }
            else{
                throw new Error("Unable to logout");
            }
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return(
        <nav 
            className='sticky top-0 z-50 py-3 backdrop-blur-md bg-[#0c0660] bg-opacity-70 border-b'
        >
            <div className='container px-4 mx-auto relative text-sm'>
                <div className="flex justify-between items-center">
                    <div className="flex items-center flex-shrink-0">
                        <Link
                            to="/"
                            onClick={handleLinkClick}
                        >
                            <img
                                src = {logo}
                                className='h-20 w-40 mr-2 invert'
                            />
                        </Link>
                    </div>
                    <ul className='hidden lg:flex ml-14 space-x-12'>
                        Page Links
                    </ul>
                    <div className="hidden lg:flex justify-center space-x-12 items-center">
                        {auth?.isLoggedIn ? (
                            <>
                                <Link 
                                    to="/chat" 
                                    className='py-3 px-5 border rounded-md hover:bg-blue-300 hover:text-black hover:border-black'
                                >
                                    Chat
                                </Link>

                                <Link 
                                    to="/" 
                                    className='py-3 px-5 border rounded-md hover:bg-purple-700 hover:text-white hover:border-black'
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/login" 
                                    className='py-3 px-5 border rounded-md hover:bg-blue-300 hover:text-black hover:border-black'
                                >
                                    Login
                                </Link>

                                <Link 
                                    to="/signup" 
                                    className='py-3 px-5 border rounded-md hover:bg-purple-700 hover:text-white hover:border-black'
                                >
                                    Signup
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="lg:hidden md:flex flex-col justify-end">
                        <button onClick={toggleNavbar}>
                            {mobileDrawerOpen ? <X/> : <Menu/>}
                        </button>
                    </div>
                </div>
                {mobileDrawerOpen && (
                    <div className="fixed right-0 z-20 bg-[#05101c] w-full p-12 flex flex-col justify-center items-center lg:hidden border-b border-neutral-700/80">
                        <ul>
                            <li className='py-4' onClick={handleLinkClick}>
                                Pgae Link 1
                            </li>
                            <li className='py-4' onClick={handleLinkClick}>
                                Pgae Link 2
                            </li>
                            <li className='py-4' onClick={handleLinkClick}>
                                Pgae Link 3
                            </li>
                        </ul>

                        <div className="flex space-x-6 py-2">
                            {auth?.isLoggedIn ? (
                                <>
                                    <Link 
                                        to="/chat" 
                                        className='py-3 px-5 border rounded-md hover:bg-blue-300 hover:text-black hover:border-black'
                                        onClick={handleLinkClick}
                                    >
                                        Chat
                                    </Link>

                                    <Link 
                                        to="/" 
                                        className='py-3 px-5 border rounded-md hover:bg-purple-700 hover:text-white hover:border-black'
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link 
                                        to="/login" 
                                        className='py-3 px-5 border rounded-md hover:bg-blue-300 hover:text-black hover:border-black'
                                        onClick={handleLinkClick}
                                    >
                                        Login
                                    </Link>

                                    <Link 
                                        to="/signup" 
                                        className='py-3 px-5 border rounded-md hover:bg-purple-700 hover:text-white hover:border-black'
                                        onClick={handleLinkClick}
                                    >
                                        Signup
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    
                )}
            </div>
        </nav>
    )
};


export default Header;