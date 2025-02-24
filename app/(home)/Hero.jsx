'use client'

import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();

  return (
    <div className="hero-bg max-w-[1154px] w-full mt-[50px] mb-[120px] flex flex-col items-center relative px-6 text-center">
      <svg
        className="w-full h-full"
        viewBox="0 0 955 150"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top curved line */}
        <path
          className="animate-flow-1"
          d="M567.345 208.5C567.345 197.473 525.789 149.162 297.884 118.444C30.6266 82.4221 133.785 43.4592 200.967 39.4159C268.148 35.3726 900.683 -14.2499 915 4.86396"
          stroke="url(#paint0)"
          fill="none"
        />

        {/* Middle curved line */}
        <path
          className="animate-flow-2"
          d="M916.841 6.5C745.326 18.2098 396.277 48.7284 372.202 77.1246C342.107 112.62 886.747 170.437 944 238.5"
          stroke="url(#paint1)"
          fill="none"
        />

        {/* Glowing shapes */}
        <path
          className="animate-glow-1"
          d="M439.643 197.85C439.643 178.486 393.214 110.807 370 79.3878C386.494 43.0788 889.023 8.60365 915.78 7.50338C937.186 6.62316 950.846 177.801 955 263.5C950.015 215.088 609.352 199.562 439.643 197.85Z"
          fill="url(#paint3)"
        />

        <defs>
          <linearGradient id="paint0" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="paint1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="paint2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="paint3" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#060606" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="paint4" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#060606" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex flex-col gap-9 items-center max-w-[740px] mb-10">
        <h1 className="text-textButton font-bold sm:!text-[48px] !text-[24px]">AI-Powered Crypto Trading and Investment Platform</h1>
        <div className='flex gap-5'>
          <button
            className={`bg-textButton text-textWhiteButton hover:scale-105
border rounded-lg cursor-pointer transition-all duration-200 ease-in-out h-[46px] w-[170px] flex justify-center items-center  text-base  tracking-[0.32px] group relative`}
          >
            Get Started
          </button>
          <button
            className={` border-textHeader text-textFooterTitle bg-transparent hover:scale-105
border rounded-lg cursor-pointer transition-all duration-200 ease-in-out h-[46px] w-[170px] flex justify-center items-center  text-base  tracking-[0.32px] group relative`}
          >
            Learn More
          </button>
        </div>
      </div>
      <svg
        className="w-full h-full rotate-180"
        viewBox="0 0 955 150"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top curved line */}
        <path
          className="animate-flow-1"
          d="M567.345 208.5C567.345 197.473 525.789 149.162 297.884 118.444C30.6266 82.4221 133.785 43.4592 200.967 39.4159C268.148 35.3726 900.683 -14.2499 915 4.86396"
          stroke="url(#paint0)"
          fill="none"
        />

        {/* Middle curved line */}
        <path
          className="animate-flow-2"
          d="M916.841 6.5C745.326 18.2098 396.277 48.7284 372.202 77.1246C342.107 112.62 886.747 170.437 944 238.5"
          stroke="url(#paint1)"
          fill="none"
        />

        {/* Glowing shapes */}
        <path
          className="animate-glow-1"
          d="M439.643 197.85C439.643 178.486 393.214 110.807 370 79.3878C386.494 43.0788 889.023 8.60365 915.78 7.50338C937.186 6.62316 950.846 177.801 955 263.5C950.015 215.088 609.352 199.562 439.643 197.85Z"
          fill="url(#paint3)"
        />

        <defs>
          <linearGradient id="paint0" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="paint1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="paint2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="paint3" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#060606" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="paint4" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#060606" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default Hero