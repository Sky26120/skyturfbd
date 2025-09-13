import '../styles/scss/main.scss';

export const metadata = {
  title: "Sky Turf",
  description: "Where Football Meets the Sky!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
