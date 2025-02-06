'use client'

import { useWeb3 } from "@/hook/useweb3";
import moment from "moment";
import { useEffect, useState } from "react";
import { HiOutlineSquares2X2 } from "react-icons/hi2"
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts"
import { getHistory, convertToBN, convertFromHextToInt, getDecimal, convertToLocalTime } from "@/anchor/setup";
import { MINT_ADDRESS, PROGRAMID } from "@/constant";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

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

const HistoryItemComponent = ({ amount, startTime, endTime }) => {
  return (
    <tr className="h-[40px]">
      <th className="text-left">
        <div className="flex items-center gap-2 w-[100px]">
          {amount}
        </div>
      </th>
      <th className="pl-7 text-left">
        <div className="flex items-center w-[200px]">
          {convertToLocalTime(startTime)}
        </div>
      </th>
      <th className="pl-7 text-left">
        <div className="flex items-center w-[200px]">
          {convertToLocalTime(endTime)}
        </div>
      </th>
      <th className="pl-7 text-left">
        <div className="flex items-center w-[119px]">
          Progress
        </div>
      </th>
      <th className="pl-7 text-left">
        <div className="flex items-center w-[168px]">
          Withdrawal Status
        </div>
      </th>
      <th className="pl-7 text-left">
        <div className="flex items-center w-[60px]">
          Actions
        </div>
      </th>
    </tr>
  )
}

const Dashboard = () => {
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

  const [stakingHistory, setStakingHistory] = useState();
  const [amount, setAmount] = useState([])
  const [startTime, setStartTime] = useState([])
  const [endTime, setEndTime] = useState([])
  const { publicKey } = useWallet();
  // const { provider, userConnection, userWallet, program } = useWeb3()
  useEffect(() => {
    const _getHistory = async () => {
      const _stakingHistory = await getHistory(MINT_ADDRESS, publicKey)
      const decimals = await getDecimal(MINT_ADDRESS)
      const amount = await convertToBN(_stakingHistory.stakingAmount, decimals)
      const startTime = await convertFromHextToInt(_stakingHistory.stakingStart)
      const endTime = await convertFromHextToInt(_stakingHistory.stakingEnd)
      setAmount(amount)
      setStartTime(startTime)
      setEndTime(endTime)
    }
    if (publicKey)
      _getHistory()
  }, [publicKey])

  return (
    <div className="w-full min-h-screen overflow-y-auto overflow-x-hidden flex justify-center">
      <div className="mt-[200px] mb-20 flex flex-col gap-16 max-w-[1136px] w-full px-4 sm:px-10">
        <div className="flex flex-col gap-3">
          <p className="leading-14 text-2xl font-medium text-white">Your Staking Overview</p>
          <div className="grid gap-5 md:grid-cols-6">
            <div className="col-span-2 rounded-lg border-[0.5px] border-textHeader bg-bgHeader px-5 py-4 flex flex-col gap-3">
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
                  <Tooltip content={<CustomTooltip days={parseInt(name)} />} />
                  <Area dataKey="impression" stroke="#ffffff" fill="url(#colorImpression)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-bgHeader border-textHeader flex flex-col col-span-2 gap-3 px-5 py-4 rounded-lg border">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium leading-6 text-white">Current APY</p>
                <HiOutlineSquares2X2 size={'20px'} color="white" />
              </div>
              <p className="text-textGraph font-bold text-[32px] leading-6">20 %</p>
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart width={500} height={300} data={data}>
                  <defs>
                    <linearGradient id="colorImpression" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#777777" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#777777" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <Tooltip content={<CustomTooltip days={parseInt(name)} />} />
                  <Area dataKey="impression" stroke="#ffffff" fill="url(#colorImpression)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-bgHeader border-textHeader flex flex-col col-span-2 gap-3 px-5 py-4 rounded-lg border">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium leading-6 text-white">Rewards Generated</p>
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
                  <Tooltip content={<CustomTooltip days={parseInt(name)} />} />
                  <Area dataKey="impression" stroke="#ffffff" fill="url(#colorImpression)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between max-[450px]:items-start max-[450px]:gap-5 max-[450px]:flex-col">
            <p className="leading-14 text-2xl font-medium text-white">Staking History</p>
            <div className="flex justify-between gap-1.5 bg-transparent border-[0.5px] border-textHeader rounded-md p-1">
              <button
                onClick={() => setStakingHistory(0)}
                className={`${stakingHistory === 0 ? 'bg-textFooterTitle text-textWhiteButton border-textHeader' : 'bg-transparent text-textFooterTitle border-textHeader'} border hover:bg-textFooterTitle hover:text-textWhiteButton hover:border-borderHeader font-semibold text-base h-[32px] w-[85px] flex items-center justify-center transition-all duration-200 ease-in-out cursor-pointer rounded-md`}
              >
                Monthly
              </button>
              <button
                onClick={() => setStakingHistory(1)}
                className={`${stakingHistory === 1 ? 'bg-textFooterTitle text-textWhiteButton border-textHeader' : 'bg-transparent text-textFooterTitle border-textHeader'} border hover:bg-textFooterTitle hover:text-textWhiteButton hover:border-borderHeader font-semibold text-base h-[32px] w-[85px] flex items-center justify-center transition-all duration-200 ease-in-out cursor-pointer rounded-md`}
              >
                Yearly
              </button>
            </div>
          </div>
          <div className="border-[0.5px] border-textHeader rounded-xl bg-transparent overflow-x-scroll">
            <table className="w-full text-base text-white">
              <thead>
                <tr className="h-[84px] border-b-[0.5px] border-textHeader">
                  <th className="pl-7 text-left">
                    <div className="flex items-center gap-2 w-[100px]">
                      Amount
                    </div>
                  </th>
                  <th className="pl-7 text-left">
                    <div className="flex items-center w-[200px]">
                      Start Date
                    </div>
                  </th>
                  <th className="pl-7 text-left">
                    <div className="flex items-center w-[200px]">
                      End Date
                    </div>
                  </th>
                  <th className="pl-7 text-left">
                    <div className="flex items-center w-[119px]">
                      Progress
                    </div>
                  </th>
                  <th className="pl-7 text-left">
                    <div className="flex items-center w-[168px]">
                      Withdrawal Status
                    </div>
                  </th>
                  <th className="px-7 text-left">
                    <div className="flex items-center w-[60px]">
                      Actions
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody >
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center"
                  >
                    {
                      amount.map((itm, idx) => (
                        <HistoryItemComponent
                          amount={amount[idx]}
                          startTime={startTime[idx]}
                          endTime={endTime[idx]}
                        />
                      ))
                    }
                  </td>
                </tr>
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard