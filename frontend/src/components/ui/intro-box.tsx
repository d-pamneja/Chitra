"use client";
import { animate, motion } from "framer-motion";
import React, { useEffect,createContext,useState,useContext,useRef } from "react";
import { cn } from "../../lib/utils.tsx";


const StackSection = () => {
    return(
        <div className="flex justify-between">
            <TSCardInstance className="flex-shrink-0 w-[48%]"/>
            <InfoCard className="">
                <InfoDescription>
                    <Pointers/>
                </InfoDescription>
            </InfoCard>
        </div>
    )
}


const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);



export function TSCardInstance({
        className,
    }: {
        className?: string;
    }) {
        const containerRef = useRef<HTMLDivElement>(null);
        const [isMouseEntered, setIsMouseEntered] = useState(false);
        
        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            if (!containerRef.current) return;
            const { left, top, width, height } =
            containerRef.current.getBoundingClientRect();
            const x = (e.clientX - left - width / 2) / 25;
            const y = (e.clientY - top - height / 2) / 25;
            containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
        };
        
        const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
            setIsMouseEntered(true);
            if (!containerRef.current) return;
        };
        
        const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
            if (!containerRef.current) return;
            setIsMouseEntered(false);
            containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
        };


        return (
            <>
            <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
                <Card 
                    ref={containerRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className={className}
                    style={{
                        transformStyle: "preserve-3d",
                    }}
                >
                    <CardSkeletonContainer>
                        <Skeleton />
                    </CardSkeletonContainer>
                    <CardTitle>Tech-Stack</CardTitle>
                    <CardDescription>
                        Built with MongoDB, Node.js, React, and Express, seamlessly integrating Google Gemini and FastAPI for a powerful, scalable tech stack.
                        A modern solution combining flexibility, speed, and intelligence.
                    </CardDescription>
                </Card>
            </MouseEnterContext.Provider>
            </>
        );
}

const Skeleton = () => {
  const scale = [1, 1.1, 1];
  const transform = ["translateY(0px)", "translateY(-4px)", "translateY(0px)"];
  const sequence = [
    [
      ".circle-1",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-2",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-3",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-4",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-5",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
  ];

  useEffect(() => {
    animate(sequence, {
      repeat: Infinity,
      repeatDelay: 1,
    });
  }, []);
  return (
    <div className="p-8 overflow-hidden h-full relative flex items-center justify-between">
      <div className="flex flex-row flex-shrink-0 justify-center items-center gap-2">
        <Container className="h-8 w-8 circle-1 border border-grey-400">
          <MongoDBLogo className="h-4 w-4" />
        </Container>
        <Container className="h-12 w-12 circle-2 border border-grey-400">
          <NextJSLogo className="h-6 w-6 text-white" />
        </Container>
        <Container className="circle-3 border border-grey-400">
          <GeminiLogo className="h-8 w-8 text-white" />
        </Container>
        <Container className="h-12 w-12 circle-4 border border-grey-400">
          <ReactLogo className="h-6 w-6" />
        </Container>
        <Container className="h-8 w-8 circle-5 border border-grey-400">
          <ExpressLogo className="h-4 w-4" />
        </Container>
      </div>

      <div className="h-40 w-px absolute top-20 m-auto z-40 bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move">
        <div className="w-10 h-32 top-1/2 -translate-y-1/2 absolute -left-10">
          <Sparkles />
        </div>
      </div>
    </div>
  );
};

const Sparkles = () => {
  const randomMove = () => Math.random() * 2 - 1;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();
  return (
    <div className="absolute inset-0">
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 2 + 4,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block bg-black"
        ></motion.span>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
        <div
            className={cn(
                "max-w-sm w-full mx-auto p-8 my-20 rounded-xl border border-[rgba(255,255,255,0.10)] bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group",
                className
            )}
        >
        {children}
        </div>
  );
};

export const InfoCard = ({
    className,
    children,
  }: {
    className?: string;
    children: React.ReactNode;
  }) => {
    return (
      <div
        className={cn(
          "flex-shrink-0 w-[48%] h-auto mx-auto p-8 my-20 rounded-xl border border-[rgba(255,255,255,0.10)] bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group",
          className
        )}
      >
        {children}
      </div>
    );
  };

export const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "text-lg font-semibold text-gray-800 py-2",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-sm font-normal text-neutral-600 max-w-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

export const InfoDescription = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <p
        className={cn(
          "text-sm font-normal text-neutral-600",
          className
        )}
      >
        {children}
      </p>
    );
  };

