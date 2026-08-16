import { Link } from 'react-router-dom';
import { useJobs } from '../hooks/useJobs';
import { useBookmarks } from '../context/BookmarkContext';
import BoardingPass from '../components/BoardingPass';
import { Loader, ErrorState } from '../components/BoardStates';

export default function SavedJobs() {
  const { jobs, status, error } = useJobs();
  const { bookmarks } = useBookmarks();

  if (status === 'loading') return <div className="container"><Loader label="Loading your saved gates" /></div>;
  if (status === 'error') return <div className="container"><ErrorState message={error} /></div>;

  const savedJobs = jobs.filter((job) => bookmarks.includes(job.id));

  return (
    <div className="container saved-page">
      <p className="eyebrow">Your wallet</p>
      <h1 className="section-title">Saved roles</h1>

      {savedJobs.length === 0 ? (
        <div className="board-state">
          <p className="mono">WALLET EMPTY</p>
          <p className="board-state-message">
            Tap the ☆ on any role to save it here for later.
          </p>
          <Link to="/jobs" className="btn btn-primary">
            Browse the board
          </Link>
        </div>
      ) : (
        <div className="pass-stack">
          {savedJobs.map((job) => (
            <BoardingPass key={job.id} job={job} dense />
          ))}
        </div>
      )}
    </div>
  );
}
