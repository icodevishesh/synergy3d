'use client';

import Link from 'next/link';
import Image from 'next/image';
import { TEAM } from '@/data/team';
import { MapPin } from 'lucide-react';
import MuiTimeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';



export default function AboutPage() {
  const teamMembers = Object.keys(TEAM).map(key => TEAM[key]);

  return (
    <div>
      {/* About Us Hero */}
      <section className="relative bg-navy py-22 md:py-40 overflow-hidden before:absolute before:inset-0 before:bg-radial-glow before:pointer-events-none">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-[size:50px_50px] pointer-events-none" />
        <div className="max-w-[1140px] mx-auto px-8 md:px-16 relative z-10">
          <div className="flex gap-2 text-[0.8rem] text-white/45 mb-5">
            <Link href="/" className="hover:text-white/80">Home</Link>
            <span className="text-white/20">›</span>
            <span className="text-white/70">About Us</span>
          </div>
          <span className="inline-block text-[11px] font-bold tracking-[0.15em] uppercase text-blue-glow mb-4">
            Our Story
          </span>
          <h1 className="font-serif text-4xl sm:text-7xl font-bold tracking-tight text-white mb-5 leading-[1.08]">
            Where technology, precision, and <em className='italic text-blue-glow'>innovation</em> come <br />together.
          </h1>
          <p className="text-md text-muted-dark max-w-[560px] leading-relaxed">
            Synergy 3D delivers industry-leading dental products and services with unmatched expertise and customer care.
          </p>
          <div className='flex gap-2 items-center border border-gray-500/30 bg-gray-100/10 backdrop-blur-md py-1 px-4 rounded-full w-fit text-md text-gray-200/70 mt-6'>
          <MapPin className='w-4 h-4'/>
            Wappingers Falls, NY — Headquarters
          </div>
        </div>
      </section>

      {/* Section 2: Our Story */}
      <section className="bg-white text-navy-text py-12 md:py-20 px-8 md:px-16">
        <div className="max-w-[1140px] mx-auto text-center mb-16">
          <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-blue-600 mb-4 block">
            Our Story
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-extrabold text-navy-text leading-[1.15]">
            Built on precision.<br />
            <span className="text-blue-600 italic">Driven by innovation.</span>
          </h2>
        </div>

        <div className="max-w-[1000px] mx-auto bg-white border border-blue-100/40 rounded-3xl shadow-premium p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-blue-100/40">
          <div className="flex flex-col">
            <span className="font-serif text-5xl sm:text-6xl font-extrabold text-blue-600/20 block mb-3.5 select-none">01</span>
            <h3 className="font-serif text-xl sm:text-[22px] font-bold text-navy-text mb-4">How We Started</h3>
            <p className="text-[13px] sm:text-[14px] text-gray-500/90 leading-relaxed font-normal">
              In November 2014 when Synergy 3D was established, we only produced restorations that came out of a milling unit. While analog labs were struggling to integrate digital technology, we were already developing and improving the digital workflow. Today we are proud to say <span className="font-semibold text-gray-500/90">98% of our restoratives are produced digitally.</span>
            </p>
          </div>
          <div className="flex flex-col pt-8 md:pt-0">
            <span className="font-serif text-5xl sm:text-6xl font-extrabold text-blue-600/20 block mb-3.5 select-none">02</span>
            <h3 className="font-serif text-xl sm:text-[22px] font-bold text-navy-text mb-4">How We Operate</h3>
            <p className="text-[13px] sm:text-[14px] text-gray-500/90 leading-relaxed font-normal">
              It all starts with the technician. Each technician employed by Synergy 3D has been selectively chosen based on their experience, expertise and knowledge. Not only are they constantly willing to learn, they are also willing to educate. If your office has questions or wants training on scanners, we are here to help.
            </p>
          </div>
          <div className="flex flex-col pt-8 md:pt-0">
            <span className="font-serif text-5xl sm:text-6xl font-extrabold text-blue-600/20 block mb-3.5 select-none">03</span>
            <h3 className="font-serif text-xl sm:text-[22px] font-bold text-navy-text mb-4">How We Sustain</h3>
            <p className="text-[13px] sm:text-[14px] text-gray-500/90 leading-relaxed font-normal">
              Without your consistent loyalty we would not be where we are today. Thank you for trusting your business in us. We are always looking to improve and love receiving customer feedback. Please take the time to <span className="font-semibold text-gray-500/90">leave us a review</span> as we would greatly appreciate it!
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Timeline */}
      <section className="bg-navy text-white py-12 md:py-24 px-8 md:px-16 relative overflow-hidden">
        <div className="max-w-[1140px] mx-auto text-center mb-12 relative z-10">
          <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-blue-glow mb-4">
            Timeline
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
            Innovating the <span className='text-blue-glow italic'>Future of</span> <br className="hidden sm:inline" />
            <span className="text-blue-glow italic">Digital Dentistry</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-dark max-w-[620px] mx-auto leading-relaxed">
            At Synergy 3D, we push the boundaries of digital dental solutions, combining precision engineering with advanced 3D technology.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <MuiTimeline position="right" sx={{ padding: 0 }}>
            {[
              { year: '2015', cat: 'FOUNDATION', title: 'Synergy 3D is Born', text: 'Founded with a mission to revolutionize the dental industry through high-precision 3D printing and digital workflows — when the rest of the industry was still analog.', last: false },
              { year: '2018', cat: 'TECHNOLOGY ADVANCEMENT', title: 'Custom Digital Prosthetics Launch', text: 'Launched our first line of custom digital prosthetics, enabling dentists to provide faster, more accurate, and cost-effective solutions to patients worldwide.', last: false },
              { year: '2020', cat: 'GLOBAL EXPANSION', title: 'Into International Markets', text: 'Expanded operations into international markets, collaborating with leading dental laboratories and clinics across North America and Europe.', last: false },
              { year: '2022', cat: 'AI-POWERED DIAGNOSTICS', title: 'Smarter Treatment Planning', text: 'Introduced AI-driven diagnostic tools that optimize treatment planning and improve the accuracy of dental restorations across thousands of cases.', last: false },
              { year: '2024', cat: 'PRESENT', title: 'Industry Leader', text: 'Synergy 3D now serves thousands of dental professionals worldwide, offering cutting-edge 3D printing, AR-integrated treatment previews, and cloud-based case management solutions.', last: true },
            ].map((item) => (
              <TimelineItem key={item.year}>
                <TimelineOppositeContent
                  sx={{
                    flex: 0.18,
                    paddingRight: '24px',
                    paddingTop: '6px',
                    textAlign: 'right',
                  }}
                >
                  <span style={{ color: '#6ea8fe', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.05em' }}>
                    {item.year}
                  </span>
                </TimelineOppositeContent>

                <TimelineSeparator>
                  <TimelineDot
                    sx={{
                      backgroundColor: 'transparent',
                      border: '2px solid #3b82f6',
                      boxShadow: 'none',
                      width: 14,
                      height: 14,
                      margin: '8px 0',
                    }}
                  />
                  {!item.last && (
                    <TimelineConnector sx={{ backgroundColor: 'rgba(59,130,246,0.2)' }} />
                  )}
                </TimelineSeparator>

                <TimelineContent sx={{ paddingLeft: '24px', paddingBottom: '40px' }}>
                  <span style={{ display: 'block', fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', color: '#8a9abf', textTransform: 'uppercase', marginBottom: '6px' }}>
                    {item.cat}
                  </span>
                  <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', fontWeight: 700, color: 'text-muted-dark', marginBottom: '10px', lineHeight: 1.3 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: '#8a9abf', lineHeight: 1.7, margin: 0 }}>
                    {item.text}
                  </p>
                </TimelineContent>
              </TimelineItem>
            ))}
          </MuiTimeline>
        </div>
      </section>

      {/* Leadership Team Grid */}
            <section className="bg-white py-12 md:py-24 text-navy-text">
        <div className="max-w-[1140px] mx-auto px-8 md:px-16">
          {/* Section Header */}
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <span className="block text-[11px] font-bold tracking-[0.18em] uppercase text-blue-600 mb-4">Our Team</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-extrabold text-navy-text leading-tight mb-4">
              The people behind<br />
              <em className="italic text-blue-600">every restoration.</em>
            </h2>
            <p className="text-md text-gray-500 leading-relaxed max-w-[490px] mx-auto">
              Selectively chosen for their experience, expertise, and passion for digital dentistry. Meet the Synergy 3D team.
            </p>
          </div>

          {/* Cards Grid (Carousel on mobile, grid on desktop) */}
          <div className="flex overflow-x-auto snap-x snap-mandatory pt-4 pb-8 px-8 gap-5 md:grid md:grid-cols-4 md:mx-0 md:px-0 md:gap-5 scrollbar-hide">
            {/* Start spacer for scroll spacing on mobile */}
            <div className="w-1 shrink-0 md:hidden" />

            {teamMembers.map((m) => (
              <div
                key={m.id}
                className="group relative rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white snap-start shrink-0 w-[280px] md:w-auto md:shrink"
              >
                <Link href={`/about/${m.id}`} className="absolute inset-0 z-10" aria-label={`View ${m.name}'s profile`} />
                {/* Image area */}
                <div className="relative h-84 md:h-62 overflow-hidden bg-navy-light/10">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 250px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority={m.id === 'enrico' || m.id === 'davie'}
                  />
                </div>
                {/* Info area */}
                <div className="px-5 pt-4 pb-5">
                  <h3 className="font-serif text-[1rem] font-bold text-navy-text leading-snug mb-0.5">{m.name}</h3>
                  <p className="text-xs font-semibold tracking-wide uppercase text-blue-700 mb-4">{m.role}</p>
                  <span className="text-[0.8rem] font-bold text-blue-600 tracking-wide inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    View profile →
                  </span>
                </div>
              </div>
            ))}

            {/* "This could be you" card */}
            <Link
              href="/apply"
              className="group rounded-2xl border border-dashed border-gray-200 hover:border-blue-400 overflow-hidden transition-all duration-300 bg-gray-50 flex flex-col items-center justify-center px-6 py-10 text-center min-h-[280px] snap-start shrink-0 w-[280px] md:w-auto md:shrink"
            >
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 group-hover:border-blue-400 flex items-center justify-center text-gray-300 group-hover:text-blue-400 transition-colors mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8M8 12h8" />
                </svg>
              </div>
              <h3 className="font-serif text-[1rem] font-bold text-navy-text mb-2 leading-snug">This could be you.</h3>
              <p className="text-[0.78rem] text-gray-500 leading-relaxed max-w-[160px] mb-4">
                We&apos;re always looking for passionate dental professionals to join our growing team.
              </p>
              <span className="text-[0.8rem] font-bold text-blue-600 tracking-wide">
                Apply now →
              </span>
            </Link>

            {/* End spacer for scroll spacing on mobile */}
            <div className="w-1 shrink-0 md:hidden" />
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-gradient-to-br from-[#1344c4] to-[#0d2e9e] py-12 md:py-16 text-white text-center sm:text-left">
        <div className="max-w-[1140px] mx-auto px-8 md:px-16 flex flex-col sm:flex-row sm:items-center justify-between gap-10">
          <div>
            <h2 className="font-serif text-4xl font-bold leading-tight mb-2">
              Ready to send your <em>first case?</em>
            </h2>
            <p className="text-white/70 text-[0.95rem]">
              Let our expert team handle everything — scan to delivery in 5 days flat.
            </p>
          </div>
          <div className="flex flex-wrap gap-3.5 shrink-0 justify-center">
            <a href="https://synergy.greatlab.io/login" target="_blank" rel="noopener noreferrer" className="inline-block bg-white hover:bg-gray-50 text-blue-700 font-bold py-3.5 px-8 rounded-lg text-sm shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center">
              Send Digital Scan →
            </a>
            <Link href="/products" className="inline-block bg-transparent hover:bg-white/6 text-white font-medium py-3.5 px-6 rounded-lg text-sm border border-white/20 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}