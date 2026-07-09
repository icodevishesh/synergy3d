'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Calendar, Clock, User, Building, Mail, Phone, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import JsonLd from "@/components/JsonLd";

interface Article {
  _id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  readDuration: string;
  writer: string;
  designation: string;
  category: string;
  content: string;
  imageUrl?: string;
  published: boolean;
  views: number;
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

export default function ArticleDetailPage() {
  const { slug } = useParams() as { slug: string };
  const [article, setArticle] = useState<Article | null>(null);
  const [related, setRelated] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageUrl, setPageUrl] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    practiceName: '',
    email: '',
    contact: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.practiceName || !formData.email || !formData.contact) {
      setSubmitStatus('error');
      setErrorMessage('All fields are required.');
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const res = await fetch('/api/articles/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          articleSlug: slug,
          articleTitle: article?.title || '',
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        practiceName: '',
        email: '',
        contact: '',
      });
    } catch (err: any) {
      setSubmitStatus('error');
      setErrorMessage(err.message || 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (!slug) return;

    const abortController = new AbortController();

    const load = async () => {
      try {
        const res = await fetch(`/api/articles/${slug}`, { signal: abortController.signal });
        if (!res.ok) { 
          if (!abortController.signal.aborted) setIsLoading(false); 
          return; 
        }
        const data = await res.json();
        if (!abortController.signal.aborted) {
          setArticle(data);
        }

        const relatedRes = await fetch(
          `/api/articles?excludeSlug=${slug}&limit=3&select=title,slug,readDuration,date,category,imageUrl`,
          { signal: abortController.signal }
        );
        if (relatedRes.ok) {
          const relatedData = await relatedRes.json();
          if (!abortController.signal.aborted) {
            setRelated(relatedData);
          }
        }
      } catch (err: any) {
        if (err.name !== 'AbortError' && !abortController.signal.aborted) {
          console.error(err);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      abortController.abort();
    };
  }, [slug]);

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <span className="w-10 h-10 border-4 border-blue-default border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-serif text-5xl font-extrabold mb-4 text-navy-text">Article Not Found</h1>
        <p className="text-gray-400 max-w-[360px] mb-8">This article may have been removed or is currently unpublished.</p>
        <Link href="/articles" className="bg-blue-default hover:bg-blue-bright text-white font-bold py-3.5 px-8 rounded-full text-sm transition-all">
          ← Back to Articles
        </Link>
      </div>
    );
  }

  const catColor = CAT_COLORS[article.category] || 'bg-gray-100 text-gray-600';
  const catLabel = CAT_LABELS[article.category] || article.category;
  const authorInitial = article.writer.charAt(0).toUpperCase();

  // Helper to extract initials (e.g. "Kelli Trainor" -> "KT")
  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const authorInitials = getInitials(article.writer);
  const authorRole = article.designation || 'Contributor';

  // Helper to format title with italicized colon suffix
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

  const articleSchema = article ? {
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
  } : null;

  return (
    <div className="bg-white text-navy-text">
      {articleSchema && <JsonLd data={articleSchema} />}

      {/* Article Header */}
      <header className="relative bg-navy text-white pt-28 pb-14 overflow-hidden border-b border-white/6">
        {/* Radial blue glow gradient background */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(30,86,217,0.18)_0%,transparent_70%)] pointer-events-none" />
        
        {/* Dotted grid overlay */}
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

      {/* ── Main Layout: Content + Sticky Lead Form ─────────────────────── */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 flex flex-col lg:flex-row gap-10 items-start">
        
        {/* Left Side: Article Content & sharing */}
        <div className="flex-1 w-full lg:max-w-[700px]">
          <article>
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </article>

          {/* Share + Tags */}
          <div className="border-t border-gray-100 mt-10 pt-8 flex flex-row justify-between gap-4">
            {/* Tags */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[0.72rem] font-bold px-2.5 py-1 rounded-full ${catColor}`}>{catLabel}</span>
            </div>

            {/* Share buttons */}
            <div className="flex items-center gap-2">
              <span className="text-[0.72rem] text-gray-400 font-semibold mr-1">Share:</span>

              {/* Email */}
              <a
                href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent('Check out this article: ' + pageUrl)}`}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-blue-300 hover:text-blue-600 transition-all text-gray-400"
                title="Share via Email"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </a>

              {/* Twitter/X */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(pageUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-400 hover:text-gray-700 transition-all text-gray-400"
                title="Share on X"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>

              {/* Copy link */}
              <button
                onClick={() => { navigator.clipboard.writeText(pageUrl); }}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-400 hover:text-gray-700 transition-all text-gray-400"
                title="Copy link"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Sticky Lead Form */}
        <aside className="w-full lg:w-[300px] shrink-0 lg:sticky lg:top-22 bg-[#fafbff] border border-[#e4ecf8] rounded-2xl p-4 shadow-md transition-all">
          <div className="mb-4">
            <h3 className="font-serif text-lg font-bold text-navy-text mb-2">
              Connect with our Lab
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Have questions about this article or a case? Fill out your details below and a Synergy 3D specialist will reach out.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-[10px] font-bold uppercase tracking-wider text-navy-text mb-1">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-dark pointer-events-none">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Dr. Jane Doe"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#dde4f5] rounded-lg focus:outline-none focus:border-blue-default transition-all placeholder:text-gray-400/70"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="practiceName" className="block text-[10px] font-bold uppercase tracking-wider text-navy-text mb-1">
                Practice Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-dark pointer-events-none">
                  <Building className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  id="practiceName"
                  name="practiceName"
                  value={formData.practiceName}
                  onChange={handleInputChange}
                  placeholder="Apex Dental Care"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#dde4f5] rounded-lg focus:outline-none focus:border-blue-default transition-all placeholder:text-gray-400/70"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-wider text-navy-text mb-1">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-dark pointer-events-none">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="jane.doe@example.com"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#dde4f5] rounded-lg focus:outline-none focus:border-blue-default transition-all placeholder:text-gray-400/70"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact" className="block text-[10px] font-bold uppercase tracking-wider text-navy-text mb-1">
                Contact Number
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-dark pointer-events-none">
                  <Phone className="w-4 h-4" />
                </span>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="(555) 000-0000"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#dde4f5] rounded-lg focus:outline-none focus:border-blue-default transition-all placeholder:text-gray-400/70"
                  required
                />
              </div>
            </div>

            {submitStatus === 'success' && (
              <div className="flex gap-2.5 p-3.5 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-800 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                <div>
                  <p className="font-semibold">Successfully Submitted!</p>
                  <p className="text-[11px] text-emerald-700/90 mt-0.5">Thank you, we'll get in touch with you shortly.</p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="flex gap-2.5 p-3.5 bg-red-50 border border-red-100 rounded-lg text-red-800 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                <div>
                  <p className="font-semibold">Submission Failed</p>
                  <p className="text-[11px] text-red-700/90 mt-0.5">{errorMessage}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 bg-gradient-to-r from-blue-default to-blue-bright hover:to-blue-default text-white font-bold py-2.5 px-4 rounded-lg text-sm transition-all hover:shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Details</span>
                </>
              )}
            </button>
          </form>
        </aside>
      </div>

      {/* Author Bio */}
      {/* <div className="max-w-[740px] mx-auto px-5 sm:px-8 pb-14">
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex items-start gap-5">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-default to-blue-glow flex items-center justify-center text-white text-xl font-bold shrink-0 shadow">
            {authorInitial}
          </div>
          <div>
            <span className="block text-[0.7rem] font-bold uppercase tracking-[0.15em] text-blue-600 mb-1">Author</span>
            <h4 className="font-bold text-navy-text text-[1.05rem] mb-0.5">{article.writer}</h4>
            {article.designation && (
              <p className="text-[0.78rem] text-blue-600 font-semibold mb-2">{article.designation}</p>
            )}
          </div>
        </div>
      </div> */}

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
              {related.map(r => (
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
              {related.map(r => (
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
