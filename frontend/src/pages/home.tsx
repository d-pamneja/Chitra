import { GoogleGeminiEffectInstance } from '../components/ui/gemini-effect';
import { StackSection } from '../components/ui/intro-box';
import {ScorseseCarousel} from '../components/ui/scorsese-carousel';

const Home = () => {
    return <div>
        <ScorseseCarousel/>
        <GoogleGeminiEffectInstance/>
        <StackSection/>
    </div>
};


export default Home;