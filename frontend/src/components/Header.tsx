import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Logo from './shared/Logo';



const Header = () => {
    return <AppBar sx={{bgcolor : "#9932CC", position : "static"}}>
        <Toolbar sx={{display : "flex", justifyContent : 'center'}}>
            <Logo />
        </Toolbar>
    </AppBar>
};


export default Header;