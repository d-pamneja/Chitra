import { Routes, Route } from 'react-router-dom'
import Home from "./pages/home"
import Login from "./pages/login/login"
import Signup from "./pages/sign-up/signup"
import Chat from "./pages/chat"
import NotFound from "./pages/notFound"
import Header from './components/Header'
import { useAuth } from './context/AuthContext'


function App() {
  console.log(useAuth()?.isLoggedIn);
  
  return (
    <main>
      <Header />
      <Routes>
        <Route path = "/" element={<Home/>}/>
        <Route path = "/login" element={<Login/>}/>
        <Route path = "/signup" element={<Signup/>}/>
        <Route path = "/chat" element={<Chat/>}/>

        <Route path = "*" element={<NotFound/>}/>
      </Routes>
    </main>
  )
}

export default App;
