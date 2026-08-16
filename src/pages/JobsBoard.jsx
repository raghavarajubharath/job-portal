import { useParams, useOutletContext } from 'react-router-dom';
import JobRow from '../components/JobRow';
import { EmptyState } from '../components/BoardStates';

export default function JobsBoard() {
  const { category } = useParams();
  const { jobs } = useOutletContext();

  const visibleJobs = category
    ? jobs.filter((job) => job.category.toLowerCase() === category.toLowerCase())
    : jobs;

  if (visibleJobs.length === 0) {
    return <EmptyState message="No roles match right now — try clearing a filter." />;
  }

  return (
    <div className="board">
      <div className="board-header mono">
        <span>Gate</span>
        <span>Role</span>
        <span>Location</span>
        <span>Type</span>
        <span>Salary</span>
        <span>Status</span>
        <span aria-hidden="true"></span>
      </div>
      <div className="board-rows">
        {visibleJobs.map((job, index) => (
          <JobRow key={job.id} job={job} index={index} />
        ))}
      </div>
    </div>
  );
}
