'use client'

import { useEffect, useRef } from "react";
import gsap from 'gsap'
import { MotionPathPlugin } from "gsap/MotionPathPlugin"

gsap.registerPlugin(MotionPathPlugin);

const Hero = () => {
  useEffect(() => {
    const strokeWidth = 10;
    const colors = ["#000000", "#FFFFFF"];
    const gradientPath = document.querySelector("#gradient-path");
    const baseNumberOfDots = Math.ceil(.5 * gradientPath.getTotalLength());

    function createAnimatedGradient(g) {
      const numberOfDots = 2 * baseNumberOfDots;

      for (let idx = 0; idx < 200; idx++) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        g.appendChild(circle);
        let radius;
        radius = .5 * strokeWidth;
        radius += (.02 * idx - .6 * strokeWidth);
        radius = Math.max(0, radius);
        gsap.set(circle, {
          attr: {
            cx: 0,
            cy: 0,
            r: radius,
            fill: gsap.utils.interpolate(colors, (idx / 200)),
          },
        })

        gsap.to(circle, {
          motionPath: {
            path: gradientPath,
          },
          duration: 16,
          ease: "none",
          repeat: -1,
        }).progress(idx / numberOfDots);
      }
    }

    createAnimatedGradient(document.querySelector(".animated-gradient-els"));
  }, []);

  return (
    <div className="hero-bg max-w-[1154px] w-full pt-[80px] pb-[50px] flex flex-col justify-center items-center relative px-6 text-center min-h-screen">
      <div className='relative'>
        <svg width="959" height="609" viewBox="0 0 959 609" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex items-center py-3 scale-y-125">
          <defs>
            <linearGradient id="mergedGradient" x1="100%" y1="0" x2="0" y2="100%" gradientUnits="userSpaceOnUse">
              <stop stopColor="#D6D6D6" stopOpacity="0.2" />
              <stop offset="0.5" stopColor="#D6D6D6" />
              <stop offset="1" stopColor="#D6D6D6" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="paint4_linear_1339_8161" x1="666.5" y1="7" x2="666.5" y2="263" gradientUnits="userSpaceOnUse">
              <stop stopColor="#D6D6D6" stopOpacity="0.08" />
              <stop offset="1" stopColor="#060606" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint5_linear_1339_8161" x1="549" y1="596" x2="549" y2="339" gradientUnits="userSpaceOnUse">
              <stop stopColor="#D6D6D6" stopOpacity="0.08" />
              <stop offset="1" stopColor="#060606" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint6_linear_1339_8161" x1="320.296" y1="436.029" x2="166.179" y2="53.6134" gradientUnits="userSpaceOnUse">
              <stop stopColor="#D6D6D6" stopOpacity="0" />
              <stop offset="1" stopColor="#D6D6D6" stopOpacity="0.4" />
            </linearGradient>

            <path id="gradient-path" d="M830 364 C772.747 432.063 228.107 489.88 258.202 525.375 C282.277 553.772 631.326 584.29 802.841 596 C777.683 617.179 145.148 567.795 77.9668 563.771 C10.7853 559.747 -92.3734 520.972 174.884 485.123 C402.789 454.552 561 256.474 561 245.5 C575 271.473 529.789 148.662 301.884 117.944 C34.6266 81.9221 137.785 42.9592 204.967 38.9159 C272.148 34.8726 904.683 -13.6138 919 5.50001 C747.485 17.2098 400.277 49.7284 376.202 78.1246 C346.107 113.62 890.747 169.937 948 238 L830 364" />
            <mask id="gradient-path-clip">
              <use xlinkHref="#gradient-path" strokeWidth="20" fill="none" stroke="white" />
            </mask>
          </defs>

          <path d="M443.643 197.35C443.643 177.986 397.214 110.307 374 78.8878C390.494 42.5788 893.023 8.10365 919.78 7.00338C941.186 6.12316 954.846 177.301 959 263C954.015 214.588 613.352 199.062 443.643 197.35Z" fill="url(#paint4_linear_1339_8161)" />
          <path d="M325.762 404.906C325.762 424.346 279.254 492.29 256 523.831C272.523 560.282 775.91 594.892 802.713 595.997C824.156 596.88 837.839 425.034 842 339C837.007 387.601 495.761 403.188 325.762 404.906Z" fill="url(#paint5_linear_1339_8161)" />
          <path d="M225.809 451.092C233.486 243.293 163.802 109.781 128 69C191.607 119.701 321.256 281.282 331 522" stroke="url(#paint6_linear_1339_8161)" />

          <path id="mainPath" d="M830 364 C772.747 432.063 228.107 489.88 258.202 525.375 C282.277 553.772 631.326 584.29 802.841 596 C777.683 617.179 145.148 567.795 77.9668 563.771 C10.7853 559.747 -92.3734 520.972 174.884 485.123 C402.789 454.552 561 256.474 561 245.5 C575 271.473 529.789 148.662 301.884 117.944 C34.6266 81.9221 137.785 42.9592 204.967 38.9159 C272.148 34.8726 904.683 -13.6138 919 5.50001 C747.485 17.2098 400.277 49.7284 376.202 78.1246 C346.107 113.62 890.747 169.937 948 238 L830 364" stroke="url(#mergedGradient)" />

          <g mask="url(#gradient-path-clip)" className="animated-gradient-els">
          </g>
        </svg>

        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-9 items-center max-w-[1040px] w-full mb-10 py-3 bg-gradient-to-r from-transparent via-[#000000] to-[#000000]/100">
          <h1 className="text-textButton font-bold sm:!text-[48px] !text-[24px]">AI-Powered Crypto Trading and Investment Platform</h1>
          <div className='flex gap-5'>
            <button
              className={`bg-textButton text-textWhiteButton hover:scale-105
border rounded-lg cursor-pointer transition-all duration-200 ease-in-out h-[46px] w-[170px] flex justify-center items-center  text-base  tracking-[0.32px] group relative`}
            >
              Get Started
            </button>
            <button
              className={` border-textHeader text-textFooterTitle bg-black hover:scale-105
border rounded-lg cursor-pointer transition-all duration-200 ease-in-out h-[46px] w-[170px] flex justify-center items-center  text-base  tracking-[0.32px] group relative`}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>


    </div >
  )
}

export default Hero