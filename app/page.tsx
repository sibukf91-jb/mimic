// @ts-nocheck
/* eslint-disable */
"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Lock,
  Unlock,
  KeyRound,
  ArrowRight,
  Search,
  Heart,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Minus,
  Bell,
  BellOff,
  Trash2,
  ExternalLink,
  Music,
  SkipBack,
  SkipForward,
  Repeat,
  Repeat1,
  Volume2,
  VolumeX,
  Mic2,
  Disc3,
  Pencil,
  Check,
  X
} from "lucide-react";

export default function Home() {
  const [pin, setPin] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const CORRECT_PIN = "1234";
  const [currentTab, setCurrentTab] = useState("songs");

  // ================= 노래책 데이터 (새로고침 시 영구 보존 LocalStorage 연동) =================
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
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // 브라우저 마운트 시 LocalStorage에서 불러오기
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jb_bookmark_song_list");
      if (saved) {
        try {
          setSongList(JSON.parse(saved));
        } catch (e) {
          setSongList(defaultSongs);
        }
      } else {
        setSongList(defaultSongs);
      }
      setIsDataLoaded(true);
    }
  }, []);

  // 노래 목록 변경 시 LocalStorage에 영구 저장
  useEffect(() => {
    if (isDataLoaded && typeof window !== "undefined") {
      localStorage.setItem("jb_bookmark_song_list", JSON.stringify(songList));
    }
  }, [songList, isDataLoaded]);

  // ================= 노래 수정 상태 =================
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

  const cancelEditSong = () => {
    setEditingSongId(null);
  };

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

  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // ================= 플레이리스트 재생, 게이지 & 볼륨 =================
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [repeatMode, setRepeatMode] = useState<"none" | "all" | "one">("all");
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [durationSec, setDurationSec] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);

  const playerRef = useRef<any>(null);
  const repeatModeRef = useRef(repeatMode);
  repeatModeRef.current = repeatMode;

  const likedSongs = songList.filter((s) => s.liked);
  const currentSong = currentPlayingIndex !== null ? likedSongs[currentPlayingIndex] : null;
  const currentVideoId = currentSong ? getYouTubeId(currentSong.url) : null;

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, []);

  useEffect(() => {
    if (!currentVideoId) {
      if (playerRef.current) playerRef.current.stopVideo();
      setIsPlayingAudio(false);
      return;
    }

    const initPlayer = () => {
      if (playerRef.current) {
        playerRef.current.loadVideoById(currentVideoId);
        playerRef.current.setVolume(isMuted ? 0 : volume);
        if (isPlayingAudio) playerRef.current.playVideo();
      } else if (window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player("hidden-yt-player", {
          height: "1",
          width: "1",
          videoId: currentVideoId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            playsinline: 1
          },
          events: {
            onReady: (event: any) => {
              event.target.setVolume(isMuted ? 0 : volume);
              if (isPlayingAudio) event.target.playVideo();
            },
            onStateChange: (event: any) => {
              if (event.data === 1) {
                setIsPlayingAudio(true);
                setDurationSec(playerRef.current.getDuration() || 0);
              } else if (event.data === 2) {
                setIsPlayingAudio(false);
              } else if (event.data === 0) {
                handleAutoNext();
              }
            }
          }
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }
  }, [currentVideoId]);

  useEffect(() => {
    let timer: any = null;
    if (isPlayingAudio) {
      timer = setInterval(() => {
        if (playerRef.current && playerRef.current.getCurrentTime) {
          const cur = playerRef.current.getCurrentTime() || 0;
          const dur = playerRef.current.getDuration() || 0;
          setCurrentTimeSec(cur);
          if (dur > 0) setDurationSec(dur);
        }
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isPlayingAudio]);

  const handleAutoNext = () => {
    const mode = repeatModeRef.current;
    if (mode === "one") {
      if (playerRef.current) {
        playerRef.current.seekTo(0);
        playerRef.current.playVideo();
      }
    } else {
      setCurrentPlayingIndex((prev) => {
        if (prev === null) return 0;
        if (prev >= likedSongs.length - 1) {
          if (mode === "all") return 0;
          setIsPlayingAudio(false);
          return prev;
        }
        return prev + 1;
      });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekToVal = Number(e.target.value);
    setCurrentTimeSec(seekToVal);
    if (playerRef.current && playerRef.current.seekTo) {
      playerRef.current.seekTo(seekToVal, true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    setIsMuted(false);
    if (playerRef.current && playerRef.current.setVolume) {
      playerRef.current.unMute();
      playerRef.current.setVolume(val);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (playerRef.current && playerRef.current.unMute) {
        playerRef.current.unMute();
        playerRef.current.setVolume(volume);
      }
    } else {
      setIsMuted(true);
      if (playerRef.current && playerRef.current.mute) {
        playerRef.current.mute();
      }
    }
  };

  const handleSelectSong = (index: number) => {
    setCurrentPlayingIndex(index);
    setIsPlayingAudio(true);
    setCurrentTimeSec(0);
  };

  const handlePrevSong = () => {
    if (likedSongs.length === 0) return;
    if (currentPlayingIndex === null || currentPlayingIndex === 0) {
      setCurrentPlayingIndex(likedSongs.length - 1);
    } else {
      setCurrentPlayingIndex(currentPlayingIndex - 1);
    }
    setIsPlayingAudio(true);
    setCurrentTimeSec(0);
  };

  const handleNextSong = () => {
    if (likedSongs.length === 0) return;
    if (repeatMode === "one") {
      if (playerRef.current) {
        playerRef.current.seekTo(0);
        playerRef.current.playVideo();
      }
      return;
    }
    if (currentPlayingIndex === null || currentPlayingIndex >= likedSongs.length - 1) {
      if (repeatMode === "all") setCurrentPlayingIndex(0);
      else setIsPlayingAudio(false);
    } else {
      setCurrentPlayingIndex(currentPlayingIndex + 1);
    }
    setIsPlayingAudio(true);
    setCurrentTimeSec(0);
  };

  const togglePlayAudio = () => {
    if (likedSongs.length === 0) return;
    if (currentPlayingIndex === null) {
      setCurrentPlayingIndex(0);
      setIsPlayingAudio(true);
    } else {
      if (isPlayingAudio) {
        if (playerRef.current && playerRef.current.pauseVideo) playerRef.current.pauseVideo();
        setIsPlayingAudio(false);
      } else {
        if (playerRef.current && playerRef.current.playVideo) playerRef.current.playVideo();
        setIsPlayingAudio(true);
      }
    }
  };

  const cycleRepeatMode = () => {
    if (repeatMode === "all") setRepeatMode("one");
    else if (repeatMode === "one") setRepeatMode("none");
    else setRepeatMode("all");
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  // ================= 노래책 입력 폼 & 장르 동적 관리 =================
  const [newGenre, setNewGenre] = useState("");
  const [newArtist, setNewArtist] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newSongType, setNewSongType] = useState<"none" | "Original" | "Cover">("none");

  const [selectedGenre, setSelectedGenre] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");

  const existingGenres = useMemo(() => {
    const set = new Set<string>();
    songList.forEach((s) => {
      if (s.genre && s.genre.trim()) set.add(s.genre.trim());
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b, "ko"));
  }, [songList]);

  useEffect(() => {
    if (selectedGenre !== "전체" && !existingGenres.includes(selectedGenre)) {
      setSelectedGenre("전체");
    }
  }, [existingGenres, selectedGenre]);

  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const formattedGenre = newGenre.trim() || "기타";

    const newSong = {
      id: Date.now(),
      genre: formattedGenre,
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
    setSongList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, liked: !s.liked } : s))
    );
  };

  const handleDeleteSong = (id: number) => {
    setSongList((prev) => prev.filter((s) => s.id !== id));
  };

  const filteredSongs = useMemo(() => {
    return songList
      .filter((song) => {
        const matchGenre = selectedGenre === "전체" || song.genre === selectedGenre;
        const matchSearch =
          song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.genre.toLowerCase().includes(searchQuery.toLowerCase());
        return matchGenre && matchSearch;
      })
      .sort((a, b) => {
        const artistCompare = a.artist.localeCompare(b.artist, "ko");
        if (artistCompare !== 0) return artistCompare;
        return a.title.localeCompare(b.title, "ko");
      });
  }, [songList, selectedGenre, searchQuery]);

  // ================= 시계 & 타이머 =================
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [timerMinutes, setTimerMinutes] = useState(4);
  const [timeLeft, setTimeLeft] = useState(4 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isAlarmRinging, setIsAlarmRinging] = useState(false);
  const alarmIntervalRef = useRef<any>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const clockTimer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(clockTimer);
  }, []);

  const playBeep = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setIsAlarmRinging(true);
      playBeep();
      alarmIntervalRef.current = setInterval(() => playBeep(), 800);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const stopAlarm = () => {
    setIsAlarmRinging(false);
    if (alarmIntervalRef.current) {
      clearInterval(alarmIntervalRef.current);
      alarmIntervalRef.current = null;
    }
  };

  const addMinute = () => {
    if (isTimerRunning) return;
    setTimerMinutes((prev) => {
      const next = prev + 1;
      setTimeLeft(next * 60);
      return next;
    });
  };

  const subtractMinute = () => {
    if (isTimerRunning) return;
    setTimerMinutes((prev) => {
      if (prev <= 1) return 1;
      const next = prev - 1;
      setTimeLeft(next * 60);
      return next;
    });
  };

  const resetTimer = () => {
    stopAlarm();
    setIsTimerRunning(false);
    setTimeLeft(timerMinutes * 60);
  };

  const toggleTimer = () => {
    if (isAlarmRinging) {
      stopAlarm();
      return;
    }
    if (timeLeft <= 0) setTimeLeft(timerMinutes * 60);
    setIsTimerRunning(!isTimerRunning);
  };

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pin === CORRECT_PIN) {
      setErrorMsg("");
      setIsUnlocked(true);
    } else {
      setErrorMsg("비밀번호가 일치하지 않습니다.");
      setPin("");
    }
  };

  const menuItems = [
    { id: "schedule", label: "일정", icon: "📅" },
    { id: "ledger", label: "가계부", icon: "💰" },
    { id: "favorites", label: "즐겨찾기", icon: "⭐" },
    { id: "bookmarks", label: "책갈피", icon: "🔖" },
    { id: "songs", label: "노래책", icon: "🎵" },
    { id: "orders", label: "구매물품", icon: "📦" },
    { id: "cart", label: "장바구니", icon: "🛒" },
    { id: "recipes", label: "레시피", icon: "🍳" }
  ];

  if (!isUnlocked) {
    return (
      <main className="min-h-screen bg-[#0f1117] flex items-center justify-center p-4 relative select-none">
        <div className="w-full max-w-sm bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-neutral-800 border border-neutral-700 rounded-2xl flex items-center justify-center mb-6">
            <Lock className="w-7 h-7 text-emerald-400 animate-pulse" />
          </div>
          <h1 className="text-xl font-bold text-white mb-1">JB's Bookmark Space</h1>
          <p className="text-xs text-neutral-400 mb-6">보관함 입장을 위해 비밀번호를 입력해주세요</p>
          <form onSubmit={handleUnlock} className="w-full space-y-4">
            <div className="relative">
              <input
                type="password"
                maxLength={8}
                value={pin}
                autoFocus
                onChange={(e) => {
                  setPin(e.target.value);
                  if (errorMsg) setErrorMsg("");
                }}
                placeholder="비밀번호 입력"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-center text-white tracking-widest text-lg focus:outline-none focus:border-emerald-500"
              />
              <KeyRound className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
            {errorMsg && <p className="text-xs text-rose-400 font-medium">{errorMsg}</p>}
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition duration-200"
            >
              <span>입장하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>
    );
  }

  const dateString = currentTime
    ? `${currentTime.getMonth() + 1}월 ${currentTime.getDate()}일 (${["일", "월", "화", "수", "목", "금", "토"][currentTime.getDay()]})`
    : "";
  const timeString = currentTime
    ? currentTime.toLocaleTimeString("ko-KR", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : "";

  const timerMin = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const timerSec = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="min-h-screen bg-neutral-100/60 text-neutral-800 flex flex-col font-sans relative">
      {/* 배경 격자 패턴 (50% 더 희미한 은은한 격자) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px"
        }}
      />

      {/* 숨겨진 실제 YouTube IFrame */}
      <div className="fixed -top-[999px] -left-[999px] opacity-0 pointer-events-none w-1 h-1 overflow-hidden">
        <div id="hidden-yt-player" />
      </div>

      {/* ================= 상단 헤더 ================= */}
      <header className="w-full border-b border-neutral-300/70 bg-white/75 backdrop-blur-[2px] sticky top-0 z-30 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="max-w-[1720px] mx-auto px-6 py-3 flex items-center gap-5">
          <div className="w-[200px] shrink-0 flex items-center gap-1.5 overflow-hidden">
            <span className="text-lg leading-none shrink-0">🏰</span>
            <span className="text-sm font-extrabold text-neutral-900 truncate tracking-tight">
              JB's Bookmark Space
            </span>
          </div>

          <nav className="flex-1 min-w-0 flex flex-wrap items-center gap-2">
            {menuItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                    isActive
                      ? "bg-emerald-100/90 text-emerald-800 border border-emerald-300 shadow-sm"
                      : "text-neutral-700 hover:bg-white/80 hover:text-neutral-900 border border-transparent"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="w-[200px] shrink-0 flex justify-end">
            <button
              onClick={() => {
                setIsUnlocked(false);
                setPin("");
              }}
              className="flex items-center gap-1.5 border border-red-200 bg-red-50/80 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-xs font-medium transition"
            >
              <span>🔒 잠그고 나가기</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= 본문 3단 레이아웃 ================= */}
      <main className="max-w-[1720px] mx-auto w-full px-6 py-6 flex flex-col lg:flex-row gap-5 items-start flex-1 relative z-10">
        
        {/* [1] 좌측 배너 (sticky 고정 추적) */}
        <aside className="w-full lg:w-[200px] h-[760px] shrink-0 sticky top-[73px]">
          <div className="border border-dashed border-emerald-400/90 rounded-2xl h-full flex flex-col items-center justify-center p-4 text-center bg-emerald-50/30 backdrop-blur-[2px] shadow-sm">
            <span className="text-xl mb-1">🖼️</span>
            <span className="text-xs font-semibold text-emerald-700">좌측 배너 영역</span>
          </div>
        </aside>

        {/* [2] 중앙 영역 (스크롤 확장) */}
        <section className="flex-1 w-full flex flex-col gap-2.5 min-w-0 pb-16">
          
          {/* [박스 1] 상단 노래 등록 바 */}
          <form onSubmit={handleAddSong} className="border border-emerald-400 rounded-2xl p-3 flex flex-wrap items-center gap-2 bg-emerald-50/40 backdrop-blur-[2px] shadow-sm shrink-0">
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

          {/* [박스 2] 독립된 검색창 & 장르 필터 박스 */}
          <div className="border border-emerald-400 rounded-2xl p-3 bg-emerald-50/40 backdrop-blur-[2px] shadow-sm flex flex-col gap-2 shrink-0">
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
                  className={`px-2.5 py-0.5 rounded-full border text-[11px] transition font-medium ${
                    selectedGenre === genre
                      ? "border-emerald-500 bg-emerald-200/90 text-emerald-900 font-bold shadow-xs"
                      : "border-emerald-200/80 bg-white/70 text-neutral-700 hover:bg-white"
                  }`}
                >
                  {genre}
                </button>
              ))}
              <span className="ml-auto text-[11px] text-emerald-800/80 font-medium">
                총 {filteredSongs.length}곡 (가수순 ➔ 제목순)
              </span>
            </div>
          </div>

          {/* [박스 3] 헤더 전용 박스 (2 : 4 : 4 : 2 대칭 분할로 좌우 끝 여백 완벽 균등) */}
          <div className="border border-emerald-400 rounded-xl px-4 py-2.5 bg-emerald-100/60 backdrop-blur-[2px] shadow-sm shrink-0">
            <div className="grid grid-cols-12 gap-2 text-xs font-extrabold text-emerald-900 items-center">
              <span className="col-span-2 flex items-center justify-center gap-1 text-center">🏷️ 장르</span>
              <span className="col-span-4 flex items-center justify-center gap-1 text-center">🎤 가수 / 아티스트</span>
              <span className="col-span-4 flex items-center justify-center gap-1 text-center">🎵 곡명</span>
              <span className="col-span-2 flex items-center justify-center text-center">관리</span>
            </div>
          </div>

          {/* [박스 4] 추가된 곡 목록 (헤더 박스와 동일한 2:4:4:2 대칭 구조로 좌우 여백 정밀 일치) */}
          <div className="flex flex-col gap-2">
            {filteredSongs.map((song) => {
              const isPlayingThis = isPlayingAudio && currentSong?.id === song.id;
              const isEditing = editingSongId === song.id;
              const isCover = song.songType === "Cover";
              const isOriginal = song.songType === "Original";

              // [A] 인라인 편집 모드
              if (isEditing) {
                return (
                  <div
                    key={`edit-${song.id}`}
                    className="p-3 rounded-2xl border-2 border-emerald-500 bg-emerald-50/90 shadow-md flex flex-wrap items-center gap-2"
                  >
                    <div className="relative">
                      <input
                        type="text"
                        list="genre-suggestions"
                        value={editGenre}
                        onChange={(e) => setEditGenre(e.target.value)}
                        placeholder="장르"
                        className="w-24 border border-emerald-300 bg-white rounded-lg px-2 py-1.5 text-xs font-medium text-emerald-900 focus:outline-none focus:border-emerald-600"
                      />
                    </div>

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
                        title="수정 완료 저장"
                        className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition"
                      >
                        <Check className="w-3.5 h-3.5" /> 저장
                      </button>
                      <button
                        onClick={cancelEditSong}
                        title="수정 취소"
                        className="p-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-600 text-xs flex items-center gap-1 shadow-sm transition"
                      >
                        <X className="w-3.5 h-3.5" /> 취소
                      </button>
                    </div>
                  </div>
                );
              }

              // [B] 일반 보기 모드 (2 : 4 : 4 : 2 대칭 분할 적용)
              return (
                <div
                  key={song.id}
                  className={`grid grid-cols-12 gap-2 items-center text-xs p-3 rounded-2xl border transition shadow-sm ${
                    isPlayingThis
                      ? "bg-emerald-100/90 border-emerald-500 ring-2 ring-emerald-300"
                      : "bg-emerald-50/40 border-emerald-400 hover:border-emerald-500 hover:bg-emerald-50/70"
                  }`}
                >
                  {/* 1. 장르 (2칸) */}
                  <div className="col-span-2 flex justify-center">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-100/90 border border-emerald-200 text-emerald-900 text-[11px] font-bold text-center">
                      {song.genre}
                    </span>
                  </div>

                  {/* 2. 가수 / 아티스트 (4칸) */}
                  <div className="col-span-4 text-neutral-800 truncate font-bold text-[13px] text-center px-1">
                    {song.artist}
                  </div>

                  {/* 3. 곡명 & 심볼 (4칸) */}
                  <div className="col-span-4 flex items-center justify-center gap-2 font-bold text-neutral-900 px-1 overflow-hidden">
                    <Music className={`w-3.5 h-3.5 shrink-0 ${isPlayingThis ? "text-emerald-600 animate-pulse" : "text-emerald-500"}`} />
                    <span className="truncate text-sm">{song.title}</span>

                    {/* Cover 심볼 */}
                    {isCover && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-300 shadow-xs shrink-0">
                        <Mic2 className="w-2.5 h-2.5" />
                        <span>Cover</span>
                      </span>
                    )}

                    {/* Original 심볼 */}
                    {isOriginal && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-800 border border-blue-300 shadow-xs shrink-0">
                        <Disc3 className="w-2.5 h-2.5" />
                        <span>Original</span>
                      </span>
                    )}

                    {song.url && (
                      <a
                        href={song.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-neutral-400 hover:text-emerald-600 transition shrink-0 ml-0.5"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  {/* 4. 관리 버튼 (2칸) */}
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
                        song.liked
                          ? "text-rose-500 fill-rose-500 hover:scale-110 bg-rose-50"
                          : "text-neutral-400 hover:text-rose-500 hover:bg-white"
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
        </section>

        {/* [3] 우측 배너 (sticky 고정 추적) */}
        <aside className="w-full lg:w-[200px] h-[760px] shrink-0 sticky top-[73px] flex flex-col gap-3">
          
          {/* 1. 시계 & 타이머 */}
          <div className={`border rounded-2xl p-3 bg-emerald-50/30 backdrop-blur-[2px] shadow-sm flex flex-col items-center text-center shrink-0 transition-colors ${
            isAlarmRinging ? "border-rose-500 bg-rose-50/80 animate-pulse" : "border-emerald-400/90"
          }`}>
            <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 mb-0.5">
              <Clock className="w-3 h-3" />
              <span>{dateString}</span>
            </div>
            <div className="text-base font-black text-emerald-950 tracking-tight mb-2">
              {timeString}
            </div>

            <div className="w-full pt-2 border-t border-emerald-200/70 flex flex-col items-center">
              <div className="flex items-center justify-between w-full mb-1 px-1">
                <span className="text-[10px] font-bold text-neutral-600 flex items-center gap-1">
                  {isAlarmRinging ? (
                    <span className="text-rose-600 flex items-center gap-0.5 animate-bounce">
                      <Bell className="w-3 h-3" /> 종료!
                    </span>
                  ) : (
                    <span>타이머</span>
                  )}
                </span>
                
                <div className="flex items-center gap-1">
                  <button
                    onClick={subtractMinute}
                    disabled={isTimerRunning}
                    title="1분 감소"
                    className="p-0.5 rounded bg-emerald-100 hover:bg-emerald-200 disabled:opacity-30 text-emerald-800 transition"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-[10px] font-bold text-emerald-900 min-w-[24px] text-center">
                    {timerMinutes}분
                  </span>
                  <button
                    onClick={addMinute}
                    disabled={isTimerRunning}
                    title="1분 증가"
                    className="p-0.5 rounded bg-emerald-100 hover:bg-emerald-200 disabled:opacity-30 text-emerald-800 transition"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className={`text-xl font-black my-1 font-mono tracking-wider ${
                isAlarmRinging ? "text-rose-600 animate-bounce" : "text-emerald-950"
              }`}>
                {timerMin}:{timerSec}
              </div>

              <div className="flex items-center gap-1.5 w-full mt-1">
                {isAlarmRinging ? (
                  <button
                    onClick={stopAlarm}
                    className="flex-1 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition"
                  >
                    <BellOff className="w-3 h-3" /> 알람 끄기
                  </button>
                ) : (
                  <>
                    <button
                      onClick={toggleTimer}
                      className={`flex-1 py-1 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition shadow-sm text-white ${
                        isTimerRunning
                          ? "bg-amber-500 hover:bg-amber-600"
                          : "bg-emerald-600 hover:bg-emerald-700"
                      }`}
                    >
                      {isTimerRunning ? (
                        <>
                          <Pause className="w-3 h-3" /> 정지
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3" /> 시작
                        </>
                      )}
                    </button>
                    <button
                      onClick={resetTimer}
                      title="타이머 초기화"
                      className="p-1 rounded-lg border border-emerald-300 hover:bg-white/60 text-emerald-700 transition"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 2. 플레이리스트 위젯 */}
          <div className="border border-emerald-400/90 rounded-2xl p-3 bg-emerald-50/30 backdrop-blur-[2px] shadow-sm flex flex-col gap-2 shrink-0 max-h-[460px] overflow-hidden">
            <div className="flex items-center justify-between border-b border-emerald-200/70 pb-1.5 shrink-0">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>플레이리스트</span>
              </div>
              <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-1.5 py-0.5 rounded-full">
                {likedSongs.length}곡
              </span>
            </div>

            <div className="bg-white/80 border border-emerald-200 rounded-xl p-2.5 flex flex-col gap-2 shrink-0">
              <div className="text-[11px] font-bold text-emerald-950 truncate text-center leading-tight">
                {currentSong ? (
                  <span>🎵 {currentSong.title}</span>
                ) : (
                  <span className="text-neutral-400 font-normal">재생할 곡을 선택하세요</span>
                )}
              </div>

              {/* 탐색 바 */}
              <div className="space-y-1">
                <input
                  type="range"
                  min={0}
                  max={durationSec > 0 ? durationSec : 100}
                  value={currentTimeSec}
                  onChange={handleSeek}
                  disabled={!currentSong}
                  className="w-full h-1 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600 disabled:opacity-40"
                />
                <div className="flex justify-between text-[9px] text-emerald-700 font-mono font-medium">
                  <span>{formatSeconds(currentTimeSec)}</span>
                  <span>{formatSeconds(durationSec)}</span>
                </div>
              </div>

              {/* 컨트롤 버튼 */}
              <div className="flex items-center justify-between pt-0.5 px-1">
                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePrevSong}
                    title="이전 곡"
                    disabled={likedSongs.length === 0}
                    className="p-1 rounded-md text-neutral-600 hover:text-emerald-700 disabled:opacity-30 transition"
                  >
                    <SkipBack className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={togglePlayAudio}
                    title={isPlayingAudio ? "일시정지" : "재생"}
                    disabled={likedSongs.length === 0}
                    className="p-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-30 shadow-sm transition"
                  >
                    {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                  </button>

                  <button
                    onClick={handleNextSong}
                    title="다음 곡"
                    disabled={likedSongs.length === 0}
                    className="p-1 rounded-md text-neutral-600 hover:text-emerald-700 disabled:opacity-30 transition"
                  >
                    <SkipForward className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={cycleRepeatMode}
                  title={
                    repeatMode === "all"
                      ? "전체 반복"
                      : repeatMode === "one"
                      ? "1곡 반복"
                      : "반복 안 함"
                  }
                  className={`p-1 rounded-md transition flex items-center gap-0.5 text-[10px] font-bold ${
                    repeatMode !== "none"
                      ? "text-emerald-800 bg-emerald-100 px-1.5"
                      : "text-neutral-400 hover:text-neutral-600"
                  }`}
                >
                  {repeatMode === "one" ? (
                    <>
                      <Repeat1 className="w-3.5 h-3.5" />
                      <span>1</span>
                    </>
                  ) : (
                    <>
                      <Repeat className="w-3.5 h-3.5" />
                      {repeatMode === "all" && <span>ALL</span>}
                    </>
                  )}
                </button>
              </div>

              {/* 볼륨 컨트롤 */}
              <div className="flex items-center gap-1.5 pt-1 border-t border-emerald-100 px-0.5">
                <button
                  onClick={toggleMute}
                  title={isMuted ? "음소거 해제" : "음소거"}
                  className="text-emerald-700 hover:text-emerald-900 p-0.5 transition shrink-0"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>
            </div>

            {/* 담겨있는 노래 목록 */}
            <div className="overflow-y-auto space-y-1 pr-1 max-h-[140px]">
              {likedSongs.map((song, idx) => {
                const isSelected = currentPlayingIndex === idx;
                const isCover = song.songType === "Cover";
                const isOriginal = song.songType === "Original";

                return (
                  <div
                    key={`liked-${song.id}`}
                    onClick={() => handleSelectSong(idx)}
                    className={`flex items-center justify-between p-1.5 rounded-lg border text-[11px] cursor-pointer transition group ${
                      isSelected
                        ? "bg-emerald-100/90 border-emerald-400 font-bold"
                        : "bg-white/70 border-emerald-100 hover:bg-emerald-50"
                    }`}
                  >
                    <div className="min-w-0 pr-1 flex items-center gap-1.5">
                      <Play className={`w-3.5 h-3.5 shrink-0 ${isSelected && isPlayingAudio ? "text-emerald-700 fill-emerald-700 animate-pulse" : "text-neutral-400 group-hover:text-emerald-600"}`} />
                      <div className="min-w-0">
                        <div className="text-neutral-900 truncate leading-tight flex items-center gap-1">
                          <span className="truncate">{song.title}</span>
                          {isCover && (
                            <span className="px-1 py-0.2 rounded text-[9px] font-black bg-amber-100 text-amber-800 border border-amber-300 shrink-0">
                              Cover
                            </span>
                          )}
                          {isOriginal && (
                            <span className="px-1 py-0.2 rounded text-[9px] font-black bg-blue-100 text-blue-800 border border-blue-300 shrink-0">
                              Original
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-neutral-500 truncate">
                          {song.artist}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(song.id);
                        }}
                        title="플레이리스트에서 제외"
                        className="text-neutral-300 hover:text-rose-500 p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {likedSongs.length === 0 && (
                <div className="py-4 text-center text-[11px] text-emerald-800/60 leading-tight">
                  노래 목록에서 ❤️를 누르면<br />여기에 담깁니다.
                </div>
              )}
            </div>
          </div>

          {/* 3. 우측 하단 배너 */}
          <div className="border border-dashed border-emerald-400/90 rounded-2xl p-3 flex-1 min-h-0 flex flex-col items-center justify-center text-center bg-emerald-50/30 backdrop-blur-[2px] shadow-sm overflow-hidden">
            <span className="text-xl mb-1 shrink-0">🖼️</span>
            <span className="text-xs font-semibold text-emerald-700 truncate">우측 하단 배너</span>
          </div>

        </aside>

      </main>
    </div>
  );
}