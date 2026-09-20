// @ts-nocheck
/* eslint-disable */
"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Plus,
  Trash2,
  ExternalLink,
  Pencil,
  Check,
  X,
  User,
  Key,
  Copy
} from "lucide-react";

interface FavoritesTabProps {
  themeClasses?: any;
}

export default function FavoritesTab({ themeClasses }: FavoritesTabProps) {
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

  return (
    <div className="h-full overflow-y-auto flex flex-col gap-2.5 pr-1">
      {/* 등록 바 */}
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

      {/* 검색 및 분류 필터 */}
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

      {/* 헤더 박스 */}
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

      {/* 리스트 */}
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
  );
}