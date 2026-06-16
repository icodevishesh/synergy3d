'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { Edit2, Trash2, Plus, X, Eye, EyeOff, Lock, Unlock, Users, Sparkles, RefreshCw, Film } from 'lucide-react';

const talkSchema = z.object({
  episodeNumber: z.coerce.number().min(1, 'Episode number must be at least 1'),
  youtubeId: z.string().min(1, 'YouTube Video ID is required').regex(/^[a-zA-Z0-9_-]{11}$/, 'Must be a valid 11-character YouTube video ID'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  guest: z.string().min(1, 'Guest is required'),
  category: z.string().min(1, 'Category is required'),
  docName: z.string().optional().or(z.literal('')),
  duration: z.string().min(1, 'Duration is required').regex(/^\d+:\d+$/, 'Duration must be in format MM:SS (e.g. 12:34)'),
  published: z.boolean().default(true),
  locked: z.boolean().default(false),
});

type TalkFormValues = z.infer<typeof talkSchema>;

const featuredSchema = z.object({
  episodeNumber: z.coerce.number().min(1, 'Episode number must be at least 1'),
  youtubeId: z.string().min(1, 'YouTube Video ID is required').regex(/^[a-zA-Z0-9_-]{11}$/, 'Must be a valid 11-character YouTube video ID'),
  title: z.string().min(1, 'Title is required'),
  guest: z.string().optional().or(z.literal('')),
  duration: z.string().min(1, 'Duration is required').regex(/^\d+:\d+$/, 'Duration must be in format MM:SS (e.g. 12:34)'),
});

type FeaturedFormValues = z.infer<typeof featuredSchema>;

interface Talk {
  _id: string;
  youtubeId: string;
  episodeNumber: number;
  title: string;
  description: string;
  guest: string;
  category: string;
  docName?: string;
  duration: string;
  published: boolean;
  locked: boolean;
}

interface FeaturedTalk {
  _id?: string;
  youtubeId: string;
  episodeNumber: number;
  title: string;
  guest: string;
  duration: string;
  updatedAt?: string;
}

interface TalkUnlock {
  _id: string;
  name: string;
  email: string;
  practice: string;
  unlockedAt: string;
}

export default function AdminTalksPage() {
  const [talks, setTalks] = useState<Talk[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTalk, setEditingTalk] = useState<Talk | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [featuredTalk, setFeaturedTalk] = useState<FeaturedTalk | null>(null);
  const [isLoadingFeatured, setIsLoadingFeatured] = useState(true);
  const [isFeaturedModalOpen, setIsFeaturedModalOpen] = useState(false);
  const [isSubmittingFeatured, setIsSubmittingFeatured] = useState(false);

  const [unlocks, setUnlocks] = useState<TalkUnlock[]>([]);
  const [isLoadingUnlocks, setIsLoadingUnlocks] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TalkFormValues>({
    resolver: zodResolver(talkSchema) as any,
    defaultValues: {
      published: true,
      docName: '',
    },
  });

  const {
    register: registerFeatured,
    handleSubmit: handleSubmitFeatured,
    reset: resetFeatured,
    setValue: setValueFeatured,
    formState: { errors: featuredErrors },
  } = useForm<FeaturedFormValues>({
    resolver: zodResolver(featuredSchema) as any,
    defaultValues: {
      episodeNumber: 1,
      youtubeId: '',
      title: '',
      guest: '',
      duration: '',
    },
  });

  const fetchTalks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/talks');
      if (!res.ok) throw new Error('Failed to fetch talks');
      const data = await res.json();
      setTalks(data);
    } catch (err: any) {
      toast.error(err.message || 'Error loading talks');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFeaturedTalk = async () => {
    setIsLoadingFeatured(true);
    try {
      const res = await fetch('/api/admin/talks/featured');
      if (res.ok) {
        const data = await res.json();
        setFeaturedTalk(data);
      }
    } catch (err: any) {
      console.error('Error fetching featured talk:', err);
    } finally {
      setIsLoadingFeatured(false);
    }
  };

  const fetchUnlocks = async () => {
    setIsLoadingUnlocks(true);
    try {
      const res = await fetch('/api/admin/talks/unlocks');
      if (res.ok) setUnlocks(await res.json());
    } finally {
      setIsLoadingUnlocks(false);
    }
  };

  useEffect(() => {
    fetchTalks();
    fetchUnlocks();
    fetchFeaturedTalk();
  }, []);

  const openAddModal = () => {
    setEditingTalk(null);
    reset({
      episodeNumber: talks.length > 0 ? Math.max(...talks.map(t => t.episodeNumber)) + 1 : 1,
      youtubeId: '',
      title: '',
      description: '',
      guest: '',
      category: 'clinical',
      docName: '',
      duration: '',
      published: true,
      locked: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (talk: Talk) => {
    setEditingTalk(talk);
    setValue('episodeNumber', talk.episodeNumber);
    setValue('youtubeId', talk.youtubeId);
    setValue('title', talk.title);
    setValue('description', talk.description);
    setValue('guest', talk.guest);
    setValue('category', talk.category);
    setValue('docName', talk.docName || '');
    setValue('duration', talk.duration);
    setValue('published', talk.published);
    setValue('locked', talk.locked || false);
    setIsModalOpen(true);
  };

  const onSubmit = async (values: TalkFormValues) => {
    setIsSubmitting(true);
    try {
      const url = editingTalk ? `/api/admin/talks/${editingTalk._id}` : '/api/admin/talks';
      const method = editingTalk ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save talk');

      toast.success(editingTalk ? 'Talk updated successfully' : 'Talk created successfully');
      setIsModalOpen(false);
      fetchTalks();
    } catch (err: any) {
      toast.error(err.message || 'Error saving talk');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openFeaturedModal = () => {
    if (featuredTalk) {
      resetFeatured({
        episodeNumber: featuredTalk.episodeNumber,
        youtubeId: featuredTalk.youtubeId,
        title: featuredTalk.title,
        guest: featuredTalk.guest || '',
        duration: featuredTalk.duration || '',
      });
    } else if (talks.length > 0) {
      // Pre-fill with latest episode details
      const latest = [...talks].sort((a, b) => b.episodeNumber - a.episodeNumber)[0];
      resetFeatured({
        episodeNumber: latest.episodeNumber,
        youtubeId: latest.youtubeId,
        title: latest.title,
        guest: latest.guest || '',
        duration: latest.duration || '',
      });
    } else {
      resetFeatured({
        episodeNumber: 1,
        youtubeId: '',
        title: '',
        guest: '',
        duration: '',
      });
    }
    setIsFeaturedModalOpen(true);
  };

  const onSubmitFeatured = async (values: FeaturedFormValues) => {
    setIsSubmittingFeatured(true);
    try {
      const res = await fetch('/api/admin/talks/featured', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save featured video');

      toast.success('Featured video updated successfully');
      setIsFeaturedModalOpen(false);
      fetchFeaturedTalk();
    } catch (err: any) {
      toast.error(err.message || 'Error saving featured video');
    } finally {
      setIsSubmittingFeatured(false);
    }
  };

  const handleResetFeatured = async () => {
    if (!confirm('Are you sure you want to reset the featured video to the latest episode?')) return;
    try {
      const res = await fetch('/api/admin/talks/featured', { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to reset featured video');
      toast.success('Featured video reset to default');
      fetchFeaturedTalk();
    } catch (err: any) {
      toast.error(err.message || 'Error resetting featured video');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this episode?')) return;

    try {
      const res = await fetch(`/api/admin/talks/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete talk');
      }
      toast.success('Talk deleted successfully');
      fetchTalks();
    } catch (err: any) {
      toast.error(err.message || 'Error deleting talk');
    }
  };

  const togglePublish = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/talks/${id}/publish`, { method: 'PATCH' });
      if (!res.ok) throw new Error('Failed to toggle publish status');
      toast.success('Publish status updated');
      fetchTalks();
    } catch (err: any) {
      toast.error(err.message || 'Error toggling publish');
    }
  };

  const toggleLock = async (id: string) => {
    try {
      const talk = talks.find(t => t._id === id);
      if (!talk) return;
      const res = await fetch(`/api/admin/talks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locked: !talk.locked }),
      });
      if (!res.ok) throw new Error('Failed to toggle lock status');
      toast.success(talk.locked ? 'Episode unlocked' : 'Episode locked');
      fetchTalks();
    } catch (err: any) {
      toast.error(err.message || 'Error toggling lock');
    }
  };

  const latestTalk = talks.length > 0 ? [...talks].sort((a, b) => b.episodeNumber - a.episodeNumber)[0] : null;
  const currentFeatured = featuredTalk || (latestTalk ? {
    youtubeId: latestTalk.youtubeId,
    episodeNumber: latestTalk.episodeNumber,
    title: latestTalk.title,
    guest: latestTalk.guest,
    duration: latestTalk.duration,
  } : null);
  const isCustomFeatured = !!featuredTalk;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Manage Talks Episodes</h2>
          <p className="text-xs text-muted-dark">Add, update, or remove podcast episodes shown on the site.</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-blue-default hover:bg-blue-bright text-white font-semibold py-2 px-4 rounded-lg text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4" />
          Add Episode
        </button>
      </div>

      {/* Featured Video Section */}
      <div className="bg-navy-card border border-white/10 rounded-2xl p-5 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/5 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-blue-default/15 border border-blue-glow/20 flex items-center justify-center text-blue-glow">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                Featured Video
                {isLoadingFeatured ? (
                  <span className="w-3.5 h-3.5 border-2 border-blue-default border-t-transparent rounded-full animate-spin inline-block" />
                ) : isCustomFeatured ? (
                  <span className="bg-blue-default/20 text-blue-glow border border-blue-glow/20 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    Custom
                  </span>
                ) : (
                  <span className="bg-white/5 text-gray-400 border border-white/10 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Default Fallback
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-muted-dark mt-0.5">
                This video is highlighted in the hero section of the Synergy Talks landing page.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={openFeaturedModal}
              className="bg-blue-default hover:bg-blue-bright text-white font-semibold py-2 px-3.5 rounded-lg text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow"
            >
              <Edit2 className="w-3.5 h-3.5" />
              {isCustomFeatured ? 'Edit Custom Video' : 'Set Custom Video'}
            </button>
            {isCustomFeatured && (
              <button
                onClick={handleResetFeatured}
                className="bg-white/5 hover:bg-white/10 text-white font-semibold py-2 px-3.5 rounded-lg text-xs transition-all cursor-pointer flex items-center gap-1.5 border border-white/10"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset to Default
              </button>
            )}
          </div>
        </div>

        {isLoadingFeatured ? (
          <div className="flex items-center justify-center py-6">
            <span className="w-6 h-6 border-2 border-blue-default border-t-transparent rounded-full animate-spin" />
          </div>
        ) : currentFeatured ? (
          <div className="flex flex-col sm:flex-row items-center gap-5">
            {/* Visual Youtube Preview */}
            <div className="w-full sm:w-52 aspect-video bg-navy rounded-lg overflow-hidden border border-white/10 relative group shrink-0">
              <img
                src={`https://img.youtube.com/vi/${currentFeatured.youtubeId}/mqdefault.jpg`}
                alt={currentFeatured.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                  <svg className="ml-0.5 text-white" width="12" height="12" viewBox="0 0 16 18" fill="none">
                    <path d="M1 1.5L15 9L1 16.5V1.5Z" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Featured Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-bold tracking-wider text-blue-glow uppercase">
                  Episode {currentFeatured.episodeNumber}
                </span>
                <span className="text-white/25">•</span>
                <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  {currentFeatured.duration}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-white truncate max-w-xl">
                {currentFeatured.title}
              </h4>
              <p className="text-xs text-muted-dark mt-1">
                Guest: <span className="text-white/80 font-medium">{currentFeatured.guest || 'N/A'}</span>
              </p>
              {!isCustomFeatured && (
                <p className="text-[10px] text-gray-500 italic mt-3.5 flex items-center gap-1">
                  <span>ℹ️</span> Showing latest episode automatically because no custom featured video is set.
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-xs text-gray-500 font-medium">
            No video currently featured. Create a regular episode or set a custom featured video to get started.
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <span className="w-8 h-8 border-3 border-blue-default border-t-transparent rounded-full animate-spin" />
        </div>
      ) : talks.length === 0 ? (
        <div className="text-center py-20 text-gray-500 font-semibold">
          No episodes found. Click &quot;Add Episode&quot; to create one.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm text-gray-300">
            <thead>
              <tr className="border-b border-white/10 text-white/50 text-xs font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">EP</th>
                <th className="py-3 px-4">Title / Guest</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Access</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {talks.map((talk) => (
                <tr key={talk._id} className="hover:bg-white/2 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-blue-glow">EP {talk.episodeNumber}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white leading-tight">{talk.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{talk.guest}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5 text-xs text-white capitalize">
                      {talk.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">{talk.duration}</td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => togglePublish(talk._id)}
                      className={`inline-flex items-center gap-1 border-none bg-transparent cursor-pointer text-xs font-semibold transition-all ${
                        talk.published ? 'text-emerald-400' : 'text-gray-500'
                      }`}
                      title={talk.published ? 'Click to unpublish' : 'Click to publish'}
                    >
                      {talk.published ? (
                        <>
                          <Eye className="w-3.5 h-3.5" /> Published
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5" /> Hidden
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => toggleLock(talk._id)}
                      className={`inline-flex items-center gap-1 border-none bg-transparent cursor-pointer text-xs font-semibold transition-all ${
                        talk.locked ? 'text-blue-glow' : 'text-gray-500'
                      }`}
                      title={talk.locked ? 'Click to unlock' : 'Click to lock'}
                    >
                      {talk.locked ? (
                        <>
                          <Lock className="w-3.5 h-3.5" /> Locked
                        </>
                      ) : (
                        <>
                          <Unlock className="w-3.5 h-3.5" /> Public
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(talk)}
                        className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white border-none cursor-pointer transition-colors"
                        title="Edit Episode"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(talk._id)}
                        className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 border-none cursor-pointer transition-colors"
                        title="Delete Episode"
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

      {/* ── Unlocked Users ── */}
      <div className="mt-12">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-blue-glow" />
          <h3 className="text-base font-semibold text-white">Unlocked Users</h3>
          <span className="ml-1 bg-blue-default/20 text-blue-glow text-[10px] font-bold px-2 py-0.5 rounded-full">
            {unlocks.length}
          </span>
        </div>

        {isLoadingUnlocks ? (
          <div className="flex items-center justify-center py-10">
            <span className="w-6 h-6 border-2 border-blue-default border-t-transparent rounded-full animate-spin" />
          </div>
        ) : unlocks.length === 0 ? (
          <p className="text-sm text-gray-500 py-6">No users have unlocked episodes yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm text-gray-300">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-xs font-semibold uppercase tracking-wider">
                  <th className="py-2.5 px-4">Name</th>
                  <th className="py-2.5 px-4">Email</th>
                  <th className="py-2.5 px-4">Practice</th>
                  <th className="py-2.5 px-4">Unlocked At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {unlocks.map(u => (
                  <tr key={u._id} className="hover:bg-white/2 transition-colors">
                    <td className="py-3 px-4 font-semibold text-white">{u.name}</td>
                    <td className="py-3 px-4 text-gray-400">{u.email}</td>
                    <td className="py-3 px-4 text-gray-400">{u.practice}</td>
                    <td className="py-3 px-4 text-gray-500 text-xs">
                      {new Date(u.unlockedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[5000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy border border-white/10 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <h3 className="text-lg font-semibold text-white">
                {editingTalk ? `Edit Episode ${editingTalk.episodeNumber}` : 'Add New Episode'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border-none cursor-pointer flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Episode Number
                  </label>
                  <input
                    type="number"
                    {...register('episodeNumber')}
                    className="w-full bg-navy-card border border-white/10 rounded-lg px-3.5 py-2 text-white text-sm focus:border-blue-default outline-none"
                  />
                  {errors.episodeNumber && (
                    <span className="text-red-400 text-xs mt-1 block">{errors.episodeNumber.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    YouTube Video ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. dQw4w9WgXcQ"
                    {...register('youtubeId')}
                    className="w-full bg-navy-card border border-white/10 rounded-lg px-3.5 py-2 text-white text-sm focus:border-blue-default outline-none"
                  />
                  {errors.youtubeId && (
                    <span className="text-red-400 text-xs mt-1 block">{errors.youtubeId.message}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="The future of digital dentistry..."
                  {...register('title')}
                  className="w-full bg-navy-card border border-white/10 rounded-lg px-3.5 py-2 text-white text-sm focus:border-blue-default outline-none"
                />
                {errors.title && (
                  <span className="text-red-400 text-xs mt-1 block">{errors.title.message}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Guest Speaker
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Jane Doe, Orthodontist"
                  {...register('guest')}
                  className="w-full bg-navy-card border border-white/10 rounded-lg px-3.5 py-2 text-white text-sm focus:border-blue-default outline-none"
                />
                {errors.guest && (
                  <span className="text-red-400 text-xs mt-1 block">{errors.guest.message}</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    {...register('category')}
                    className="w-full bg-navy-card border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-default outline-none"
                  >
                    <option value="clinical">Clinical</option>
                    <option value="technology">Technology</option>
                    <option value="materials">Materials</option>
                    <option value="business">Business</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Duration (MM:SS)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 45:12"
                    {...register('duration')}
                    className="w-full bg-navy-card border border-white/10 rounded-lg px-3.5 py-2 text-white text-sm focus:border-blue-default outline-none"
                  />
                  {errors.duration && (
                    <span className="text-red-400 text-xs mt-1 block">{errors.duration.message}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Referenced Document Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. guide-all-on-x.pdf"
                  {...register('docName')}
                  className="w-full bg-navy-card border border-white/10 rounded-lg px-3.5 py-2 text-white text-sm focus:border-blue-default outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter details about this podcast episode..."
                  {...register('description')}
                  className="w-full bg-navy-card border border-white/10 rounded-lg px-3.5 py-2 text-white text-sm focus:border-blue-default outline-none resize-none font-sans"
                />
                {errors.description && (
                  <span className="text-red-400 text-xs mt-1 block">{errors.description.message}</span>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="published"
                  {...register('published')}
                  className="w-4 h-4 accent-blue-default"
                />
                <label htmlFor="published" className="text-xs font-semibold text-white cursor-pointer select-none">
                  Publish immediately (show on website)
                </label>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="locked"
                  {...register('locked')}
                  className="w-4 h-4 accent-blue-default"
                />
                <label htmlFor="locked" className="text-xs font-semibold text-white cursor-pointer select-none">
                  Lock episode (requires name, email, and phone to unlock)
                </label>
              </div>

              <div className="border-t border-white/10 pt-5 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-transparent hover:bg-white/5 border border-white/10 text-white font-semibold py-2 px-4 rounded-lg text-xs cursor-pointer transition-colors"
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

      {/* Featured Video Modal */}
      {isFeaturedModalOpen && (
        <div className="fixed inset-0 z-[5000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy border border-white/10 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <h3 className="text-lg font-semibold text-white">
                {isCustomFeatured ? 'Update Featured Video' : 'Set Custom Featured Video'}
              </h3>
              <button
                onClick={() => setIsFeaturedModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border-none cursor-pointer flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitFeatured(onSubmitFeatured)} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Episode Number
                  </label>
                  <input
                    type="number"
                    {...registerFeatured('episodeNumber')}
                    className="w-full bg-navy-card border border-white/10 rounded-lg px-3.5 py-2 text-white text-sm focus:border-blue-default outline-none"
                  />
                  {featuredErrors.episodeNumber && (
                    <span className="text-red-400 text-xs mt-1 block">{featuredErrors.episodeNumber.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    YouTube Video ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. dQw4w9WgXcQ"
                    {...registerFeatured('youtubeId')}
                    className="w-full bg-navy-card border border-white/10 rounded-lg px-3.5 py-2 text-white text-sm focus:border-blue-default outline-none"
                  />
                  {featuredErrors.youtubeId && (
                    <span className="text-red-400 text-xs mt-1 block">{featuredErrors.youtubeId.message}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="The future of digital dentistry..."
                  {...registerFeatured('title')}
                  className="w-full bg-navy-card border border-white/10 rounded-lg px-3.5 py-2 text-white text-sm focus:border-blue-default outline-none"
                />
                {featuredErrors.title && (
                  <span className="text-red-400 text-xs mt-1 block">{featuredErrors.title.message}</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Guest Speaker
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Jane Doe"
                    {...registerFeatured('guest')}
                    className="w-full bg-navy-card border border-white/10 rounded-lg px-3.5 py-2 text-white text-sm focus:border-blue-default outline-none"
                  />
                  {featuredErrors.guest && (
                    <span className="text-red-400 text-xs mt-1 block">{featuredErrors.guest.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Duration (MM:SS)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 45:12"
                    {...registerFeatured('duration')}
                    className="w-full bg-navy-card border border-white/10 rounded-lg px-3.5 py-2 text-white text-sm focus:border-blue-default outline-none"
                  />
                  {featuredErrors.duration && (
                    <span className="text-red-400 text-xs mt-1 block">{featuredErrors.duration.message}</span>
                  )}
                </div>
              </div>

              <div className="border-t border-white/10 pt-5 flex items-center justify-end gap-3 font-sans">
                <button
                  type="button"
                  onClick={() => setIsFeaturedModalOpen(false)}
                  className="bg-transparent hover:bg-white/5 border border-white/10 text-white font-semibold py-2 px-4 rounded-lg text-xs cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingFeatured}
                  className="bg-blue-default hover:bg-blue-bright text-white font-semibold py-2 px-5 rounded-lg text-xs cursor-pointer disabled:opacity-50 disabled:pointer-events-none transition-colors shadow"
                >
                  {isSubmittingFeatured ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
