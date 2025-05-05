// src/App.js
import React, { useState } from 'react'; // Import useState hook
import './App.css';
import AnimeList from './AnimeList';
import Filter from './Filter';
import opImage from './op.jpeg'; // Import One Piece image
import aotImage from './aot.jpeg'; // Import Attack on Titan image
import narutoImage from './naruto.jpeg'; // Import Naruto image
function App() {
  // State to hold the list of anime
  const [animeData, setAnimeData] = useState([
    {
      title: "One Piece",
      description: "The adventures of Monkey D. Luffy and his pirate crew in their quest to find the One Piece treasure.",
      posterURL: opImage,
      
      rating: 5
    },
    {
      title: "Attack on Titan",
      description: "In a world where humanity resides within enormous walled cities to protect themselves from Titans, gigantic humanoid creatures, the story follows Eren Yeager and his friends who join the military to fight against the Titans.",
      posterURL: aotImage,
     
      rating: 5
    },
    {
      title: "Naruto",
      description: "A young ninja, Naruto Uzumaki, seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village.",
      posterURL: narutoImage,
   
      rating: 4
    }
  ]);

  //  filter values
  const [filterTitle, setFilterTitle] = useState('');
  const [filterRating, setFilterRating] = useState('');

  //  new anime input fields
  const [newAnime, setNewAnime] = useState({
    title: '',
    description: '',
    posterURL: '',
    rating: ''
  });

  //  handle input changes for adding a new anime
  const handleNewAnimeChange = (e) => {
    const { name, value } = e.target;
    setNewAnime(prevAnime => ({
      ...prevAnime,
      [name]: value
    }));
  };

  //  add the new anime to the list
  const handleAddAnime = () => {
    // check if title and posterURL are not empty
    if (newAnime.title && newAnime.posterURL) {
      // Add the new anime to the existing list
      setAnimeData([...animeData, newAnime]);
      // Clear the input fields after adding
      setNewAnime({
        title: '',
        description: '',
        posterURL: '',
        rating: ''
      });
    } else {
      alert('Please provide a title and poster URL for the new anime.');
    }
  };

  // Filter the anime data based on the filter states
  const filteredAnime = animeData.filter(anime => {
    const titleMatch = anime.title.toLowerCase().includes(filterTitle.toLowerCase());
    const ratingMatch = filterRating === '' || anime.rating >= parseFloat(filterRating);
    return titleMatch && ratingMatch;
  });

  return (
    <div className="App">
      <h1>My Favorite Anime</h1>

      {/* Filter Section */}
      <h2>Filter Anime</h2>
      <Filter
        onTitleChange={setFilterTitle}
        onRatingChange={setFilterRating}
      />

      {/* Add New Anime Section */}
      <h2>Add New Anime</h2>
      <div style={{ marginBottom: '20px', border: '1px dashed #ccc', padding: '15px' }}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newAnime.title}
          onChange={handleNewAnimeChange}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <input
          type="text"
          name="posterURL"
          placeholder="Poster URL"
          value={newAnime.posterURL}
          onChange={handleNewAnimeChange}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating (0-5)"
          min="0"
          max="5"
          value={newAnime.rating}
          onChange={handleNewAnimeChange}
          style={{ marginRight: '10px', padding: '8px', width: '100px' }}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newAnime.description}
          onChange={handleNewAnimeChange}
          style={{ marginRight: '10px', padding: '8px', width: '80%' }}
        />
        <button onClick={handleAddAnime} style={{ padding: '8px 15px' }}>Add Anime</button>
      </div>


      {/* Anime List Section */}
      <h2>Anime List</h2>
      <AnimeList animeList={filteredAnime} /> {/* Pass the filtered list */}
    </div>
  );
}

export default App;
