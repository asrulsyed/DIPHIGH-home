const StakingSteps = () => {
  return (
    <div className="max-w-[1108px] w-full flex flex-col items-center mb-[107px]">
      <div className="font-medium text-[40px] text-textFooterTitle flex flex-wrap justify-center  px-4">
        How&nbsp;
        <div className="relative">
          <span className="text-shadow">Staking</span>
          <span className="absolute top-0 left-0 text-white">Staking</span>
        </div>
        &nbsp;Works
      </div>
      <div className="mt-16 gradient-border w-full lg:flex justify-center px-4 sm:px-10 lg:px-[78px]">
        <div className="flex flex-col gap-3 items-start px-6 py-5 border-l-[0.5px] border-textHeader max-lg:border-b-[0.5px]">
          <div className="w-9 h-9 flex justify-center items-center">
            <img src='/wallet.png' alt="wallet" className="block" />
          </div>
          <div className="text-textButton relative text-xl font-semibold">
            Link Your Wallet
            <div className="absolute h-[17px] border-l-[0.5px] top-1/2 -left-[25px] -translate-y-1/2 box-shadow" />
            <div className="absolute h-[17px] border-l-[0.5px] border-white top-1/2 -left-[25px] -translate-y-1/2" />
          </div>
          <p className="text-textHeader text-sm">Securely connect your wallet to access DIPHIGH staking.</p>
        </div>
        <div className="flex flex-col gap-3 items-start px-6 py-5 border-l-[0.5px] border-textHeader max-lg:border-b-[0.5px]">
          <div className="w-9 h-9 flex justify-center items-center">
            <img src='/token.png' alt="token" className="block" />
          </div>
          <div className="text-textButton relative text-xl font-semibold">
            Lock Your DIPHIGH Tokens
            <div className="absolute h-[17px] border-l-[0.5px] top-1/2 -left-[25px] -translate-y-1/2 box-shadow" />
            <div className="absolute h-[17px] border-l-[0.5px] border-white top-1/2 -left-[25px] -translate-y-1/2" />
          </div>
          <p className="text-textHeader text-sm">Choose your stake amount. Minimum 60-day lock period applies.</p>
        </div>
        <div className="flex flex-col gap-3 items-start px-6 py-5 border-l-[0.5px] border-textHeader">
          <div className="w-9 h-9 flex justify-center items-center">
            <img src='/money.png' alt="money" className="block" />
          </div>
          <div className="text-textButton relative text-xl font-semibold">
            Earn 20% APR + Benefits
            <div className="absolute h-[17px] border-l-[0.5px] top-1/2 -left-[25px] -translate-y-1/2 box-shadow" />
            <div className="absolute h-[17px] border-l-[0.5px] border-white top-1/2 -left-[25px] -translate-y-1/2" />
          </div>
          <p className="text-textHeader text-sm">Earn 20% APR paid hourly. Enjoy exclusive ecosystem perks.</p>
        </div>
      </div>
    </div>
  )
}

export default StakingSteps