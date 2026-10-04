import React, { useMemo, useState } from "react";
import { useStore } from "~/stores";

type Song = {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  image: string;
};

type Playlist = {
  title: string;
  subtitle: string;
  image: string;
};

const songs: Song[] = [
  {
    id: 1,
    title: "After Dark",
    artist: "Mr.Kitty",
    album: "Time",
    duration: "4:18",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=85",
  },
  {
    id: 2,
    title: "The Night We Met",
    artist: "Lord Huron",
    album: "Strange Trails",
    duration: "3:28",
    image:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&auto=format&fit=crop&q=85",
  },
  {
    id: 3,
    title: "505",
    artist: "Arctic Monkeys",
    album: "Favourite Worst Nightmare",
    duration: "4:13",
    image:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&auto=format&fit=crop&q=85",
  },
  {
    id: 4,
    title: "Sweater Weather",
    artist: "The Neighbourhood",
    album: "I Love You.",
    duration: "4:00",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format&fit=crop&q=85",
  },
  {
    id: 5,
    title: "Space Song",
    artist: "Beach House",
    album: "Depression Cherry",
    duration: "5:20",
    image:
      "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&auto=format&fit=crop&q=85",
  },
  {
    id: 6,
    title: "Apocalypse",
    artist: "Cigarettes After Sex",
    album: "Cigarettes After Sex",
    duration: "4:50",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&auto=format&fit=crop&q=85",
  },
];

const playlists: Playlist[] = [
  {
    title: "Kavya's Favorites",
    subtitle: "Your personal collection",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&auto=format&fit=crop&q=85",
  },
  {
    title: "Late Night Coding",
    subtitle: "Code. Coffee. Repeat.",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900&auto=format&fit=crop&q=85",
  },
  {
    title: "Main Character Energy",
    subtitle: "For the cinematic moments",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&auto=format&fit=crop&q=85",
  },
  {
    title: "2 AM Thoughts",
    subtitle: "Songs for when everyone is asleep",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&auto=format&fit=crop&q=85",
  },
  {
    title: "Reading & Rain",
    subtitle: "Books, rain and good music",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=900&auto=format&fit=crop&q=85",
  },
  {
    title: "LeetCode Grind",
    subtitle: "One more problem.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=85",
  },
];

const recentlyPlayed: Song[] = [
  songs[2],
  songs[4],
  songs[0],
  songs[5],
  songs[1],
];

