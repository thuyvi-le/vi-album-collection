import "./App.css";
import { useState } from "react";
import allAlbums from "./Albums.js";

import { FaArrowUp, FaStar, FaCheck } from "react-icons/fa";

function App() {
  const artists = [
    "TXT",
    "The Boyz",
    "Astro",
    "Ghost9",
    "Stray Kids",
    "Ateez",
    "Enhypen",
    "Twice",
    "Seventeen",
    "Pentagon",
    "Lesserafim",
  ];

  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [showOwned, setShowOwned] = useState(false);
  const [showUnowned, setShowUnowned] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);

  const filterFunction = (
    searchVal,
    ownedVal,
    unownedVal,
    wishlistVal,
    artistsVal
  ) => {
    let res = allAlbums;

    res = allAlbums.filter((album) => {
      return wishlistVal ? album.wishlist : true;
    });
    res = res.filter((album) => {
      return (
        album.artist.toLowerCase().includes(searchVal.toLowerCase()) ||
        album.albumName.toLowerCase().includes(searchVal.toLowerCase())
      );
    });

    res = res.filter((album) => {
      return artistsVal.includes(album.artist) || artistsVal.length === 0;
    });

    if (ownedVal || unownedVal || (ownedVal && unownedVal)) {
      res = res.filter((album) => {
        return (
          (ownedVal ? album.owned : false) ||
          (unownedVal ? !album.owned : false)
        );
      });
    }

    return res;
  };

  const handleWishClick = () => {
    setFilteredAlbums(
      filterFunction(
        search,
        showOwned,
        showUnowned,
        !showWishlist,
        selectedArtists
      )
    );

    setShowWishlist(!showWishlist);
  };

  const handleOwnedClick = () => {
    setFilteredAlbums(
      filterFunction(
        search,
        !showOwned,
        showUnowned,
        showWishlist,
        selectedArtists
      )
    );

    setShowOwned(!showOwned);
  };

  const handleUnownedClick = () => {
    setFilteredAlbums(
      filterFunction(
        search,
        showOwned,
        !showUnowned,
        showWishlist,
        selectedArtists
      )
    );

    setShowUnowned(!showUnowned);
  };

  const handleArtistSelect = (artist) => {
    let artistArr = selectedArtists;

    if (selectedArtists.includes(artist)) {
      artistArr = artistArr.filter((art) => {
        return art !== artist;
      });
    } else {
      artistArr.push(artist);
    }
    setSelectedArtists(artistArr);

    setFilteredAlbums(
      filterFunction(search, showOwned, showUnowned, showWishlist, artistArr)
    );
  };

  const handleSearch = () => {
    setFilteredAlbums(
      filterFunction(
        searchInput,
        showOwned,
        showUnowned,
        showWishlist,
        selectedArtists
      )
    );
    setSearch(searchInput);
  };

  const handleSearchErase = () => {
    setFilteredAlbums(
      filterFunction("", showOwned, showUnowned, showWishlist, selectedArtists)
    );
    setSearchInput("");
    setSearch("");
  };

  const showAllAlbums = () => {
    return (
      filteredAlbums.length === 0 &&
      selectedArtists.length === 0 &&
      !showOwned &&
      !showUnowned &&
      !showWishlist &&
      search === ""
    );
  };

  const displayAlbum = (album) => {
    return (
      <div key={`${album.artist}-${album.albumName}`} className="albumBox">
        <div
          className="albumPhoto"
          style={{
            backgroundImage: `url("/album-pics/${album.img}")`,
          }}
        >
          {album.owned ? (
            <FaCheck className="albumStatusSymbol" />
          ) : album.wishlist ? (
            <FaStar className="albumStatusSymbol" />
          ) : (
            <></>
          )}
        </div>
        <div>
          <p className="albumArtist">{album.artist}</p>
          <p className="albumName">{album.albumName}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div id="banner">
        <h2 id="subtitle">VI'S KPOP</h2>
        <h1 id="title" className="lavishly-yours-regular">
          &#10047; <span>collection</span> &#10047;
        </h1>
        <h2 id="lastUpdated">last updated: 2025/12/11</h2>
      </div>
      <div className="body">
        <div className="filterContainer">
          <div className="searchContainer borderedContainer">
            <input
              type="text"
              className="search"
              placeholder="search..."
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            {search !== "" ? (
              <button className="searchBtn" onClick={() => handleSearchErase()}>
                &#10007;
              </button>
            ) : (
              <></>
            )}
            <button className="searchBtn" onClick={() => handleSearch()}>
              &#10087;
            </button>
          </div>
          <div className="statusContainer">
            <div className="checkContainer">
              <input
                type="checkbox"
                name="Owned"
                onChange={() => handleOwnedClick()}
              />
              <label for="owned">Owned</label>
            </div>
            <div className="checkContainer">
              <input
                type="checkbox"
                name="unowned"
                onChange={() => handleUnownedClick()}
              />
              <label for="unowned">Unowned</label>
            </div>
            <div className="checkContainer">
              <input
                type="checkbox"
                name="Wishlist"
                onChange={() => handleWishClick()}
              />
              <label for="wishlist">
                Wishlist
                <FaStar style={{ marginLeft: "3px", verticalAlign: "top" }} />
              </label>
            </div>
          </div>
        </div>

        <h2>ARTISTS</h2>
        <div className="artistsContainer">
          {artists.map((artist) => {
            return (
              <button
                key={artist}
                className={`
                  artistFilterContainer borderedContainer ${
                    selectedArtists.includes(artist) ? "selectedArtist" : ""
                  }
                `}
                value={artist}
                onClick={() => handleArtistSelect(artist)}
              >
                {artist}
              </button>
            );
          })}
        </div>

        <h2>ALBUMS</h2>
        <div className="albumsContainer">
          {showAllAlbums()
            ? allAlbums.map((album) => displayAlbum(album))
            : filteredAlbums.map((album) => displayAlbum(album))}
        </div>
      </div>
      <a href="#banner" className="upbtn">
        <FaArrowUp />
      </a>
    </div>
  );
}

export default App;
