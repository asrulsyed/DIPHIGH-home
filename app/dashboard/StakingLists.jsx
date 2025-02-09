'use client'

import { useWallet } from "@solana/wallet-adapter-react"
import moment from "moment";
import { useEffect, useState } from "react"
import { getHistory, convertToBN, convertFromHextToInt, getDecimal, convertToLocalTime } from "@/anchor/setup";
import { MINT_ADDRESS } from "@/constant";


const HistoryItemComponent = ({ amount, startTime, endTime, className }) => {
  const isOver60Days = moment().isAfter(
    moment(new Date(convertToLocalTime(startTime))).add(60, 'days')
  );

  return (
    <tr className={`${className} h-[56px]`}>
      <th className="px-4 md:px-6">
        <div className="flex items-center justify-center text-base font-normal text-white text-nowrap">
          {amount}
        </div>
      </th>
      <th className="px-4 md:px-6">
        <div className="flex items-center justify-center text-base font-normal text-white text-nowrap">
          {moment(new Date(convertToLocalTime(startTime))).format('YYYY/MM/DD')}
        </div>
      </th>
      <th className="px-4 md:px-6">
        <div className="flex items-center justify-center text-base font-normal text-white text-nowrap">
          {moment(new Date(convertToLocalTime(startTime))).add(60, "days").format('YYYY/MM/DD')}
        </div>
      </th>
      <th className="px-4 md:px-6">
        <div className="flex items-center justify-center text-base font-normal text-white text-nowrap">
          %
        </div>
      </th>
      <th className="px-4 md:px-6">
        <div className="flex items-center justify-center text-base font-normal text-white text-nowrap">
          {isOver60Days ? "UnLocked" : "Locked"}
        </div>
      </th>
      <th className="px-4 md:px-6">
        <div className="flex items-center justify-center gap-2 text-sm font-normal text-white">
          {isOver60Days && (
            <>
              <button className="w-[100px] h-[32px] hover:bg-textFooterTitle rounded-[4px] hover:text-black bg-black border border-textHeader text-textFootTitle transition-colors duration-150 ease-linear">
                Withdraw
              </button>
              <button className="w-[100px] h-[32px] hover:bg-textFooterTitle rounded-[4px] hover:text-black bg-black border border-textHeader text-textFootTitle transition-colors duration-150 ease-linear">
                Claim
              </button>
            </>
          )}
        </div>
      </th>
    </tr>
  )
}

const StakingLists = () => {
  const [amount, setAmount] = useState([])
  const [startTime, setStartTime] = useState([])
  const [endTime, setEndTime] = useState([])
  const { publicKey } = useWallet();
  useEffect(() => {
    const _getHistory = async () => {
      try {
        const _stakingHistory = await getHistory(MINT_ADDRESS, publicKey)
        const decimals = await getDecimal(MINT_ADDRESS)
        const amount = await convertToBN(_stakingHistory.stakingAmount, decimals)
        const startTime = await convertFromHextToInt(_stakingHistory.stakingStart)
        const endTime = await convertFromHextToInt(_stakingHistory.stakingEnd)
        setAmount(amount)
        setStartTime(startTime)
        setEndTime(endTime)
      } catch (err) {
      }
    }
    if (publicKey)
      _getHistory()
  }, [publicKey])

  return (
    <div className="flex flex-col gap-5">
      <p className="leading-[56px] text-4xl font-medium text-white">Staking Lists</p>
      <div className="border-[0.5px] border-textHeader rounded-xl bg-transparent overflow-x-auto">
        <table className="w-full text-base text-white">
          <thead>
            <tr className="h-[84px] border-b-[0.5px] border-textHeader !px-8 md:!px-12">
              <th className="px-4 md:px-6">
                <div className="flex items-center justify-center text-nowrap">
                  Amount
                </div>
              </th>
              <th className="px-4 md:px-6">
                <div className="flex items-center justify-center text-nowrap">
                  Start Date
                </div>
              </th>
              <th className="px-4 md:px-6">
                <div className="flex items-center justify-center text-nowrap">
                  End Date
                </div>
              </th>
              <th className="px-4 md:px-6">
                <div className="flex items-center justify-center text-nowrap">
                  APY
                </div>
              </th>
              <th className="px-4 md:px-6 min-w-[180px]">
                <div className="flex items-center justify-center text-nowrap">
                  Staking Status
                </div>
              </th>
              <th className="px-4 md:px-6 min-w-[240px]">
                <div className="flex items-center justify-center">
                  Actions
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {amount.length == 0 ?
              <tr>
                <td colSpan={6} className="py-5 text-center">
                  <p>No active staking positions</p>
                </td>
              </tr>
              :
              amount.map((itm, idx) => (
                <HistoryItemComponent
                  key={idx}
                  amount={amount[idx]}
                  startTime={startTime[idx]}
                  endTime={endTime[idx]}
                  className={idx % 2 === 0 ? "bg-bgHeader" : "bg-transparent"}
                />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StakingLists