export const CardSkeletonContainer = ({
  className,
  children,
  showGradient = true,
}: {
  className?: string;
  children: React.ReactNode;
  showGradient?: boolean;
}) => {
  return (
    <div
      className={cn(
        "h-[15rem] md:h-[20rem] rounded-xl z-40",
        className,
        showGradient &&
          "bg-neutral-300 dark:bg-[rgba(40,40,40,0.70)] [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]"
      )}
    >
      {children}
    </div>
  );
};

const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        `h-16 w-16 rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)]
    shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]
    `,
        className
      )}
    >
      {children}
    </div>
  );
};

export const MongoDBLogo = ({ className }: { className?: string }) => {
  return (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="800px" 
        height="800px" 
        viewBox="0 0 73 73" 
        version="1.1" 
        className={className}>
        
        <defs/>
            <g id="databases-and-servers/databases/mongodb" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="container" transform="translate(2.000000, 2.000000)" fill="#FFFFFF" fill-rule="nonzero" stroke="#134514" stroke-width="2">
                    <rect id="mask" x="-1" y="-1" width="71" height="71" rx="14">

        </rect>
                </g>
                <g id="Group" transform="translate(25.000000, 11.000000)" fill-rule="nonzero">
                    <path d="M12.4944775,50.7282275 L11.1460449,50.2673438 C11.1460449,50.2673438 11.3107227,43.3929395 8.8434082,42.8996191 C7.19912598,40.9915674 9.10717773,-38.0181006 15.0277344,42.6362061 C15.0277344,42.6362061 12.9881543,43.6556396 12.6263623,45.3993701 C12.2314209,47.1099512 12.4944775,50.7282275 12.4944775,50.7282275 Z" id="Shape" fill="#A6A385">

        </path>
                    <path d="M13.218418,44.0837305 C13.218418,44.0837305 25.0274512,36.320708 22.2639307,20.1698145 C19.5998584,8.42743652 13.3171533,4.57889648 12.6263623,3.0985791 C11.8699854,2.04599609 11.1460449,0.204243164 11.1460449,0.204243164 L11.6397217,32.8667529 C11.6397217,32.8999023 10.6199316,42.8664697 13.2187744,44.0840869" id="Shape" fill="#499D4A">

        </path>
                    <path d="M10.4556104,44.5111084 C10.4556104,44.5111084 -0.629838867,36.9455566 0.0281591797,23.624126 C0.653007813,10.3023389 8.48161621,3.75657715 9.99472656,2.57246582 C10.9817236,1.51988281 11.0145166,1.12494141 11.080459,0.0723583984 C11.77125,1.55267578 11.6397217,22.209751 11.7381006,24.6435596 C12.0339502,34.0180713 11.2119873,42.7352979 10.4556104,44.5111084 Z" id="Shape" fill="#58AA50">

        </path>
                </g>
            </g>
    </svg>
  );
};

export const NextJSLogo = ({ className }: { className?: string }) => {
    return (
        <svg
        className={className}
        width="30"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        >
            <g>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5C15 10.087 13.6902 12.3681 11.6975 13.7163L4.90687 4.20942C4.78053 4.03255 4.5544 3.95756 4.34741 4.02389C4.14042 4.09022 4 4.28268 4 4.50004V12H5V6.06027L10.8299 14.2221C9.82661 14.7201 8.696 15 7.5 15C3.35786 15 0 11.6421 0 7.5ZM10 10V4H11V10H10Z" fill="#000000"/>
            </g>
        </svg>
    );
};

export const ReactLogo = ({ className }: { className?: string }) => {
    return (
        <svg
        className={className}
        width="30"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M18.6789 15.9759C18.6789 14.5415 17.4796 13.3785 16 13.3785C14.5206 13.3785 13.3211 14.5415 13.3211 15.9759C13.3211 17.4105 14.5206 18.5734 16 18.5734C17.4796 18.5734 18.6789 17.4105 18.6789 15.9759Z" fill="#53C1DE"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.7004 11.1537C25.2661 8.92478 25.9772 4.79148 23.4704 3.39016C20.9753 1.99495 17.7284 4.66843 16.0139 6.27318C14.3044 4.68442 10.9663 2.02237 8.46163 3.42814C5.96751 4.82803 6.73664 8.8928 7.3149 11.1357C4.98831 11.7764 1 13.1564 1 15.9759C1 18.7874 4.98416 20.2888 7.29698 20.9289C6.71658 23.1842 5.98596 27.1909 8.48327 28.5877C10.9973 29.9932 14.325 27.3945 16.0554 25.7722C17.7809 27.3864 20.9966 30.0021 23.4922 28.6014C25.9956 27.1963 25.3436 23.1184 24.7653 20.8625C27.0073 20.221 31 18.7523 31 15.9759C31 13.1835 26.9903 11.7923 24.7004 11.1537ZM24.4162 19.667C24.0365 18.5016 23.524 17.2623 22.8971 15.9821C23.4955 14.7321 23.9881 13.5088 24.3572 12.3509C26.0359 12.8228 29.7185 13.9013 29.7185 15.9759C29.7185 18.07 26.1846 19.1587 24.4162 19.667ZM22.85 27.526C20.988 28.571 18.2221 26.0696 16.9478 24.8809C17.7932 23.9844 18.638 22.9422 19.4625 21.7849C20.9129 21.6602 22.283 21.4562 23.5256 21.1777C23.9326 22.7734 24.7202 26.4763 22.85 27.526ZM9.12362 27.5111C7.26143 26.47 8.11258 22.8946 8.53957 21.2333C9.76834 21.4969 11.1286 21.6865 12.5824 21.8008C13.4123 22.9332 14.2816 23.9741 15.1576 24.8857C14.0753 25.9008 10.9945 28.557 9.12362 27.5111ZM2.28149 15.9759C2.28149 13.874 5.94207 12.8033 7.65904 12.3326C8.03451 13.5165 8.52695 14.7544 9.12123 16.0062C8.51925 17.2766 8.01977 18.5341 7.64085 19.732C6.00369 19.2776 2.28149 18.0791 2.28149 15.9759ZM9.1037 4.50354C10.9735 3.45416 13.8747 6.00983 15.1159 7.16013C14.2444 8.06754 13.3831 9.1006 12.5603 10.2265C11.1494 10.3533 9.79875 10.5569 8.55709 10.8297C8.09125 9.02071 7.23592 5.55179 9.1037 4.50354ZM20.3793 11.5771C21.3365 11.6942 22.2536 11.85 23.1147 12.0406C22.8562 12.844 22.534 13.6841 22.1545 14.5453C21.6044 13.5333 21.0139 12.5416 20.3793 11.5771ZM16.0143 8.0481C16.6054 8.66897 17.1974 9.3623 17.7798 10.1145C16.5985 10.0603 15.4153 10.0601 14.234 10.1137C14.8169 9.36848 15.414 8.67618 16.0143 8.0481ZM9.8565 14.5444C9.48329 13.6862 9.16398 12.8424 8.90322 12.0275C9.75918 11.8418 10.672 11.69 11.623 11.5748C10.9866 12.5372 10.3971 13.5285 9.8565 14.5444ZM11.6503 20.4657C10.6679 20.3594 9.74126 20.2153 8.88556 20.0347C9.15044 19.2055 9.47678 18.3435 9.85796 17.4668C10.406 18.4933 11.0045 19.4942 11.6503 20.4657ZM16.0498 23.9915C15.4424 23.356 14.8365 22.6531 14.2448 21.8971C15.4328 21.9423 16.6231 21.9424 17.811 21.891C17.2268 22.6608 16.6369 23.3647 16.0498 23.9915ZM22.1667 17.4222C22.5677 18.3084 22.9057 19.1657 23.1742 19.9809C22.3043 20.1734 21.3652 20.3284 20.3757 20.4435C21.015 19.4607 21.6149 18.4536 22.1667 17.4222ZM18.7473 20.5941C16.9301 20.72 15.1016 20.7186 13.2838 20.6044C12.2509 19.1415 11.3314 17.603 10.5377 16.0058C11.3276 14.4119 12.2404 12.8764 13.2684 11.4158C15.0875 11.2825 16.9178 11.2821 18.7369 11.4166C19.7561 12.8771 20.6675 14.4086 21.4757 15.9881C20.6771 17.5812 19.7595 19.1198 18.7473 20.5941ZM22.8303 4.4666C24.7006 5.51254 23.8681 9.22726 23.4595 10.8426C22.2149 10.5641 20.8633 10.3569 19.4483 10.2281C18.6239 9.09004 17.7698 8.05518 16.9124 7.15949C18.1695 5.98441 20.9781 3.43089 22.8303 4.4666Z" fill="#53C1DE"/>
        </svg>
    );
};

