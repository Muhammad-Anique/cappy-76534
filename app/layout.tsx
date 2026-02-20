import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CAPPY - Streetwear Redefined',
  description: 'Join the waitlist for CAPPY - Bold streetwear for the next generation.',
  keywords: ['streetwear', 'fashion', 'Gen Z', 'clothing', 'waitlist'],
  openGraph: {
    title: 'CAPPY - Streetwear Redefined',
    description: 'Join the waitlist for CAPPY - Bold streetwear for the next generation.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}