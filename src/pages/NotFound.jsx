import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container not-found">
      <p className="eyebrow mono">GATE CLOSED · 404</p>
      <h1 className="section-title">This gate doesn't exist.</h1>
      <p className="board-state-message">
        The page you're looking for has been reassigned or never boarded.
      </p>
      <Link to="/" className="btn btn-primary">
        Return to departures
      </Link>
    </div>
  );
}
