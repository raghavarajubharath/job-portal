import { Routes, Route } from 'react-router-dom';
import { BookmarkProvider } from './context/BookmarkContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobsBoard from './pages/JobsBoard';
import JobDetails from './pages/JobDetails';
import Apply from './pages/Apply';
import SavedJobs from './pages/SavedJobs';
import About from './pages/About';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BookmarkProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="jobs" element={<Jobs />}>
            <Route index element={<JobsBoard />} />
            <Route path="category/:category" element={<JobsBoard />} />
          </Route>

          <Route path="jobs/:id" element={<JobDetails />} />
          <Route path="apply/:id" element={<Apply />} />
          <Route path="saved" element={<SavedJobs />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BookmarkProvider>
  );
}
