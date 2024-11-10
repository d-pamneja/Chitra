import { GoogleGeminiEffectInstance } from '../components/ui/gemini-effect';
import StackSection from '../components/ui/intro-box';
// import { HeroHighlightInstance } from '../components/ui/highlight-text';

const Home = () => {
    return <div>
        {/* <VortexInstance/> */}
        <GoogleGeminiEffectInstance/>
        {/* <HeroHighlightInstance/> */}
        <StackSection/>
        <div className="h-screen">
            Final Section
        </div>
    </div>
};


export default Home;