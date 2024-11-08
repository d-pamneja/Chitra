import React from 'react';
import { Box, Button, Container, Typography, Divider} from '@mui/material';
import { IoMdLogIn } from 'react-icons/io';
import CustomInput from '../../components/shared/CustomInput';
import Content from './contents';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { GoogleLogin,CredentialResponse } from '@react-oauth/google';
import GoogleAPIComponent from '../../components/GoogleAPI';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  GoogleAPIComponent(); 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await auth?.login(email, password);
      toast.success('Signed In Successfully', { id: 'login' });
      const redirect = "/chat";
      navigate(redirect);
    } catch (error) {
      // Type Assertion for error to specify the expected structure of error
      const errorsArray = (error as { response: { data: { errors: { msg: string }[] } } }).response?.data?.errors;

      console.log(error);
      
      if (errorsArray && errorsArray.length > 0) {
          toast.error(`Sign In Failed : ${errorsArray[0].msg}`, { id: 'signup' });
      }else {
          const errorMessage = (error as { response: { data: { message: string } } }).response?.data?.message;
          if (errorMessage) {
              toast.error(`Sign In Failed : ${errorMessage}`, { id: 'signup' });
          } else {
              toast.error("Sign In Failed : Unknown error", { id: 'signup' });
          }
      }
    }
  };

  const onSuccess = (response : CredentialResponse) => {
    console.log("Login Success: currentUser:", response);
  }

  const onFailure = () => {
    console.log("Login Failed");
  }

  return (
    <Box 
      className='flex h-[850px] md:flex-row flex-col'
      sx={{
        background: 'radial-gradient(at 70% 51%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        marginBottom: 'auto'
      }}
    >
      {/* Left Side - Content */}
      <Box 
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={3}
        sx={{
          display: { xs: 'none', md: 'flex' },
        }}
      >
        <Content /> {/* Content Component */}
      </Box>

      {/* Right Side - Login Form */}
      <Box 
        flex={1} 
        display="flex" 
        justifyContent="center" 
        alignItems="center"
        padding={4}
      >
        <Container maxWidth="sm">
          <Box 
            display="flex" 
            flexDirection="column" 
            justifyContent="center" 
            alignItems="center" 
            padding={4} 
            boxShadow="0px 10px 30px rgba(0, 0, 0, 0.6)"
            border="1px solid rgba(255, 255, 255, 0.2)"
            borderRadius="10px"
            sx={{
              backgroundColor: "#0B1F34",
            }}
          >
            <Typography 
              variant='h4' 
              textAlign="center" 
              fontWeight={600}
              color="white"
              marginBottom={2}
            >
              Login
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <CustomInput type='email' name='email' label='Email' fullWidth/>
              <CustomInput type='password' name='password' label='Password' fullWidth/>
              <Button 
                type='submit' 
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  borderRadius: 2,
                  backgroundColor: '#00fffc',
                  ':hover': {
                    backgroundColor: 'black',
                    color: 'white',
                  },
                }}
                endIcon={<IoMdLogIn />}
              >
                Login
              </Button>
            </form>
            <br />
            <Divider>or</Divider>
            <br />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <GoogleLogin 
                onSuccess={onSuccess}
                onError={onFailure}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Login;