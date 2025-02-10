'use client'

import { useWeb3 } from "@/hook/useweb3";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

const CustomTooltip = ({ days, active, payload, label }) => {
  if (active && payload && payload.length) {
    const dayValue = typeof days === 'function' ? days(payload) : days;
    return (
      <div className="bg-textWhiteButton border-bgButtonHover px-2 py-1 text-white border">
        <p className="text-lg font-semibold text-right">{`${payload[0].value.toFixed(2).toLocaleString()}`}</p>
        <p className="pr-2 pb-2 text-xs text-right">
          {dayValue}
        </p>
      </div>
    );
  }
  return null;
}
const StakingOverview = () => {
  const { globalHistory } = useWeb3();
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('DIPHIGH');

  const [lockedStakes, setLockedStakes] = useState([]);
  const [unlockedStakes, setUnlockedStakes] = useState([]);

  const [lockedTotal, setLockedTotal] = useState(0);
  const [unlockedTotal, setUnlockedTotal] = useState(0);

  const [expectedRewards, setExpectedRewards] = useState(0);
  const [withdrawalRewards, setWithdrawalRewards] = useState(0);

  useEffect(() => {
    if (!globalHistory || !Array.isArray(globalHistory)) return;
    const lockedStakes = globalHistory.filter(staking => staking.status === 'Locked');
    const unlockedStakes = globalHistory.filter(staking => staking.status === 'Unlocked');
  
    const lockedTotal = lockedStakes.reduce((sum, staking) => sum + staking.amount, 0);
    const unlockedTotal = unlockedStakes.reduce((sum, staking) => sum + staking.amount, 0);
    
    const expectedRewards = lockedStakes.reduce((sum, staking) => sum + staking.amount * staking.apy / 100, 0);
    const withdrawalRewards = unlockedStakes.reduce((sum, staking) => sum + staking.amount * staking.apy / 100, 0);
    
    setLockedStakes(lockedStakes);
    setUnlockedStakes(unlockedStakes);
    setLockedTotal(lockedTotal);
    setUnlockedTotal(unlockedTotal);
    setExpectedRewards(expectedRewards);
    setWithdrawalRewards(withdrawalRewards);
    console.log("lockedStakes", lockedStakes)
  }, [globalHistory])

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
                  className="text-textFooterTitle px-5 py-3 font-semibold transition-colors cursor-pointer hover:bg-borderHeader"
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
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium leading-6 text-white">Locked DipHigh</p>
          </div>
          <p className="text-textGraph font-bold text-[32px] leading-6">{lockedTotal}</p>
          <ResponsiveContainer width="100%" height={50}>
            <AreaChart width={500} height={300} data={lockedStakes}>
              <defs>
                <linearGradient id="colorImpression" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#777777" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#777777" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Tooltip content={<CustomTooltip days={payload => payload[0]?.payload?.startTime} />} />
              <Area dataKey="amount" stroke="#ffffff" fill="url(#colorImpression)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-bgHeader border-textHeader flex flex-col gap-3 px-5 py-4 rounded-lg border">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium leading-6 text-white">Unlocked DipHigh</p>
          </div>
          <p className="text-textGraph font-bold text-[32px] leading-6">{unlockedTotal}</p>
          <ResponsiveContainer width="100%" height={50}>
            <AreaChart width={500} height={300} data={unlockedStakes}>
              <defs>
                <linearGradient id="colorImpression" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#777777" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#777777" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Tooltip content={<CustomTooltip days={payload => payload[0]?.payload?.startTime} />} />
              <Area dataKey="amount" stroke="#ffffff" fill="url(#colorImpression)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-bgHeader border-textHeader flex flex-col gap-3 px-5 py-4 rounded-lg border">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium leading-6 text-white">Expected Rewards</p>
          </div>
          <p className="text-textGraph font-bold text-[32px] leading-6">{expectedRewards}</p>
          <ResponsiveContainer width="100%" height={50}>
            <AreaChart width={500} height={300} data={lockedStakes}>
              <defs>
                <linearGradient id="colorImpression" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#777777" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#777777" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Tooltip content={<CustomTooltip days={payload => payload[0]?.payload?.endTime} />} />
              <Area dataKey={(data) => data.amount * data.apy / 100} stroke="#ffffff" fill="url(#colorImpression)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-bgHeader border-textHeader flex flex-col gap-3 px-5 py-4 rounded-lg border">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium leading-6 text-white">Withdrawable Rewards</p>
          </div>
          <p className="text-textGraph font-bold text-[32px] leading-6">{withdrawalRewards}</p>
          <ResponsiveContainer width="100%" height={50}>
            <AreaChart width={500} height={300} data={unlockedStakes}>
              <defs>
                <linearGradient id="colorImpression" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#777777" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#777777" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Tooltip content={<CustomTooltip days={payload => payload[0]?.payload?.endTime} />} />
              <Area dataKey={(data) => data.amount * data.apy / 100} stroke="#ffffff" fill="url(#colorImpression)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default StakingOverview