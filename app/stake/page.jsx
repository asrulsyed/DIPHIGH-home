'use client'
import * as anchor from "@coral-xyz/anchor";
import { useEffect, useState } from "react";
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
  const minValue = 50
  const [isOpen, setIsOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState('DIPHIGH');
  const [apy, setApy] = useState(10);
  const packages = [10, 20, 30];
  const [amount, setAmount] = useState(minValue);
  const [error, setError] = useState('');
  const [period, setPeriod] = useState(60);
  const wallet = useAnchorWallet()
  const deposite = async (amount, period, apy) => {
    if (wallet) {
      try {
        const tx = await deposite_token(
          wallet,
          MINT_ADDRESS,
          amount,
          period,
          apy
        )

        console.log("Tx =>", tx)
      } catch (err) {
        console.log("transaction failed!")
      }
    } else {
      console.log("not connected wallet")
    }
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    console.log("amount =>", amount)
    console.log("apy =>", apy)
  }, [amount, apy])

  return (
    <div className="w-full min-h-screen overflow-y-auto flex justify-center">
      <div className="mt-[200px] mb-20 flex flex-col gap-6 max-w-[1056px] lg:w-full px-4 sm:px-10 items-center">
        <p className="text-4xl font-medium text-white leading-[56px] text-wrap text-center">Staking</p>
        <div className="border rounded-2xl border-textHeader bg-bgHeader px-[56px] py-[53px] max-w-[516px] flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <label htmlFor="amount" className="text-textFooterTitle text-[18px]">Select Token</label>
            <div className="w-full relative">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-textWhiteButton border border-borderHeader h-[48px] rounded-lg px-5 text-base font-semibold text-textFooterTitle cursor-pointer flex items-center justify-between"
              >
                {selectedToken}
                <FaChevronDown size={20} color="white" className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </div>

              {isOpen && (
                <div className="absolute w-full mt-1 overflow-hidden border rounded-lg bg-textWhiteButton border-borderHeader z-[51]">
                  {['DIPHIGH'].map((option, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedToken(option);
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
          <div className="flex flex-col gap-4">
            <label className="text-textFooterTitle text-[18px]">Select Package</label>
            <div className="flex flex-wrap justify-center gap-3">
              {packages.map((p) => (
                <button
                  key={p}
                  onClick={() => setApy(p)}
                  className={`${p === apy ? 'bg-textFooterTitle text-textWhiteButton border-borderHeader' : 'bg-transparent text-textFooterTitle border-borderHeader'} border hover:bg-textFooterTitle hover:text-textWhiteButton hover:border-borderHeader font-semibold text-base h-[48px] w-[100px] flex items-center justify-center transition-all duration-200 ease-in-out cursor-pointer rounded-lg`}
                >
                  {p}% APY
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="amount" className="text-textFooterTitle text-[18px]">Amount</label>
            <input
              id="amount"
              name="amount"
              type="number"
              value={amount}
              min={minValue}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value < minValue) {
                  setError('Amount must be at least 5000');
                } else {
                  setError('');
                }
                setAmount(value);
              }}
              className="w-full bg-textWhiteButton border border-borderHeader h-[48px] rounded-lg px-5 text-base font-semibold text-textFooterTitle focus:outline-none"
            />
            {error && (
              <span className="mt-1 text-sm text-red-500">{error}</span>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="period" className="text-textFooterTitle text-[18px]">Locked period</label>
            <div className="w-full relative">
              <input
                id="period"
                name="period"
                disabled
                value={period}
                className="w-full bg-textWhiteButton border border-borderHeader h-[48px] rounded-lg px-5 text-base font-semibold text-textHeader focus:outline-none"
              />
              <span className="-translate-y-1/2 absolute right-4 top-1/2 text-base font-semibold text-white">Days</span>
            </div>
          </div>
          <button
            className="!bg-textFooterTitle border border-borderHeader text-textWhiteButton font-semibold text-base h-[48px] flex flex-col items-center justify-center hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer rounded-lg"
            disabled={error == '' ? false : true}
            onClick={async () => {
              await deposite(amount, period, apy)
              setIsModalOpen(true);
              setIsModalVisible(true);
              setTimeout(() => {
                setIsModalVisible(false);
                setTimeout(() => {
                  setIsModalOpen(false);
                }, 300); // Allow time for fade out animation
              }, 3000);
              }}
          >
            Stake
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className={`fixed bottom-10 right-10 transition-opacity duration-300 ease-in-out ${isModalVisible ? 'opacity-100' : 'opacity-0'
          }`}>
          <div className="bg-textFooterTitle px-10 py-4 rounded-lg">
            Successful Stake!
          </div>  
        </div>
      )}
    </div>
  )
}

export default Stake