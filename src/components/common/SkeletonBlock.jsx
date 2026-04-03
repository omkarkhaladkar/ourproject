import React from 'react';

export default function SkeletonBlock({ className = '', style = {} }) {
  return <div className={`app-skeleton ${className}`.trim()} style={style} aria-hidden="true" />;
}
