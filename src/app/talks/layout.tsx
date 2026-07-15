import { Metadata } from 'next';
import { getMetadataForPath } from '@/data/seoData';

export const metadata: Metadata = getMetadataForPath('/talks');

export default function TalksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
