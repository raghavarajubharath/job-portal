import { NavLink } from 'react-router-dom';
import LiveClock from './LiveClock';
import { useBookmarks } from '../context/BookmarkContext';

const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/jobs', label: 'Jobs' },
  { to: '/about', label: 'About' },
];

export default function Header() {
  const { bookmarks } = useBookmarks();

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <NavLink to="/" className="logo" end>
          <span className="logo-mark mono">✈</span>
          <span className="logo-text">CONCOURSE</span>
        </NavLink>

        <nav className="site-nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => 'nav-link' + (isActive ? ' nav-link-active' : '')}
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/saved"
            className={({ isActive }) => 'nav-link nav-link-saved' + (isActive ? ' nav-link-active' : '')}
          >
            Saved
            {bookmarks.length > 0 && <span className="nav-badge mono">{bookmarks.length}</span>}
          </NavLink>
        </nav>

        <LiveClock />
      </div>
    </header>
  );
}
