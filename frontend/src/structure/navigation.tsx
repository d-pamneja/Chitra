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

