import React from 'react';

export default function SearchBox({ searchQuery, setSearchQuery, results, onSelectPOI }) {
  return (
    <aside className="search-box">
      <h3>Search</h3>
      <label
        htmlFor="search-input"
        style={{
          display: 'block',
          marginBottom: '6px',
          fontSize: '1rem',
          fontWeight: 500,
          textAlign: 'center',
          color: '#1976d2'
        }}
      >
        {/* Search for building */}
      </label>
      <input
        id="search-input"
        type="text"
        placeholder="Type here..."
        style={{
          width: '90%',
          padding: '8px',
          fontSize: '1rem',
          borderRadius: '6px',
          border: '1px solid #ccc',
          marginTop: '0',
          marginBottom: '24px',
          textAlign: 'center'
        }}
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      {/* List container box */}
      <div className="search-list-container">
        {results.length === 0 ? (
          <div style={{ color: '#888', textAlign: 'center' }}>No results found.</div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {results.map(poi => (
              <li
                key={poi.id}
                style={{
                  padding: '8px 0',
                  borderBottom: '1px solid #eee',
                  cursor: 'pointer',
                  color: '#1976d2'
                }}
                onClick={() => onSelectPOI?.(poi)}
              >
                <strong>{poi.name}</strong>
                <div style={{ fontSize: '0.95em', color: '#555' }}>{poi.description}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}