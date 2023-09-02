import React, { useEffect, useState } from 'react';

const RickAndMortyCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('https://rickandmortyapi.com/api/character')
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ul>
            {characters.map((character) => (
              <li key={character.id}>
                <img src={character.image} alt={character.name} />
                {character.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RickAndMortyCharacters;
