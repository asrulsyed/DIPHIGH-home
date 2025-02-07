'use client'
import * as anchor from "@coral-xyz/anchor";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6"
import { deposite_token, test_transaction } from "@/anchor/setup";
import { MINT_ADDRESS } from "@/constant";
import { useWeb3 } from "@/hook/useweb3";
import {
  PublicKey,
} from "@solana/web3.js"
import { useWallet, useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";
import {
  createAssociatedTokenAccountIdempotentInstruction,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID
} from "@solana/spl-token";
import { PROGRAMID } from "@/constant";
import { getDecimal } from "@/anchor/setup";
import { program } from "../../anchor/setup";

const Stake = () => {
  const [token, setToken] = useState("DIPHIGH");
  const [amount, setAmount] = useState(100);
  const [period, setPeriod] = useState(15);
  const periods = [15, 30, 60, 180];
  const wallet = useAnchorWallet()
  const { connection } = useConnection();
  const deposite = async (amount) => {
    if (wallet) {
      const tx = await deposite_token(
        wallet,
        MINT_ADDRESS,
        amount
      )
      console.log("Tx =>", tx)
    } else {
      console.log("not connected wallet")
    }
  }

  return (
    <div className="w-full min-h-screen overflow-y-auto flex justify-center">
      <div className="mt-[200px] mb-20 flex flex-col gap-6 max-w-[1056px] lg:w-full px-4 sm:px-10">
        <p className="leading-14 text-2xl font-medium text-wrap text-white max-lg:text-center">Stake Your DIPHIGH Tokens to Earn Rewards</p>
        <div className="rounded-2xl border border-textHeader bg-bgHeader px-10 py-10 sm:px-[62px] sm:py-[54px] flex max-lg:flex-col max-lg:gap-20 items-center justify-between">
          <div className="max-w-[440px] w-full flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <label className="text-textFooterTitle text-[18px]" htmlFor="token">Select Token</label>
              <div className="relative">
                <select
                  id="token"
                  name="token"
                  className="w-full bg-textWhiteButton border border-borderHeader h-[48px] rounded-lg px-5 text-base font-semibold text-textFooterTitle cursor-pointer appearance-none focus:outline-none"
                >
                  <option>DIPHIGH</option>
                  <option>DIPHIGH</option>
                </select>
                <FaChevronDown size={20} color="white" className="-translate-y-1/2 absolute right-3 top-1/2" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="amount" className="text-textFooterTitle text-[18px]">Amount</label>
              <input
                id="amount"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-textWhiteButton border border-borderHeader h-[48px] rounded-lg px-5 text-base font-semibold text-textFooterTitle focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-textFooterTitle text-[18px]">Lockup Period</label>
              <div className="flex flex-wrap justify-center gap-3">
                {periods.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`${p === period ? 'bg-textFooterTitle text-textWhiteButton border-borderHeader' : 'bg-transparent text-textFooterTitle border-borderHeader'} border hover:bg-textFooterTitle hover:text-textWhiteButton hover:border-borderHeader font-semibold text-base h-[48px] w-[100px] flex items-center justify-center transition-all duration-200 ease-in-out cursor-pointer rounded-lg`}
                  >
                    {p} Days
                  </button>
                ))}
              </div>
            </div>
            <button
              className="!bg-textFooterTitle border border-borderHeader text-textWhiteButton font-semibold text-base h-[48px] flex flex-col items-center justify-center hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer rounded-lg"
              onClick={() => {
                deposite(amount)
              }}
            >
              Approve
            </button>
          </div>
          <div className="text-textFooterTitle flex flex-col text-right">
            <p className="text-[18px]">APY Rate</p>
            <p className="font-extrabold text-[64px] leading-20 my-4">25%</p>
            <p className="text-[18px]">**APY is dynamic</p>
            <div className="py-7 my-5 border-b-[0.5px] border-textHeader flex flex-col gap-7">
              <div className="flex justify-end items-center">
                <p className="text-xl">Lock period :&nbsp;</p>
                <p className="w-16 text-xl font-extrabold text-white">15</p>
              </div>
              <div className="flex justify-end items-center">
                <p className="text-xl">Re-locks on registration :&nbsp;</p>
                <p className="w-16 text-xl font-extrabold text-white">Yes</p>
              </div>
              <div className="flex justify-end items-center">
                <p className="text-xl">Early unstake fee :&nbsp;</p>
                <p className="w-16 text-xl font-extrabold text-white">25%</p>
              </div>
            </div>
            <div className="flex justify-end items-center">
              <p className="text-2xl">Staking Amount :&nbsp;</p>
              <p className="text-white font-extrabold text-[32px]">100</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stake