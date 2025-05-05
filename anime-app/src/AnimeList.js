

import AnimeCard from './AnimeCard';

const AnimeList = ({ animeList }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {animeList.map(anime => (
        <AnimeCard key={anime.title} anime={anime} />
      ))}
    </div>
  );
};

export default AnimeList;