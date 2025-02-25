'use client'

import { useEffect, useRef } from "react";
import gsap from 'gsap'
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import Image from "next/image";

gsap.registerPlugin(MotionPathPlugin);

const DOTS_COUNT = 60;
const STROKE_WIDTH = 2;
const COLORS = ["#000000", "#FFFFFF"]

const createAnimatedGradient = (container, pathSelector) => {
  const gradientPath = document.querySelector(pathSelector);
  // Calculate the number of dots based on the path length.
  const baseNumberOfDots = Math.ceil(gradientPath.getTotalLength() / STROKE_WIDTH);
  const numberOfDots = baseNumberOfDots;

  for (let i = 0; i < DOTS_COUNT; i++) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    container.appendChild(circle);
    let radius = 0.5 * STROKE_WIDTH
    radius = Math.max(0, radius);

    if (i == DOTS_COUNT - 1) {
      gsap.set(circle, {
        attr: {
          cx: 0,
          cy: 0,
          r: 3,
          fill: "white",
        },

      });
      gsap.to(circle, {
        duration: 30,
        ease: 'none',
        repeat: -1,
        immediateRender: true,
        motionPath: {
          path: gradientPath
        }
      }).progress((i - 1) / numberOfDots);
      return;
    }
    gsap.set(circle, {
      attr: {
        cx: 0,
        cy: 0,
        r: radius,
        fill: gsap.utils.interpolate(COLORS, (i / DOTS_COUNT)),
        // filter: 'url(#blur)'
      },
      css: {
        filter: 'blur(1px)'
      }
    });

    gsap.to(circle, {
      duration: 30,
      ease: 'none',
      repeat: -1,
      immediteRender: true,
      motionPath: {
        path: gradientPath
      }
    }).progress(i / numberOfDots);
  }
};

