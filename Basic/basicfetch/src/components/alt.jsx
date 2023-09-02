import React, { useEffect, useState } from 'react';

function Appp() {
  // Define state variables
  const [page, setPage] = useState('https://rickandmortyapi.com/api/character');
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [characters, setCharacters] = useState([]);

  // useEffect to fetch data when 'page' changes
  useEffect(() => {
    console.log(page);
    fetch(page)
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.results);
        setNextPage(data.info.next);
        setPrevPage(data.info.prev);
      });
  }, [page]);

  return (
    <div>
      <h1>Hello world</h1>
      <button disabled={!prevPage} onClick={() => setPage(prevPage)}>
        Prev
      </button>
      <button disabled={!nextPage} onClick={() => setPage(nextPage)}>
        Next
      </button>
      
      <div>
      <ul>
        {characters.map((character) => (
          <div key={character.id}>{character.name} <img src={character.image} alt={character.name}/></div>
        
        ))}
      </ul>
      </div>
    </div>
  );
}

export default Appp;