import Benefits from "@/components/Benefits"
import FAQ from "@/components/FAQ"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import StakingSteps from "@/components/StakingSteps"
import Start from "@/components/Start"

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