const Hero = () => {
  useEffect(() => {
    const topLeftContainer = document.querySelector(".top_left_animated");
    const bottomLeftContainer = document.querySelector(".bottom_left_animated");
    const topRightContainer = document.querySelector(".top_right_animated");
    const bottomRightContainer = document.querySelector(".bottom_right_animated");

    if (topLeftContainer && bottomLeftContainer && topRightContainer && bottomRightContainer) {
      createAnimatedGradient(topLeftContainer, "#top_left_orbit");
      createAnimatedGradient(bottomLeftContainer, "#bottom_left_orbit");
      createAnimatedGradient(topRightContainer, "#top_right_orbit");
      createAnimatedGradient(bottomRightContainer, "#bottom_right_orbit");
    }
  }, []);

  return (
    <div className="hero-bg w-full pt-[80px] pb-[50px] flex flex-col justify-center items-center relative px-6 text-center min-h-screen">
      <div className='relative flex items-center justify-center w-full'>
        <svg width="1400" height="780" viewBox="-10 -10 1400 780" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
          <path d="M827.639 262.792C827.639 248.919 766.369 188.142 430.344 149.497C36.2967 104.179 188.395 55.1614 287.448 50.0747C386.501 44.9879 1319.11 -17.4401 1340.22 6.60627" stroke="url(#top_left)" />
          <path d="M655.384 497.324C655.384 511.197 594.048 571.974 257.656 610.619C-136.821 655.937 15.4431 704.955 114.604 710.041C213.765 715.128 1147.4 777.556 1168.53 753.51" stroke="url(#bottom_left)" />
          <path d="M1342.11 8.71669C1088.95 23.5136 573.745 62.0781 538.209 97.9607C493.789 142.814 1297.69 215.874 1382.19 301.881" stroke="url(#top_right)" />
          <path d="M1169.2 752.485C916.422 737.688 401.994 699.124 366.511 663.241C322.158 618.388 1124.85 545.328 1209.23 459.321" stroke="url(#bottom_right)" />
          <path d="M639.241 249.585C639.241 225.191 570.704 139.937 536.435 100.359C560.784 54.6208 1302.61 11.1928 1342.1 9.80677C1373.7 8.69796 1393.87 224.329 1400 332.283C1392.64 271.299 889.761 251.741 639.241 249.585Z" fill="url(#top_gradient)" />
          <path d="M466.425 511.617C466.425 536.011 397.787 621.265 363.468 660.843C387.853 706.581 1130.77 750.009 1170.32 751.395C1201.97 752.504 1222.16 536.873 1228.3 428.919C1220.94 489.903 717.314 509.461 466.425 511.617Z" fill="url(#bottom_gradient)" />
          <path d="M317.359 567.707C328.614 306.219 226.454 138.211 173.967 86.8938C267.217 150.694 457.288 354.023 471.573 656.935" stroke="url(#side_gradient)" />
          <defs>
            <linearGradient id="top_left" x1="798.41" y1="-64.6079" x2="768.161" y2="263.812" gradientUnits="userSpaceOnUse">
              <stop stop-color="white" stop-opacity="0" />
              <stop offset="0.5" stop-color="white" />
              <stop offset="1" stop-color="white" stop-opacity="0" />
            </linearGradient>
            <linearGradient id="bottom_left" x1="626.124" y1="824.724" x2="595.907" y2="496.299" gradientUnits="userSpaceOnUse">
              <stop stop-color="white" stop-opacity="0" />
              <stop offset="0.5" stop-color="white" />
              <stop offset="1" stop-color="white" stop-opacity="0" />
            </linearGradient>
            <linearGradient id="top_right" x1="1218.6" y1="-8.39227" x2="1202.52" y2="328.107" gradientUnits="userSpaceOnUse">
              <stop stop-color="white" stop-opacity="0" />
              <stop offset="0.5" stop-color="white" />
              <stop offset="1" stop-color="white" stop-opacity="0" />
            </linearGradient>
            <linearGradient id="bottom_right" x1="1045.88" y1="769.594" x2="1029.78" y2="433.098" gradientUnits="userSpaceOnUse">
              <stop stop-color="white" stop-opacity="0" />
              <stop offset="0.5" stop-color="white" />
              <stop offset="1" stop-color="white" stop-opacity="0" />
            </linearGradient>
            <linearGradient id="top_gradient" x1="968.218" y1="9.80251" x2="968.218" y2="332.283" gradientUnits="userSpaceOnUse">
              <stop stop-color="white" stop-opacity="0.08" />
              <stop offset="1" stop-color="#060606" stop-opacity="0" />
            </linearGradient>
            <linearGradient id="bottom_gradient" x1="795.886" y1="751.399" x2="795.886" y2="428.919" gradientUnits="userSpaceOnUse">
              <stop stop-color="white" stop-opacity="0.08" />
              <stop offset="1" stop-color="#060606" stop-opacity="0" />
            </linearGradient>
            <linearGradient id="side_gradient" x1="455.881" y1="548.752" x2="283.06" y2="49.1564" gradientUnits="userSpaceOnUse">
              <stop stop-color="white" stop-opacity="0" />
              <stop offset="1" stop-color="white" stop-opacity="0.4" />
            </linearGradient>

            <path d="M827.639 262.792C827.639 248.919 766.369 188.142 430.344 149.497C36.2967 104.179 188.395 55.1614 287.448 50.0747C386.501 44.9879 1319.11 -17.4401 1340.22 6.60627" id="top_left_orbit" />
            <path d="M655.384 497.324C655.384 511.197 594.048 571.974 257.656 610.619C-136.821 655.937 15.4431 704.955 114.604 710.041C213.765 715.128 1147.4 777.556 1168.53 753.51" id="bottom_left_orbit" />
            <path d="M1342.11 8.71669C1088.95 23.5136 573.745 62.0781 538.209 97.9607C493.789 142.814 1297.69 215.874 1382.19 301.881" id="top_right_orbit" />
            <path d="M1169.2 752.485C916.422 737.688 401.994 699.124 366.511 663.241C322.158 618.388 1124.85 545.328 1209.23 459.321" id="bottom_right_orbit" />

            <filter id="blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
            </filter>

            <mask id="top_left_gradient_path">
              <use xlinkHref="#top_left_orbit" strokeWidth="40" fill="none" stroke="white" />
            </mask>
            <mask id="bottom_left_gradient_path">
              <use xlinkHref="#bottom_left_orbit" strokeWidth="40" fill="none" stroke="white" />
            </mask>
            <mask id="top_right_gradient_path">
              <use xlinkHref="#top_right_orbit" strokeWidth="40" fill="none" stroke="white" />
            </mask>
            <mask id="bottom_right_gradient_path">
              <use xlinkHref="#bottom_right_orbit" strokeWidth="40" fill="none" stroke="white" />
            </mask>

          </defs>

          <g mask="url(#top_left_gradient_path)" className="pl-10 top_left_animated">
          </g>
          <g mask="url(#bottom_left_gradient_path)" className="bottom_left_animated">
          </g>
          <g mask="url(#top_right_gradient_path)" className="pl-10 top_right_animated">
          </g>
          <g mask="url(#bottom_right_gradient_path)" className="bottom_right_animated">
          </g>
        </svg>

        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-16 items-center max-w-[1040px] w-full mb-10 py-3 px-10">
          <h1 className="text-textButton font-bold sm:!text-[48px] !text-[24px]">AI-Powered Crypto Trading and Investment Platform</h1>
          <div className='flex gap-5'>
            <button
              className={`bg-textButton text-textWhiteButton hover:scale-105 border rounded-lg cursor-pointer transition-all duration-200 ease-in-out h-[46px] w-[170px] flex justify-center items-center  text-base  tracking-[0.32px] group relative`}
            >
              Get Started
            </button>
            <button
              className={` border-textHeader text-textFooterTitle bg-black hover:scale-105 border rounded-lg cursor-pointer transition-all duration-200 ease-in-out h-[46px] w-[170px] flex justify-center items-center  text-base  tracking-[0.32px] group relative`}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
      <Image
        src="/grid.png"
        alt="grid"
        width={1920}
        height={1080}
        className="absolute bottom-0 left-0 right-0 object-cover w-full h-auto"
      />
      <Image
        src="/hero-light.png"
        alt="hero"
        width={559}
        height={465}
        className="w-[500px] h-auto -z-[1] object-cover absolute top-0 left-0 filter blur-xl hero-light"
      />
      <Image
        src="/hero-light-right.png"
        alt="hero"
        width={559}
        height={465}
        className="w-[500px] h-auto -z-[1] object-cover absolute top-0 right-0 filter blur-xl hero-light1"
      />
    </div >
  )
}

export default Hero