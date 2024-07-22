import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import {IoMdLogIn} from 'react-icons/io'
import CustomInput from '../components/shared/CustomInput';
import AnimatedFeatureBox from '../components/shared/Facts';

const Login = () => {
    return (
            <Box 
                width={'100%'} 
                height={'100%'} 
                display="flex" 
                flex={1}
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
                            <AnimatedFeatureBox />
                        </Box>
                </Container>
            </Box>


    );
};


export default Login;