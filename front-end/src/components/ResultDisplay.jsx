import React from 'react';

export default function ResultDisplay({ result }) {
  if (!result) return null;
  return (
    <div>
      <h2>Score: {result.score}</h2>
      <p>{result.feedback}</p>
    </div>
  );
}