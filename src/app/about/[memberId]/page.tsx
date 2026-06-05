import { notFound } from 'next/navigation';
import Link from 'next/link';
import { TEAM } from '@/data/team';

interface TeamPageProps {
  params: Promise<{
    memberId: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(TEAM).map((key) => ({
    memberId: key,
  }));
}

export default async function TeamDetailPage({ params }: TeamPageProps) {
  const { memberId } = await params;
  const member = TEAM[memberId];

  if (!member) {
    notFound();
  }

  return (
    <div>
      {/* Member Hero */}
      <section className="relative bg-navy py-40 overflow-hidden before:absolute before:inset-0 before:bg-radial-glow before:pointer-events-none">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-[size:50px_50px] pointer-events-none" />
        <div className="max-w-[1140px] mx-auto px-16 relative z-10 flex flex-col md:flex-row items-center gap-12">
          
          {/* Avatar Graphic */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="w-36 h-36 rounded-full bg-gradient-to-br from-blue to-blue-glow flex items-center justify-center text-7xl font-bold border-4 border-white/10 shadow-2xl relative z-10 select-none">
              {member.emoji}
            </div>
            <div className="bg-blue-default/20 text-blue-glow text-[0.68rem] font-bold tracking-widest px-4 py-1.5 rounded-full uppercase mt-4.5 border border-blue-glow/30 select-none">
              {member.role}
            </div>
          </div>

          {/* Core Info */}
          <div className="flex-grow pt-2 text-center md:text-left">
            <div className="flex gap-2 text-[0.8rem] text-white/45 mb-5 justify-center md:justify-start">
              <Link href="/" className="hover:text-white/80">Home</Link>
              <span className="text-white/20">›</span>
              <Link href="/about" className="hover:text-white/80">About Us</Link>
              <span className="text-white/20">›</span>
              <span className="text-white/70">{member.name}</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white mb-3.5 leading-none">
              {member.name.split(' ')[0]} <em className="italic text-blue-glow font-normal">{member.name.split(' ').slice(1).join(' ')}</em>
            </h1>
            <div className="text-[1.05rem] text-[#8a9abf] font-semibold mb-6 tracking-wide">{member.title}</div>
            <p className="text-[1.05rem] text-muted-dark leading-relaxed max-w-[620px]">{member.bio[0]}</p>
          </div>

        </div>
      </section>

      {/* Member Details Body */}
      <section className="bg-white text-navy-text py-20">
        <div className="max-w-[1140px] mx-auto px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Detailed Biography block */}
          <div className="lg:col-span-7 flex flex-col pr-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-text mb-6">
              About <em className="italic text-blue font-normal">{member.name.split(' ')[0]}</em>
            </h2>
            <div className="flex flex-col gap-5 text-[0.95rem] text-gray-500 leading-relaxed">
              {member.bio.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>
          </div>

          {/* Specialties & Sidecard */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-off-white border border-border-light rounded-[22px] p-8">
              <h3 className="text-[0.78rem] font-bold tracking-widest text-[#8a9abf] uppercase mb-5">Areas of Expertise</h3>
              <div className="flex flex-col gap-3">
                {member.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-blue-default rounded-full" />
                    <span className="text-[0.92rem] text-gray-700 font-semibold">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-off-white border border-border-light rounded-[22px] p-8">
              <h3 className="text-[0.78rem] font-bold tracking-widest text-[#8a9abf] uppercase mb-5">At Synergy 3D</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3.5 text-[0.92rem] text-gray-700 font-medium">
                  <svg className="text-blue shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Wappingers Falls, NY
                </div>
                <div className="flex items-center gap-3.5 text-[0.92rem] text-gray-700 font-medium">
                  <svg className="text-blue shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                  {member.title}
                </div>
                <div className="flex items-center gap-3.5 text-[0.92rem] text-gray-700 font-medium">
                  <svg className="text-blue shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  Est. 2014
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Colleagues Section */}
      <section className="bg-white border-t border-border-light py-20 text-navy-text">
        <div className="max-w-[1140px] mx-auto px-16">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-text mb-9">
            Meet the rest of the <em className="italic text-blue font-normal">team</em>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {member.colleagues.map((cid) => {
              const col = TEAM[cid];
              return (
                <Link
                  key={cid}
                  href={`/about/${cid}`}
                  className="bg-white border border-border-light rounded-xl p-5 hover:shadow-premium hover:-translate-y-1 hover:border-blue/25 transition-all flex items-center gap-3.5 cursor-pointer group"
                >
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue to-blue-glow flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform duration-250 select-none">
                    {col.emoji}
                  </div>
                  <div>
                    <div className="text-[0.95rem] font-bold text-navy-text group-hover:text-blue transition-colors line-clamp-1">{col.name}</div>
                    <div className="text-[0.74rem] text-gray-500 line-clamp-1">{col.role}</div>
                  </div>
                </Link>
              );
            })}

            <Link
              href="/about"
              className="bg-gray-50 border border-dashed border-border-light hover:border-blue/50 rounded-xl p-5 transition-all flex items-center gap-3.5 cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-full bg-white border border-dashed border-border-light text-blue-default flex items-center justify-center text-xl shrink-0 group-hover:bg-blue-default group-hover:text-white transition-colors duration-200">
                →
              </div>
              <div>
                <div className="text-[0.95rem] font-bold text-blue tracking-wide">View Full Team</div>
                <div className="text-[0.74rem] text-gray-500">All team members</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-gradient-to-br from-[#1344c4] to-[#0d2e9e] py-16 text-white text-center sm:text-left">
        <div className="max-w-[1140px] mx-auto px-16 flex flex-col sm:flex-row sm:items-center justify-between gap-10">
          <div>
            <h2 className="font-serif text-3xl font-bold leading-tight mb-2">
              Ready to send your <em>first case?</em>
            </h2>
            <p className="text-white/70 text-[0.95rem]">
              Let our expert team handle everything — scan to delivery in 5 days flat.
            </p>
          </div>
          <div className="flex flex-wrap gap-3.5 shrink-0 justify-center">
            <Link href="/callback" className="inline-block bg-white hover:bg-gray-50 text-blue font-bold py-3.5 px-8 rounded-lg text-[0.95rem] shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
              Start a Case →
            </Link>
            <Link href="/products" className="inline-block bg-transparent hover:bg-white/6 text-white font-medium py-3.5 px-6 rounded-lg text-[0.92rem] border border-white/20 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
              View Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
