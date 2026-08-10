import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, Clock } from 'lucide-react';
import type { Metadata } from 'next';
import JsonLd from "@/components/JsonLd";
import { connectToDatabase } from '@/lib/db';
import Article from '@/models/Article';
import ArticleLeadForm from './ArticleLeadForm';
import ShareButtons from './ShareButtons';

export const revalidate = 60; // Revalidate every minute

interface ArticleDetailProps {
  params: Promise<{ slug: string }>;
}

const CAT_COLORS: Record<string, string> = {
  clinical:   'bg-blue-50 text-blue-600',
  materials:  'bg-emerald-50 text-emerald-600',
  technology: 'bg-violet-50 text-violet-700',
  business:   'bg-amber-50 text-amber-600',
};

const CAT_LABELS: Record<string, string> = {
  clinical:   'Clinical',
  materials:  'Materials',
  technology: 'Technology',
  business:   'Business',
};

const CAT_THUMB: Record<string, string> = {
  clinical:   '🦷',
  materials:  '⚗️',
  technology: '🔬',
  business:   '📊',
};

async function getArticleData(slug: string) {
  try {
    await connectToDatabase();
    const articleDoc = await Article.findOne({ slug, published: true }).lean();
    if (!articleDoc) return null;

    const article = JSON.parse(JSON.stringify(articleDoc));

    // Increment view count asynchronously in background
    Article.updateOne({ _id: articleDoc._id }, { $inc: { views: 1 } }).exec().catch(() => {});

    const relatedDocs = await Article.find({ published: true, slug: { $ne: slug } })
      .select('title slug readDuration date category imageUrl')
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    const related = JSON.parse(JSON.stringify(relatedDocs));

    return { article, related };
  } catch (error) {
    console.error('Error fetching article data:', error);
    return null;
  }
}

export async function generateMetadata(props: ArticleDetailProps): Promise<Metadata> {
  const { slug } = await props.params;
  const data = await getArticleData(slug);
  if (!data || !data.article) return {};

  const { article } = data;
  const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://synergy3d.net').replace(/\/$/, '');

  return {
    title: `${article.title} | Synergy 3D`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      url: `${BASE_URL}/articles/${article.slug}`,
      type: 'article',
      publishedTime: article.date,
      authors: [article.writer],
      images: article.imageUrl ? [{ url: article.imageUrl }] : [],
    },
    alternates: {
      canonical: `${BASE_URL}/articles/${article.slug}`,
    },
  };
}

