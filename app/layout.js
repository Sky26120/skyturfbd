import '../styles/scss/main.scss';
import Header from '@/components/Header'
import Footer from '@/components/Footer';

import { Providers } from './Providers/providers';

export const metadata = {
  title: "Sky Turf",
  description: "Where Football Meets the Sky!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
       <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
