import axios, { AxiosInstance } from 'axios';
import { BlogResponse, BlogFormData, APIResponse } from '../types/blog';
import * as z from 'zod';

const API_URL = 'http://localhost:5000/api';

// Create a single axios instance for reuse
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Default categories as a constant
const DEFAULT_CATEGORIES = ['Admissions', 'Visa Guidance', 'Scholarships', 'Student Life'];

export const fetchBlogs = async (
  page: number = 1,
  limit: number = 10,
  category: string = '',
  search: string = ''
): Promise<BlogResponse> => {
  try {
    const response = await api.get('/blogs', {
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
    throw new Error(
      error.response?.data?.message || 
      'Failed to fetch blogs. Please try again later.'
    );
  }
};

export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await api.get('/categories');
    return response.data.length ? response.data : DEFAULT_CATEGORIES;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return DEFAULT_CATEGORIES;
  }
};

export const createBlogPost = async (data: BlogFormData): Promise<APIResponse> => {
  try {
    // Format the data before sending
    const formattedData = {
      ...data,
      readTime: data.readTime.toString(),
      featured: Boolean(data.featured)
    };

    const response = await api.post('/blogs', formattedData);
    return response.data;
  } catch (error: any) {
    console.error('Error creating blog post:', error);
    throw new Error(
      error.response?.data?.message || 
      'Failed to create blog post. Please try again later.'
    );
  }
};

// Add other API methods as needed
export const deleteBlogPost = async (id: string): Promise<APIResponse> => {
  try {
    const response = await api.delete(`/blogs/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error deleting blog post:', error);
    throw new Error(
      error.response?.data?.message || 
      'Failed to delete blog post. Please try again later.'
    );
  }
};

export const updateBlogPost = async (id: string, data: Partial<BlogFormData>): Promise<APIResponse> => {
  try {
    const response = await api.put(`/blogs/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.error('Error updating blog post:', error);
    throw new Error(
      error.response?.data?.message || 
      'Failed to update blog post. Please try again later.'
    );
  }
};

