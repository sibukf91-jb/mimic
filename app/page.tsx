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
  X,
  Calendar as CalendarIcon,
  Cake,
  Scissors,
  Palmtree,
  Clock3,
  CalendarDays,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  PiggyBank,
  Tv,
  Star,
  Globe,
  User,
  Key,
  Copy
} from "lucide-react";

export default function Home() {
  const [pin, setPin] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const CORRECT_PIN = "1234";
  const [currentTab, setCurrentTab] = useState("favorites"); // 기본 진입 탭

  // ================= 1. 테마 색상 동적 매핑 =================
  const themeClasses = useMemo(() => {
    if (currentTab === "favorites") {
      return {
        borderDashed: "border-amber-400/80",
        borderSolid: "border-amber-400/80",
        borderSubtle: "border-amber-200/80",
        bgLight: "bg-amber-50/40",
        bgHeader: "bg-amber-100/70",
        textPrimary: "text-amber-950",
        textSecondary: "text-amber-800",
        accentBtn: "bg-amber-500 hover:bg-amber-600 text-white",
        accentBtnSub: "bg-amber-100 hover:bg-amber-200 text-amber-800",
        accentActive: "border-amber-500 bg-amber-100 text-amber-900 font-bold",
        rangeAccent: "accent-amber-500",
        rangeBg: "bg-amber-100",
        activeTrack: "bg-amber-100/90 border-amber-400",
        playIcon: "text-amber-600 fill-amber-600",
        navActive: "bg-amber-100/90 text-amber-900 border-amber-300 shadow-sm",
      };
    }
    if (currentTab === "ledger") {
      return {
        borderDashed: "border-sky-400/80",
        borderSolid: "border-sky-400/80",
        borderSubtle: "border-sky-200/80",
        bgLight: "bg-sky-50/40",
        bgHeader: "bg-sky-100/70",
        textPrimary: "text-sky-950",
        textSecondary: "text-sky-800",
        accentBtn: "bg-sky-500 hover:bg-sky-600 text-white",
        accentBtnSub: "bg-sky-100 hover:bg-sky-200 text-sky-800",
        accentActive: "border-sky-500 bg-sky-100 text-sky-900 font-bold",
        rangeAccent: "accent-sky-500",
        rangeBg: "bg-sky-100",
        activeTrack: "bg-sky-100/90 border-sky-400",
        playIcon: "text-sky-600 fill-sky-600",
        navActive: "bg-sky-100/90 text-sky-900 border-sky-300 shadow-sm",
      };
    }
    if (currentTab === "schedule") {
      return {
        borderDashed: "border-pink-400/80",
        borderSolid: "border-pink-400/80",
        borderSubtle: "border-pink-200/80",
        bgLight: "bg-pink-50/40",
        bgHeader: "bg-pink-100/70",
        textPrimary: "text-pink-950",
        textSecondary: "text-pink-800",
        accentBtn: "bg-pink-500 hover:bg-pink-600 text-white",
        accentBtnSub: "bg-pink-100 hover:bg-pink-200 text-pink-800",
        accentActive: "border-pink-500 bg-pink-100 text-pink-900 font-bold",
        rangeAccent: "accent-pink-500",
        rangeBg: "bg-pink-100",
        activeTrack: "bg-pink-100/90 border-pink-400",
        playIcon: "text-pink-600 fill-pink-600",
        navActive: "bg-pink-100/90 text-pink-900 border-pink-300 shadow-sm",
      };
    }
    return {
      borderDashed: "border-emerald-400/90",
      borderSolid: "border-emerald-400/90",
      borderSubtle: "border-emerald-200/70",
      bgLight: "bg-emerald-50/30",
      bgHeader: "bg-emerald-100/60",
      textPrimary: "text-emerald-950",
      textSecondary: "text-emerald-700",
      accentBtn: "bg-emerald-600 hover:bg-emerald-700 text-white",
      accentBtnSub: "bg-emerald-100 hover:bg-emerald-200 text-emerald-800",
      accentActive: "border-emerald-500 bg-emerald-100 text-emerald-800 font-bold",
      rangeAccent: "accent-emerald-600",
      rangeBg: "bg-emerald-100",
      activeTrack: "bg-emerald-100/90 border-emerald-400",
      playIcon: "text-emerald-700 fill-emerald-700",
      navActive: "bg-emerald-100/90 text-emerald-800 border-emerald-300 shadow-sm",
    };
  }, [currentTab]);

  // ================= 2. 즐겨찾기 탭 기능 =================
  const getCategoryIcon = (category: string) => {
    const cat = (category || "").toLowerCase();
    if (cat.includes("포털") || cat.includes("웹") || cat.includes("인터넷")) return "🌐";
    if (cat.includes("검색") || cat.includes("구글")) return "🔍";
    if (cat.includes("영상") || cat.includes("동영상") || cat.includes("유튜브") || cat.includes("ott")) return "🎬";
    if (cat.includes("쇼핑") || cat.includes("구매") || cat.includes("마트")) return "🛒";
    if (cat.includes("개발") || cat.includes("코딩") || cat.includes("깃")) return "💻";
    if (cat.includes("음악") || cat.includes("노래") || cat.includes("뮤직")) return "🎵";
    if (cat.includes("커뮤니티") || cat.includes("카페") || cat.includes("sns") || cat.includes("블로그")) return "💬";
    if (cat.includes("게임")) return "🎮";
    if (cat.includes("금융") || cat.includes("은행") || cat.includes("증권") || cat.includes("페이")) return "🏦";
    if (cat.includes("업무") || cat.includes("회사") || cat.includes("오피스")) return "📁";
    return "⭐";
  };

  const defaultFavorites = [
    { id: 1, category: "포털", name: "네이버", url: "https://www.naver.com", memo: "뉴스, 지도, 블로그", username: "my_naver_id", pwHint: "초록창12#$" },
    { id: 2, category: "검색", name: "구글", url: "https://www.google.com", memo: "검색 및 지메일", username: "user@gmail.com", pwHint: "구글영문+특수" },
    { id: 3, category: "영상", name: "유튜브", url: "https://www.youtube.com", memo: "음악 및 동영상 시청", username: "youtube_acc", pwHint: "구글연동" },
    { id: 4, category: "개발", name: "GitHub", url: "https://github.com", memo: "코드 저장소", username: "dev_user", pwHint: "깃허브토큰!" },
    { id: 5, category: "쇼핑", name: "쿠팡", url: "https://www.coupang.com", memo: "로켓배송", username: "coupang_01", pwHint: "생일뒤자리@!" },
  ];

  const [favList, setFavList] = useState<any[]>([]);
  const [isFavLoaded, setIsFavLoaded] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // 아이디 자동 복사 함수
  const handleCopyUsername = (id: number, username: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!username) return;
    navigator.clipboard.writeText(username);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId((prev) => (prev === id ? null : prev));
    }, 1500);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jb_bookmark_fav_list_v2");
      if (saved) {
        try {
          setFavList(JSON.parse(saved));
        } catch (e) {
          setFavList(defaultFavorites);
        }
      } else {
        setFavList(defaultFavorites);
      }
      setIsFavLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isFavLoaded && typeof window !== "undefined") {
      localStorage.setItem("jb_bookmark_fav_list_v2", JSON.stringify(favList));
    }
  }, [favList, isFavLoaded]);

  // 입력 폼 상태
  const [newFavCategory, setNewFavCategory] = useState("");
  const [newFavName, setNewFavName] = useState("");
  const [newFavUrl, setNewFavUrl] = useState("");
  const [newFavMemo, setNewFavMemo] = useState("");
  const [newFavUsername, setNewFavUsername] = useState("");
  const [newFavPwHint, setNewFavPwHint] = useState("");

  const [selectedFavCategory, setSelectedFavCategory] = useState("전체");
  const [favSearchQuery, setFavSearchQuery] = useState("");

  // 수정 상태
  const [editingFavId, setEditingFavId] = useState<number | null>(null);
  const [editFavCategory, setEditFavCategory] = useState("");
  const [editFavName, setEditFavName] = useState("");
  const [editFavUrl, setEditFavUrl] = useState("");
  const [editFavMemo, setEditFavMemo] = useState("");
  const [editFavUsername, setEditFavUsername] = useState("");
  const [editFavPwHint, setEditFavPwHint] = useState("");

  const existingFavCategories = useMemo(() => {
    const set = new Set<string>();
    favList.forEach((f) => {
      if (f.category && f.category.trim()) set.add(f.category.trim());
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b, "ko"));
  }, [favList]);

  const handleAddFav = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFavName.trim() || !newFavUrl.trim()) return;

    let formattedUrl = newFavUrl.trim();
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = "https://" + formattedUrl;
    }

    const newFav = {
      id: Date.now(),
      category: newFavCategory.trim() || "기타",
      name: newFavName.trim(),
      url: formattedUrl,
      memo: newFavMemo.trim(),
      username: newFavUsername.trim(),
      pwHint: newFavPwHint.trim()
    };

    setFavList([newFav, ...favList]);
    setNewFavCategory("");
    setNewFavName("");
    setNewFavUrl("");
    setNewFavMemo("");
    setNewFavUsername("");
    setNewFavPwHint("");
  };

  const startEditFav = (fav: any) => {
    setEditingFavId(fav.id);
    setEditFavCategory(fav.category || "기타");
    setEditFavName(fav.name || "");
    setEditFavUrl(fav.url || "");
    setEditFavMemo(fav.memo || "");
    setEditFavUsername(fav.username || "");
    setEditFavPwHint(fav.pwHint || "");
  };

  const cancelEditFav = () => setEditingFavId(null);

  const saveEditFav = (id: number) => {
    if (!editFavName.trim() || !editFavUrl.trim()) return;

    let formattedUrl = editFavUrl.trim();
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = "https://" + formattedUrl;
    }

    setFavList((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              category: editFavCategory.trim() || "기타",
              name: editFavName.trim(),
              url: formattedUrl,
              memo: editFavMemo.trim(),
              username: editFavUsername.trim(),
              pwHint: editFavPwHint.trim()
            }
          : f
      )
    );
    setEditingFavId(null);
  };

  const handleDeleteFav = (id: number) => {
    setFavList((prev) => prev.filter((f) => f.id !== id));
  };

  const filteredFavs = useMemo(() => {
    return favList
      .filter((fav) => {
        const matchCategory = selectedFavCategory === "전체" || fav.category === selectedFavCategory;
        const matchSearch =
          fav.name.toLowerCase().includes(favSearchQuery.toLowerCase()) ||
          fav.url.toLowerCase().includes(favSearchQuery.toLowerCase()) ||
          fav.category.toLowerCase().includes(favSearchQuery.toLowerCase()) ||
          (fav.memo && fav.memo.toLowerCase().includes(favSearchQuery.toLowerCase())) ||
          (fav.username && fav.username.toLowerCase().includes(favSearchQuery.toLowerCase()));
        return matchCategory && matchSearch;
      })
      .sort((a, b) => a.name.localeCompare(b.name, "ko"));
  }, [favList, selectedFavCategory, favSearchQuery]);

  // ================= 3. 노래책 데이터 =================
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
  const [videoModalUrl, setVideoModalUrl] = useState<string | null>(null);

  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && videoModalUrl) {
        setVideoModalUrl(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [videoModalUrl]);

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

  // ================= 4. 일정 & 가계부 데이터 =================
  const defaultSchedules = [
    { id: 1, date: "2026-09-06", title: "홍대 1주년 카페", symbol: "appointment", color: "pink" },
    { id: 2, date: "2026-09-16", title: "위어스헤어", symbol: "hair", color: "purple" },
    { id: 3, date: "2026-09-16", title: "오후 반차", symbol: "half_leave", color: "green" },
  ];
  const [scheduleList, setScheduleList] = useState<any[]>(defaultSchedules);

  const defaultLedgerEntries = [
    { id: 1, date: "2026-09-05", type: "expense", title: "카카오택시", amount: 14800, symbol: "taxi", color: "yellow" },
    { id: 2, date: "2026-09-10", type: "income", title: "9월 월급", amount: 3200000, symbol: "salary", color: "blue" },
    { id: 3, date: "2026-09-12", type: "expense", title: "배달의민족", amount: 26000, symbol: "delivery", color: "pink" },
    { id: 4, date: "2026-09-01", type: "expense", title: "인터넷", amount: 34000, symbol: "fixed", color: "pink" },
    { id: 5, date: "2026-09-17", type: "expense", title: "GS25 편의점", amount: 6200, symbol: "convenience", color: "green" },
  ];
  const [ledgerEntries, setLedgerEntries] = useState<any[]>(defaultLedgerEntries);

  // ================= 5. 플레이리스트 & 시계 =================
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
          playerVars: { autoplay: 1, controls: 0, disablekb: 1, playsinline: 1 },
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
    if (window.YT && window.YT.Player) initPlayer();
    else window.onYouTubeIframeAPIReady = initPlayer;
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
      if (playerRef.current && playerRef.current.mute) playerRef.current.mute();
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

  // 시계 & 타이머
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [timerMinutes, setTimerMinutes] = useState(4);
  const [timeLeft, setTimeLeft] = useState(4 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
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
    } catch (e) {}
  };

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      playBeep();
      alarmIntervalRef.current = setInterval(() => playBeep(), 800);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const resetTimer = () => {
    if (alarmIntervalRef.current) {
      clearInterval(alarmIntervalRef.current);
      alarmIntervalRef.current = null;
    }
    setIsTimerRunning(false);
    setTimeLeft(timerMinutes * 60);
  };

  const toggleTimer = () => {
    if (alarmIntervalRef.current) {
      clearInterval(alarmIntervalRef.current);
      alarmIntervalRef.current = null;
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
                      ? themeClasses.navActive
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
        
        {/* [1] 좌측 배너 */}
        <aside className="w-full lg:w-[200px] h-[760px] shrink-0 sticky top-[73px]">
          <div className={`border-2 border-dashed ${themeClasses.borderDashed} rounded-2xl h-full flex flex-col items-center justify-center p-4 text-center ${themeClasses.bgLight} backdrop-blur-[2px] shadow-sm transition-colors duration-200`}>
            <span className="text-xl mb-1">🖼️</span>
            <span className={`text-xs font-semibold ${themeClasses.textSecondary}`}>좌측 배너 영역</span>
          </div>
        </aside>

        {/* [2] 중앙 내용 영역 */}
        <section className="flex-1 w-full h-[760px] min-w-0 flex flex-col">
          
          {/* ==================== A. [즐겨찾기] 탭 화면 ==================== */}
          {currentTab === "favorites" && (
            <div className="h-full overflow-y-auto flex flex-col gap-2.5 pr-1">
              
              {/* 1단: 즐겨찾기 등록 바 */}
              <form onSubmit={handleAddFav} className="border-2 border-amber-400/80 rounded-2xl p-3 flex flex-wrap items-center gap-2 bg-amber-50/40 backdrop-blur-[2px] shadow-sm shrink-0">
                <div className="relative">
                  <input
                    type="text"
                    list="fav-category-suggestions"
                    value={newFavCategory}
                    onChange={(e) => setNewFavCategory(e.target.value)}
                    placeholder="분류 (예: 포털)"
                    className="w-24 border border-amber-200 bg-white/90 rounded-lg px-2 py-1.5 text-xs font-medium text-amber-950 focus:outline-none focus:border-amber-500 placeholder-neutral-400"
                  />
                  <datalist id="fav-category-suggestions">
                    {existingFavCategories.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>

                <input
                  type="text"
                  required
                  value={newFavName}
                  onChange={(e) => setNewFavName(e.target.value)}
                  placeholder="사이트명 *"
                  className="w-32 border border-amber-200 bg-white/90 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-amber-500 placeholder-neutral-500 font-bold"
                />

                <input
                  type="text"
                  required
                  value={newFavUrl}
                  onChange={(e) => setNewFavUrl(e.target.value)}
                  placeholder="URL 주소 (https://...)*"
                  className="flex-1 min-w-[150px] border border-amber-200 bg-white/90 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-amber-500 placeholder-neutral-500 font-medium"
                />

                <input
                  type="text"
                  value={newFavMemo}
                  onChange={(e) => setNewFavMemo(e.target.value)}
                  placeholder="메모"
                  className="w-28 border border-amber-200 bg-white/90 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-amber-500 placeholder-neutral-500 font-medium"
                />

                <input
                  type="text"
                  value={newFavUsername}
                  onChange={(e) => setNewFavUsername(e.target.value)}
                  placeholder="아이디"
                  className="w-24 border border-amber-200 bg-white/90 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-amber-500 placeholder-neutral-500 font-medium"
                />

                <input
                  type="text"
                  value={newFavPwHint}
                  onChange={(e) => setNewFavPwHint(e.target.value)}
                  placeholder="비번 힌트"
                  className="w-24 border border-amber-200 bg-white/90 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-amber-500 placeholder-neutral-500 font-medium"
                />

                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs px-4 py-2 rounded-lg transition shrink-0 shadow-sm flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> 추가
                </button>
              </form>

              {/* 2단: 검색 및 카테고리 필터 바 */}
              <div className="border-2 border-amber-400/80 rounded-2xl p-3 bg-amber-50/40 backdrop-blur-[2px] shadow-sm flex flex-col gap-2 shrink-0">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={favSearchQuery}
                    onChange={(e) => setFavSearchQuery(e.target.value)}
                    placeholder="사이트명, 분류, 메모, 아이디를 검색해보세요..."
                    className="w-full border border-amber-200 bg-white/90 rounded-xl pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-amber-500 placeholder-neutral-500 font-medium"
                  />
                  <Search className="w-3.5 h-3.5 text-amber-600/70 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                <div className="flex items-center gap-1.5 text-xs flex-wrap pt-0.5">
                  <span className="text-amber-950 font-semibold text-[11px] mr-1">분류:</span>
                  <button
                    onClick={() => setSelectedFavCategory("전체")}
                    className={`px-2.5 py-0.5 rounded-full border text-[11px] transition font-medium ${
                      selectedFavCategory === "전체"
                        ? "border-amber-500 bg-amber-200 text-amber-950 font-bold shadow-2xs"
                        : "border-amber-200/80 bg-white/70 text-neutral-700 hover:bg-white"
                    }`}
                  >
                    전체
                  </button>
                  {existingFavCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedFavCategory(cat)}
                      className={`px-2.5 py-0.5 rounded-full border text-[11px] transition font-medium ${
                        selectedFavCategory === cat
                          ? "border-amber-500 bg-amber-200 text-amber-950 font-bold shadow-2xs"
                          : "border-amber-200/80 bg-white/70 text-neutral-700 hover:bg-white"
                      }`}
                    >
                      {getCategoryIcon(cat)} {cat}
                    </button>
                  ))}
                  <span className="ml-auto text-[11px] text-amber-800/80 font-medium">
                    총 {filteredFavs.length}개 사이트
                  </span>
                </div>
              </div>

              {/* 3단: 헤더 박스 */}
              <div className="border-2 border-amber-400/80 rounded-xl px-4 py-2.5 bg-amber-100/70 backdrop-blur-[2px] shadow-sm shrink-0">
                <div className="grid grid-cols-12 gap-2 text-xs font-extrabold text-amber-950 items-center text-center">
                  <span className="col-span-2">🏷️ 분류</span>
                  <span className="col-span-3">🌐 사이트명</span>
                  <span className="col-span-1">바로가기</span>
                  <span className="col-span-2">📝 메모</span>
                  <span className="col-span-2">🔐 계정 정보 (클릭시 ID복사 / 힌트)</span>
                  <span className="col-span-2">관리</span>
                </div>
              </div>

              {/* 4단: 즐겨찾기 카드 리스트 */}
              <div className="flex flex-col gap-2">
                {filteredFavs.map((fav) => {
                  const isEditing = editingFavId === fav.id;
                  const isCopied = copiedId === fav.id;
                  const catIcon = getCategoryIcon(fav.category);

                  if (isEditing) {
                    return (
                      <div
                        key={`edit-fav-${fav.id}`}
                        className="p-3 rounded-2xl border-2 border-amber-400 bg-amber-50/90 shadow-md flex flex-wrap items-center gap-2"
                      >
                        <input
                          type="text"
                          value={editFavCategory}
                          onChange={(e) => setEditFavCategory(e.target.value)}
                          placeholder="분류"
                          className="w-20 border border-amber-300 bg-white rounded-lg px-2 py-1.5 text-xs font-medium text-amber-950 focus:outline-none focus:border-amber-600"
                        />
                        <input
                          type="text"
                          required
                          value={editFavName}
                          onChange={(e) => setEditFavName(e.target.value)}
                          placeholder="사이트 이름"
                          className="w-28 border border-amber-300 bg-white rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-amber-600 font-bold"
                        />
                        <input
                          type="text"
                          required
                          value={editFavUrl}
                          onChange={(e) => setEditFavUrl(e.target.value)}
                          placeholder="웹사이트 URL"
                          className="flex-1 min-w-[140px] border border-amber-300 bg-white rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-amber-600 font-medium"
                        />
                        <input
                          type="text"
                          value={editFavMemo}
                          onChange={(e) => setEditFavMemo(e.target.value)}
                          placeholder="메모"
                          className="w-28 border border-amber-300 bg-white rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-amber-600 font-medium"
                        />
                        <input
                          type="text"
                          value={editFavUsername}
                          onChange={(e) => setEditFavUsername(e.target.value)}
                          placeholder="아이디"
                          className="w-24 border border-amber-300 bg-white rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-amber-600 font-medium"
                        />
                        <input
                          type="text"
                          value={editFavPwHint}
                          onChange={(e) => setEditFavPwHint(e.target.value)}
                          placeholder="비번 힌트"
                          className="w-24 border border-amber-300 bg-white rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-amber-600 font-medium"
                        />
                        <div className="flex items-center gap-1 shrink-0 ml-auto">
                          <button
                            onClick={() => saveEditFav(fav.id)}
                            title="저장"
                            className="p-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition"
                          >
                            <Check className="w-3.5 h-3.5" /> 저장
                          </button>
                          <button
                            onClick={cancelEditFav}
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
                      key={fav.id}
                      className="grid grid-cols-12 gap-2 items-center text-xs p-3 rounded-2xl border-2 border-amber-400/80 bg-amber-50/40 hover:bg-amber-50/70 transition shadow-2xs"
                    >
                      {/* 1. 분류 (자동 심볼 부착) */}
                      <div className="col-span-2 flex justify-center">
                        <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-bold text-center flex items-center gap-1 shadow-2xs">
                          <span>{catIcon}</span>
                          <span>{fav.category}</span>
                        </span>
                      </div>

                      {/* 2. 사이트명 */}
                      <div className="col-span-3 text-neutral-900 truncate font-black text-[13px] text-center px-1">
                        {fav.name}
                      </div>

                      {/* 3. 바로가기 버튼 */}
                      <div className="col-span-1 flex justify-center">
                        <a
                          href={fav.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-[11px] flex items-center gap-1 shadow-2xs transition active:scale-95"
                          title={`${fav.name} 바로가기`}
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>이동</span>
                        </a>
                      </div>

                      {/* 4. 메모 */}
                      <div className="col-span-2 text-neutral-600 truncate text-[11px] px-1 text-center font-medium">
                        {fav.memo || <span className="text-neutral-300">-</span>}
                      </div>

                      {/* 5. 아이디(클릭시 자동복사) & 비번힌트 */}
                      <div className="col-span-2 flex flex-col items-center justify-center gap-1 px-1 overflow-hidden">
                        {fav.username ? (
                          <button
                            onClick={(e) => handleCopyUsername(fav.id, fav.username, e)}
                            className={`flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border transition active:scale-95 max-w-full ${
                              isCopied
                                ? "bg-emerald-100 text-emerald-800 border-emerald-300 font-bold"
                                : "bg-white/90 hover:bg-amber-100/80 text-neutral-800 border-amber-200/80"
                            }`}
                            title="클릭하여 아이디 복사"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                                <span className="text-emerald-700 font-bold">복사됨!</span>
                              </>
                            ) : (
                              <>
                                <User className="w-2.5 h-2.5 text-amber-700 shrink-0" />
                                <span className="truncate">{fav.username}</span>
                                <Copy className="w-2.5 h-2.5 opacity-50 shrink-0 ml-0.5" />
                              </>
                            )}
                          </button>
                        ) : null}

                        {fav.pwHint ? (
                          <div 
                            className="flex items-center gap-1 text-[10px] font-mono text-neutral-600 bg-amber-100/60 px-1.5 py-0.2 rounded border border-amber-200/90 truncate max-w-full cursor-help group"
                            title="마우스를 올리면 비밀번호 힌트가 보입니다"
                          >
                            <Key className="w-2.5 h-2.5 text-amber-700 shrink-0" />
                            <span className="filter blur-[3px] group-hover:blur-none transition-all duration-200 select-none group-hover:select-text text-amber-950 font-bold">
                              {fav.pwHint}
                            </span>
                          </div>
                        ) : null}

                        {!fav.username && !fav.pwHint && (
                          <span className="text-[10px] text-neutral-300">-</span>
                        )}
                      </div>

                      {/* 6. 관리 버튼 */}
                      <div className="col-span-2 flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => startEditFav(fav)}
                          title="수정"
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-amber-800 hover:bg-white transition"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteFav(fav.id)}
                          title="삭제"
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-500 hover:bg-white transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {filteredFavs.length === 0 && (
                  <div className="border-2 border-dashed border-amber-300 rounded-2xl p-12 text-center text-xs font-medium text-amber-800/70 bg-amber-50/20">
                    등록되었거나 조건에 맞는 즐겨찾기 사이트가 없습니다.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ==================== B. [가계부] 탭 화면 ==================== */}
          {currentTab === "ledger" && (
            <div className="h-full flex flex-col gap-3">
              <div className="border-2 border-sky-400/80 rounded-2xl bg-white/95 backdrop-blur-md px-5 py-3 shadow-sm flex items-center justify-between shrink-0">
                <div className="flex-1 flex items-center justify-between pr-6 border-r border-sky-200">
                  <span className="font-bold text-xs text-sky-700">가계부 탭</span>
                </div>
              </div>
            </div>
          )}

          {/* ==================== C. [일정] 탭 화면 ==================== */}
          {currentTab === "schedule" && (
            <div className="h-full flex flex-col gap-3">
              <div className="border-2 border-pink-400/80 rounded-2xl bg-white/95 backdrop-blur-md px-5 py-3 shadow-sm flex items-center justify-between shrink-0">
                <div className="flex-1 flex items-center justify-between pr-6 border-r border-pink-200">
                  <span className="font-bold text-xs text-pink-700">일정 탭</span>
                </div>
              </div>
            </div>
          )}

          {/* ==================== D. [노래책] 탭 화면 ==================== */}
          {currentTab === "songs" && (
            <div className="h-full overflow-y-auto flex flex-col gap-2.5 pr-1">
              <form onSubmit={handleAddSong} className="border border-emerald-400 rounded-2xl p-3 flex flex-wrap items-center gap-2 bg-emerald-50/40 backdrop-blur-[2px] shadow-sm shrink-0">
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="곡 제목 *"
                  className="w-44 border border-emerald-200 bg-white/80 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-emerald-500 font-medium"
                />
                <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-5 py-2 rounded-lg transition shrink-0 shadow-sm flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> 곡 추가
                </button>
              </form>
            </div>
          )}

          {/* 그 외 탭 */}
          {currentTab !== "songs" && currentTab !== "schedule" && currentTab !== "ledger" && currentTab !== "favorites" && (
            <div className="h-full border border-dashed border-emerald-300 rounded-2xl p-20 flex flex-col items-center justify-center text-center bg-emerald-50/20 backdrop-blur-[2px]">
              <span className="text-3xl mb-2 block">🚧</span>
              <h3 className="text-sm font-bold text-emerald-900 mb-1">
                {menuItems.find((m) => m.id === currentTab)?.label} 준비 중
              </h3>
              <p className="text-xs text-emerald-700/80">해당 탭의 기능도 곧 추가될 예정입니다.</p>
            </div>
          )}

        </section>

        {/* [3] 우측 배너 */}
        <aside className="w-full lg:w-[200px] h-[760px] shrink-0 sticky top-[73px] flex flex-col gap-3">
          
          {/* 1. 시계 & 타이머 */}
          <div className={`border-2 ${themeClasses.borderSolid} rounded-2xl p-3 ${themeClasses.bgLight} backdrop-blur-[2px] shadow-sm flex flex-col items-center text-center shrink-0 transition-colors duration-200`}>
            <div className={`flex items-center gap-1 text-[10px] font-semibold ${themeClasses.textSecondary} mb-0.5`}>
              <Clock className="w-3 h-3" />
              <span>{dateString}</span>
            </div>
            <div className={`text-base font-black ${themeClasses.textPrimary} tracking-tight mb-2`}>
              {timeString}
            </div>

            <div className={`w-full pt-2 border-t ${themeClasses.borderSubtle} flex flex-col items-center`}>
              <div className="flex items-center justify-between w-full mb-1 px-1">
                <span className="text-[10px] font-bold text-neutral-600 flex items-center gap-1">타이머</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => !isTimerRunning && setTimerMinutes((p) => Math.max(1, p - 1))}
                    disabled={isTimerRunning}
                    title="1분 감소"
                    className={`p-0.5 rounded ${themeClasses.accentBtnSub} disabled:opacity-30 transition`}
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className={`text-[10px] font-bold ${themeClasses.textPrimary} min-w-[24px] text-center`}>
                    {timerMinutes}분
                  </span>
                  <button
                    onClick={() => !isTimerRunning && setTimerMinutes((p) => p + 1)}
                    disabled={isTimerRunning}
                    title="1분 증가"
                    className={`p-0.5 rounded ${themeClasses.accentBtnSub} disabled:opacity-30 transition`}
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className={`text-xl font-black my-1 font-mono tracking-wider ${themeClasses.textPrimary}`}>
                {timerMin}:{timerSec}
              </div>

              <div className="flex items-center gap-1.5 w-full mt-1">
                <button
                  onClick={toggleTimer}
                  className={`flex-1 py-1 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition shadow-sm ${
                    isTimerRunning ? "bg-amber-500 hover:bg-amber-600 text-white" : themeClasses.accentBtn
                  }`}
                >
                  {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                  <span>{isTimerRunning ? "정지" : "시작"}</span>
                </button>
                <button
                  onClick={resetTimer}
                  title="타이머 초기화"
                  className={`p-1 rounded-lg border ${themeClasses.borderSubtle} hover:bg-white/60 ${themeClasses.textSecondary} transition`}
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* 2. 플레이리스트 위젯 */}
          <div className={`border-2 ${themeClasses.borderSolid} rounded-2xl p-3 ${themeClasses.bgLight} backdrop-blur-[2px] shadow-sm flex flex-col gap-2 shrink-0 max-h-[460px] overflow-hidden transition-colors duration-200`}>
            <div className={`flex items-center justify-between border-b ${themeClasses.borderSubtle} pb-1.5 shrink-0`}>
              <div className={`flex items-center gap-1.5 text-xs font-bold ${themeClasses.textPrimary}`}>
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>플레이리스트</span>
              </div>
              <span className={`text-[10px] ${themeClasses.textSecondary} font-bold ${themeClasses.bgHeader} px-1.5 py-0.5 rounded-full`}>
                {likedSongs.length}곡
              </span>
            </div>

            <div className={`bg-white/80 border ${themeClasses.borderSubtle} rounded-xl p-2.5 flex flex-col gap-2 shrink-0`}>
              <div className={`text-[11px] font-bold ${themeClasses.textPrimary} truncate text-center leading-tight`}>
                {currentSong ? <span>🎵 {currentSong.title}</span> : <span className="text-neutral-400 font-normal">재생할 곡을 선택하세요</span>}
              </div>

              <div className="space-y-1">
                <input
                  type="range"
                  min={0}
                  max={durationSec > 0 ? durationSec : 100}
                  value={currentTimeSec}
                  onChange={handleSeek}
                  disabled={!currentSong}
                  className={`w-full h-1 ${themeClasses.rangeBg} rounded-lg appearance-none cursor-pointer ${themeClasses.rangeAccent} disabled:opacity-40`}
                />
                <div className={`flex justify-between text-[9px] ${themeClasses.textSecondary} font-mono font-medium`}>
                  <span>{formatSeconds(currentTimeSec)}</span>
                  <span>{formatSeconds(durationSec)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-0.5 px-1">
                <div className="flex items-center gap-1">
                  <button onClick={handlePrevSong} title="이전 곡" disabled={likedSongs.length === 0} className="p-1 rounded-md text-neutral-600 hover:text-neutral-900 disabled:opacity-30 transition">
                    <SkipBack className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={togglePlayAudio} title={isPlayingAudio ? "일시정지" : "재생"} disabled={likedSongs.length === 0} className={`p-1.5 rounded-full ${themeClasses.accentBtn} disabled:opacity-30 shadow-sm transition`}>
                    {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                  </button>
                  <button onClick={handleNextSong} title="다음 곡" disabled={likedSongs.length === 0} className="p-1 rounded-md text-neutral-600 hover:text-neutral-900 disabled:opacity-30 transition">
                    <SkipForward className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button onClick={cycleRepeatMode} title="반복 설정" className={`p-1 rounded-md transition flex items-center gap-0.5 text-[10px] font-bold ${repeatMode !== "none" ? themeClasses.accentActive + " px-1.5" : "text-neutral-400 hover:text-neutral-600"}`}>
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

              <div className={`flex items-center gap-1.5 pt-1 border-t ${themeClasses.borderSubtle} px-0.5`}>
                <button onClick={toggleMute} title={isMuted ? "음소거 해제" : "음소거"} className={`${themeClasses.textSecondary} hover:text-neutral-950 p-0.5 transition shrink-0`}>
                  {isMuted || volume === 0 ? <VolumeX className="w-3.5 h-3.5 text-neutral-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                <input type="range" min={0} max={100} value={isMuted ? 0 : volume} onChange={handleVolumeChange} className={`w-full h-1 ${themeClasses.rangeBg} rounded-lg appearance-none cursor-pointer ${themeClasses.rangeAccent}`} />
              </div>
            </div>

            <div className="overflow-y-auto space-y-1 pr-1 max-h-[140px]">
              {likedSongs.map((song, idx) => (
                <div key={`liked-${song.id}`} onClick={() => handleSelectSong(idx)} className={`flex items-center justify-between p-1.5 rounded-lg border text-[11px] cursor-pointer transition group ${currentPlayingIndex === idx ? themeClasses.activeTrack + " font-bold" : `bg-white/70 ${themeClasses.borderSubtle} hover:${themeClasses.bgLight}`}`}>
                  <div className="min-w-0 pr-1 flex items-center gap-1.5">
                    <Play className={`w-3.5 h-3.5 shrink-0 ${currentPlayingIndex === idx && isPlayingAudio ? themeClasses.playIcon + " animate-pulse" : "text-neutral-400 group-hover:text-neutral-700"}`} />
                    <span className="truncate">{song.title}</span>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); toggleLike(song.id); }} className="text-neutral-300 hover:text-rose-500 p-0.5"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* 3. 우측 하단 배너 */}
          <div className={`border-2 border-dashed ${themeClasses.borderDashed} rounded-2xl p-3 flex-1 min-h-0 flex flex-col items-center justify-center text-center ${themeClasses.bgLight} backdrop-blur-[2px] shadow-sm overflow-hidden transition-colors duration-200`}>
            <span className="text-xl mb-1 shrink-0">🖼️</span>
            <span className={`text-xs font-semibold ${themeClasses.textSecondary} truncate`}>우측 하단 배너</span>
          </div>

        </aside>

      </main>
    </div>
  );
}