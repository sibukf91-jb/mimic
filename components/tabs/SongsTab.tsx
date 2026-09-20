// @ts-nocheck
/* eslint-disable */
"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Trash2,
  ExternalLink,
  Pencil,
  Check,
  X,
  Heart,
  Music2
} from "lucide-react";

interface SongsTabProps {
  themeClasses?: any;
  isPlayingAudio?: boolean;
  currentSong?: any;
  songList: any[];
  setSongList: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function SongsTab({
  themeClasses,
  isPlayingAudio,
  currentSong,
  songList = [],
  setSongList
}: SongsTabProps) {
  const [newSongCategory, setNewSongCategory] = useState("팝송");
  const [newSongTitle, setNewSongTitle] = useState("");
  const [newSongArtist, setNewSongArtist] = useState("");
  const [newSongUrl, setNewSongUrl] = useState("");
  const [newSongTags, setNewSongTags] = useState("");

  const [selectedSongCategory, setSelectedSongCategory] = useState("전체");
  const [songSearchQuery, setSongSearchQuery] = useState("");

  const [editingSongId, setEditingSongId] = useState<number | null>(null);
  const [editSongCategory, setEditSongCategory] = useState("");
  const [editSongTitle, setEditSongTitle] = useState("");
  const [editSongArtist, setEditSongArtist] = useState("");
  const [editSongUrl, setEditSongUrl] = useState("");
  const [editSongTags, setEditSongTags] = useState("");

  const existingCategories = useMemo(() => {
    const set = new Set<string>();
    (songList || []).forEach((s) => {
      if (s?.category && s.category.trim()) set.add(s.category.trim());
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b, "ko"));
  }, [songList]);

  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSongTitle.trim() || !newSongUrl.trim()) return;

