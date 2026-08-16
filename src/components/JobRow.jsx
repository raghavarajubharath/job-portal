import { Link } from 'react-router-dom';
import StatusTag from './StatusTag';
import { useBookmarks } from '../context/BookmarkContext';

function formatSalary(min, max) {
  const fmt = (n) => `₹${(n / 100000).toFixed(1)}L`;
  return `${fmt(min)} – ${fmt(max)}`;
}

export default function JobRow({ job, index = 0 }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(job.id);

  return (
    <div className="job-row" style={{ '--i': index }}>
      <span className="job-row-gate mono">{job.gate}</span>

      <Link to={`/jobs/${job.id}`} className="job-row-main">
        <span className="job-row-title">{job.title}</span>
        <span className="job-row-company">{job.company}</span>
      </Link>

      <span className="job-row-location mono">{job.location}</span>
      <span className="job-row-type mono">{job.type}</span>
      <span className="job-row-salary mono">{formatSalary(job.salaryMin, job.salaryMax)}</span>

      <StatusTag status={job.status} />

      <button
        type="button"
        className={'bookmark-btn' + (bookmarked ? ' bookmark-btn-active' : '')}
        onClick={() => toggleBookmark(job.id)}
        aria-pressed={bookmarked}
        aria-label={bookmarked ? `Remove ${job.title} from saved` : `Save ${job.title}`}
      >
        {bookmarked ? '★' : '☆'}
      </button>
    </div>
  );
}
