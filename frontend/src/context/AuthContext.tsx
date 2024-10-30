import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import { checkAuthStatus, loginUser, signUpUser,logoutUser } from '../helpers/api_communicator';

type User = {
    name : string;
    email : string;
}

type UserAuth = {
    isLoggedIn : boolean;
    user : User | null;

    login:(
        email:string,
        password:string
    )=> Promise<void>;

    signup:(
        name:string,
        email:string,
        password:string
    )=> Promise<void>;

    logout:()=> Promise<void>;
}

const AuthContext  = createContext<UserAuth | null>(null);

export const AuthProvider = ({children}:{children : ReactNode})=> {
    const [user,setUser] = useState<User | null>(null);
    const [isLoggedIn,setIsLoggedIn] = useState(false);


    useEffect(()=>{
        // Fetch if the user's cookies are valid, means already logged in and no need to perform login step here
        async function checkStatus () {
            const data = await checkAuthStatus();
            if(data){
                setUser({email:data.email,name:data.name})
                setIsLoggedIn(true);
            }
        }

        checkStatus();
    },[]);

    const login = async(
        email:string,
        password:string
    )=>{
        const data = await loginUser(email,password);
        if(data){
            setUser({email:data.email,name:data.name})
            setIsLoggedIn(true);
        }
    };

    const signup = async(
        name:string,
        email:string,
        password:string
    )=>{
        const data = await signUpUser(name,email,password);
        if(data){
            setUser({email:data.email,name:data.name})
            setIsLoggedIn(true);
        }
    };

    const logout = async()=>{
        const data = await logoutUser()
        if(data){
            setUser(null)
            setIsLoggedIn(false)
        }

    };

    const value = {
        user,
        isLoggedIn,
        login,
        logout,
        signup
    };


    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
}

export const useAuth = ()=> useContext(AuthContext);