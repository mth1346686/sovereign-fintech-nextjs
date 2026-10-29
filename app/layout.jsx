import './globals.css';

export const metadata = {
  title: 'Sovereign Fintech & Wealth Intelligence • Next.js Edition',
  description: 'Enterprise 60FPS Wealth Management & Egyptian Treasury Asset Allocation Command Deck with Framer Motion and Recharts.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-amber-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}
