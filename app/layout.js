import Header from "@/components/layout/Header";
import "./globals.css";
import WalletContextProvider from "@/context/WalletContextProvider";
import { Web3Provider } from "@/context/web3context";
import Footer1 from "@/components/layout/Footer1";

export const metadata = {
  title: "Staking",
  description: "Staking",
  icons: {
    icon: '/favicon.ico',
    apple: [
      { url: '/favicon.ico' },
      { url: '/favicon.ico', sizes: '180x180', type: 'image/ico' },
    ],
  },
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className="bg-black select-none antialised"
      >
        <WalletContextProvider>
          <Web3Provider>
            <Header />
            {children}
            <Footer1 />
          </Web3Provider>
        </WalletContextProvider>
      </body>
    </html>
  );
}
