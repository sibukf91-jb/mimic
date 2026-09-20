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
  Play,
  Tv
} from "lucide-react";

interface RecipesTabProps {
  themeClasses?: any;
}

export default function RecipesTab({ themeClasses }: RecipesTabProps) {
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

  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && recipeModalUrl) {
        setRecipeModalUrl(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [recipeModalUrl]);

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

  const [newRecipeCategory, setNewRecipeCategory] = useState("한식");
  const [newRecipeTitle, setNewRecipeTitle] = useState("");
  const [newRecipeUrl, setNewRecipeUrl] = useState("");
  const [newRecipeHas, setNewRecipeHas] = useState("");
  const [newRecipeNeed, setNewRecipeNeed] = useState("");

  const [selectedRecipeCategory, setSelectedRecipeCategory] = useState("전체");
  const [recipeSearchQuery, setRecipeSearchQuery] = useState("");

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

  return (
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
              <div className="col-span-2 flex justify-center">
                <span className="px-2.5 py-1 rounded-lg bg-orange-100 text-orange-950 border border-orange-300 font-bold shadow-2xs flex items-center gap-1">
                  <span>{catIcon}</span>
                  <span>{item.category}</span>
                </span>
              </div>

              <div className="col-span-3 text-neutral-900 font-black truncate px-1 text-center" title={item.title}>
                {item.title}
              </div>

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

              <div className="col-span-3 text-emerald-800 font-semibold truncate px-1 text-left pl-2" title={item.hasIngredients}>
                <span className="text-[10px] bg-emerald-100 border border-emerald-200 px-1.5 py-0.5 rounded mr-1">보유</span>
                {item.hasIngredients}
              </div>

              <div className="col-span-2 text-rose-700 font-semibold truncate px-1 text-left pl-2" title={item.needIngredients}>
                <span className="text-[10px] bg-rose-100 border border-rose-200 px-1.5 py-0.5 rounded mr-1">필요</span>
                {item.needIngredients}
              </div>

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
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-350"><Tv className="w-4 h-4 text-orange-400" /><span>레시피 영상 시청</span></div>
              <button onClick={() => setRecipeModalUrl(null)} className="p-1 rounded-lg text-neutral-400 hover:text-white transition"><X className="w-5 h-5" /></button>
            </div>
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              <iframe src={`https://www.youtube.com/embed/${getYouTubeId(recipeModalUrl)}?autoplay=1`} title="Recipe Video Player" className="w-full h-full border-0" allow="autoplay; picture-in-picture" allowFullScreen />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}