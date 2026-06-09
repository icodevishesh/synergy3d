'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { Edit2, Trash2, Plus, X, Star, Link as LinkIcon } from 'lucide-react';

// Zod schemas
const customerSchema = z.object({
  youtubeId: z.string().optional().or(z.literal('')),
  customerName: z.string().min(1, 'Customer Name is required'),
  title: z.string().min(1, 'Title is required (e.g. General Dentist)'),
  location: z.string().min(1, 'Location/Practice details is required'),
  description: z.string().min(1, 'Description/Quote is required'),
  category: z.enum(['private', 'group', 'dso']),
  tag: z.string().optional().or(z.literal('')),
  tagColor: z.enum(['emerald', 'blue', 'violet', 'amber']),
  rating: z.coerce.number().min(1).max(5).default(5),
  published: z.boolean().default(true),
  featuredOnHomepage: z.boolean().default(false),
});

const partnerSchema = z.object({
  name: z.string().min(1, 'Partner Name is required'),
  logoUrl: z.string().min(1, 'Logo URL is required').url('Must be a valid URL'),
  websiteUrl: z.string().min(1, 'Website URL is required').url('Must be a valid URL'),
  order: z.coerce.number().default(0),
});

type CustomerFormValues = z.infer<typeof customerSchema>;
type PartnerFormValues = z.infer<typeof partnerSchema>;

interface CustomerStory {
  _id: string;
  youtubeId?: string;
  title: string;
  description: string;
  category: string;
  customerName: string;
  customerImage?: string;
  location: string;
  published: boolean;
  featuredOnHomepage: boolean;
  rating: number;
  tag?: string;
  tagColor?: string;
}

interface Partner {
  _id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  order: number;
}

