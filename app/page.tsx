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
  Trash2,
  ExternalLink,
  Music,
  SkipBack,
  SkipForward,
  Repeat,
  Volume2,
  VolumeX,
  Mic2,
  Disc3,
  Pencil,
  Check,
  X,
  Calendar as CalendarIcon,
  CalendarDays,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  PiggyBank,
  Tv,
  User,
  Key,
  Copy,
  BookOpen,
  ArrowUpDown,
  UtensilsCrossed,
  ChefHat
} from "lucide-react";

export default function Home() {
  const [pin, setPin] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const CORRECT_PIN = "1234";
  const [currentTab, setCurrentTab] = useState("recipes"); // 기본 진입 탭: 레시피

  // ================= 1. 테마 색상 동적 매핑 =================
  const themeClasses = useMemo(() => {
    // 1. 레시피 탭 (파스텔 딥 오렌지)
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
    // 2. 장바구니 탭 (파스텔 로즈/코랄)
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
    // 3. 구매물품 탭 (파스텔 인디고)
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
    // 4. 책갈피 탭 (파스텔 노랑)
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
    // 5. 즐겨찾기 탭 (파스텔 보라)
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
    // 6. 가계부 탭 (파스텔 하늘)
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
    // 7. 일정 탭 (파스텔 핑크)
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
    // 8. 노래책 탭 등 기본 (에메랄드)
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

  // ================= 2. 레시피 탭 데이터 & 상태 (신규) =================
  const getRecipeCategoryIcon = (cat: string) => {
    const c = (cat || "").trim().toLowerCase();
    if (c.includes("한식") || c.includes("밥") || c.includes("찌개") || c.includes("국")) return "🍚";
    if (c.includes("양식") || c.includes("파스타") || c.includes("스테이크") || c.includes("피자")) return "🍝";
    if (c.includes("일식") || c.includes("초밥") || c.includes("라멘") || c.includes("돈까스")) return "🍣";
    if (c.includes("중식") || c.includes("짜장") || c.includes("짬뽕") || c.includes("볶음")) return "🥟";
    if (c.includes("분식") || c.includes("떡볶이") || c.includes("라면")) return "🍢";
    if (c.includes("디저트") || c.includes("베이킹") || c.includes("빵") || c.includes("과자")) return "🍰";
    if (c.includes("안주") || c.includes("야식") || c.includes("맥주")) return "🍺";
    if (c.includes("샐러드") || c.includes("다이어트")) return "🥗";
    return "🍳";
  };

  const defaultRecipes = [
    {
      id: 1,
      category: "한식",
      title: "백종원 김치찌개",
      url: "https://www.youtube.com/watch?v=kYJjZtLzE3E",
      hasIngredients: "신김치, 돼지고기 앞다리살, 대파, 다진마늘",
      needIngredients: "두부, 쌀뜨물, 청양고추",
    },
    {
      id: 2,
      category: "양식",
      title: "원팬 알리오 올리오",
      url: "https://www.youtube.com/watch?v=yYJ4pL8P2xM",
      hasIngredients: "파스타면, 마늘, 올리브유, 소금",
      needIngredients: "페페론치노, 파슬리 가루",
    }
  ];

  const [recipeList, setRecipeList] = useState<any[]>([]);
  const [isRecipeLoaded, setIsRecipeLoaded] = useState(false);
  const [recipeModalUrl, setRecipeModalUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jb_bookmark_recipe_list_v1");
      setRecipeList(saved ? JSON.parse(saved) : defaultRecipes);
      setIsRecipeLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isRecipeLoaded && typeof window !== "undefined") {
      localStorage.setItem("jb_bookmark_recipe_list_v1", JSON.stringify(recipeList));
    }
  }, [recipeList, isRecipeLoaded]);

  // 레시피 등록 폼 상태
  const [newRecipeCategory, setNewRecipeCategory] = useState("한식");
  const [newRecipeTitle, setNewRecipeTitle] = useState("");
  const [newRecipeUrl, setNewRecipeUrl] = useState("");
  const [newRecipeHas, setNewRecipeHas] = useState("");
  const [newRecipeNeed, setNewRecipeNeed] = useState("");

  const [selectedRecipeCategory, setSelectedRecipeCategory] = useState("전체");
  const [recipeSearchQuery, setRecipeSearchQuery] = useState("");

  // 레시피 수정 상태
  const [editingRecipeId, setEditingRecipeId] = useState<number | null>(null);
  const [editRecipeCategory, setEditRecipeCategory] = useState("");
  const [editRecipeTitle, setEditRecipeTitle] = useState("");
  const [editRecipeUrl, setEditRecipeUrl] = useState("");
  const [editRecipeHas, setEditRecipeHas] = useState("");
  const [editRecipeNeed, setEditRecipeNeed] = useState("");

  const existingRecipeCategories = useMemo(() => {
    const set = new Set<string>();
    (recipeList || []).forEach((item) => {
      if (item?.category && item.category.trim()) set.add(item.category.trim());
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b, "ko"));
  }, [recipeList]);

  const handleAddRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecipeTitle.trim()) return;

    const newEntry = {
      id: Date.now(),
      category: newRecipeCategory.trim() || "기타",
      title: newRecipeTitle.trim(),
      url: newRecipeUrl.trim(),
      hasIngredients: newRecipeHas.trim() || "-",
      needIngredients: newRecipeNeed.trim() || "-",
    };

    setRecipeList([newEntry, ...recipeList]);
    setNewRecipeCategory("한식");
    setNewRecipeTitle("");
    setNewRecipeUrl("");
    setNewRecipeHas("");
    setNewRecipeNeed("");
  };

  const startEditRecipe = (item: any) => {
    setEditingRecipeId(item.id);
    setEditRecipeCategory(item.category || "한식");
    setEditRecipeTitle(item.title || "");
    setEditRecipeUrl(item.url || "");
    setEditRecipeHas(item.hasIngredients === "-" ? "" : item.hasIngredients || "");
    setEditRecipeNeed(item.needIngredients === "-" ? "" : item.needIngredients || "");
  };

  const cancelEditRecipe = () => setEditingRecipeId(null);

  const saveEditRecipe = (id: number) => {
    if (!editRecipeTitle.trim()) return;

    setRecipeList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              category: editRecipeCategory.trim() || "기타",
              title: editRecipeTitle.trim(),
              url: editRecipeUrl.trim(),
              hasIngredients: editRecipeHas.trim() || "-",
              needIngredients: editRecipeNeed.trim() || "-",
            }
          : item
      )
    );
    setEditingRecipeId(null);
  };

  const handleDeleteRecipe = (id: number) => {
    setRecipeList((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredRecipes = useMemo(() => {
    return (recipeList || [])
      .filter((item) => {
        if (!item) return false;
        const matchCategory = selectedRecipeCategory === "전체" || item.category === selectedRecipeCategory;
        const matchSearch =
          (item.title || "").toLowerCase().includes(recipeSearchQuery.toLowerCase()) ||
          (item.category || "").toLowerCase().includes(recipeSearchQuery.toLowerCase()) ||
          (item.hasIngredients || "").toLowerCase().includes(recipeSearchQuery.toLowerCase()) ||
          (item.needIngredients || "").toLowerCase().includes(recipeSearchQuery.toLowerCase());
        return matchCategory && matchSearch;
      })
      .sort((a, b) => (a.title || "").localeCompare(b.title || "", "ko"));
  }, [recipeList, selectedRecipeCategory, recipeSearchQuery]);

  // ================= 3. 일정 탭 데이터 =================
  const SCHEDULE_SYMBOL_CONFIG = {
    leave: { label: "연차", icon: "🌴" },
    half_leave: { label: "반차", icon: "🌓" },
    hair: { label: "헤어", icon: "✂️" },
    birthday: { label: "생일", icon: "🎂" },
    appointment: { label: "약속", icon: "📌" },
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
    } else setCalMonth(calMonth - 1);
  };
  const nextMonth = () => {
    if (calMonth === 12) {
      setCalYear(calYear + 1);
      setCalMonth(1);
    } else setCalMonth(calMonth + 1);
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

  // ================= 4. 가계부 탭 데이터 =================
  const LEDGER_SYMBOL_CONFIG = {
    taxi: { label: "택시", icon: "🚕" },
    delivery: { label: "배달", icon: "🛵" },
    convenience: { label: "편의점", icon: "🏪" },
    fixed: { label: "고정", icon: "📌" },
    salary: { label: "월급", icon: "💰" },
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
    } else setLedgerMonth(ledgerMonth - 1);
  };
  const nextLedgerMonth = () => {
    if (ledgerMonth === 12) {
      setLedgerYear(ledgerYear + 1);
      setLedgerMonth(1);
    } else setLedgerMonth(ledgerMonth + 1);
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

  const handleDeleteLedgerEntry = (id: number) => {
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
      setNewLedgerTitle(fixedItemObj ? fixedItemObj.tplTitle : "");
      setNewLedgerAmount("");
      setNewLedgerSymbol("fixed");
      setNewLedgerType("expense");
      setNewLedgerColor(fixedItemObj ? (fixedItemObj.color || "pink") : "pink");
    }
  };

  // ================= 5. 즐겨찾기 탭 데이터 =================
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
    setTimeout(() => setCopiedId((prev) => (prev === id ? null : prev)), 1500);
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

  // ================= 6. 책갈피 탭 데이터 =================
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
  const [newBmarkCategory, setNewBmarkCategory] = useState("");
  const [newBmarkPlatform, setNewBmarkPlatform] = useState("");
  const [newBmarkTitle, setNewBmarkTitle] = useState("");
  const [newBmarkUpdate, setNewBmarkUpdate] = useState("월요일");
  const [newBmarkRelease, setNewBmarkRelease] = useState("");
  const [newBmarkSchedule, setNewBmarkSchedule] = useState("");
  const [newBmarkBookmark, setNewBmarkBookmark] = useState(0);
  const [selectedBmarkCategory, setSelectedBmarkCategory] = useState("전체");
  const [bmarkSearchQuery, setBmarkSearchQuery] = useState("");
  const [editingBmarkId, setEditingBmarkId] = useState<number | null>(null);
  const [editBmarkCategory, setEditBmarkCategory] = useState("");
  const [editBmarkPlatform, setEditBmarkPlatform] = useState("");
  const [editBmarkTitle, setEditBmarkTitle] = useState("");
  const [editBmarkUpdate, setEditBmarkUpdate] = useState("월요일");
  const [editBmarkRelease, setEditBmarkRelease] = useState("");
  const [editBmarkSchedule, setEditBmarkSchedule] = useState("");
  const [editBmarkEpisode, setEditBmarkEpisode] = useState("");
  const [editBmarkBookmark, setEditBmarkBookmark] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jb_bookmark_reading_list_v7");
      setBookmarkList(saved ? JSON.parse(saved) : defaultBookmarks);
      setIsBookmarkLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isBookmarkLoaded && typeof window !== "undefined") {
      localStorage.setItem("jb_bookmark_reading_list_v7", JSON.stringify(bookmarkList));
    }
  }, [bookmarkList, isBookmarkLoaded]);

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
      prev.map((b) => (b.id === id ? { ...b, currentBookmark: Math.max(0, (b.currentBookmark || 0) + delta) } : b))
    );
  };

  const handleToggleCompleted = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkList((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isCompleted: !b.isCompleted } : b))
    );
  };

  const dayRankMap: Record<string, number> = {
    "월요일": 1, "화요일": 2, "수요일": 3, "목요일": 4, "금요일": 5, "토요일": 6, "일요일": 7, "완결": 8
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

  // ================= 7. 노래책 탭 데이터 =================
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
      .sort((a, b) => (a.title || "").localeCompare(b.title || "", "ko"));
  }, [songList, selectedGenre, searchQuery]);

  // ================= 8. 구매물품 탭 데이터 =================
  const defaultOrders = [
    {
      id: 1,
      category: "전자기기",
      platform: "쿠팡",
      name: "로지텍 무선 키보드 MX Keys",
      price: 139000,
      orderDate: "2026-09-15",
      status: "배송완료",
      memo: "로켓배송 수령 완료"
    }
  ];

  const [orderList, setOrderList] = useState<any[]>([]);
  const [isOrderLoaded, setIsOrderLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jb_bookmark_orders_list_v1");
      setOrderList(saved ? JSON.parse(saved) : defaultOrders);
      setIsOrderLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isOrderLoaded && typeof window !== "undefined") {
      localStorage.setItem("jb_bookmark_orders_list_v1", JSON.stringify(orderList));
    }
  }, [orderList, isOrderLoaded]);

  const [newOrderCategory, setNewOrderCategory] = useState("");
  const [newOrderPlatform, setNewOrderPlatform] = useState("");
  const [newOrderName, setNewOrderName] = useState("");
  const [newOrderPrice, setNewOrderPrice] = useState("");
  const [newOrderDate, setNewOrderDate] = useState(TODAY_STR);
  const [newOrderStatus, setNewOrderStatus] = useState("배송완료");
  const [newOrderMemo, setNewOrderMemo] = useState("");
  const [selectedOrderCategory, setSelectedOrderCategory] = useState("전체");
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
  const [editOrderCategory, setEditOrderCategory] = useState("");
  const [editOrderPlatform, setEditOrderPlatform] = useState("");
  const [editOrderName, setEditOrderName] = useState("");
  const [editOrderPrice, setEditOrderPrice] = useState("");
  const [editOrderDate, setEditOrderDate] = useState("");
  const [editOrderStatus, setEditOrderStatus] = useState("배송완료");
  const [editOrderMemo, setEditOrderMemo] = useState("");

  const existingOrderCategories = useMemo(() => {
    const set = new Set<string>();
    (orderList || []).forEach((o) => {
      if (o?.category && o.category.trim()) set.add(o.category.trim());
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b, "ko"));
  }, [orderList]);

  const handleAddOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrderName.trim()) return;

    const newEntry = {
      id: Date.now(),
      category: newOrderCategory.trim() || "생활용품",
      platform: newOrderPlatform.trim() || "온라인",
      name: newOrderName.trim(),
      price: Number(newOrderPrice) || 0,
      orderDate: newOrderDate || TODAY_STR,
      status: newOrderStatus || "배송완료",
      memo: newOrderMemo.trim()
    };

    setOrderList([newEntry, ...orderList]);
    setNewOrderCategory("");
    setNewOrderPlatform("");
    setNewOrderName("");
    setNewOrderPrice("");
    setNewOrderDate(TODAY_STR);
    setNewOrderStatus("배송완료");
    setNewOrderMemo("");
  };

  const startEditOrder = (item: any) => {
    setEditingOrderId(item.id);
    setEditOrderCategory(item.category || "");
    setEditOrderPlatform(item.platform || "");
    setEditOrderName(item.name || "");
    setEditOrderPrice(String(item.price || ""));
    setEditOrderDate(item.orderDate || "");
    setEditOrderStatus(item.status || "배송완료");
    setEditOrderMemo(item.memo || "");
  };

  const cancelEditOrder = () => setEditingOrderId(null);

  const saveEditOrder = (id: number) => {
    if (!editOrderName.trim()) return;

    setOrderList((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              category: editOrderCategory.trim() || "생활용품",
              platform: editOrderPlatform.trim() || "온라인",
              name: editOrderName.trim(),
              price: Number(editOrderPrice) || 0,
              orderDate: editOrderDate || TODAY_STR,
              status: editOrderStatus || "배송완료",
              memo: editOrderMemo.trim()
            }
          : o
      )
    );
    setEditingOrderId(null);
  };

  const handleDeleteOrder = (id: number) => {
    setOrderList((prev) => prev.filter((o) => o.id !== id));
  };

  const filteredOrders = useMemo(() => {
    return (orderList || [])
      .filter((o) => {
        if (!o) return false;
        const matchCategory = selectedOrderCategory === "전체" || o.category === selectedOrderCategory;
        const matchSearch =
          (o.name || "").toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
          (o.platform || "").toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
          (o.category || "").toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
          (o.memo || "").toLowerCase().includes(orderSearchQuery.toLowerCase());
        return matchCategory && matchSearch;
      })
      .sort((a, b) => (b.orderDate || "").localeCompare(a.orderDate || ""));
  }, [orderList, selectedOrderCategory, orderSearchQuery]);

  const totalOrderAmount = useMemo(() => {
    return (filteredOrders || []).reduce((sum, item) => sum + (Number(item?.price) || 0), 0);
  }, [filteredOrders]);

  // ================= 9. 장바구니 탭 데이터 =================
  const defaultCartItems = [
    {
      id: 1,
      category: "전자기기",
      priority: "⭐⭐⭐",
      name: "소니 WH-1000XM5 헤드폰",
      price: 449000,
      specOption: "실버 / 블루투스 5.2",
      url: "https://www.sony.co.kr",
      memo: "생일 선물 후보 또는 세일할 때 구매",
      purchased: false
    }
  ];

  const [cartList, setCartList] = useState<any[]>([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jb_bookmark_cart_list_v1");
      setCartList(saved ? JSON.parse(saved) : defaultCartItems);
      setIsCartLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isCartLoaded && typeof window !== "undefined") {
      localStorage.setItem("jb_bookmark_cart_list_v1", JSON.stringify(cartList));
    }
  }, [cartList, isCartLoaded]);

  const [newCartCategory, setNewCartCategory] = useState("");
  const [newCartPriority, setNewCartPriority] = useState("⭐⭐⭐");
  const [newCartName, setNewCartName] = useState("");
  const [newCartPrice, setNewCartPrice] = useState("");
  const [newCartSpec, setNewCartSpec] = useState("");
  const [newCartUrl, setNewCartUrl] = useState("");
  const [newCartMemo, setNewCartMemo] = useState("");
  const [selectedCartCategory, setSelectedCartCategory] = useState("전체");
  const [cartSearchQuery, setCartSearchQuery] = useState("");

  const [editingCartId, setEditingCartId] = useState<number | null>(null);
  const [editCartCategory, setEditCartCategory] = useState("");
  const [editCartPriority, setEditCartPriority] = useState("⭐⭐⭐");
  const [editCartName, setEditCartName] = useState("");
  const [editCartPrice, setEditCartPrice] = useState("");
  const [editCartSpec, setEditCartSpec] = useState("");
  const [editCartUrl, setEditCartUrl] = useState("");
  const [editCartMemo, setEditCartMemo] = useState("");

  const existingCartCategories = useMemo(() => {
    const set = new Set<string>();
    (cartList || []).forEach((item) => {
      if (item && item.category && item.category.trim()) set.add(item.category.trim());
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b, "ko"));
  }, [cartList]);

  const handleAddCartItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCartName.trim()) return;

    let formattedUrl = newCartUrl.trim();
    if (formattedUrl && !formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = "https://" + formattedUrl;
    }

    const newEntry = {
      id: Date.now(),
      category: newCartCategory.trim() || "생활용품",
      priority: newCartPriority || "⭐⭐⭐",
      name: newCartName.trim(),
      price: Number(newCartPrice) || 0,
      specOption: newCartSpec.trim() || "-",
      url: formattedUrl,
      memo: newCartMemo.trim(),
      purchased: false
    };

    setCartList([newEntry, ...cartList]);
    setNewCartCategory("");
    setNewCartPriority("⭐⭐⭐");
    setNewCartName("");
    setNewCartPrice("");
    setNewCartSpec("");
    setNewCartUrl("");
    setNewCartMemo("");
  };

  const startEditCartItem = (item: any) => {
    setEditingCartId(item.id);
    setEditCartCategory(item.category || "");
    setEditCartPriority(item.priority || "⭐⭐⭐");
    setEditCartName(item.name || "");
    setEditCartPrice(String(item.price || ""));
    setEditCartSpec(item.specOption === "-" ? "" : item.specOption || "");
    setEditCartUrl(item.url || "");
    setEditCartMemo(item.memo || "");
  };

  const cancelEditCartItem = () => setEditingCartId(null);

  const saveEditCartItem = (id: number) => {
    if (!editCartName.trim()) return;

    let formattedUrl = editCartUrl.trim();
    if (formattedUrl && !formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = "https://" + formattedUrl;
    }

    setCartList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              category: editCartCategory.trim() || "생활용품",
              priority: editCartPriority || "⭐⭐⭐",
              name: editCartName.trim(),
              price: Number(editCartPrice) || 0,
              specOption: editCartSpec.trim() || "-",
              url: formattedUrl,
              memo: editCartMemo.trim()
            }
          : item
      )
    );
    setEditingCartId(null);
  };

  const handleDeleteCartItem = (id: number) => {
    setCartList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleTogglePurchased = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCartList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, purchased: !item.purchased } : item))
    );
  };

  const filteredCartItems = useMemo(() => {
    return (cartList || [])
      .filter((item) => {
        if (!item) return false;
        const matchCategory = selectedCartCategory === "전체" || item.category === selectedCartCategory;
        const matchSearch =
          (item.name || "").toLowerCase().includes(cartSearchQuery.toLowerCase()) ||
          (item.category || "").toLowerCase().includes(cartSearchQuery.toLowerCase()) ||
          (item.specOption || "").toLowerCase().includes(cartSearchQuery.toLowerCase()) ||
          (item.memo || "").toLowerCase().includes(cartSearchQuery.toLowerCase());
        return matchCategory && matchSearch;
      })
      .sort((a, b) => (b.priority || "").localeCompare(a.priority || ""));
  }, [cartList, selectedCartCategory, cartSearchQuery]);

  const totalCartAmount = useMemo(() => {
    return (filteredCartItems || []).reduce((sum, item) => sum + (Number(item?.price) || 0), 0);
  }, [filteredCartItems]);

  // ================= 10. 플레이리스트 & 시계 =================
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

        {/* [2] 중앙 내용 영역 (8개 탭 모두 포함) */}
        <section className="flex-1 w-full h-[760px] min-w-0 flex flex-col">
          
          {/* 1. [레시피] 탭 화면 (신규 구현) */}
          {currentTab === "recipes" && (
            <div className="h-full overflow-y-auto flex flex-col gap-2.5 pr-1">
              {/* 등록 바 */}
              <form onSubmit={handleAddRecipe} className="border-2 border-orange-400/90 rounded-2xl p-3 flex flex-wrap items-center gap-1.5 bg-orange-50/40 backdrop-blur-[2px] shadow-sm shrink-0">
                <input
                  type="text"
                  list="recipe-category-suggestions"
                  value={newRecipeCategory}
                  onChange={(e) => setNewRecipeCategory(e.target.value)}
                  placeholder="분류 (예: 한식)"
                  className="w-24 border border-orange-300 bg-white/90 rounded-lg px-2 py-1.5 text-xs font-medium text-orange-950 focus:outline-none"
                />
                <datalist id="recipe-category-suggestions">
                  <option value="한식" />
                  <option value="양식" />
                  <option value="일식" />
                  <option value="중식" />
                  <option value="분식" />
                  <option value="디저트" />
                  <option value="안주" />
                  {existingRecipeCategories.map((c) => (<option key={c} value={c} />))}
                </datalist>

                <input
                  type="text"
                  required
                  value={newRecipeTitle}
                  onChange={(e) => setNewRecipeTitle(e.target.value)}
                  placeholder="레시피 이름 *"
                  className="flex-1 min-w-[130px] border border-orange-300 bg-white/90 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none placeholder-neutral-500 font-bold"
                />

                <input
                  type="text"
                  value={newRecipeUrl}
                  onChange={(e) => setNewRecipeUrl(e.target.value)}
                  placeholder="유튜브 레시피 영상 링크"
                  className="w-48 border border-orange-300 bg-white/90 rounded-lg px-2 py-1.5 text-xs focus:outline-none placeholder-neutral-500 font-medium"
                />

                <input
                  type="text"
                  value={newRecipeHas}
                  onChange={(e) => setNewRecipeHas(e.target.value)}
                  placeholder="있는 재료 (직접 작성)"
                  className="w-48 border border-orange-300 bg-white/90 rounded-lg px-2 py-1.5 text-xs focus:outline-none placeholder-neutral-500 font-medium"
                />

                <input
                  type="text"
                  value={newRecipeNeed}
                  onChange={(e) => setNewRecipeNeed(e.target.value)}
                  placeholder="없는 재료/장볼것 (직접 작성)"
                  className="w-48 border border-orange-300 bg-white/90 rounded-lg px-2 py-1.5 text-xs focus:outline-none placeholder-neutral-500 font-medium"
                />

                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs px-4 py-2 rounded-lg transition shrink-0 shadow-sm flex items-center gap-1 ml-auto"
                >
                  <Plus className="w-3.5 h-3.5" /> 추가
                </button>
              </form>

              {/* 검색 및 분류 필터 */}
              <div className="border-2 border-orange-400/90 rounded-2xl p-3 bg-orange-50/40 backdrop-blur-[2px] shadow-sm flex flex-col gap-2 shrink-0">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={recipeSearchQuery}
                    onChange={(e) => setRecipeSearchQuery(e.target.value)}
                    placeholder="레시피명, 분류, 재료를 검색해보세요..."
                    className="w-full border border-orange-300 bg-white/90 rounded-xl pl-9 pr-3 py-1.5 text-xs font-medium"
                  />
                  <Search className="w-3.5 h-3.5 text-orange-600/70 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                <div className="flex items-center gap-1.5 text-xs flex-wrap pt-0.5">
                  <span className="text-orange-950 font-semibold text-[11px] mr-1">분류:</span>
                  <button
                    onClick={() => setSelectedRecipeCategory("전체")}
                    className={`px-2.5 py-0.5 rounded-full border text-[11px] transition font-medium ${
                      selectedRecipeCategory === "전체"
                        ? "border-orange-500 bg-orange-200 text-orange-950 font-bold shadow-2xs"
                        : "border-orange-300/80 bg-white/70 text-neutral-700 hover:bg-white"
                    }`}
                  >
                    전체
                  </button>
                  {existingRecipeCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedRecipeCategory(cat)}
                      className={`px-2.5 py-0.5 rounded-full border text-[11px] transition font-medium ${
                        selectedRecipeCategory === cat
                          ? "border-orange-500 bg-orange-200 text-orange-950 font-bold shadow-2xs"
                          : "border-orange-300/80 bg-white/70 text-neutral-700 hover:bg-white"
                      }`}
                    >
                      {getRecipeCategoryIcon(cat)} {cat}
                    </button>
                  ))}
                  <span className="ml-auto text-[11px] text-orange-800/80 font-bold">
                    총 {filteredRecipes.length}개의 레시피
                  </span>
                </div>
              </div>

              {/* 헤더 박스 */}
              <div className="border-2 border-orange-400/90 rounded-xl px-3 py-2.5 bg-orange-100/70 backdrop-blur-[2px] shadow-sm shrink-0">
                <div className="grid grid-cols-12 gap-1 text-[11px] font-extrabold text-orange-950 items-center text-center">
                  <span className="col-span-2">분류 / 심볼</span>
                  <span className="col-span-3">레시피 이름</span>
                  <span className="col-span-1">영상 바로가기</span>
                  <span className="col-span-3">있는 재료</span>
                  <span className="col-span-2">없는 재료 (장볼것)</span>
                  <span className="col-span-1">관리</span>
                </div>
              </div>

              {/* 리스트 */}
              <div className="flex flex-col gap-2">
                {filteredRecipes.map((item) => {
                  const isEditing = editingRecipeId === item.id;
                  const catIcon = getRecipeCategoryIcon(item.category);
                  const hasUrl = Boolean(item.url && getYouTubeId(item.url));

                  if (isEditing) {
                    return (
                      <div
                        key={`edit-recipe-${item.id}`}
                        className="grid grid-cols-12 gap-1 items-center p-2.5 rounded-2xl border-2 border-orange-400 bg-orange-50/90 shadow-md text-center"
                      >
                        <div className="col-span-2 px-1">
                          <input type="text" value={editRecipeCategory} onChange={(e) => setEditRecipeCategory(e.target.value)} placeholder="분류" className="w-full border border-orange-300 bg-white rounded px-1.5 py-1 text-[11px] font-bold" />
                        </div>
                        <div className="col-span-3 px-1">
                          <input type="text" required value={editRecipeTitle} onChange={(e) => setEditRecipeTitle(e.target.value)} placeholder="레시피 이름" className="w-full border border-orange-300 bg-white rounded px-2 py-1 text-[11px] font-bold" />
                        </div>
                        <div className="col-span-1 px-0.5">
                          <input type="text" value={editRecipeUrl} onChange={(e) => setEditRecipeUrl(e.target.value)} placeholder="유튜브 링크" className="w-full border border-orange-300 bg-white rounded px-1 py-1 text-[10px]" />
                        </div>
                        <div className="col-span-3 px-1">
                          <input type="text" value={editRecipeHas} onChange={(e) => setEditRecipeHas(e.target.value)} placeholder="있는 재료" className="w-full border border-orange-300 bg-white rounded px-1.5 py-1 text-[11px]" />
                        </div>
                        <div className="col-span-2 px-1">
                          <input type="text" value={editRecipeNeed} onChange={(e) => setEditRecipeNeed(e.target.value)} placeholder="없는 재료" className="w-full border border-orange-300 bg-white rounded px-1.5 py-1 text-[11px]" />
                        </div>
                        <div className="col-span-1 flex items-center justify-center gap-1">
                          <button onClick={() => saveEditRecipe(item.id)} title="저장" className="p-1 rounded bg-orange-500 text-white font-bold text-[10px]"><Check className="w-3 h-3" /></button>
                          <button onClick={cancelEditRecipe} title="취소" className="p-1 rounded border border-neutral-300 bg-white text-neutral-600 text-[10px]"><X className="w-3 h-3" /></button>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 gap-1 items-center text-[11px] p-2.5 rounded-2xl border-2 border-orange-400/90 bg-orange-50/40 hover:bg-orange-50/70 transition shadow-2xs text-center text-neutral-900"
                    >
                      {/* 1. 분류 & 심볼 */}
                      <div className="col-span-2 flex justify-center">
                        <span className="px-2.5 py-1 rounded-lg bg-orange-100 text-orange-950 border border-orange-300 font-bold shadow-2xs flex items-center gap-1">
                          <span>{catIcon}</span>
                          <span>{item.category}</span>
                        </span>
                      </div>

                      {/* 2. 레시피 이름 */}
                      <div className="col-span-3 text-neutral-900 font-black truncate px-1 text-center" title={item.title}>
                        {item.title}
                      </div>

                      {/* 3. 영상 바로가기 (모달 팝업) */}
                      <div className="col-span-1 flex justify-center">
                        {hasUrl ? (
                          <button
                            onClick={() => setRecipeModalUrl(item.url)}
                            className="px-2 py-1 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-[10px] flex items-center gap-0.5 shadow-2xs transition active:scale-95"
                            title="레시피 영상 시청"
                          >
                            <Play className="w-3 h-3 fill-white" />
                            <span>시청</span>
                          </button>
                        ) : (
                          <span className="text-neutral-400 text-[10px]">-</span>
                        )}
                      </div>

                      {/* 4. 있는 재료 */}
                      <div className="col-span-3 text-emerald-800 font-semibold truncate px-1 text-left pl-2" title={item.hasIngredients}>
                        <span className="text-[10px] bg-emerald-100 border border-emerald-200 px-1.5 py-0.5 rounded mr-1">보유</span>
                        {item.hasIngredients}
                      </div>

                      {/* 5. 없는 재료 */}
                      <div className="col-span-2 text-rose-700 font-semibold truncate px-1 text-left pl-2" title={item.needIngredients}>
                        <span className="text-[10px] bg-rose-100 border border-rose-200 px-1.5 py-0.5 rounded mr-1">필요</span>
                        {item.needIngredients}
                      </div>

                      {/* 6. 관리 */}
                      <div className="col-span-1 flex items-center justify-center gap-1">
                        <button onClick={() => startEditRecipe(item)} title="수정" className="p-1 rounded text-neutral-500 hover:text-orange-900 hover:bg-white transition"><Pencil className="w-3 h-3" /></button>
                        <button onClick={() => handleDeleteRecipe(item.id)} title="삭제" className="p-1 rounded text-neutral-500 hover:text-rose-600 hover:bg-white transition"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </div>
                  );
                })}

                {filteredRecipes.length === 0 && (
                  <div className="border-2 border-dashed border-orange-300 rounded-2xl p-12 text-center text-xs font-medium text-orange-800/70 bg-orange-50/20">
                    등록된 레시피가 없습니다. 나만의 요리법을 등록해보세요!
                  </div>
                )}
              </div>

              {/* 레시피 비디오 모달 팝업 */}
              {recipeModalUrl && (
                <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setRecipeModalUrl(null)}>
                  <div className="bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-neutral-700 w-full max-w-4xl max-h-[720px] flex flex-col relative animate-in fade-in zoom-in-95 duration-150" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between px-4 py-2 bg-neutral-900/90 border-b border-neutral-800 text-white shrink-0">
                      <div className="flex items-center gap-2 text-xs font-bold text-neutral-300"><Tv className="w-4 h-4 text-orange-400" /><span>레시피 영상 시청</span></div>
                      <button onClick={() => setRecipeModalUrl(null)} className="p-1 rounded-lg text-neutral-400 hover:text-white transition"><X className="w-5 h-5" /></button>
                    </div>
                    <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                      <iframe src={`https://www.youtube.com/embed/${getYouTubeId(recipeModalUrl)}?autoplay=1`} title="Recipe Video Player" className="w-full h-full border-0" allow="autoplay; picture-in-picture" allowFullScreen />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. [일정] 탭 화면 */}
          {currentTab === "schedule" && (
            <div className="h-full flex flex-col gap-3">
              <div className="border-2 border-pink-400/80 rounded-2xl bg-white/95 backdrop-blur-md px-5 py-3 shadow-sm flex items-center justify-between shrink-0">
                <div className="flex-1 flex items-center justify-between pr-6 border-r border-pink-200">
                  <button onClick={prevMonth} className="px-4 py-1.5 rounded-xl border border-pink-400 text-pink-700 hover:bg-pink-50 font-bold text-xs transition">&lt; 이전달</button>
                  <h2 className="text-lg font-black text-pink-950 tracking-tight flex items-center gap-2"><span>🗓️</span><span>{calYear}년 {calMonth}월 일정표</span></h2>
                  <button onClick={nextMonth} className="px-4 py-1.5 rounded-xl border border-pink-400 text-pink-700 hover:bg-pink-50 font-bold text-xs transition">다음달 &gt;</button>
                </div>
                <div className="w-[280px] pl-6 flex items-center gap-1.5 text-sm font-extrabold text-pink-900"><span>📌</span><span>일정 요약</span></div>
              </div>

              <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-3 items-stretch">
                <div className="flex-1 h-full border-2 border-pink-400/80 rounded-2xl bg-white/95 backdrop-blur-md p-4 shadow-sm flex flex-col justify-between overflow-hidden">
                  <div className="grid grid-cols-7 text-center font-bold text-xs pb-2 border-b border-pink-100 text-neutral-700 shrink-0">
                    <span className="text-rose-600 font-extrabold">일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span className="text-blue-600 font-extrabold">토</span>
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
                        <div key={cell.dateStr} onClick={() => setModalDate(cell.dateStr)} className={`h-full border rounded-xl p-1.5 flex flex-col justify-between transition group relative cursor-pointer min-h-0 ${isToday ? "border-amber-400 bg-amber-50/70" : "border-pink-200/90 bg-white hover:border-pink-400"}`}>
                          <div className="flex items-center justify-between text-[11px] font-bold leading-tight">
                            <span className={isSunday || holidayName ? "text-rose-600" : isSaturday ? "text-blue-600" : "text-neutral-800"}>{cell.day}</span>
                            {holidayName && <span className="text-[9px] font-bold text-rose-500 truncate max-w-[55px]">{holidayName}</span>}
                          </div>
                          <div className="flex-1 overflow-y-auto space-y-1 my-0.5 pr-0.5 scrollbar-none">
                            {daySchedules.map((item) => {
                              const symbolInfo = SCHEDULE_SYMBOL_CONFIG[item.symbol] || SCHEDULE_SYMBOL_CONFIG.appointment;
                              const colorInfo = SCHEDULE_COLOR_CONFIG[item.color] || SCHEDULE_COLOR_CONFIG.pink;
                              return (
                                <div key={item.id} className={`flex items-center justify-between px-1.5 py-0.5 rounded border text-[10px] font-semibold leading-none shadow-2xs ${colorInfo.class}`}>
                                  <span className="truncate flex items-center gap-1"><span>{symbolInfo.icon}</span><span>{item.title}</span></span>
                                  <button onClick={(e) => handleDeleteSchedule(item.id, e)} title="삭제" className="text-neutral-400 hover:text-rose-500 ml-1 shrink-0"><X className="w-2.5 h-2.5" /></button>
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
                      <span className="text-xs font-bold text-blue-900">남은 연차 (총 16개 기준)</span>
                      <div className="text-3xl font-black text-blue-600 tracking-tight my-2">{leaveSummary.remaining} 개</div>
                      <div className="text-[11px] text-neutral-500 font-medium">사용: {leaveSummary.used}개</div>
                    </div>
                  )}
                  {birthdaySummary && (
                    <div className="border border-rose-200 bg-rose-50/80 rounded-2xl p-4 shadow-xs flex flex-col justify-between shrink-0">
                      <span className="text-xs font-bold text-rose-900">🎂 {birthdaySummary.title}</span>
                      <div className="text-3xl font-black text-rose-600 tracking-tight my-2">{birthdaySummary.dDayText}</div>
                    </div>
                  )}
                  {hairSummary && (
                    <div className="border border-purple-200 bg-purple-50/80 rounded-2xl p-4 shadow-xs flex flex-col justify-between shrink-0">
                      <span className="text-xs font-bold text-purple-900">✂️ {hairSummary.title}</span>
                      <div className="text-3xl font-black text-purple-600 tracking-tight my-2">{hairSummary.displayText}</div>
                    </div>
                  )}
                  {upcomingAppointments.map((app) => (
                    <div key={`app-${app.id}`} className="border border-amber-200 bg-amber-50/80 rounded-2xl p-3.5 shadow-xs flex flex-col justify-between shrink-0">
                      <span className="text-xs font-bold text-amber-900">📌 약속: {app.title}</span>
                      <div className="text-[11px] text-neutral-500 font-medium mt-1">{app.date}</div>
                    </div>
                  ))}
                </div>
              </div>

              {modalDate && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4" onClick={() => setModalDate(null)}>
                  <div className="bg-white rounded-3xl p-6 border border-pink-300 shadow-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-200 shrink-0">
                      <h3 className="text-base font-black text-neutral-900 flex items-center gap-2"><CalendarIcon className="w-5 h-5 text-pink-500" /><span>{modalDate} 일정 관리</span></h3>
                      <button onClick={() => setModalDate(null)} className="text-neutral-400 hover:text-neutral-600 p-1.5 rounded-lg"><X className="w-5 h-5" /></button>
                    </div>
                    <form onSubmit={handleAddPopupSchedule} className="pt-3 space-y-3">
                      <input type="text" required value={newSchedTitle} onChange={(e) => setNewSchedTitle(e.target.value)} placeholder="일정 제목 입력" className="w-full border border-pink-300 rounded-xl px-3 py-2 text-xs font-medium" />
                      <div className="grid grid-cols-5 gap-1">
                        {Object.entries(SCHEDULE_SYMBOL_CONFIG).map(([key, val]) => (
                          <button key={key} type="button" onClick={() => setNewSchedSymbol(key)} className={`py-1.5 rounded-xl text-[11px] font-bold border ${newSchedSymbol === key ? "border-pink-500 bg-pink-50 text-pink-900 font-black" : "border-neutral-200 bg-white"}`}><span>{val.icon}</span><span>{val.label}</span></button>
                        ))}
                      </div>
                      <div className="flex justify-end gap-2 pt-1">
                        <button type="button" onClick={() => setModalDate(null)} className="px-4 py-2 border rounded-xl text-xs font-semibold">닫기</button>
                        <button type="submit" className="px-4 py-2 bg-pink-500 text-white rounded-xl text-xs font-bold">추가</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. [가계부] 탭 화면 */}
          {currentTab === "ledger" && (
            <div className="h-full flex flex-col gap-3">
              <div className="border-2 border-sky-400/80 rounded-2xl bg-white/95 backdrop-blur-md px-5 py-3 shadow-sm flex items-center justify-between shrink-0">
                <div className="flex-1 flex items-center justify-between pr-6 border-r border-sky-200">
                  <button onClick={prevLedgerMonth} className="px-4 py-1.5 rounded-xl border border-sky-400 text-sky-700 hover:bg-sky-50 font-bold text-xs transition">&lt; 이전달</button>
                  <h2 className="text-lg font-black text-sky-950 tracking-tight flex items-center gap-2"><Wallet className="w-5 h-5 text-sky-600" /><span>{ledgerYear}년 {ledgerMonth}월 가계부</span></h2>
                  <button onClick={nextLedgerMonth} className="px-4 py-1.5 rounded-xl border border-sky-400 text-sky-700 hover:bg-sky-50 font-bold text-xs transition">다음달 &gt;</button>
                </div>
                <div className="w-[280px] pl-6 flex items-center gap-1.5 text-sm font-extrabold text-sky-900"><PiggyBank className="w-4 h-4 text-sky-600" /><span>재정 요약</span></div>
              </div>

              <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-3 items-stretch">
                <div className="flex-1 h-full border-2 border-sky-400/80 rounded-2xl bg-white/95 backdrop-blur-md p-4 shadow-sm flex flex-col justify-between overflow-hidden">
                  <div className="grid grid-cols-7 text-center font-bold text-xs pb-2 border-b border-sky-100 text-neutral-700 shrink-0">
                    <span className="text-rose-600 font-extrabold">일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span className="text-blue-600 font-extrabold">토</span>
                  </div>
                  <div className="flex-1 grid grid-cols-7 grid-rows-5 gap-2 pt-2 min-h-0">
                    {ledgerCalendarGrid.map((cell, idx) => {
                      if (!cell.day) return <div key={`empty-led-${idx}`} className="h-full rounded-xl" />;
                      const dayEntries = (ledgerEntries || []).filter((s) => s.date === cell.dateStr);
                      return (
                        <div key={cell.dateStr} onClick={() => setLedgerModalDate(cell.dateStr)} className="h-full border border-sky-200/90 rounded-xl p-1.5 flex flex-col justify-between cursor-pointer bg-white hover:border-sky-400">
                          <span className="text-[11px] font-bold">{cell.day}</span>
                          <div className="flex-1 overflow-y-auto space-y-1 scrollbar-none">
                            {dayEntries.map((e) => (
                              <div key={e.id} className="text-[9px] truncate p-0.5 bg-sky-50 rounded border border-sky-200">{e.title}: {Number(e.amount).toLocaleString()}원</div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="w-full lg:w-[280px] h-full shrink-0 border-2 border-sky-400/80 rounded-2xl bg-white/95 backdrop-blur-md p-4 shadow-sm flex flex-col justify-start gap-3 overflow-y-auto">
                  <div className="border border-blue-200 bg-blue-50/80 rounded-2xl p-3 shadow-xs">
                    <span className="text-xs font-bold text-blue-900">총 수입</span>
                    <div className="text-xl font-black text-blue-600 mt-1">+{currentMonthLedgerSummary.income.toLocaleString()}원</div>
                  </div>
                  <div className="border border-rose-200 bg-rose-50/80 rounded-2xl p-3 shadow-xs">
                    <span className="text-xs font-bold text-rose-900">총 지출</span>
                    <div className="text-xl font-black text-rose-600 mt-1">-{currentMonthLedgerSummary.expense.toLocaleString()}원</div>
                  </div>
                  <div className="border border-sky-200 bg-sky-50/80 rounded-2xl p-3 shadow-xs">
                    <span className="text-xs font-bold text-sky-900">정산 잔액</span>
                    <div className="text-xl font-black text-sky-700 mt-1">{currentMonthLedgerSummary.balance.toLocaleString()}원</div>
                  </div>
                </div>
              </div>

              {ledgerModalDate && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4" onClick={() => setLedgerModalDate(null)}>
                  <div className="bg-white rounded-3xl p-6 border border-sky-300 shadow-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                    <h3 className="text-base font-black text-neutral-900 mb-3">가계부 입력 ({ledgerModalDate})</h3>
                    <form onSubmit={handleAddLedgerEntry} className="space-y-3">
                      <input type="text" required value={newLedgerTitle} onChange={(e) => setNewLedgerTitle(e.target.value)} placeholder="내용" className="w-full border rounded-xl px-3 py-2 text-xs" />
                      <input type="number" required value={newLedgerAmount} onChange={(e) => setNewLedgerAmount(e.target.value)} placeholder="금액(원)" className="w-full border rounded-xl px-3 py-2 text-xs" />
                      <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setLedgerModalDate(null)} className="px-4 py-2 border rounded-xl text-xs">닫기</button>
                        <button type="submit" className="px-4 py-2 bg-sky-500 text-white rounded-xl text-xs font-bold">추가</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 4. [즐겨찾기] 탭 화면 */}
          {currentTab === "favorites" && (
            <div className="h-full overflow-y-auto flex flex-col gap-2.5 pr-1">
              <form onSubmit={handleAddFav} className="border-2 border-purple-400/80 rounded-2xl p-3 flex flex-wrap items-center gap-2 bg-purple-50/40 backdrop-blur-[2px] shadow-sm shrink-0">
                <input type="text" value={newFavName} onChange={(e) => setNewFavName(e.target.value)} placeholder="사이트명 *" className="w-32 border border-purple-200 bg-white/90 rounded-lg px-2.5 py-1.5 text-xs font-bold" />
                <input type="text" value={newFavUrl} onChange={(e) => setNewFavUrl(e.target.value)} placeholder="URL *" className="flex-1 min-w-[150px] border border-purple-200 bg-white/90 rounded-lg px-2.5 py-1.5 text-xs" />
                <input type="text" value={newFavMemo} onChange={(e) => setNewFavMemo(e.target.value)} placeholder="메모" className="w-28 border border-purple-200 bg-white/90 rounded-lg px-2.5 py-1.5 text-xs" />
                <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs px-4 py-2 rounded-lg transition"><Plus className="w-3.5 h-3.5" /> 추가</button>
              </form>
              <div className="flex flex-col gap-2">
                {filteredFavs.map((fav) => (
                  <div key={fav.id} className="grid grid-cols-12 gap-2 items-center text-xs p-3 rounded-2xl border-2 border-purple-400/80 bg-purple-50/40">
                    <span className="col-span-3 font-bold text-center">{fav.name}</span>
                    <a href={fav.url} target="_blank" rel="noreferrer" className="col-span-2 text-center text-purple-600 underline truncate">{fav.url}</a>
                    <span className="col-span-5 text-neutral-600">{fav.memo || "-"}</span>
                    <div className="col-span-2 flex justify-center gap-1">
                      <button onClick={() => handleDeleteFav(fav.id)} className="p-1 rounded text-rose-500 hover:bg-white"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. [책갈피] 탭 화면 */}
          {currentTab === "bookmarks" && (
            <div className="h-full overflow-y-auto flex flex-col gap-2.5 pr-1">
              <form onSubmit={handleAddBookmark} className="border-2 border-amber-400/90 rounded-2xl p-3 flex flex-wrap items-center gap-1.5 bg-amber-50/40 backdrop-blur-[2px] shadow-sm shrink-0">
                <input type="text" value={newBmarkCategory} onChange={(e) => setNewBmarkCategory(e.target.value)} placeholder="분류" className="w-20 border rounded-lg px-2 py-1.5 text-xs" />
                <input type="text" value={newBmarkPlatform} onChange={(e) => setNewBmarkPlatform(e.target.value)} placeholder="플랫폼" className="w-20 border rounded-lg px-2 py-1.5 text-xs" />
                <input type="text" required value={newBmarkTitle} onChange={(e) => setNewBmarkTitle(e.target.value)} placeholder="제목 *" className="flex-1 min-w-[130px] border rounded-lg px-2.5 py-1.5 text-xs font-bold" />
                <select value={newBmarkUpdate} onChange={(e) => setNewBmarkUpdate(e.target.value)} className="w-24 border rounded-lg px-2 py-1.5 text-xs">
                  <option value="월요일">월요일</option><option value="화요일">화요일</option><option value="수요일">수요일</option><option value="목요일">목요일</option><option value="금요일">금요일</option><option value="토요일">토요일</option><option value="일요일">일요일</option><option value="완결">완결</option>
                </select>
                <input type="number" min="0" value={newBmarkBookmark} onChange={(e) => setNewBmarkBookmark(Number(e.target.value))} placeholder="회차" className="w-14 border rounded-lg px-1.5 py-1.5 text-xs" />
                <button type="submit" className="bg-amber-500 text-white font-semibold text-xs px-4 py-2 rounded-lg ml-auto"><Plus className="w-3.5 h-3.5" /> 추가</button>
              </form>
              <div className="flex flex-col gap-2">
                {filteredBookmarks.map((bmark) => (
                  <div key={bmark.id} className="grid grid-cols-12 gap-1 items-center text-[11px] p-2.5 rounded-2xl border-2 border-amber-400/90 bg-amber-50/40 text-center">
                    <span className="col-span-2 font-bold">{bmark.category}</span>
                    <span className="col-span-4 font-black truncate px-1">{bmark.title}</span>
                    <span className="col-span-2 text-neutral-700">{bmark.regularUpdate}</span>
                    <span className="col-span-2 font-mono font-bold">{bmark.currentBookmark ?? 0}회</span>
                    <div className="col-span-2 flex justify-center gap-1">
                      <button onClick={(e) => handleUpdateBookmarkCount(bmark.id, 1, e)} className="p-1 border rounded bg-white"><Plus className="w-3 h-3" /></button>
                      <button onClick={(e) => handleUpdateBookmarkCount(bmark.id, -1, e)} className="p-1 border rounded bg-white"><Minus className="w-3 h-3" /></button>
                      <button onClick={() => handleDeleteBookmark(bmark.id)} className="p-1 text-rose-500"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. [노래책] 탭 화면 */}
          {currentTab === "songs" && (
            <div className="h-full overflow-y-auto flex flex-col gap-2.5 pr-1">
              <form onSubmit={handleAddSong} className="border-2 border-emerald-400/90 rounded-2xl p-3 flex flex-wrap items-center gap-2 bg-emerald-50/40 backdrop-blur-[2px] shadow-sm shrink-0">
                <input type="text" value={newGenre} onChange={(e) => setNewGenre(e.target.value)} placeholder="장르" className="w-24 border rounded-lg px-2.5 py-1.5 text-xs" />
                <input type="text" value={newArtist} onChange={(e) => setNewArtist(e.target.value)} placeholder="가수" className="w-36 border rounded-lg px-2.5 py-1.5 text-xs" />
                <input type="text" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="곡 제목 *" className="w-44 border rounded-lg px-2.5 py-1.5 text-xs" />
                <input type="text" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="유튜브 링크" className="flex-1 min-w-[150px] border rounded-lg px-2.5 py-1.5 text-xs" />
                <button type="submit" className="bg-emerald-600 text-white font-semibold text-xs px-5 py-2 rounded-lg"><Plus className="w-3.5 h-3.5" /> 추가</button>
              </form>
              <div className="flex flex-col gap-2">
                {filteredSongs.map((song) => (
                  <div key={song.id} className="grid grid-cols-12 gap-2 items-center text-xs p-3 rounded-2xl border-2 border-emerald-400/90 bg-emerald-50/40">
                    <span className="col-span-2 text-center font-bold">{song.genre}</span>
                    <span className="col-span-4 text-center font-bold">{song.artist}</span>
                    <span className="col-span-4 font-black truncate">{song.title}</span>
                    <div className="col-span-2 flex justify-center gap-1">
                      <button onClick={() => toggleLike(song.id)} className={`p-1.5 rounded-lg ${song.liked ? "text-rose-500" : "text-neutral-400"}`}><Heart className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDeleteSong(song.id)} className="p-1.5 text-rose-500"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. [구매물품] 탭 화면 */}
          {currentTab === "orders" && (
            <div className="h-full overflow-y-auto flex flex-col gap-2.5 pr-1">
              <form onSubmit={handleAddOrder} className="border-2 border-indigo-400/90 rounded-2xl p-3 flex flex-wrap items-center gap-1.5 bg-indigo-50/40 backdrop-blur-[2px] shadow-sm shrink-0">
                <input type="text" value={newOrderCategory} onChange={(e) => setNewOrderCategory(e.target.value)} placeholder="분류" className="w-24 border rounded-lg px-2 py-1.5 text-xs" />
                <input type="text" value={newOrderPlatform} onChange={(e) => setNewOrderPlatform(e.target.value)} placeholder="구매처" className="w-24 border rounded-lg px-2 py-1.5 text-xs" />
                <input type="text" required value={newOrderName} onChange={(e) => setNewOrderName(e.target.value)} placeholder="품목명 *" className="flex-1 min-w-[140px] border rounded-lg px-2.5 py-1.5 text-xs font-bold" />
                <input type="number" value={newOrderPrice} onChange={(e) => setNewOrderPrice(e.target.value)} placeholder="가격(원)" className="w-24 border rounded-lg px-2 py-1.5 text-xs font-mono" />
                <button type="submit" className="bg-indigo-600 text-white font-semibold text-xs px-4 py-2 rounded-lg ml-auto"><Plus className="w-3.5 h-3.5" /> 추가</button>
              </form>
              <div className="flex flex-col gap-2">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="grid grid-cols-12 gap-1 items-center text-[11px] p-2.5 rounded-2xl border-2 border-indigo-400/90 bg-indigo-50/40 text-center">
                    <span className="col-span-2 font-bold">{order.category}</span>
                    <span className="col-span-4 font-black truncate px-1">{order.name}</span>
                    <span className="col-span-2 font-mono">{order.orderDate}</span>
                    <span className="col-span-2 font-mono font-bold">{Number(order.price).toLocaleString()}원</span>
                    <div className="col-span-2 flex justify-center gap-1">
                      <button onClick={() => handleDeleteOrder(order.id)} className="p-1 text-rose-500"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. [장바구니] 탭 화면 */}
          {currentTab === "cart" && (
            <div className="h-full overflow-y-auto flex flex-col gap-2.5 pr-1">
              <form onSubmit={handleAddCartItem} className="border-2 border-rose-400/90 rounded-2xl p-3 flex flex-wrap items-center gap-1.5 bg-rose-50/40 backdrop-blur-[2px] shadow-sm shrink-0">
                <input type="text" value={newCartCategory} onChange={(e) => setNewCartCategory(e.target.value)} placeholder="분류" className="w-24 border rounded-lg px-2 py-1.5 text-xs" />
                <select value={newCartPriority} onChange={(e) => setNewCartPriority(e.target.value)} className="w-28 border rounded-lg px-2 py-1.5 text-xs font-bold cursor-pointer">
                  <option value="⭐⭐⭐">⭐⭐⭐ 필수</option><option value="⭐⭐">⭐⭐ 고민중</option><option value="⭐">⭐ 여유될때</option>
                </select>
                <input type="text" required value={newCartName} onChange={(e) => setNewCartName(e.target.value)} placeholder="사고싶은 물건명 *" className="flex-1 min-w-[110px] border rounded-lg px-2.5 py-1.5 text-xs font-bold" />
                <input type="number" value={newCartPrice} onChange={(e) => setNewCartPrice(e.target.value)} placeholder="예상 가격" className="w-24 border rounded-lg px-2 py-1.5 text-xs font-mono" />
                <input type="text" value={newCartSpec} onChange={(e) => setNewCartSpec(e.target.value)} placeholder="옵션/스펙" className="w-36 border rounded-lg px-2 py-1.5 text-xs" />
                <button type="submit" className="bg-rose-500 text-white font-semibold text-xs px-4 py-2 rounded-lg ml-auto"><Plus className="w-3.5 h-3.5" /> 담기</button>
              </form>
              <div className="flex flex-col gap-2">
                {filteredCartItems.map((item) => (
                  <div key={item.id} className={`grid grid-cols-12 gap-1 items-center text-[11px] p-2.5 rounded-2xl border-2 border-rose-400/90 bg-rose-50/40 text-center ${item.purchased ? "opacity-60 line-through" : ""}`}>
                    <span className="col-span-2 font-bold">{item.category}</span>
                    <span className="col-span-4 font-black truncate px-1">{item.name}</span>
                    <span className="col-span-2 font-mono font-bold">{Number(item.price).toLocaleString()}원</span>
                    <span className="col-span-2 truncate text-neutral-600">{item.specOption}</span>
                    <div className="col-span-2 flex justify-center gap-1">
                      <button onClick={(e) => handleTogglePurchased(item.id, e)} className="p-1 border rounded bg-white"><Check className="w-3 h-3" /></button>
                      <button onClick={() => handleDeleteCartItem(item.id)} className="p-1 text-rose-500"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
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
                <button onClick={cycleRepeatMode} className={`p-1 rounded text-[10px] font-bold ${repeatMode !== "none" ? themeClasses.accentActive + " px-1.5" : "text-neutral-400"}`}>
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