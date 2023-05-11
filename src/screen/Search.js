import React, { useEffect,useState } from 'react'
import apiClient from '../spotify';
import { useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { AiFillPlayCircle } from 'react-icons/ai';

export default function Trending() {
  let old_one="";
  const [search, setSearch] = useState(old_one);
  const [playlists, setPlaylists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [tracks, settracks] = useState([]);

  let changing = (e) => {
    setSearch(e.target.value);
  }

  let searching = async (ans) => {
    try {
      old_one=ans;
      let q = "";
      for (let i of ans) {
        if (i === ' ')
          q += "%2520";
        else
          q += i;
      }

      let response = await apiClient.get(`/v1/search?q=${q}&type=track%2Calbum%2Cplaylist&include_external=audio`);
      console.log(response?.data?.tracks?.items);
      setAlbums(response?.data?.albums?.items);
      setPlaylists(response?.data?.playlists?.items);
      settracks(response?.data?.tracks?.items);

    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    if(search!=="")
    searching(search)
  }, [])
  

  let navigate = useNavigate();
  let PlayPlaylist = (id) => {
    navigate("/player", { state: { id: id, operation: 1 } });
  }

  let PlayRelease = (id) => {
    navigate("/player", { state: { id: id, operation: 3 } });
  }

  let FavPlayTrack = (id) => {
    navigate("/player",{state:{id:id,operation:2}});
  }

  let artists_name = (arr) => {
    let ans = "";
    for (let i = 0; i < arr.length; i++) {
      if (i != arr.length - 1) {
        ans += arr[i]?.name;
        ans += ", "
      }
      else
        ans += arr[i]?.name;
    }
    return ans;
  }

  return (
    <div className='screen-container'>
      <div className='feed-body'>


        <div className="search-bar">
          <input type="text" placeholder='search album/track/playlist' value={search} onChange={changing} />
          <button onClick={() => searching(search)}>Search</button>
        </div>


        <div className="albums-body">
          <div className="album-top-body">
            <div className="albums-header">
              <div className="main-header">Playlist</div>
            </div>
          </div>
          <hr style={{ color: "white", border: "1" }} />
          <div className="library-body">
            {
              playlists.map((playlist) => {
                return (<div key={playlist.id} className="playlist-card" onClick={() => PlayPlaylist(playlist.id)}>
                  <img src={playlist.images[0].url} className="playlist-img" alt="Playlist img" />
                  <p className="playlist-title">{playlist.name}</p>
                  <p className="playlist-subtitle">{playlist.tracks.total} Songs</p>
                  <div className="playlist-fade">
                    <IconContext.Provider value={{ size: "50px", color: "#E99D72" }}>
                      <AiFillPlayCircle />
                    </IconContext.Provider>
                  </div>
                </div>)
              })
            }
          </div>
        </div>

        <div className="albums-body">
          <div className="album-top-body">
            <div className="albums-header">
              <div className="main-header">Albums</div>
            </div>
          </div>
          <hr style={{ color: "white", border: "1" }} />
          <div className="release-bottom-body" >
            {
              albums.map((album) => {
                return (<div key={album.id} className="release-card" onClick={() => PlayRelease(album.id)}>
                  <img src={album.images[0].url} className="release-img" alt="release img" />
                  <p className="release-title">{album.name}</p>
                  <p className="release-artist">{album.total_tracks} Song(s)</p>
                  <p className="release-artist">{artists_name(album.artists)}</p>
                  <div className="release-fade">
                    <IconContext.Provider value={{ size: "50px", color: "#E99D72" }}>
                      <AiFillPlayCircle />
                    </IconContext.Provider>
                  </div>
                </div>)
              })
            }
          </div>
        </div>

        <div className="albums-body">
          <div className="album-top-body">
            <div className="albums-header">
              <div className="main-header">Tracks</div>
            </div>
          </div>
          <hr style={{ color: "white", border: "1" }} />
          <div className="fav-tracks-bottom-body">
            {
              tracks.map((ele) => {
                return (<div key={ele?.id} className='fav-tracks-card' onClick={() => FavPlayTrack(ele?.id)}>
                  <img src={ele?.album?.images[0]?.url} className="fav-tracks-img" alt="fav-tracks img" />
                  <p className="fav-tracks-title">{ele?.album?.name}</p>
                  <p className="fav-tracks-artist">{artists_name(ele?.album?.artists)}</p>
                  <div className="fav-tracks-fade">
                    <IconContext.Provider value={{ size: "50px", color: "#E99D72" }}>
                      <AiFillPlayCircle />
                    </IconContext.Provider>
                  </div>
                </div>)
              })
            }
          </div>
        </div>
      </div>

    </div>
  )
}
