import axios from "axios"


export const loginUser = async (
    email:string,
    password:string
)=>{
    const res = await axios.post("/user/login",{email, password});
    if(res.status != 200){
        throw new Error("Unable to Login.")
    }
    
    const data = await res.data;

    localStorage.setItem('userID',data.id)
    return data;
}

export const signUpUser = async (
    name:string,
    email:string,
    password:string
)=>{
    const res = await axios.post("/user/signup",{name,email, password});
    if(res.status != 201){
        throw new Error("Unable to Sign Up User.")
    }
    
    const data = await res.data;
    localStorage.setItem('userID',data.id)
    return data;
}

export const logoutUser = async () => {
    const res = await axios.get('/user/logout', {
      withCredentials: true,
    });
    
    if (res.status != 200) {
        throw new Error("Logout failed");;
    }

    const data = await res.data;
    localStorage.removeItem('userID')
    return data;

  };


export const checkAuthStatus = async () => {
    try{
        const res = await axios.get("/user/auth-status");
        if(res.status===403 || res.status===401){
            throw new Error("Error caught successfully")
        }
        const data = await res.data;
        return data;
    }
    catch(error){
        return null; 
    }
  };