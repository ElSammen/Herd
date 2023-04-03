import React, { useState } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { genresList } from './Genres';

export function CustomAutoComplete() {


const [selectedGenres, setSelectedGenres] = useState([]);

const handleSelect = (event) => {
  const selectedGenre = event.value;
  setSelectedGenres([...selectedGenres, selectedGenre]);
  // Clear the input value after a selection is made
  event.query = '';
};

const logResult = (event) => {
    console.log(event);
}


return (
  <AutoComplete
    field="name"
    multiple
    value={selectedGenres}
    suggestions={genresList}
    completeMethod={logResult}
    onChange={(event) => setSelectedGenres(event.value)}
    onSelect={handleSelect}
  />
);
}