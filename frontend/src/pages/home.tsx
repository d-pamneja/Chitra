import { GoogleGeminiEffectInstance } from '../components/ui/home/gemini-effect';
import { StackSection } from '../components/ui/home/intro-box';
import {ScorseseCarousel} from '../components/ui/home/scorsese-carousel';

const Home = () => {
    return <div className='mt-0.5'>
        <ScorseseCarousel/>
        <GoogleGeminiEffectInstance/>
        <StackSection/>
    </div>
};


export default Home;