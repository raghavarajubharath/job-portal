import { useRef, useId, useMemo, useEffect } from 'react';
import { Outlet, useSearchParams, NavLink } from 'react-router-dom';
import { useJobs } from '../hooks/useJobs';
import { Loader, ErrorState } from '../components/BoardStates';

const CATEGORIES = ['IT', 'Design', 'Marketing', 'Sales', 'Finance'];

export default function Jobs() {
  const { jobs, status, error } = useJobs();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchInputRef = useRef(null);
  const searchId = useId();
  const locationId = useId();
  const typeId = useId();

  const q = searchParams.get('q') || '';
  const location = searchParams.get('location') || '';
  const type = searchParams.get('type') || '';

  useEffect(() => {
    if (status === 'success' && searchInputRef.current) {
      searchInputRef.current.focus({ preventScroll: true });
    }
  }, [status]);

  const locations = useMemo(() => [...new Set(jobs.map((j) => j.location))].sort(), [jobs]);
  const types = useMemo(() => [...new Set(jobs.map((j) => j.type))].sort(), [jobs]);

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: true });
  }

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesQuery =
        !q ||
        job.title.toLowerCase().includes(q.toLowerCase()) ||
        job.company.toLowerCase().includes(q.toLowerCase());
      const matchesLocation = !location || job.location === location;
      const matchesType = !type || job.type === type;
      return matchesQuery && matchesLocation && matchesType;
    });
  }, [jobs, q, location, type]);

  return (
    <section className="container jobs-page">
      <div className="jobs-page-head">
        <p className="eyebrow">Departure board</p>
        <h1 className="section-title">All roles</h1>
      </div>

      <div className="category-tabs" role="tablist" aria-label="Filter by department">
        <NavLink to="/jobs" end className={({ isActive }) => 'category-tab' + (isActive ? ' category-tab-active' : '')}>
          All
        </NavLink>
        {CATEGORIES.map((cat) => (
          <NavLink
            key={cat}
            to={`/jobs/category/${cat.toLowerCase()}`}
            className={({ isActive }) => 'category-tab' + (isActive ? ' category-tab-active' : '')}
          >
            {cat}
          </NavLink>
        ))}
      </div>

      <form className="filter-bar" role="search" onSubmit={(e) => e.preventDefault()}>
        <div className="filter-field">
          <label htmlFor={searchId} className="filter-label">
            Search
          </label>
          <input
            id={searchId}
            ref={searchInputRef}
            type="text"
            placeholder="Role or company…"
            value={q}
            onChange={(e) => updateParam('q', e.target.value)}
          />
        </div>

        <div className="filter-field">
          <label htmlFor={locationId} className="filter-label">
            Location
          </label>
          <select id={locationId} value={location} onChange={(e) => updateParam('location', e.target.value)}>
            <option value="">Any location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor={typeId} className="filter-label">
            Type
          </label>
          <select id={typeId} value={type} onChange={(e) => updateParam('type', e.target.value)}>
            <option value="">Any type</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </form>

      {status === 'loading' && <Loader label="Loading departures" />}
      {status === 'error' && <ErrorState message={error} />}
      {status === 'success' && <Outlet context={{ jobs: filteredJobs }} />}
    </section>
  );
}
