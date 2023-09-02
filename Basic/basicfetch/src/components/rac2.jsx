import React, { useEffect, useState } from 'react';

const RickAndMortyCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);
        setTotalPages(data.info.pages);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

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
          <div>
            <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
              Previous Page
            </button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
              Next Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RickAndMortyCharacters;
