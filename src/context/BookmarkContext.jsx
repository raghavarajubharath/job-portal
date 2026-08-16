import { createContext, useContext, useReducer, useEffect } from 'react';

const BookmarkContext = createContext(null);
const STORAGE_KEY = 'concourse:bookmarks';

function readInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'toggle': {
      const exists = state.includes(action.id);
      return exists ? state.filter((id) => id !== action.id) : [...state, action.id];
    }
    default:
      return state;
  }
}

export function BookmarkProvider({ children }) {
  const [bookmarks, dispatch] = useReducer(reducer, undefined, readInitial);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  function toggleBookmark(id) {
    dispatch({ type: 'toggle', id });
  }

  function isBookmarked(id) {
    return bookmarks.includes(id);
  }

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const ctx = useContext(BookmarkContext);
  if (!ctx) throw new Error('useBookmarks must be used within a BookmarkProvider');
  return ctx;
}
