import { Metadata } from 'next';
import { getMetadataForPath } from '@/data/seoData';

export const metadata: Metadata = getMetadataForPath('/apply');

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
