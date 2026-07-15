import { Metadata } from 'next';
import { getMetadataForPath } from '@/data/seoData';

export const metadata: Metadata = getMetadataForPath('/articles');

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
