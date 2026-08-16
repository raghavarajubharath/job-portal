import { Link } from 'react-router-dom';
import StatusTag from './StatusTag';

export default function BoardingPass({ job, applicantName, dense = false }) {
  return (
    <div className={'boarding-pass' + (dense ? ' boarding-pass-dense' : '')}>
      <div className="boarding-pass-main">
        <div className="boarding-pass-top">
          <span className="eyebrow mono">CONCOURSE AIR</span>
          <StatusTag status={job.status} />
        </div>

        <Link to={`/jobs/${job.id}`} className="boarding-pass-role">
          {job.title}
        </Link>
        <p className="boarding-pass-company">{job.company}</p>

        <div className="boarding-pass-grid mono">
          <div>
            <span className="bp-label">Gate</span>
            <span className="bp-value">{job.gate}</span>
          </div>
          <div>
            <span className="bp-label">Dept</span>
            <span className="bp-value">{job.category}</span>
          </div>
          <div>
            <span className="bp-label">City</span>
            <span className="bp-value">{job.location}</span>
          </div>
          {applicantName && (
            <div>
              <span className="bp-label">Passenger</span>
              <span className="bp-value">{applicantName}</span>
            </div>
          )}
        </div>
      </div>

      <div className="boarding-pass-stub mono">
        <span className="bp-label">Gate</span>
        <span className="bp-stub-gate">{job.gate}</span>
        <span className="bp-barcode" aria-hidden="true" />
      </div>
    </div>
  );
}
