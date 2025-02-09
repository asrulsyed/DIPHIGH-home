'use client'

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const FAQ = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      title: "How long is the lockup period and what happens after?",
      content: "The minimum staking lockup period is 60 days. During this period, staked tokens and earned rewards cannot be unstaked. After the 60-day lockup period expires, users can unstake their DIPHIGH at any time.",
    },
    {
      id: 2,
      title: "How long is the lockup period and what happens after?",
      content: "The minimum staking lockup period is 60 days. During this period, staked tokens and earned rewards cannot be unstaked. After the 60-day lockup period expires, users can unstake their DIPHIGH at any time.",
    },
    {
      id: 3,
      title: "How long is the lockup period and what happens after?",
      content: "The minimum staking lockup period is 60 days. During this period, staked tokens and earned rewards cannot be unstaked. After the 60-day lockup period expires, users can unstake their DIPHIGH at any time.",
    },
    {
      id: 4,
      title: "How long is the lockup period and what happens after?",
      content: "The minimum staking lockup period is 60 days. During this period, staked tokens and earned rewards cannot be unstaked. After the 60-day lockup period expires, users can unstake their DIPHIGH at any time.",
    },
  ]

  const handleClick = (index) => {
    setOpenFaq(index === openFaq ? null : index);
  }

  return ( 
    <div className="flex flex-col items-center gap-[74px] mb-[135px] w-full px-4 sm:px-6 lg:px-8">
      <div className="font-medium text-[40px] text-textFooterTitle text-center">
        Frequently Asked Questions
      </div>
      <div className="max-w-[720px] divide-y divide-textHeader w-full">
        {faqs.map((faq, index) => (
          <div className="w-full" key={faq.id}>
            <button
              className="bg-textWhiteButton w-full flex justify-between items-center gap-2 px-4 py-6 border-none transition-all duration-200 ease-in-out cursor-pointer sm:px-3 xs:px-2"
              onClick={() => handleClick(index)}
              aria-expanded={openFaq === index}
            >
              <span className="text-xl font-medium text-white">{faq.title}</span>
              <FaChevronDown size={24} color="white"
                className={`transition-transform duration-200 sm:w-5 xs:w-4 ${openFaq === index ? 'transform rotate-180' : ''
                  }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ease-in-out ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
              <div className="px-7 ml-4 mb-12 mt-4 bg-transparent text-textFooterTitle border-l-[0.5px] border-textHeader leading-6">
                {faq.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ

