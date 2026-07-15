import { Metadata } from 'next';
import { getMetadataForPath } from '@/data/seoData';

export const metadata: Metadata = getMetadataForPath('/lab-services');

export default function LabServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
