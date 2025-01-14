const testData = [
    {
      title: "Complete Guide to University Admissions in the UK",
      excerpt: "Everything you need to know about applying to UK universities, from required documents to important deadlines.",
      content: "The UK university admission process can seem daunting at first, but with proper preparation and understanding, you can navigate it successfully. This comprehensive guide covers everything from choosing the right university to submitting your UCAS application...",
      author: "Sarah Thompson",
      date: new Date("2024-01-10").toISOString(),
      category: "Admissions",
      featured: true,
      comments: 15,
      likes: 45,
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f"
    },
    {
      title: "Student Visa Guide: Tips for a Successful Application",
      excerpt: "Learn the essential steps and requirements for obtaining your student visa with our comprehensive guide.",
      content: "Securing a student visa is a crucial step in your international education journey. This guide walks you through the entire process, from gathering required documents to preparing for your visa interview...",
      author: "Michael Chen",
      date: new Date("2024-01-12").toISOString(),
      category: "Visa Guidance",
      featured: false,
      comments: 23,
      likes: 67,
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173"
    },
    {
      title: "Top Scholarships for International Students 2024",
      excerpt: "Discover the best scholarship opportunities available for international students this year.",
      content: "Finding the right scholarship can significantly reduce your educational expenses. We've compiled a comprehensive list of prestigious scholarships available to international students...",
      author: "David Kumar",
      date: new Date("2024-01-14").toISOString(),
      category: "Scholarships",
      featured: true,
      comments: 42,
      likes: 156,
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
    },
    {
      title: "Life as a Student in London: A First-Hand Experience",
      excerpt: "Get insights into what it's really like to study and live in one of the world's most vibrant cities.",
      content: "Living in London as an international student is an exciting adventure filled with unique experiences. From navigating the tube to finding the best student accommodations...",
      author: "Emma Rodriguez",
      date: new Date("2024-01-15").toISOString(),
      category: "Student Life",
      featured: false,
      comments: 31,
      likes: 89,
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad"
    },
    {
      title: "How to Prepare for Your University Entrance Exams",
      excerpt: "Expert tips and strategies to help you ace your university entrance examinations.",
      content: "Success in university entrance exams requires both knowledge and strategy. This guide provides proven study techniques, time management tips, and practice resources...",
      author: "James Wilson",
      date: new Date("2024-01-16").toISOString(),
      category: "Admissions",
      featured: false,
      comments: 28,
      likes: 73,
      readTime: "15 min read",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
    }
  ];
  
  const API_URL = 'http://localhost:5000/api/blogs';
  
  async function submitBlogPost(post) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(`Successfully submitted blog post: ${data.title}`);
      return data;
    } catch (error) {
      console.error(`Error submitting blog post: ${error.message}`);
    }
  }
  
  async function submitAllPosts() {
    console.log('Starting to submit test data...');
  
    for (const post of testData) {
      await submitBlogPost(post);
    }
  
    console.log('Finished submitting all test data.');
  
    // Display statistics
    console.log('\nStatistics:');
    console.log('Total posts submitted:', testData.length);
    console.log('Featured posts:', testData.filter(post => post.featured).length);
    console.log('Categories:', [...new Set(testData.map(post => post.category))]);
    console.log('Average likes:', testData.reduce((acc, post) => acc + post.likes, 0) / testData.length);
  }
  
  submitAllPosts().catch(error => console.error('An error occurred:', error));