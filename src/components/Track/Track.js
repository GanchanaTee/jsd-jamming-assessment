import './Track.css';

function Track(props) {

  // feel like include addTrack function in app.js and pass it to renderAction function
  const addTrack = () => {
    props.onAdd(props.track);
  }

  // feel like include removeTrack function in app.js and pass it to renderAction function
  const removeTrack = () => {
    props.onRemove(props.track)
  }

  // Render + or - button to each track if it from Playlist.js( isRemoval = true) => render - button else render + button
  const renderAction =() => {
    if( props.isRemoval) {
      return <button className="Track-action" onClick={removeTrack}>-</button>
    }
    return <button className="Track-action" onClick={addTrack}>+</button>
  }

  return (
    <div className="Track">
    <div className="Track-information">
      <h3>{props.track.name}</h3>
      <p>{props.track.artist} | {props.track.album}</p>
    </div>
    {renderAction()}
    </div>
  )
}

export default Track;
