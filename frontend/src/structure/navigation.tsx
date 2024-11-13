import Home from "../pages/home"
import Login from "../pages/login/login"
import SignUp from "../pages/sign-up/signup"
import Chat from "../pages/chat"
import NotFound from "../pages/notFound"


export const nav = [
    {
        path : "/", name : "Home", element : <Home/>, isRestricted : false
    },
    {
        path : "/login", name : "Login", element : <Login/>, isRestricted : false
    },
    {
        path : "/signup", name : "SignUp", element : <SignUp/>, isRestricted : false
    },
    {
        path : "/chat", name : "Chat", element : <Chat/>, isRestricted : true
    },
    {
        path : "*", name : "Not Found", element : <NotFound/>, isRestricted : false
    }
]

import github from '../assets/socials/github.png'
import X from '../assets/socials/X.png'
import linkedIn from '../assets/socials/linkedIn.png'
import medium from '../assets/socials/medium.png'
import mail from '../assets/socials/mail.png'


export const socials = [
    {
        path : "https://github.com/d-pamneja/Chitra_Movie_Bot", name : "Github", logo : github 
    },
    {
        path : "https://x.com/DPamneja", name : "X/Twitter", logo : X
    },
    {
        path : "https://www.linkedin.com/in/dhruv-pamneja-3b8432187/", name : "LinkedIn", logo : linkedIn
    },
    {
        path : "https://medium.com/@dpamneja", name : "Medium", logo : medium 
    },
    {
        path : "mailto:dpamneja@gmail.com", name : "Mail", logo : mail
    },
]
