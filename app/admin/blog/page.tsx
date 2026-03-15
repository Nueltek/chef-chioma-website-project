'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Plus, Edit, Trash2, Eye, EyeOff, Calendar, Clock } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: { url: string };
  category: string;
  publishedAt?: string;
  views: number;
  readTime: number;
  featured: boolean;
  isPublished: boolean;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog?published=false');
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (error) {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const res = await fetch(`/api/blog/${slug}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Post deleted');
        fetchPosts();
      }
    } catch (error) {
      toast.error('Failed to delete post');
    }
  };

  const togglePublish = async (post: BlogPost) => {
    try {
      const res = await fetch(`/api/blog/${post.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !post.isPublished }),
      });
      if (res.ok) {
        toast.success(post.isPublished ? 'Post unpublished' : 'Post published');
        fetchPosts();
      }
    } catch (error) {
      toast.error('Failed to update post');
    }
  };

  return (
    <div>
      <Toaster position="top-center" />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-earth-900 mb-2">Blog Posts</h1>
          <p className="font-body text-text-secondary">
            Manage your blog content
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-copper text-cream font-sans text-xs uppercase tracking-widest hover:bg-copper-dark transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Post
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white border border-earth-200 rounded-sm p-4 animate-pulse">
              <div className="flex gap-4">
                <div className="w-32 h-20 bg-earth-100 rounded" />
                <div className="flex-1">
                  <div className="h-5 bg-earth-100 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-earth-100 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white border border-earth-200 rounded-sm p-12 text-center">
          <p className="font-body text-text-secondary mb-4">No blog posts yet</p>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-earth-800 text-cream font-sans text-xs uppercase tracking-widest"
          >
            <Plus className="w-4 h-4" />
            Create Your First Post
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className={`bg-white border rounded-sm overflow-hidden ${
                post.isPublished ? 'border-earth-200' : 'border-earth-200 opacity-70'
              }`}
            >
              <div className="flex flex-col md:flex-row gap-4 p-4">
                {/* Thumbnail */}
                <div className="relative w-full md:w-40 h-28 flex-shrink-0 rounded overflow-hidden">
                  {post.featuredImage?.url ? (
                    <Image
                      src={post.featuredImage.url}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-earth-100 flex items-center justify-center">
                      <span className="text-earth-400 text-xs">No image</span>
                    </div>
                  )}
                  {!post.isPublished && (
                    <span className="absolute top-1 left-1 px-2 py-0.5 bg-earth-800 text-cream text-xs">
                      Draft
                    </span>
                  )}
                  {post.featured && post.isPublished && (
                    <span className="absolute top-1 left-1 px-2 py-0.5 bg-copper text-cream text-xs">
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="font-sans text-xs uppercase tracking-widest text-copper">
                        {post.category}
                      </span>
                      <h3 className="font-display text-lg text-earth-900 mb-1 line-clamp-1">
                        {post.title}
                      </h3>
                      <p className="font-body text-sm text-text-secondary line-clamp-2 mb-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
                    {post.publishedAt && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime} min read
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {post.views} views
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    href={`/admin/blog/${post.slug}`}
                    className="flex items-center gap-1 px-3 py-1.5 bg-earth-100 text-earth-700 text-xs hover:bg-earth-200 transition-colors"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </Link>
                  <button
                    onClick={() => togglePublish(post)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-earth-100 text-earth-700 text-xs hover:bg-earth-200 transition-colors"
                  >
                    {post.isPublished ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    {post.isPublished ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    onClick={() => deletePost(post.slug)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 text-xs hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
