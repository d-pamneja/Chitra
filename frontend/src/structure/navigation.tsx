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

export const socials = [
    {
        path : "https://github.com/d-pamneja/Chitra_Movie_Bot", name : "Github", logo : "" 
    },
    {
        path : "https://x.com/DPamneja", name : "X/Twitter", logo : "" 
    },
    {
        path : "https://www.linkedin.com/in/dhruv-pamneja-3b8432187/", name : "LinkedIn", logo : "" 
    },
    {
        path : "https://medium.com/@dpamneja", name : "Medium", logo : "" 
    },
    {
        path : "mailto:dpamneja@gmail.com", name : "Mail", logo : "" 
    },
]
