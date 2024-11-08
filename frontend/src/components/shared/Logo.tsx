import { Link } from 'react-router-dom';

const Logo = () => {
    return (
    <div 
        className='flex justify-center items-center mt-10 px-8px'
    >
        <Link to='/'>
            {/* <img 
                src = "/Users/dhruv/Desktop/Machine_Learning/Projects/Chitra_Movie_Bot/frontend/src/assets/chitra_logo.png"
                alt = "Google Gemini" 
                width={'250px'} 
                height={'100px'}
            /> */}
            Chitra
        </Link>
    </div>
    )
};


export default Logo;