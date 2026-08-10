import type { MetadataRoute } from 'next';
import { connectToDatabase } from '@/lib/db';
import Article from '@/models/Article';
import { PRODUCTS } from '@/data/products';
import { TEAM } from '@/data/team';

export const revalidate = 3600; // Revalidate dynamic sitemap every hour

const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://synergy3d.net').replace(/\/$/, '');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  // 1. Static Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/synergy_script.pdf`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/lab-services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/talks`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/education`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/articles`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/webinars`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/customer-stories`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about-us`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/customer-portal`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact-details`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/digital-workflow`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/apply`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.64,
    },
  ];

  // 2. Product Pages (Dynamic from products data)
  const productPages: MetadataRoute.Sitemap = Object.keys(PRODUCTS).map((productId) => ({
    url: `${BASE_URL}/lab-services/products/${productId}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 3. Team Pages (Dynamic from team data)
  const teamPages: MetadataRoute.Sitemap = Object.keys(TEAM).map((memberId) => ({
    url: `${BASE_URL}/about-us/${memberId}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.64,
  }));

  // 4. Articles (Dynamic from MongoDB)
  let articlePages: MetadataRoute.Sitemap = [];
  try {
    await connectToDatabase();
    const articles = await Article.find({ published: true })
      .select('slug createdAt updatedAt date')
      .lean();

    articlePages = articles.map((article: any) => {
      let lastMod = currentDate;
      if (article.updatedAt) {
        lastMod = new Date(article.updatedAt);
      } else if (article.createdAt) {
        lastMod = new Date(article.createdAt);
      } else if (article.date) {
        const parsed = new Date(article.date);
        if (!isNaN(parsed.getTime())) {
          lastMod = parsed;
        }
      }

      return {
        url: `${BASE_URL}/articles/${article.slug}`,
        lastModified: lastMod,
        changeFrequency: 'weekly',
        priority: 0.7,
      };
    });
  } catch (error) {
    console.error('Error fetching articles for dynamic sitemap:', error);
  }

  return [...staticPages, ...productPages, ...teamPages, ...articlePages];
}
