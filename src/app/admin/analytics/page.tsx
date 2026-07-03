'use client';

import React, { useState, useEffect } from 'react';
import { Search, FileText, Play, Users, BarChart3, ArrowDownToLine } from 'lucide-react';

interface Submission {
  id: string;
  type: 'Article Lead' | 'Talk Unlock' | 'Webinar Registration';
  name: string;
  email: string;
  practice: string;
  contact: string;
  date: string;
  source: string;
}

interface AnalyticsData {
  articleLeads: Submission[];
  talkUnlocks: Submission[];
  webinarRegistrations: Submission[];
  allSubmissions: Submission[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'articles' | 'talks' | 'webinars'>('all');

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      setError('');
      try {
        const res = await fetch('/api/admin/analytics');
        if (!res.ok) {
          throw new Error('Failed to load analytics data.');
        }
        const result = await res.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <span className="w-10 h-10 border-4 border-blue-default border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-dark">Loading analytics dashboard...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-16 border border-dashed border-red-500/20 rounded-2xl bg-red-500/5">
        <p className="text-red-400 font-semibold mb-2">Error Loading Analytics</p>
        <p className="text-sm text-gray-500 mb-6">{error || 'Data is unavailable.'}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold py-2 px-4 rounded-lg text-xs transition-all cursor-pointer"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Determine which list to display
  let currentList: Submission[] = [];
  if (activeTab === 'all') currentList = data.allSubmissions;
  else if (activeTab === 'articles') currentList = data.articleLeads;
  else if (activeTab === 'talks') currentList = data.talkUnlocks;
  else if (activeTab === 'webinars') currentList = data.webinarRegistrations;

  // Filter the list based on search query
  const filteredList = currentList.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.practice.toLowerCase().includes(query) ||
      item.source.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query)
    );
  });

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTabCount = (tab: typeof activeTab) => {
    if (tab === 'all') return data.allSubmissions.length;
    if (tab === 'articles') return data.articleLeads.length;
    if (tab === 'talks') return data.talkUnlocks.length;
    if (tab === 'webinars') return data.webinarRegistrations.length;
    return 0;
  };

  const tabs = [
    { id: 'all', label: 'All Submissions', icon: BarChart3, color: 'text-blue-glow' },
    { id: 'articles', label: 'Article Leads', icon: FileText, color: 'text-amber-500' },
    { id: 'talks', label: 'Talk Unlocks', icon: Play, color: 'text-emerald-500' },
    { id: 'webinars', label: 'Webinar Registrations', icon: Users, color: 'text-violet-500' },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
            <BarChart3 className="w-5 h-5 text-blue-glow" />
            Analytics Dashboard
          </h2>
          <p className="text-xs text-muted-dark mt-1">
            Track user engagement across articles, SynergyTalks unlocks, and live webinars.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 border-b border-white/5 pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSearchQuery('');
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-default text-white border-blue-default/30 shadow-lg'
                  : 'bg-white/5 border-white/8 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : tab.color}`} />
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-white/60'
              }`}>
                {getTabCount(tab.id)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Controls & Search */}
      <div className="flex items-center gap-3 bg-white/3 border border-white/5 rounded-xl p-3">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-dark pointer-events-none">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search by name, email, practice, source or lead type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-navy border border-white/8 rounded-lg text-white focus:outline-none focus:border-blue-default transition-all placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Tables section */}
      {filteredList.length === 0 ? (
        <div className="text-center py-20 text-gray-500 font-semibold border border-dashed border-white/8 rounded-xl bg-white/1">
          No records found matching the criteria.
        </div>
      ) : (
        <div className="overflow-x-auto border border-white/8 rounded-xl">
          <table className="w-full text-left border-collapse text-xs text-white">
            <thead>
              <tr className="border-b border-white/8 bg-white/2 text-white/70 font-semibold uppercase tracking-wider">
                {activeTab === 'all' && <th className="py-3 px-4">Lead Type</th>}
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Practice</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Target / Source</th>
                <th className="py-3 px-4">Date / Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredList.map((item) => (
                <tr key={`${item.type}-${item.id}`} className="hover:bg-white/2 transition-colors">
                  {activeTab === 'all' && (
                    <td className="py-3 px-4">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                        item.type === 'Article Lead'
                          ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                          : item.type === 'Talk Unlock'
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                          : 'bg-violet-500/10 text-violet-500 border border-violet-500/20'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                  )}
                  <td className="py-3 px-4 font-semibold text-white">{item.name}</td>
                  <td className="py-3 px-4 text-gray-400">{item.email}</td>
                  <td className="py-3 px-4 text-gray-400">{item.practice}</td>
                  <td className="py-3 px-4 text-gray-400">{item.contact}</td>
                  <td className="py-3 px-4 text-gray-300 font-medium">{item.source}</td>
                  <td className="py-3 px-4 text-gray-500">{formatDate(item.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
