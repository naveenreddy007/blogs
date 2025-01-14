export interface APIBlogPost {
    _id: string;
    title: string;
    content: string;
    excerpt: string;
    author: string;
    date: string;
    category: string;
    featured: boolean;
    comments: number;
    likes: number;
    readTime: string;
    image: string;
  }
  
  export interface BlogResponse {
    blogs: APIBlogPost[];
    currentPage: number;
    totalPages: number;
    totalBlogs: number;
  }
  
  export interface BlogFormData {
    title: string;
    content: string;
    excerpt: string;
    author: string;
    category: string;
    readTime: string;
    image: string;
    featured: boolean;
  }
  
  export interface APIResponse {
    message: string;
    blog?: APIBlogPost;
    error?: string;
  }
  
  