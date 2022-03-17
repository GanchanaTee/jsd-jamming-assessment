import './Playlist.css';
import TrackList from '../TrackList/TrackList';

function Playlist(props) {

  const handleNameChange = (e) => {
    props.onNameChange(e.target.value);
  }

  return (
    <div className="Playlist">
      <input placeholder='New Playlist' onChange={handleNameChange} value={props.playlistName}/>
      <TrackList tracks={props.playlistTracks} 
                 isRemoval={true}
                 onRemove={props.onRemove}   />
      <button className="Playlist-save" onClick={props.onSave}>SAVE TO SPOTIFY</button>
  </div>
  )
}

export default Playlist;