export const GeminiLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={className}
    >
      <path
        d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z"
        fill="url(#prefix__paint0_radial_980_20147)"
      />
      <defs>
        <radialGradient
          id="prefix__paint0_radial_980_20147"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)"
        >
          <stop offset=".067" stop-color="#9168C0" />
          <stop offset=".343" stop-color="#5684D1" />
          <stop offset=".672" stop-color="#1BA1E3" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export const ExpressLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M24 18.588a1.529 1.529 0 0 1-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 0 1-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 0 1 1.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 0 1 1.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 0 0 0 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 0 0 2.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 0 1-2.589 3.957 6.272 6.272 0 0 1-7.306-.933 6.575 6.575 0 0 1-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 0 1 0 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z"/>
    </svg>
  );
};

export const Pointers = () => {
    return(
        <ul>
            <li><strong className="text-black">MERN Stack (MongoDB, Express, React, Node.js):</strong>
                <ul className="list-disc">
                    <li>Seamless JavaScript integration across frontend and backend for efficient development.</li>
                    <li>React powers interactive chat window and movie pages, creating a user-friendly interface.</li>
                    <li>MongoDB and Express handle user authentication, data storage, and API routing, ensuring smooth communication between frontend and backend.</li>
                    <li>Enables rapid development, scalability, and flexibility throughout the project.</li>
                </ul>
            </li>
            <br></br>
            <li><strong className="text-black">Google Gemini for Chitra (AI Movie Bot):</strong>
                <ul className="list-disc">
                <li>Utilizes advanced language model capabilities for personalized movie recommendations and engaging movie discussions.</li>
                </ul>
            </li>
            <br></br>
            <li><strong className="text-black">Backend with FastAPI:</strong>
                <ul className="list-disc">
                <li>Efficiently processes user requests and interacts with multiple data sources (SQLite, ChromaDB, TMDB, IMDB) using a Retrieval-Augmented Generation (RAG) approach.</li>
                <li>Integration of Text-to-SQL functionality ensures precise movie recommendations.</li>
                </ul>
            </li>
            <br></br>
            <li><strong className="text-black">Interactive Features:</strong>
                <ul className="list-disc">
                <li>Generates conversation analysis reports (PDFs) delivered via Celery tasks and MailHog for personalized user experiences.</li>
                </ul>
            </li>
            <br></br>
            <li><strong className="text-black">Full Stack Integration:</strong>
                <ul className="list-disc">
                <li>Combines MERN stack, Gemini's natural language understanding, and FastAPI for a responsive, intelligent platform for movie lovers.</li>
                <li>Allows users to explore, receive tailored recommendations, and engage in rich discussions.</li>
                </ul>
            </li>
        </ul>
    )
}

export const useMouseEnter = () => {
    const context = useContext(MouseEnterContext);
    if (context === undefined) {
        throw new Error("useMouseEnter must be used within a MouseEnterProvider");
    }
    return context;
};

export default StackSection