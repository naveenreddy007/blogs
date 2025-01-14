import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxLength: [200, 'Title cannot be more than 200 characters']
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    trim: true,
    maxLength: [500, 'Excerpt cannot be more than 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  readTime: {
    type: Number,
    required: [true, 'Read time is required'],
    min: [1, 'Read time must be at least 1 minute']
  },
  image: {
    type: String,
    required: [true, 'Image URL is required']
  },
  date: {
    type: Date,
    default: Date.now
  },
  comments: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  }
});

// Add indexes for better query performance
blogPostSchema.index({ title: 'text', content: 'text', excerpt: 'text' });
blogPostSchema.index({ category: 1 });
blogPostSchema.index({ date: -1 });

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

export default BlogPost;
