import type { MetadataRoute } from 'next';
import { connectToDatabase } from '@/lib/db';
import Article from '@/models/Article';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://synergy3d.net';

  const staticRoutes = [
    '',
    '/lab-services',
    '/talks',
    '/education',
    '/articles',
    '/webinars',
    '/customer-stories',
    '/about-us',
    '/customer-portal',
    '/contact-details',
    '/digital-workflow',
    '/apply',
    '/lab-services/products/zirconia-crowns',
    '/lab-services/products/all-on-x-hybrids',
    '/lab-services/products/e-max-restorations',
    '/lab-services/products/pfm-crowns',
    '/lab-services/products/surgical-guides',
    '/lab-services/products/night-guards',
    '/lab-services/products/printed-models-dies',
    '/lab-services/products/zirconia-hybrid-custom-abutment',
    '/lab-services/products/wax-up',
    '/lab-services/products/titanium-custom-abutments',
    '/lab-services/products/full-contour-zirconia',
    '/lab-services/products/acrylic-denture',
    '/lab-services/products/acrylic-partial',
    '/lab-services/products/partial-metal-framework',
    '/lab-services/products/temporaries',
    '/lab-services/products/screw-retained-zirconia-bridge',
    '/lab-services/products/screw-retained-pmma-bridge',
    '/lab-services/products/process-implant-acrylic-denture',
    '/lab-services/products/porcelain-fused-to-zirconia',
    '/lab-services/products/millable-flexible-partials',
    '/lab-services/products/screwmentable-crown-abutment-with-screw-channel-crown',
    '/lab-services/products/zirconia-screw-retained-crown-with-ti-base',
    '/lab-services/products/flexible-partials',
    '/lab-services/products/zirconia-hybrid',
    '/lab-services/products/screw-retained-bridge',
    '/lab-services/products/temporary-bridge',
    '/lab-services/products/screwmentable',
    '/about-us/enrico',
    '/about-us/davie',
    '/about-us/gina',
    '/about-us/milos',
    '/about-us/erik',
    '/about-us/ashley',
    '/about-us/kelli',
  ];

  const staticUrls: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : route.startsWith('/lab-services/products') ? 0.64 : 0.8,
  }));

  let articleUrls: MetadataRoute.Sitemap = [];
  try {
    await connectToDatabase();
    const articles = await Article.find({ published: true }).select('slug createdAt').lean();

    articleUrls = articles.map((article: any) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: article.createdAt ? new Date(article.createdAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error fetching articles for sitemap:', error);
  }

  return [...staticUrls, ...articleUrls];
}
