import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Blogs from './pages/Blogs';
import CreateBlog from './pages/CreateBlog';
import BlogDelete from './components/Blogdelete';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />          
          <Route path="/Blog" element={<Blogs/>} />          
          <Route path="/create-blog" element={<CreateBlog/>} />          
          <Route path="/delete-blog" element={<BlogDelete/>} />          

        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;