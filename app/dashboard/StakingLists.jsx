'use client'

import { useWallet, useAnchorWallet } from "@solana/wallet-adapter-react"
import moment from "moment";
import { useEffect, useState } from "react"
import {
  getHistory,
  convertToBN,
  convertFromHextToInt,
  getDecimal,
  convertToLocalTime,
  withdraw_token,
  redeposite_token
} from "@/anchor/setup";
import { MINT_ADDRESS } from "@/constant";


const HistoryItemComponent = ({ amount, startTime, apy, className, index }) => {
  const wallet = useAnchorWallet()
  const isOver60Days = moment().isAfter(
    moment(new Date(convertToLocalTime(startTime))).add(60, 'days')
  );

  useEffect(() => {
    console.log(new Date(convertToLocalTime(startTime)))
  }, [])

  const withdraw = async (index) => {
    try {
      const tx = await withdraw_token(
        wallet,
        MINT_ADDRESS,
        index
      )
      console.log("tx => ", tx)
    }
    catch (err) {
      console.log("err =>", err)
    }
  }

  const redeposite = async (index) => {
    console.log("index =>", index)
    try {
      const tx = await redeposite_token(
        wallet,
        MINT_ADDRESS,
        index
      )
      console.log("tx => ", tx)
    }
    catch (err) {
      console.log("err =>", err)
    }
  }


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
          {apy}%
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
              <button
                className="w-[100px] h-[32px] hover:bg-textFooterTitle rounded-[4px] hover:text-black bg-black border border-textHeader text-textFootTitle transition-colors duration-150 ease-linear"
                onClick={async () => {
                  withdraw(index)
                }}
              >
                Withdraw
              </button>
              <button
                className="w-[100px] h-[32px] hover:bg-textFooterTitle rounded-[4px] hover:text-black bg-black border border-textHeader text-textFootTitle transition-colors duration-150 ease-linear"
                onClick={async () => {
                  redeposite(index)
                }}
              >
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
  const [period, setPeriod] = useState([])
  const [apy, setApy] = useState([])
  const { publicKey } = useWallet();
  const [isloading, setIsLoading] = useState(true)

  useEffect(() => {
    const _getHistory = async () => {
      try {
        await setIsLoading(true)
        const userHistoryData = await getHistory(MINT_ADDRESS, publicKey)
        const _amount = await convertToBN(userHistoryData.stakingAmount)
        const _startTime = await convertFromHextToInt(userHistoryData.stakingStart)
        const _period = await convertFromHextToInt(userHistoryData.stakingPeriod)
        const _apy = await convertFromHextToInt(userHistoryData.stakingApy)
        setAmount(_amount)
        setStartTime(_startTime)
        setPeriod(_period)
        setApy(_apy)
        await setIsLoading(false)
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
            {isloading ?
              <tr>
                <td colSpan={6} className="py-5 text-center">
                  <p>{"Loading ..."}</p>
                </td>
              </tr> :
              amount.length == 0 ?
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
                    apy={apy[idx]}
                    index={idx}
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