/* eslint-disable jsx-a11y/anchor-is-valid */
import './SearchBar.css';
import React,{ useState } from 'react';

function SearchBar(props) {

  const [term, setTerm] = useState('')

  const search = () => {
    props.onSearch(term);
  }

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
