'use client'

import Image from "next/image";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const FAQ = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      title: "Create Your Account",
      content: ["Create your account"],
    },
    {
      id: 2,
      title: "Acquire DIPHIGH Tokens",
      content: ["Acquire DIPHIGH Tokens"],
    },
    {
      id: 3,
      title: "Select Your Staking Plan",
      content: [
        "Choose staking duration (1, 3, 12 months)",
        "Higher lock-in periods offer better APY rate",
        "Minimum staking requirement: [X] tokens"
      ],
    },
    {
      id: 4,
      title: "Activate AI Trading",
      content: ["Activate AI Trading"],
    },
    {
      id: 5,
      title: "Track & Earn Rewards",
      content: ["Track & Earn Rewards"],
    },
  ]

  const handleClick = (index) => {
    setOpenFaq(index === openFaq ? null : index);
  }

  return (
    <div className="flex flex-col items-center gap-[74px] mb-[135px] w-full px-4 sm:px-6 lg:px-8">
      <div className="font-medium text-[40px] text-textFooterTitle flex mb-[100px] flex-wrap justify-center items-center">
        How DIPHIGH Works in 5 Simple&nbsp;
        <div className="relative">
          <span className="text-shadow">Steps</span>
          <span className="absolute top-0 left-0 text-white">Steps</span>
        </div>
      </div>
      <div className="max-w-[1040px] w-full step-bg grid grid-cols-2 items-center min-h-[700px]">
        <div>
          {faqs.map((faq, index) => (
            <div className="w-full" key={faq.id}>
              <button
                className="w-full flex justify-between items-center gap-2 bg-gradient-to-br from-[#000000] to-[#0F0F0F] border-none transition-all duration-200 ease-in-out cursor-pointer sm:px-10 sm:py-5 xs:px-6 xs:py-4 font-medium text-2xl text-white"
                onClick={() => handleClick(index)}
                aria-expanded={openFaq === index}
              >
                <div className="flex items-center gap-7">
                  <div className="radial-number-bg rounded-[4px] flex justify-center items-center ">{index + 1}</div>
                  <span className="">{faq.title}</span>
                </div>
                <FaChevronDown size={24} color="white"
                  className={`transition-transform duration-200 sm:w-5 xs:w-4 ${openFaq === index ? 'transform rotate-180' : ''
                    }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ease-in-out bg-gradient-to-r from-[#000000] via-[#000000] to-[#000000]/0 ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 '
                  }`}
              >
                <ul className="pl-20 list-disc list-outside">
                  {faq.content?.map((c, index) => (
                    <li key={index} className="pl-8 mt-4 mb-4 leading-6 bg-transparent text-textFooterTitle">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Image
            src={"/register.png"}
            width={403}
            height={530}
            alt="Register"
            className=""
          />
        </div>
      </div>
    </div>
  )
}

export default FAQ

