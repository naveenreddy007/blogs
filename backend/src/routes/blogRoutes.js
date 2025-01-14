import express from 'express';
import BlogPost from '../models/blogPost.js';
import { isValidObjectId } from 'mongoose';

const router = express.Router();

// GET unique categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await BlogPost.distinct('category');
    
    // If no categories found, return default categories
    if (!categories || categories.length === 0) {
      return res.json(['Admissions', 'Visa Guidance', 'Scholarships', 'Student Life']);
    }
    
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    // On error, return default categories
    res.json(['Admissions', 'Visa Guidance', 'Scholarships', 'Student Life']);
  }
});

// POST a new blog
router.post('/blogs', async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      author,
      category,
      featured,
      readTime,
      image
    } = req.body;

    const newBlogPost = new BlogPost({
      title,
      excerpt,
      content,
      author,
      category,
      featured,
      readTime,
      image,
      date: new Date(),
      comments: 0,
      likes: 0
    });

    const savedBlogPost = await newBlogPost.save();
    res.status(201).json(savedBlogPost);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(400).json({ 
      message: 'Failed to create blog post',
      details: error.message,
      errors: error.errors 
    });
  }
});

// GET blogs with pagination, sorting, and filtering
router.get('/blogs', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'date',
      sortOrder = 'desc',
      category,
      featured,
      search
    } = req.query;

    const query = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (featured) {
      query.featured = featured === 'true';
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const options = {
      sort: sort,
      limit: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit)
    };

    const [blogs, total] = await Promise.all([
      BlogPost.find(query, null, options),
      BlogPost.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      blogs,
      currentPage: parseInt(page),
      totalPages,
      totalBlogs: total
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ 
      message: 'Error fetching blogs',
      details: error.message 
    });
  }
});

// GET a single blog post by ID
router.get('/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid blog post ID format' });
    }

    const blog = await BlogPost.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ 
      message: 'Error fetching blog post',
      details: error.message 
    });
  }
});

// UPDATE a blog post
router.put('/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid blog post ID format' });
    }

    const blog = await BlogPost.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const updatedBlog = await BlogPost.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(400).json({ 
      message: 'Error updating blog post',
      details: error.message,
      errors: error.errors 
    });
  }
});

// DELETE a blog post
router.delete('/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid blog post ID format' });
    }

    const blog = await BlogPost.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    await BlogPost.findByIdAndDelete(id);
    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ 
      message: 'Error deleting blog post',
      details: error.message 
    });
  }
});

export default router;
