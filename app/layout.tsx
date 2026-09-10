import type { Metadata } from 'next';
import { Poppins, Nunito_Sans, Pinyon_Script } from 'next/font/google';
import './globals.css';

const inter = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-cormorant',
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
      className={`${inter.variable} ${poppins.variable} ${script.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