export default async function ArticleDetailPage(props: ArticleDetailProps) {
  const { slug } = await props.params;
  const data = await getArticleData(slug);

  if (!data || !data.article) {
    notFound();
  }

  const { article, related } = data;
  const catColor = CAT_COLORS[article.category] || 'bg-gray-100 text-gray-600';
  const catLabel = CAT_LABELS[article.category] || article.category;

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const authorInitials = getInitials(article.writer);
  const authorRole = article.designation || 'Contributor';

  const formatTitle = (title: string) => {
    if (title.includes(':')) {
      const idx = title.indexOf(':');
      const prefix = title.substring(0, idx);
      const suffix = title.substring(idx + 1);
      return (
        <>
          {prefix}: <em className="italic text-blue-glow font-normal">{suffix.trim()}</em>
        </>
      );
    }
    return title;
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.description,
    "datePublished": article.date,
    "author": {
      "@type": "Person",
      "name": article.writer,
      "jobTitle": article.designation || "Author"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Synergy 3D",
      "logo": {
        "@type": "ImageObject",
        "url": "https://synergy3d.net/_next/static/media/synergy3d_logo-new.22tr8ajfzh_x4.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://synergy3d.net/articles/${article.slug}`
    },
    "image": article.imageUrl || "https://synergy3d.net/default-article-image.jpg"
  };

  return (
    <div className="bg-white text-navy-text">
      <JsonLd data={articleSchema} />

      {/* Article Header */}
      <header className="relative bg-navy text-white pt-28 pb-14 overflow-hidden border-b border-white/6">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(30,86,217,0.18)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-[size:50px_50px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-5 sm:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex gap-2 text-[0.75rem] text-white/40 mb-7 flex-wrap items-center">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span className="text-white/20">›</span>
            <span className="text-white/40">Learnings</span>
            <span className="text-white/20">›</span>
            <Link href="/articles" className="hover:text-white/70 transition-colors">Articles</Link>
            <span className="text-white/20">›</span>
            <span className="text-white/70 font-medium line-clamp-1 max-w-[300px]">{article.title}</span>
          </nav>

          {/* Category */}
          <span className="inline-block text-[0.65rem] font-extrabold tracking-[0.16em] uppercase px-3 py-1 rounded-full mb-6 bg-[#0c1a35] border border-blue-default/30 text-blue-glow">
            {catLabel}
          </span>

          {/* Title */}
          <h1 className="font-serif text-[2.15rem] sm:text-[2.6rem] font-extrabold text-white leading-[1.15] mb-5">
            {formatTitle(article.title)}
          </h1>

          {/* Description */}
          <p className="text-[1.02rem] text-muted-dark leading-relaxed mb-8 max-w-[620px]">
            {article.description}
          </p>

          {/* Author + meta row */}
          <div className="flex items-center gap-3.5 pt-2">
            <div className="w-10 h-10 rounded-full bg-blue-default flex items-center justify-center text-white font-bold text-sm shrink-0">
              {authorInitials}
            </div>
            <div>
              <span className="block text-[0.88rem] font-bold text-white leading-tight mb-1">
                {article.writer}
              </span>
              <div className="flex flex-wrap items-center gap-2 text-[0.78rem] text-muted-dark leading-none">
                <span>{authorRole}</span>
                <span className="text-white/20">·</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  <span>{article.date}</span>
                </span>
                <span className="text-white/20">·</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  <span>{article.readDuration}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {article.imageUrl && (
        <div className="max-w-5xl mx-auto px-5 sm:px-8 mt-8">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-md bg-gray-100" style={{ aspectRatio: '16/10' }}>
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-contains"
              priority
              sizes="(max-width: 800px) 100vw, 740px"
            />
          </div>
        </div>
      )}

      {/* Main Layout: Content + Sticky Lead Form */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 flex flex-col lg:flex-row gap-10 items-start">
        {/* Left Side: Article Content & sharing */}
        <div className="flex-1 w-full lg:max-w-[700px]">
          <article>
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </article>

          <ShareButtons title={article.title} catColor={catColor} catLabel={catLabel} />
        </div>

        {/* Right Side: Sticky Lead Form */}
        <ArticleLeadForm slug={article.slug} articleTitle={article.title} />
      </div>

      {/* Keep Reading */}
      {related.length > 0 && (
        <section className="bg-gray-50 py-14">
          <div className="max-w-[1100px] mx-auto px-5 sm:px-10">
            <div className="flex items-end justify-between mb-8 gap-4">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-black leading-snug">
                  Keep <em className="italic text-blue-glow">reading</em>
                </h2>
              </div>
              <Link
                href="/articles"
                className="text-[0.8rem] font-semibold text-muted-dark hover:text-blue-glow transition-colors shrink-0 hidden sm:block"
              >
                All articles →
              </Link>
            </div>

            {/* Desktop View */}
            <div className="hidden sm:grid grid-cols-3 gap-5">
              {related.map((r: any) => (
                <Link
                  key={r._id}
                  href={`/articles/${r.slug}`}
                  className="bg-white hover:bg-white/8 border border-gray-200 hover:border-gray-300 rounded-2xl overflow-hidden transition-all group flex flex-col w-full"
                >
                  <div className="aspect-[16/9] relative overflow-hidden bg-navy-mid flex items-center justify-center">
                    {r.imageUrl ? (
                      <Image
                        src={r.imageUrl}
                        alt={r.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 360px"
                      />
                    ) : (
                      <span className="text-4xl opacity-40">{CAT_THUMB[r.category] || '📄'}</span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className={`inline-block text-[0.62rem] font-extrabold tracking-[0.14em] uppercase px-2 py-0.5 rounded-full mb-3 w-fit ${CAT_COLORS[r.category] || 'bg-white/10 text-white/70'}`}>
                      {CAT_LABELS[r.category] || r.category}
                    </span>
                    <h3 className="font-serif text-[0.98rem] font-bold text-black leading-snug mb-3 line-clamp-2 group-hover:text-blue-glow transition-colors flex-1">
                      {r.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[0.7rem] text-muted-dark mt-auto">
                      <span className="flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {r.readDuration}
                      </span>
                      <span>·</span>
                      <span>{r.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile View (Carousel) */}
            <div className="flex sm:hidden overflow-x-auto snap-x snap-mandatory pb-6 gap-5 -mx-5 px-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="w-1 shrink-0" />
              {related.map((r: any) => (
                <Link
                  key={r._id}
                  href={`/articles/${r.slug}`}
                  className="bg-white hover:bg-white/8 border border-gray-200 hover:border-gray-300 rounded-2xl overflow-hidden transition-all group flex flex-col w-[280px] shrink-0 snap-start scroll-mx-5"
                >
                  <div className="aspect-[16/9] relative overflow-hidden bg-navy-mid flex items-center justify-center">
                    {r.imageUrl ? (
                      <Image
                        src={r.imageUrl}
                        alt={r.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 360px"
                      />
                    ) : (
                      <span className="text-4xl opacity-40">{CAT_THUMB[r.category] || '📄'}</span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className={`inline-block text-[0.62rem] font-extrabold tracking-[0.14em] uppercase px-2 py-0.5 rounded-full mb-3 w-fit ${CAT_COLORS[r.category] || 'bg-white/10 text-white/70'}`}>
                      {CAT_LABELS[r.category] || r.category}
                    </span>
                    <h3 className="font-serif text-[0.98rem] font-bold text-black leading-snug mb-3 line-clamp-2 group-hover:text-blue-glow transition-colors flex-1">
                      {r.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[0.7rem] text-muted-dark mt-auto">
                      <span className="flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {r.readDuration}
                      </span>
                      <span>·</span>
                      <span>{r.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
              <div className="w-1 shrink-0" />
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#1344c4] to-[#0d2e9e] py-12 md:py-16 text-white text-center sm:text-left">
        <div className="max-w-6xl mx-auto px-6 md:px-16 flex flex-col sm:flex-row sm:items-center justify-between gap-10">
          <div>
            <h2 className="font-serif text-4xl font-bold leading-tight mb-2">
              Have a case in mind<em className="italic font-normal">after reading?</em>
            </h2>
            <p className="text-white/70 text-sm">
              Send us a digital scan in under 60 seconds and our team will take it from here.
            </p>
          </div>
          <div className="flex flex-wrap gap-3.5 shrink-0 justify-center">
            <a href="https://synergy.greatlab.io/login" target="_blank" rel="noopener noreferrer" className="inline-block bg-white hover:bg-gray-50 text-blue-700 font-bold py-3.5 px-8 rounded-lg text-sm shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center">
              Send Digital Scan →
            </a>
            <Link href="/articles" className="inline-block bg-transparent hover:bg-white/6 text-white font-medium py-3.5 px-6 rounded-lg text-sm border border-white/20 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
              Back to Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
