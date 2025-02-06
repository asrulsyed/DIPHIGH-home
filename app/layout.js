import Header from "@/components/Header";
import "./globals.css";
import WalletContextProvider from "@/context/WalletContextProvider";
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
          <Header />
          {children}
          <Footer1 />
        </WalletContextProvider>
      </body>
    </html>
  );
}
