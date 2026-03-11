import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListing';
import ListingDetail from './pages/ListingDetail';
import MyPosts from './pages/MyPosts';
import NotFound from './pages/NotFound';

// Layout wrapper for pages that need Navbar and Footer
const MainLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col pt-16">
    <Navbar />
    <main className="flex-grow w-full">{children}</main>
    <Footer />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Pages with explicit Navbar/Footer control like Auth or custom layouts */}
          <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Pages that are already taking care of their layout or use the standard one */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        
        {/* These pages define their own layout (Navbar/Footer) internally and are protected */}
        <Route path="/create-listing" element={
          <ProtectedRoute>
            <CreateListing />
          </ProtectedRoute>
        } />
        <Route path="/edit-listing/:id" element={
          <ProtectedRoute>
            <EditListing />
          </ProtectedRoute>
        } />
        <Route path="/my-posts" element={
          <ProtectedRoute>
            <MyPosts />
          </ProtectedRoute>
        } />
        <Route path="/listing/:id" element={<ListingDetail />} />
        
        {/* 404 Route */}
        <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
