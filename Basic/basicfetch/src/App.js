import React, { useEffect, useState } from 'react';

const App = () => {
  const [char, setChar] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search,setSearch]=useState('');

  useEffect(() => {
    setLoading(true)
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setChar(data.results)
        setTotalPages(data.info.pages)
        setLoading(false)
      }).catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [page])

  const handlePage=(newPage)=>{
     if(newPage >= 1 && newPage <= totalPages){
      setPage(newPage)
     }
  }

  const searchedChar=char.filter(el=>el.name.toLowerCase().includes(search.toLocaleLowerCase()));

  // console.log(char)
  // console.log(totalPages);
  return (
    <div>
      <button disabled={page===1} onClick={()=>handlePage(page - 1)}>Prev</button>
      <span>{page}</span>
      <button disabled={page===totalPages} onClick={()=>handlePage(page + 1)}>Next</button>
      <input
      type="text"
      placeholder="Search characters by name"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
      {loading ? (<h1>Loading...</h1>) : 
       (
        searchedChar.map((el) => (
          <div key={el.id}>
            <li>{el.name}</li>
            <img src={el.image} alt={el.name} />
          </div>
        ))
      )}
    </div>
  );
}

export default App;