export default function Spotify() {
  const dark = useStore((state) => state.dark);

  const [activePage, setActivePage] = useState("Home");
  const [currentSong, setCurrentSong] = useState<Song>(songs[2]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(34);
  const [volume, setVolume] = useState(72);
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState(false);

  const filteredSongs = useMemo(() => {
    if (!search.trim()) {
      return songs;
    }

    const query = search.toLowerCase();

    return songs.filter(
      (song) =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.album.toLowerCase().includes(query),
    );
  }, [search]);

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setProgress(0);
  };

  const nextSong = () => {
    const index = songs.findIndex((song) => song.id === currentSong.id);

    const next = songs[(index + 1) % songs.length];

    setCurrentSong(next);
    setProgress(0);
    setIsPlaying(true);
  };

  const previousSong = () => {
    const index = songs.findIndex((song) => song.id === currentSong.id);

    const previous = songs[(index - 1 + songs.length) % songs.length];

    setCurrentSong(previous);
    setProgress(0);
    setIsPlaying(true);
  };

  const openSpotifyProfile = () => {
    window.open(
      "https://open.spotify.com/user/31eqvfpfarhilnqfsvd5eed37qsa",
      "_blank",
      "noopener,noreferrer",
    );
  };

  const isPlaylistPage = playlists.some(
    (playlist) => playlist.title === activePage,
  );

  return (
    <div
      className="relative flex h-full w-full select-none overflow-hidden bg-black text-white"
      style={{
        fontFamily: "Inter, sans-serif",
      }}
      onMouseDown={(event) => event.stopPropagation()}
    >
      {/* =========================================================
          SIDEBAR
      ========================================================= */}
      <aside className="flex w-[220px] shrink-0 flex-col bg-black px-3 py-4">
        {/* Logo */}
        <div className="mb-7 flex items-center gap-2 px-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1ed760] text-black">
            <span className="text-base font-black">●</span>
          </div>

          <span className="text-xl font-bold tracking-tight">Spotify</span>
        </div>

        {/* Main navigation */}
        <nav className="space-y-1">
          <SidebarButton
            active={activePage === "Home"}
            icon="⌂"
            label="Home"
            onClick={() => setActivePage("Home")}
          />

          <SidebarButton
            active={activePage === "Search"}
            icon="⌕"
            label="Search"
            onClick={() => setActivePage("Search")}
          />

          <SidebarButton
            active={activePage === "Library"}
            icon="▤"
            label="Your Library"
            onClick={() => setActivePage("Library")}
          />
        </nav>

        {/* Playlists */}
        <div className="mt-7 flex items-center justify-between px-3">
          <span className="text-[11px] font-semibold tracking-wide text-[#b3b3b3]">
            YOUR PLAYLISTS
          </span>

          <button
            className="text-xl text-[#b3b3b3] transition hover:text-white"
            aria-label="Create playlist"
          >
            +
          </button>
        </div>

        <div className="mt-3 min-h-0 flex-1 overflow-y-auto pr-1">
          <div className="space-y-0.5">
            {playlists.map((playlist) => (
              <button
                key={playlist.title}
                onClick={() => setActivePage(playlist.title)}
                className={`block w-full truncate rounded px-3 py-1.5 text-left text-xs transition ${
                  activePage === playlist.title
                    ? "bg-[#282828] text-white"
                    : "text-[#a7a7a7] hover:text-white"
                }`}
              >
                {playlist.title}
              </button>
            ))}
          </div>
        </div>

        {/* Profile */}
        <button
          onClick={openSpotifyProfile}
          className="mt-4 flex items-center gap-3 border-t border-[#282828] px-3 pt-4 text-left"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1ed760] to-[#15883e] text-sm font-bold text-black">
            K
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">Kavya</p>

            <p className="truncate text-[10px] text-[#a7a7a7]">
              View Spotify profile
            </p>
          </div>
        </button>
      </aside>

      {/* =========================================================
          MAIN AREA
      ========================================================= */}
      <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-gradient-to-b from-[#242424] via-[#161616] to-[#121212]">
        {/* Top bar */}
        <header className="flex h-[64px] shrink-0 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-xl text-[#b3b3b3] transition hover:text-white"
              aria-label="Back"
            >
              ‹
            </button>

            <button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-xl text-[#b3b3b3] transition hover:text-white"
              aria-label="Forward"
            >
              ›
            </button>
          </div>

          <button
            onClick={openSpotifyProfile}
            className="flex items-center gap-2 rounded-full bg-black/70 py-1.5 pl-1.5 pr-3 transition hover:bg-[#282828]"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#1ed760] to-[#15883e] text-[11px] font-bold text-black">
              K
            </div>

            <span className="max-w-[100px] truncate text-xs font-semibold">
              Kavya
            </span>

            <span className="text-xs text-[#a7a7a7]">⌄</span>
          </button>
        </header>

        {/* =======================================================
            CONTENT
        ======================================================= */}
        <section className="min-h-0 flex-1 overflow-y-auto px-6 pb-32">
          {/* SEARCH */}
          {activePage === "Search" && (
            <SearchPage
              search={search}
              setSearch={setSearch}
              songs={filteredSongs}
              currentSong={currentSong}
              isPlaying={isPlaying}
              onPlay={playSong}
            />
          )}

          {/* LIBRARY */}
          {activePage === "Library" && (
            <LibraryPage playlists={playlists} onSelect={setActivePage} />
          )}

          {/* HOME */}
          {activePage === "Home" && (
            <HomePage
              recentlyPlayed={recentlyPlayed}
              playlists={playlists}
              currentSong={currentSong}
              isPlaying={isPlaying}
              onPlay={playSong}
              onSelect={setActivePage}
            />
          )}

          {/* PLAYLIST */}
          {isPlaylistPage && (
            <PlaylistPage
              title={activePage}
              songs={songs}
              currentSong={currentSong}
              isPlaying={isPlaying}
              onPlay={playSong}
            />
          )}
        </section>

        {/* =======================================================
            PLAYER
        ======================================================= */}
        <footer className="absolute bottom-0 left-0 right-0 z-30 flex h-[76px] items-center border-t border-[#282828] bg-[#181818] px-4">
          {/* Current track */}
          <div className="flex w-[30%] min-w-0 items-center gap-3">
            <img
              src={currentSong.image}
              alt={currentSong.title}
              className="h-12 w-12 shrink-0 rounded object-cover"
            />

            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-white">
                {currentSong.title}
              </p>

              <p className="truncate text-[10px] text-[#a7a7a7]">
                {currentSong.artist}
              </p>
            </div>

            <button
              onClick={() => setLiked((value) => !value)}
              className={`ml-1 text-lg transition ${
                liked ? "text-[#1ed760]" : "text-[#a7a7a7] hover:text-white"
              }`}
              aria-label="Like"
            >
              {liked ? "♥" : "♡"}
            </button>
          </div>

          {/* Playback controls */}
          <div className="flex flex-1 flex-col items-center">
            <div className="flex items-center gap-5">
              <button
                className="text-sm text-[#b3b3b3] transition hover:text-white"
                aria-label="Shuffle"
              >
                ⤨
              </button>

              <button
                onClick={previousSong}
                className="text-sm text-[#b3b3b3] transition hover:text-white"
                aria-label="Previous"
              >
                ◀
              </button>

              <button
                onClick={() => setIsPlaying((value) => !value)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-bold text-black transition hover:scale-105"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? "Ⅱ" : "▶"}
              </button>

              <button
                onClick={nextSong}
                className="text-sm text-[#b3b3b3] transition hover:text-white"
                aria-label="Next"
              >
                ▶
              </button>

              <button
                className="text-sm text-[#b3b3b3] transition hover:text-white"
                aria-label="Repeat"
              >
                ↻
              </button>
            </div>

            <div className="mt-1 flex w-full max-w-[500px] items-center gap-2 text-[9px] text-[#a7a7a7]">
              <span>1:24</span>

              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(event) => setProgress(Number(event.target.value))}
                className="h-1 flex-1 cursor-pointer accent-white"
                aria-label="Song progress"
              />

              <span>{currentSong.duration}</span>
            </div>
          </div>

          {/* Volume */}
          <div className="hidden w-[30%] items-center justify-end gap-2 sm:flex">
            <span className="text-sm text-[#b3b3b3]">🔊</span>

            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              className="w-24 cursor-pointer accent-white"
              aria-label="Volume"
            />
          </div>
        </footer>
      </main>
    </div>
  );
}

/* ===============================================================
   SIDEBAR BUTTON
================================================================ */

function SidebarButton({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-md px-3 py-2.5 text-sm font-semibold transition ${
        active ? "bg-[#282828] text-white" : "text-[#b3b3b3] hover:text-white"
      }`}
    >
      <span className="w-5 text-center text-xl">{icon}</span>

      {label}
    </button>
  );
}

/* ===============================================================
   HOME PAGE
================================================================ */

function HomePage({
  recentlyPlayed,
  playlists,
  currentSong,
  isPlaying,
  onPlay,
  onSelect,
}: {
  recentlyPlayed: Song[];
  playlists: Playlist[];
  currentSong: Song;
  isPlaying: boolean;
  onPlay: (song: Song) => void;
  onSelect: (title: string) => void;
}) {
  return (
    <>
      <h1 className="mb-7 text-3xl font-bold">Good afternoon, Kavya</h1>

      {/* Quick picks */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {recentlyPlayed.map((song) => (
          <button
            key={song.id}
            onClick={() => onPlay(song)}
            className="group flex min-w-0 items-center overflow-hidden rounded-md bg-white/10 text-left transition hover:bg-white/20"
          >
            <img
              src={song.image}
              alt=""
              className="h-14 w-14 shrink-0 object-cover"
            />

            <span className="min-w-0 flex-1 truncate px-3 text-xs font-semibold">
              {song.title}
            </span>

            <span className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1ed760] text-black opacity-0 shadow-lg transition group-hover:opacity-100">
              ▶
            </span>
          </button>
        ))}
      </div>

      {/* Made for Kavya */}
      <section className="mt-9">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-bold">Made For Kavya</h2>

          <button
            onClick={() => onSelect("Library")}
            className="text-xs font-bold text-[#a7a7a7] transition hover:text-white"
          >
            Show all
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {playlists.slice(0, 4).map((playlist) => (
            <PlaylistCard
              key={playlist.title}
              playlist={playlist}
              onClick={() => onSelect(playlist.title)}
            />
          ))}
        </div>
      </section>

      {/* Recently played */}
      <section className="mt-9">
        <h2 className="mb-4 text-xl font-bold">Recently Played</h2>

        <div className="space-y-1">
          {recentlyPlayed.map((song) => (
            <SongRow
              key={song.id}
              song={song}
              playing={currentSong.id === song.id && isPlaying}
              onPlay={() => onPlay(song)}
            />
          ))}
        </div>
      </section>
    </>
  );
}

/* ===============================================================
   SEARCH PAGE
================================================================ */

function SearchPage({
  search,
  setSearch,
  songs,
  currentSong,
  isPlaying,
  onPlay,
}: {
  search: string;
  setSearch: (value: string) => void;
  songs: Song[];
  currentSong: Song;
  isPlaying: boolean;
  onPlay: (song: Song) => void;
}) {
  return (
    <>
      <div className="mb-7">
        <h1 className="mb-5 text-3xl font-bold">Search</h1>

        <div className="flex max-w-[520px] items-center rounded-full bg-white px-4 py-3 text-black shadow-lg">
          <span className="mr-3 text-xl">⌕</span>

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="What do you want to play?"
            className="w-full bg-transparent text-sm outline-none placeholder:text-[#6b6b6b]"
            autoFocus
          />
        </div>
      </div>

      <h2 className="mb-4 text-xl font-bold">
        {search ? "Results" : "Browse your music"}
      </h2>

      <div className="space-y-1">
        {songs.map((song) => (
          <SongRow
            key={song.id}
            song={song}
            playing={currentSong.id === song.id && isPlaying}
            onPlay={() => onPlay(song)}
          />
        ))}

        {songs.length === 0 && (
          <div className="py-10 text-center text-sm text-[#a7a7a7]">
            No results found.
          </div>
        )}
      </div>
    </>
  );
}

/* ===============================================================
   LIBRARY PAGE
================================================================ */

function LibraryPage({
  playlists,
  onSelect,
}: {
  playlists: Playlist[];
  onSelect: (title: string) => void;
}) {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Your Library</h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.title}
            playlist={playlist}
            onClick={() => onSelect(playlist.title)}
          />
        ))}
      </div>
    </>
  );
}

/* ===============================================================
   PLAYLIST PAGE
================================================================ */

function PlaylistPage({
  title,
  songs,
  currentSong,
  isPlaying,
  onPlay,
}: {
  title: string;
  songs: Song[];
  currentSong: Song;
  isPlaying: boolean;
  onPlay: (song: Song) => void;
}) {
  const playlist = playlists.find((item) => item.title === title);

  return (
    <div className="mt-3">
      {/* Playlist hero */}
      <div className="mb-7 flex items-end gap-5">
        <img
          src={
            playlist?.image ||
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&auto=format&fit=crop&q=85"
          }
          alt={title}
          className="h-40 w-40 shrink-0 rounded-md object-cover shadow-2xl"
        />

        <div className="min-w-0">
          <p className="mb-2 text-xs font-semibold uppercase">Playlist</p>

          <h1 className="truncate text-3xl font-bold lg:text-5xl">{title}</h1>

          <p className="mt-3 text-xs text-[#a7a7a7]">
            {playlist?.subtitle || "Kavya's playlist"}
          </p>

          <p className="mt-2 text-xs text-[#a7a7a7]">
            Kavya • {songs.length} songs
          </p>
        </div>
      </div>

      {/* Playlist controls */}
      <div className="mb-5 flex items-center gap-5">
        <button
          onClick={() => onPlay(songs[0])}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1ed760] text-black shadow-lg transition hover:scale-105"
          aria-label="Play playlist"
        >
          ▶
        </button>

        <button
          className="text-2xl text-[#b3b3b3] transition hover:text-white"
          aria-label="More options"
        >
          ⋯
        </button>
      </div>

      {/* Songs */}
      <div className="space-y-1">
        {songs.map((song) => (
          <SongRow
            key={song.id}
            song={song}
            playing={currentSong.id === song.id && isPlaying}
            onPlay={() => onPlay(song)}
          />
        ))}
      </div>
    </div>
  );
}

/* ===============================================================
   PLAYLIST CARD
================================================================ */

function PlaylistCard({
  playlist,
  onClick,
}: {
  playlist: Playlist;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group min-w-0 rounded-lg bg-[#181818] p-4 text-left transition hover:bg-[#282828]"
    >
      <div className="relative mb-4 aspect-square overflow-hidden rounded-md">
        <img
          src={playlist.image}
          alt={playlist.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute bottom-2 right-2 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-[#1ed760] text-black opacity-0 shadow-xl transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          ▶
        </div>
      </div>

      <p className="truncate text-sm font-semibold">{playlist.title}</p>

      <p className="mt-1 truncate text-xs text-[#a7a7a7]">
        {playlist.subtitle}
      </p>
    </button>
  );
}

/* ===============================================================
   SONG ROW
================================================================ */

function SongRow({
  song,
  playing,
  onPlay,
}: {
  song: Song;
  playing: boolean;
  onPlay: () => void;
}) {
  return (
    <button
      onClick={onPlay}
      className="group flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition hover:bg-white/10"
    >
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded">
        <img
          src={song.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition group-hover:opacity-100">
          {playing ? "Ⅱ" : "▶"}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-sm ${
            playing ? "text-[#1ed760]" : "text-white"
          }`}
        >
          {song.title}
        </p>

        <p className="truncate text-xs text-[#a7a7a7]">{song.artist}</p>
      </div>

      <span className="hidden max-w-[180px] truncate text-xs text-[#a7a7a7] md:block">
        {song.album}
      </span>

      <span className="text-xs text-[#a7a7a7]">{song.duration}</span>
    </button>
  );
}
