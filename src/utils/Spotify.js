// TODO: Get Client ID from https://developer.spotify.com/dashboard/ and put it here
const clientId = 'd3ff024c4a59411c91a21acee7a64daa';

// Have to add this to your accepted Spotify redirect URIs on the Spotify API.
// const redirectUri = 'http://localhost:3000/';
const redirectUri = 'http://jammming-tee.surge.sh';

// This is a url for get access token
const spotifyUrl = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientId}&redirect_uri=${redirectUri}`;

let accessToken = undefined;
let expiresIn = undefined;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    //return [0="access_token=accessToken", 1="accessToken"]
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);

    //return [0="expires_in=expiresIn", 1= "expiresIn"]
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    
    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      expiresIn = urlExpiresIn[1];
      
      // wait until access token expires to set access to ''
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);

      // This clears the parameters, allowing us to grab a new access token when it expires.
      window.history.pushState('Access Token', null, '/');
      
    } else {
      window.location = spotifyUrl;
    }
  },

  async search(term) {
    const accessToken = Spotify.getAccessToken();
    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term.replace(' ', '%20')}`;
    return fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) return [];
        return jsonResponse.tracks.items.map((track) => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
          };
        });
      });
  },

  async savePlaylist(name, trackUris) {
    const accessToken = Spotify.getAccessToken();
    if (Array.isArray(trackUris) && trackUris.length) {
      const createPlaylistUrl = `https://api.spotify.com/v1/me/playlists`;
      const response = await fetch(createPlaylistUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name: name }),
      });
      const jsonResponse = await response.json();
      const playlistId = jsonResponse.id;
      if (playlistId) {
        const replacePlaylistTracksUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
        await fetch(replacePlaylistTracksUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            uris: trackUris,
          }),
        });
      }
    }
  },
};

export default Spotify;
