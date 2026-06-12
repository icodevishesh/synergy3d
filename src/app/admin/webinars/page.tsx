'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { Edit2, Trash2, Plus, X, Settings, Users } from 'lucide-react';

// Zod Schemas
const webinarSchema = z.object({
  youtubeUrl: z.string().min(1, 'YouTube URL is required').url('Must be a valid URL'),
  category: z.enum(['recorded', 'upcoming']),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.string().optional(),
  duration: z.coerce.number().min(1, 'Duration is required'),
  name: z.string().min(1, 'Name is required'),
  published: z.boolean().default(true),
}).superRefine((data, ctx) => {
  if (data.category === 'upcoming' && !data.date) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Date is required for upcoming webinars',
      path: ['date'],
    });
  }
});

const bannerSchema = z.object({
  bannerTitle: z.string().min(1, 'Title is required'),
  bannerSubtitle: z.string().min(1, 'Subtitle/Description is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  duration: z.coerce.number().min(1, 'Duration is required'),
  name: z.string().min(1, 'Name is required'),
  totalRegistrations: z.coerce.number().min(0),
});

type WebinarFormValues = z.infer<typeof webinarSchema>;
type BannerFormValues = z.infer<typeof bannerSchema>;

interface Webinar {
  _id: string;
  youtubeUrl: string;
  category: 'recorded' | 'upcoming';
  title: string;
  description: string;
  date: string;
  duration: number;
  name: string;
  published: boolean;
  registeredCount: number;
}

interface WebinarBanner {
  bannerTitle: string;
  bannerSubtitle: string;
  date: string;
  time: string;
  duration: number;
  name: string;
  totalRegistrations: number;
}

interface WebinarReg {
  _id: string;
  webinarId: string;
  name: string;
  email: string;
  whatsAppNumber: string;
  registeredAt: string;
}

export default function AdminWebinarsPage() {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [banner, setBanner] = useState<WebinarBanner | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWebinarModalOpen, setIsWebinarModalOpen] = useState(false);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [editingWebinar, setEditingWebinar] = useState<Webinar | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [registrations, setRegistrations] = useState<WebinarReg[]>([]);
  const [isLoadingRegs, setIsLoadingRegs] = useState(true);

  const webinarForm = useForm<WebinarFormValues>({
    resolver: zodResolver(webinarSchema) as any,
    defaultValues: {
      category: 'upcoming',
      published: true,
      duration: 60,
      name: '',
    },
  });

  const bannerForm = useForm<BannerFormValues>({
    resolver: zodResolver(bannerSchema) as any,
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [webinarsRes, settingsRes] = await Promise.all([
        fetch('/api/admin/webinars'),
        fetch('/api/admin/webinars/settings'),
      ]);

      if (!webinarsRes.ok) throw new Error('Failed to fetch webinars');
      if (!settingsRes.ok) throw new Error('Failed to fetch settings');

      const webinarsData = await webinarsRes.json();
      const settingsData = await settingsRes.json();

      setWebinars(webinarsData);
      setBanner(settingsData);
    } catch (err: any) {
      toast.error(err.message || 'Error loading data');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRegistrations = async () => {
    setIsLoadingRegs(true);
    try {
      const res = await fetch('/api/admin/webinars/registrations');
      if (res.ok) setRegistrations(await res.json());
    } finally {
      setIsLoadingRegs(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchRegistrations();
  }, []);

  const openAddWebinarModal = () => {
    setEditingWebinar(null);
    webinarForm.reset({
      youtubeUrl: '',
      category: 'upcoming',
      title: '',
      description: '',
      date: '',
      duration: 60,
      name: '',
      published: true,
    });
    setIsWebinarModalOpen(true);
  };

  const openEditWebinarModal = (webinar: Webinar) => {
    setEditingWebinar(webinar);
    webinarForm.setValue('youtubeUrl', webinar.youtubeUrl);
    webinarForm.setValue('category', webinar.category);
    webinarForm.setValue('title', webinar.title);
    webinarForm.setValue('description', webinar.description);
    // Convert stored date string (e.g. "June 10, 2026") to YYYY-MM-DD for date picker
    let dateValue = '';
    if (webinar.date) {
      const parsed = new Date(webinar.date);
      if (!isNaN(parsed.getTime())) {
        dateValue = parsed.toISOString().split('T')[0];
      } else {
        dateValue = webinar.date; // already in YYYY-MM-DD or unknown format — pass through
      }
    }
    webinarForm.setValue('date', dateValue);
    webinarForm.setValue('duration', webinar.duration);
    webinarForm.setValue('name', webinar.name);
    webinarForm.setValue('published', webinar.published);
    setIsWebinarModalOpen(true);
  };

  const openBannerModal = () => {
    if (!banner) return;
    bannerForm.setValue('bannerTitle', banner.bannerTitle);
    bannerForm.setValue('bannerSubtitle', banner.bannerSubtitle);
    bannerForm.setValue('date', banner.date);
    bannerForm.setValue('time', banner.time);
    bannerForm.setValue('duration', banner.duration ?? 60);
    bannerForm.setValue('name', banner.name);
    bannerForm.setValue('totalRegistrations', banner.totalRegistrations);
    setIsBannerModalOpen(true);
  };

  const onWebinarSubmit = async (values: WebinarFormValues) => {
    setIsSubmitting(true);
    try {
      const url = editingWebinar ? `/api/admin/webinars/${editingWebinar._id}` : '/api/admin/webinars';
      const method = editingWebinar ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save webinar');

      toast.success(editingWebinar ? 'Webinar updated successfully' : 'Webinar created successfully');
      setIsWebinarModalOpen(false);
      fetchData();
    } catch (err: any) {
      toast.error(err.message || 'Error saving webinar');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onBannerSubmit = async (values: BannerFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/webinars/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update banner');

      toast.success('Webinar banner updated successfully');
      setIsBannerModalOpen(false);
      fetchData();
    } catch (err: any) {
      toast.error(err.message || 'Error updating banner');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteWebinar = async (id: string) => {
    if (!confirm('Are you sure you want to delete this webinar?')) return;

    try {
      const res = await fetch(`/api/admin/webinars/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete webinar');
      }
      toast.success('Webinar deleted successfully');
      fetchData();
    } catch (err: any) {
      toast.error(err.message || 'Error deleting webinar');
    }
  };

  return (
    <div>
      {/* ── Featured webinar banner editor */}
      {banner && (
        <section className="pt-8 pb-4 mb-8 rounded-2xl overflow-hidden border border-white/8">
          <div className="px-6 md:px-10 pb-4 flex items-center justify-between border-b border-white/8 mb-6">
            <div>
              <h3 className="text-white font-semibold text-md flex items-center gap-1.5">
                <Settings className="w-4.5 h-4.5 text-blue-default" />
                Featured Webinar Banner Configuration
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Manage the main highlight webinar details displayed on the webinars page.
              </p>
            </div>
            <button
              onClick={openBannerModal}
              className="bg-blue-default hover:bg-blue-bright text-white font-semibold py-2 px-4 rounded-lg text-xs transition-all cursor-pointer shadow"
            >
              Edit Webinar Banner
            </button>
          </div>

          <div className="max-w-[1140px] mx-auto px-4 md:px-10">
            <div className="bg-[radial-gradient(ellipse_at_60%_40%,#1e40af_0%,#0a1045_100%)] rounded-2xl p-7 sm:p-9 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              {/* Left content */}
              <div className="sm:col-span-8 text-left">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-[0.68rem] font-semibold tracking-[0.14em] uppercase px-3 py-1.5 rounded-full mb-5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  Next Up · {banner.date}
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-snug">
                  {banner.bannerTitle}
                </h2>
                <p className="text-[0.88rem] text-white/65 leading-relaxed mb-5 max-w-[520px]">
                  {banner.bannerSubtitle}
                </p>
                <div className="flex flex-wrap items-center gap-5 text-[0.75rem] text-white/50 mb-6">
                  {banner.duration ? (
                    <span className="flex items-center gap-1.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {banner.duration} min
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      No Duration Available
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    {banner.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                    {banner.name}
                  </span>
                </div>
                <button 
                  disabled
                  className="bg-blue-default/60 text-white/80 font-semibold py-2.5 px-7 rounded-lg text-[0.9rem] border-none shadow-lg cursor-not-allowed"
                >
                  Register Free →
                </button>
              </div>

              {/* Right stats */}
              <div className="sm:col-span-4 flex flex-row sm:flex-col gap-3">
                <div className="flex-1 bg-white/8 border border-white/12 rounded-xl p-5 text-center">
                  <span className="font-serif text-4xl font-extrabold text-white block leading-none mb-1">{banner.totalRegistrations}</span>
                  <span className="text-[0.66rem] font-semibold tracking-[0.14em] uppercase text-white/40">Registered So Far</span>
                </div>
                <div className="flex-1 bg-white/8 border border-white/12 rounded-xl p-5 text-center">
                  <span className="font-serif text-4xl font-extrabold text-white block leading-none mb-1">Free</span>
                  <span className="text-[0.66rem] font-semibold tracking-[0.14em] uppercase text-white/40">No Cost · CE Credit Pending</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* webinars management section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Manage Webinar Sessions</h2>
          <p className="text-xs text-gray-500">Create new recorded watch-links or upcoming registration-based webinars shown in All Sessions.</p>
        </div>
        <button
          onClick={openAddWebinarModal}
          className="bg-blue-default hover:bg-blue-bright text-white font-semibold py-2 px-4 rounded-lg text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4" />
          Add Webinar Session
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <span className="w-8 h-8 border-3 border-blue-default border-t-transparent rounded-full animate-spin" />
        </div>
      ) : webinars.length === 0 ? (
        <div className="text-center py-20 text-gray-500 font-semibold border border-dashed border-white/8 rounded-xl">
          No webinar sessions found. Click &quot;Add Webinar Session&quot; to create one.
        </div>
      ) : (
        <div className="overflow-x-auto border border-white/8  rounded-xl">
          <table className="w-full text-left border-collapse text-sm text-white">
            <thead>
              <tr className="border-b border border-white/8 text-white text-xs font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Title / Speaker</th>
                <th className="py-3 px-4">Schedule Details</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y border border-white/8">
              {webinars.map((webinar) => (
                <tr key={webinar._id} className=" transition-colors">
                  <td className="py-3.5 px-4">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                      webinar.category === 'upcoming' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-blue-500/10 text-blue-600'
                    }`}>
                      {webinar.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-normal text-white leading-tight">{webinar.title}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {webinar.name}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-white text-xs">{webinar.date}</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">{webinar.duration} minutes</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-xs font-semibold ${webinar.published ? 'text-emerald-600' : 'text-gray-400'}`}>
                      {webinar.published ? 'Published' : 'Hidden'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditWebinarModal(webinar)}
                        className="p-1.5 rounded hover:bg-blue-500/10 text-white border-none cursor-pointer transition-colors"
                        title="Edit Webinar"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteWebinar(webinar._id)}
                        className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-600 border-none cursor-pointer transition-colors"
                        title="Delete Webinar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Registrations ── */}
      <div className="mt-12">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-blue-glow" />
          <h3 className="text-base font-semibold text-white">Webinar Registrations</h3>
          <span className="ml-1 bg-blue-default/20 text-blue-glow text-[10px] font-bold px-2 py-0.5 rounded-full">
            {registrations.length}
          </span>
        </div>

        {isLoadingRegs ? (
          <div className="flex items-center justify-center py-10">
            <span className="w-6 h-6 border-2 border-blue-default border-t-transparent rounded-full animate-spin" />
          </div>
        ) : registrations.length === 0 ? (
          <p className="text-sm text-gray-500 py-6">No registrations yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm text-gray-300">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-xs font-semibold uppercase tracking-wider">
                  <th className="py-2.5 px-4">Name</th>
                  <th className="py-2.5 px-4">Email</th>
                  <th className="py-2.5 px-4">WhatsApp</th>
                  <th className="py-2.5 px-4">Registered At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {registrations.map(r => (
                  <tr key={r._id} className="hover:bg-white/2 transition-colors">
                    <td className="py-3 px-4 font-semibold text-white">{r.name}</td>
                    <td className="py-3 px-4 text-gray-400">{r.email}</td>
                    <td className="py-3 px-4 text-gray-400">{r.whatsAppNumber}</td>
                    <td className="py-3 px-4 text-gray-500 text-xs">
                      {new Date(r.registeredAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Banner settings Edit Modal */}
      {isBannerModalOpen && banner && (
        <div className="fixed inset-0 z-[5000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-white/8 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh] text-navy-text">
            <div className="flex items-center justify-between border-b border-white/8 p-5">
              <h3 className="text-lg font-semibold flex items-center gap-1.5">
                <Settings className="w-4.5 h-4.5 text-blue-default" /> Edit Webinar Banner
              </h3>
              <button
                onClick={() => setIsBannerModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 border-none cursor-pointer flex items-center justify-center text-gray-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={bannerForm.handleSubmit(onBannerSubmit)} className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Banner Title
                </label>
                <input
                  type="text"
                  {...bannerForm.register('bannerTitle')}
                  className="w-full bg-gray-50 border border-border-light rounded-lg px-3.5 py-2 text-navy-text text-sm focus:border-blue-default outline-none"
                />
                {bannerForm.formState.errors.bannerTitle && (
                  <span className="text-red-500 text-xs mt-1 block">{bannerForm.formState.errors.bannerTitle.message}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Banner Subtitle/Description
                </label>
                <textarea
                  rows={4}
                  {...bannerForm.register('bannerSubtitle')}
                  className="w-full bg-gray-50 border border-border-light rounded-lg px-3.5 py-2 text-navy-text text-sm focus:border-blue-default outline-none resize-none font-sans"
                />
                {bannerForm.formState.errors.bannerSubtitle && (
                  <span className="text-red-500 text-xs mt-1 block">{bannerForm.formState.errors.bannerSubtitle.message}</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Date String
                  </label>
                  <input
                    type="text"
                    {...bannerForm.register('date')}
                    className="w-full bg-gray-50 border border-white/8 rounded-lg px-3.5 py-2 text-navy-text text-sm focus:border-blue-default outline-none"
                  />
                  {bannerForm.formState.errors.date && (
                    <span className="text-red-500 text-xs mt-1 block">{bannerForm.formState.errors.date.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Time String
                  </label>
                  <input
                    type="text"
                    {...bannerForm.register('time')}
                    className="w-full bg-gray-50 border border-border-light rounded-lg px-3.5 py-2 text-navy-text text-sm focus:border-blue-default outline-none"
                  />
                  {bannerForm.formState.errors.time && (
                    <span className="text-red-500 text-xs mt-1 block">{bannerForm.formState.errors.time.message}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Duration
                </label>
                <select
                  {...bannerForm.register('duration')}
                  className="w-full bg-gray-50 border border-border-light rounded-lg px-3 py-2 text-navy-text text-sm focus:border-blue-default outline-none"
                >
                  <option value="15">15 min</option>
                  <option value="30">30 min</option>
                  <option value="35">35 min</option>
                  <option value="40">40 min</option>
                  <option value="45">45 min</option>
                  <option value="50">50 min</option>
                  <option value="55">55 min</option>
                  <option value="60">60 min</option>
                  <option value="75">75 min</option>
                  <option value="90">90 min</option>
                  <option value="120">120 min</option>
                </select>
                {bannerForm.formState.errors.duration && (
                  <span className="text-red-500 text-xs mt-1 block">{bannerForm.formState.errors.duration.message}</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Speaker/Host Name
                  </label>
                  <input
                    type="text"
                    {...bannerForm.register('name')}
                    className="w-full bg-gray-50 border border-border-light rounded-lg px-3.5 py-2 text-navy-text text-sm focus:border-blue-default outline-none"
                  />
                  {bannerForm.formState.errors.name && (
                    <span className="text-red-500 text-xs mt-1 block">{bannerForm.formState.errors.name.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Total Registrations Stat
                  </label>
                  <input
                    type="number"
                    {...bannerForm.register('totalRegistrations')}
                    className="w-full bg-gray-50 border border-border-light rounded-lg px-3.5 py-2 text-navy-text text-sm focus:border-blue-default outline-none"
                  />
                  {bannerForm.formState.errors.totalRegistrations && (
                    <span className="text-red-500 text-xs mt-1 block">{bannerForm.formState.errors.totalRegistrations.message}</span>
                  )}
                </div>
              </div>

              <div className="border-t border-border-light pt-5 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsBannerModalOpen(false)}
                  className="bg-transparent hover:bg-gray-50 border border-border-light text-navy-text font-semibold py-2 px-4 rounded-lg text-xs cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-default hover:bg-blue-bright text-white font-semibold py-2 px-5 rounded-lg text-xs cursor-pointer disabled:opacity-50 disabled:pointer-events-none transition-colors shadow"
                >
                  {isSubmitting ? 'Saving...' : 'Update Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Webinar Session Add/Edit Modal */}
      {isWebinarModalOpen && (
        <div className="fixed inset-0 z-[5000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-border-light rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh] text-navy-text">
            <div className="flex items-center justify-between border-b border-border-light p-5">
              <h3 className="text-lg font-semibold">
                {editingWebinar ? 'Edit Webinar Session' : 'Add New Webinar'}
              </h3>
              <button
                onClick={() => setIsWebinarModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 border-none cursor-pointer flex items-center justify-center text-gray-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={webinarForm.handleSubmit(onWebinarSubmit)} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Webinar Category
                  </label>
                  <select
                    {...webinarForm.register('category')}
                    className="w-full bg-gray-50 border border-border-light rounded-lg px-3 py-2 text-navy-text text-sm focus:border-blue-default outline-none"
                  >
                    <option value="upcoming">Upcoming Session (Register Link)</option>
                    <option value="recorded">Recorded Session (Watch Link)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    YouTube URL (Full Link)
                  </label>
                  <input
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=..."
                    {...webinarForm.register('youtubeUrl')}
                    className="w-full bg-gray-50 border border-border-light rounded-lg px-3.5 py-2 text-navy-text text-sm focus:border-blue-default outline-none"
                  />
                  {webinarForm.formState.errors.youtubeUrl && (
                    <span className="text-red-500 text-xs mt-1 block">{webinarForm.formState.errors.youtubeUrl.message}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Digital Smile Design workflow..."
                  {...webinarForm.register('title')}
                  className="w-full bg-gray-50 border border-border-light rounded-lg px-3.5 py-2 text-navy-text text-sm focus:border-blue-default outline-none"
                />
                {webinarForm.formState.errors.title && (
                  <span className="text-red-500 text-xs mt-1 block">{webinarForm.formState.errors.title.message}</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Date
                    <span className="ml-1 text-gray-400 font-normal normal-case">(required for upcoming)</span>
                  </label>
                  <input
                    type="date"
                    {...webinarForm.register('date')}
                    className="w-full bg-gray-50 border border-border-light rounded-lg px-3.5 py-2 text-navy-text text-sm focus:border-blue-default outline-none"
                  />
                  {webinarForm.formState.errors.date && (
                    <span className="text-red-500 text-xs mt-1 block">{webinarForm.formState.errors.date.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Duration
                  </label>
                  <select
                    {...webinarForm.register('duration')}
                    className="w-full bg-gray-50 border border-border-light rounded-lg px-3 py-2 text-navy-text text-sm focus:border-blue-default outline-none"
                  >
                    <option value="15">15 min</option>
                    <option value="30">30 min</option>
                    <option value="35">35 min</option>
                    <option value="40">40 min</option>
                    <option value="45">45 min</option>
                    <option value="50">50 min</option>
                    <option value="55">55 min</option>
                    <option value="60">60 min</option>
                    <option value="75">75 min</option>
                    <option value="90">90 min</option>
                    <option value="120">120 min</option>
                  </select>
                  {webinarForm.formState.errors.duration && (
                    <span className="text-red-500 text-xs mt-1 block">{webinarForm.formState.errors.duration.message}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Erik Morales"
                  {...webinarForm.register('name')}
                  className="w-full bg-gray-50 border border-border-light rounded-lg px-3.5 py-2 text-navy-text text-sm focus:border-blue-default outline-none"
                />
                {webinarForm.formState.errors.name && (
                  <span className="text-red-500 text-xs mt-1 block">{webinarForm.formState.errors.name.message}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter a brief summary of the webinar topic..."
                  {...webinarForm.register('description')}
                  className="w-full bg-gray-50 border border-border-light rounded-lg px-3.5 py-2 text-navy-text text-sm focus:border-blue-default outline-none resize-none font-sans"
                />
                {webinarForm.formState.errors.description && (
                  <span className="text-red-500 text-xs mt-1 block">{webinarForm.formState.errors.description.message}</span>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="webinarPublished"
                  {...webinarForm.register('published')}
                  className="w-4 h-4 accent-blue-default"
                />
                <label htmlFor="webinarPublished" className="text-xs font-semibold cursor-pointer select-none">
                  Publish immediately (show on website)
                </label>
              </div>

              <div className="border-t border-border-light pt-5 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsWebinarModalOpen(false)}
                  className="bg-transparent hover:bg-gray-50 border border-border-light text-navy-text font-semibold py-2 px-4 rounded-lg text-xs cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-default hover:bg-blue-bright text-white font-semibold py-2 px-5 rounded-lg text-xs cursor-pointer disabled:opacity-50 disabled:pointer-events-none transition-colors shadow"
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
