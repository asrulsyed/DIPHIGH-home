'use client'

import Image from "next/image";

function FeatureCard({ icon, title, description, rotationClass = '' }) {
  return (
    <div className={`absolute bg-gradient-to-b from-[#141414] to-[#0B0B0B] rounded-xl shadow-xl border border-[#252525] w-80 ${rotationClass} divide-y-[1px] divide-[#252525]`}>
      <div className="flex items-center gap-3 px-5 py-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-bl from-[#FFFFFF] to-[#060606]  relative overflow-hidden">
          <div className="absolute inset-0 bg-[#0D0D0D] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[47px] h-[47px] flex items-center justify-center">
            <Image
              src={`/${icon}.png`}
              width={28}
              height={28}
              alt={title}
              className="w-10 h-10 mx-auto my-auto"
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
    <div className="relative flex items-center justify-center w-32 h-32 border-2 border-gray-700 shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl">
      <Image
        src="/features.png"
        alt="features"
        width={288}
        height={288}
        className="object-cover w-full h-auto"
      />
    </div>
  );
}

const Features = () => {
  return (
    <div className="max-w-[1040px] w-full flex flex-col items-center mb-[107px]">
      <div className="font-medium text-[40px] text-textFooterTitle flex flex-wrap justify-center  px-4">
        What are the&nbsp;
        <div className="relative">
          <span className="text-shadow">Features</span>
          <span className="absolute top-0 left-0 text-white">Features</span>
        </div>
        &nbsp;?
      </div>
      <div className="flex items-center justify-center w-full p-8">
        <div className="relative max-w-5xl w-full h-[800px]">
          


          {/* Content */}
          <div className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            {/* Center logo */}
            <div className="relative z-20" style={{ animation: 'glowPulse 2s ease-in-out infinite' }}>
              <CenterLogo />
            </div>

            {/* Rotating cards */}
            <div className="flex items-center justify-center">

            </div>
          </div>
          {/* Content */}
          <div className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            {/* Center logo */}
            <div className="relative z-20" style={{ animation: 'glowPulse 2s ease-in-out infinite' }}>
              <CenterLogo />
            </div>

            {/* Rotating cards */}
            <div className="absolute flex items-center justify-center text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <FeatureCard
                icon='driven'
                title="AI Driven Trading"
                description="Automated trading based on Bitcoin dominance trends."
                rotationClass="rotate-1"
              />
              <FeatureCard
                icon="profit"
                title="Profit Sharing"
                description="Tiered staking system with attractive APY rates."
                rotationClass="rotate-2"
              />
              <FeatureCard
                icon='driven'
                title="AI Driven Trading"
                description="Automated trading based on Bitcoin dominance trends."
                rotationClass="rotate-3"
              />
              <FeatureCard
                icon='driven'
                title="AI Driven Trading"
                description="Automated trading based on Bitcoin dominance trends."
                rotationClass="rotate-4"
              />
              <FeatureCard
                icon='driven'
                title="AI Driven Trading"
                description="Automated trading based on Bitcoin dominance trends."
                rotationClass="rotate-5"
              />
              <FeatureCard
                icon='driven'
                title="AI Driven Trading"
                description="Automated trading based on Bitcoin dominance trends."
                rotationClass="rotate-6"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Features