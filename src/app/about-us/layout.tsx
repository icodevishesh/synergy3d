import { Metadata } from 'next';
import { getMetadataForPath } from '@/data/seoData';

export const metadata: Metadata = getMetadataForPath('/about-us');

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
