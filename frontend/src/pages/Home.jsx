import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SAMPLE_SONGS = [
  { id: 1, title: 'Hotel California', artist: 'Eagles', key: 'Bm', chords: 'Bm F# A E G D Em F#' },
  { id: 2, title: 'Wonderwall',       artist: 'Oasis',  key: 'Em', chords: 'Em7 G Dsus4 A7sus4' },
  { id: 3, title: 'Stairway to Heaven', artist: 'Led Zeppelin', key: 'Am', chords: 'Am Am/G Am/F# Fmaj7 G Am' },
  { id: 4, title: 'Smells Like Teen Spirit', artist: 'Nirvana', key: 'Fm', chords: 'F5 Bb5 Ab5 Db5' },
  { id: 5, title: 'Blackbird',        artist: 'The Beatles', key: 'G', chords: 'G Am7 G/B G' },
  { id: 6, title: 'Wish You Were Here', artist: 'Pink Floyd', key: 'Em', chords: 'Em G Em G Em A Em A G' },
];

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch]         = useState('');
  const [selected, setSelected]     = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const filtered = SAMPLE_SONGS.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen" style={{ background: 'radial-gradient(ellipse at 30% 0%, rgba(124,58,237,0.12) 0%, #0f0f14 55%)' }}>

      {/* ── Navbar ── */}
      <nav className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between"
           style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl"
               style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
            🎸
          </div>
          <span className="font-bold text-lg gradient-text">LyricsChords</span>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <span className="text-xs text-slate-500 mr-2">Signed in</span>
              <button onClick={logout} className="btn-secondary text-sm px-4 py-2">Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="btn-secondary text-sm px-4 py-2">Sign In</button>
              </Link>
              <Link to="/register">
                <button className="btn-primary text-sm px-4 py-2">Get Started</button>
              </Link>
            </>
          )}
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-12">

        {/* ── Hero ── */}
        <div className="text-center mb-14 fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium text-violet-300 mb-6"
               style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)' }}>
            🎵 Browse · Learn · Play
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 leading-tight">
            <span className="gradient-text">Lyrics &amp; Chords</span>
            <br/>
            <span className="text-slate-100">at your fingertips</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Browse thousands of songs with full lyrics, chord diagrams, and auto-scroll for hands-free playing.
          </p>
        </div>

        {/* ── Search ── */}
        <div className="relative max-w-xl mx-auto mb-12 fade-in-delay">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
          <input
            id="song-search"
            type="text"
            className="input-field pl-11 py-4 text-base"
            placeholder="Search songs or artists…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* ── Song Grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {filtered.map((song, i) => (
            <button
              key={song.id}
              id={`song-card-${song.id}`}
              onClick={() => setSelected(selected?.id === song.id ? null : song)}
              className="card p-5 text-left"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                     style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(219,39,119,0.3))',
                              border: '1px solid rgba(124,58,237,0.2)' }}>
                  🎵
                </div>
                <span className="text-xs text-violet-400 font-mono bg-violet-900/20 px-2 py-1 rounded-md">
                  Key: {song.key}
                </span>
              </div>
              <h3 className="font-semibold text-slate-100 text-base mb-1 leading-snug">{song.title}</h3>
              <p className="text-sm text-slate-500 mb-3">{song.artist}</p>
              <p className="text-xs text-violet-300 font-mono opacity-70 truncate">{song.chords}</p>
            </button>
          ))}
        </div>

        {/* ── Song Detail Panel ── */}
        {selected && (
          <div className="glass rounded-2xl p-7 mb-10 fade-in"
               style={{ border: '1px solid rgba(124,58,237,0.25)' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-100">{selected.title}</h2>
                <p className="text-violet-400">{selected.artist}</p>
              </div>
              <button onClick={() => setSelected(null)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-white/10 transition-all">
                ✕
              </button>
            </div>
            <div className="mb-5">
              <p className="text-xs uppercase tracking-wider text-slate-600 mb-2">Chord Progression</p>
              <div className="flex flex-wrap gap-2">
                {selected.chords.split(' ').map((chord, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg text-sm font-mono font-semibold text-violet-200"
                        style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.3)' }}>
                    {chord}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-xl p-5" style={{ background: 'rgba(0,0,0,0.3)' }}>
              <p className="text-xs uppercase tracking-wider text-slate-600 mb-3">Lyrics preview</p>
              <p className="text-slate-400 text-sm leading-relaxed italic">
                Full lyrics are stored in the database and loaded via the Spring Boot API.<br/>
                Sign in to access the complete song with auto-scroll and save to your playlists.
              </p>
            </div>
            {!isLoggedIn && (
              <div className="mt-4 flex gap-3">
                <Link to="/login" className="flex-1">
                  <button className="btn-primary w-full">Sign In to View Full Lyrics</button>
                </Link>
                <Link to="/register" className="flex-1">
                  <button className="btn-secondary w-full">Create Account</button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ── Stats row ── */}
        <div className="grid grid-cols-3 gap-4 mt-12">
          {[
            { label: 'Songs', value: '500+', icon: '🎵' },
            { label: 'Artists', value: '120+', icon: '🎤' },
            { label: 'Users',   value: '2K+',  icon: '👥' },
          ].map(stat => (
            <div key={stat.label} className="card p-5 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}