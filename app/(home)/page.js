import Benefits from "@/app/(home)/Benefits"
import FAQ from "@/app/(home)/FAQ"
import Footer from "@/app/(home)/Footer"
import Hero from "@/app/(home)/Hero"
import StakingSteps from "@/app/(home)/StakingSteps"
import Start from "@/app/(home)/Start"
import { useWeb3Provider } from "@/context/web3context"
const Main = () => {
  return (
      <main className="flex flex-col items-center mt-[70px] font-display -z-10 mb-[95px]">
        <Hero />
        <StakingSteps />
        <Benefits />
        <FAQ />
        <Start />
        <Footer />
      </main>
  )
}

export default Main