import { Link } from 'react-router-dom';
import { useJobs } from '../hooks/useJobs';

export default function Home() {
  const { jobs, status } = useJobs();
  const openCount = jobs.filter((j) => j.status !== 'closed').length;
  const categories = [...new Set(jobs.map((j) => j.category))];

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <p className="eyebrow">Departures — Careers</p>
          <h1 className="hero-title">
            Your next role is
            <br />
            already boarding.
          </h1>
          <p className="hero-sub">
            Concourse lists open roles the way an airport lists flights — gate, status, and all.
            Scan the board, pick a gate, and apply before it closes.
          </p>
          <div className="hero-actions">
            <Link to="/jobs" className="btn btn-primary">
              View the board
            </Link>
            <Link to="/about" className="btn btn-outline">
              How it works
            </Link>
          </div>
        </div>
      </section>

      <section className="container stats-strip">
        <div className="stat">
          <span className="stat-value mono">{status === 'success' ? openCount : '—'}</span>
          <span className="stat-label">roles open now</span>
        </div>
        <div className="stat">
          <span className="stat-value mono">{status === 'success' ? categories.length : '—'}</span>
          <span className="stat-label">departments hiring</span>
        </div>
        <div className="stat">
          <span className="stat-value mono">24/7</span>
          <span className="stat-label">board updates</span>
        </div>
      </section>

      {status === 'success' && categories.length > 0 && (
        <section className="container gates-section">
          <h2 className="section-title">Browse by department</h2>
          <div className="gates-grid">
            {categories.map((cat) => (
              <Link key={cat} to={`/jobs/category/${cat.toLowerCase()}`} className="gate-card">
                <span className="gate-card-label mono">GATE</span>
                <span className="gate-card-name">{cat}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