    let formattedUrl = newSongUrl.trim();
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = "https://" + formattedUrl;
    }

    const tagsArray = newSongTags
      .split(/[,#\s]+/)
      .map((t) => t.trim())
      .filter(Boolean);

    const newSong = {
      id: Date.now(),
      category: newSongCategory.trim() || "기타",
      title: newSongTitle.trim(),
      artist: newSongArtist.trim() || "Various Artists",
      url: formattedUrl,
      tags: tagsArray,
      liked: true // 신규 추가 시 바로 플레이리스트에 담김
    };

    setSongList([newSong, ...(songList || [])]);
    setNewSongTitle("");
    setNewSongArtist("");
    setNewSongUrl("");
    setNewSongTags("");
  };

  const startEditSong = (song: any) => {
    setEditingSongId(song.id);
    setEditSongCategory(song.category || "팝송");
    setEditSongTitle(song.title || "");
    setEditSongArtist(song.artist || "");
    setEditSongUrl(song.url || "");
    setEditSongTags(Array.isArray(song.tags) ? song.tags.join(" ") : "");
  };

  const cancelEditSong = () => setEditingSongId(null);

  const saveEditSong = (id: number) => {
    if (!editSongTitle.trim() || !editSongUrl.trim()) return;

    let formattedUrl = editSongUrl.trim();
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = "https://" + formattedUrl;
    }

    const tagsArray = editSongTags
      .split(/[,#\s]+/)
      .map((t) => t.trim())
      .filter(Boolean);

    setSongList((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              category: editSongCategory.trim() || "기타",
              title: editSongTitle.trim(),
              artist: editSongArtist.trim() || "Various Artists",
              url: formattedUrl,
              tags: tagsArray
            }
          : s
      )
    );
    setEditingSongId(null);
  };

  const handleDeleteSong = (id: number) => {
    setSongList((prev) => prev.filter((s) => s.id !== id));
  };

  // 하트 토글 시 즉시 상태 변경 및 localStorage 저장 트리거
  const handleToggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSongList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, liked: !s.liked } : s))
    );
  };

  const filteredSongs = useMemo(() => {
    return (songList || []).filter((s) => {
      if (!s) return false;
      const matchCategory = selectedSongCategory === "전체" || s.category === selectedSongCategory;
      const matchSearch =
        (s.title || "").toLowerCase().includes(songSearchQuery.toLowerCase()) ||
        (s.artist || "").toLowerCase().includes(songSearchQuery.toLowerCase()) ||
        (s.tags || []).some((t: string) => (t || "").toLowerCase().includes(songSearchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [songList, selectedSongCategory, songSearchQuery]);

  return (
    <div className="h-full overflow-y-auto flex flex-col gap-2.5 pr-1">
      {/* 곡 등록 바 */}
      <form onSubmit={handleAddSong} className="border-2 border-emerald-400/90 rounded-2xl p-3 flex flex-wrap items-center gap-2 bg-emerald-50/40 backdrop-blur-[2px] shadow-sm shrink-0">
        <input
          type="text"
          list="song-category-suggestions"
          value={newSongCategory}
          onChange={(e) => setNewSongCategory(e.target.value)}
          placeholder="분류 (예: 팝송)"
          className="w-24 border border-emerald-300 bg-white/90 rounded-lg px-2.5 py-1.5 text-xs font-medium text-emerald-950 focus:outline-none"
        />
        <datalist id="song-category-suggestions">
          <option value="팝송" />
          <option value="발라드" />
          <option value="K-POP" />
          <option value="J-POP" />
          <option value="OST" />
          <option value="재즈" />
          <option value="락/밴드" />
          {existingCategories.map((c) => (<option key={c} value={c} />))}
        </datalist>

        <input
          type="text"
          required
          value={newSongTitle}
          onChange={(e) => setNewSongTitle(e.target.value)}
          placeholder="노래 제목 *"
          className="flex-1 min-w-[140px] border border-emerald-300 bg-white/90 rounded-lg px-3 py-1.5 text-xs focus:outline-none placeholder-neutral-500 font-bold"
        />

        <input
          type="text"
          value={newSongArtist}
          onChange={(e) => setNewSongArtist(e.target.value)}
          placeholder="가수 / 아티스트"
          className="w-40 border border-emerald-300 bg-white/90 rounded-lg px-3 py-1.5 text-xs focus:outline-none placeholder-neutral-500 font-medium"
        />

        <input
          type="text"
          required
          value={newSongUrl}
          onChange={(e) => setNewSongUrl(e.target.value)}
          placeholder="유튜브 링크 URL *"
          className="w-48 border border-emerald-300 bg-white/90 rounded-lg px-3 py-1.5 text-xs focus:outline-none placeholder-neutral-500 font-medium"
        />

        <input
          type="text"
          value={newSongTags}
          onChange={(e) => setNewSongTags(e.target.value)}
          placeholder="태그 (#드라이브 #새벽)"
          className="w-40 border border-emerald-300 bg-white/90 rounded-lg px-3 py-1.5 text-xs focus:outline-none placeholder-neutral-500 font-medium"
        />

        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2 rounded-lg transition shrink-0 shadow-sm flex items-center gap-1 ml-auto"
        >
          <Plus className="w-3.5 h-3.5" /> 추가
        </button>
      </form>

      {/* 검색 및 분류 필터 */}
      <div className="border-2 border-emerald-400/90 rounded-2xl p-3 bg-emerald-50/40 backdrop-blur-[2px] shadow-sm flex flex-col gap-2 shrink-0">
        <div className="relative w-full">
          <input
            type="text"
            value={songSearchQuery}
            onChange={(e) => setSongSearchQuery(e.target.value)}
            placeholder="곡명, 아티스트, 태그를 검색해보세요..."
            className="w-full border border-emerald-300 bg-white/90 rounded-xl pl-9 pr-3 py-1.5 text-xs font-medium"
          />
          <Search className="w-3.5 h-3.5 text-emerald-700/70 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-1.5 text-xs flex-wrap pt-0.5">
          <span className="text-emerald-950 font-semibold text-[11px] mr-1">분류:</span>
          <button
            onClick={() => setSelectedSongCategory("전체")}
            className={`px-2.5 py-0.5 rounded-full border text-[11px] transition font-medium ${
              selectedSongCategory === "전체"
                ? "border-emerald-500 bg-emerald-100 text-emerald-950 font-bold shadow-2xs"
                : "border-emerald-300/80 bg-white/70 text-neutral-700 hover:bg-white"
            }`}
          >
            전체
          </button>
          {existingCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedSongCategory(cat)}
              className={`px-2.5 py-0.5 rounded-full border text-[11px] transition font-medium ${
                selectedSongCategory === cat
                  ? "border-emerald-500 bg-emerald-100 text-emerald-950 font-bold shadow-2xs"
                  : "border-emerald-300/80 bg-white/70 text-neutral-700 hover:bg-white"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-emerald-800/80 font-bold">
            총 {filteredSongs.length}개의 노래
          </span>
        </div>
      </div>

      {/* 헤더 박스 */}
      <div className="border-2 border-emerald-400/90 rounded-xl px-3 py-2.5 bg-emerald-100/70 backdrop-blur-[2px] shadow-sm shrink-0">
        <div className="grid grid-cols-12 gap-1 text-[11px] font-extrabold text-emerald-950 items-center text-center">
          <span className="col-span-1">담기</span>
          <span className="col-span-2">분류</span>
          <span className="col-span-3">노래 제목</span>
          <span className="col-span-2">아티스트</span>
          <span className="col-span-1">링크</span>
          <span className="col-span-2">태그</span>
          <span className="col-span-1">관리</span>
        </div>
      </div>

      {/* 리스트 */}
      <div className="flex flex-col gap-2">
        {filteredSongs.map((song) => {
          const isEditing = editingSongId === song.id;
          const isCurrentTrack = currentSong && currentSong.id === song.id;

          if (isEditing) {
            return (
              <div
                key={`edit-${song.id}`}
                className="grid grid-cols-12 gap-1 items-center p-2.5 rounded-2xl border-2 border-emerald-400 bg-emerald-50/90 shadow-md text-center"
              >
                <div className="col-span-1 flex justify-center">
                  <Heart className={`w-4 h-4 ${song.liked ? "text-rose-500 fill-rose-500" : "text-neutral-300"}`} />
                </div>
                <div className="col-span-2 px-1">
                  <input type="text" value={editSongCategory} onChange={(e) => setEditSongCategory(e.target.value)} placeholder="분류" className="w-full border border-emerald-300 bg-white rounded px-1.5 py-1 text-[11px] font-bold" />
                </div>
                <div className="col-span-3 px-1">
                  <input type="text" required value={editSongTitle} onChange={(e) => setEditSongTitle(e.target.value)} placeholder="노래 제목" className="w-full border border-emerald-300 bg-white rounded px-2 py-1 text-[11px] font-bold" />
                </div>
                <div className="col-span-2 px-1">
                  <input type="text" value={editSongArtist} onChange={(e) => setEditSongArtist(e.target.value)} placeholder="아티스트" className="w-full border border-emerald-300 bg-white rounded px-1.5 py-1 text-[11px]" />
                </div>
                <div className="col-span-1 px-0.5">
                  <input type="text" value={editSongUrl} onChange={(e) => setEditSongUrl(e.target.value)} placeholder="링크URL" className="w-full border border-emerald-300 bg-white rounded px-1 py-1 text-[10px]" />
                </div>
                <div className="col-span-2 px-1">
                  <input type="text" value={editSongTags} onChange={(e) => setEditSongTags(e.target.value)} placeholder="태그" className="w-full border border-emerald-300 bg-white rounded px-1.5 py-1 text-[11px]" />
                </div>
                <div className="col-span-1 flex items-center justify-center gap-1">
                  <button onClick={() => saveEditSong(song.id)} title="저장" className="p-1 rounded bg-emerald-600 text-white font-bold text-[10px]"><Check className="w-3 h-3" /></button>
                  <button onClick={cancelEditSong} title="취소" className="p-1 rounded border border-neutral-300 bg-white text-neutral-600 text-[10px]"><X className="w-3 h-3" /></button>
                </div>
              </div>
            );
          }

          return (
            <div
              key={song.id}
              className={`grid grid-cols-12 gap-1 items-center text-[11px] p-2.5 rounded-2xl border-2 transition shadow-2xs text-center ${
                isCurrentTrack
                  ? "border-emerald-500 bg-emerald-100/90 text-emerald-950 font-bold"
                  : "border-emerald-400/90 bg-emerald-50/40 hover:bg-emerald-50/70 text-neutral-900"
              }`}
            >
              <div className="col-span-1 flex justify-center">
                <button
                  onClick={(e) => handleToggleLike(song.id, e)}
                  title={song.liked ? "플레이리스트에서 제거" : "플레이리스트에 담기"}
                  className="p-1 transition transform active:scale-125"
                >
                  <Heart
                    className={`w-4 h-4 transition ${
                      song.liked
                        ? "text-rose-500 fill-rose-500 hover:opacity-80"
                        : "text-neutral-400 hover:text-rose-400"
                    }`}
                  />
                </button>
              </div>

              <div className="col-span-2 flex justify-center">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100/90 text-emerald-950 border border-emerald-300 font-bold shadow-2xs">
                  {song.category}
                </span>
              </div>

              <div className="col-span-3 text-neutral-900 font-black truncate px-1 text-center" title={song.title}>
                {song.title}
              </div>

              <div className="col-span-2 text-neutral-700 font-semibold truncate px-1" title={song.artist}>
                {song.artist}
              </div>

              <div className="col-span-1 flex justify-center">
                <a
                  href={song.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] flex items-center gap-0.5 shadow-2xs transition active:scale-95"
                  title="유튜브에서 열기"
                >
                  <ExternalLink className="w-2.5 h-2.5" />
                  <span>듣기</span>
                </a>
              </div>

              <div className="col-span-2 flex items-center justify-center gap-1 flex-wrap px-1">
                {(song.tags || []).map((t: string, idx: number) => (
                  <span key={idx} className="text-[10px] text-emerald-900/90 bg-emerald-100 border border-emerald-300 px-1.5 py-0.2 rounded-md font-medium">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="col-span-1 flex items-center justify-center gap-1">
                <button onClick={() => startEditSong(song)} title="수정" className="p-1 rounded text-neutral-500 hover:text-emerald-900 hover:bg-white transition"><Pencil className="w-3 h-3" /></button>
                <button onClick={() => handleDeleteSong(song.id)} title="삭제" className="p-1 rounded text-neutral-500 hover:text-rose-600 hover:bg-white transition"><Trash2 className="w-3 h-3" /></button>
              </div>
            </div>
          );
        })}

        {filteredSongs.length === 0 && (
          <div className="border-2 border-dashed border-emerald-300 rounded-2xl p-12 text-center text-xs font-medium text-emerald-800/70 bg-emerald-50/20">
            등록된 노래가 없습니다. 유튜브 음악 링크를 추가해보세요!
          </div>
        )}
      </div>
    </div>
  );
}