// @ts-nocheck
/* eslint-disable */
"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  Pencil,
  Check,
  X,
  ArrowUpDown,
  ExternalLink
} from "lucide-react";

interface BookmarksTabProps {
  themeClasses?: any;
}

export default function BookmarksTab({ themeClasses }: BookmarksTabProps) {
  // 요일 매핑 (0: 일요일, 1: 월요일, ... 6: 토요일)
  const dayIndexMap: Record<string, number> = {
    "일요일": 0,
    "월요일": 1,
    "화요일": 2,
    "수요일": 3,
    "목요일": 4,
    "금요일": 5,
    "토요일": 6,
  };

  // 정기업데이트 자정 경과 횟수 기반 최종회차 자동 계산
  const calculateAutoFinalEpisode = (releaseDateStr: string, regularUpdate: string, weeklyScheduleStr: string) => {
    if (!releaseDateStr || releaseDateStr === "-") return "1회";

    let startDate: Date;
    const cleanRel = String(releaseDateStr).trim();

    if (cleanRel.length === 6 && !cleanRel.includes("-")) {
      const yy = "20" + cleanRel.slice(0, 2);
      const mm = cleanRel.slice(2, 4);
      const dd = cleanRel.slice(4, 6);
      startDate = new Date(`${yy}-${mm}-${dd}T00:00:00`);
    } else {
      startDate = new Date(cleanRel.includes("T") ? cleanRel : `${cleanRel}T00:00:00`);
    }

    if (isNaN(startDate.getTime())) return "1회";

    const targetDayIdx = dayIndexMap[regularUpdate];
    if (targetDayIdx === undefined) return "1회";

    const weeklyCount = parseInt(String(weeklyScheduleStr).replace(/[^0-9]/g, ""), 10) || 1;
    const now = new Date();

    // 시작일(공개일) 자정부터 현재 시점까지 정기업데이트 요일 자정을 지난 횟수 카운트
    let passedCount = 0;
    let cursor = new Date(startDate);
    cursor.setDate(cursor.getDate() + 1); // 공개 당일 이후부터 경과 체크

    while (cursor <= now) {
      if (cursor.getDay() === targetDayIdx) {
        passedCount++;
      }
      cursor.setDate(cursor.getDate() + 1);
    }

    const calculatedEpisode = 1 + (passedCount * weeklyCount);
    return `${calculatedEpisode}회`;
  };

  const defaultBookmarks = [
    {
      id: 1,
      category: "웹툰",
      platform: "네이버웹툰",
      link: "https://comic.naver.com",
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

  const [newBmarkCategory, setNewBmarkCategory] = useState("");
  const [newBmarkPlatform, setNewBmarkPlatform] = useState("");
  const [newBmarkLink, setNewBmarkLink] = useState("");
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
  const [editBmarkLink, setEditBmarkLink] = useState("");
  const [editBmarkTitle, setEditBmarkTitle] = useState("");
  const [editBmarkUpdate, setEditBmarkUpdate] = useState("월요일");
  const [editBmarkRelease, setEditBmarkRelease] = useState("");
  const [editBmarkSchedule, setEditBmarkSchedule] = useState("");
  const [editBmarkEpisode, setEditBmarkEpisode] = useState("");
  const [editBmarkBookmark, setEditBmarkBookmark] = useState(0);

  // 분류 목록 (중복 제거)
  const existingBmarkCategories = useMemo(() => {
    const set = new Set<string>();
    (bookmarkList || []).forEach((b) => {
      if (b.category && b.category.trim()) set.add(b.category.trim());
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b, "ko"));
  }, [bookmarkList]);

  // 플랫폼 자동완성용 중복 없는 목록
  const existingBmarkPlatforms = useMemo(() => {
    const set = new Set<string>();
    (bookmarkList || []).forEach((b) => {
      if (b.platform && b.platform.trim() && b.platform.trim() !== "플랫폼") {
        set.add(b.platform.trim());
      }
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b, "ko"));
  }, [bookmarkList]);

  const handleAddBookmark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBmarkTitle.trim()) return;

    let cleanLink = newBmarkLink.trim();
    if (cleanLink && !cleanLink.startsWith("http://") && !cleanLink.startsWith("https://")) {
      cleanLink = "https://" + cleanLink;
    }

    const schedInput = newBmarkSchedule.trim();
    const formattedSchedule = schedInput && !schedInput.includes("회") ? `${schedInput}회` : schedInput || "1회";
    const autoEp = calculateAutoFinalEpisode(newBmarkRelease.trim(), newBmarkUpdate, formattedSchedule);

    const newEntry = {
      id: Date.now(),
      category: newBmarkCategory.trim() || "웹툰",
      platform: newBmarkPlatform.trim() || "플랫폼",
      link: cleanLink,
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
    setNewBmarkLink("");
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
    setEditBmarkLink(item.link || "");
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

    let cleanLink = editBmarkLink.trim();
    if (cleanLink && !cleanLink.startsWith("http://") && !cleanLink.startsWith("https://")) {
      cleanLink = "https://" + cleanLink;
    }

    const schedInput = editBmarkSchedule.trim();
    const formattedSchedule = schedInput && !schedInput.includes("회") ? `${schedInput}회` : schedInput || "1회";
    const autoEp = calculateAutoFinalEpisode(editBmarkRelease.trim(), editBmarkUpdate, formattedSchedule);
    const finalEpInput = editBmarkEpisode.trim();
    const formattedFinalEp = finalEpInput && !finalEpInput.includes("회") ? `${finalEpInput}회` : finalEpInput || autoEp;

    setBookmarkList((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              category: editBmarkCategory.trim() || "웹툰",
              platform: editBmarkPlatform.trim() || "플랫폼",
              link: cleanLink,
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
    const list = (bookmarkList || []).map((b) => {
      // 완결이 아닌 경우 실시간(자정 기준) 최종회차를 동적으로 계산하여 표시
      if (!b.isCompleted && b.releaseDate && b.releaseDate !== "-") {
        const dynamicFinalEp = calculateAutoFinalEpisode(b.releaseDate, b.regularUpdate, b.weeklySchedule);
        return { ...b, finalEpisode: dynamicFinalEp };
      }
      return b;
    }).filter((b) => {
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

  return (
    <div className="h-full overflow-y-auto flex flex-col gap-2.5 pr-1">
      {/* 등록 바 */}
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
          list="bmark-platform-suggestions"
          value={newBmarkPlatform}
          onChange={(e) => setNewBmarkPlatform(e.target.value)}
          placeholder="플랫폼"
          className="w-20 border border-amber-300 bg-white/90 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-amber-500 placeholder-neutral-500 font-medium"
        />
        <datalist id="bmark-platform-suggestions">
          {existingBmarkPlatforms.map((p) => (<option key={p} value={p} />))}
        </datalist>

        <input
          type="text"
          value={newBmarkLink}
          onChange={(e) => setNewBmarkLink(e.target.value)}
          placeholder="플랫폼 링크 (URL)"
          className="w-32 border border-amber-300 bg-white/90 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-amber-500 placeholder-neutral-500 font-medium"
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
        </select>

        <input
          type="text"
          value={newBmarkRelease}
          onChange={(e) => setNewBmarkRelease(e.target.value)}
          placeholder="공개일"
          className="w-20 border border-amber-300 bg-white/90 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-amber-500 placeholder-neutral-500 font-medium"
        />

        <div className="flex items-center gap-1">
          <input
            type="text"
            value={newBmarkSchedule}
            onChange={(e) => setNewBmarkSchedule(e.target.value)}
            placeholder="편성"
            className="w-16 border border-amber-300 bg-white/90 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-amber-500 placeholder-neutral-500 font-medium"
          />
          <span className="text-xs font-bold text-amber-950">회</span>
        </div>

        <div className="flex items-center gap-1">
          <input
            type="number"
            min="0"
            value={newBmarkBookmark}
            onChange={(e) => setNewBmarkBookmark(Number(e.target.value))}
            placeholder="회차"
            className="w-14 border border-amber-300 bg-white/90 rounded-lg px-1.5 py-1.5 text-xs focus:outline-none focus:border-amber-500 placeholder-neutral-500 font-medium"
          />
          <span className="text-xs font-bold text-amber-950">회</span>
        </div>

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

      {/* 헤더 박스 */}
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
          const finalEpNum = parseInt(String(bmark.finalEpisode).replace(/[^0-9]/g, ""), 10) || 0;
          const currentBmNum = Number(bmark.currentBookmark) || 0;

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
                className="grid grid-cols-12 gap-1 items-center p-2.5 rounded-2xl border-2 border-amber-400 bg-amber-50/90 shadow-md text-center"
              >
                <div className="col-span-2 flex flex-col gap-1 px-1">
                  <input type="text" value={editBmarkCategory} onChange={(e) => setEditBmarkCategory(e.target.value)} placeholder="분류" className="w-full border border-amber-300 bg-white rounded px-1.5 py-1 text-[11px] font-bold" />
                  <input type="text" list="bmark-platform-suggestions" value={editBmarkPlatform} onChange={(e) => setEditBmarkPlatform(e.target.value)} placeholder="플랫폼" className="w-full border border-amber-300 bg-white rounded px-1.5 py-1 text-[10px]" />
                </div>
                <div className="col-span-3 px-1 flex flex-col gap-1">
                  <input type="text" required value={editBmarkTitle} onChange={(e) => setEditBmarkTitle(e.target.value)} placeholder="제목" className="w-full border border-amber-300 bg-white rounded px-2 py-1 text-[11px] font-bold" />
                  <input type="text" value={editBmarkLink} onChange={(e) => setEditBmarkLink(e.target.value)} placeholder="플랫폼 링크 (선택)" className="w-full border border-amber-300 bg-white rounded px-2 py-0.5 text-[10px]" />
                </div>
                <div className="col-span-2 px-1">
                  <select value={editBmarkUpdate} onChange={(e) => setEditBmarkUpdate(e.target.value)} className="w-full border border-amber-300 bg-white rounded px-1.5 py-1 text-[11px] font-bold">
                    <option value="월요일">월요일</option>
                    <option value="화요일">화요일</option>
                    <option value="수요일">수요일</option>
                    <option value="목요일">목요일</option>
                    <option value="금요일">금요일</option>
                    <option value="토요일">토요일</option>
                    <option value="일요일">일요일</option>
                  </select>
                </div>
                <div className="col-span-1 px-0.5">
                  <input type="text" value={editBmarkRelease} onChange={(e) => setEditBmarkRelease(e.target.value)} placeholder="공개일" className="w-full border border-amber-300 bg-white rounded px-1 py-1 text-[11px]" />
                </div>
                <div className="col-span-1 flex items-center justify-center gap-0.5 px-0.5">
                  <input type="text" value={editBmarkSchedule} onChange={(e) => setEditBmarkSchedule(e.target.value)} placeholder="편성" className="w-full border border-amber-300 bg-white rounded px-1 py-1 text-[11px]" />
                  <span className="text-[10px] font-bold">회</span>
                </div>
                <div className="col-span-1 flex items-center justify-center gap-0.5 px-0.5">
                  <input type="text" value={editBmarkEpisode} onChange={(e) => setEditBmarkEpisode(e.target.value)} placeholder="최종" className="w-full border border-amber-300 bg-white rounded px-1 py-1 text-[11px]" />
                  <span className="text-[10px] font-bold">회</span>
                </div>
                <div className="col-span-1 flex items-center justify-center gap-0.5 px-0.5">
                  <input type="number" min="0" value={editBmarkBookmark} onChange={(e) => setEditBmarkBookmark(Number(e.target.value))} placeholder="회" className="w-full border border-amber-300 bg-white rounded px-0.5 py-1 text-[11px]" />
                  <span className="text-[10px] font-bold">회</span>
                </div>
                <div className="col-span-1 flex items-center justify-center gap-1">
                  <button onClick={() => saveEditBookmark(bmark.id)} title="저장" className="p-1 rounded bg-amber-500 text-white font-bold text-[10px]"><Check className="w-3 h-3" /></button>
                  <button onClick={cancelEditBookmark} title="취소" className="p-1 rounded border border-neutral-300 bg-white text-neutral-600 text-[10px]"><X className="w-3 h-3" /></button>
                </div>
              </div>
            );
          }

          return (
            <div
              key={bmark.id}
              className={`grid grid-cols-12 gap-1 items-center text-[11px] p-2.5 rounded-2xl border-2 transition shadow-2xs text-center ${cardBgClass}`}
            >
              {/* 분류 / 플랫폼 */}
              <div className="col-span-2 flex flex-col items-center justify-center">
                <span className="px-2 py-0.5 rounded-md bg-amber-100/90 text-amber-950 border border-amber-300 font-bold shadow-2xs">
                  {bmark.category}
                </span>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[10px] text-neutral-600 font-semibold">{bmark.platform}</span>
                  {bmark.link && (
                    <a
                      href={bmark.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-700 hover:text-amber-900 transition"
                      title="플랫폼 바로가기"
                    >
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* 제목 */}
              <div className="col-span-3 text-neutral-900 font-black truncate px-1" title={bmark.title}>
                {bmark.title}
              </div>

              <div className="col-span-2 text-neutral-800 truncate px-1 font-semibold">
                {bmark.regularUpdate}
              </div>

              <div className="col-span-1 text-neutral-600 truncate font-mono font-medium">
                {bmark.releaseDate}
              </div>

              <div className="col-span-1 text-neutral-700 truncate font-bold">
                {bmark.weeklySchedule}
              </div>

              <div className="col-span-1 text-neutral-900 font-black truncate font-mono">
                {bmark.finalEpisode}
              </div>

              <div className="col-span-1 flex items-center justify-center gap-0.5 font-mono font-bold">
                <button
                  onClick={(e) => handleUpdateBookmarkCount(bmark.id, -1, e)}
                  className="w-4 h-4 rounded bg-white/90 border border-amber-300 hover:bg-amber-200 text-amber-950 flex items-center justify-center shadow-2xs transition active:scale-95"
                  title="1화 감소"
                >
                  <Minus className="w-2.5 h-2.5" />
                </button>
                <span className="min-w-[20px] text-center text-neutral-900 font-black">
                  {bmark.currentBookmark ?? 0}
                </span>
                <button
                  onClick={(e) => handleUpdateBookmarkCount(bmark.id, 1, e)}
                  className="w-4 h-4 rounded bg-white/90 border border-amber-300 hover:bg-amber-200 text-amber-950 flex items-center justify-center shadow-2xs transition active:scale-95"
                  title="1화 증가"
                >
                  <Plus className="w-2.5 h-2.5" />
                </button>
              </div>

              <div className="col-span-1 flex items-center justify-center gap-1">
                <button
                  onClick={(e) => handleToggleCompleted(bmark.id, e)}
                  className={`px-1 py-0.5 rounded text-[10px] font-black border transition ${
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
  );
}