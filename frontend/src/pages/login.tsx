import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import {IoMdLogIn} from 'react-icons/io'
import CustomInput from '../components/shared/CustomInput';
import AnimatedFeatureBox from '../components/shared/Facts';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const auth = useAuth();
    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try{
            toast.loading("Signing In",{ id : "login" });
            await auth?.login(email,password);
            toast.success("Signed In Successfully",{ id : "login" });
        }
        catch(error){
            console.log(error);
            toast.error("Sign In Fail",{ id : "login" });
        }

    };

    return (
            <Box 
                width={'100%'} 
                height={'100%'} 
                display="flex" 
                flex={1}
                alignItems="center"
                justifyContent="center"
            >
                <Container maxWidth="sm">
                        <Box 
                            flexDirection="column"
                            display={'flex'} 
                            flex={1} 
                            justifyContent={'center'} 
                            alignItems={'center'} 
                            padding={2} 
                            marginLeft={'auto'} 
                            marginTop={15}
                            gap={10}
                        >
                            <form 
                                onSubmit={(handleSubmit)}
                                style={{
                                    margin:'auto', 
                                    padding:'30px', 
                                    boxShadow:'10px 10px 20px #000', 
                                    borderRadius:'10px', 
                                    border: '1px solid black',
                                    backgroundColor: "#F5EDFA"
                                }}
                            >
                                <Box 
                                sx={{
                                    display:'flex', 
                                    flexDirection:'column', 
                                    justifyContent : 'center'
                                }}
                                >
                                    <Typography 
                                        variant='h4' 
                                        textAlign={'center'} 
                                        padding={2} 
                                        fontWeight={600}
                                        color={'black'}
                                    >
                                        Login
                                    </Typography>
                                    <CustomInput 
                                        type='email' 
                                        name='email' 
                                        label='Email' 
                                    />
                                    <CustomInput 
                                        type='password' 
                                        name='password' 
                                        label='Password' 
                                    />
                                    <Button 
                                        type='submit' 
                                        sx={{
                                            px:2,
                                            py:1,
                                            mt:2,
                                            width:'400px',
                                            borderRadius:2,
                                            bgcolor: '#00fffc',
                                            ':hover':{
                                                bgcolor:'black',
                                                color:'white',
                                            }
                                        }}
                                        endIcon={<IoMdLogIn/>}
                                    >
                                            Login
                                    </Button>
                                </Box>
                            </form>
                            <AnimatedFeatureBox/>
                        </Box>
                </Container>
            </Box>
    );
};


export default Login;