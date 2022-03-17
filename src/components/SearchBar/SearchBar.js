/* eslint-disable jsx-a11y/anchor-is-valid */
import './SearchBar.css';
import React,{ useState } from 'react';

function SearchBar(props) {

  // keep searching word  
  const [term, setTerm] = useState('')

  // pass term into search function in App.js
  const search = () => {
    props.onSearch(term);
  }

  // handle input value
  const handleTermChange = (e) => {
    setTerm(e.target.value)
  }

  return (
    <div className="SearchBar">
      <input placeholder="Enter A Song Title" onChange={handleTermChange}/>
      <button className="SearchButton" onClick={search}>SEARCH</button>
    </div>
  );
}

export default SearchBar;
