import express from 'express';
import BlogPost from '../models/BlogPost.js';

const router = express.Router();

// Validation middleware
const validateBlogPost = (req, res, next) => {
  const { title, excerpt, content, author, category, readTime, image } = req.body;

  // Check if required fields are present and not empty
  if (!title?.trim()) return res.status(400).json({ message: 'Title is required' });
  if (!excerpt?.trim()) return res.status(400).json({ message: 'Excerpt is required' });
  if (!content?.trim()) return res.status(400).json({ message: 'Content is required' });
  if (!author?.trim()) return res.status(400).json({ message: 'Author is required' });
  if (!category?.trim()) return res.status(400).json({ message: 'Category is required' });
  if (!image?.trim()) return res.status(400).json({ message: 'Image URL is required' });

  // Validate readTime is a positive number
  const readTimeNum = Number(readTime);
  if (isNaN(readTimeNum) || readTimeNum < 1) {
    return res.status(400).json({ message: 'Read time must be a positive number' });
  }

  // Validate title length
  if (title.length > 200) {
    return res.status(400).json({ message: 'Title must be less than 200 characters' });
  }

  // Validate excerpt length
  if (excerpt.length > 500) {
    return res.status(400).json({ message: 'Excerpt must be less than 500 characters' });
  }

  next();
};

// GET categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await BlogPost.distinct('category');
    
    // Return default categories if none exist
    if (!categories || categories.length === 0) {
      return res.json(['Admissions', 'Visa Guidance', 'Scholarships', 'Student Life']);
    }
    
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Return default categories on error
    res.json(['Admissions', 'Visa Guidance', 'Scholarships', 'Student Life']);
  }
});

// Create new blog post
router.post('/blogs', validateBlogPost, async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      author,
      category,
      readTime,
      image,
      featured = false
    } = req.body;

    // Create new blog post
    const newBlogPost = new BlogPost({
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      author: author.trim(),
      category: category.trim(),
      readTime: Number(readTime),
      image: image.trim(),
      featured,
      date: new Date(),
      comments: 0,
      likes: 0
    });

    // Save to database
    const savedBlog = await newBlogPost.save();

    // Return success response
    res.status(201).json({
      message: 'Blog post created successfully',
      blog: savedBlog
    });

  } catch (error) {
    console.error('Error creating blog post:', error);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    // Handle other errors
    res.status(500).json({
      message: 'Failed to create blog post',
      error: error.message
    });
  }
});

export default router;
