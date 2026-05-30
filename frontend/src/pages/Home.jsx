import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch]         = useState('');
  const [songs, setSongs]             = useState([]);
  const [selected, setSelected]     = useState(null);
  const [detail, setDetail]         = useState(null);
  const [loading, setLoading]       = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError]           = useState('');

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');

    api.get('/api/songs', { params: search ? { search } : {} })
      .then(res => {
        if (!cancelled) setSongs(res.data);
      })
      .catch(() => {
        if (!cancelled) setError('Could not load songs. Is the backend running?');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [search]);

  useEffect(() => {
    if (!selected || !isLoggedIn) {
      setDetail(null);
      return;
    }

    let cancelled = false;
    setDetailLoading(true);

    api.get(`/api/songs/${selected.id}`)
      .then(res => {
        if (!cancelled) setDetail(res.data);
      })
      .catch(() => {
        if (!cancelled) setDetail(null);
      })
      .finally(() => {
        if (!cancelled) setDetailLoading(false);
      });

    return () => { cancelled = true; };
  }, [selected, isLoggedIn]);

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setDetail(null);
  };

  const handleSelect = (song) => {
    setSelected(prev => (prev?.id === song.id ? null : song));
  };

  const firstChord = (chords) => (chords ? chords.split(' ')[0] : '—');

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
        {error && (
          <div className="mb-6 px-4 py-3 rounded-lg text-sm text-red-300 text-center"
               style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-center text-slate-500 mb-10">Loading songs…</p>
        ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {songs.map((song, i) => (
            <button
              key={song.id}
              id={`song-card-${song.id}`}
              onClick={() => handleSelect(song)}
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
                  Key: {firstChord(song.chords)}
                </span>
              </div>
              <h3 className="font-semibold text-slate-100 text-base mb-1 leading-snug">{song.title}</h3>
              <p className="text-sm text-slate-500 mb-3">{song.artistName}</p>
              <p className="text-xs text-violet-300 font-mono opacity-70 truncate">{song.chords}</p>
            </button>
          ))}
        </div>
        )}

        {!loading && songs.length === 0 && !error && (
          <p className="text-center text-slate-500 mb-10">No songs match your search.</p>
        )}

        {/* ── Song Detail Panel ── */}
        {selected && (
          <div className="glass rounded-2xl p-7 mb-10 fade-in"
               style={{ border: '1px solid rgba(124,58,237,0.25)' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-100">{selected.title}</h2>
                <p className="text-violet-400">{selected.artistName}</p>
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
              <p className="text-xs uppercase tracking-wider text-slate-600 mb-3">Lyrics</p>
              {isLoggedIn ? (
                detailLoading ? (
                  <p className="text-slate-500 text-sm">Loading lyrics…</p>
                ) : detail ? (
                  <pre className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">{detail.lyrics}</pre>
                ) : (
                  <p className="text-slate-500 text-sm">Could not load lyrics.</p>
                )
              ) : (
                <p className="text-slate-400 text-sm leading-relaxed italic">
                  Sign in to view full lyrics and save songs to your favorites.
                </p>
              )}
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
            { label: 'Songs', value: loading ? '…' : String(songs.length), icon: '🎵' },
            { label: 'Artists', value: loading ? '…' : String(new Set(songs.map(s => s.artistName)).size), icon: '🎤' },
            { label: 'Signed in', value: isLoggedIn ? 'Yes' : 'No', icon: '👤' },
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