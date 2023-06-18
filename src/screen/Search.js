import React, { useEffect, useState } from 'react'
import apiClient from '../spotify';
import { useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { AiFillPlayCircle } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import "../screen_css/search.css"
import { useDispatch, useSelector } from 'react-redux';
import { errorActions } from '../store/error-slice';
import ErrorMsg from '../components/ErrorMsg';
import { searchActions } from '../store/search-slice';

export default function Search() {
  let searchR=useSelector(state=>state.search);
  let old_one = "";
  const [search, setSearch] = useState(searchR?.searchtab);
  const [playlists, setPlaylists] = useState(searchR?.playlists);
  const [albums, setAlbums] = useState(searchR?.albums);
  const [tracks, settracks] = useState(searchR?.tracks);

  const [e1, setE1] = useState(false);
  const [e2, setE2] = useState(false);
  const [e3, setE3] = useState(false);

  let dispatch = useDispatch();


  let display = false;
  if (playlists.length === 0 && albums.length === 0 && tracks.length === 0 && search==="") {
    display = true;
  }

  let changing = (e) => {
    setSearch(e.target.value);
  }

  let searching = async (ans) => {
    try {
      old_one = ans;
      dispatch(searchActions.setSearchtab(ans));
      let q = "";
      for (let i of ans) {
        if (i === ' ')
          q += "%2520";
        else
          q += i;
      }

      let response = await apiClient.get(`/v1/search?q=${q}&type=track%2Calbum%2Cplaylist&include_external=audio`);
      // console.log(response?.data?.tracks?.items);
      setAlbums(response?.data?.albums?.items);
      dispatch(searchActions.setAlbums(response?.data?.albums?.items));
      if (response?.data?.albums?.items===0) {
        setE2(true);
        dispatch(errorActions.setCode(2));
        dispatch(errorActions.setMsg("It seems there are no albums regarding this search"));
      }
      setPlaylists(response?.data?.playlists?.items);
      dispatch(searchActions.setPlaylists(response?.data?.playlists?.items));
      if (response?.data?.playlists?.items===0) {
        setE1(true);
        dispatch(errorActions.setCode(2));
        dispatch(errorActions.setMsg("It seems there are no playlist regarding this search"));
      }
      settracks(response?.data?.tracks?.items);
      dispatch(searchActions.setTracks(response?.data?.tracks?.items));
      if (response?.data?.tracks?.items===0) {
        setE3(true);
        dispatch(errorActions.setCode(2));
        dispatch(errorActions.setMsg("It seems there are no tracks regarding this search"));
      }

    } catch (error) {
      setE1(true);
      setE2(true);
      setE3(true);
      dispatch(errorActions.setCode(3));
      dispatch(errorActions.setMsg(error?.response?.data?.error?.message));
      console.log(error);
    }

  }

  // useEffect(() => {
  //   if (search !== "")
  //     searching(search)
  // }, [])


  let navigate = useNavigate();
  let PlayPlaylist = (id, img, name, des) => {
    navigate("/player", { state: { id: id, operation: 1, img: img, name: name, des: des } });
  }

  let PlayRelease = (id, img, name, artist_arr, type, tt) => {

    let artist = [];
    artist_arr?.forEach((element) => {
      artist.push(element.name);
    });

    let des = `It is an ${type} by ${artist.join(", ")} with ${tt} track(s)`

    navigate("/player", { state: { id: id, operation: 3, img: img, name: name, des: des } });
  }

  let FavPlayTrack = (id, img, name, artist_arr, type) => {
    let artist = [];
    artist_arr?.forEach((element) => {
      artist.push(element.name);
    });

    let des = `It is a ${type} by ${artist.join(", ")}`
    navigate("/player", { state: { id: id, operation: 2, img: img, name: name, des: des } });
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
    <div className='screen-container' >

      <div className='feed-body'>

        <div className="search-bar">
          <table className='search-bar-table'>
            <tr>
              <td>
                <input type="text" placeholder='search album/track/playlist' value={search} onChange={changing} className='search-input' />
              </td>
              <td>
                <a href='#' onClick={() => searching(search)} className='search-button'>
                  <IconContext.Provider value={{ size: "23px", color: "white" }}>
                    <BsSearch />
                  </IconContext.Provider>
                </a>
              </td>
            </tr>
          </table>
        </div>


        {!display && <>


          <div className="albums-body">
            <div className="album-top-body">
              <div className="albums-header">
                <div className="main-header">Playlist</div>
              </div>
            </div>
            <hr style={{ color: "white", border: "1" }} />
            {!e1 &&
              <div className="library-body">
                {
                  playlists.map((playlist) => {
                    return (<div key={playlist.id} className="playlist-card" onClick={() => PlayPlaylist(playlist?.id, playlist?.images[0]?.url, playlist?.name, playlist?.description)}>
                      <img src={playlist?.images[0]?.url} className="playlist-img" alt="Playlist img" />
                      <p className="playlist-title">{playlist?.name}</p>
                      <p className="playlist-subtitle">{playlist?.tracks?.total} Songs</p>
                      <div className="playlist-fade">
                        <IconContext.Provider value={{ size: "50px", color: "#E99D72" }}>
                          <AiFillPlayCircle />
                        </IconContext.Provider>
                      </div>
                    </div>)
                  })
                }
              </div>
            }
            {
              e1 && <ErrorMsg />
            }
          </div>

          <div className="albums-body">
            <div className="album-top-body">
              <div className="albums-header">
                <div className="main-header">Albums</div>
              </div>
            </div>
            <hr style={{ color: "white", border: "1" }} />
            {!e2 &&
              <div className="release-bottom-body" >
                {
                  albums.map((album) => {
                    return (<div key={album.id} className="release-card" onClick={() => PlayRelease(album?.id,album?.images[0]?.url,album?.name,album?.artists,album?.type,album?.total_tracks)}>
                      <img src={album?.images[0]?.url} className="release-img" alt="release img" />
                      <p className="release-title">{album?.name}</p>
                      <p className="release-artist">{album?.total_tracks} Song(s)</p>
                      <p className="release-artist">{artists_name(album?.artists)}</p>
                      <div className="release-fade">
                        <IconContext.Provider value={{ size: "50px", color: "#E99D72" }}>
                          <AiFillPlayCircle />
                        </IconContext.Provider>
                      </div>
                    </div>)
                  })
                }
              </div>}
            {
              e2 && <ErrorMsg />
            }
          </div>

          <div className="albums-body">
            <div className="album-top-body">
              <div className="albums-header">
                <div className="main-header">Tracks</div>
              </div>
            </div>
            <hr style={{ color: "white", border: "1" }} />
            {!e3 &&
              <div className="fav-tracks-bottom-body">
                {
                  tracks.map((ele) => {
                    return (<div key={ele?.id} className='fav-tracks-card' onClick={() => FavPlayTrack(ele?.id,ele?.album?.images[0]?.url, ele?.album?.name, ele?.album?.artists, ele?.type)}>
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
              </div>}
            {
              e3 && <ErrorMsg />
            }
          </div>
        </>


        }
      </div>

    </div>

  )
}
