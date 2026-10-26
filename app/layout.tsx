import React from 'react';
import { ClientTracker } from '../components/ClientTracker';

export const metadata = {
  title: 'Phonics Garden - Early Reading & Systematic Phonics',
  description: 'Evidence-based Science of Reading decodable books, worksheets, and interactive soundboards.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Silent Client-Visit Notification Tracker */}
        <ClientTracker />
        {children}
      </body>
    </html>
  );
}