export default function AdminCustomersPage() {
  const [stories, setStories] = useState<CustomerStory[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<CustomerStory | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const storyForm = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema) as any,
    defaultValues: {
      category: 'private',
      published: true,
      featuredOnHomepage: false,
      rating: 5,
      tagColor: 'emerald',
      youtubeId: '',
      tag: '',
    },
  });

  const partnerForm = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerSchema) as any,
    defaultValues: {
      order: 0,
    },
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [storiesRes, partnersRes] = await Promise.all([
        fetch('/api/admin/customers'),
        fetch('/api/admin/customers/partners'),
      ]);

      if (!storiesRes.ok) throw new Error('Failed to fetch customer stories');
      if (!partnersRes.ok) throw new Error('Failed to fetch partners');

      const storiesData = await storiesRes.json();
      const partnersData = await partnersRes.json();

      setStories(storiesData);
      setPartners(partnersData);
    } catch (err: any) {
      toast.error(err.message || 'Error loading data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddStoryModal = () => {
    setEditingStory(null);
    storyForm.reset({
      youtubeId: '',
      customerName: '',
      title: '',
      location: '',
      description: '',
      category: 'private',
      tag: '',
      tagColor: 'emerald',
      rating: 5,
      published: true,
      featuredOnHomepage: false,
    });
    setIsStoryModalOpen(true);
  };

  // Opens the same modal but explicitly for a text-only (no YouTube) testimonial
  const openAddTextTestimonialModal = () => {
    openAddStoryModal();
  };

  const openEditStoryModal = (story: CustomerStory) => {
    setEditingStory(story);
    storyForm.setValue('youtubeId', story.youtubeId || '');
    storyForm.setValue('customerName', story.customerName);
    storyForm.setValue('title', story.title);
    storyForm.setValue('location', story.location);
    storyForm.setValue('description', story.description);
    storyForm.setValue('category', story.category as any);
    storyForm.setValue('tag', story.tag || '');
    storyForm.setValue('tagColor', (story.tagColor || 'emerald') as any);
    storyForm.setValue('rating', story.rating);
    storyForm.setValue('published', story.published);
    storyForm.setValue('featuredOnHomepage', story.featuredOnHomepage);
    setIsStoryModalOpen(true);
  };

  const openAddPartnerModal = () => {
    partnerForm.reset({
      name: '',
      logoUrl: '',
      websiteUrl: '',
      order: partners.length,
    });
    setIsPartnerModalOpen(true);
  };

  const onStorySubmit = async (values: CustomerFormValues) => {
    setIsSubmitting(true);
    try {
      const url = editingStory ? `/api/admin/customers/${editingStory._id}` : '/api/admin/customers';
      const method = editingStory ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save customer story');

      toast.success(editingStory ? 'Customer story updated successfully' : 'Customer story created successfully');
      setIsStoryModalOpen(false);
      fetchData();
    } catch (err: any) {
      toast.error(err.message || 'Error saving story');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onPartnerSubmit = async (values: PartnerFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/customers/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add partner');

      toast.success('Partner added successfully');
      setIsPartnerModalOpen(false);
      fetchData();
    } catch (err: any) {
      toast.error(err.message || 'Error adding partner');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteStory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this story?')) return;

    try {
      const res = await fetch(`/api/admin/customers/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete story');
      }
      toast.success('Customer story deleted successfully');
      fetchData();
    } catch (err: any) {
      toast.error(err.message || 'Error deleting story');
    }
  };

  const handleDeletePartner = async (id: string) => {
    if (!confirm('Are you sure you want to remove this partner?')) return;

    try {
      const res = await fetch(`/api/admin/customers/partners/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete partner');
      }
      toast.success('Partner removed successfully');
      fetchData();
    } catch (err: any) {
      toast.error(err.message || 'Error removing partner');
    }
  };

  const toggleFeature = async (story: CustomerStory) => {
    try {
      const res = await fetch(`/api/admin/customers/${story._id}/feature`, { method: 'PATCH' });
      const data = await res.json();
      if (!res.ok) {
        // Enforce maximum 3 homepage constraint error
        throw new Error(data.error || 'Failed to toggle featured status');
      }
      toast.success(story.featuredOnHomepage ? 'Removed from homepage' : 'Featured on homepage!');
      fetchData();
    } catch (err: any) {
      toast.error(err.message || 'Error toggling featured status');
    }
  };

  return (
    <div className="space-y-12">
      {/* Testimonials Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Customer Stories &amp; Reviews</h2>
            <p className="text-xs text-muted-dark">
              Manage physician reviews. Up to 3 featured stories will be displayed on the homepage.
            </p>
          </div>
          <button
            onClick={openAddStoryModal}
            className="bg-blue-default hover:bg-blue-bright text-white font-semibold py-2 px-4 rounded-lg text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            Add Story
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <span className="w-8 h-8 border-3 border-blue-default border-t-transparent rounded-full animate-spin" />
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-10 text-gray-500 font-semibold">
            No customer stories found. Click &quot;Add Story&quot; to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm text-gray-300">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-xs font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Quote / Testimonial</th>
                  <th className="py-3 px-4">Tag Info</th>
                  <th className="py-3 px-4">Homepage</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stories.map((story) => (
                  <tr key={story._id} className="hover:bg-white/2 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white leading-tight">{story.customerName}</div>
                      <div className="text-xs text-gray-500 mt-1">{story.title}</div>
                      <div className="text-[11px] text-blue-glow mt-0.5">{story.location}</div>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="text-xs text-gray-400 italic line-clamp-2">{story.description}</div>
                      <div className="flex gap-0.5 mt-1.5">
                        {Array.from({ length: story.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {story.tag ? (
                        <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider bg-${story.tagColor}-500/10 text-${story.tagColor}-400 border border-${story.tagColor}-500/20`}>
                          {story.tag}
                        </span>
                      ) : (
                        <span className="text-gray-500 text-xs">-</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleFeature(story)}
                        className={`inline-flex items-center gap-1 border-none bg-transparent cursor-pointer text-xs font-semibold transition-all ${
                          story.featuredOnHomepage ? 'text-amber-400' : 'text-gray-500'
                        }`}
                        title={story.featuredOnHomepage ? 'Deselect homepage feature' : 'Select homepage feature'}
                      >
                        {story.featuredOnHomepage ? '★ Featured (Home)' : '☆ Off Homepage'}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditStoryModal(story)}
                          className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white border-none cursor-pointer transition-colors"
                          title="Edit Story"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteStory(story._id)}
                          className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 border-none cursor-pointer transition-colors"
                          title="Delete Story"
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
      </div>

      <hr className="border-white/5" />

      {/* Text Testimonials Sub-section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">More from our Partners <span className="text-sm font-normal text-muted-dark ml-1">(Text Testimonials)</span></h2>
            <p className="text-xs text-muted-dark">Stories without a YouTube video — shown in the &ldquo;More from our partners&rdquo; grid on the customer stories page.</p>
          </div>
          <button
            onClick={openAddTextTestimonialModal}
            className="bg-blue-default hover:bg-blue-bright text-white font-semibold py-2 px-4 rounded-lg text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            Add Text Testimonial
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <span className="w-8 h-8 border-3 border-blue-default border-t-transparent rounded-full animate-spin" />
          </div>
        ) : stories.filter(s => !s.youtubeId).length === 0 ? (
          <div className="text-center py-10 text-gray-500 font-semibold border border-dashed border-white/10 rounded-xl">
            No text testimonials yet. Click &quot;Add Text Testimonial&quot; and leave the YouTube ID blank.
          </div>
        ) : (
          <div className="overflow-x-auto border border-white/8 rounded-xl">
            <table className="w-full text-left border-collapse text-sm text-gray-300">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-xs font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Quote</th>
                  <th className="py-3 px-4">Tag</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stories.filter(s => !s.youtubeId).map((story) => (
                  <tr key={story._id} className="hover:bg-white/2 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white leading-tight">{story.customerName}</div>
                      <div className="text-xs text-gray-500 mt-1">{story.title}</div>
                      <div className="text-[11px] text-blue-glow mt-0.5">{story.location}</div>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="text-xs text-gray-400 italic line-clamp-2">{story.description}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      {story.tag ? (
                        <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider bg-${story.tagColor}-500/10 text-${story.tagColor}-400 border border-${story.tagColor}-500/20`}>
                          {story.tag}
                        </span>
                      ) : (
                        <span className="text-gray-500 text-xs">-</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditStoryModal(story)}
                          className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white border-none cursor-pointer transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteStory(story._id)}
                          className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 border-none cursor-pointer transition-colors"
                          title="Delete"
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
      </div>

      <hr className="border-white/5" />
      {/* Story Modal */}
      {isStoryModalOpen && (
        <div className="fixed inset-0 z-[5000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy border border-white/10 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <h3 className="text-lg font-bold text-white">
                {editingStory ? 'Edit Customer Review' : 'Add New Review'}
              </h3>
              <button
                onClick={() => setIsStoryModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border-none cursor-pointer flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={storyForm.handleSubmit(onStorySubmit)} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    placeholder="Dr. John Doe"
                    {...storyForm.register('customerName')}
                    className="w-full bg-navy-card border border-white/10 rounded-lg px-3.5 py-2 text-white text-sm focus:border-blue-default outline-none"
                  />
                  {storyForm.formState.errors.customerName && (
                    <span className="text-red-400 text-xs mt-1 block">{storyForm.formState.errors.customerName.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    YouTube Video ID (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. dQw4w9WgXcQ"
                    {...storyForm.register('youtubeId')}
                    className="w-full bg-navy-card border border-white/10 rounded-lg px-3.5 py-2 text-white text-sm focus:border-blue-default outline-none"
                  />
                  {storyForm.formState.errors.youtubeId && (
                    <span className="text-red-400 text-xs mt-1 block">{storyForm.formState.errors.youtubeId.message}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Clinical Role / Title
                  </label>
                  <input
                    type="text"
                    placeholder="General Dentist, Prosthodontist..."
                    {...storyForm.register('title')}
                    className="w-full bg-navy-card border border-white/10 rounded-lg px-3.5 py-2 text-white text-sm focus:border-blue-default outline-none"
                  />
                  {storyForm.formState.errors.title && (
                    <span className="text-red-400 text-xs mt-1 block">{storyForm.formState.errors.title.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Location / Practice Info
                  </label>
                  <input
                    type="text"
                    placeholder="Park Avenue Dental, NYC"
                    {...storyForm.register('location')}
                    className="w-full bg-navy-card border border-white/10 rounded-lg px-3.5 py-2 text-white text-sm focus:border-blue-default outline-none"
                  />
                  {storyForm.formState.errors.location && (
                    <span className="text-red-400 text-xs mt-1 block">{storyForm.formState.errors.location.message}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Practice Category
                  </label>
                  <select
                    {...storyForm.register('category')}
                    className="w-full bg-navy-card border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-default outline-none"
                  >
                    <option value="private">Private Practice</option>
                    <option value="group">Group Practice</option>
                    <option value="dso">DSO</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Outcome Tag (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="↑ 80% chair time"
                    {...storyForm.register('tag')}
                    className="w-full bg-navy-card border border-white/10 rounded-lg px-3.5 py-2 text-white text-sm focus:border-blue-default outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Tag Color
                  </label>
                  <select
                    {...storyForm.register('tagColor')}
                    className="w-full bg-navy-card border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-default outline-none"
                  >
                    <option value="emerald">Green / Emerald</option>
                    <option value="blue">Blue</option>
                    <option value="violet">Purple / Violet</option>
                    <option value="amber">Amber / Yellow</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Star Rating (1 - 5)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    {...storyForm.register('rating')}
                    className="w-full bg-navy-card border border-white/10 rounded-lg px-3.5 py-2 text-white text-sm focus:border-blue-default outline-none"
                  />
                </div>

                <div className="flex flex-col justify-end space-y-2 pb-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="featuredOnHomepage"
                      {...storyForm.register('featuredOnHomepage')}
                      className="w-4 h-4 accent-blue-default"
                    />
                    <label htmlFor="featuredOnHomepage" className="text-xs font-semibold text-white cursor-pointer select-none">
                      Feature on Homepage (Max 3)
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Quote / Testimonial
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter patient fit outcomes and review comments..."
                  {...storyForm.register('description')}
                  className="w-full bg-navy-card border border-white/10 rounded-lg px-3.5 py-2 text-white text-sm focus:border-blue-default outline-none resize-none font-sans"
                />
                {storyForm.formState.errors.description && (
                  <span className="text-red-400 text-xs mt-1 block">{storyForm.formState.errors.description.message}</span>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="published"
                  {...storyForm.register('published')}
                  className="w-4 h-4 accent-blue-default"
                />
                <label htmlFor="published" className="text-xs font-semibold text-white cursor-pointer select-none">
                  Publish immediately (show on website)
                </label>
              </div>

              <div className="border-t border-white/10 pt-5 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsStoryModalOpen(false)}
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

      {/* Partner Modal */}
      {isPartnerModalOpen && (
        <div className="fixed inset-0 z-[5000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy border border-white/10 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative flex flex-col">
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <h3 className="text-lg font-bold text-white">Add Partner Logo</h3>
              <button
                onClick={() => setIsPartnerModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border-none cursor-pointer flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={partnerForm.handleSubmit(onPartnerSubmit)} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Partner Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. iTero"
                  {...partnerForm.register('name')}
                  className="w-full bg-navy-card border border-white/10 rounded-lg px-3.5 py-2 text-white text-sm focus:border-blue-default outline-none"
                />
                {partnerForm.formState.errors.name && (
                  <span className="text-red-400 text-xs mt-1 block">{partnerForm.formState.errors.name.message}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Logo URL (Image Link)
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/logo.png"
                  {...partnerForm.register('logoUrl')}
                  className="w-full bg-navy-card border border-white/10 rounded-lg px-3.5 py-2 text-white text-sm focus:border-blue-default outline-none"
                />
                {partnerForm.formState.errors.logoUrl && (
                  <span className="text-red-400 text-xs mt-1 block">{partnerForm.formState.errors.logoUrl.message}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Website URL
                </label>
                <input
                  type="text"
                  placeholder="https://itero.com"
                  {...partnerForm.register('websiteUrl')}
                  className="w-full bg-navy-card border border-white/10 rounded-lg px-3.5 py-2 text-white text-sm focus:border-blue-default outline-none"
                />
                {partnerForm.formState.errors.websiteUrl && (
                  <span className="text-red-400 text-xs mt-1 block">{partnerForm.formState.errors.websiteUrl.message}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  {...partnerForm.register('order')}
                  className="w-full bg-navy-card border border-white/10 rounded-lg px-3.5 py-2 text-white text-sm focus:border-blue-default outline-none"
                />
              </div>

              <div className="border-t border-white/10 pt-5 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPartnerModalOpen(false)}
                  className="bg-transparent hover:bg-white/5 border border-white/10 text-white font-semibold py-2 px-4 rounded-lg text-xs cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-default hover:bg-blue-bright text-white font-semibold py-2 px-5 rounded-lg text-xs cursor-pointer disabled:opacity-50 disabled:pointer-events-none transition-colors shadow"
                >
                  {isSubmitting ? 'Adding...' : 'Add Partner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
