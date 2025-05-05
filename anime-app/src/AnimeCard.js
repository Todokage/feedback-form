
import React from 'react';

const AnimeCard = ({ anime }) => {
  return (
    <div className="anime-card" style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '300px' }}>
      <img src={anime.posterURL} alt={anime.title} style={{ width: '100%', height: 'auto' }} />
      <h3>{anime.title}</h3>
      <p><strong>Rating:</strong> {anime.rating}/5</p>
      <p>{anime.description}</p>
    </div>
  );
};

export default AnimeCard;