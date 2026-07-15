import { Metadata } from 'next';
import { getMetadataForPath } from '@/data/seoData';

export const metadata: Metadata = getMetadataForPath('/contact-details');

export default function ContactDetailsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
