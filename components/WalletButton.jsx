import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useRouter } from "next/navigation";

const WalletButton = () => {
  const { setVisible } = useWalletModal();
  const { publicKey, disconnect } = useWallet();
  const router = useRouter();

  return (

    <div
      className={`${publicKey ? 'border-textHeader text-textFooterTitle bg-transparent' : 'bg-textButton text-textWhiteButton hover:scale-105'} 
    border rounded-lg cursor-pointer transition-all duration-200 ease-in-out h-[40px] w-[170px] flex justify-center items-center  text-base  tracking-[0.32px] group relative`}
    >
      {publicKey ? (
        <>
          <div className="flex items-center justify-center">
            {publicKey.toBase58().slice(0, 4)}....
            {publicKey.toBase58().slice(-4)}
          </div>
          <div className="w-[170px] absolute left-0 bottom-0 translate-y-full z-20 shadow-lg opacity-100 scale-y-0 origin-top group-hover:opacity-100 group-hover:scale-y-100 transition-all duration-200 ease-in-out">
            <ul className="flex flex-col gap-3 p-2 mt-2 bg-black border rounded-lg border-textHeader text-textFooterTitle">
              <li>
                <button
                  className="w-full py-1 transition-colors duration-200 ease-in-out rounded-md cursor-pointer hover:bg-textButton hover:text-textWhiteButton"
                  onClick={() => setVisible(true)}
                >
                  Change Wallet
                </button>
              </li>
              <li>
                <button
                  className="w-full py-1 transition-colors duration-200 ease-in-out rounded-md cursor-pointer hover:bg-textButton hover:text-textWhiteButton"
                  onClick={() => {
                    disconnect();
                    router.push('/');
                  }}
                >
                  Disconnect
                </button>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <div onClick={() => setVisible(true)}>
          Connect Wallet
        </div>
      )}
    </div>
  )
}

export default WalletButton