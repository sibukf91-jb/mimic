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
  X
} from "lucide-react";

interface CartTabProps {
  themeClasses?: any;
}

export default function CartTab({ themeClasses }: CartTabProps) {
  const getCartCategoryIcon = (category: string) => {
    const c = (category || "").trim().toLowerCase();
    if (c.includes("전자") || c.includes("디지털") || c.includes("it") || c.includes("기기") || c.includes("가전")) return "🎧";
    if (c.includes("패션") || c.includes("의류") || c.includes("옷") || c.includes("신발") || c.includes("모자")) return "👟";
    if (c.includes("인테리어") || c.includes("생활") || c.includes("가구") || c.includes("방")) return "🛋️";
    if (c.includes("취미") || c.includes("게임") || c.includes("도서") || c.includes("책")) return "🎮";
    if (c.includes("뷰티") || c.includes("향수") || c.includes("화장품")) return "✨";
    if (c.includes("식품") || c.includes("음식") || c.includes("간식")) return "☕";
    return "🛒";
  };

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

  return (
    <div className="h-full overflow-y-auto flex flex-col gap-2.5 pr-1">
      {/* 등록 바 */}
      <form onSubmit={handleAddCartItem} className="border-2 border-rose-400/90 rounded-2xl p-3 flex flex-wrap items-center gap-1.5 bg-rose-50/40 backdrop-blur-[2px] shadow-sm shrink-0">
        <input
          type="text"
          list="cart-category-suggestions"
          value={newCartCategory}
          onChange={(e) => setNewCartCategory(e.target.value)}
          placeholder="분류 (예: 전자기기)"
          className="w-24 border border-rose-300 bg-white/90 rounded-lg px-2 py-1.5 text-xs font-medium text-rose-950 focus:outline-none"
        />
        <datalist id="cart-category-suggestions">
          {existingCartCategories.map((c) => (<option key={c} value={c} />))}
        </datalist>

        <select
          value={newCartPriority}
          onChange={(e) => setNewCartPriority(e.target.value)}
          className="w-28 border border-rose-300 bg-white/90 rounded-lg px-2 py-1.5 text-xs font-bold text-rose-950 cursor-pointer shrink-0"
          title="구매 우선순위"
        >
          <option value="⭐⭐⭐">⭐⭐⭐ 필수</option>
          <option value="⭐⭐">⭐⭐ 고민중</option>
          <option value="⭐">⭐ 여유될때</option>
        </select>

        <input
          type="text"
          required
          value={newCartName}
          onChange={(e) => setNewCartName(e.target.value)}
          placeholder="사고싶은 물건 이름 *"
          className="flex-1 min-w-[110px] border border-rose-300 bg-white/90 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none placeholder-neutral-500 font-bold"
        />

        <input
          type="number"
          min="0"
          value={newCartPrice}
          onChange={(e) => setNewCartPrice(e.target.value)}
          placeholder="예상 가격(원)"
          className="w-24 border border-rose-300 bg-white/90 rounded-lg px-2 py-1.5 text-xs focus:outline-none placeholder-neutral-500 font-mono"
        />

        <input
          type="text"
          value={newCartSpec}
          onChange={(e) => setNewCartSpec(e.target.value)}
          placeholder="스펙/옵션 (270mm, 실버)"
          className="w-36 border border-rose-300 bg-white/90 rounded-lg px-2 py-1.5 text-xs focus:outline-none placeholder-neutral-500 font-medium"
        />

        <input
          type="text"
          value={newCartUrl}
          onChange={(e) => setNewCartUrl(e.target.value)}
          placeholder="판매처 링크 URL"
          className="w-32 border border-rose-300 bg-white/90 rounded-lg px-2 py-1.5 text-xs focus:outline-none placeholder-neutral-500 font-medium"
        />

        <input
          type="text"
          value={newCartMemo}
          onChange={(e) => setNewCartMemo(e.target.value)}
          placeholder="메모"
          className="w-32 border border-rose-300 bg-white/90 rounded-lg px-2 py-1.5 text-xs focus:outline-none placeholder-neutral-500 font-medium"
        />

        <button
          type="submit"
          className="bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs px-4 py-2 rounded-lg transition shrink-0 shadow-sm flex items-center gap-1 ml-auto"
        >
          <Plus className="w-3.5 h-3.5" /> 담기
        </button>
      </form>

      {/* 검색 및 필터 */}
      <div className="border-2 border-rose-400/90 rounded-2xl p-3 bg-rose-50/40 backdrop-blur-[2px] shadow-sm flex flex-col gap-2 shrink-0">
        <div className="relative w-full">
          <input
            type="text"
            value={cartSearchQuery}
            onChange={(e) => setCartSearchQuery(e.target.value)}
            placeholder="품목명, 카테고리, 옵션, 메모를 검색해보세요..."
            className="w-full border border-rose-300 bg-white/90 rounded-xl pl-9 pr-3 py-1.5 text-xs font-medium"
          />
          <Search className="w-3.5 h-3.5 text-rose-600/70 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-1.5 text-xs flex-wrap pt-0.5">
          <span className="text-rose-950 font-semibold text-[11px] mr-1">분류:</span>
          <button
            onClick={() => setSelectedCartCategory("전체")}
            className={`px-2.5 py-0.5 rounded-full border text-[11px] transition font-medium ${
              selectedCartCategory === "전체"
                ? "border-rose-500 bg-rose-200 text-rose-950 font-bold shadow-2xs"
                : "border-rose-300/80 bg-white/70 text-neutral-700 hover:bg-white"
            }`}
          >
            전체
          </button>
          {existingCartCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCartCategory(cat)}
              className={`px-2.5 py-0.5 rounded-full border text-[11px] transition font-medium ${
                selectedCartCategory === cat
                  ? "border-rose-500 bg-rose-200 text-rose-950 font-bold shadow-2xs"
                  : "border-rose-300/80 bg-white/70 text-neutral-700 hover:bg-white"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-rose-800/80 font-bold">
            담아둔 물건: {(filteredCartItems || []).length}개 / 예상 총액: {Number(totalCartAmount || 0).toLocaleString()}원
          </span>
        </div>
      </div>

      {/* 헤더 박스 */}
      <div className="border-2 border-rose-400/90 rounded-xl px-3 py-2.5 bg-rose-100/70 backdrop-blur-[2px] shadow-sm shrink-0">
        <div className="grid grid-cols-12 gap-1 text-[11px] font-extrabold text-rose-950 items-center text-center">
          <span className="col-span-2">분류 / 우선순위</span>
          <span className="col-span-3">사고싶은 물건명</span>
          <span className="col-span-2">예상 가격</span>
          <span className="col-span-2">옵션 / 규격</span>
          <span className="col-span-1">링크</span>
          <span className="col-span-1">메모</span>
          <span className="col-span-1">관리</span>
        </div>
      </div>

      {/* 리스트 */}
      <div className="flex flex-col gap-2">
        {(filteredCartItems || []).map((item) => {
          if (!item) return null;
          const isEditing = editingCartId === item.id;
          const catIcon = getCartCategoryIcon(item.category);

          if (isEditing) {
            return (
              <div
                key={`edit-cart-${item.id}`}
                className="grid grid-cols-12 gap-1 items-center p-2.5 rounded-2xl border-2 border-rose-400 bg-rose-50/90 shadow-md text-center"
              >
                <div className="col-span-2 flex flex-col gap-1 px-1">
                  <input type="text" value={editCartCategory} onChange={(e) => setEditCartCategory(e.target.value)} placeholder="분류" className="w-full border border-rose-300 bg-white rounded px-1.5 py-1 text-[11px] font-bold" />
                  <select value={editCartPriority} onChange={(e) => setEditCartPriority(e.target.value)} className="w-full border border-rose-300 bg-white rounded px-1 py-0.5 text-[10px] font-bold">
                    <option value="⭐⭐⭐">⭐⭐⭐</option>
                    <option value="⭐⭐">⭐⭐</option>
                    <option value="⭐">⭐</option>
                  </select>
                </div>
                <div className="col-span-3 px-1">
                  <input type="text" required value={editCartName} onChange={(e) => setEditCartName(e.target.value)} placeholder="품목명" className="w-full border border-rose-300 bg-white rounded px-2 py-1 text-[11px] font-bold" />
                </div>
                <div className="col-span-2 px-1 flex items-center gap-0.5">
                  <input type="number" min="0" value={editCartPrice} onChange={(e) => setEditCartPrice(e.target.value)} placeholder="예상가격" className="w-full border border-rose-300 bg-white rounded px-1.5 py-1 text-[11px] font-mono" />
                  <span className="text-[10px] font-bold">원</span>
                </div>
                <div className="col-span-2 px-1">
                  <input type="text" value={editCartSpec} onChange={(e) => setEditCartSpec(e.target.value)} placeholder="옵션/스펙" className="w-full border border-rose-300 bg-white rounded px-1.5 py-1 text-[11px]" />
                </div>
                <div className="col-span-1 px-0.5">
                  <input type="text" value={editCartUrl} onChange={(e) => setEditCartUrl(e.target.value)} placeholder="링크URL" className="w-full border border-rose-300 bg-white rounded px-1 py-1 text-[10px]" />
                </div>
                <div className="col-span-1 px-0.5">
                  <input type="text" value={editCartMemo} onChange={(e) => setEditCartMemo(e.target.value)} placeholder="메모" className="w-full border border-rose-300 bg-white rounded px-1 py-1 text-[10px]" />
                </div>
                <div className="col-span-1 flex items-center justify-center gap-1">
                  <button onClick={() => saveEditCartItem(item.id)} title="저장" className="p-1 rounded bg-rose-500 text-white font-bold text-[10px]"><Check className="w-3 h-3" /></button>
                  <button onClick={cancelEditCartItem} title="취소" className="p-1 rounded border border-neutral-300 bg-white text-neutral-600 text-[10px]"><X className="w-3 h-3" /></button>
                </div>
              </div>
            );
          }

          return (
            <div
              key={item.id}
              className={`grid grid-cols-12 gap-1 items-center text-[11px] p-2.5 rounded-2xl border-2 transition shadow-2xs text-center ${
                item.purchased
                  ? "bg-neutral-100/80 border-neutral-300 opacity-60 line-through text-neutral-500"
                  : "border-rose-400/90 bg-rose-50/40 hover:bg-rose-50/70 text-neutral-900"
              }`}
            >
              <div className="col-span-2 flex flex-col items-center justify-center">
                <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-900 border border-rose-300 font-bold shadow-2xs flex items-center gap-1">
                  <span>{catIcon}</span>
                  <span>{item.category || "생활용품"}</span>
                </span>
                <span className="text-[10px] font-bold mt-0.5 text-amber-500">{item.priority || "⭐⭐⭐"}</span>
              </div>

              <div className="col-span-3 text-neutral-900 font-black truncate px-1 text-center" title={item.name}>
                {item.name}
              </div>

              <div className="col-span-2 text-rose-950 font-black font-mono truncate px-1">
                {Number(item.price || 0).toLocaleString()}원
              </div>

              <div className="col-span-2 text-neutral-700 font-medium truncate px-1" title={item.specOption}>
                {item.specOption || "-"}
              </div>

              <div className="col-span-1 flex justify-center">
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noreferrer" className="px-2 py-0.5 rounded bg-rose-500 hover:bg-rose-600 text-white font-bold text-[10px] flex items-center gap-0.5 shadow-2xs transition active:scale-95" title="판매 링크 이동">
                    <ExternalLink className="w-2.5 h-2.5" /><span>보기</span>
                  </a>
                ) : <span className="text-neutral-400 text-[10px]">-</span>}
              </div>

              <div className="col-span-1 text-neutral-500 truncate px-1 italic text-[10px]" title={item.memo}>
                {item.memo || "-"}
              </div>

              <div className="col-span-1 flex items-center justify-center gap-1">
                <button onClick={(e) => handleTogglePurchased(item.id, e)} className={`p-1 rounded transition ${item.purchased ? "bg-emerald-500 text-white font-bold" : "bg-white/80 border border-rose-300 hover:bg-rose-100 text-rose-700"}`} title={item.purchased ? "구매 취소" : "구매 완료로 표시"}>
                  <Check className="w-3 h-3" />
                </button>
                <button onClick={() => startEditCartItem(item)} title="수정" className="p-1 rounded text-neutral-500 hover:text-rose-900 hover:bg-white transition"><Pencil className="w-3 h-3" /></button>
                <button onClick={() => handleDeleteCartItem(item.id)} title="삭제" className="p-1 rounded text-neutral-500 hover:text-rose-600 hover:bg-white transition"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          );
        })}

        {(filteredCartItems || []).length === 0 && (
          <div className="border-2 border-dashed border-rose-300 rounded-2xl p-12 text-center text-xs font-medium text-rose-800/70 bg-rose-50/20">
            장바구니에 담아둔 물건이 없습니다. 사고 싶은 물건을 등록해보세요!
          </div>
        )}
      </div>
    </div>
  );
}