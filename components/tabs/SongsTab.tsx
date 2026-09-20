// @ts-nocheck
/* eslint-disable */
"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Plus,
  Trash2,
  Heart,
  Play,
  Pencil,
  Check,
  X,
  Music,
  Tv,
  Mic2,
  Disc3
} from "lucide-react";

interface SongsTabProps {
  themeClasses?: any;
  isPlayingAudio?: boolean;
  currentSong?: any;
  setVideoModalUrl?: (url: string | null) => void;
  videoModalUrl?: string | null;
}

export default function SongsTab({
  themeClasses,
  isPlayingAudio,
  currentSong,
  setVideoModalUrl,
  videoModalUrl
}: SongsTabProps) {
  const defaultSongs = [
    { id: 1, genre: "K-POP", title: "비밀번호 486", artist: "윤하", url: "https://www.youtube.com/watch?v=3g8L_8cRkY4", songType: "Original", liked: true },
    { id: 2, genre: "발라드", title: "일기예보", artist: "연초록", url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ", songType: "Cover", liked: true },
    { id: 3, genre: "K-POP", title: "만개화", artist: "안예은", url: "", songType: "none", liked: false },
    { id: 4, genre: "J-POP", title: "베텔기우스 (Betelgeuse)", artist: "Yuuri", url: "https://www.youtube.com/watch?v=cbqvxDTLMPS", songType: "Cover", liked: true },
    { id: 5, genre: "OST", title: "그대라는 시", artist: "태연", url: "", songType: "Original", liked: false },
    { id: 6, genre: "POP", title: "Love Story", artist: "Taylor Swift", url: "", songType: "Original", liked: false },
    { id: 7, genre: "K-POP", title: "사건의 지평선", artist: "윤하", url: "", songType: "Original", liked: false },
  ];

  const [songList, setSongList] = useState<any[]>([]);
  const [isSongDataLoaded, setIsSongDataLoaded] = useState(false);
  const [localModalUrl, setLocalModalUrl] = useState<string | null>(null);

  const activeModalUrl = videoModalUrl !== undefined ? videoModalUrl : localModalUrl;
  const setActiveModalUrl = setVideoModalUrl || setLocalModalUrl;

  const getGenreIcon = (genre: string) => {
    const g = (genre || "").trim().toLowerCase();
    if (g.includes("k-pop") || g.includes("kpop") || g.includes("가요")) return "🇰🇷";
    if (g.includes("j-pop") || g.includes("jpop") || g.includes("애니")) return "🇯🇵";
    if (g.includes("pop") || g.includes("팝")) return "🌎";
    if (g.includes("발라드") || g.includes("어쿠스틱")) return "🎻";
    if (g.includes("ost")) return "🎬";
    if (g.includes("힙합") || g.includes("랩")) return "🎧";
    if (g.includes("락") || g.includes("밴드") || g.includes("록")) return "🎸";
    if (g.includes("r&b") || g.includes("소울") || g.includes("재즈")) return "🎷";
    if (g.includes("인디")) return "🌿";
    if (g.includes("댄스")) return "💃";
    if (g.includes("트로트")) return "🪗";
    return "🎵";
  };

  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeModalUrl) {
        setActiveModalUrl(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalUrl]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jb_bookmark_song_list");
      setSongList(saved ? JSON.parse(saved) : defaultSongs);
      setIsSongDataLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isSongDataLoaded && typeof window !== "undefined") {
      localStorage.setItem("jb_bookmark_song_list", JSON.stringify(songList));
    }
  }, [songList, isSongDataLoaded]);

  const [editingSongId, setEditingSongId] = useState<number | null>(null);
  const [editGenre, setEditGenre] = useState("");
  const [editArtist, setEditArtist] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [editSongType, setEditSongType] = useState<"none" | "Original" | "Cover">("none");

  const startEditSong = (song: any) => {
    setEditingSongId(song.id);
    setEditGenre(song.genre || "");
    setEditArtist(song.artist || "");
    setEditTitle(song.title || "");
    setEditUrl(song.url || "");
    setEditSongType(song.songType || "none");
  };

  const cancelEditSong = () => setEditingSongId(null);

  const saveEditSong = (id: number) => {
    if (!editTitle.trim()) return;
    setSongList((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              genre: editGenre.trim() || "기타",
              artist: editArtist.trim() || "미상",
              title: editTitle.trim(),
              url: editUrl.trim(),
              songType: editSongType
            }
          : s
      )
    );
    setEditingSongId(null);
  };

  const [newGenre, setNewGenre] = useState("");
  const [newArtist, setNewArtist] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newSongType, setNewSongType] = useState<"none" | "Original" | "Cover">("none");
  const [selectedGenre, setSelectedGenre] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");

  const existingGenres = useMemo(() => {
    const set = new Set<string>();
    (songList || []).forEach((s) => {
      if (s.genre && s.genre.trim()) set.add(s.genre.trim());
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b, "ko"));
  }, [songList]);

  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newSong = {
      id: Date.now(),
      genre: newGenre.trim() || "기타",
      artist: newArtist.trim() || "미상",
      title: newTitle.trim(),
      url: newUrl.trim(),
      songType: newSongType,
      liked: false
    };
    setSongList([newSong, ...songList]);
    setNewGenre("");
    setNewArtist("");
    setNewTitle("");
    setNewUrl("");
    setNewSongType("none");
  };

  const toggleLike = (id: number) => {
    setSongList((prev) => prev.map((s) => (s.id === id ? { ...s, liked: !s.liked } : s)));
  };

  const handleDeleteSong = (id: number) => {
    setSongList((prev) => prev.filter((s) => s.id !== id));
  };

  const filteredSongs = useMemo(() => {
    return (songList || [])
      .filter((song) => {
        const matchGenre = selectedGenre === "전체" || song.genre === selectedGenre;
        const matchSearch =
          (song.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          (song.artist || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          (song.genre || "").toLowerCase().includes(searchQuery.toLowerCase());
        return matchGenre && matchSearch;
      })
      .sort((a, b) => {
        const artistCompare = (a.artist || "").localeCompare(b.artist || "", "ko");
        if (artistCompare !== 0) return artistCompare;
        return (a.title || "").localeCompare(b.title || "", "ko");
      });
  }, [songList, selectedGenre, searchQuery]);

  return (
    <div className="h-full overflow-y-auto flex flex-col gap-2.5 pr-1">
      {/* 등록 바 */}
      <form onSubmit={handleAddSong} className="border-2 border-emerald-400/90 rounded-2xl p-3 flex flex-wrap items-center gap-2 bg-emerald-50/40 backdrop-blur-[2px] shadow-sm shrink-0">
        <div className="relative">
          <input
            type="text"
            list="genre-suggestions"
            value={newGenre}
            onChange={(e) => setNewGenre(e.target.value)}
            placeholder="장르 입력"
            className="w-24 border border-emerald-200 bg-white/80 rounded-lg px-2.5 py-1.5 text-xs font-medium text-emerald-900 focus:outline-none focus:border-emerald-500 placeholder-neutral-400"
          />
          <datalist id="genre-suggestions">
            {existingGenres.map((g) => (
              <option key={g} value={g} />
            ))}
          </datalist>
        </div>

        <input
          type="text"
          value={newArtist}
          onChange={(e) => setNewArtist(e.target.value)}
          placeholder="가수 / 아티스트"
          className="w-36 border border-emerald-200 bg-white/80 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-emerald-500 placeholder-neutral-500 font-medium"
        />

        <input
          type="text"
          required
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="곡 제목 *"
          className="w-44 border border-emerald-200 bg-white/80 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-emerald-500 placeholder-neutral-500 font-medium"
        />

        <input
          type="text"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="유튜브 링크"
          className="flex-1 min-w-[150px] border border-emerald-200 bg-white/80 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-emerald-500 placeholder-neutral-500 font-medium"
        />

        <select
          value={newSongType}
          onChange={(e) => setNewSongType(e.target.value as "none" | "Original" | "Cover")}
          className={`w-28 border rounded-lg px-2 py-1.5 text-xs font-bold focus:outline-none cursor-pointer transition ${
            newSongType === "Cover"
              ? "border-amber-400 bg-amber-50 text-amber-800"
              : newSongType === "Original"
              ? "border-blue-300 bg-blue-50 text-blue-800"
              : "border-emerald-200 bg-white/80 text-neutral-600"
          }`}
        >
          <option value="none">선택 안함</option>
          <option value="Original">Original</option>
          <option value="Cover">Cover</option>
        </select>

        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-5 py-2 rounded-lg transition shrink-0 shadow-sm flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" /> 곡 추가
        </button>
      </form>

      {/* 검색 및 장르 필터 */}
      <div className="border-2 border-emerald-400/90 rounded-2xl p-3 bg-emerald-50/40 backdrop-blur-[2px] shadow-sm flex flex-col gap-2 shrink-0">
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="곡명, 아티스트, 장르를 검색해보세요..."
            className="w-full border border-emerald-200 bg-white/80 rounded-xl pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-emerald-500 placeholder-neutral-500 font-medium"
          />
          <Search className="w-3.5 h-3.5 text-emerald-600/70 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-1.5 text-xs flex-wrap pt-0.5">
          <span className="text-emerald-900 font-semibold text-[11px] mr-1">장르:</span>
          <button
            onClick={() => setSelectedGenre("전체")}
            className={`px-2.5 py-0.5 rounded-full border text-[11px] transition font-medium ${
              selectedGenre === "전체"
                ? "border-emerald-500 bg-emerald-200/90 text-emerald-900 font-bold shadow-xs"
                : "border-emerald-200/80 bg-white/70 text-neutral-700 hover:bg-white"
            }`}
          >
            전체
          </button>
          {existingGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-2.5 py-0.5 rounded-full border text-[11px] transition font-medium flex items-center gap-1 ${
                selectedGenre === genre
                  ? "border-emerald-500 bg-emerald-200/90 text-emerald-900 font-bold shadow-xs"
                  : "border-emerald-200/80 bg-white/70 text-neutral-700 hover:bg-white"
              }`}
            >
              <span>{getGenreIcon(genre)}</span>
              <span>{genre}</span>
            </button>
          ))}
          <span className="ml-auto text-[11px] text-emerald-800/80 font-medium">
            총 {filteredSongs.length}곡 (가수순 ➔ 제목순)
          </span>
        </div>
      </div>

      {/* 헤더 박스 */}
      <div className="border-2 border-emerald-400/90 rounded-xl px-4 py-2.5 bg-emerald-100/60 backdrop-blur-[2px] shadow-sm shrink-0">
        <div className="grid grid-cols-12 gap-2 text-xs font-extrabold text-emerald-900 items-center">
          <span className="col-span-2 flex items-center justify-center gap-1 text-center">🏷️ 장르</span>
          <span className="col-span-4 flex items-center justify-center gap-1 text-center">🎤 가수 / 아티스트</span>
          <span className="col-span-3 flex items-center justify-center gap-1 text-center">🎵 곡명</span>
          <span className="col-span-1 flex items-center justify-center gap-1 text-center">🎬 영상</span>
          <span className="col-span-2 flex items-center justify-center text-center">관리</span>
        </div>
      </div>

      {/* 리스트 */}
      <div className="flex flex-col gap-2">
        {filteredSongs.map((song) => {
          const isPlayingThis = isPlayingAudio && currentSong?.id === song.id;
          const isEditing = editingSongId === song.id;
          const isCover = song.songType === "Cover";
          const isOriginal = song.songType === "Original";
          const hasUrl = Boolean(song.url && getYouTubeId(song.url));
          const genreIcon = getGenreIcon(song.genre);

          if (isEditing) {
            return (
              <div
                key={`edit-${song.id}`}
                className="p-3 rounded-2xl border-2 border-emerald-500 bg-emerald-50/90 shadow-md flex flex-wrap items-center gap-2"
              >
                <input
                  type="text"
                  value={editGenre}
                  onChange={(e) => setEditGenre(e.target.value)}
                  placeholder="장르"
                  className="w-24 border border-emerald-300 bg-white rounded-lg px-2 py-1.5 text-xs font-medium text-emerald-900 focus:outline-none focus:border-emerald-600"
                />
                <input
                  type="text"
                  value={editArtist}
                  onChange={(e) => setEditArtist(e.target.value)}
                  placeholder="가수"
                  className="w-32 border border-emerald-300 bg-white rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-emerald-600 font-medium"
                />
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="곡 제목"
                  className="w-44 border border-emerald-300 bg-white rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-emerald-600 font-bold"
                />
                <input
                  type="text"
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
                  placeholder="유튜브 링크"
                  className="flex-1 min-w-[140px] border border-emerald-300 bg-white rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-emerald-600 font-medium"
                />
                <select
                  value={editSongType}
                  onChange={(e) => setEditSongType(e.target.value as "none" | "Original" | "Cover")}
                  className="w-24 border border-emerald-300 bg-white rounded-lg px-2 py-1.5 text-xs font-bold focus:outline-none cursor-pointer"
                >
                  <option value="none">선택 안함</option>
                  <option value="Original">Original</option>
                  <option value="Cover">Cover</option>
                </select>
                <div className="flex items-center gap-1 shrink-0 ml-auto">
                  <button
                    onClick={() => saveEditSong(song.id)}
                    title="수정 저장"
                    className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition"
                  >
                    <Check className="w-3.5 h-3.5" /> 저장
                  </button>
                  <button
                    onClick={cancelEditSong}
                    title="취소"
                    className="p-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-600 text-xs flex items-center gap-1 shadow-sm transition"
                  >
                    <X className="w-3.5 h-3.5" /> 취소
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div
              key={song.id}
              className={`grid grid-cols-12 gap-2 items-center text-xs p-3 rounded-2xl border-2 transition shadow-sm ${
                isPlayingThis
                  ? "bg-emerald-100/90 border-emerald-500 ring-2 ring-emerald-300"
                  : "bg-emerald-50/40 border-emerald-400/90 hover:border-emerald-500 hover:bg-emerald-50/70"
              }`}
            >
              <div className="col-span-2 flex justify-center">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-100/90 border border-emerald-200 text-emerald-900 text-[11px] font-bold text-center flex items-center gap-1 shadow-2xs">
                  <span>{genreIcon}</span>
                  <span>{song.genre}</span>
                </span>
              </div>

              <div className="col-span-4 text-neutral-800 truncate font-bold text-[13px] text-center px-1">
                {song.artist}
              </div>

              <div className="col-span-3 flex items-center justify-center gap-2 font-bold text-neutral-900 px-1 overflow-hidden">
                <Music className={`w-3.5 h-3.5 shrink-0 ${isPlayingThis ? "text-emerald-600 animate-pulse" : "text-emerald-500"}`} />
                <span className="truncate text-sm">{song.title}</span>
                {isCover && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-300 shadow-xs shrink-0">
                    <Mic2 className="w-2.5 h-2.5" />
                    <span>Cover</span>
                  </span>
                )}
                {isOriginal && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-800 border border-blue-300 shadow-xs shrink-0">
                    <Disc3 className="w-2.5 h-2.5" />
                    <span>Original</span>
                  </span>
                )}
              </div>

              <div className="col-span-1 flex items-center justify-center">
                {hasUrl ? (
                  <button
                    onClick={() => setActiveModalUrl(song.url)}
                    className="px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1 shadow-xs transition active:scale-95"
                    title="내부 창에서 영상 시청"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>재생</span>
                  </button>
                ) : (
                  <span className="text-[10px] text-neutral-400 font-medium">-</span>
                )}
              </div>

              <div className="col-span-2 flex items-center justify-center gap-1.5">
                <button
                  onClick={() => startEditSong(song)}
                  title="곡 내용 수정"
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-emerald-700 hover:bg-white transition"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => toggleLike(song.id)}
                  title={song.liked ? "플레이리스트에서 제거" : "플레이리스트에 담기"}
                  className={`p-1.5 rounded-lg transition ${
                    song.liked ? "text-rose-500 fill-rose-500 hover:scale-110 bg-rose-50" : "text-neutral-400 hover:text-rose-500 hover:bg-white"
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${song.liked ? "fill-rose-500" : ""}`} />
                </button>
                <button
                  onClick={() => handleDeleteSong(song.id)}
                  title="노래 삭제"
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-500 hover:bg-white transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredSongs.length === 0 && (
          <div className="border border-dashed border-emerald-300 rounded-2xl p-12 text-center text-xs font-medium text-emerald-800/70 bg-emerald-50/20">
            등록되었거나 조건에 맞는 노래가 없습니다.
          </div>
        )}
      </div>

      {/* 유튜브 영상 팝업 모달 */}
      {activeModalUrl && (
        <div 
          className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setActiveModalUrl(null)}
        >
          <div 
            className="bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-neutral-700 w-full max-w-4xl max-h-[720px] flex flex-col relative animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-2 bg-neutral-900/90 border-b border-neutral-800 text-white shrink-0">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-300">
                <Tv className="w-4 h-4 text-emerald-400" />
                <span>영상 플레이어</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded-md">ESC로 닫기</span>
                <button onClick={() => setActiveModalUrl(null)} className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(activeModalUrl)}?autoplay=1`}
                title="YouTube video player"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}