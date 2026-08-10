import { connectToDatabase } from '@/lib/db';
import Article from '@/models/Article';
import ArticlesClient, { Article as IArticle } from './ArticlesClient';

export const revalidate = 60; // Revalidate page every 60 seconds

export default async function ArticlesPage() {
  let initialArticles: IArticle[] = [];

  try {
    await connectToDatabase();
    const docs = await Article.find({ published: true })
      .sort({ createdAt: -1 })
      .lean();

    initialArticles = JSON.parse(JSON.stringify(docs));
  } catch (error) {
    console.error('Failed to fetch articles server-side:', error);
  }

  return <ArticlesClient initialArticles={initialArticles} />;
}
