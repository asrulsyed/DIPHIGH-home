'use client'

import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const { setVisible } = useWalletModal();
  const { publicKey } = useWallet();
  const router = useRouter();

  // useEffect(() => {
  //   if (publicKey) {
  //     router.push('/dashboard');
  //   }
  // }, [publicKey]);

  return (
    <div className="hero-bg max-w-[1154px] w-full mt-[120px] mb-[74px] flex flex-col items-center relative px-6 text-center">
      <div className="flex flex-col gap-9 items-center max-w-[720px] mt-[40px]">
        <h1 className="text-textButton font-bold sm:!text-[64px] !text-[40px]">Stake to Earn 20% APY</h1>
        <p className="text-textFooterTitle text-xl text-center">To develop an advanced AI-powered crypto trading platform where the platform conducts trading on behalf of users, leveraging Bitcoin dominance trends and advanced AI algorithms to maxmize profits.</p>
        <button
          className={`${publicKey ? 'border-textHeader text-textFooterTitle bg-transparent' : 'bg-textButton text-textWhiteButton hover:scale-105'} 
    border rounded-lg cursor-pointer transition-all duration-200 ease-in-out h-[46px] w-[170px] flex justify-center items-center  text-base  tracking-[0.32px] group relative`}
        >
          {publicKey ? (
            router.push('/dashboard')
          ) : (
            <div onClick={() => setVisible(true)}>
              Connect Wallet
            </div>
          )}
        </button>
      </div>
      <img src="/hero-bg.png" alt="Hero background" className="max-w-[1154px] w-full h-auto absolute top-0 -z-[1]" />
    </div>
  )
}

export default Hero