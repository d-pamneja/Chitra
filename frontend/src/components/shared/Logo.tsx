import { Link } from 'react-router-dom';

const Logo = () => {
    return (
    <div
        style={{
            display : 'flex', 
            marginTop : '10px',
            justifyContent : 'center',
            alignItems : 'center',
            gap : '8px'
        }}
    >
        <Link to='/'>
            <img 
                src = "chitra_logo.png" 
                alt = "Google Gemini" 
                width={'250px'} 
                height={'100px'}
            />
        </Link>
        {/* <Typography sx={{
                    display : {
                        md : "block",
                        sm : "none",
                        xs : "none"
                    },
                    marginRight : "auto",
                    fontWeight : "800",
                    textShadow : "2px 2px 20px #000"
                }}>
                    <span style={{
                        fontSize : "10px",
                        marginBottom : "auto"
                    }}>MERN Application + Google Gemini</span>
        </Typography> */}
    </div>
    )
};


export default Logo;