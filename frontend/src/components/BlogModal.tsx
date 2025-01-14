import React from 'react';
import { X, User, Calendar, Clock, MessageCircle, Heart } from 'lucide-react';
import { BlogPost } from '../types/BlogPost';

interface BlogModalProps {
  post: BlogPost;
  onClose: () => void;
}

const BlogModal: React.FC<BlogModalProps> = ({ post, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-lg mb-6" />
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <User className="w-4 h-4 mr-2" />
            <span className="mr-4">{post.author}</span>
            <Calendar className="w-4 h-4 mr-2" />
            <span className="mr-4">{post.date}</span>
            <Clock className="w-4 h-4 mr-2" />
            <span>{post.readTime}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span className="mr-4 flex items-center">
              <MessageCircle className="w-4 h-4 mr-1" />
              {post.comments} comments
            </span>
            <span className="flex items-center">
              <Heart className="w-4 h-4 mr-1" />
              {post.likes} likes
            </span>
          </div>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
