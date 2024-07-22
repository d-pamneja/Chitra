import React from "react";
import { TextField } from "@mui/material";

type Props = {
    name : string, 
    type : string,
    label : string,
};

const CustomInput = (props: Props) =>{
    return (
        <TextField 
            margin='normal' 
            InputLabelProps={{style:{color:'black'}}} 
            name={props.name} 
            label={props.label} 
            type={props.type} 
            InputProps={{style : {width:'400px', borderRadius:10,fontSize:20, color:'black', borderColor:'black'}}}>
        </TextField>
    );
};

export default CustomInput;