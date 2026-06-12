'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { Edit2, Trash2, Plus, X, Eye, EyeOff } from 'lucide-react';

const educationSchema = z.object({
  youtubeId: z.string().min(1, 'YouTube Video ID is required').regex(/^[a-zA-Z0-9_-]{11}$/, 'Must be a valid 11-character YouTube video ID'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  duration: z.string().min(1, 'Duration is required').regex(/^\d+:\d+$/, 'Duration must be in format MM:SS (e.g. 12:34)'),
  published: z.boolean().default(true),
});

type EducationFormValues = z.infer<typeof educationSchema>;

interface EducationResource {
  _id: string;
  youtubeId: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  published: boolean;
  createdAt: string;
}

export default function AdminEducationPage() {
  const [resources, setResources] = useState<EducationResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<EducationResource | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema) as any,
    defaultValues: {
      published: true,
    },
  });

  const fetchResources = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/education');
      if (!res.ok) throw new Error('Failed to fetch education resources');
      const data = await res.json();
      setResources(data);
    } catch (err: any) {
      toast.error(err.message || 'Error loading education resources');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const openAddModal = () => {
    setEditingResource(null);
    reset({
      youtubeId: '',
      title: '',
      description: '',
      category: 'scanning',
      duration: '',
      published: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (resource: EducationResource) => {
    setEditingResource(resource);
    setValue('youtubeId', resource.youtubeId);
    setValue('title', resource.title);
    setValue('description', resource.description);
    setValue('category', resource.category);
    setValue('duration', resource.duration);
    setValue('published', resource.published);
    setIsModalOpen(true);
  };

  const onSubmit = async (values: EducationFormValues) => {
    setIsSubmitting(true);
    try {
      const url = editingResource ? `/api/admin/education/${editingResource._id}` : '/api/admin/education';
      const method = editingResource ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save resource');

      toast.success(editingResource ? 'Resource updated successfully' : 'Resource created successfully');
      setIsModalOpen(false);
      fetchResources();
    } catch (err: any) {
      toast.error(err.message || 'Error saving resource');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;

    try {
      const res = await fetch(`/api/admin/education/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete resource');
      }
      toast.success('Resource deleted successfully');
      fetchResources();
    } catch (err: any) {
      toast.error(err.message || 'Error deleting resource');
    }
  };

  const togglePublish = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/education/${id}/publish`, { method: 'PATCH' });
      if (!res.ok) throw new Error('Failed to toggle publish status');
      toast.success('Publish status updated');
      fetchResources();
    } catch (err: any) {
      toast.error(err.message || 'Error toggling publish');
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Manage Education Resources</h2>
          <p className="text-xs text-muted-dark">Add, update, or remove training guides and scanning tutorials.</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-blue-default hover:bg-blue-bright text-white font-semibold py-2 px-4 rounded-lg text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4" />
          Add Resource
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <span className="w-8 h-8 border-3 border-blue-default border-t-transparent rounded-full animate-spin" />
        </div>
      ) : resources.length === 0 ? (
        <div className="text-center py-20 text-gray-500 font-semibold">
          No resources found. Click &quot;Add Resource&quot; to create one.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm text-gray-300">
            <thead>
              <tr className="border-b border-white/10 text-white/50 text-xs font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {resources.map((res) => (
                <tr key={res._id} className="hover:bg-white/2 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white leading-tight">{res.title}</div>
                    <div className="text-xs text-gray-500 mt-1 line-clamp-1">{res.description}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5 text-xs text-white capitalize font-medium">
                      {res.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">{res.duration}</td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => togglePublish(res._id)}
                      className={`inline-flex items-center gap-1 border-none bg-transparent cursor-pointer text-xs font-semibold transition-all ${
                        res.published ? 'text-emerald-400' : 'text-gray-500'
                      }`}
                      title={res.published ? 'Click to unpublish' : 'Click to publish'}
                    >
                      {res.published ? (
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
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(res)}
                        className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white border-none cursor-pointer transition-colors"
                        title="Edit Resource"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(res._id)}
                        className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 border-none cursor-pointer transition-colors"
                        title="Delete Resource"
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[5000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy border border-white/10 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <h3 className="text-lg font-semibold text-white">
                {editingResource ? 'Edit Education Resource' : 'Add New Resource'}
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

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Duration (MM:SS)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 15:45"
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
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Intraoral Scanning tips..."
                  {...register('title')}
                  className="w-full bg-navy-card border border-white/10 rounded-lg px-3.5 py-2 text-white text-sm focus:border-blue-default outline-none"
                />
                {errors.title && (
                  <span className="text-red-400 text-xs mt-1 block">{errors.title.message}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Category Topic
                </label>
                <select
                  {...register('category')}
                  className="w-full bg-navy-card border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-default outline-none"
                >
                  <option value="scanning">Scanning</option>
                  <option value="materials">Materials</option>
                  <option value="implants">Implants</option>
                  <option value="workflow">Workflow</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter details about this guide..."
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
    </div>
  );
}
