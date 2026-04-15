import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlog } from '../services/contentService';
import { formatDate } from '../utils/helpers';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlog(slug).then(r => setBlog(r.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="pt-20 min-h-screen bg-[#0A0A0A] animate-pulse">
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-6">
        <div className="h-64 bg-[#1A1A1A] rounded-xl" /><div className="h-10 bg-[#1A1A1A] rounded w-3/4" /><div className="h-4 bg-[#1A1A1A] rounded w-1/4" />
      </div>
    </div>
  );

  if (!blog) return <div className="pt-20 min-h-screen bg-[#0A0A0A] flex items-center justify-center"><p className="text-gray-500">Blog not found</p></div>;

  return (
    <div className="pt-20 min-h-screen bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link to="/blog" className="text-[#C8A35F] text-sm hover:underline mb-6 inline-block">&larr; Back to Blog</Link>
        {blog.coverImage?.url && <img src={blog.coverImage.url} alt={blog.title} className="w-full h-72 object-cover rounded-xl mb-8" />}
        <h1 className="text-3xl font-bold text-white mb-4">{blog.title}</h1>
        <div className="flex items-center gap-4 text-gray-500 text-sm mb-8">
          <span>{blog.author?.name || 'Admin'}</span>
          <span>{formatDate(blog.createdAt)}</span>
          <span>{blog.views} views</span>
        </div>
        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content }} />
        {blog.tags?.length > 0 && (
          <div className="flex gap-2 mt-8 flex-wrap">{blog.tags.map(t => <span key={t} className="bg-[#1A1A1A] text-gray-400 text-sm px-3 py-1 rounded-full">{t}</span>)}</div>
        )}
      </div>
    </div>
  );
};

export default BlogDetailPage;
