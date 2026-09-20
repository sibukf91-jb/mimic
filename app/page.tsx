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
  CalendarDays
} from "lucide-react";

export default function Home() {
  const [pin, setPin] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const CORRECT_PIN = "1234";
  const [currentTab, setCurrentTab] = useState("schedule"); // 'schedule' 또는 'songs'

  // ================= 1. 노래책 데이터 =================
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

  // ================= 2. 일정 캘린더 & 동적 요약 데이터 =================
  // 심볼 설정 (연차, 반차, 헤어, 생일, 약속)
  const SYMBOL_CONFIG = {
    leave: { label: "연차", icon: "🌴", badge: "연차" },
    half_leave: { label: "반차", icon: "🌓", badge: "반차" },
    hair: { label: "헤어", icon: "✂️", badge: "헤어" },
    birthday: { label: "생일", icon: "🎂", badge: "생일" },
    appointment: { label: "약속", icon: "📌", badge: "약속" },
  };

  // 파스텔 톤 5가지 색상
  const COLOR_CONFIG = {
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

  const holidays: Record<string, string> = {
    "2026-09-24": "추석 연휴",
    "2026-09-25": "추석",
    "2026-09-26": "추석 연휴",
  };

  const [scheduleList, setScheduleList] = useState<any[]>([]);
  const [isScheduleLoaded, setIsScheduleLoaded] = useState(false);

  const [calYear, setCalYear] = useState(2026);
  const [calMonth, setCalMonth] = useState(9); // 1~12

  // 팝업 모달 상태
  const [modalDate, setModalDate] = useState<string | null>(null);
  const [newSchedTitle, setNewSchedTitle] = useState("");
  const [newSchedSymbol, setNewSchedSymbol] = useState("appointment");
  const [newSchedColor, setNewSchedColor] = useState("pink");

  // 팝업 내 인라인 수정 상태
  const [popupEditingId, setPopupEditingId] = useState<number | null>(null);
  const [editPopupTitle, setEditPopupTitle] = useState("");
  const [editPopupSymbol, setEditPopupSymbol] = useState("appointment");
  const [editPopupColor, setEditPopupColor] = useState("pink");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jb_bookmark_calendar_schedules");
      if (saved) {
        try {
          setScheduleList(JSON.parse(saved));
        } catch (e) {
          setScheduleList(defaultSchedules);
        }
      } else {
        setScheduleList(defaultSchedules);
      }
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
    for (let i = 0; i < firstDayIndex; i++) {
      cells.push({ day: null, dateStr: "" });
    }
    for (let d = 1; d <= lastDate; d++) {
      const monthStr = String(calMonth).padStart(2, "0");
      const dayStr = String(d).padStart(2, "0");
      cells.push({ day: d, dateStr: `${calYear}-${monthStr}-${dayStr}` });
    }
    while (cells.length % 7 !== 0) {
      cells.push({ day: null, dateStr: "" });
    }
    return cells;
  }, [calYear, calMonth]);

  // 일정 추가
  const handleAddPopupSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalDate || !newSchedTitle.trim()) return;

    const newEntry = {
      id: Date.now(),
      date: modalDate,
      title: newSchedTitle.trim(),
      symbol: newSchedSymbol,
      color: newSchedColor
    };

    setScheduleList((prev) => [...prev, newEntry]);
    setNewSchedTitle("");
  };

  // 팝업 내 인라인 수정 시작
  const startPopupEdit = (item: any) => {
    setPopupEditingId(item.id);
    setEditPopupTitle(item.title);
    setEditPopupSymbol(item.symbol || "appointment");
    setEditPopupColor(item.color || "pink");
  };

  // 팝업 내 인라인 수정 완료 저장
  const savePopupEdit = (id: number) => {
    if (!editPopupTitle.trim()) return;
    setScheduleList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              title: editPopupTitle.trim(),
              symbol: editPopupSymbol,
              color: editPopupColor
            }
          : item
      )
    );
    setPopupEditingId(null);
  };

  // 일정 삭제
  const handleDeleteSchedule = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setScheduleList((prev) => prev.filter((item) => item.id !== id));
    if (popupEditingId === id) setPopupEditingId(null);
  };

  // ================= 4. 요약칸 동적 연동 계산 로직 =================
  const TODAY_STR = "2026-09-20";
  const todayDateObj = new Date(TODAY_STR);

  // A. 연차 / 반차 계산 (1월 1일 기준 기본 16개에서 달력의 연차/반차 사용량 차감)
  const leaveSummary = useMemo(() => {
    const currentYearStr = String(calYear);
    const leaveItems = scheduleList.filter((s) => s.date.startsWith(currentYearStr) && (s.symbol === "leave" || s.symbol === "half_leave"));
    if (leaveItems.length === 0) return null; // 등록된 연차/반차가 없으면 요약칸에 미표시

    let used = 0;
    leaveItems.forEach((s) => {
      if (s.symbol === "leave") used += 1.0;
      else if (s.symbol === "half_leave") used += 0.5;
    });

    const total = 16.0;
    const remaining = Math.max(0, total - used);
    return {
      used,
      remaining: remaining % 1 === 0 ? remaining.toFixed(0) : remaining.toFixed(1),
      count: leaveItems.length
    };
  }, [scheduleList, calYear]);

  // B. 생일 D-Day 계산 (달력에 실제로 등록된 생일 심볼만 표시)
  const birthdaySummary = useMemo(() => {
    const birthdays = scheduleList
      .filter((s) => s.symbol === "birthday")
      .sort((a, b) => a.date.localeCompare(b.date));

    if (birthdays.length === 0) return null;

    // 가장 가까운 다음 생일 찾기 (오늘 이후 포함)
    let nextBday = birthdays.find((s) => s.date >= TODAY_STR);
    if (!nextBday) {
      // 모두 과거인 경우 가장 마지막 등록된 생일
      nextBday = birthdays[birthdays.length - 1];
    }

    const bdayDate = new Date(nextBday.date);
    const diffTime = bdayDate.getTime() - todayDateObj.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      title: nextBday.title || "생일",
      date: nextBday.date,
      dDayText: diffDays === 0 ? "D-Day" : diffDays > 0 ? `D-${diffDays}` : `D+${Math.abs(diffDays)}`
    };
  }, [scheduleList]);

  // C. 헤어(이발) 경과일 또는 다음 예약 D-Day 계산
  const hairSummary = useMemo(() => {
    const hairList = scheduleList
      .filter((s) => s.symbol === "hair")
      .sort((a, b) => a.date.localeCompare(b.date));

    if (hairList.length === 0) return null;

    // 미래 예약이 있는지 확인
    const nextHair = hairList.find((s) => s.date > TODAY_STR);
    // 과거 최근 이발 확인
    const pastHairs = hairList.filter((s) => s.date <= TODAY_STR);
    const lastHair = pastHairs.length > 0 ? pastHairs[pastHairs.length - 1] : null;

    if (nextHair) {
      const nDate = new Date(nextHair.date);
      const diffDays = Math.ceil((nDate.getTime() - todayDateObj.getTime()) / (1000 * 60 * 60 * 24));
      return {
        mode: "next",
        title: nextHair.title || "이발 예약",
        date: nextHair.date,
        displayText: diffDays === 0 ? "오늘 예약" : `D-${diffDays}`,
        subText: `(예약: ${nextHair.date})`
      };
    } else if (lastHair) {
      const lDate = new Date(lastHair.date);
      const diffDays = Math.floor((todayDateObj.getTime() - lDate.getTime()) / (1000 * 60 * 60 * 24));
      return {
        mode: "past",
        title: "이발 후 경과일 (헤어)",
        date: lastHair.date,
        displayText: `+${diffDays}일`,
        subText: `(${lastHair.date} 기준)`
      };
    }
    return null;
  }, [scheduleList]);

  // D. 다가오는 일반 약속 D-Day 목록 (선택적)
  const upcomingAppointments = useMemo(() => {
    return scheduleList
      .filter((s) => s.symbol === "appointment" && s.date >= TODAY_STR)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 2);
  }, [scheduleList]);

  const hasAnySummary = leaveSummary || birthdaySummary || hairSummary || upcomingAppointments.length > 0;

  // ================= 5. 플레이리스트 재생, 게이지 & 볼륨 =================
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

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

  // ================= 6. 시계 & 타이머 =================
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
      {/* 배경 격자 패턴 */}
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
        
        {/* [1] 좌측 배너 (세로 h-[760px] 고정) */}
        <aside className="w-full lg:w-[200px] h-[760px] shrink-0 sticky top-[73px]">
          <div className="border border-dashed border-emerald-400/90 rounded-2xl h-full flex flex-col items-center justify-center p-4 text-center bg-emerald-50/30 backdrop-blur-[2px] shadow-sm">
            <span className="text-xl mb-1">🖼️</span>
            <span className="text-xs font-semibold text-emerald-700">좌측 배너 영역</span>
          </div>
        </aside>

        {/* [2] 중앙 내용 영역 (배너 세로 높이 h-[760px]와 완벽 일치) */}
        <section className="flex-1 w-full h-[760px] min-w-0 flex flex-col">
          
          {/* ==================== A. [일정] 탭 화면 ==================== */}
          {currentTab === "schedule" && (
            <div className="h-full flex flex-col gap-3">
              
              {/* [박스 1] 상단 헤더 박스 */}
              <div className="border-2 border-indigo-400/80 rounded-2xl bg-white/95 backdrop-blur-md px-5 py-3 shadow-sm flex items-center justify-between shrink-0">
                <div className="flex-1 flex items-center justify-between pr-6 border-r border-indigo-200">
                  <button
                    onClick={prevMonth}
                    className="px-4 py-1.5 rounded-xl border border-indigo-400 text-indigo-700 hover:bg-indigo-50 font-bold text-xs transition"
                  >
                    &lt; 이전달
                  </button>

                  <h2 className="text-lg font-black text-indigo-950 tracking-tight flex items-center gap-2">
                    <span>🗓️</span>
                    <span>{calYear}년 {calMonth}월 일정표</span>
                  </h2>

                  <button
                    onClick={nextMonth}
                    className="px-4 py-1.5 rounded-xl border border-indigo-400 text-indigo-700 hover:bg-indigo-50 font-bold text-xs transition"
                  >
                    다음달 &gt;
                  </button>
                </div>

                <div className="w-[280px] pl-6 flex items-center gap-1.5 text-sm font-extrabold text-indigo-900">
                  <span>📌</span>
                  <span>일정 요약</span>
                </div>
              </div>

              {/* 하단 2분할 영역 (달력 박스 + 요약 박스) */}
              <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-3 items-stretch">
                
                {/* [박스 2] 좌측 메인 달력 박스 */}
                <div className="flex-1 h-full border-2 border-indigo-400/80 rounded-2xl bg-white/95 backdrop-blur-md p-4 shadow-sm flex flex-col justify-between overflow-hidden">
                  {/* 요일 헤더 */}
                  <div className="grid grid-cols-7 text-center font-bold text-xs pb-2 border-b border-indigo-100 text-neutral-700 shrink-0">
                    <span className="text-rose-600 font-extrabold">일</span>
                    <span>월</span>
                    <span>화</span>
                    <span>수</span>
                    <span>목</span>
                    <span>금</span>
                    <span className="text-blue-600 font-extrabold">토</span>
                  </div>

                  {/* 5개 행 달력 그리드 */}
                  <div className="flex-1 grid grid-cols-7 grid-rows-5 gap-2 pt-2 min-h-0">
                    {calendarGrid.map((cell, idx) => {
                      if (!cell.day) {
                        return <div key={`empty-${idx}`} className="h-full rounded-xl" />;
                      }

                      const dayOfWeek = idx % 7;
                      const isSunday = dayOfWeek === 0;
                      const isSaturday = dayOfWeek === 6;
                      const isToday = cell.dateStr === TODAY_STR;
                      const holidayName = holidays[cell.dateStr];
                      const daySchedules = scheduleList.filter((s) => s.date === cell.dateStr);

                      return (
                        <div
                          key={cell.dateStr}
                          onClick={() => setModalDate(cell.dateStr)}
                          className={`h-full border rounded-xl p-1.5 flex flex-col justify-between transition group relative cursor-pointer min-h-0 ${
                            isToday
                              ? "border-amber-400 bg-amber-50/70"
                              : "border-indigo-100 bg-white hover:border-indigo-300 hover:bg-indigo-50/20"
                          }`}
                        >
                          {/* 날짜 번호 및 공휴일 */}
                          <div className="flex items-center justify-between text-[11px] font-bold leading-tight">
                            <span className={isSunday || holidayName ? "text-rose-600" : isSaturday ? "text-blue-600" : "text-neutral-800"}>
                              {cell.day}
                            </span>
                            {holidayName && (
                              <span className="text-[9px] font-bold text-rose-500 truncate max-w-[55px]">
                                {holidayName}
                              </span>
                            )}
                          </div>

                          {/* 일정 태그 뱃지 리스트 */}
                          <div className="flex-1 overflow-y-auto space-y-1 my-0.5 pr-0.5 scrollbar-none">
                            {daySchedules.map((item) => {
                              const symbolInfo = SYMBOL_CONFIG[item.symbol] || SYMBOL_CONFIG.appointment;
                              const colorInfo = COLOR_CONFIG[item.color] || COLOR_CONFIG.pink;

                              return (
                                <div
                                  key={item.id}
                                  className={`flex items-center justify-between px-1.5 py-0.5 rounded border text-[10px] font-semibold leading-none shadow-2xs ${colorInfo.class}`}
                                >
                                  <span className="truncate flex items-center gap-1">
                                    <span className="text-[9px]">{symbolInfo.icon}</span>
                                    <span>{item.title}</span>
                                  </span>
                                  <button
                                    onClick={(e) => handleDeleteSchedule(item.id, e)}
                                    title="삭제"
                                    className="text-neutral-400 hover:text-rose-500 ml-1 shrink-0"
                                  >
                                    <X className="w-2.5 h-2.5" />
                                  </button>
                                </div>
                              );
                            })}
                          </div>

                          <div className="text-[9px] text-neutral-400 text-right opacity-0 group-hover:opacity-100 transition leading-none">
                            +추가
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* [박스 3] 우측 일정 요약 박스 (동적 조건부 카드 표시) */}
                <div className="w-full lg:w-[280px] h-full shrink-0 border-2 border-indigo-400/80 rounded-2xl bg-white/95 backdrop-blur-md p-4 shadow-sm flex flex-col justify-start gap-3.5 overflow-y-auto">
                  
                  {/* A. 남은 연차 카드 (연차/반차 심볼이 있을 때만 표시) */}
                  {leaveSummary && (
                    <div className="border border-blue-200 bg-blue-50/80 rounded-2xl p-4 shadow-xs flex flex-col justify-between shrink-0">
                      <div className="flex items-center justify-between text-xs font-bold text-blue-900">
                        <span>남은 연차 (총 16개 기준)</span>
                        <span className="text-[10px] text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-full font-bold">1월 1일 리셋</span>
                      </div>
                      <div className="text-3xl font-black text-blue-600 tracking-tight my-2">
                        {leaveSummary.remaining} 개
                      </div>
                      <div className="text-[11px] text-neutral-500 font-medium">
                        사용: {leaveSummary.used}개 (등록 {leaveSummary.count}건)
                      </div>
                    </div>
                  )}

                  {/* B. 생일 D-Day 카드 (달력에 생일 심볼이 있을 때만 표시) */}
                  {birthdaySummary && (
                    <div className="border border-rose-200 bg-rose-50/80 rounded-2xl p-4 shadow-xs flex flex-col justify-between shrink-0">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
                        <span>🎂</span>
                        <span>{birthdaySummary.title}</span>
                      </div>
                      <div className="text-3xl font-black text-rose-600 tracking-tight my-2">
                        {birthdaySummary.dDayText}
                      </div>
                      <div className="text-[11px] text-neutral-500 font-medium">
                        ({birthdaySummary.date} 기준)
                      </div>
                    </div>
                  )}

                  {/* C. 헤어(이발) 경과일/D-Day 카드 (헤어 심볼이 있을 때만 표시) */}
                  {hairSummary && (
                    <div className="border border-purple-200 bg-purple-50/80 rounded-2xl p-4 shadow-xs flex flex-col justify-between shrink-0">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900">
                        <span>✂️</span>
                        <span>{hairSummary.title}</span>
                      </div>
                      <div className="text-3xl font-black text-purple-600 tracking-tight my-2">
                        {hairSummary.displayText}
                      </div>
                      <div className="text-[11px] text-neutral-500 font-medium">
                        {hairSummary.subText}
                      </div>
                    </div>
                  )}

                  {/* D. 다가오는 약속 카드 */}
                  {upcomingAppointments.map((app) => (
                    <div key={`app-${app.id}`} className="border border-amber-200 bg-amber-50/80 rounded-2xl p-3.5 shadow-xs flex flex-col justify-between shrink-0">
                      <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                        <span className="flex items-center gap-1">📌 약속: {app.title}</span>
                        <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-md font-bold">D-Day</span>
                      </div>
                      <div className="text-[11px] text-neutral-500 font-medium mt-1">
                        날짜: {app.date}
                      </div>
                    </div>
                  ))}

                  {/* 등록된 요약 심볼이 아무것도 없을 때 */}
                  {!hasAnySummary && (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-400">
                      <CalendarDays className="w-8 h-8 mb-2 text-indigo-300" />
                      <span className="text-xs font-bold text-neutral-500 mb-1">일정 요약 없음</span>
                      <p className="text-[11px] text-neutral-400 leading-relaxed">
                        달력에 <span className="font-semibold text-indigo-600">연차, 반차, 헤어, 생일</span> 일정을 등록하면 이곳에 자동으로 요약 카드가 생성됩니다.
                      </p>
                    </div>
                  )}

                </div>

              </div>

              {/* [일정 조회/추가/수정/삭제 팝업 모달] */}
              {modalDate && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-3xl p-6 border border-indigo-200 shadow-2xl max-w-md w-full max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
                    
                    {/* 모달 헤더 */}
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-200 shrink-0">
                      <h3 className="text-base font-black text-indigo-950 flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-indigo-600" />
                        <span>{modalDate} 일정 관리</span>
                      </h3>
                      <button
                        onClick={() => {
                          setModalDate(null);
                          setPopupEditingId(null);
                        }}
                        className="text-neutral-400 hover:text-neutral-600 p-1.5 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* 모달 본문 1: 기존 등록된 일정 목록 (수정 및 삭제 가능) */}
                    <div className="my-3 overflow-y-auto space-y-2 max-h-[220px] pr-1">
                      <div className="text-[11px] font-bold text-neutral-500 mb-1">
                        등록된 일정 ({scheduleList.filter((s) => s.date === modalDate).length}건)
                      </div>

                      {scheduleList.filter((s) => s.date === modalDate).map((item) => {
                        const isEditingThis = popupEditingId === item.id;
                        const symbolObj = SYMBOL_CONFIG[item.symbol] || SYMBOL_CONFIG.appointment;
                        const colorObj = COLOR_CONFIG[item.color] || COLOR_CONFIG.pink;

                        if (isEditingThis) {
                          return (
                            <div key={`pop-edit-${item.id}`} className="p-3 rounded-2xl border-2 border-indigo-500 bg-indigo-50/50 space-y-2">
                              <input
                                type="text"
                                value={editPopupTitle}
                                onChange={(e) => setEditPopupTitle(e.target.value)}
                                className="w-full border border-indigo-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-neutral-900 bg-white"
                              />

                              {/* 심볼 변경 */}
                              <div className="flex gap-1 flex-wrap">
                                {Object.entries(SYMBOL_CONFIG).map(([key, val]) => (
                                  <button
                                    key={key}
                                    type="button"
                                    onClick={() => setEditPopupSymbol(key)}
                                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition ${
                                      editPopupSymbol === key
                                        ? "border-indigo-600 bg-indigo-600 text-white"
                                        : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                                    }`}
                                  >
                                    {val.icon} {val.label}
                                  </button>
                                ))}
                              </div>

                              {/* 색상 변경 */}
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-neutral-600">색상:</span>
                                {Object.entries(COLOR_CONFIG).map(([key, val]) => (
                                  <button
                                    key={key}
                                    type="button"
                                    onClick={() => setEditPopupColor(key)}
                                    className={`w-5 h-5 rounded-full ${val.chip} border-2 transition ${
                                      editPopupColor === key ? "border-indigo-800 scale-110" : "border-white"
                                    }`}
                                  />
                                ))}
                              </div>

                              <div className="flex justify-end gap-1.5 pt-1">
                                <button
                                  type="button"
                                  onClick={() => savePopupEdit(item.id)}
                                  className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700"
                                >
                                  저장
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setPopupEditingId(null)}
                                  className="px-3 py-1 bg-white border border-neutral-300 text-neutral-600 text-xs rounded-lg hover:bg-neutral-50"
                                >
                                  취소
                                </button>
                              </div>
                            </div>
                          );
                        }

                        return (
                          <div
                            key={item.id}
                            className={`flex items-center justify-between p-2 rounded-xl border text-xs font-semibold ${colorObj.class}`}
                          >
                            <div className="flex items-center gap-1.5 min-w-0 pr-2">
                              <span className="text-sm">{symbolObj.icon}</span>
                              <span className="truncate">{item.title}</span>
                              <span className="text-[10px] opacity-75 font-normal">({symbolObj.label})</span>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={() => startPopupEdit(item)}
                                title="수정"
                                className="p-1 rounded-md hover:bg-black/10 text-neutral-600"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteSchedule(item.id)}
                                title="삭제"
                                className="p-1 rounded-md hover:bg-rose-100 text-neutral-600 hover:text-rose-600"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}

                      {scheduleList.filter((s) => s.date === modalDate).length === 0 && (
                        <div className="text-center py-4 text-neutral-400 text-xs">
                          등록된 일정이 없습니다.
                        </div>
                      )}
                    </div>

                    {/* 모달 본문 2: 새 일정 등록 폼 */}
                    <form onSubmit={handleAddPopupSchedule} className="pt-3 border-t border-neutral-200 shrink-0 space-y-3">
                      <div className="text-xs font-bold text-neutral-800">새 일정 추가</div>

                      <div>
                        <input
                          type="text"
                          required
                          value={newSchedTitle}
                          onChange={(e) => setNewSchedTitle(e.target.value)}
                          placeholder="일정 제목을 입력하세요 (예: 치과, 생일파티 등)"
                          className="w-full border border-indigo-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 font-medium"
                        />
                      </div>

                      {/* 심볼 5종 선택 (연차, 반차, 헤어, 생일, 약속) */}
                      <div>
                        <div className="text-[11px] font-bold text-neutral-600 mb-1">심볼 선택</div>
                        <div className="grid grid-cols-5 gap-1">
                          {Object.entries(SYMBOL_CONFIG).map(([key, val]) => (
                            <button
                              key={key}
                              type="button"
                              onClick={() => setNewSchedSymbol(key)}
                              className={`py-1.5 rounded-xl text-[11px] font-bold border flex flex-col items-center gap-0.5 transition ${
                                newSchedSymbol === key
                                  ? "border-indigo-600 bg-indigo-50 text-indigo-950 font-black shadow-2xs"
                                  : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
                              }`}
                            >
                              <span className="text-sm">{val.icon}</span>
                              <span>{val.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 파스텔톤 5가지 색상 선택 */}
                      <div>
                        <div className="text-[11px] font-bold text-neutral-600 mb-1">파스텔 태그 색상</div>
                        <div className="flex items-center gap-3 bg-neutral-50 p-2 rounded-xl border border-neutral-200">
                          {Object.entries(COLOR_CONFIG).map(([key, val]) => (
                            <label key={key} className="flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="radio"
                                name="tagColor"
                                value={key}
                                checked={newSchedColor === key}
                                onChange={() => setNewSchedColor(key)}
                                className="hidden"
                              />
                              <span className={`w-6 h-6 rounded-full ${val.chip} border-2 flex items-center justify-center transition ${
                                newSchedColor === key ? "border-indigo-800 scale-110 shadow-xs" : "border-transparent opacity-70"
                              }`}>
                                {newSchedColor === key && <Check className="w-3 h-3 text-indigo-950 stroke-[3]" />}
                              </span>
                              <span className="text-[11px] font-semibold text-neutral-700">{val.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setModalDate(null);
                            setPopupEditingId(null);
                          }}
                          className="flex-1 py-2 rounded-xl border border-neutral-300 text-neutral-600 text-xs font-semibold hover:bg-neutral-50 transition"
                        >
                          닫기
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition"
                        >
                          일정 추가
                        </button>
                      </div>
                    </form>

                  </div>
                </div>
              )}

            </div>
          )}

          {/* ==================== B. [노래책] 탭 화면 ==================== */}
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

              <div className="border border-emerald-400 rounded-xl px-4 py-2.5 bg-emerald-100/60 backdrop-blur-[2px] shadow-sm shrink-0">
                <div className="grid grid-cols-12 gap-2 text-xs font-extrabold text-emerald-900 items-center">
                  <span className="col-span-2 flex items-center justify-center gap-1 text-center">🏷️ 장르</span>
                  <span className="col-span-4 flex items-center justify-center gap-1 text-center">🎤 가수 / 아티스트</span>
                  <span className="col-span-4 flex items-center justify-center gap-1 text-center">🎵 곡명</span>
                  <span className="col-span-2 flex items-center justify-center text-center">관리</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {filteredSongs.map((song) => {
                  const isPlayingThis = isPlayingAudio && currentSong?.id === song.id;
                  const isEditing = editingSongId === song.id;
                  const isCover = song.songType === "Cover";
                  const isOriginal = song.songType === "Original";

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
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-100/90 border border-emerald-200 text-emerald-900 text-[11px] font-bold text-center">
                          {song.genre}
                        </span>
                      </div>
                      <div className="col-span-4 text-neutral-800 truncate font-bold text-[13px] text-center px-1">
                        {song.artist}
                      </div>
                      <div className="col-span-4 flex items-center justify-center gap-2 font-bold text-neutral-900 px-1 overflow-hidden">
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
            </div>
          )}

          {/* ==================== C. 그 외 탭 ==================== */}
          {currentTab !== "songs" && currentTab !== "schedule" && (
            <div className="h-full border border-dashed border-emerald-300 rounded-2xl p-20 flex flex-col items-center justify-center text-center bg-emerald-50/20 backdrop-blur-[2px]">
              <span className="text-3xl mb-2 block">🚧</span>
              <h3 className="text-sm font-bold text-emerald-900 mb-1">
                {menuItems.find((m) => m.id === currentTab)?.label} 준비 중
              </h3>
              <p className="text-xs text-emerald-700/80">
                해당 탭의 기능도 곧 추가될 예정입니다.
              </p>
            </div>
          )}

        </section>

        {/* [3] 우측 배너 (세로 h-[760px] 고정) */}
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