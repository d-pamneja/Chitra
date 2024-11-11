import { GoogleGeminiEffectInstance } from '../components/ui/gemini-effect';
import { StackSection } from '../components/ui/intro-box';
import {ScorseseCarousel} from '../components/ui/scorsese-carousel';
// import { HeroHighlightInstance } from '../components/ui/highlight-text';

const Home = () => {
    return <div>
        {/* <VortexInstance/> */}
        <ScorseseCarousel/>
        {/* <HeroHighlightInstance/> */}
        <GoogleGeminiEffectInstance/>
        <StackSection/>
    </div>
};


export default Home;