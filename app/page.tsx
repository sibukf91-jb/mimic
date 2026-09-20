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
  Copy,
  Bookmark,
  BookOpen,
  ArrowUpDown
} from "lucide-react";

export default function Home() {
  const [pin, setPin] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const CORRECT_PIN = "1234";
  const [currentTab, setCurrentTab] = useState("bookmarks"); // 기본 진입 탭: 책갈피

  // ================= 1. 테마 색상 동적 매핑 =================
  const themeClasses = useMemo(() => {
    if (currentTab === "bookmarks") {
      return {
        borderDashed: "border-amber-400/90",
        borderSolid: "border-amber-400/90",
        borderSubtle: "border-amber-200/90",
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
    if (currentTab === "favorites") {
      return {
        borderDashed: "border-purple-400/80",
        borderSolid: "border-purple-400/80",
        borderSubtle: "border-purple-200/80",
        bgLight: "bg-purple-50/40",
        bgHeader: "bg-purple-100/70",
        textPrimary: "text-purple-950",
        textSecondary: "text-purple-800",
        accentBtn: "bg-purple-600 hover:bg-purple-700 text-white",
        accentBtnSub: "bg-purple-100 hover:bg-purple-200 text-purple-800",
        accentActive: "border-purple-500 bg-purple-100 text-purple-900 font-bold",
        rangeAccent: "accent-purple-500",
        rangeBg: "bg-purple-100",
        activeTrack: "bg-purple-100/90 border-purple-400",
        playIcon: "text-purple-600 fill-purple-600",
        navActive: "bg-purple-100/90 text-purple-900 border-purple-300 shadow-sm",
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

  const holidays: Record<string, string> = {
    "2026-09-24": "추석 연휴",
    "2026-09-25": "추석",
    "2026-09-26": "추석 연휴",
  };
  const TODAY_STR = "2026-09-20";
  const todayDateObj = new Date(TODAY_STR);

  // ================= 2. 책갈피 탭 데이터 =================
  const calculateAutoFinalEpisode = (releaseDateStr: string) => {
    if (!releaseDateStr) return "1회";
    let targetDate: Date;
    if (releaseDateStr.length === 6 && !releaseDateStr.includes("-")) {
      const yy = "20" + releaseDateStr.slice(0, 2);
      const mm = releaseDateStr.slice(2, 4);
      const dd = releaseDateStr.slice(4, 6);
      targetDate = new Date(`${yy}-${mm}-${dd}`);
    } else {
      targetDate = new Date(releaseDateStr);
    }
    if (isNaN(targetDate.getTime())) return "1회";
    const diffTime = todayDateObj.getTime() - targetDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return "1회";
    const weeks = Math.floor(diffDays / 7) + 1;
    return `${weeks}회`;
  };

  const defaultBookmarks = [
    {
      id: 1,
      category: "웹툰",
      platform: "네이버웹툰",
      title: "메이드 인 코리아",
      regularUpdate: "수요일",
      releaseDate: "260909",
      weeklySchedule: "2회",
      finalEpisode: "4회",
      currentBookmark: 2,
      isCompleted: false,
    }
  ];

  const [bookmarkList, setBookmarkList] = useState<any[]>([]);
  const [isBookmarkLoaded, setIsBookmarkLoaded] = useState(false);
  const [bmarkSortOrder, setBmarkSortOrder] = useState<"default" | "update_asc">("default");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jb_bookmark_reading_list_v6");
      setBookmarkList(saved ? JSON.parse(saved) : defaultBookmarks);
      setIsBookmarkLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isBookmarkLoaded && typeof window !== "undefined") {
      localStorage.setItem("jb_bookmark_reading_list_v6", JSON.stringify(bookmarkList));
    }
  }, [bookmarkList, isBookmarkLoaded]);

  // 등록 폼 상태
  const [newBmarkCategory, setNewBmarkCategory] = useState("");
  const [newBmarkPlatform, setNewBmarkPlatform] = useState("");
  const [newBmarkTitle, setNewBmarkTitle] = useState("");
  const [newBmarkUpdate, setNewBmarkUpdate] = useState("월요일");
  const [newBmarkRelease, setNewBmarkRelease] = useState("");
  const [newBmarkSchedule, setNewBmarkSchedule] = useState("");
  const [newBmarkBookmark, setNewBmarkBookmark] = useState(0);

  const [selectedBmarkCategory, setSelectedBmarkCategory] = useState("전체");
  const [bmarkSearchQuery, setBmarkSearchQuery] = useState("");

  // 수정 상태
  const [editingBmarkId, setEditingBmarkId] = useState<number | null>(null);
  const [editBmarkCategory, setEditBmarkCategory] = useState("");
  const [editBmarkPlatform, setEditBmarkPlatform] = useState("");
  const [editBmarkTitle, setEditBmarkTitle] = useState("");
  const [editBmarkUpdate, setEditBmarkUpdate] = useState("월요일");
  const [editBmarkRelease, setEditBmarkRelease] = useState("");
  const [editBmarkSchedule, setEditBmarkSchedule] = useState("");
  const [editBmarkEpisode, setEditBmarkEpisode] = useState("");
  const [editBmarkBookmark, setEditBmarkBookmark] = useState(0);

  const existingBmarkCategories = useMemo(() => {
    const set = new Set<string>();
    (bookmarkList || []).forEach((b) => {
      if (b.category && b.category.trim()) set.add(b.category.trim());
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b, "ko"));
  }, [bookmarkList]);

  const handleAddBookmark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBmarkTitle.trim()) return;

    const autoEp = calculateAutoFinalEpisode(newBmarkRelease.trim());
    const schedInput = newBmarkSchedule.trim();
    const formattedSchedule = schedInput && !schedInput.includes("회") ? `${schedInput}회` : schedInput || "1회";

    const newEntry = {
      id: Date.now(),
      category: newBmarkCategory.trim() || "웹툰",
      platform: newBmarkPlatform.trim() || "플랫폼",
      title: newBmarkTitle.trim(),
      regularUpdate: newBmarkUpdate || "월요일",
      releaseDate: newBmarkRelease.trim() || "-",
      weeklySchedule: formattedSchedule,
      finalEpisode: autoEp,
      currentBookmark: Number(newBmarkBookmark) || 0,
      isCompleted: false
    };

    setBookmarkList([newEntry, ...bookmarkList]);
    setNewBmarkCategory("");
    setNewBmarkPlatform("");
    setNewBmarkTitle("");
    setNewBmarkUpdate("월요일");
    setNewBmarkRelease("");
    setNewBmarkSchedule("");
    setNewBmarkBookmark(0);
  };

  const startEditBookmark = (item: any) => {
    setEditingBmarkId(item.id);
    setEditBmarkCategory(item.category || "");
    setEditBmarkPlatform(item.platform || "");
    setEditBmarkTitle(item.title || "");
    setEditBmarkUpdate(item.regularUpdate || "월요일");
    setEditBmarkRelease(item.releaseDate || "");
    setEditBmarkSchedule((item.weeklySchedule || "").replace("회", ""));
    setEditBmarkEpisode((item.finalEpisode || "").replace("회", ""));
    setEditBmarkBookmark(item.currentBookmark ?? 0);
  };

  const cancelEditBookmark = () => setEditingBmarkId(null);

  const saveEditBookmark = (id: number) => {
    if (!editBmarkTitle.trim()) return;

    const autoEp = calculateAutoFinalEpisode(editBmarkRelease.trim());
    const schedInput = editBmarkSchedule.trim();
    const formattedSchedule = schedInput && !schedInput.includes("회") ? `${schedInput}회` : schedInput || "1회";
    const finalEpInput = editBmarkEpisode.trim();
    const formattedFinalEp = finalEpInput && !finalEpInput.includes("회") ? `${finalEpInput}회` : finalEpInput || autoEp;

    setBookmarkList((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              category: editBmarkCategory.trim() || "웹툰",
              platform: editBmarkPlatform.trim() || "플랫폼",
              title: editBmarkTitle.trim(),
              regularUpdate: editBmarkUpdate || "월요일",
              releaseDate: editBmarkRelease.trim() || "-",
              weeklySchedule: formattedSchedule,
              finalEpisode: formattedFinalEp,
              currentBookmark: Number(editBmarkBookmark) || 0
            }
          : b
      )
    );
    setEditingBmarkId(null);
  };

  const handleDeleteBookmark = (id: number) => {
    setBookmarkList((prev) => prev.filter((b) => b.id !== id));
  };

  const handleUpdateBookmarkCount = (id: number, delta: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkList((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          const nextVal = Math.max(0, (b.currentBookmark || 0) + delta);
          return { ...b, currentBookmark: nextVal };
        }
        return b;
      })
    );
  };

  const handleToggleCompleted = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkList((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isCompleted: !b.isCompleted } : b))
    );
  };

  // 요일 순서 매핑 (월~일, 완결)
  const dayRankMap: Record<string, number> = {
    "월요일": 1,
    "화요일": 2,
    "수요일": 3,
    "목요일": 4,
    "금요일": 5,
    "토요일": 6,
    "일요일": 7,
    "완결": 8
  };

  const filteredBookmarks = useMemo(() => {
    const list = (bookmarkList || []).filter((b) => {
      const matchCategory = selectedBmarkCategory === "전체" || b.category === selectedBmarkCategory;
      const matchSearch =
        (b.title || "").toLowerCase().includes(bmarkSearchQuery.toLowerCase()) ||
        (b.platform || "").toLowerCase().includes(bmarkSearchQuery.toLowerCase()) ||
        (b.category || "").toLowerCase().includes(bmarkSearchQuery.toLowerCase()) ||
        (b.regularUpdate || "").toLowerCase().includes(bmarkSearchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });

    if (bmarkSortOrder === "update_asc") {
      return list.sort((a, b) => {
        const rankA = dayRankMap[a.regularUpdate] || 99;
        const rankB = dayRankMap[b.regularUpdate] || 99;
        if (rankA !== rankB) return rankA - rankB;
        return (a.title || "").localeCompare(b.title || "", "ko");
      });
    }

    return list.sort((a, b) => (a.title || "").localeCompare(b.title || "", "ko"));
  }, [bookmarkList, selectedBmarkCategory, bmarkSearchQuery, bmarkSortOrder]);

  // ================= 3. 노래책 탭 데이터 =================
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

  // ================= 4. 즐겨찾기 탭 데이터 =================
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
    return "⭐";
  };

  const defaultFavorites = [
    { id: 1, category: "포털", name: "네이버", url: "https://www.naver.com", memo: "뉴스, 지도, 블로그", username: "my_naver_id", pwHint: "초록창12#$" },
  ];

  const [favList, setFavList] = useState<any[]>([]);
  const [isFavLoaded, setIsFavLoaded] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopyUsername = (id: number, username: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!username) return;
    try {
      if (navigator && navigator.clipboard) navigator.clipboard.writeText(username);
    } catch (err) {}
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId((prev) => (prev === id ? null : prev));
    }, 1500);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jb_bookmark_fav_list_v4");
      setFavList(saved ? JSON.parse(saved) : defaultFavorites);
      setIsFavLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isFavLoaded && typeof window !== "undefined") {
      localStorage.setItem("jb_bookmark_fav_list_v4", JSON.stringify(favList));
    }
  }, [favList, isFavLoaded]);

  const [newFavCategory, setNewFavCategory] = useState("");
  const [newFavName, setNewFavName] = useState("");
  const [newFavUrl, setNewFavUrl] = useState("");
  const [newFavMemo, setNewFavMemo] = useState("");
  const [newFavUsername, setNewFavUsername] = useState("");
  const [newFavPwHint, setNewFavPwHint] = useState("");
  const [selectedFavCategory, setSelectedFavCategory] = useState("전체");
  const [favSearchQuery, setFavSearchQuery] = useState("");

  const [editingFavId, setEditingFavId] = useState<number | null>(null);
  const [editFavCategory, setEditFavCategory] = useState("");
  const [editFavName, setEditFavName] = useState("");
  const [editFavUrl, setEditFavUrl] = useState("");
  const [editFavMemo, setEditFavMemo] = useState("");
  const [editFavUsername, setEditFavUsername] = useState("");
  const [editFavPwHint, setEditFavPwHint] = useState("");

  const existingFavCategories = useMemo(() => {
    const set = new Set<string>();
    (favList || []).forEach((f) => {
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
    return (favList || [])
      .filter((fav) => {
        const matchCategory = selectedFavCategory === "전체" || fav.category === selectedFavCategory;
        const matchSearch =
          (fav.name || "").toLowerCase().includes(favSearchQuery.toLowerCase()) ||
          (fav.url || "").toLowerCase().includes(favSearchQuery.toLowerCase()) ||
          (fav.category || "").toLowerCase().includes(favSearchQuery.toLowerCase()) ||
          (fav.memo || "").toLowerCase().includes(favSearchQuery.toLowerCase()) ||
          (fav.username || "").toLowerCase().includes(favSearchQuery.toLowerCase());
        return matchCategory && matchSearch;
      })
      .sort((a, b) => (a.name || "").localeCompare(b.name || "", "ko"));
  }, [favList, selectedFavCategory, favSearchQuery]);

  // ================= 5. 일정 탭 데이터 =================
  const SCHEDULE_SYMBOL_CONFIG = {
    leave: { label: "연차", icon: "🌴", badge: "연차" },
    half_leave: { label: "반차", icon: "🌓", badge: "반차" },
    hair: { label: "헤어", icon: "✂️", badge: "헤어" },
    birthday: { label: "생일", icon: "🎂", badge: "생일" },
    appointment: { label: "약속", icon: "📌", badge: "약속" },
  };

  const SCHEDULE_COLOR_CONFIG = {
    pink: { label: "핑크", class: "bg-pink-100 text-pink-900 border-pink-300", chip: "bg-pink-300" },
    blue: { label: "파랑", class: "bg-blue-100 text-blue-900 border-blue-300", chip: "bg-blue-300" },
    purple: { label: "보라", class: "bg-purple-100 text-purple-900 border-purple-300", chip: "bg-purple-300" },
    yellow: { label: "노랑", class: "bg-amber-100 text-amber-900 border-amber-300", chip: "bg-amber-300" },
    green: { label: "초록", class: "bg-emerald-100 text-emerald-900 border-emerald-300", chip: "bg-emerald-300" },
  };

  const defaultSchedules = [
    { id: 1, date: "2026-09-06", title: "홍대 1주년 카페", symbol: "appointment", color: "pink" },
    { id: 2, date: "2026-09-16", title: "위어스헤어", symbol: "hair", color: "purple" },
    { id: 3, date: "2026-09-16", title: "오후 반차", symbol: "half_leave", color: "green" },
  ];

  const [scheduleList, setScheduleList] = useState<any[]>([]);
  const [isScheduleLoaded, setIsScheduleLoaded] = useState(false);
  const [calYear, setCalYear] = useState(2026);
  const [calMonth, setCalMonth] = useState(9);

  const [modalDate, setModalDate] = useState<string | null>(null);
  const [newSchedTitle, setNewSchedTitle] = useState("");
  const [newSchedSymbol, setNewSchedSymbol] = useState("appointment");
  const [newSchedColor, setNewSchedColor] = useState("pink");

  const [popupEditingId, setPopupEditingId] = useState<number | null>(null);
  const [editPopupTitle, setEditPopupTitle] = useState("");
  const [editPopupSymbol, setEditPopupSymbol] = useState("appointment");
  const [editPopupColor, setEditPopupColor] = useState("pink");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jb_bookmark_calendar_schedules");
      setScheduleList(saved ? JSON.parse(saved) : defaultSchedules);
      setIsScheduleLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isScheduleLoaded && typeof window !== "undefined") {
      localStorage.setItem("jb_bookmark_calendar_schedules", JSON.stringify(scheduleList));
    }
  }, [scheduleList, isScheduleLoaded]);

  const prevMonth = () => {
    if (calMonth === 1) {
      setCalYear(calYear - 1);
      setCalMonth(12);
    } else {
      setCalMonth(calMonth - 1);
    }
  };

  const nextMonth = () => {
    if (calMonth === 12) {
      setCalYear(calYear + 1);
      setCalMonth(1);
    } else {
      setCalMonth(calMonth + 1);
    }
  };

  const calendarGrid = useMemo(() => {
    const firstDayIndex = new Date(calYear, calMonth - 1, 1).getDay();
    const lastDate = new Date(calYear, calMonth, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstDayIndex; i++) cells.push({ day: null, dateStr: "" });
    for (let d = 1; d <= lastDate; d++) {
      const monthStr = String(calMonth).padStart(2, "0");
      const dayStr = String(d).padStart(2, "0");
      cells.push({ day: d, dateStr: `${calYear}-${monthStr}-${dayStr}` });
    }
    while (cells.length % 7 !== 0) cells.push({ day: null, dateStr: "" });
    return cells;
  }, [calYear, calMonth]);

  const handleAddPopupSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalDate || !newSchedTitle.trim()) return;
    const newEntry = { id: Date.now(), date: modalDate, title: newSchedTitle.trim(), symbol: newSchedSymbol, color: newSchedColor };
    setScheduleList((prev) => [...prev, newEntry]);
    setNewSchedTitle("");
  };

  const startPopupEdit = (item: any) => {
    setPopupEditingId(item.id);
    setEditPopupTitle(item.title);
    setEditPopupSymbol(item.symbol || "appointment");
    setEditPopupColor(item.color || "pink");
  };

  const savePopupEdit = (id: number) => {
    if (!editPopupTitle.trim()) return;
    setScheduleList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, title: editPopupTitle.trim(), symbol: editPopupSymbol, color: editPopupColor } : item))
    );
    setPopupEditingId(null);
  };

  const handleDeleteSchedule = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setScheduleList((prev) => prev.filter((item) => item.id !== id));
  };

  const leaveSummary = useMemo(() => {
    const currentYearStr = String(calYear);
    const leaveItems = (scheduleList || []).filter((s) => s.date.startsWith(currentYearStr) && (s.symbol === "leave" || s.symbol === "half_leave"));
    if (leaveItems.length === 0) return null;
    let used = 0;
    leaveItems.forEach((s) => {
      if (s.symbol === "leave") used += 1.0;
      else if (s.symbol === "half_leave") used += 0.5;
    });
    const total = 16.0;
    const remaining = Math.max(0, total - used);
    return { used, remaining: remaining % 1 === 0 ? remaining.toFixed(0) : remaining.toFixed(1), count: leaveItems.length };
  }, [scheduleList, calYear]);

  const birthdaySummary = useMemo(() => {
    const birthdays = (scheduleList || []).filter((s) => s.symbol === "birthday").sort((a, b) => a.date.localeCompare(b.date));
    if (birthdays.length === 0) return null;
    let nextBday = birthdays.find((s) => s.date >= TODAY_STR) || birthdays[birthdays.length - 1];
    const bdayDate = new Date(nextBday.date);
    const diffDays = Math.ceil((bdayDate.getTime() - todayDateObj.getTime()) / (1000 * 60 * 60 * 24));
    return { title: nextBday.title || "생일", date: nextBday.date, dDayText: diffDays === 0 ? "D-Day" : diffDays > 0 ? `D-${diffDays}` : `D+${Math.abs(diffDays)}` };
  }, [scheduleList]);

  const hairSummary = useMemo(() => {
    const hairList = (scheduleList || []).filter((s) => s.symbol === "hair").sort((a, b) => a.date.localeCompare(b.date));
    if (hairList.length === 0) return null;
    const nextHair = hairList.find((s) => s.date > TODAY_STR);
    const pastHairs = hairList.filter((s) => s.date <= TODAY_STR);
    const lastHair = pastHairs.length > 0 ? pastHairs[pastHairs.length - 1] : null;

    if (nextHair) {
      const nDate = new Date(nextHair.date);
      const diffDays = Math.ceil((nDate.getTime() - todayDateObj.getTime()) / (1000 * 60 * 60 * 24));
      return { mode: "next", title: nextHair.title || "이발 예약", date: nextHair.date, displayText: diffDays === 0 ? "오늘 예약" : `D-${diffDays}`, subText: `(예약: ${nextHair.date})` };
    } else if (lastHair) {
      const lDate = new Date(lastHair.date);
      const diffDays = Math.floor((todayDateObj.getTime() - lDate.getTime()) / (1000 * 60 * 60 * 24));
      return { mode: "past", title: "이발 후 경과일 (헤어)", date: lastHair.date, displayText: `+${diffDays}일`, subText: `(${lastHair.date} 기준)` };
    }
    return null;
  }, [scheduleList]);

  const upcomingAppointments = useMemo(() => {
    return (scheduleList || []).filter((s) => s.symbol === "appointment" && s.date >= TODAY_STR).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);
  }, [scheduleList]);

  const hasAnyScheduleSummary = leaveSummary || birthdaySummary || hairSummary || upcomingAppointments.length > 0;

  // 가계부 설정
  const LEDGER_SYMBOL_CONFIG = {
    taxi: { label: "택시", icon: "🚕", badge: "택시" },
    delivery: { label: "배달", icon: "🛵", badge: "배달" },
    convenience: { label: "편의점", icon: "🏪", badge: "편의점" },
    fixed: { label: "고정", icon: "📌", badge: "고정" },
    salary: { label: "월급", icon: "💰", badge: "월급" },
  };

  const LEDGER_COLOR_CONFIG = {
    blue: { label: "파랑", class: "bg-blue-100 text-blue-900 border-blue-300", chip: "bg-blue-300" },
    pink: { label: "핑크", class: "bg-pink-100 text-pink-900 border-pink-300", chip: "bg-pink-300" },
    green: { label: "초록", class: "bg-emerald-100 text-emerald-900 border-emerald-300", chip: "bg-emerald-300" },
    yellow: { label: "노랑", class: "bg-amber-100 text-amber-900 border-amber-300", chip: "bg-amber-300" },
    purple: { label: "보라", class: "bg-purple-100 text-purple-900 border-purple-300", chip: "bg-purple-300" },
  };

  const defaultLedgerEntries = [
    { id: 1, date: "2026-09-05", type: "expense", title: "카카오택시", amount: 14800, symbol: "taxi", color: "yellow" },
    { id: 2, date: "2026-09-10", type: "income", title: "9월 월급", amount: 3200000, symbol: "salary", color: "blue" },
    { id: 3, date: "2026-09-12", type: "expense", title: "배달의민족", amount: 26000, symbol: "delivery", color: "pink" },
    { id: 4, date: "2026-09-01", type: "expense", title: "인터넷", amount: 34000, symbol: "fixed", color: "pink" },
    { id: 5, date: "2026-09-17", type: "expense", title: "GS25 편의점", amount: 6200, symbol: "convenience", color: "green" },
  ];
  const defaultFixedTemplates = [{ id: "fixed_tpl_1", title: "인터넷", color: "pink" }];

  const [ledgerEntries, setLedgerEntries] = useState<any[]>([]);
  const [fixedTemplates, setFixedTemplates] = useState<any[]>([]);
  const [isLedgerLoaded, setIsLedgerLoaded] = useState(false);
  const [ledgerYear, setLedgerYear] = useState(2026);
  const [ledgerMonth, setLedgerMonth] = useState(9);
  const [ledgerModalDate, setLedgerModalDate] = useState<string | null>(null);
  const [newLedgerTitle, setNewLedgerTitle] = useState("");
  const [newLedgerAmount, setNewLedgerAmount] = useState("");
  const [newLedgerType, setNewLedgerType] = useState<"expense" | "income">("expense");
  const [newLedgerSymbol, setNewLedgerSymbol] = useState("fixed");
  const [newLedgerColor, setNewLedgerColor] = useState("pink");
  const [ledgerEditingId, setLedgerEditingId] = useState<number | null>(null);
  const [editLedgerTitle, setEditLedgerTitle] = useState("");
  const [editLedgerAmount, setEditLedgerAmount] = useState("");
  const [editLedgerType, setEditLedgerType] = useState<"expense" | "income">("expense");
  const [editLedgerSymbol, setEditLedgerSymbol] = useState("fixed");
  const [editLedgerColor, setEditLedgerColor] = useState("pink");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEntries = localStorage.getItem("jb_bookmark_calendar_ledgers_v4");
      const savedTemplates = localStorage.getItem("jb_bookmark_fixed_templates_v2");
      setLedgerEntries(savedEntries ? JSON.parse(savedEntries) : defaultLedgerEntries);
      setFixedTemplates(savedTemplates ? JSON.parse(savedTemplates) : defaultFixedTemplates);
      setIsLedgerLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLedgerLoaded && typeof window !== "undefined") {
      localStorage.setItem("jb_bookmark_calendar_ledgers_v4", JSON.stringify(ledgerEntries));
      localStorage.setItem("jb_bookmark_fixed_templates_v2", JSON.stringify(fixedTemplates));
    }
  }, [ledgerEntries, fixedTemplates, isLedgerLoaded]);

  const prevLedgerMonth = () => {
    if (ledgerMonth === 1) {
      setLedgerYear(ledgerYear - 1);
      setLedgerMonth(12);
    } else {
      setLedgerMonth(ledgerMonth - 1);
    }
  };

  const nextLedgerMonth = () => {
    if (ledgerMonth === 12) {
      setLedgerYear(ledgerYear + 1);
      setLedgerMonth(1);
    } else {
      setLedgerMonth(ledgerMonth + 1);
    }
  };

  const ledgerCalendarGrid = useMemo(() => {
    const firstDayIndex = new Date(ledgerYear, ledgerMonth - 1, 1).getDay();
    const lastDate = new Date(ledgerYear, ledgerMonth, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstDayIndex; i++) cells.push({ day: null, dateStr: "" });
    for (let d = 1; d <= lastDate; d++) {
      const monthStr = String(ledgerMonth).padStart(2, "0");
      const dayStr = String(d).padStart(2, "0");
      cells.push({ day: d, dateStr: `${ledgerYear}-${monthStr}-${dayStr}` });
    }
    while (cells.length % 7 !== 0) cells.push({ day: null, dateStr: "" });
    return cells;
  }, [ledgerYear, ledgerMonth]);

  const handleAddLedgerEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ledgerModalDate || !newLedgerTitle.trim() || !newLedgerAmount) return;
    const trimmedTitle = newLedgerTitle.trim();
    const newEntry = {
      id: Date.now(),
      date: ledgerModalDate,
      title: trimmedTitle,
      amount: Number(newLedgerAmount),
      type: newLedgerType,
      symbol: newLedgerSymbol,
      color: newLedgerColor
    };
    setLedgerEntries((prev) => [...prev, newEntry]);
    if (newLedgerSymbol === "fixed") {
      setFixedTemplates((prev) => {
        if (!prev.some((tpl) => tpl.title === trimmedTitle)) {
          return [...prev, { id: `fixed_tpl_${Date.now()}`, title: trimmedTitle, color: newLedgerColor }];
        }
        return prev;
      });
    }
    setNewLedgerTitle("");
    setNewLedgerAmount("");
  };

  const startLedgerEdit = (item: any) => {
    setLedgerEditingId(item.id);
    setEditLedgerTitle(item.title);
    setEditLedgerAmount(String(item.amount));
    setEditLedgerType(item.type || "expense");
    setEditLedgerSymbol(item.symbol || "fixed");
    setEditLedgerColor(item.color || "pink");
  };

  const saveLedgerEdit = (id: number) => {
    if (!editLedgerTitle.trim() || !editLedgerAmount) return;
    const trimmedTitle = editLedgerTitle.trim();
    setLedgerEntries((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, title: trimmedTitle, amount: Number(editLedgerAmount), type: editLedgerType, symbol: editLedgerSymbol, color: editLedgerColor } : item
      )
    );
    if (editLedgerSymbol === "fixed") {
      setFixedTemplates((prev) => {
        if (!prev.some((tpl) => tpl.title === trimmedTitle)) {
          return [...prev, { id: `fixed_tpl_${Date.now()}`, title: trimmedTitle, color: editLedgerColor }];
        }
        return prev;
      });
    }
    setLedgerEditingId(null);
  };

  const handleDeleteLedgerEntry = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLedgerEntries((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDeleteFixedTemplate = (titleToDelete: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFixedTemplates((prev) => prev.filter((tpl) => tpl.title !== titleToDelete));
    setLedgerEntries((prev) => prev.filter((item) => !(item.symbol === "fixed" && item.title === titleToDelete)));
  };

  const currentMonthLedgerSummary = useMemo(() => {
    const prefix = `${ledgerYear}-${String(ledgerMonth).padStart(2, "0")}`;
    const monthlyList = (ledgerEntries || []).filter((item) => item.date.startsWith(prefix));
    let income = 0;
    let expense = 0;
    let taxiTotal = 0;
    let deliveryTotal = 0;
    monthlyList.forEach((item) => {
      const amt = Number(item.amount || 0);
      if (item.type === "income") income += amt;
      else {
        expense += amt;
        if (item.symbol === "taxi") taxiTotal += amt;
        if (item.symbol === "delivery") deliveryTotal += amt;
      }
    });
    const fixedItems = (fixedTemplates || []).map((tpl) => {
      const found = monthlyList.find((item) => item.symbol === "fixed" && item.title === tpl.title);
      return { tplTitle: tpl.title, color: tpl.color || "pink", entry: found || null };
    });
    return { income, expense, balance: income - expense, taxiTotal, deliveryTotal, fixedItems, count: monthlyList.length };
  }, [ledgerEntries, fixedTemplates, ledgerYear, ledgerMonth]);

  const openFixedExpenseModal = (fixedItemObj?: any) => {
    setLedgerEditingId(null);
    if (fixedItemObj && fixedItemObj.entry) {
      setLedgerModalDate(fixedItemObj.entry.date);
    } else {
      const defaultDate = `${ledgerYear}-${String(ledgerMonth).padStart(2, "0")}-01`;
      setLedgerModalDate(defaultDate);
      if (fixedItemObj) {
        setNewLedgerTitle(fixedItemObj.tplTitle);
        setNewLedgerAmount("");
        setNewLedgerSymbol("fixed");
        setNewLedgerType("expense");
        setNewLedgerColor(fixedItemObj.color || "pink");
      } else {
        setNewLedgerTitle("");
        setNewLedgerAmount("");
        setNewLedgerSymbol("fixed");
        setNewLedgerType("expense");
        setNewLedgerColor("pink");
      }
    }
  };

  // ================= 7. 플레이리스트 & 시계 =================
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

  const likedSongs = (songList || []).filter((s) => s.liked);
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

        {/* [2] 중앙 내용 영역 (세로 높이 h-[760px] 고정) */}
        <section className="flex-1 w-full h-[760px] min-w-0 flex flex-col">
          
          {/* ==================== 1. [책갈피] 탭 화면 ==================== */}
          {currentTab === "bookmarks" && (
            <div className="h-full overflow-y-auto flex flex-col gap-2.5 pr-1">
              
              {/* 등록 바 (가로 비율 최적화 완료) */}
              <form onSubmit={handleAddBookmark} className="border-2 border-amber-400/90 rounded-2xl p-3 flex flex-wrap items-center gap-1.5 bg-amber-50/40 backdrop-blur-[2px] shadow-sm shrink-0">
                <input
                  type="text"
                  list="bmark-category-suggestions"
                  value={newBmarkCategory}
                  onChange={(e) => setNewBmarkCategory(e.target.value)}
                  placeholder="분류 (예: 웹툰)"
                  className="w-20 border border-amber-300 bg-white/90 rounded-lg px-2 py-1.5 text-xs font-medium text-amber-950 focus:outline-none focus:border-amber-500 placeholder-neutral-400"
                />
                <datalist id="bmark-category-suggestions">
                  {existingBmarkCategories.map((c) => (<option key={c} value={c} />))}
                </datalist>

                <input
                  type="text"
                  value={newBmarkPlatform}
                  onChange={(e) => setNewBmarkPlatform(e.target.value)}
                  placeholder="플랫폼"
                  className="w-20 border border-amber-300 bg-white/90 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-amber-500 placeholder-neutral-500 font-medium"
                />

                <input
                  type="text"
                  required
                  value={newBmarkTitle}
                  onChange={(e) => setNewBmarkTitle(e.target.value)}
                  placeholder="제목 *"
                  className="flex-1 min-w-[130px] border border-amber-300 bg-white/90 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-amber-500 placeholder-neutral-500 font-bold"
                />

                <select
                  value={newBmarkUpdate}
                  onChange={(e) => setNewBmarkUpdate(e.target.value)}
                  className="w-24 border border-amber-300 bg-white/90 rounded-lg px-2 py-1.5 text-xs font-bold text-amber-950 focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="월요일">월요일</option>
                  <option value="화요일">화요일</option>
                  <option value="수요일">수요일</option>
                  <option value="목요일">목요일</option>
                  <option value="금요일">금요일</option>
                  <option value="토요일">토요일</option>
                  <option value="일요일">일요일</option>
                  <option value="완결">완결</option>
                </select>

                <input
                  type="text"
                  value={newBmarkRelease}
                  onChange={(e) => setNewBmarkRelease(e.target.value)}
                  placeholder="공개일"
                  className="w-20 border border-amber-300 bg-white/90 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-amber-500 placeholder-neutral-500 font-medium"
                />

                <input
                  type="text"
                  value={newBmarkSchedule}
                  onChange={(e) => setNewBmarkSchedule(e.target.value)}
                  placeholder="주간편성"
                  className="w-18 border border-amber-300 bg-white/90 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-amber-500 placeholder-neutral-500 font-medium"
                />

                <input
                  type="number"
                  min="0"
                  value={newBmarkBookmark}
                  onChange={(e) => setNewBmarkBookmark(Number(e.target.value))}
                  placeholder="회차"
                  className="w-16 border border-amber-300 bg-white/90 rounded-lg px-1.5 py-1.5 text-xs focus:outline-none focus:border-amber-500 placeholder-neutral-500 font-medium"
                />

                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs px-4 py-2 rounded-lg transition shrink-0 shadow-sm flex items-center gap-1 ml-auto"
                >
                  <Plus className="w-3.5 h-3.5" /> 추가
                </button>
              </form>

              {/* 검색 및 분류 필터 */}
              <div className="border-2 border-amber-400/90 rounded-2xl p-3 bg-amber-50/40 backdrop-blur-[2px] shadow-sm flex flex-col gap-2 shrink-0">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={bmarkSearchQuery}
                    onChange={(e) => setBmarkSearchQuery(e.target.value)}
                    placeholder="제목, 플랫폼, 분류, 정기업데이트를 검색해보세요..."
                    className="w-full border border-amber-300 bg-white/90 rounded-xl pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-amber-500 placeholder-neutral-500 font-medium"
                  />
                  <Search className="w-3.5 h-3.5 text-amber-600/70 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                <div className="flex items-center gap-1.5 text-xs flex-wrap pt-0.5">
                  <span className="text-amber-950 font-semibold text-[11px] mr-1">분류:</span>
                  <button
                    onClick={() => setSelectedBmarkCategory("전체")}
                    className={`px-2.5 py-0.5 rounded-full border text-[11px] transition font-medium ${
                      selectedBmarkCategory === "전체"
                        ? "border-amber-500 bg-amber-200 text-amber-950 font-bold shadow-2xs"
                        : "border-amber-300/80 bg-white/70 text-neutral-700 hover:bg-white"
                    }`}
                  >
                    전체
                  </button>
                  {existingBmarkCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedBmarkCategory(cat)}
                      className={`px-2.5 py-0.5 rounded-full border text-[11px] transition font-medium ${
                        selectedBmarkCategory === cat
                          ? "border-amber-500 bg-amber-200 text-amber-950 font-bold shadow-2xs"
                          : "border-amber-300/80 bg-white/70 text-neutral-700 hover:bg-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                  <span className="ml-auto text-[11px] text-amber-800/80 font-medium">
                    총 {filteredBookmarks.length}개의 항목
                  </span>
                </div>
              </div>

              {/* 헤더 박스 (분류 클릭 시 1차 정기업데이트, 2차 가나다순 정렬 토글 기능 추가) */}
              <div className="border-2 border-amber-400/90 rounded-xl px-3 py-2.5 bg-amber-100/70 backdrop-blur-[2px] shadow-sm shrink-0">
                <div className="grid grid-cols-12 gap-1 text-[11px] font-extrabold text-amber-950 items-center text-center">
                  <span 
                    onClick={() => setBmarkSortOrder((prev) => prev === "default" ? "update_asc" : "default")}
                    className="col-span-2 cursor-pointer hover:text-amber-700 transition flex items-center justify-center gap-0.5"
                    title="클릭 시 정기업데이트(월~일) 순서로 정렬됩니다"
                  >
                    <span>분류 / 플랫폼</span>
                    <ArrowUpDown className="w-3 h-3 text-amber-800" />
                  </span>
                  <span className="col-span-3">제목</span>
                  <span className="col-span-2">정기업데이트</span>
                  <span className="col-span-1">공개일</span>
                  <span className="col-span-1">주간편성</span>
                  <span className="col-span-1">최종회차</span>
                  <span className="col-span-1">책갈피 (+/-)</span>
                  <span className="col-span-1">관리</span>
                </div>
              </div>

              {/* 리스트 */}
              <div className="flex flex-col gap-2">
                {filteredBookmarks.map((bmark) => {
                  const isEditing = editingBmarkId === bmark.id;

                  const finalEpNum = parseInt(String(bmark.finalEpisode).replace(/[^0-9]/g, "")) || 0;
                  const currentBmNum = Number(bmark.currentBookmark) || 0;

                  // 배경색 판정 로직
                  let cardBgClass = "bg-amber-50/40 hover:bg-amber-50/70 border-amber-400/90 text-neutral-900";
                  if (bmark.isCompleted) {
                    cardBgClass = "bg-rose-100/70 hover:bg-rose-100 border-rose-300 text-neutral-900";
                  } else if (currentBmNum === 0) {
                    cardBgClass = "bg-amber-100/80 hover:bg-amber-100 border-amber-300 text-neutral-900";
                  } else if (currentBmNum < finalEpNum) {
                    cardBgClass = "bg-pink-50/70 hover:bg-pink-50 border-pink-300 text-neutral-900";
                  }

                  if (isEditing) {
                    return (
                      <div
                        key={`edit-bmark-${bmark.id}`}
                        className="p-3 rounded-2xl border-2 border-amber-400 bg-amber-50/90 shadow-md flex flex-wrap items-center gap-1.5"
                      >
                        {/* 수정할 때도 상단 제목 이름 아래와 정확히 일치하도록 배치 */}
                        <input type="text" value={editBmarkCategory} onChange={(e) => setEditBmarkCategory(e.target.value)} placeholder="분류" className="w-16 border border-amber-300 bg-white rounded-lg px-2 py-1 text-xs font-medium" />
                        <input type="text" value={editBmarkPlatform} onChange={(e) => setEditBmarkPlatform(e.target.value)} placeholder="플랫폼" className="w-20 border border-amber-300 bg-white rounded-lg px-2 py-1 text-xs font-medium" />
                        <input type="text" required value={editBmarkTitle} onChange={(e) => setEditBmarkTitle(e.target.value)} placeholder="제목" className="w-28 border border-amber-300 bg-white rounded-lg px-2 py-1 text-xs font-bold" />
                        <select value={editBmarkUpdate} onChange={(e) => setEditBmarkUpdate(e.target.value)} className="w-24 border border-amber-300 bg-white rounded-lg px-2 py-1 text-xs font-bold">
                          <option value="월요일">월요일</option>
                          <option value="화요일">화요일</option>
                          <option value="수요일">수요일</option>
                          <option value="목요일">목요일</option>
                          <option value="금요일">금요일</option>
                          <option value="토요일">토요일</option>
                          <option value="일요일">일요일</option>
                          <option value="완결">완결</option>
                        </select>
                        <input type="text" value={editBmarkRelease} onChange={(e) => setEditBmarkRelease(e.target.value)} placeholder="공개일" className="w-16 border border-amber-300 bg-white rounded-lg px-2 py-1 text-xs" />
                        <input type="text" value={editBmarkSchedule} onChange={(e) => setEditBmarkSchedule(e.target.value)} placeholder="주간편성" className="w-16 border border-amber-300 bg-white rounded-lg px-2 py-1 text-xs" />
                        <input type="text" value={editBmarkEpisode} onChange={(e) => setEditBmarkEpisode(e.target.value)} placeholder="최종회" className="w-16 border border-amber-300 bg-white rounded-lg px-2 py-1 text-xs" />
                        <input type="number" min="0" value={editBmarkBookmark} onChange={(e) => setEditBmarkBookmark(Number(e.target.value))} placeholder="회차" className="w-14 border border-amber-300 bg-white rounded-lg px-1 py-1 text-xs" />
                        
                        <div className="flex items-center gap-1 shrink-0 ml-auto">
                          <button onClick={() => saveEditBookmark(bmark.id)} className="p-1.5 rounded-lg bg-amber-500 text-white font-bold text-xs flex items-center gap-0.5"><Check className="w-3.5 h-3.5" /> 저장</button>
                          <button onClick={cancelEditBookmark} className="p-1.5 rounded-lg border border-neutral-300 bg-white text-neutral-600 text-xs"><X className="w-3.5 h-3.5" /> 취소</button>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={bmark.id}
                      className={`grid grid-cols-12 gap-1 items-center text-[11px] p-2.5 rounded-2xl border-2 transition shadow-2xs text-center ${cardBgClass}`}
                    >
                      {/* 1. 분류 / 플랫폼 */}
                      <div className="col-span-2 flex flex-col items-center justify-center">
                        <span className="px-2 py-0.5 rounded-md bg-amber-100/90 text-amber-950 border border-amber-300 font-bold shadow-2xs">
                          {bmark.category}
                        </span>
                        <span className="text-[10px] text-neutral-600 font-semibold mt-0.5">{bmark.platform}</span>
                      </div>

                      {/* 2. 제목 */}
                      <div className="col-span-3 text-neutral-900 font-black truncate px-1" title={bmark.title}>
                        {bmark.title}
                      </div>

                      {/* 3. 정기업데이트 */}
                      <div className="col-span-2 text-neutral-800 truncate px-1 font-semibold">
                        {bmark.regularUpdate}
                      </div>

                      {/* 4. 공개일 */}
                      <div className="col-span-1 text-neutral-600 truncate font-mono font-medium">
                        {bmark.releaseDate}
                      </div>

                      {/* 5. 주간편성 */}
                      <div className="col-span-1 text-neutral-700 truncate font-bold">
                        {bmark.weeklySchedule}
                      </div>

                      {/* 6. 최종회차 */}
                      <div className="col-span-1 text-neutral-900 font-black truncate font-mono">
                        {bmark.finalEpisode || calculateAutoFinalEpisode(bmark.releaseDate)}
                      </div>

                      {/* 7. 책갈피 (+ / - 회차 조절) */}
                      <div className="col-span-1 flex items-center justify-center gap-0.5 font-mono font-bold">
                        <button
                          onClick={(e) => handleUpdateBookmarkCount(bmark.id, -1, e)}
                          className="w-5 h-5 rounded bg-white/90 border border-amber-300 hover:bg-amber-200 text-amber-950 flex items-center justify-center shadow-2xs transition active:scale-95"
                          title="1화 감소"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="min-w-[24px] text-center text-neutral-900 font-black">
                          {bmark.currentBookmark ?? 0}
                        </span>
                        <button
                          onClick={(e) => handleUpdateBookmarkCount(bmark.id, 1, e)}
                          className="w-5 h-5 rounded bg-white/90 border border-amber-300 hover:bg-amber-200 text-amber-950 flex items-center justify-center shadow-2xs transition active:scale-95"
                          title="1화 증가"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* 8. 완결 버튼 및 관리 */}
                      <div className="col-span-1 flex items-center justify-center gap-1">
                        <button
                          onClick={(e) => handleToggleCompleted(bmark.id, e)}
                          className={`px-1.5 py-0.5 rounded text-[10px] font-black border transition ${
                            bmark.isCompleted
                              ? "bg-rose-600 text-white border-rose-700 shadow-xs"
                              : "bg-white/80 text-neutral-700 border-amber-300 hover:bg-amber-100"
                          }`}
                          title="완결 여부 토글"
                        >
                          완결
                        </button>
                        <button onClick={() => startEditBookmark(bmark)} title="수정" className="p-1 rounded text-neutral-500 hover:text-amber-900 hover:bg-white transition"><Pencil className="w-3 h-3" /></button>
                        <button onClick={() => handleDeleteBookmark(bmark.id)} title="삭제" className="p-1 rounded text-neutral-500 hover:text-rose-600 hover:bg-white transition"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </div>
                  );
                })}

                {filteredBookmarks.length === 0 && (
                  <div className="border-2 border-dashed border-amber-300 rounded-2xl p-12 text-center text-xs font-medium text-amber-800/70 bg-amber-50/20">
                    등록되었거나 조건에 맞는 책갈피 기록이 없습니다.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ==================== 2. [노래책] 탭 화면 ==================== */}
          {currentTab === "songs" && (
            <div className="h-full overflow-y-auto flex flex-col gap-2.5 pr-1">
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

              <div className="border border-emerald-400 rounded-xl px-4 py-2.5 bg-emerald-100/60 backdrop-blur-[2px] shadow-sm shrink-0">
                <div className="grid grid-cols-12 gap-2 text-xs font-extrabold text-emerald-900 items-center">
                  <span className="col-span-2 flex items-center justify-center gap-1 text-center">🏷️ 장르</span>
                  <span className="col-span-4 flex items-center justify-center gap-1 text-center">🎤 가수 / 아티스트</span>
                  <span className="col-span-3 flex items-center justify-center gap-1 text-center">🎵 곡명</span>
                  <span className="col-span-1 flex items-center justify-center gap-1 text-center">🎬 영상</span>
                  <span className="col-span-2 flex items-center justify-center text-center">관리</span>
                </div>
              </div>

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
                      className={`grid grid-cols-12 gap-2 items-center text-xs p-3 rounded-2xl border transition shadow-sm ${
                        isPlayingThis
                          ? "bg-emerald-100/90 border-emerald-500 ring-2 ring-emerald-300"
                          : "bg-emerald-50/40 border-emerald-400 hover:border-emerald-500 hover:bg-emerald-50/70"
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
                            onClick={() => setVideoModalUrl(song.url)}
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

              {videoModalUrl && (
                <div 
                  className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                  onClick={() => setVideoModalUrl(null)}
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
                        <button onClick={() => setVideoModalUrl(null)} className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                      <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeId(videoModalUrl)}?autoplay=1`}
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
          )}

          {/* ==================== 3. [즐겨찾기] 탭 화면 ==================== */}
          {currentTab === "favorites" && (
            <div className="h-full overflow-y-auto flex flex-col gap-2.5 pr-1">
              <form onSubmit={handleAddFav} className="border-2 border-purple-400/80 rounded-2xl p-3 flex flex-wrap items-center gap-2 bg-purple-50/40 backdrop-blur-[2px] shadow-sm shrink-0">
                <div className="relative">
                  <input
                    type="text"
                    list="fav-category-suggestions"
                    value={newFavCategory}
                    onChange={(e) => setNewFavCategory(e.target.value)}
                    placeholder="분류 (예: 포털)"
                    className="w-24 border border-purple-200 bg-white/90 rounded-lg px-2.5 py-1.5 text-xs font-medium text-purple-950 focus:outline-none focus:border-purple-500 placeholder-neutral-400"
                  />
                  <datalist id="fav-category-suggestions">
                    {existingFavCategories.map((c) => (<option key={c} value={c} />))}
                  </datalist>
                </div>

                <input
                  type="text"
                  required
                  value={newFavName}
                  onChange={(e) => setNewFavName(e.target.value)}
                  placeholder="사이트명 *"
                  className="w-32 border border-purple-200 bg-white/90 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-purple-500 placeholder-neutral-500 font-bold"
                />

                <input
                  type="text"
                  required
                  value={newFavUrl}
                  onChange={(e) => setNewFavUrl(e.target.value)}
                  placeholder="URL 주소 (https://...)*"
                  className="flex-1 min-w-[150px] border border-purple-200 bg-white/90 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-purple-500 placeholder-neutral-500 font-medium"
                />

                <input
                  type="text"
                  value={newFavMemo}
                  onChange={(e) => setNewFavMemo(e.target.value)}
                  placeholder="메모"
                  className="w-28 border border-purple-200 bg-white/90 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-purple-500 placeholder-neutral-500 font-medium"
                />

                <input
                  type="text"
                  value={newFavUsername}
                  onChange={(e) => setNewFavUsername(e.target.value)}
                  placeholder="아이디"
                  className="w-24 border border-purple-200 bg-white/90 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-purple-500 placeholder-neutral-500 font-medium"
                />

                <input
                  type="text"
                  value={newFavPwHint}
                  onChange={(e) => setNewFavPwHint(e.target.value)}
                  placeholder="비번 힌트"
                  className="w-24 border border-purple-200 bg-white/90 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-purple-500 placeholder-neutral-500 font-medium"
                />

                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs px-4 py-2 rounded-lg transition shrink-0 shadow-sm flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> 추가
                </button>
              </form>

              <div className="border-2 border-purple-400/80 rounded-2xl p-3 bg-purple-50/40 backdrop-blur-[2px] shadow-sm flex flex-col gap-2 shrink-0">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={favSearchQuery}
                    onChange={(e) => setFavSearchQuery(e.target.value)}
                    placeholder="사이트명, 분류, 메모, 아이디를 검색해보세요..."
                    className="w-full border border-purple-200 bg-white/90 rounded-xl pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-purple-500 placeholder-neutral-500 font-medium"
                  />
                  <Search className="w-3.5 h-3.5 text-purple-600/70 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                <div className="flex items-center gap-1.5 text-xs flex-wrap pt-0.5">
                  <span className="text-purple-950 font-semibold text-[11px] mr-1">분류:</span>
                  <button
                    onClick={() => setSelectedFavCategory("전체")}
                    className={`px-2.5 py-0.5 rounded-full border text-[11px] transition font-medium ${
                      selectedFavCategory === "전체"
                        ? "border-purple-500 bg-purple-200 text-purple-950 font-bold shadow-2xs"
                        : "border-purple-200/80 bg-white/70 text-neutral-700 hover:bg-white"
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
                          ? "border-purple-500 bg-purple-200 text-purple-950 font-bold shadow-2xs"
                          : "border-purple-200/80 bg-white/70 text-neutral-700 hover:bg-white"
                      }`}
                    >
                      {getCategoryIcon(cat)} {cat}
                    </button>
                  ))}
                  <span className="ml-auto text-[11px] text-purple-800/80 font-medium">
                    총 {filteredFavs.length}개 사이트
                  </span>
                </div>
              </div>

              <div className="border-2 border-purple-400/80 rounded-xl px-4 py-2.5 bg-purple-100/70 backdrop-blur-[2px] shadow-sm shrink-0">
                <div className="grid grid-cols-12 gap-2 text-xs font-extrabold text-purple-950 items-center text-center">
                  <span className="col-span-2">🏷️ 분류</span>
                  <span className="col-span-3">🌐 사이트명</span>
                  <span className="col-span-1">바로가기</span>
                  <span className="col-span-2">📝 메모</span>
                  <span className="col-span-2">🔐 계정 정보 (클릭시 ID복사 / 힌트)</span>
                  <span className="col-span-2">관리</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {filteredFavs.map((fav) => {
                  const isEditing = editingFavId === fav.id;
                  const isCopied = copiedId === fav.id;
                  const catIcon = getCategoryIcon(fav.category);

                  if (isEditing) {
                    return (
                      <div
                        key={`edit-fav-${fav.id}`}
                        className="p-3 rounded-2xl border-2 border-purple-400 bg-purple-50/90 shadow-md flex flex-wrap items-center gap-2"
                      >
                        <input type="text" value={editFavCategory} onChange={(e) => setEditFavCategory(e.target.value)} placeholder="분류" className="w-20 border border-purple-300 bg-white rounded-lg px-2 py-1.5 text-xs font-medium text-purple-950 focus:outline-none focus:border-purple-600" />
                        <input type="text" required value={editFavName} onChange={(e) => setEditFavName(e.target.value)} placeholder="사이트 이름" className="w-28 border border-purple-300 bg-white rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-purple-600 font-bold" />
                        <input type="text" required value={editFavUrl} onChange={(e) => setEditFavUrl(e.target.value)} placeholder="웹사이트 URL" className="flex-1 min-w-[140px] border border-purple-300 bg-white rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-purple-600 font-medium" />
                        <input type="text" value={editFavMemo} onChange={(e) => setEditFavMemo(e.target.value)} placeholder="메모" className="w-28 border border-purple-300 bg-white rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-purple-600 font-medium" />
                        <input type="text" value={editFavUsername} onChange={(e) => setEditFavUsername(e.target.value)} placeholder="아이디" className="w-24 border border-purple-300 bg-white rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-purple-600 font-medium" />
                        <input type="text" value={editFavPwHint} onChange={(e) => setEditFavPwHint(e.target.value)} placeholder="비번 힌트" className="w-24 border border-purple-300 bg-white rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-purple-600 font-medium" />
                        <div className="flex items-center gap-1 shrink-0 ml-auto">
                          <button onClick={() => saveEditFav(fav.id)} title="저장" className="p-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition"><Check className="w-3.5 h-3.5" /> 저장</button>
                          <button onClick={cancelEditFav} title="취소" className="p-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-600 text-xs flex items-center gap-1 shadow-sm transition"><X className="w-3.5 h-3.5" /> 취소</button>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={fav.id}
                      className="grid grid-cols-12 gap-2 items-center text-xs p-3 rounded-2xl border-2 border-purple-400/80 bg-purple-50/40 hover:bg-purple-50/70 transition shadow-2xs"
                    >
                      <div className="col-span-2 flex justify-center">
                        <span className="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-900 border border-purple-300 text-[11px] font-bold text-center flex items-center gap-1 shadow-2xs">
                          <span>{catIcon}</span>
                          <span>{fav.category}</span>
                        </span>
                      </div>
                      <div className="col-span-3 text-neutral-900 truncate font-black text-[13px] text-center px-1">{fav.name}</div>
                      <div className="col-span-1 flex justify-center">
                        <a href={fav.url} target="_blank" rel="noreferrer" className="px-2 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-[11px] flex items-center gap-1 shadow-2xs transition active:scale-95" title={`${fav.name} 바로가기`}>
                          <ExternalLink className="w-3 h-3" />
                          <span>이동</span>
                        </a>
                      </div>
                      <div className="col-span-2 text-neutral-600 truncate text-[11px] px-1 text-center font-medium">{fav.memo || <span className="text-neutral-300">-</span>}</div>
                      <div className="col-span-2 flex flex-col items-center justify-center gap-1 px-1 overflow-hidden">
                        {fav.username ? (
                          <button onClick={(e) => handleCopyUsername(fav.id, fav.username, e)} className={`flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border transition active:scale-95 max-w-full ${isCopied ? "bg-emerald-100 text-emerald-800 border-emerald-300 font-bold" : "bg-white/90 hover:bg-purple-100/80 text-neutral-800 border-purple-200/80"}`} title="클릭하여 아이디 복사">
                            {isCopied ? (<><Check className="w-3 h-3 text-emerald-600 shrink-0" /><span className="text-emerald-700 font-bold">복사됨!</span></>) : (<><User className="w-2.5 h-2.5 text-purple-700 shrink-0" /><span className="truncate">{fav.username}</span><Copy className="w-2.5 h-2.5 opacity-50 shrink-0 ml-0.5" /></>)}
                          </button>
                        ) : null}
                        {fav.pwHint ? (
                          <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-600 bg-purple-100/60 px-1.5 py-0.2 rounded border border-purple-200/90 truncate max-w-full cursor-help group" title="마우스를 올리면 비밀번호 힌트가 보입니다">
                            <Key className="w-2.5 h-2.5 text-purple-700 shrink-0" />
                            <span className="filter blur-[3px] group-hover:blur-none transition-all duration-200 select-none group-hover:select-text text-purple-950 font-bold">{fav.pwHint}</span>
                          </div>
                        ) : null}
                        {!fav.username && !fav.pwHint && <span className="text-[10px] text-neutral-300">-</span>}
                      </div>
                      <div className="col-span-2 flex items-center justify-center gap-1.5">
                        <button onClick={() => startEditFav(fav)} title="수정" className="p-1.5 rounded-lg text-neutral-400 hover:text-purple-800 hover:bg-white transition"><Pencil className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleDeleteFav(fav.id)} title="삭제" className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-500 hover:bg-white transition"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  );
                })}

                {filteredFavs.length === 0 && (
                  <div className="border-2 border-dashed border-purple-300 rounded-2xl p-12 text-center text-xs font-medium text-purple-800/70 bg-purple-50/20">
                    등록되었거나 조건에 맞는 즐겨찾기 사이트가 없습니다.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================== 4. [일정] 탭 화면 ==================== */}
          {currentTab === "schedule" && (
            <div className="h-full flex flex-col gap-3">
              <div className="border-2 border-pink-400/80 rounded-2xl bg-white/95 backdrop-blur-md px-5 py-3 shadow-sm flex items-center justify-between shrink-0">
                <div className="flex-1 flex items-center justify-between pr-6 border-r border-pink-200">
                  <button onClick={prevMonth} className="px-4 py-1.5 rounded-xl border border-pink-400 text-pink-700 hover:bg-pink-50 font-bold text-xs transition">&lt; 이전달</button>
                  <h2 className="text-lg font-black text-pink-950 tracking-tight flex items-center gap-2">
                    <span>🗓️</span>
                    <span>{calYear}년 {calMonth}월 일정표</span>
                  </h2>
                  <button onClick={nextMonth} className="px-4 py-1.5 rounded-xl border border-pink-400 text-pink-700 hover:bg-pink-50 font-bold text-xs transition">다음달 &gt;</button>
                </div>
                <div className="w-[280px] pl-6 flex items-center gap-1.5 text-sm font-extrabold text-pink-900">
                  <span>📌</span>
                  <span>일정 요약</span>
                </div>
              </div>

              <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-3 items-stretch">
                <div className="flex-1 h-full border-2 border-pink-400/80 rounded-2xl bg-white/95 backdrop-blur-md p-4 shadow-sm flex flex-col justify-between overflow-hidden">
                  <div className="grid grid-cols-7 text-center font-bold text-xs pb-2 border-b border-pink-100 text-neutral-700 shrink-0">
                    <span className="text-rose-600 font-extrabold">일</span>
                    <span>월</span>
                    <span>화</span>
                    <span>수</span>
                    <span>목</span>
                    <span>금</span>
                    <span className="text-blue-600 font-extrabold">토</span>
                  </div>

                  <div className="flex-1 grid grid-cols-7 grid-rows-5 gap-2 pt-2 min-h-0">
                    {calendarGrid.map((cell, idx) => {
                      if (!cell.day) return <div key={`empty-sch-${idx}`} className="h-full rounded-xl" />;
                      const isSunday = idx % 7 === 0;
                      const isSaturday = idx % 7 === 6;
                      const isToday = cell.dateStr === TODAY_STR;
                      const holidayName = holidays[cell.dateStr];
                      const daySchedules = (scheduleList || []).filter((s) => s.date === cell.dateStr);

                      return (
                        <div
                          key={cell.dateStr}
                          onClick={() => setModalDate(cell.dateStr)}
                          className={`h-full border rounded-xl p-1.5 flex flex-col justify-between transition group relative cursor-pointer min-h-0 ${
                            isToday ? "border-amber-400 bg-amber-50/70" : "border-pink-200/90 bg-white hover:border-pink-400 hover:bg-pink-50/20"
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px] font-bold leading-tight">
                            <span className={isSunday || holidayName ? "text-rose-600" : isSaturday ? "text-blue-600" : "text-neutral-800"}>
                              {cell.day}
                            </span>
                            {holidayName && (
                              <span className="text-[9px] font-bold text-rose-500 truncate max-w-[55px]">{holidayName}</span>
                            )}
                          </div>

                          <div className="flex-1 overflow-y-auto space-y-1 my-0.5 pr-0.5 scrollbar-none">
                            {daySchedules.map((item) => {
                              const symbolInfo = SCHEDULE_SYMBOL_CONFIG[item.symbol] || SCHEDULE_SYMBOL_CONFIG.appointment;
                              const colorInfo = SCHEDULE_COLOR_CONFIG[item.color] || SCHEDULE_COLOR_CONFIG.pink;
                              return (
                                <div
                                  key={item.id}
                                  className={`flex items-center justify-between px-1.5 py-0.5 rounded border text-[10px] font-semibold leading-none shadow-2xs ${colorInfo.class}`}
                                >
                                  <span className="truncate flex items-center gap-1">
                                    <span className="text-[9px]">{symbolInfo.icon}</span>
                                    <span>{item.title}</span>
                                  </span>
                                  <button onClick={(e) => handleDeleteSchedule(item.id, e)} title="삭제" className="text-neutral-400 hover:text-rose-500 ml-1 shrink-0">
                                    <X className="w-2.5 h-2.5" />
                                  </button>
                                </div>
                              );
                            })}
                          </div>

                          <div className="text-[9px] text-neutral-400 text-right opacity-0 group-hover:opacity-100 transition leading-none">+추가</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="w-full lg:w-[280px] h-full shrink-0 border-2 border-pink-400/80 rounded-2xl bg-white/95 backdrop-blur-md p-4 shadow-sm flex flex-col justify-start gap-3.5 overflow-y-auto">
                  {leaveSummary && (
                    <div className="border border-blue-200 bg-blue-50/80 rounded-2xl p-4 shadow-xs flex flex-col justify-between shrink-0">
                      <div className="flex items-center justify-between text-xs font-bold text-blue-900">
                        <span>남은 연차 (총 16개 기준)</span>
                        <span className="text-[10px] text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-full font-bold">1월 1일 리셋</span>
                      </div>
                      <div className="text-3xl font-black text-blue-600 tracking-tight my-2">{leaveSummary.remaining} 개</div>
                      <div className="text-[11px] text-neutral-500 font-medium">사용: {leaveSummary.used}개 (등록 {leaveSummary.count}건)</div>
                    </div>
                  )}

                  {birthdaySummary && (
                    <div className="border border-rose-200 bg-rose-50/80 rounded-2xl p-4 shadow-xs flex flex-col justify-between shrink-0">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
                        <span>🎂</span>
                        <span>{birthdaySummary.title}</span>
                      </div>
                      <div className="text-3xl font-black text-rose-600 tracking-tight my-2">{birthdaySummary.dDayText}</div>
                      <div className="text-[11px] text-neutral-500 font-medium">({birthdaySummary.date} 기준)</div>
                    </div>
                  )}

                  {hairSummary && (
                    <div className="border border-purple-200 bg-purple-50/80 rounded-2xl p-4 shadow-xs flex flex-col justify-between shrink-0">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900">
                        <span>✂️</span>
                        <span>{hairSummary.title}</span>
                      </div>
                      <div className="text-3xl font-black text-purple-600 tracking-tight my-2">{hairSummary.displayText}</div>
                      <div className="text-[11px] text-neutral-500 font-medium">{hairSummary.subText}</div>
                    </div>
                  )}

                  {upcomingAppointments.map((app) => (
                    <div key={`app-${app.id}`} className="border border-amber-200 bg-amber-50/80 rounded-2xl p-3.5 shadow-xs flex flex-col justify-between shrink-0">
                      <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                        <span className="flex items-center gap-1">📌 약속: {app.title}</span>
                        <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-md font-bold">D-Day</span>
                      </div>
                      <div className="text-[11px] text-neutral-500 font-medium mt-1">날짜: {app.date}</div>
                    </div>
                  ))}

                  {!hasAnyScheduleSummary && (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-400">
                      <CalendarDays className="w-8 h-8 mb-2 text-pink-300" />
                      <span className="text-xs font-bold text-neutral-500 mb-1">일정 요약 없음</span>
                      <p className="text-[11px] text-neutral-400 leading-relaxed">
                        달력에 <span className="font-semibold text-pink-600">연차, 반차, 헤어, 생일</span> 일정을 등록하면 이곳에 자동으로 요약 카드가 생성됩니다.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* 일정 팝업 모달 */}
              {modalDate && (
                <div 
                  className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4"
                  onClick={() => { setModalDate(null); setPopupEditingId(null); }}
                >
                  <div className="bg-white rounded-3xl p-6 border border-pink-300 shadow-2xl max-w-md w-full max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-150" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-200 shrink-0">
                      <h3 className="text-base font-black text-neutral-900 flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-pink-500" />
                        <span>{modalDate} 일정 관리</span>
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-neutral-400 font-medium bg-neutral-100 px-2 py-0.5 rounded-md">ESC로 닫기</span>
                        <button onClick={() => { setModalDate(null); setPopupEditingId(null); }} className="text-neutral-400 hover:text-neutral-600 p-1.5 rounded-lg">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="my-3 overflow-y-auto space-y-2 max-h-[220px] pr-1">
                      <div className="text-[11px] font-bold text-neutral-500 mb-1">
                        등록된 일정 ({(scheduleList || []).filter((s) => s.date === modalDate).length}건)
                      </div>

                      {(scheduleList || []).filter((s) => s.date === modalDate).map((item) => {
                        const isEditingThis = popupEditingId === item.id;
                        const symbolObj = SCHEDULE_SYMBOL_CONFIG[item.symbol] || SCHEDULE_SYMBOL_CONFIG.appointment;
                        const colorObj = SCHEDULE_COLOR_CONFIG[item.color] || SCHEDULE_COLOR_CONFIG.pink;

                        if (isEditingThis) {
                          return (
                            <div key={`pop-edit-${item.id}`} className="p-3 rounded-2xl border-2 border-pink-400 bg-pink-50/50 space-y-2">
                              <input type="text" value={editPopupTitle} onChange={(e) => setEditPopupTitle(e.target.value)} className="w-full border border-pink-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-neutral-900 bg-white focus:outline-none focus:border-pink-500" />
                              <div className="flex gap-1 flex-wrap">
                                {Object.entries(SCHEDULE_SYMBOL_CONFIG).map(([key, val]) => (
                                  <button key={key} type="button" onClick={() => setEditPopupSymbol(key)} className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition ${editPopupSymbol === key ? "border-pink-500 bg-pink-50 text-pink-900 font-black" : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"}`}>
                                    {val.icon} {val.label}
                                  </button>
                                ))}
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-neutral-600">색상:</span>
                                {Object.entries(SCHEDULE_COLOR_CONFIG).map(([key, val]) => (
                                  <button key={key} type="button" onClick={() => setEditPopupColor(key)} className={`w-5 h-5 rounded-full ${val.chip} border-2 transition ${editPopupColor === key ? "border-pink-600 scale-110" : "border-white"}`} />
                                ))}
                              </div>
                              <div className="flex justify-end gap-1.5 pt-1">
                                <button onClick={() => savePopupEdit(item.id)} className="px-3 py-1 bg-pink-500 text-white text-xs font-bold rounded-lg hover:bg-pink-600">저장</button>
                                <button onClick={() => setPopupEditingId(null)} className="px-3 py-1 bg-white border border-neutral-300 text-neutral-600 text-xs rounded-lg hover:bg-neutral-50">취소</button>
                              </div>
                            </div>
                          );
                        }

                        return (
                          <div key={item.id} className={`flex items-center justify-between p-2 rounded-xl border text-xs font-semibold ${colorObj.class}`}>
                            <div className="flex items-center gap-1.5 min-w-0 pr-2">
                              <span className="text-sm">{symbolObj.icon}</span>
                              <span className="truncate">{item.title}</span>
                              <span className="text-[10px] opacity-75 font-normal">({symbolObj.label})</span>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <button onClick={() => startPopupEdit(item)} title="수정" className="p-1 rounded-md hover:bg-black/10 text-neutral-600"><Pencil className="w-3.5 h-3.5" /></button>
                              <button onClick={() => handleDeleteSchedule(item.id)} title="삭제" className="p-1 rounded-md hover:bg-rose-100 text-neutral-600 hover:text-rose-600"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </div>
                        );
                      })}

                      {(scheduleList || []).filter((s) => s.date === modalDate).length === 0 && (
                        <div className="text-center py-4 text-neutral-400 text-xs">등록된 일정이 없습니다.</div>
                      )}
                    </div>

                    <form onSubmit={handleAddPopupSchedule} className="pt-3 border-t border-neutral-200 shrink-0 space-y-3">
                      <div className="text-xs font-bold text-neutral-800">새 일정 추가</div>
                      <div>
                        <input type="text" required value={newSchedTitle} onChange={(e) => setNewSchedTitle(e.target.value)} placeholder="일정 제목을 입력하세요 (예: 치과, 생일파티 등)" className="w-full border border-pink-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-pink-500 font-medium" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-neutral-600 mb-1">심볼 선택</div>
                        <div className="grid grid-cols-5 gap-1">
                          {Object.entries(SCHEDULE_SYMBOL_CONFIG).map(([key, val]) => (
                            <button key={key} type="button" onClick={() => setNewSchedSymbol(key)} className={`py-1.5 rounded-xl text-[11px] font-bold border flex flex-col items-center gap-0.5 transition ${newSchedSymbol === key ? "border-pink-500 bg-pink-50 text-pink-900 font-black shadow-2xs" : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"}`}>
                              <span className="text-sm">{val.icon}</span>
                              <span>{val.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-neutral-600 mb-1">파스텔 태그 색상</div>
                        <div className="flex items-center gap-3 bg-neutral-50 p-2 rounded-xl border border-neutral-200">
                          {Object.entries(SCHEDULE_COLOR_CONFIG).map(([key, val]) => (
                            <label key={key} className="flex items-center gap-1.5 cursor-pointer">
                              <input type="radio" name="tagColor" value={key} checked={newSchedColor === key} onChange={() => setNewSchedColor(key)} className="hidden" />
                              <span className={`w-6 h-6 rounded-full ${val.chip} border-2 flex items-center justify-center transition ${newSchedColor === key ? "border-pink-600 scale-110 shadow-xs" : "border-transparent opacity-70"}`}>
                                {newSchedColor === key && <Check className="w-3 h-3 text-pink-950 stroke-[3]" />}
                              </span>
                              <span className="text-[11px] font-semibold text-neutral-700">{val.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <button type="button" onClick={() => { setModalDate(null); setPopupEditingId(null); }} className="flex-1 py-2 rounded-xl border border-neutral-300 text-neutral-600 text-xs font-semibold hover:bg-neutral-50 transition">닫기 (ESC)</button>
                        <button type="submit" className="flex-1 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold shadow-sm transition">일정 추가</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== 5. [가계부] 탭 화면 ==================== */}
          {currentTab === "ledger" && (
            <div className="h-full flex flex-col gap-3">
              <div className="border-2 border-sky-400/80 rounded-2xl bg-white/95 backdrop-blur-md px-5 py-3 shadow-sm flex items-center justify-between shrink-0">
                <div className="flex-1 flex items-center justify-between pr-6 border-r border-sky-200">
                  <button onClick={prevLedgerMonth} className="px-4 py-1.5 rounded-xl border border-sky-400 text-sky-700 hover:bg-sky-50 font-bold text-xs transition">&lt; 이전달</button>
                  <h2 className="text-lg font-black text-sky-950 tracking-tight flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-sky-600" />
                    <span>{ledgerYear}년 {ledgerMonth}월 가계부</span>
                  </h2>
                  <button onClick={nextLedgerMonth} className="px-4 py-1.5 rounded-xl border border-sky-400 text-sky-700 hover:bg-sky-50 font-bold text-xs transition">다음달 &gt;</button>
                </div>
                <div className="w-[280px] pl-6 flex items-center gap-1.5 text-sm font-extrabold text-sky-900">
                  <PiggyBank className="w-4 h-4 text-sky-600" />
                  <span>재정 요약</span>
                </div>
              </div>

              <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-3 items-stretch">
                <div className="flex-1 h-full border-2 border-sky-400/80 rounded-2xl bg-white/95 backdrop-blur-md p-4 shadow-sm flex flex-col justify-between overflow-hidden">
                  <div className="grid grid-cols-7 text-center font-bold text-xs pb-2 border-b border-sky-100 text-neutral-700 shrink-0">
                    <span className="text-rose-600 font-extrabold">일</span>
                    <span>월</span>
                    <span>화</span>
                    <span>수</span>
                    <span>목</span>
                    <span>금</span>
                    <span className="text-blue-600 font-extrabold">토</span>
                  </div>

                  <div className="flex-1 grid grid-cols-7 grid-rows-5 gap-2 pt-2 min-h-0">
                    {ledgerCalendarGrid.map((cell, idx) => {
                      if (!cell.day) return <div key={`empty-led-${idx}`} className="h-full rounded-xl" />;
                      const isSunday = idx % 7 === 0;
                      const isSaturday = idx % 7 === 6;
                      const isToday = cell.dateStr === TODAY_STR;
                      const holidayName = holidays[cell.dateStr];
                      const dayEntries = (ledgerEntries || []).filter((s) => s.date === cell.dateStr);

                      let dayIncome = 0;
                      let dayExpense = 0;
                      dayEntries.forEach(e => {
                        if (e.type === "income") dayIncome += Number(e.amount || 0);
                        else dayExpense += Number(e.amount || 0);
                      });

                      return (
                        <div
                          key={cell.dateStr}
                          onClick={() => { setLedgerEditingId(null); setLedgerModalDate(cell.dateStr); }}
                          className={`h-full border rounded-xl p-1.5 flex flex-col justify-between transition group relative cursor-pointer min-h-0 ${
                            isToday ? "border-amber-400 bg-amber-50/70" : "border-sky-200/90 bg-white hover:border-sky-400 hover:bg-sky-50/20"
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px] font-bold leading-tight">
                            <span className={isSunday || holidayName ? "text-rose-600" : isSaturday ? "text-blue-600" : "text-neutral-800"}>{cell.day}</span>
                            {holidayName ? (
                              <span className="text-[9px] font-bold text-rose-500 truncate max-w-[55px]">{holidayName}</span>
                            ) : (dayIncome > 0 || dayExpense > 0) ? (
                              <span className="text-[9px] font-mono font-bold text-sky-800">
                                {dayExpense > 0 && <span className="text-rose-500 mr-1">-{dayExpense.toLocaleString()}</span>}
                                {dayIncome > 0 && <span className="text-blue-600">+{dayIncome.toLocaleString()}</span>}
                              </span>
                            ) : null}
                          </div>

                          <div className="flex-1 overflow-y-auto space-y-1 my-0.5 pr-0.5 scrollbar-none">
                            {dayEntries.map((item) => {
                              const isIncome = item.type === "income";
                              const colorObj = LEDGER_COLOR_CONFIG[item.color] || LEDGER_COLOR_CONFIG.pink;
                              const symbolObj = LEDGER_SYMBOL_CONFIG[item.symbol] || LEDGER_SYMBOL_CONFIG.fixed;

                              return (
                                <div key={item.id} className={`flex items-start justify-between p-1 rounded border text-[10px] font-semibold leading-tight shadow-2xs ${colorObj.class}`}>
                                  <div className="flex items-start gap-1 min-w-0 break-all flex-1 pr-1">
                                    <span className="text-[10px] shrink-0">{symbolObj.icon}</span>
                                    <div className="flex flex-wrap items-baseline gap-x-1">
                                      <span className="font-bold">{item.title}</span>
                                      <span className="font-mono text-[9px] font-bold opacity-85 whitespace-nowrap">{isIncome ? "+" : "-"}{Number(item.amount).toLocaleString()}원</span>
                                    </div>
                                  </div>
                                  <button onClick={(e) => handleDeleteLedgerEntry(item.id, e)} title="삭제" className="text-neutral-400 hover:text-rose-500 p-0.5 shrink-0"><X className="w-2.5 h-2.5" /></button>
                                </div>
                              );
                            })}
                          </div>

                          <div className="text-[9px] text-neutral-400 text-right opacity-0 group-hover:opacity-100 transition leading-none">+추가</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="w-full lg:w-[280px] h-full shrink-0 border-2 border-sky-400/80 rounded-2xl bg-white/95 backdrop-blur-md p-4 shadow-sm flex flex-col justify-start gap-3 overflow-y-auto">
                  <div className="border border-blue-200 bg-blue-50/80 rounded-2xl p-3 shadow-xs flex flex-col justify-between shrink-0">
                    <div className="flex items-center justify-between text-xs font-bold text-blue-900">
                      <span className="flex items-center gap-1"><ArrowDownLeft className="w-3.5 h-3.5 text-blue-600" /> 총 수입</span>
                      <span className="text-[10px] text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-full font-bold">수입</span>
                    </div>
                    <div className="text-xl font-black text-blue-600 tracking-tight my-1.5">+{currentMonthLedgerSummary.income.toLocaleString()}원</div>
                  </div>

                  <div className="border border-rose-200 bg-rose-50/80 rounded-2xl p-3 shadow-xs flex flex-col justify-between shrink-0">
                    <div className="flex items-center justify-between text-xs font-bold text-rose-900">
                      <span className="flex items-center gap-1"><ArrowUpRight className="w-3.5 h-3.5 text-rose-600" /> 총 지출</span>
                      <span className="text-[10px] text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded-full font-bold">지출</span>
                    </div>
                    <div className="text-xl font-black text-rose-600 tracking-tight my-1.5">-{currentMonthLedgerSummary.expense.toLocaleString()}원</div>
                  </div>

                  <div className="border border-sky-200 bg-sky-50/80 rounded-2xl p-3 shadow-xs flex flex-col justify-between shrink-0">
                    <div className="flex items-center justify-between text-xs font-bold text-sky-900">
                      <span className="flex items-center gap-1"><CreditCard className="w-3.5 h-3.5 text-sky-600" /> 정산 잔액</span>
                      <span className="text-[10px] text-sky-700 bg-sky-100 px-1.5 py-0.5 rounded-full font-bold">잔액</span>
                    </div>
                    <div className={`text-xl font-black tracking-tight my-1.5 ${currentMonthLedgerSummary.balance >= 0 ? "text-sky-700" : "text-rose-600"}`}>
                      {currentMonthLedgerSummary.balance >= 0 ? "+" : ""}{currentMonthLedgerSummary.balance.toLocaleString()}원
                    </div>
                  </div>

                  <div className="border-t border-sky-200/80 my-0.5 shrink-0" />

                  <div className="border border-amber-200 bg-amber-50/80 rounded-2xl p-3 shadow-xs flex flex-col justify-between shrink-0">
                    <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                      <span className="flex items-center gap-1">🚕 택시 지출 합산</span>
                      <span className="text-[10px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded-md font-bold">택시</span>
                    </div>
                    <div className="text-xl font-black text-amber-900 tracking-tight my-1.5">{currentMonthLedgerSummary.taxiTotal.toLocaleString()}원</div>
                  </div>

                  <div className="border border-pink-200 bg-pink-50/80 rounded-2xl p-3 shadow-xs flex flex-col justify-between shrink-0">
                    <div className="flex items-center justify-between text-xs font-bold text-pink-900">
                      <span className="flex items-center gap-1">🛵 배달 지출 합산</span>
                      <span className="text-[10px] text-pink-800 bg-pink-100 px-1.5 py-0.5 rounded-md font-bold">배달</span>
                    </div>
                    <div className="text-xl font-black text-pink-900 tracking-tight my-1.5">{currentMonthLedgerSummary.deliveryTotal.toLocaleString()}원</div>
                  </div>

                  <div className="border border-purple-200 bg-purple-50/80 rounded-2xl p-3 shadow-xs flex flex-col gap-2 shrink-0">
                    <div className="flex items-center justify-between text-xs font-bold text-purple-900">
                      <span className="flex items-center gap-1">📌 고정 지출 목록</span>
                      <button onClick={() => openFixedExpenseModal()} className="p-1 rounded bg-purple-100 hover:bg-purple-200 text-purple-800 text-[10px] font-bold flex items-center gap-0.5 transition" title="새 고정 지출 추가">
                        <Plus className="w-3 h-3" /> 추가
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      {currentMonthLedgerSummary.fixedItems.map((item) => (
                        <div
                          key={`fixed-tpl-${item.tplTitle}`}
                          onClick={() => openFixedExpenseModal(item)}
                          className="flex items-center justify-between bg-white/90 p-2 rounded-xl border border-purple-200 text-xs hover:border-purple-400 cursor-pointer transition group"
                        >
                          <div className="min-w-0 pr-1">
                            <div className="font-bold text-neutral-800 truncate leading-tight flex items-center gap-1">
                              <span>📌</span>
                              <span>{item.tplTitle}</span>
                            </div>
                            <div className="text-[10px] font-mono font-bold mt-0.5">
                              {item.entry ? (
                                <span className="text-purple-700 font-black">-{Number(item.entry.amount).toLocaleString()}원</span>
                              ) : (
                                <span className="text-rose-500 italic font-semibold">금액 미입력 (클릭하여 입력)</span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button onClick={(e) => { e.stopPropagation(); openFixedExpenseModal(item); }} className="p-1 rounded-md text-neutral-400 hover:text-purple-700 hover:bg-purple-100 transition" title="수정하기">
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={(e) => handleDeleteFixedTemplate(item.tplTitle, e)} className="p-1 rounded-md text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition" title="고정 목록에서 완전 삭제">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {currentMonthLedgerSummary.fixedItems.length === 0 && (
                        <div className="text-center py-2 text-[10px] text-neutral-400">등록된 고정 지출이 없습니다.</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {ledgerModalDate && (
                <div 
                  className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4"
                  onClick={() => { setLedgerModalDate(null); setLedgerEditingId(null); }}
                >
                  <div className="bg-white rounded-3xl p-6 border border-sky-300 shadow-2xl max-w-md w-full max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-150" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-200 shrink-0">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-sky-500" />
                        <h3 className="text-base font-black text-neutral-900">가계부 관리</h3>
                        <input type="date" value={ledgerModalDate} onChange={(e) => setLedgerModalDate(e.target.value)} className="border border-sky-200 bg-sky-50/50 rounded-lg px-2 py-0.5 text-xs font-bold text-sky-900 focus:outline-none focus:border-sky-500 cursor-pointer" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-neutral-400 font-medium bg-neutral-100 px-2 py-0.5 rounded-md">ESC로 닫기</span>
                        <button onClick={() => { setLedgerModalDate(null); setLedgerEditingId(null); }} className="text-neutral-400 hover:text-neutral-600 p-1.5 rounded-lg">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="my-3 overflow-y-auto space-y-2 max-h-[220px] pr-1">
                      <div className="text-[11px] font-bold text-neutral-500 mb-1">
                        선택 날짜({ledgerModalDate}) 등록 내역 ({(ledgerEntries || []).filter((s) => s.date === ledgerModalDate).length}건)
                      </div>

                      {(ledgerEntries || []).filter((s) => s.date === ledgerModalDate).map((item) => {
                        const isEditingThis = ledgerEditingId === item.id;
                        const isIncome = item.type === "income";
                        const colorObj = LEDGER_COLOR_CONFIG[item.color] || LEDGER_COLOR_CONFIG.pink;
                        const symbolObj = LEDGER_SYMBOL_CONFIG[item.symbol] || LEDGER_SYMBOL_CONFIG.fixed;

                        if (isEditingThis) {
                          return (
                            <div key={`pop-ledger-edit-${item.id}`} className="p-3 rounded-2xl border-2 border-sky-400 bg-sky-50/50 space-y-2">
                              <div className="flex gap-2">
                                <select value={editLedgerType} onChange={(e) => setEditLedgerType(e.target.value as "expense" | "income")} className="border border-sky-300 rounded-lg px-2 py-1 text-xs font-bold bg-white">
                                  <option value="expense">지출 (-)</option>
                                  <option value="income">수입 (+)</option>
                                </select>
                                <input type="text" value={editLedgerTitle} onChange={(e) => setEditLedgerTitle(e.target.value)} placeholder="항목 내용" className="flex-1 border border-sky-300 rounded-lg px-2.5 py-1 text-xs font-bold text-neutral-900 bg-white" />
                                <select value={editLedgerSymbol} onChange={(e) => setEditLedgerSymbol(e.target.value)} className="border border-sky-300 rounded-lg px-2 py-1 text-xs font-bold bg-white cursor-pointer">
                                  {Object.entries(LEDGER_SYMBOL_CONFIG).map(([key, val]) => (
                                    <option key={key} value={key}>{val.icon} {val.label}</option>
                                  ))}
                                </select>
                              </div>

                              <input type="number" value={editLedgerAmount} onChange={(e) => setEditLedgerAmount(e.target.value)} placeholder="금액 (원)" className="w-full border border-sky-300 rounded-lg px-2.5 py-1 text-xs font-bold text-neutral-900 bg-white" />

                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-neutral-600">색상:</span>
                                {Object.entries(LEDGER_COLOR_CONFIG).map(([key, val]) => (
                                  <button key={key} type="button" onClick={() => setEditLedgerColor(key)} className={`w-5 h-5 rounded-full ${val.chip} border-2 transition ${editLedgerColor === key ? "border-sky-800 scale-110" : "border-white"}`} />
                                ))}
                              </div>

                              <div className="flex justify-end gap-1.5 pt-1">
                                <button onClick={() => saveLedgerEdit(item.id)} className="px-3 py-1 bg-sky-500 text-white text-xs font-bold rounded-lg hover:bg-sky-600">저장</button>
                                <button onClick={() => setLedgerEditingId(null)} className="px-3 py-1 bg-white border border-neutral-300 text-neutral-600 text-xs rounded-lg hover:bg-neutral-50">취소</button>
                              </div>
                            </div>
                          );
                        }

                        return (
                          <div key={item.id} className={`flex items-center justify-between p-2 rounded-xl border text-xs font-semibold ${colorObj.class}`}>
                            <div className="flex items-center gap-2 min-w-0 pr-2">
                              <span className="text-base">{symbolObj.icon}</span>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${isIncome ? "bg-blue-200 text-blue-900" : "bg-rose-200 text-rose-900"}`}>
                                {isIncome ? "수입" : "지출"}
                              </span>
                              <span className="font-bold truncate">{item.title}</span>
                              <span className="font-mono font-bold whitespace-nowrap">{isIncome ? "+" : "-"}{Number(item.amount).toLocaleString()}원</span>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <button onClick={() => startLedgerEdit(item)} title="수정" className="p-1 rounded-md hover:bg-black/10 text-neutral-600"><Pencil className="w-3.5 h-3.5" /></button>
                              <button onClick={() => handleDeleteLedgerEntry(item.id)} title="삭제" className="p-1 rounded-md hover:bg-rose-100 text-neutral-600 hover:text-rose-600"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </div>
                        );
                      })}

                      {(ledgerEntries || []).filter((s) => s.date === ledgerModalDate).length === 0 && (
                        <div className="text-center py-4 text-neutral-400 text-xs">해당 일자에 등록된 내역이 없습니다.</div>
                      )}
                    </div>

                    <form onSubmit={handleAddLedgerEntry} className="pt-3 border-t border-neutral-200 shrink-0 space-y-3">
                      <div className="text-xs font-bold text-neutral-800">새 내역 추가</div>
                      <div className="flex gap-2">
                        <select value={newLedgerType} onChange={(e) => setNewLedgerType(e.target.value as "expense" | "income")} className="border border-sky-300 rounded-xl px-2.5 py-2 text-xs font-bold bg-white focus:outline-none focus:border-sky-500 cursor-pointer">
                          <option value="expense">지출 (-)</option>
                          <option value="income">수입 (+)</option>
                        </select>
                        <input type="text" required value={newLedgerTitle} onChange={(e) => setNewLedgerTitle(e.target.value)} placeholder="항목 내용" className="flex-1 border border-sky-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-500 font-medium" />
                        <select value={newLedgerSymbol} onChange={(e) => setNewLedgerSymbol(e.target.value)} className="border border-sky-300 rounded-xl px-2 py-2 text-xs font-bold bg-white focus:outline-none focus:border-sky-500 cursor-pointer">
                          {Object.entries(LEDGER_SYMBOL_CONFIG).map(([key, val]) => (
                            <option key={key} value={key}>{val.icon} {val.label}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <input type="number" required min="0" value={newLedgerAmount} onChange={(e) => setNewLedgerAmount(e.target.value)} placeholder="금액을 입력하세요 (예: 15000)" className="w-full border border-sky-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-500 font-medium" />
                      </div>

                      <div>
                        <div className="text-[11px] font-bold text-neutral-600 mb-1">파스텔 태그 색상</div>
                        <div className="flex items-center gap-3 bg-neutral-50 p-2 rounded-xl border border-neutral-200">
                          {Object.entries(LEDGER_COLOR_CONFIG).map(([key, val]) => (
                            <label key={key} className="flex items-center gap-1.5 cursor-pointer">
                              <input type="radio" name="tagColor" value={key} checked={newLedgerColor === key} onChange={() => setNewLedgerColor(key)} className="hidden" />
                              <span className={`w-6 h-6 rounded-full ${val.chip} border-2 flex items-center justify-center transition ${newLedgerColor === key ? "border-sky-800 scale-110 shadow-xs" : "border-transparent opacity-70"}`}>
                                {newLedgerColor === key && <Check className="w-3 h-3 text-sky-950 stroke-[3]" />}
                              </span>
                              <span className="text-[11px] font-semibold text-neutral-700">{val.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button type="button" onClick={() => { setLedgerModalDate(null); setLedgerEditingId(null); }} className="flex-1 py-2 rounded-xl border border-neutral-300 text-neutral-600 text-xs font-semibold hover:bg-neutral-50 transition">
                          닫기 (ESC)
                        </button>
                        <button type="submit" className="flex-1 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-sm transition">
                          내역 추가
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== 6. 그 외 미구현 탭 ==================== */}
          {currentTab !== "songs" && currentTab !== "schedule" && currentTab !== "ledger" && currentTab !== "favorites" && currentTab !== "bookmarks" && (
            <div className="h-full border border-dashed border-emerald-300 rounded-2xl p-20 flex flex-col items-center justify-center text-center bg-emerald-50/20 backdrop-blur-[2px]">
              <span className="text-3xl mb-2 block">🚧</span>
              <h3 className="text-sm font-bold text-emerald-900 mb-1">{menuItems.find((m) => m.id === currentTab)?.label} 준비 중</h3>
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
                  <button onClick={() => !isTimerRunning && setTimerMinutes((p) => Math.max(1, p - 1))} disabled={isTimerRunning} className={`p-0.5 rounded ${themeClasses.accentBtnSub} disabled:opacity-30 transition`}>
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className={`text-[10px] font-bold ${themeClasses.textPrimary} min-w-[24px] text-center`}>{timerMinutes}분</span>
                  <button onClick={() => !isTimerRunning && setTimerMinutes((p) => p + 1)} disabled={isTimerRunning} className={`p-0.5 rounded ${themeClasses.accentBtnSub} disabled:opacity-30 transition`}>
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className={`text-xl font-black my-1 font-mono tracking-wider ${themeClasses.textPrimary}`}>
                {timerMin}:{timerSec}
              </div>

              <div className="flex items-center gap-1.5 w-full mt-1">
                <button onClick={toggleTimer} className={`flex-1 py-1 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition shadow-sm ${isTimerRunning ? "bg-amber-500 hover:bg-amber-600 text-white" : themeClasses.accentBtn}`}>
                  {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                  <span>{isTimerRunning ? "정지" : "시작"}</span>
                </button>
                <button onClick={resetTimer} title="타이머 초기화" className={`p-1 rounded-lg border ${themeClasses.borderSubtle} hover:bg-white/60 ${themeClasses.textSecondary} transition`}>
                  <RotateCcw className="w-3.5 h-3.5" />
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
                  {repeatMode === "one" ? <><span>1</span></> : <><Repeat className="w-3.5 h-3.5" />{repeatMode === "all" && <span>ALL</span>}</>}
                </button>
              </div>

              <div className={`flex items-center gap-1.5 pt-1 border-t ${themeClasses.borderSubtle} px-0.5`}>
                <button onClick={toggleMute} title="음소거 해제" className={`${themeClasses.textSecondary} hover:text-neutral-950 p-0.5 transition shrink-0`}>
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