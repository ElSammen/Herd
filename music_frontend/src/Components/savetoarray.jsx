import React from 'react'

function savetoarray() {
    const [genre, setGenre] = useState(null);
    const [genreArray, setGenreArray] = useState([]);

    const addGenre = () => {
        setGenreArray([...genreArray, genre]);
    }

    const removeGenre = (index) => {
        const newGenreArray = [...genreArray];
        newGenreArray.splice(index, 1);
        setGenreArray(newGenreArray);
    }

    const saveGenres = () => {
        console.log(genreArray);
    }



  return (
    <div>
        <input type="text" onChange={(e) => setGenre(e.target.value)} />
        <button onClick={addGenre}>Add Genre</button>
        <button onClick={saveGenres}>Save Genres</button>
        <ul>
            {genreArray.map((genre, index) => (
                <li key={index}>
                    {genre}
                    <button onClick={() => removeGenre(index)}>Remove</button>
                </li>
            ))}
        </ul>
        
    </div>
  )
}

export default savetoarray