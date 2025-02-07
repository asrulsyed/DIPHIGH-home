'use client'

import moment from "moment";
import { HiOutlineSquares2X2 } from "react-icons/hi2"
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts"

const CustomTooltip = ({ days, active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-textWhiteButton border-bgButtonHover px-2 py-1 text-white border">
        <p className="text-lg font-semibold text-right">{`$${payload[0].value.toFixed(2).toLocaleString()}`}</p>
        <p className="pr-2 pb-2 text-xs text-right">
          {days === 90 ? moment(label).format('MMMM YYYY') : moment(label).format('D MMM YYYY')}
        </p>
      </div>
    )
  }
  return null;
}

const Unstake = () => {
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

  return (
    <div className="w-full min-h-screen overflow-y-auto flex justify-center">
      <div className="mt-[200px] mb-20 flex flex-col gap-3 max-w-[1056px] w-full px-4 sm:px-10 ">
        <p className="leading-14 text-2xl font-medium text-white">Withdraw Your Staked DIPHIGH Tokens</p>
        <div className="grid gap-5 md:grid-cols-6">
          <div className="md:col-span-2 rounded-lg border-[0.5px] border-textHeader bg-bgHeader px-5 py-4 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium leading-6 text-white">Total Staked DIPHIGH</p>
              <HiOutlineSquares2X2 size={'20px'} color="white" />
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
          <div className="bg-bgHeader border-textHeader flex flex-col gap-3 px-5 py-4 rounded-lg border md:col-span-2">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium leading-6 text-white">Total Locked DIPHIGH</p>
              <HiOutlineSquares2X2 size={'20px'} color="white" />
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
          <div className="bg-bgHeader border-textHeader flex flex-col gap-3 px-5 py-4 rounded-lg border md:col-span-2">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium leading-6 text-white">Total Unlocked DIPHIGH</p>
              <HiOutlineSquares2X2 size={'20px'} color="white" />
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
          <div className="bg-bgHeader border-textHeader flex flex-col gap-6 px-8 py-7 rounded-lg border md:col-span-3">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium leading-6 text-white">Available to Withdraw</p>
            </div>
            <p className="text-textGraph font-bold text-[32px] leading-6">10, 000</p>
            <button className="mt-2.5 bg-textFooterTitle border border-borderHeader text-textWhiteButton font-semibold text-base h-[48px] flex flex-col items-center justify-center rounded-lg hover:scale-105 cursor-pointer transition-all duration-200 ease-in">
              Withdraw
            </button>
          </div>
          <div className="bg-bgHeader border-textHeader flex flex-col gap-6 px-8 py-7 rounded-lg border md:col-span-3">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium leading-6 text-white">Available DIPHIGH Rewards</p>
            </div>
            <p className="text-textGraph font-bold text-[32px] leading-6">10, 000</p>
            <button className="mt-2.5 bg-textFooterTitle border border-borderHeader text-textWhiteButton font-semibold text-base h-[48px] flex flex-col items-center justify-center rounded-lg hover:scale-105 cursor-pointer transition-all duration-200 ease-in">
              Collect
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Unstake