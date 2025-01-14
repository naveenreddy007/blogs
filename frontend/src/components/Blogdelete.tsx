import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, RefreshCcw } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
}

interface APIBlogPost {
  _id: string;
  title: string;
  author: string;
  date: string;
  category: string;
}

interface BlogResponse {
  blogs: APIBlogPost[];
  currentPage: number;
  totalPages: number;
  totalBlogs: number;
}

const BlogDelete: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteInProgress, setDeleteInProgress] = useState<string | null>(null);

  const fetchBlogs = async (
    page: number = 1,
    limit: number = 100,
    category: string = '',
    search: string = ''
  ): Promise<BlogResponse> => {
    try {
      const response = await axios.get(`${API_URL}/blogs`, {
        params: {
          page,
          limit,
          category: category !== 'all' ? category : '',
          search,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching blogs:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch blogs');
    }
  };

  const deleteBlogPost = async (id: string): Promise<void> => {
    try {
      // Updated endpoint to match backend route structure
      const response = await axios.delete(`${API_URL}/blogs/${id}`);
      if (response.status !== 200) {
        throw new Error('Failed to delete blog');
      }
    } catch (error: any) {
      console.error('Error deleting blog post:', error);
      throw new Error(error.response?.data?.message || 'Failed to delete blog');
    }
  };

  const fetchAllBlogs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchBlogs(1, 100, 'all', '');
      const formattedBlogs: BlogPost[] = response.blogs.map((blog: APIBlogPost) => ({
        id: blog._id,
        title: blog.title,
        author: blog.author,
        date: new Date(blog.date).toLocaleDateString(),
        category: blog.category,
      }));
      setBlogs(formattedBlogs);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch blogs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete the blog "${title}"?`)) {
      setDeleteInProgress(id);
      setError(null);
      try {
        await deleteBlogPost(id);
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id));
        setError('Blog deleted successfully!');
        setTimeout(() => setError(null), 3000);
      } catch (error: any) {
        setError(error.message || 'Failed to delete the blog. Please try again.');
      } finally {
        setDeleteInProgress(null);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Delete Blogs</h1>
      <button
        onClick={fetchAllBlogs}
        disabled={isLoading}
        className="mb-4 flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <RefreshCcw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
        Refresh Blogs
      </button>
      
      {error && (
        <div 
          className={`mb-4 p-4 rounded ${
            error.includes('successfully') 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}
        >
          {error}
        </div>
      )}
      
      {isLoading && (
        <div className="flex items-center justify-center p-8">
          <RefreshCcw className="w-6 h-6 animate-spin text-blue-500" />
          <span className="ml-2">Loading blogs...</span>
        </div>
      )}
      
      {!isLoading && (
        <ul className="space-y-4">
          {blogs.map(blog => (
            <li key={blog.id} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <p className="text-gray-600">
                  By {blog.author} | {blog.date} | {blog.category}
                </p>
              </div>
              <button
                onClick={() => handleDelete(blog.id, blog.title)}
                disabled={deleteInProgress === blog.id}
                className="flex items-center bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 className={`w-4 h-4 mr-2 ${deleteInProgress === blog.id ? 'animate-spin' : ''}`} />
                {deleteInProgress === blog.id ? 'Deleting...' : 'Delete'}
              </button>
            </li>
          ))}
          {!isLoading && blogs.length === 0 && (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No blogs found.</p>
            </div>
          )}
        </ul>
      )}
    </div>
  );
};

export default BlogDelete;

