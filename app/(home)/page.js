import SmarterTrading from "@/app/(home)/SmarterTrading"
import FAQ from "@/app/(home)/FAQ"
import Footer from "@/app/(home)/Footer"
import Hero from "@/app/(home)/Hero"
import Features from "@/app/(home)/Features"
import Start from "@/app/(home)/Start"

const Main = () => {
  return (
      <main className="flex flex-col items-center mt-[70px] font-display -z-10 mb-[95px]">
        <Hero />
        <Features />
        <SmarterTrading />
        <FAQ />
        <Start />
        <Footer />
      </main>
  )
}

export default Main