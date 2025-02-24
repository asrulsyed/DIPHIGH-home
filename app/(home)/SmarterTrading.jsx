'use client'

import Image from "next/image";
import { useEffect, useState } from "react"
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";

const SmarterTrading = () => {
  const benefits = [
    {
      id: 1,
      title: "Link Your Wallet",
      content: "Securely connect your wallet to access DIPHIGH staking. Securely connect your wallet to access DIPHIGH staking. Securely connect your wallet to access DIPHIGH staking.",
      // image: "",
    },
    {
      id: 2,
      title: "Lock Your DIPHIGH Tokens",
      content: "Securely connect your wallet to access DIPHIGH staking. Securely connect your wallet to access DIPHIGH staking. Securely connect your wallet to access DIPHIGH staking.",
      // image: "",
    },
    {
      id: 3,
      title: "Earn 20% APR + Benefits",
      content: "Securely connect your wallet to access DIPHIGH staking. Securely connect your wallet to access DIPHIGH staking. Securely connect your wallet to access DIPHIGH staking.",
      // image: "",
    },
    {
      id: 4,
      title: "Link Your Wallet",
      content: "Securely connect your wallet to access DIPHIGH staking. Securely connect your wallet to access DIPHIGH staking. Securely connect your wallet to access DIPHIGH staking.",
      // image: "",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeProgress, setTimeProgress] = useState(0);

  const getStyles = (order) => {
    return {
      zIndex: -order,
      transform: `
        translateX(-50%)
        translateY(${-28 * order}px)
        scale(${1 - (0.05 * order)})      
      `,
      transition: 'all 0.5s ease-in-out',
      opacity: order === 3 ? 0 : 1,
    }
  }

  const getOrder = (index) => {
    return (index - currentIndex + benefits.length) % benefits.length;
  }

  const handleButton = (i) => {
    setCurrentIndex((prev) => (prev + i) % benefits.length);
  }

  useEffect(() => {
    setTimeProgress(0)
    const interval = setInterval(() => {
      setTimeProgress((prev) => {
        if (prev >= 100) {
          handleButton(1);
          return 0;
        } return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [currentIndex])

  return (
    <div className="flex flex-col items-center mb-[135px] w-full">
      <div className="font-medium text-[40px] text-textFooterTitle flex mb-[100px] flex-wrap justify-center items-center">
        The Future of&nbsp;
        <div className="relative">
          <span className="text-shadow">Smarter Trading</span>
          <span className="absolute top-0 left-0 text-white">Smarter Trading</span>
        </div>
        &nbsp;
        <Image
          src={"/logo.svg"}
          width={100}
          height={38}
          alt="log"
          className="cursor-pointer h-[60px] w-auto"
        />
      </div>

      <div className="max-w-[1040px] w-full grid grid-cols-2 gap-5">
        <div className="col-span-2 bg-[#DEDEDE]/5 border border-[#777777]/50 rounded-3xl grid grid-cols-2 gap-5 items-center">
          <div className="px-8 py-[60px]">
            <Image
              src={"/ecosystem.png"}
              width={399}
              height={214}
              alt="Powering the DIPHIGH Ecosystem"
              className="object-cover w-full h-auto"
            />
          </div>
          <div className="flex flex-col px-8 gap-9 py-[60px]">
            <Image
              src={"/native-token.png"}
              width={247}
              height={12}
              alt="Native Token"
              className=""
            />
            <span className="text-[32px] text-white font-semibold text-justify">Powering the DIPHIGH Ecosystem</span>
            <span className="text-xl text-justify text-textHeader">Our native token fuels platform operations, enabliing staking, governance participation, and profit-sharing. Features deflationary mechanics to enhance long-term value.</span>
          </div>
        </div>
        <div className="bg-[#DEDEDE]/5 border border-[#777777]/50 rounded-3xl flex flex-col gap-12 px-8 py-[60px]">
          <div className="flex items-center justify-center max-h-[300px] h-full">
            <Image
              src={"/transparency.png"}
              width={434}
              height={263}
              alt="Security and Transparency"
              className="object-cover w-full h-auto"
            />
          </div>
          <Image
            src={"/security.png"}
            width={269}
            height={12}
            alt="Security and Transparency"
            className=""
          />
          <span className="text-[32px] text-white font-semibold text-justify">Your Trust, Our Priority</span>
          <span className="text-xl text-justify text-textHeader">DIPHIGH ensures secure fund pooling and transparent trading activities. Regular performance reports keep you informed, building a foundation of trust in out AI-driven platform</span>
        </div>

        <div className="bg-[#DEDEDE]/5 border border-[#777777]/50 rounded-3xl flex flex-col gap-12 px-8 py-[60px]">
          <div className="flex items-center justify-center max-h-[300px] h-full">
            <Image
              src={"/gover.png"}
              width={434}
              height={263}
              alt="Governance"
              className="object-cover w-full h-auto"
            />
          </div>
          <Image
            src={"/governance.png"}
            width={119}
            height={12}
            alt="Security and Transparency"
            className=""
          />
          <span className="text-[32px] text-white font-semibold text-justify">Your Voice Matters</span>
          <span className="text-xl text-justify text-textHeader">As a token holder, you have the power to shape DIPHIGH's future. Participate in key platform decisions through our decentralized voting system.</span>
        </div>
        <div className="col-span-2 bg-[#DEDEDE]/5 border border-[#777777]/50 rounded-3xl grid grid-cols-2 gap-5 items-center">
          <div className="px-8 py-[60px]">
            <Image
              src={"/gamification.png"}
              width={686}
              height={509}
              alt="Gamification"
              className="object-cover h-full"
            />
          </div>
          <div className="flex flex-col px-8 gap-9 py-[60px]">
            <Image
              src={"/rewards.png"}
              width={247}
              height={12}
              alt="Rewards"
              className=""
            />
            <span className="text-[32px] text-white font-semibold text-justify">Engage, Compete, and Earn</span>
            <span className="text-xl text-justify text-textHeader">Our native token fuels platform operations, enabling staking, governance participation, and profit-sharing. Features deflationary mechanics to enhance long-term value.</span>
          </div>
        </div>
      </div>


    </div>
  )
}

export default SmarterTrading