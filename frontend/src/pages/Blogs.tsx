import React, { useState, useEffect } from 'react';
import { Search, ChevronRight, Calendar, User, MessageCircle, Heart, Bookmark, Share2, Filter } from 'lucide-react';
import { fetchBlogs, fetchCategories, APIBlogPost } from '../api/blogApi';
import BlogModal from '../components/BlogModal';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  featured: boolean;
  comments: number;
  likes: number;
  readTime: string;
  image: string;
}

interface Category {
  id: string;
  name: string;
}

export function Blogs() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([
    { id: 'all', name: 'All Posts' },
    { id: 'admissions', name: 'Admissions' },
    { id: 'visa-guidance', name: 'Visa Guidance' },
    { id: 'scholarships', name: 'Scholarships' },
    { id: 'student-life', name: 'Student Life Abroad' }
  ]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories([
          { id: 'all', name: 'All Posts' },
          ...fetchedCategories.map(cat => ({ id: cat, name: cat }))
        ]);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadBlogs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchBlogs(1, 10, activeFilter, searchTerm);
        const formattedPosts: BlogPost[] = response.blogs.map((post: APIBlogPost) => ({
          id: post._id,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author,
          date: new Date(post.date).toLocaleDateString(),
          category: post.category,
          featured: post.featured,
          comments: post.comments,
          likes: post.likes,
          readTime: post.readTime,
          image: post.image || '/placeholder.svg?height=400&width=600'
        }));
        setBlogPosts(formattedPosts);
      } catch (error) {
        console.error('Error loading blogs:', error);
        setError('Failed to load blogs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadBlogs();
  }, [activeFilter, searchTerm]);

  const filteredPosts = blogPosts
    .filter(post => activeFilter === 'all' || post.category === activeFilter)
    .filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6 animate-fadeIn">
            Study Abroad Blog
          </h1>
          <p className="text-xl mb-8 animate-fadeIn max-w-2xl">
            Stay updated with the latest information on studying abroad, admissions, visas, scholarships, and more!
          </p>
          <div className="relative w-full max-w-2xl animate-slideUp">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-4 top-3 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 overflow-x-auto pb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap
                ${activeFilter === category.id 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {isLoading && <div className="text-center">Loading...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <div
                key={post.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-fadeInUp
                  ${post.featured ? 'md:col-span-2 lg:col-span-2' : ''}`}
                style={{ animationDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredCard(post.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative overflow-hidden group">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    {post.featured && (
                      <span className="bg-yellow-500 text-white text-sm px-3 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-3 text-gray-800 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <User className="w-4 h-4 mr-2" />
                    <span className="mr-4">{post.author}</span>
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{post.date}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {post.comments}
                    </span>
                    <span className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {post.likes}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <div className="mt-6 flex justify-between items-center">
                    <button 
                      onClick={() => setSelectedPost(post)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                    >
                      Read More
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                        <Bookmark className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                        <Share2 className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedPost && (
        <BlogModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
}

export default Blogs;

