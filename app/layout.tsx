import type { Metadata } from 'next';
import { Cormorant_Garamond, Playfair_Display, Pinyon_Script, Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-cormorant',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-playfair',
});

const script = Pinyon_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
});

export const metadata: Metadata = {
  title: "Sri Jagathswapna Realtors — Building Dreams, Creating Legacies",
  description:
    'A decade of real estate excellence in Hyderabad — premium gated-community villas and open plots from Sri Jagathswapna Realtors Pvt. Ltd.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${playfair.variable} ${script.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
