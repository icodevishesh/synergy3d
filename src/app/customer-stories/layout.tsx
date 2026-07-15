import { Metadata } from 'next';
import { getMetadataForPath } from '@/data/seoData';

export const metadata: Metadata = getMetadataForPath('/customer-stories');

export default function CustomerStoriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
