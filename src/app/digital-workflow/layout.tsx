import { Metadata } from 'next';
import { getMetadataForPath } from '@/data/seoData';

export const metadata: Metadata = getMetadataForPath('/digital-workflow');

export default function DigitalWorkflowLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
