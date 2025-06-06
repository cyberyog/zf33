import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LikesProvider } from './context/LikesContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import ImageDetailPage from './pages/ImageDetailPage';
import SavedPage from './pages/SavedPage';
import * as DummyPages from './pages/dummy';

const dummyRoutes = Object.entries(DummyPages).map(([name, Component]) => ({
  path: `/page-${name.replace('Page', '')}`,
  Component: Component as React.ComponentType,
}));

function App() {
  return (
    <ThemeProvider>
      <LikesProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-neutral dark:bg-primary-dark text-[#E0E0E0] dark:text-neutral-light">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/gallery/:slug" element={<GalleryPage />} />
                <Route path="/image/:id" element={<ImageDetailPage />} />
                <Route path="/saved" element={<SavedPage />} />
                {dummyRoutes.map(({ path, Component }) => (
                  <Route key={path} path={path} element={<Component />} />
                ))}
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LikesProvider>
    </ThemeProvider>
  );
}

export default App