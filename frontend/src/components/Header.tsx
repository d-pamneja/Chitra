import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {Menu,X} from 'lucide-react'
import { useRef, useState,useEffect } from 'react';
import logo from '../assets/chitra_logo.png'
import userDefaultLogo from '../assets/user-placeholder-1.png'


export const getUserNavs = (userId : string) => [
    {
        path: `/user/${userId}/dashboard`, name: "Dashboard", element: <></>
    },
    {
        path: `/user/${userId}/settings`, name: "Settings", element: <></>
    }
]

const Header = () => {
    const [mobileDrawerOpen,setMobileDrawerOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const auth = useAuth();

    const menuRef = useRef<HTMLDivElement | null>(null)
    const userRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => { // Outside Click Handler for User Menu
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownOpen &&
                userRef.current &&
                menuRef.current &&
                !userRef.current.contains(e.target as Node) &&
                !menuRef.current.contains(e.target as Node)
            ) {
                setDropdownOpen(false);
            }
        };

        // Adding event listener to detect outside clicks
        window.addEventListener('click', handleClickOutside);
        
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [dropdownOpen]);

    const toggleNavbar = () => {
        setMobileDrawerOpen(!mobileDrawerOpen)
    }

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    const handleLinkClick = () => {
        setMobileDrawerOpen(false)
        setDropdownOpen(false);
    }

    
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

    
    const userID = auth?.isLoggedIn ? localStorage.getItem('userID') : null
    const userNavs = userID ? getUserNavs(userID) : []
    

    return (
        <nav className='fixed w-full z-50 py-3 backdrop-blur-md bg-[#0c0660] bg-opacity-60 border-b'>
            <div className='container px-4 mx-auto relative text-sm'>
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" onClick={handleLinkClick}>
                        <img 
                            src={logo} 
                            className='h-20 w-40 mr-2 invert' 
                            alt="Chitra AI"
                        />
                    </Link>

                    {/* User or Auth Options */}
                    <div className="flex items-center space-x-4">
                        {auth?.isLoggedIn ? (
                            <>
                                {/* Avatar that toggles the dropdown menu (Only needed when user is logged in) */}
                                <div className="relative">
                                    <img
                                        ref={userRef}
                                        src={userDefaultLogo}
                                        alt="User avatar"
                                        className='h-14 w-14 object-cover rounded-full invert cursor-pointer'
                                        onClick={toggleDropdown}
                                    />
                                    {dropdownOpen && (
                                        <div 
                                            ref={menuRef}
                                            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg"
                                        >
                                            {userNavs.map((navItem, index) => (
                                                <Link
                                                    to={navItem.path}
                                                    key={index}
                                                    className="block px-4 py-2 text-gray-700 cursor-pointer rounded hover:bg-gray-100"
                                                    onClick={handleLinkClick}
                                                >
                                                    {navItem.name}
                                                </Link>
                                            ))}
                                            <Link
                                                to="/chat"
                                                className="block px-4 py-2 text-gray-700 cursor-pointer rounded hover:bg-gray-100"
                                                onClick={handleLinkClick}
                                            >
                                                Chat
                                            </Link>
                                            <Link 
                                                to="/" 
                                                className='block px-4 py-2 text-gray-700 cursor-pointer rounded hover:bg-purple-700 hover:text-white'
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Login and Signup buttons for guests */}
                                <div className='hidden lg:block'>
                                    <Link to="/login" className='py-3 px-5 border rounded-md mx-3 hover:bg-blue-300 hover:text-black hover:border-black'>
                                        Login
                                    </Link>
                                    <Link to="/signup" className='py-3 px-5 border rounded-md mx-3 hover:bg-purple-700 hover:text-white hover:border-black'>
                                        Signup
                                    </Link>
                                </div>
                                
                            </>
                        )}

                        {/* Mobile Menu Toggle (Only needed when user is not logged in)*/}
                        {!auth?.isLoggedIn && (
                            <div className="lg:hidden">
                                <button onClick={toggleNavbar}>
                                    {mobileDrawerOpen ? <X /> : <Menu />}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Drawer Menu (Only needed when user is not logged in) */}
                {mobileDrawerOpen && !auth?.isLoggedIn && (
                    <div className="fixed right-0 z-20 bg-[#05101c] w-full p-12 flex flex-col justify-center items-center lg:hidden border-2 border-white rounded-xl">
                        <div className="flex space-x-6 py-2">
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
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};


export default Header;