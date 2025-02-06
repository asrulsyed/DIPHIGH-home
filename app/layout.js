import Header from "@/components/Header";
import "./globals.css";
import WalletContextProvider from "@/context/WalletContextProvider";
import { Web3Provider } from "@/context/web3context";
import Footer1 from "@/components/Footer1";
export const metadata = {
  title: "Staking",
  description: "Staking",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className="antialised bg-black"
      >
        <WalletContextProvider>
          <Web3Provider>
            <p>
              Hello
            </p>
            <Header />
            {children}
            <Footer1 />
          </Web3Provider>
        </WalletContextProvider>
      </body>
    </html>
  );
}
