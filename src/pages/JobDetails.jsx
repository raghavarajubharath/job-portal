import { useParams, useNavigate, Link } from 'react-router-dom';
import { useJobs } from '../hooks/useJobs';
import { useBookmarks } from '../context/BookmarkContext';
import StatusTag from '../components/StatusTag';
import { Loader, ErrorState } from '../components/BoardStates';

function formatSalary(min, max) {
  const fmt = (n) => `₹${(n / 100000).toFixed(1)}L`;
  return `${fmt(min)} – ${fmt(max)} / year`;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, status, error } = useJobs();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  if (status === 'loading') return <div className="container"><Loader label="Loading gate details" /></div>;
  if (status === 'error') return <div className="container"><ErrorState message={error} /></div>;

  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="container job-details-missing">
        <p className="eyebrow">Gate not found</p>
        <h1 className="section-title">This role has left the board.</h1>
        <p className="board-state-message">It may have closed or the link is out of date.</p>
        <Link to="/jobs" className="btn btn-primary">
          Back to all jobs
        </Link>
      </div>
    );
  }

  const bookmarked = isBookmarked(job.id);
  const canApply = job.status !== 'closed';

  return (
    <div className="container job-details">
      <button type="button" className="back-link mono" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="job-details-head">
        <div>
          <p className="eyebrow">Gate {job.gate} · {job.category}</p>
          <h1 className="job-details-title">{job.title}</h1>
          <p className="job-details-company">{job.company} · {job.location}</p>
        </div>
        <StatusTag status={job.status} />
      </div>

      <dl className="job-details-meta">
        <div>
          <dt className="mono">Type</dt>
          <dd>{job.type}</dd>
        </div>
        <div>
          <dt className="mono">Salary</dt>
          <dd>{formatSalary(job.salaryMin, job.salaryMax)}</dd>
        </div>
        <div>
          <dt className="mono">Posted</dt>
          <dd>{formatDate(job.posted)}</dd>
        </div>
      </dl>

      <section className="job-details-section">
        <h2 className="job-details-heading">About the role</h2>
        <p>{job.description}</p>
      </section>

      <section className="job-details-section">
        <h2 className="job-details-heading">What we're looking for</h2>
        <ul className="job-requirements">
          {job.requirements.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
      </section>

      <div className="job-details-actions">
        {canApply ? (
          <Link to={`/apply/${job.id}`} className="btn btn-primary">
            Apply for this role
          </Link>
        ) : (
          <button type="button" className="btn btn-disabled" disabled>
            Applications closed
          </button>
        )}
        <button
          type="button"
          className={'btn btn-outline' + (bookmarked ? ' btn-outline-active' : '')}
          onClick={() => toggleBookmark(job.id)}
        >
          {bookmarked ? '★ Saved' : '☆ Save for later'}
        </button>
      </div>
    </div>
  );
}
