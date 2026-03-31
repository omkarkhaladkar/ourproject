import React from 'react';

export default function EmptyState({ title = 'Nothing here yet', description = '' }) {
  return (
    <div style={{ padding: '1.5rem 0', color: '#475569' }}>
      <h3 style={{ marginBottom: '0.35rem' }}>{title}</h3>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

