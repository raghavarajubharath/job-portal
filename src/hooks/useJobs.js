import { useState, useEffect } from 'react';

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState('loading'); 
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function fetchJobs() {
      setStatus('loading');
      setError(null);
      try {
        const res = await fetch('/jobs.json', { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const data = await res.json();
        if (!cancelled) {
          setJobs(data);
          setStatus('success');
        }
      } catch (err) {
        if (!cancelled && err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong while loading jobs.');
          setStatus('error');
        }
      }
    }

    fetchJobs();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return { jobs, status, error };
}
