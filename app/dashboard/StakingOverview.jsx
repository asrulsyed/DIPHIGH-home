'use client'

import moment from "moment";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

const CustomTooltip = ({ days, active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-2 py-1 text-white border bg-textWhiteButton border-bgButtonHover">
        <p className="text-lg font-semibold text-right">{`$${payload[0].value.toFixed(2).toLocaleString()}`}</p>
        <p className="pb-2 pr-2 text-xs text-right">
          {days === 90 ? moment(new Date(label)).format('MMMM YYYY') : moment(new Date(label)).format('D MMM YYYY')}
        </p>
      </div>
    )
  }
  return null;
}

const StakingOverview = () => {
  const data = [
    { name: 1, impression: 0 },
    { name: 2, impression: 5000 },
    { name: 3, impression: 5000 },
    { name: 4, impression: 6000 },
    { name: 5, impression: 4300 },
    { name: 6, impression: 7000 },
    { name: 7, impression: 7600 },
    { name: 8, impression: 3500 },
    { name: 9, impression: 5500 },
    { name: 10, impression: 6000 },
    { name: 11, impression: 6000 },
    { name: 12, impression: 9000 },
    { name: 13, impression: 7500 },
    { name: 14, impression: 9400 },
    { name: 15, impression: 9000 },
    { name: 16, impression: 4000 },
    { name: 17, impression: 5000 },
    { name: 18, impression: 8000 },
    { name: 19, impression: 10000 },
    { name: 20, impression: 11030 },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('DIPHIGH');

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between max-[450px]:items-start max-[450px]:gap-5 max-[450px]:flex-col">
        <p className="leading-[56px] text-4xl font-medium text-white">Your Staking Overview</p>
        <div className="relative w-[165px]">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-textWhiteButton border border-borderHeader h-[48px] rounded-lg px-5 text-base font-semibold text-textFooterTitle cursor-pointer flex items-center justify-between"
          >
            {selectedOption}
            <FaChevronDown size={20} color="white" className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>

          {isOpen && (
            <div className="absolute w-full mt-1 overflow-hidden border rounded-lg bg-textWhiteButton border-borderHeader z-[51]">
              {['DIPHIGH'].map((option, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedOption(option);
                    setIsOpen(false);
                  }}
                  className="px-5 py-3 font-semibold transition-colors cursor-pointer hover:bg-borderHeader text-textFooterTitle"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="grid min-[500px]:grid-cols-2 gap-5 lg:grid-cols-4">
        <div className="rounded-lg border-[0.5px] border-textHeader bg-bgHeader px-5 py-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium leading-6 text-white">Locked DipHigh</p>
          </div>
          <p className="text-textGraph font-bold text-[32px] leading-6">10, 000</p>
          <ResponsiveContainer width="100%" height={50}>
            <AreaChart width={500} height={300} data={data}>
              <defs>
                <linearGradient id="colorImpression" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#777777" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#777777" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Tooltip content={<CustomTooltip days={parseInt(data.name)} />} />
              <Area dataKey="impression" stroke="#ffffff" fill="url(#colorImpression)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-3 px-5 py-4 border rounded-lg bg-bgHeader border-textHeader">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium leading-6 text-white">Unlocked DipHigh</p>
          </div>
          <p className="text-textGraph font-bold text-[32px] leading-6">10, 000</p>
          <ResponsiveContainer width="100%" height={50}>
            <AreaChart width={500} height={300} data={data}>
              <defs>
                <linearGradient id="colorImpression" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#777777" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#777777" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Tooltip content={<CustomTooltip days={parseInt(data.name)} />} />
              <Area dataKey="impression" stroke="#ffffff" fill="url(#colorImpression)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-3 px-5 py-4 border rounded-lg bg-bgHeader border-textHeader">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium leading-6 text-white">Expected Rewards</p>
          </div>
          <p className="text-textGraph font-bold text-[32px] leading-6">10, 000</p>
          <ResponsiveContainer width="100%" height={50}>
            <AreaChart width={500} height={300} data={data}>
              <defs>
                <linearGradient id="colorImpression" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#777777" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#777777" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Tooltip content={<CustomTooltip days={parseInt(data.name)} />} />
              <Area dataKey="impression" stroke="#ffffff" fill="url(#colorImpression)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-3 px-5 py-4 border rounded-lg bg-bgHeader border-textHeader">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium leading-6 text-white">Withdrawable Rewards</p>
          </div>
          <p className="text-textGraph font-bold text-[32px] leading-6">10, 000</p>
          <ResponsiveContainer width="100%" height={50}>
            <AreaChart width={500} height={300} data={data}>
              <defs>
                <linearGradient id="colorImpression" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#777777" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#777777" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Tooltip content={<CustomTooltip days={parseInt(data.name)} />} />
              <Area dataKey="impression" stroke="#ffffff" fill="url(#colorImpression)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default StakingOverview