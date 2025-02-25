'use client'

import Image from "next/image";

function FeatureCard({ icon, title, description, rotationClass = '' }) {
  return (
    <div className={`absolute bg-gradient-to-b from-[#141414] to-[#0B0B0B] rounded-xl shadow-xl border border-[#252525] w-80 ${rotationClass} divide-y-[1px] divide-[#252525]`}>
      <div className="flex items-center gap-3 px-5 py-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-bl from-[#FFFFFF] via-[#060606] to-[#060606]  relative overflow-hidden">
          <div className="absolute inset-0 bg-[#0D0D0D] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[46px] h-[46px] flex items-center justify-center">
            <Image
              src={`/${icon}.png`}
              width={43}
              height={44}
              alt={title}
              className="my-auto mx-auto w-10 h-auto"
            />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-[#E2E2E2]">{title}</h3>
      </div>
      <p className="text-lg text-[#999999] font-medium px-8 py-4 text-justify">{description}</p>
    </div>
  );
}

function CenterLogo() {
  return (
    <div className="from-gray-900 to-gray-800 w-32 h-32 relative flex justify-center items-center bg-gradient-to-br rounded-xl border-2 border-gray-700 shadow-2xl">
      <Image
        src="/features.png"
        alt="features"
        width={288}
        height={288}
        className="w-full h-auto object-cover"
      />
    </div>
  );
}

const Features = () => {
  return (
    <div className="hero-bg max-w-[1154px] w-full pt-[50px] pb-[50px] flex flex-col justify-center items-center relative px-6 text-center min-h-screen">
      <div className="font-medium text-[40px] text-textFooterTitle flex flex-wrap justify-center  px-4">
        What are the&nbsp;
        <div className="relative">
          <span className="text-shadow">Features</span>
          <span className="absolute top-0 left-0 text-white">Features</span>
        </div>
        &nbsp;?
      </div>
      <div className="w-full flex justify-center items-center p-8">
        <div className="relative max-w-5xl w-full h-[600px]">
          {/* Background  circle */}
          <div className="-translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-[#000000] via-[#FFFFFF] to-[#000000] z-0 w-[600px] h-[600px] items-center absolute inset-0 top-1/2 left-1/2 flex justify-center rounded-full">
            <div className="-translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-[#000000] via-[#090909] to-[#000000] z-0 w-[598px] h-[598px] items-center absolute inset-0 top-1/2 left-1/2 flex justify-center rounded-full">
              <div className="-translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-[#000000] via-[#FFFFFF] to-[#000000] z-0 w-[400px] h-[400px] items-center absolute inset-0 top-1/2 left-1/2 flex justify-center rounded-full">
                <div className="-translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-[#000000] via-[#090909] to-[#000000] z-0 w-[398px] h-[398px] items-center absolute inset-0 top-1/2 left-1/2 flex justify-center rounded-full">
                </div>
              </div>
            </div>
          </div>
          {/* Content */}
          <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 flex justify-center items-center">
            {/* Center logo */}
            <div className="relative z-20" style={{ animation: 'glowPulse 2s ease-in-out infinite' }}>
              <CenterLogo />
            </div>

            {/* Rotating cards */}
            <div className="flex justify-center items-center">

            </div>
          </div>
          {/* Content */}
          <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 flex justify-center items-center">
            {/* Center logo */}
            <div className="relative z-20" style={{ animation: 'glowPulse 2s ease-in-out infinite' }}>
              <CenterLogo />
            </div>

            {/* Rotating cards */}
            <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 flex justify-center items-center text-white">
              <FeatureCard
                icon='driven'
                title="AI Driven Trading"
                description="Automated trading based on Bitcoin dominance trends."
                rotationClass="feature-1"
              />
              <FeatureCard
                icon="profit"
                title="Profit Sharing"
                description="Tiered staking system with attractive APY rates."
                rotationClass="feature-2"
              />
              <FeatureCard
                icon='driven'
                title="AI Driven Trading"
                description="Automated trading based on Bitcoin dominance trends."
                rotationClass="feature-3"
              />
              <FeatureCard
                icon='driven'
                title="AI Driven Trading"
                description="Automated trading based on Bitcoin dominance trends."
                rotationClass="feature-4"
              />
              <FeatureCard
                icon='driven'
                title="AI Driven Trading"
                description="Automated trading based on Bitcoin dominance trends."
                rotationClass="feature-5"
              />
              <FeatureCard
                icon='driven'
                title="AI Driven Trading"
                description="Automated trading based on Bitcoin dominance trends."
                rotationClass="feature-6"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Features