'use client';

import React, { useState, useEffect } from 'react';
import { Search, FileText, Play, Users, BarChart3, Phone, Trash2, AlertCircle, X, CheckSquare, Square } from 'lucide-react';

interface Submission {
  id: string;
  type: 'Article Lead' | 'Talk Unlock' | 'Webinar Registration' | 'Contact Request';
  name: string;
  email: string;
  practice: string;
  contact: string;
  date: string;
  source: string;
}

interface CallbackSubmission {
  _id: string;
  firstName: string;
  lastName: string;
  practice: string;
  phone: string;
  email?: string;
  state?: string;
  callTime?: string;
  notes?: string;
  helpWith?: string[];
  createdAt: string;
}

interface AnalyticsData {
  articleLeads: Submission[];
  talkUnlocks: Submission[];
  webinarRegistrations: Submission[];
  allSubmissions: Submission[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [callbacks, setCallbacks] = useState<CallbackSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'articles' | 'talks' | 'webinars' | 'contacts'>('all');

  // Deletion & Selection States
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<{ id: string; type: string; name?: string }[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      setError('');
      try {
        const [resAnalytics, resCallbacks] = await Promise.all([
          fetch('/api/admin/analytics'),
          fetch('/api/callback')
        ]);
        if (!resAnalytics.ok) {
          throw new Error('Failed to load analytics data.');
        }
        if (!resCallbacks.ok) {
          throw new Error('Failed to load contact details.');
        }
        const resultAnalytics = await resAnalytics.json();
        const resultCallbacks = await resCallbacks.json();
        setData(resultAnalytics);
        setCallbacks(resultCallbacks);
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
  if (activeTab === 'all') {
    const mappedCallbacks: Submission[] = callbacks.map((c) => ({
      id: c._id,
      type: 'Contact Request',
      name: `${c.firstName} ${c.lastName}`,
      email: c.email || '-',
      practice: c.practice,
      contact: c.phone,
      date: c.createdAt,
      source: `Callback Request (${c.state || 'N/A'})`,
    }));
    currentList = [...data.allSubmissions, ...mappedCallbacks].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } else if (activeTab === 'articles') {
    currentList = data.articleLeads;
  } else if (activeTab === 'talks') {
    currentList = data.talkUnlocks;
  } else if (activeTab === 'webinars') {
    currentList = data.webinarRegistrations;
  }

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

  // Filter callback contact details separately
  const filteredCallbacks = callbacks.filter((item) => {
    const query = searchQuery.toLowerCase();
    const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
    const helpOptionsText = (item.helpWith || []).join(', ').toLowerCase();
    return (
      fullName.includes(query) ||
      (item.email && item.email.toLowerCase().includes(query)) ||
      item.practice.toLowerCase().includes(query) ||
      item.phone.toLowerCase().includes(query) ||
      (item.state && item.state.toLowerCase().includes(query)) ||
      (item.notes && item.notes.toLowerCase().includes(query)) ||
      helpOptionsText.includes(query)
    );
  });

  // Determine currently visible items for Selection / Select All
  const visibleItems = activeTab === 'contacts'
    ? filteredCallbacks.map(c => ({ id: c._id, type: 'Contact Request' as const, name: `${c.firstName} ${c.lastName}` }))
    : filteredList.map(i => ({ id: i.id, type: i.type, name: i.name }));

  const isAllSelected = visibleItems.length > 0 && visibleItems.every(item => selectedKeys.has(`${item.type}:${item.id}`));
  const isSomeSelected = visibleItems.some(item => selectedKeys.has(`${item.type}:${item.id}`)) && !isAllSelected;

  const handleToggleSelectAll = () => {
    const next = new Set(selectedKeys);
    if (isAllSelected) {
      visibleItems.forEach(item => next.delete(`${item.type}:${item.id}`));
    } else {
      visibleItems.forEach(item => next.add(`${item.type}:${item.id}`));
    }
    setSelectedKeys(next);
  };

  const handleToggleSelectItem = (id: string, type: string) => {
    const key = `${type}:${id}`;
    const next = new Set(selectedKeys);
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    setSelectedKeys(next);
  };

  const handleDeleteSingle = (id: string, type: string, name?: string) => {
    setItemsToDelete([{ id, type, name }]);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteSelected = () => {
    const items: { id: string; type: string; name?: string }[] = [];
    selectedKeys.forEach((key) => {
      const firstColonIndex = key.indexOf(':');
      const type = key.substring(0, firstColonIndex);
      const id = key.substring(firstColonIndex + 1);
      
      let name: string | undefined;
      if (type === 'Contact Request') {
        const cb = callbacks.find(c => c._id === id);
        if (cb) name = `${cb.firstName} ${cb.lastName}`;
      } else if (data) {
        const item = data.allSubmissions.find(s => s.id === id && s.type === type);
        if (item) name = item.name;
      }
      items.push({ id, type, name });
    });

    if (items.length > 0) {
      setItemsToDelete(items);
      setDeleteConfirmOpen(true);
    }
  };

  const executeDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch('/api/admin/analytics', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: itemsToDelete.map(i => ({ id: i.id, type: i.type })),
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to delete records.');
      }

      const deletedKeysSet = new Set(itemsToDelete.map(i => `${i.type}:${i.id}`));

      // Update callbacks state
      setCallbacks(prev => prev.filter(c => !deletedKeysSet.has(`Contact Request:${c._id}`)));

      // Update analytics data state
      setData(prev => {
        if (!prev) return null;
        return {
          articleLeads: prev.articleLeads.filter(i => !deletedKeysSet.has(`${i.type}:${i.id}`)),
          talkUnlocks: prev.talkUnlocks.filter(i => !deletedKeysSet.has(`${i.type}:${i.id}`)),
          webinarRegistrations: prev.webinarRegistrations.filter(i => !deletedKeysSet.has(`${i.type}:${i.id}`)),
          allSubmissions: prev.allSubmissions.filter(i => !deletedKeysSet.has(`${i.type}:${i.id}`)),
        };
      });

      // Clear deleted keys from selection
      setSelectedKeys(prev => {
        const next = new Set(prev);
        deletedKeysSet.forEach(k => next.delete(k));
        return next;
      });

      setNotification({
        message: `Successfully deleted ${itemsToDelete.length} record${itemsToDelete.length > 1 ? 's' : ''}.`,
        type: 'success',
      });
      setDeleteConfirmOpen(false);
      setItemsToDelete([]);
    } catch (err: any) {
      setNotification({
        message: err.message || 'Error deleting records.',
        type: 'error',
      });
    } finally {
      setIsDeleting(false);
    }
  };

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
    if (tab === 'all') return data.allSubmissions.length + callbacks.length;
    if (tab === 'articles') return data.articleLeads.length;
    if (tab === 'talks') return data.talkUnlocks.length;
    if (tab === 'webinars') return data.webinarRegistrations.length;
    if (tab === 'contacts') return callbacks.length;
    return 0;
  };

  const tabs = [
    { id: 'all', label: 'All Submissions', icon: BarChart3, color: 'text-blue-glow' },
    { id: 'articles', label: 'Article Leads', icon: FileText, color: 'text-amber-500' },
    { id: 'talks', label: 'Talk Unlocks', icon: Play, color: 'text-emerald-500' },
    { id: 'webinars', label: 'Webinar Registrations', icon: Users, color: 'text-violet-500' },
    { id: 'contacts', label: 'Contact Details', icon: Phone, color: 'text-sky-400' },
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

      {/* Notification toast banner */}
      {notification && (
        <div className={`flex items-center justify-between px-4 py-3 rounded-xl border text-xs font-semibold ${
          notification.type === 'success'
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
            : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{notification.message}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

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
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white/3 border border-white/5 rounded-xl p-3">
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

        {/* Selected actions bar */}
        {selectedKeys.size > 0 && (
          <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs">
            <span className="text-white font-semibold">
              {selectedKeys.size} selected
            </span>
            <button
              onClick={handleDeleteSelected}
              className="flex items-center gap-1.5 bg-red-600/80 hover:bg-red-600 text-white font-bold px-3 py-1.5 rounded-lg border border-red-500/30 transition-all cursor-pointer text-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Selected</span>
            </button>
            <button
              onClick={() => setSelectedKeys(new Set())}
              className="text-gray-400 hover:text-white px-2 py-1 transition-colors cursor-pointer text-[11px]"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Tables section */}
      {activeTab === 'contacts' ? (
        filteredCallbacks.length === 0 ? (
          <div className="text-center py-20 text-gray-500 font-semibold border border-dashed border-white/8 rounded-xl bg-white/1">
            No contact details found matching the criteria.
          </div>
        ) : (
          <div className="overflow-x-auto border border-white/8 rounded-xl">
            <table className="w-full text-left border-collapse text-xs text-white">
              <thead>
                <tr className="border-b border-white/8 bg-white/2 text-white/70 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-3 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = isSomeSelected;
                      }}
                      onChange={handleToggleSelectAll}
                      className="w-4 h-4 rounded border-white/20 bg-navy text-blue-default focus:ring-blue-default cursor-pointer accent-blue-600"
                    />
                  </th>
                  <th className="py-3 px-4">Name & Practice</th>
                  <th className="py-3 px-4">Contact Info</th>
                  <th className="py-3 px-4">Location & Time</th>
                  <th className="py-3 px-4">Help Needed With</th>
                  <th className="py-3 px-4">Additional Notes</th>
                  <th className="py-3 px-4">Date Submitted</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredCallbacks.map((item) => {
                  const isSelected = selectedKeys.has(`Contact Request:${item._id}`);
                  return (
                    <tr
                      key={item._id}
                      className={`transition-colors ${
                        isSelected ? 'bg-blue-500/10' : 'hover:bg-white/2'
                      }`}
                    >
                      <td className="py-3 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelectItem(item._id, 'Contact Request')}
                          className="w-4 h-4 rounded border-white/20 bg-navy text-blue-default focus:ring-blue-default cursor-pointer accent-blue-600"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white text-[13px]">{item.firstName} {item.lastName}</div>
                        <div className="text-[11px] text-gray-400 mt-0.5">{item.practice}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-0.5 text-[11px]">
                          <a href={`tel:${item.phone}`} className="text-blue-glow hover:underline font-medium">{item.phone}</a>
                          {item.email ? (
                            <a href={`mailto:${item.email}`} className="text-gray-400 hover:text-white transition-colors">{item.email}</a>
                          ) : (
                            <span className="text-gray-600 italic">No email</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-1">
                          {item.state ? (
                            <span className="inline-block bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-[9px] font-bold text-gray-300 w-max uppercase">
                              {item.state}
                            </span>
                          ) : (
                            <span className="text-gray-600 italic text-[11px]">N/A</span>
                          )}
                          <span className="text-[11px] text-emerald-400 font-semibold">{item.callTime || 'Anytime'}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {item.helpWith && item.helpWith.length > 0 ? (
                          <div className="flex flex-wrap gap-1 max-w-[220px]">
                            {item.helpWith.map((help, idx) => (
                              <span
                                key={idx}
                                className="inline-block bg-blue-default/10 text-blue-glow border border-blue-default/20 rounded-full px-2 py-0.5 text-[10px] font-medium"
                              >
                                {help}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-600 italic">None specified</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="max-w-[260px] max-h-[80px] overflow-y-auto pr-1 text-[11px] text-gray-300 whitespace-pre-wrap leading-relaxed">
                          {item.notes ? item.notes : <span className="text-gray-600 italic">No notes</span>}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-500 whitespace-nowrap">
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDeleteSingle(item._id, 'Contact Request', `${item.firstName} ${item.lastName}`)}
                          title="Delete record"
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )
      ) : (
        filteredList.length === 0 ? (
          <div className="text-center py-20 text-gray-500 font-semibold border border-dashed border-white/8 rounded-xl bg-white/1">
            No records found matching the criteria.
          </div>
        ) : (
          <div className="overflow-x-auto border border-white/8 rounded-xl">
            <table className="w-full text-left border-collapse text-xs text-white">
              <thead>
                <tr className="border-b border-white/8 bg-white/2 text-white/70 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-3 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = isSomeSelected;
                      }}
                      onChange={handleToggleSelectAll}
                      className="w-4 h-4 rounded border-white/20 bg-navy text-blue-default focus:ring-blue-default cursor-pointer accent-blue-600"
                    />
                  </th>
                  {activeTab === 'all' && <th className="py-3 px-4">Lead Type</th>}
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Practice</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Target / Source</th>
                  <th className="py-3 px-4">Date / Time</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredList.map((item) => {
                  const isSelected = selectedKeys.has(`${item.type}:${item.id}`);
                  return (
                    <tr
                      key={`${item.type}-${item.id}`}
                      className={`transition-colors ${
                        isSelected ? 'bg-blue-500/10' : 'hover:bg-white/2'
                      }`}
                    >
                      <td className="py-3 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelectItem(item.id, item.type)}
                          className="w-4 h-4 rounded border-white/20 bg-navy text-blue-default focus:ring-blue-default cursor-pointer accent-blue-600"
                        />
                      </td>
                      {activeTab === 'all' && (
                        <td className="py-3 px-4">
                          <span className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                            item.type === 'Article Lead'
                              ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                              : item.type === 'Talk Unlock'
                              ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                              : item.type === 'Webinar Registration'
                              ? 'bg-violet-500/10 text-violet-500 border border-violet-500/20'
                              : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
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
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDeleteSingle(item.id, item.type, item.name)}
                          title="Delete record"
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )
      )}

      {/* Confirmation Modal */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-navy border border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Confirm Deletion</h3>
                <p className="text-xs text-gray-400">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              Are you sure you want to delete <strong className="text-white font-bold">{itemsToDelete.length}</strong> record{itemsToDelete.length > 1 ? 's' : ''}?
              {itemsToDelete.length === 1 && itemsToDelete[0].name && (
                <span className="block mt-2 font-semibold text-white bg-white/5 p-2.5 rounded-lg border border-white/5 text-xs">
                  {itemsToDelete[0].name} <span className="text-gray-400 font-normal">({itemsToDelete[0].type})</span>
                </span>
              )}
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/8">
              <button
                onClick={() => setDeleteConfirmOpen(false)}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                disabled={isDeleting}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-500 border border-red-500/30 rounded-xl shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete {itemsToDelete.length > 1 ? `(${itemsToDelete.length})` : ''}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
