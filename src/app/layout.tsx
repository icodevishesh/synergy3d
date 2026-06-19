import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display, Geist } from 'next/font/google';
import './globals.css';
import { LayoutWrapper } from '@/components/layout';
import RevealObserver from '@/components/layout/RevealObserver';
import ShippingLabelModal from '@/components/modals/ShippingLabelModal';
import VideoModal from '@/components/modals/VideoModal';
import EpisodeUnlockModal from '@/components/modals/EpisodeUnlockModal';
import { cn } from "@/lib/utils";
import Script from 'next/script';

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '700'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Synergy 3D — Digital Dental Lab',
  description: 'Precision crowns and restorations — engineered with CAD/CAM, milled in-house, and delivered in five days flat.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("scroll-smooth", dmSans.variable, playfair.variable, "font-sans", geist.variable)}>
      <body className="bg-navy font-sans text-white antialiased overflow-x-hidden">
        <LayoutWrapper>{children}</LayoutWrapper>
        <RevealObserver />
        <ShippingLabelModal />
        <VideoModal />
        <EpisodeUnlockModal />
        <Script
            type="text/javascript"
            src="https://d3mkw6s8thqya7.cloudfront.net/integration-plugin.js"
            id="aisensy-wa-widget"
            widget-id="aab24h"
        />
      </body>
    </html>
  );
}
