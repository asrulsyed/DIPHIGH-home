'use client'

import { useEffect, useState } from "react"
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";

const Benefits = () => {
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
      <div className="font-medium text-[40px] text-textFooterTitle flex mb-[100px] flex-wrap justify-center">
        What is&nbsp;
        <div className="relative">
          <span className="text-shadow">Benefit</span>
          <span className="absolute top-0 left-0 text-white">Benefit</span>
        </div>
      </div>

      <div className="w-full flex flex-col items-center px-4">
        <div className="relative w-full xl:max-w-[850px] max-w-[750px]">
          <div className="invisible flex flex-col items-center gap-[20px] xl:grid grid-cols-2 w-full rounded-t-2xl bg-textWhiteButton border-[0.5px] border-textHeader max-xl:pb-[152px] p-[58px] ">
            <div className="flex flex-col gap-8 max-xl:items-center max-xl:max-w-[350px]">
              <p className="text-xl font-semibold text-justify text-white">{benefits[(currentIndex + benefits.length) % benefits.length].title}</p>
              <p className="text-textHeader text-sm leading-6 text-center xl:text-justify">{benefits[(currentIndex + benefits.length) % benefits.length].content}</p>
            </div>
            <div className="w-full h-full flex justify-center items-center max-xl:order-first">
              <div className="w-10 h-10 bg-white blur-2xl" />
            </div>
          </div>
          {benefits.map((benefit, index) => (
            <div
              key={benefit.id}
              style={getStyles(getOrder(index))}
              className={`flex flex-col items-center gap-[20px] xl:grid grid-cols-2 w-full rounded-t-2xl bg-textWhiteButton border-[0.5px] border-textHeader max-xl:pb-[152px] p-[58px] absolute top-0 left-1/2`}
            >
              <div className="flex flex-col gap-8 max-xl:items-center max-xl:max-w-[350px]">
                <p className="text-xl font-semibold text-justify text-white">{benefit.title}</p>
                <p className="text-textHeader text-sm leading-6 text-center xl:text-justify">{benefit.content}</p>
              </div>
              <div className="w-full h-full flex justify-center items-center max-xl:order-first">
                <div className="w-10 h-10 bg-white blur-2xl" />
              </div>
            </div>
          ))}
          <div className="absolute h-1 bottom-0 left-0 right-0 bg-textHeader flex flex-col items-start justify-center max-xl:max-w-[200px] max-xl:left-1/2 max-xl:-translate-x-1/2 max-xl:-translate-y-7">
            <div className="duration-50 transform h-full bg-white transition-all ease-linear" style={{ width: `${timeProgress}%` }} />
          </div>
          <div className="absolute flex gap-10 max-xl:-translate-x-1/2 max-xl:bottom-16 max-xl:left-1/2 xl:-left-10 xl:-translate-x-full xl:-translate-y-1/2 xl:top-1/2 xl:flex-col">
            <button onClick={() => handleButton(1)} className="w-9 h-9 flex items-center justify-center bg-textWhiteButton border-[0.5px] border-textHeader rounded-sm hover:bg-bgButtonHover text-textHeader hover:text-white transition-colors duration-150 ease-in-out cursor-pointer">
              <MdOutlineKeyboardArrowUp size={20} />
            </button>
            <button onClick={() => handleButton(-1)} className="w-9 h-9 flex items-center justify-center bg-textWhiteButton border-[0.5px] border-textHeader rounded-sm hover:bg-bgButtonHover text-textHeader hover:text-white transition-colors duration-150 ease-in-out cursor-pointer">
              <MdOutlineKeyboardArrowDown size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="z-30 mt-[-53px] flex w-full scale-y-[-1] flex-row items-start text-border">
        <div className="absolute -left-[28px] h-[53px] w-[107px] -skew-x-[45deg] rounded-b-base bg-black lg:hidden">
        </div>
        <svg viewBox="0 0 113 54" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[113px] scale-x-[-1] text-textHeader">
          <path d="M0.872559 1C5.11602 1 9.18569 2.68571 12.1863 5.68629L55.3137 48.8137C58.3143 51.8143 62.384 53.5 66.6274 53.5H113" stroke="currentColor" strokeLinecap="round">
          </path>
        </svg>
        <div className="border-textHeader h-full flex-1 border-t">
        </div>
        <svg viewBox="0 0 113 54" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[113px] text-textHeader">
          <path d="M0.872559 1C5.11602 1 9.18569 2.68571 12.1863 5.68629L55.3137 48.8137C58.3143 51.8143 62.384 53.5 66.6274 53.5H113" stroke="currentColor" strokeLinecap="round">
          </path></svg><div className="absolute -right-[28px] h-[53px] w-[107px] skew-x-[45deg] rounded-b-base bg-black lg:hidden">
        </div>
      </div>
    </div>
  )
}

export default Benefits