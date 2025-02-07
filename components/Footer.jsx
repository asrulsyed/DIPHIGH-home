'use client'

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FaTelegram } from "react-icons/fa"
import { FaDiscord, FaInstagram, FaLinkedin } from "react-icons/fa6"

const Footer = () => {
  const [dots, setDots] = useState([]);

  const colors = [
    'rgb(255, 255, 255, 0.2)',
    'rgb(255, 255, 255, 0.5)',
    'rgb(255, 255, 255, 1)',
  ];

  useEffect(() => {
    const numberOfDots = 20;
    const newDots = Array.from({ length: numberOfDots }, (_, index) => ({
      id: index,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
    }));
    setDots(newDots);

    const interval = setInterval(() => {
      setDots(prevDots => {
        const updatedDots = [...prevDots];
        const randomIndex = Math.floor(Math.random() * numberOfDots);
        updatedDots[randomIndex] = {
          ...updatedDots[randomIndex],
          delay: Math.random() * 2,
        };
        return updatedDots;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="max-w-[1140px]">
      <div className="flex flex-col items-center pt-[160px] footer-border mb-[80px] relative px-10">
        <img src="/text.svg" alt="" className="object-cover relative z-10" />
        <div className="w-full h-full overflow-hidden absolute bottom-0 pointer-events-none">
          {dots.map((dot) => (
            <div
              key={dot.id}
              className="animate-float w-1 h-1 absolute rounded-full"
              style={{
                left: `${dot.x}%`,
                bottom: '0',
                backgroundColor: dot.color,
                animation: `float 3s infinite ease-out`,
                animationDelay: `${dot.delay}s`,
                opacity: 0,
                zIndex: -1,
              }}
            />
          ))}
        </div>
      </div>
      <div className="grid gap-10 px-4 lg:grid-cols-2 sm:px-10">
        <div className="flex flex-col gap-7 pr-[98px] items-start text-left text-textHeader text-base ">
          <Link href={'/'}>
            <Image
              src={"/logo.svg"}
              width={114}
              height={38}
              alt="log"
              className="cursor-pointer h-[38px] w-auto"
            />
          </Link>
          <p className="leading-7 text-justify">To develop an advanced AI-powered crypto trading platform where the platform conducts trading on behalf of users, leveraging Bitcoin dominance trades and advanced AI algorithms to maximize profits.</p>
          <div className="text-textFooterTitle flex items-center gap-4 font-bold">
            <span>Follow Us:</span>
            <FaLinkedin className="w-[20px] h-[20px]" />
            <FaInstagram className="w-[20px] h-[20px]" />
            <FaTelegram className="w-[20px] h-[20px]" />
            <FaDiscord className="w-[20px] h-[20px]" />
          </div>
        </div>
        <div className="grid grid-cols-3">
          <div className="text-textHeader space-y-5 text-base text-left">
            <p className="text-textFooterTitle font-bold">Products</p>
            <p>Terminal</p>
            <p>Perpetual DEX</p>
            <p>Bridge</p>
            <p>Launchpad</p>
          </div>
          <div className="text-textHeader space-y-5 text-base text-left">
            <p className="text-textFooterTitle font-bold">Resource</p>
            <p>Documentation</p>
            <p>Blogs</p>
            <p>Bridge</p>
            <p>Launchpad</p>
          </div>
          <div className="text-textHeader space-y-5 text-base text-left">
            <p className="text-textFooterTitle font-bold">Regal</p>
            <p>Privacy & Policy</p>
            <p>Terms & Conditios</p>
            <p>Cookie Policy</p>
          </div>
        </div>
      </div>
      <div className="border-t-[0.5px] border-borderFooter mt-[56px] mb-5" />
      <div className="text-textHeader flex flex-col gap-6 px-4 text-base text-justify">
        <p>Copyright &copy; 2025 DIPHIGH. All rights reserved.</p>
        <p className="text-xs">This content is for informational purposes only and is not legal, tax, investment, financial, or other advice. You should not take, or refrain from taking, any action based on any information contained herein, or any other information that we make available at any time, including blog posts, data, articles, links to third-party content, discord content, news feeds, tutorials, tweets, and videos. Before you make any financial, legal, technical, or other decisions, you should seek independent professional advice from a licensed and qualified individual in the area for which such advice would be appropriate. This information is not intended to be comprehensive or address all aspects of Sharpe Labs Ltd or its products. You shall not purchase or otherwise acquire any of our token products if you are: a citizen, resident (tax or otherwise), green card holder, incorporated in, owned or controlled by a person or entity in, located in, or have a registered office or principal place of business in the U.S. (a "U.S. Person"), or if you are a person in any jurisdiction in which such offer, sale, and/or purchase of any of our token products is unlawful, prohibited, or unauthorized (together with U.S. Person, a "Restricted Person"). The term "Restricted Person" includes, but is not limited to, any natural person residing in, or any firm, company, partnership, trust, corporation, entity, government, state or agency of a state, or any other incorporated or unincorporated body or association, association or partnership (whether or not having separate legal personality) that is established and/or lawfully existing under the laws of, a jurisdiction in which such offer, sale, and/or purchase of any of our token products is unlawful, prohibited, or unauthorized). You shall not resell or otherwise transfer any of our token products to any Restricted Person. The transfer or resale of any of our token products to any Restricted Person is not permitted. You shall read the Terms of Service and use our Website in compliance with the Terms of Service.</p>
      </div>
    </footer>
  )
}

export default Footer