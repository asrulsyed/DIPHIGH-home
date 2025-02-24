import Header from "@/components/layout/Header";
import "./globals.css";

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
        className="antialised bg-black select-none"
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
