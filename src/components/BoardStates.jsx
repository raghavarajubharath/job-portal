export function Loader({ label = 'Loading board' }) {
  return (
    <div className="board-state" role="status" aria-live="polite">
      <div className="board-state-flicker mono">{label}…</div>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="board-state board-state-error" role="alert">
      <p className="mono">SIGNAL LOST</p>
      <p className="board-state-message">{message || 'Could not load the board. Please try again.'}</p>
      {onRetry && (
        <button type="button" className="btn btn-outline" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}

export function EmptyState({ message }) {
  return (
    <div className="board-state">
      <p className="mono">NO DEPARTURES</p>
      <p className="board-state-message">{message || 'No jobs match your filters right now.'}</p>
    </div>
  );
}
