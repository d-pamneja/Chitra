"use-client"
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import infinityWar from "../../assets/carousel/infinity-war-poster-1.jpg"
import endgame from "../../assets/carousel/endgame-poster-1.jpg"
import creed1 from "../../assets/carousel/creed-1-poster-1.jpg"
import creed2 from "../../assets/carousel/creed-2-poster-1.jpg"
import deadpool2 from "../../assets/carousel/deadpool-2-poster-1.jpg"
import hobbs from "../../assets/carousel/hobbs-shaw-poster-1.jpg"
import panther from "../../assets/carousel/panther-poster-1.jpg"
import ragnorok from "../../assets/carousel/ragnorok-poster-1.jpg"


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
        <div className="h-[800px] flex items-center justify-center text-white mt-[300px]">
            <div 
                id="banner" 
                className="relative w-full h-[100vh] text-center"
            >
                <div
                    id="slider"
                    className="animate-[autoRunCarousel_20s_linear_infinite] absolute top-10 left-[calc(50%-100px)] w-[200px] h-[250px]"
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
                                transform: `rotateY(${(360 / quantity) * index}deg) translateZ(550px)`,
                            }}
                        >
                            <img src={image} alt={`carousel-image-${index}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>

                <div
                    id="content"
                    className="absolute flex flex-wrap justify-between items-center bottom-[90px] left-[700px] min-w-[1400px] h-max pb-[100px]"
                    style={{
                        transform : "translateX(-50%)"
                    }}
                >
                    <h1>Chitra</h1>
                    <div
                        id="subheading"
                    >
                        <h2>Movie App</h2>
                        <p>By Dhruv Pamneja</p>
                    </div>
                    <div
                        id="model"
                    >
                        
                    </div>
                </div>
            </div>

            
        </div>
    );
}

export default ScorseseCarousel