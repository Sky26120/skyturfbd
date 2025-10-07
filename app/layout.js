import '../styles/scss/main.scss';
import Header from '@/components/Header'
import Footer from '@/components/Footer';
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "Sky Turf",
  description: "Where Football Meets the Sky!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
          <SessionProvider>{children}</SessionProvider>
        <Footer />
      </body>
    </html>
  );
}
