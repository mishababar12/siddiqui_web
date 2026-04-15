import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../services/contentService';
import { formatDate, truncateText } from '../utils/helpers';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ pages: 1 });

  useEffect(() => {
    setLoading(true);
    getBlogs(page)
      .then(r => { setBlogs(r.data.data); setPagination(r.data.pagination); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="pt-20 min-h-screen bg-[#0A0A0A]">
      <div className="bg-gradient-to-r from-[#111111] to-[#0A0A0A] py-20 text-center">
        <h1 className="text-4xl font-bold text-white">Latest <span className="gold-gradient">News & Articles</span></h1>
        <p className="text-gray-400 mt-3">Stay updated with automotive news</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-48 bg-[#1A1A1A]" />
                <div className="p-5 space-y-3"><div className="h-5 bg-[#1A1A1A] rounded w-3/4" /><div className="h-4 bg-[#1A1A1A] rounded w-full" /><div className="h-4 bg-[#1A1A1A] rounded w-1/2" /></div>
              </div>
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogs.map(blog => (
                <Link to={`/blog/${blog.slug}`} key={blog._id} className="card group block">
                  <div className="h-48 overflow-hidden">
                    <img src={blog.coverImage?.url || 'https://via.placeholder.com/400x200/111111/C8A35F?text=Blog'} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <p className="text-gray-500 text-sm mb-2">{formatDate(blog.createdAt)}</p>
                    <h3 className="text-white font-semibold group-hover:text-[#C8A35F] transition-colors mb-2">{blog.title}</h3>
                    <p className="text-gray-400 text-base">{truncateText(blog.excerpt || blog.content, 100)}</p>
                  </div>
                </Link>
              ))}
            </div>
            {pagination.pages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {[...Array(pagination.pages)].map((_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 rounded-lg text-base ${page === i + 1 ? 'bg-[#C8A35F] text-[#0A0A0A]' : 'border border-[#2A2A2A] text-gray-400'}`}>{i + 1}</button>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500 py-20">No blog posts yet</p>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
