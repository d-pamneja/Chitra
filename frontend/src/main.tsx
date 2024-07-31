// Importing the dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import { Toaster } from "react-hot-toast";
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000/api/v2";
axios.defaults.withCredentials = true;


// Seting the Theme
const theme = createTheme({
  typography : {
    fontFamily : "Work Sans,serif",
    allVariants : {
      color : "white"
    }
  }
});

// Initialising the application
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster position="top-center"/>
            <App/>
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
