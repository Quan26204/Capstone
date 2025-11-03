import React, { useState } from 'react';

export default function SearchBox() {
  const [value, setValue] = useState('');

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
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      {/* List container box */}
      <div className="search-list-container">
        {/* Future list items will go here */}
      </div>
    </aside>
  );
}