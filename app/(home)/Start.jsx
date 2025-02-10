import Image from "next/image"

const Start = () => {
  return (
    <div className="start-bg flex flex-col items-center w-full gap-10 py-[70px] px-4">
      <Image
        src={'/logo1.svg'}
        alt="logo1"
        width={100}
        height={100}
        className="w-auto shadow-[0px_0px_50px_50px_rgba(0,0,0,1)]"
      />
      <div className="font-medium text-[40px] text-textFooterTitle flex mb-10 flex-wrap justify-center text-center">
        Start Your Trading with&nbsp;
        <div className="relative">
          <span className="text-shadow">DIPHIGH</span>
          <span className="absolute top-0 left-0 text-white">DIPHIGH</span>
        </div>
      </div>
      <button className="h-[46px] w-[260px] flex flex-col justify-center items-center bg-textButton text-base text-textWhiteButton rounded-lg cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out">
        Stake Your DIPHIGH
      </button>
    </div>
  )
}

export default Start 