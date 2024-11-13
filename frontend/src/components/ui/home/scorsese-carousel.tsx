"use-client"
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import infinityWar from "../../../assets/carousel/infinity-war-poster-1.jpg"
import endgame from "../../../assets/carousel/endgame-poster-1.jpg"
import creed1 from "../../../assets/carousel/creed-1-poster-1.jpg"
import creed2 from "../../../assets/carousel/creed-2-poster-1.jpg"
import deadpool2 from "../../../assets/carousel/deadpool-2-poster-1.jpg"
import hobbs from "../../../assets/carousel/hobbs-shaw-poster-1.jpg"
import panther from "../../../assets/carousel/panther-poster-1.jpg"
import ragnorok from "../../../assets/carousel/ragnorok-poster-1.jpg"
import scorsese from "../../../assets/carousel/scorsese.png"


export function ScorseseCarousel() {
    const images = [infinityWar, endgame, creed1, creed2, deadpool2, ragnorok, panther, hobbs];
    const quantity = images.length;

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true, 
        });
      }, []);

    return (
        <div className="h-[1200px] flex items-center justify-center text-white mb-[-300px]">
            <div 
                id="banner" 
                className="relative w-full h-[100vh] text-center"
            >
                <div
                    id="slider"
                    className="animate-[autoRunCarousel_20s_linear_infinite] absolute top-10 left-[calc(50%-100px)] xl:w-[200px] lg:w-[188px] md:w-[175px] w-[150px] xl:h-[250px] lg:h-[234px] md:h-[219px] h-[188px] z-20"
                    style={{
                        transformStyle:"preserve-3d",
                        transform : "perspective(1000px)"
                    }}
                >
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="absolute inset-0 transform transition-transform duration-500"
                            style={{
                                transform: `rotateY(${(360 / quantity) * index}deg) translateZ(500px)`,
                            }}
                        >
                            <img src={image} alt={`carousel-image-${index}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>

                <div
                    id="content"
                    className="absolute flex flex-wrap justify-between items-center bottom-[90px] xl:left-[700px] lg:left-[600px] md:left-[460px] left-[350px] xl:min-w-[1400px] lg:min-w-[1200px] md:min-w-[1000px] min-w-[600px] h-max pb-[100px]"
                    style={{
                        transform : "translateX(-50%)"
                    }}
                >
                    <h1 
                        className="relative font-icaRubrik xl:text-[4em] lg:text-[3em] text-[2em] xl:ml-[150px] lg:ml-[220px] md:ml-[250px] ml-[100px] leading-12 z-50"
                        data-content="Your Next Favorite Flick, Just a Chat Away!"
                        style={{
                            color: "white"
                        }}
                    >
                        Your Next Favorite Flick, Just a Chat Away!
                    </h1>
                    <div
                        id="model"
                    >
                        <img
                            src={scorsese}
                            className="absolute bottom-0 left-0 w-full h-[75vh] ml-10 z-0 bg-auto130 bg-no-repeat bg-center"
                        />
                    </div>
                </div>
            </div>

            
        </div>
    );
}

export default ScorseseCarousel