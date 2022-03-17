import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

function SearchResults(props) {

  // props.searchResults from search function and pass it to TrackList. it add search result on searchResults state in App.js 
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <TrackList tracks={props.searchResults} onAdd={props.onAdd}/>
    </div>
  )
}

export default SearchResults;
