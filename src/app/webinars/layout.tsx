import { Metadata } from 'next';
import { getMetadataForPath } from '@/data/seoData';

export const metadata: Metadata = getMetadataForPath('/webinars');

export default function WebinarsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
