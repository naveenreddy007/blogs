'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Loader2 } from 'lucide-react'
import { createBlogPost } from '../api/blogApi'

const blogFormSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters'),
  content: z.string()
    .min(50, 'Content must be at least 50 characters'),
  excerpt: z.string()
    .min(10, 'Excerpt must be at least 10 characters')
    .max(500, 'Excerpt must be less than 500 characters'),
  author: z.string()
    .min(1, 'Author is required'),
  category: z.string()
    .min(1, 'Category is required'),
  readTime: z.string()
    .min(1, 'Read time is required')
    .regex(/^\d+$/, 'Read time must be a number'),
  image: z.string()
    .url('Please enter a valid image URL'),
  featured: z.boolean().default(false)
})

type BlogFormValues = z.infer<typeof blogFormSchema>

const categories = ['Admissions', 'Scholarships', 'Student Life', 'Visa Guidance']

export default function CreateBlog() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: '',
      content: '',
      excerpt: '',
      author: '',
      category: '',
      readTime: '',
      image: '',
      featured: false
    }
  })

  const onSubmit = async (data: BlogFormValues) => {
    try {
      setError(null)
      await createBlogPost(data)
      navigate('/blog')
    } catch (err: any) {
      setError(err.message || 'Failed to create blog post')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Blog Post</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              {...form.register('title')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {form.formState.errors.title && (
              <p className="mt-1 text-sm text-red-600">{form.formState.errors.title.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="content"
              rows={6}
              {...form.register('content')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {form.formState.errors.content && (
              <p className="mt-1 text-sm text-red-600">{form.formState.errors.content.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              rows={3}
              {...form.register('excerpt')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {form.formState.errors.excerpt && (
              <p className="mt-1 text-sm text-red-600">{form.formState.errors.excerpt.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                Author
              </label>
              <input
                id="author"
                type="text"
                {...form.register('author')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {form.formState.errors.author && (
                <p className="mt-1 text-sm text-red-600">{form.formState.errors.author.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => form.setValue('category', category)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      form.watch('category') === category
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              {form.formState.errors.category && (
                <p className="mt-1 text-sm text-red-600">{form.formState.errors.category.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="readTime" className="block text-sm font-medium text-gray-700 mb-1">
                Read Time (minutes)
              </label>
              <input
                id="readTime"
                type="number"
                min="1"
                {...form.register('readTime')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {form.formState.errors.readTime && (
                <p className="mt-1 text-sm text-red-600">{form.formState.errors.readTime.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                id="image"
                type="url"
                {...form.register('image')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {form.formState.errors.image && (
                <p className="mt-1 text-sm text-red-600">{form.formState.errors.image.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              {...form.register('featured')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="featured"
              className="text-sm font-medium text-gray-700"
            >
              Featured Post
            </label>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/blog')}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="inline-block mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Post'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

