import { Metadata } from 'next';
import { getMetadataForPath } from '@/data/seoData';

export const metadata: Metadata = getMetadataForPath('/education');

export default function EducationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
