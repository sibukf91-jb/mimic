// @ts-nocheck
/* eslint-disable */
"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Lock,
  Unlock,
  KeyRound,
  ArrowRight,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Minus,
  Trash2,
  Heart,
  SkipBack,
  SkipForward,
  Repeat,
  Volume2,
  VolumeX,
  Settings
} from "lucide-react";

import ScheduleTab from "@/components/tabs/ScheduleTab";
import LedgerTab from "@/components/tabs/LedgerTab";
import FavoritesTab from "@/components/tabs/FavoritesTab";
import BookmarksTab from "@/components/tabs/BookmarksTab";
import SongsTab from "@/components/tabs/SongsTab";
import OrdersTab from "@/components/tabs/OrdersTab";
import CartTab from "@/components/tabs/CartTab";
import RecipesTab from "@/components/tabs/RecipesTab";

export default function Home() {
  const [pin, setPin] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // 비밀번호 등록/변경 관련 상태
  const [storedPassword, setStoredPassword] = useState<string | null>(null);
  const [isSettingNewPassword, setIsSettingNewPassword] = useState(false);
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

  const [currentTab, setCurrentTab] = useState("schedule");

  // 초기 로딩 시 저장된 비밀번호 확인
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPw = localStorage.getItem("jb_space_custom_password");
      if (savedPw) {
        setStoredPassword(savedPw);
        setIsSettingNewPassword(false);
      } else {
        setIsSettingNewPassword(true);
      }
    }
  }, []);

  // 비밀번호 등록 처리
  const handleRegisterPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasswordInput.trim()) {
      setErrorMsg("비밀번호를 입력해주세요.");
      return;
    }
    if (newPasswordInput !== confirmPasswordInput) {
      setErrorMsg("비밀번호가 일치하지 않습니다.");
      return;
    }

    localStorage.setItem("jb_space_custom_password", newPasswordInput);
    setStoredPassword(newPasswordInput);
    setIsSettingNewPassword(false);
    setIsUnlocked(true);
    setPin("");
    setErrorMsg("");
    setNewPasswordInput("");
    setConfirmPasswordInput("");
  };

  // 등록된 비밀번호로 로그인
  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pin === storedPassword) {
      setErrorMsg("");
      setIsUnlocked(true);
      setPin("");
    } else {
      setErrorMsg("비밀번호가 일치하지 않습니다.");
      setPin("");
    }
  };

  // ================= 1. 테마 색상 동적 매핑 =================
  const themeClasses = useMemo(() => {
    if (currentTab === "recipes") {
      return {
        borderDashed: "border-orange-400/90",
        borderSolid: "border-orange-400/90",
        borderSubtle: "border-orange-200/90",
        bgLight: "bg-orange-50/40",
        bgHeader: "bg-orange-100/70",
        textPrimary: "text-orange-950",
        textSecondary: "text-orange-800",
        accentBtn: "bg-orange-500 hover:bg-orange-600 text-white",
        accentBtnSub: "bg-orange-100 hover:bg-orange-200 text-orange-800",
        accentActive: "border-orange-500 bg-orange-100 text-orange-900 font-bold",
        rangeAccent: "accent-orange-500",
        rangeBg: "bg-orange-100",
        activeTrack: "bg-orange-100/90 border-orange-400",
        playIcon: "text-orange-600 fill-orange-600",
        navActive: "bg-orange-100/90 text-orange-900 border-orange-300 shadow-sm",
      };
    }
    if (currentTab === "cart") {
      return {
        borderDashed: "border-rose-400/90",
        borderSolid: "border-rose-400/90",
        borderSubtle: "border-rose-200/90",
        bgLight: "bg-rose-50/40",
        bgHeader: "bg-rose-100/70",
        textPrimary: "text-rose-950",
        textSecondary: "text-rose-800",
        accentBtn: "bg-rose-500 hover:bg-rose-600 text-white",
        accentBtnSub: "bg-rose-100 hover:bg-rose-200 text-rose-800",
        accentActive: "border-rose-500 bg-rose-100 text-rose-900 font-bold",
        rangeAccent: "accent-rose-500",
        rangeBg: "bg-rose-100",
        activeTrack: "bg-rose-100/90 border-rose-400",
        playIcon: "text-rose-600 fill-rose-600",
        navActive: "bg-rose-100/90 text-rose-900 border-rose-300 shadow-sm",
      };
    }
    if (currentTab === "orders") {
      return {
        borderDashed: "border-indigo-400/90",
        borderSolid: "border-indigo-400/90",
        borderSubtle: "border-indigo-200/90",
        bgLight: "bg-indigo-50/40",
        bgHeader: "bg-indigo-100/70",
        textPrimary: "text-indigo-950",
        textSecondary: "text-indigo-800",
        accentBtn: "bg-indigo-600 hover:bg-indigo-700 text-white",
        accentBtnSub: "bg-indigo-100 hover:bg-indigo-200 text-indigo-800",
        accentActive: "border-indigo-500 bg-indigo-100 text-indigo-900 font-bold",
        rangeAccent: "accent-indigo-600",
        rangeBg: "bg-indigo-100",
        activeTrack: "bg-indigo-100/90 border-indigo-400",
        playIcon: "text-indigo-600 fill-indigo-600",
        navActive: "bg-indigo-100/90 text-indigo-900 border-indigo-300 shadow-sm",
      };
    }
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

  // ================= 2. 공용 플레이리스트 & 시계 =================
  const [songList, setSongList] = useState<any[]>([]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jb_bookmark_song_list");
      if (saved) setSongList(JSON.parse(saved));
    }
  }, []);

  const likedSongs = (songList || []).filter((s) => s.liked);
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

  const currentSong = currentPlayingIndex !== null ? likedSongs[currentPlayingIndex] : null;

  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

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
                if (repeatModeRef.current === "one") {
                  playerRef.current.seekTo(0);
                  playerRef.current.playVideo();
                } else {
                  setCurrentPlayingIndex((prev) => (prev !== null && prev < likedSongs.length - 1 ? prev + 1 : 0));
                }
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
    setCurrentPlayingIndex((prev) => (prev === null || prev === 0 ? likedSongs.length - 1 : prev - 1));
    setIsPlayingAudio(true);
    setCurrentTimeSec(0);
  };

  const handleNextSong = () => {
    if (likedSongs.length === 0) return;
    setCurrentPlayingIndex((prev) => (prev === null || prev >= likedSongs.length - 1 ? 0 : prev + 1));
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

  // 잠금 화면 / 비밀번호 등록 화면 렌더링
  if (!isUnlocked) {
    return (
      <main className="min-h-screen bg-[#0f1117] flex items-center justify-center p-4 relative select-none">
        <div className="w-full max-w-sm bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-neutral-800 border border-neutral-700 rounded-2xl flex items-center justify-center mb-6">
            {isSettingNewPassword ? (
              <Settings className="w-7 h-7 text-amber-400 animate-spin" />
            ) : (
              <Lock className="w-7 h-7 text-emerald-400 animate-pulse" />
            )}
          </div>
          
          <h1 className="text-xl font-bold text-white mb-1">JB's Bookmark Space</h1>
          <p className="text-xs text-neutral-400 mb-6">
            {isSettingNewPassword 
              ? "사용하실 새로운 비밀번호를 설정해주세요" 
              : "설정하신 비밀번호를 입력해주세요"}
          </p>

          {isSettingNewPassword ? (
            <form onSubmit={handleRegisterPassword} className="w-full space-y-3">
              <div className="relative">
                <input
                  type="password"
                  value={newPasswordInput}
                  autoFocus
                  onChange={(e) => {
                    setNewPasswordInput(e.target.value);
                    if (errorMsg) setErrorMsg("");
                  }}
                  placeholder="새 비밀번호 입력"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-center text-white tracking-widest text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={confirmPasswordInput}
                  onChange={(e) => {
                    setConfirmPasswordInput(e.target.value);
                    if (errorMsg) setErrorMsg("");
                  }}
                  placeholder="비밀번호 확인"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-center text-white tracking-widest text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
              {errorMsg && <p className="text-xs text-rose-400 font-medium">{errorMsg}</p>}
              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition duration-200"
              >
                <span>비밀번호 등록 및 입장</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleUnlock} className="w-full space-y-4">
              <div className="relative">
                <input
                  type="password"
                  maxLength={12}
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
              
              <button
                type="button"
                onClick={() => {
                  if (confirm("비밀번호를 새로 등록하시겠습니까? (기존 비밀번호가 초기화됩니다)")) {
                    localStorage.removeItem("jb_space_custom_password");
                    setStoredPassword(null);
                    setIsSettingNewPassword(true);
                    setErrorMsg("");
                  }
                }}
                className="text-[11px] text-neutral-500 hover:text-neutral-300 underline pt-2"
              >
                비밀번호를 잊으셨나요? (재설정)
              </button>
            </form>
          )}
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

      {/* 상단 헤더 */}
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

      {/* 본문 3단 레이아웃 */}
      <main className="max-w-[1720px] mx-auto w-full px-6 py-6 flex flex-col lg:flex-row gap-5 items-start flex-1 relative z-10">
        
        {/* [1] 좌측 배너 (일정 탭: 핑크 일러스트, 노래책 탭: 민트 일러스트, 그 외: 기본 영역) */}
        <aside className="w-full lg:w-[200px] h-[760px] shrink-0 sticky top-[73px]">
          {currentTab === "schedule" ? (
            <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-pink-400/90 shadow-sm relative bg-[#fbcfe8]">
              {/* 1순위: public에 저장된 일정 배너 이미지 로드 */}
              <img
                src="/schedule-banner.jpg"
                alt="일정 배너"
                className="w-full h-full object-cover relative z-10"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              {/* 2순위: 로딩 실패 시 백업 핑크 그래픽 */}
              <div className="absolute inset-0 flex flex-col items-center justify-between p-4 z-0 text-center bg-gradient-to-b from-[#fbcfe8] via-[#f472b6] to-[#831843]">
                <div className="pt-6">
                  <span className="text-3xl block filter drop-shadow">💖</span>
                  <span className="text-xs font-black text-white tracking-widest uppercase block mt-1">Schedule Space</span>
                </div>
                <div className="w-full flex flex-col items-center gap-2">
                  <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
                    <Clock className="w-10 h-10 text-pink-100 animate-pulse" />
                  </div>
                  <span className="text-[11px] font-bold text-pink-100 mt-2">JB's Calendar</span>
                </div>
                <div className="pb-4 text-[10px] text-pink-200 font-medium">
                  HADES Illustration
                </div>
              </div>
            </div>
          ) : currentTab === "songs" ? (
            <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-emerald-400/90 shadow-sm relative bg-[#8ec7b3]">
              {/* 1순위: public에 저장된 노래책 배너 이미지 로드 */}
              <img
                src="/song-banner.jpg"
                alt="노래책 배너"
                className="w-full h-full object-cover relative z-10"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              {/* 2순위: 로딩 실패 시 백업 민트 그래픽 */}
              <div className="absolute inset-0 flex flex-col items-center justify-between p-4 z-0 text-center bg-gradient-to-b from-[#8ec7b3] via-[#7abda8] to-[#1e2a26]">
                <div className="pt-6">
                  <span className="text-3xl block filter drop-shadow">🍀</span>
                  <span className="text-xs font-black text-white tracking-widest uppercase block mt-1">Music Space</span>
                </div>
                <div className="w-full flex flex-col items-center gap-2">
                  <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
                    <Heart className="w-10 h-10 text-emerald-100 fill-emerald-200/80 animate-pulse" />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-100 mt-2">JB's Playlist</span>
                </div>
                <div className="pb-4 text-[10px] text-emerald-200/80 font-medium">
                  HADES Illustration
                </div>
              </div>
            </div>
          ) : (
            <div className={`border-2 border-dashed ${themeClasses.borderDashed} rounded-2xl h-full flex flex-col items-center justify-center p-4 text-center ${themeClasses.bgLight} backdrop-blur-[2px] shadow-sm transition-colors duration-200`}>
              <span className="text-xl mb-1">🖼️</span>
              <span className={`text-xs font-semibold ${themeClasses.textSecondary}`}>좌측 배너 영역</span>
            </div>
          )}
        </aside>

        {/* [2] 중앙 내용 영역 (컴포넌트 연동) */}
        <section className="flex-1 w-full h-[760px] min-w-0 flex flex-col">
          {currentTab === "schedule" && <ScheduleTab themeClasses={themeClasses} />}
          {currentTab === "ledger" && <LedgerTab themeClasses={themeClasses} />}
          {currentTab === "favorites" && <FavoritesTab themeClasses={themeClasses} />}
          {currentTab === "bookmarks" && <BookmarksTab themeClasses={themeClasses} />}
          {currentTab === "songs" && <SongsTab themeClasses={themeClasses} isPlayingAudio={isPlayingAudio} currentSong={currentSong} />}
          {currentTab === "orders" && <OrdersTab themeClasses={themeClasses} />}
          {currentTab === "cart" && <CartTab themeClasses={themeClasses} />}
          {currentTab === "recipes" && <RecipesTab themeClasses={themeClasses} />}
        </section>

        {/* [3] 우측 배너 */}
        <aside className="w-full lg:w-[200px] h-[760px] shrink-0 sticky top-[73px] flex flex-col gap-3">
          
          {/* 시계 & 타이머 */}
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
                <span className="text-[10px] font-bold text-neutral-600">타이머</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => !isTimerRunning && setTimerMinutes((p) => Math.max(1, p - 1))} disabled={isTimerRunning} className={`p-0.5 rounded ${themeClasses.accentBtnSub}`}>
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className={`text-[10px] font-bold ${themeClasses.textPrimary} min-w-[24px]`}>{timerMinutes}분</span>
                  <button onClick={() => !isTimerRunning && setTimerMinutes((p) => p + 1)} disabled={isTimerRunning} className={`p-0.5 rounded ${themeClasses.accentBtnSub}`}>
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className={`text-xl font-black my-1 font-mono tracking-wider ${themeClasses.textPrimary}`}>
                {timerMin}:{timerSec}
              </div>

              <div className="flex items-center gap-1.5 w-full mt-1">
                <button onClick={toggleTimer} className={`flex-1 py-1 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 ${isTimerRunning ? "bg-amber-500 text-white" : themeClasses.accentBtn}`}>
                  {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                  <span>{isTimerRunning ? "정지" : "시작"}</span>
                </button>
                <button onClick={resetTimer} title="초기화" className={`p-1 rounded-lg border ${themeClasses.borderSubtle} hover:bg-white/60`}>
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* 플레이리스트 위젯 */}
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
                {currentSong ? <span>🎵 {currentSong.title}</span> : <span className="text-neutral-400 font-normal">곡을 선택하세요</span>}
              </div>

              <div className="space-y-1">
                <input
                  type="range"
                  min={0}
                  max={durationSec > 0 ? durationSec : 100}
                  value={currentTimeSec}
                  onChange={handleSeek}
                  disabled={!currentSong}
                  className={`w-full h-1 ${themeClasses.rangeBg} rounded-lg appearance-none cursor-pointer ${themeClasses.rangeAccent}`}
                />
                <div className={`flex justify-between text-[9px] ${themeClasses.textSecondary} font-mono`}>
                  <span>{formatSeconds(currentTimeSec)}</span>
                  <span>{formatSeconds(durationSec)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-0.5 px-1">
                <div className="flex items-center gap-1">
                  <button onClick={handlePrevSong} disabled={likedSongs.length === 0} className="p-1 rounded text-neutral-600"><SkipBack className="w-3.5 h-3.5" /></button>
                  <button onClick={togglePlayAudio} disabled={likedSongs.length === 0} className={`p-1.5 rounded-full ${themeClasses.accentBtn}`}>
                    {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                  </button>
                  <button onClick={handleNextSong} disabled={likedSongs.length === 0} className="p-1 rounded text-neutral-600"><SkipForward className="w-3.5 h-3.5" /></button>
                </div>
                <button onClick={() => setRepeatMode(repeatMode === "all" ? "one" : repeatMode === "one" ? "none" : "all")} className={`p-1 rounded text-[10px] font-bold ${repeatMode !== "none" ? themeClasses.accentActive + " px-1.5" : "text-neutral-400"}`}>
                  <Repeat className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className={`flex items-center gap-1.5 pt-1 border-t ${themeClasses.borderSubtle} px-0.5`}>
                <button onClick={toggleMute} className={`${themeClasses.textSecondary} p-0.5`}>
                  {isMuted || volume === 0 ? <VolumeX className="w-3.5 h-3.5 text-neutral-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                <input type="range" min={0} max={100} value={isMuted ? 0 : volume} onChange={handleVolumeChange} className={`w-full h-1 ${themeClasses.rangeBg} rounded-lg appearance-none cursor-pointer ${themeClasses.rangeAccent}`} />
              </div>
            </div>

            <div className="overflow-y-auto space-y-1 pr-1 max-h-[140px]">
              {likedSongs.map((song, idx) => (
                <div key={`liked-${song.id}`} onClick={() => handleSelectSong(idx)} className={`flex items-center justify-between p-1.5 rounded-lg border text-[11px] cursor-pointer ${currentPlayingIndex === idx ? themeClasses.activeTrack + " font-bold" : `bg-white/70 ${themeClasses.borderSubtle}`}`}>
                  <div className="min-w-0 pr-1 flex items-center gap-1.5">
                    <Play className={`w-3.5 h-3.5 shrink-0 ${currentPlayingIndex === idx && isPlayingAudio ? themeClasses.playIcon + " animate-pulse" : "text-neutral-400"}`} />
                    <span className="truncate">{song.title}</span>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); }} className="text-neutral-300 hover:text-rose-500 p-0.5"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* 우측 하단 배너 */}
          <div className={`border-2 border-dashed ${themeClasses.borderDashed} rounded-2xl p-3 flex-1 min-h-0 flex flex-col items-center justify-center text-center ${themeClasses.bgLight} backdrop-blur-[2px] shadow-sm overflow-hidden transition-colors duration-200`}>
            <span className="text-xl mb-1 shrink-0">🖼️</span>
            <span className={`text-xs font-semibold ${themeClasses.textSecondary} truncate`}>우측 하단 배너</span>
          </div>

        </aside>

      </main>
    </div>
  );
}