const STATUS_MAP = {
  open: { label: 'BOARDING', className: 'status-open' },
  'closing-soon': { label: 'FINAL CALL', className: 'status-closing' },
  closed: { label: 'DEPARTED', className: 'status-closed' },
};

export default function StatusTag({ status }) {
  const info = STATUS_MAP[status] || STATUS_MAP.open;
  return <span className={`status-tag mono ${info.className}`}>{info.label}</span>;
}
