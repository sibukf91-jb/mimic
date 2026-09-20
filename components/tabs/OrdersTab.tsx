// @ts-nocheck
/* eslint-disable */
"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Plus,
  Trash2,
  Pencil,
  Check,
  X
} from "lucide-react";

interface OrdersTabProps {
  themeClasses?: any;
}

export default function OrdersTab({ themeClasses }: OrdersTabProps) {
  const TODAY_STR = "2026-09-20";

  const getOrderCategoryIcon = (category: string) => {
    const c = (category || "").trim().toLowerCase();
    if (c.includes("전자") || c.includes("디지털") || c.includes("it") || c.includes("기기")) return "📱";
    if (c.includes("패션") || c.includes("의류") || c.includes("옷") || c.includes("신발")) return "👕";
    if (c.includes("생활") || c.includes("가구") || c.includes("인테리어") || c.includes("욕실")) return "🧴";
    if (c.includes("식품") || c.includes("음식") || c.includes("간식") || c.includes("마트")) return "🍔";
    if (c.includes("도서") || c.includes("책") || c.includes("취미") || c.includes("문구")) return "📚";
    return "📦";
  };

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
    },
    {
      id: 2,
      category: "패션",
      platform: "무신사",
      name: "오버핏 맨투맨",
      price: 49000,
      orderDate: "2026-09-18",
      status: "배송중",
      memo: "송장 확인 완료"
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

  return (
    <div className="h-full overflow-y-auto flex flex-col gap-2.5 pr-1">
      {/* 등록 바 */}
      <form onSubmit={handleAddOrder} className="border-2 border-indigo-400/90 rounded-2xl p-3 flex flex-wrap items-center gap-1.5 bg-indigo-50/40 backdrop-blur-[2px] shadow-sm shrink-0">
        <input
          type="text"
          list="order-category-suggestions"
          value={newOrderCategory}
          onChange={(e) => setNewOrderCategory(e.target.value)}
          placeholder="분류 (예: 전자기기)"
          className="w-24 border border-indigo-300 bg-white/90 rounded-lg px-2 py-1.5 text-xs font-medium text-indigo-950 focus:outline-none focus:border-indigo-500 placeholder-neutral-400"
        />
        <datalist id="order-category-suggestions">
          {existingOrderCategories.map((c) => (<option key={c} value={c} />))}
        </datalist>

        <input
          type="text"
          value={newOrderPlatform}
          onChange={(e) => setNewOrderPlatform(e.target.value)}
          placeholder="구매처"
          className="w-24 border border-indigo-300 bg-white/90 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-indigo-500 placeholder-neutral-500 font-medium"
        />

        <input
          type="text"
          required
          value={newOrderName}
          onChange={(e) => setNewOrderName(e.target.value)}
          placeholder="품목명 *"
          className="flex-1 min-w-[140px] border border-indigo-300 bg-white/90 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-indigo-500 placeholder-neutral-500 font-bold"
        />

        <input
          type="date"
          value={newOrderDate}
          onChange={(e) => setNewOrderDate(e.target.value)}
          className="w-28 border border-indigo-300 bg-white/90 rounded-lg px-2 py-1.5 text-xs font-medium text-neutral-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
        />

        <input
          type="number"
          min="0"
          value={newOrderPrice}
          onChange={(e) => setNewOrderPrice(e.target.value)}
          placeholder="가격(원)"
          className="w-24 border border-indigo-300 bg-white/90 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-indigo-500 placeholder-neutral-500 font-mono"
        />

        <select
          value={newOrderStatus}
          onChange={(e) => setNewOrderStatus(e.target.value)}
          className="w-24 border border-indigo-300 bg-white/90 rounded-lg px-2 py-1.5 text-xs font-bold text-indigo-950 focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          <option value="배송완료">배송완료</option>
          <option value="배송중">배송중</option>
          <option value="구매예정">구매예정</option>
          <option value="취소·반품">취소·반품</option>
        </select>

        <input
          type="text"
          value={newOrderMemo}
          onChange={(e) => setNewOrderMemo(e.target.value)}
          placeholder="메모 / 링크"
          className="w-36 border border-indigo-300 bg-white/90 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-indigo-500 placeholder-neutral-500 font-medium"
        />

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2 rounded-lg transition shrink-0 shadow-sm flex items-center gap-1 ml-auto"
        >
          <Plus className="w-3.5 h-3.5" /> 추가
        </button>
      </form>

      {/* 검색 및 필터 */}
      <div className="border-2 border-indigo-400/90 rounded-2xl p-3 bg-indigo-50/40 backdrop-blur-[2px] shadow-sm flex flex-col gap-2 shrink-0">
        <div className="relative w-full">
          <input
            type="text"
            value={orderSearchQuery}
            onChange={(e) => setOrderSearchQuery(e.target.value)}
            placeholder="품목명, 플랫폼, 카테고리, 메모를 검색해보세요..."
            className="w-full border border-indigo-300 bg-white/90 rounded-xl pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-indigo-500 placeholder-neutral-500 font-medium"
          />
          <Search className="w-3.5 h-3.5 text-indigo-600/70 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-1.5 text-xs flex-wrap pt-0.5">
          <span className="text-indigo-950 font-semibold text-[11px] mr-1">분류:</span>
          <button
            onClick={() => setSelectedOrderCategory("전체")}
            className={`px-2.5 py-0.5 rounded-full border text-[11px] transition font-medium ${
              selectedOrderCategory === "전체"
                ? "border-indigo-500 bg-indigo-200 text-indigo-950 font-bold shadow-2xs"
                : "border-indigo-300/80 bg-white/70 text-neutral-700 hover:bg-white"
            }`}
          >
            전체
          </button>
          {existingOrderCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedOrderCategory(cat)}
              className={`px-2.5 py-0.5 rounded-full border text-[11px] transition font-medium ${
                selectedOrderCategory === cat
                  ? "border-indigo-500 bg-indigo-200 text-indigo-950 font-bold shadow-2xs"
                  : "border-indigo-300/80 bg-white/70 text-neutral-700 hover:bg-white"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-indigo-800/80 font-bold">
            총 {filteredOrders.length}건 / 합계: {totalOrderAmount.toLocaleString()}원
          </span>
        </div>
      </div>

      {/* 헤더 박스 */}
      <div className="border-2 border-indigo-400/90 rounded-xl px-3 py-2.5 bg-indigo-100/70 backdrop-blur-[2px] shadow-sm shrink-0">
        <div className="grid grid-cols-12 gap-1 text-[11px] font-extrabold text-indigo-950 items-center text-center">
          <span className="col-span-2">분류 / 구매처</span>
          <span className="col-span-3">품목명</span>
          <span className="col-span-2">구매일자</span>
          <span className="col-span-2">구매금액</span>
          <span className="col-span-1">상태</span>
          <span className="col-span-1">메모</span>
          <span className="col-span-1">관리</span>
        </div>
      </div>

      {/* 리스트 */}
      <div className="flex flex-col gap-2">
        {filteredOrders.map((order) => {
          const isEditing = editingOrderId === order.id;
          const catIcon = getOrderCategoryIcon(order.category);

          if (isEditing) {
            return (
              <div
                key={`edit-order-${order.id}`}
                className="grid grid-cols-12 gap-1 items-center p-2.5 rounded-2xl border-2 border-indigo-400 bg-indigo-50/90 shadow-md text-center"
              >
                <div className="col-span-2 flex flex-col gap-1 px-1">
                  <input type="text" value={editOrderCategory} onChange={(e) => setEditOrderCategory(e.target.value)} placeholder="분류" className="w-full border border-indigo-300 bg-white rounded px-1.5 py-1 text-[11px] font-bold" />
                  <input type="text" value={editOrderPlatform} onChange={(e) => setEditOrderPlatform(e.target.value)} placeholder="구매처" className="w-full border border-indigo-300 bg-white rounded px-1.5 py-1 text-[10px]" />
                </div>
                <div className="col-span-3 px-1">
                  <input type="text" required value={editOrderName} onChange={(e) => setEditOrderName(e.target.value)} placeholder="품목명" className="w-full border border-indigo-300 bg-white rounded px-2 py-1 text-[11px] font-bold" />
                </div>
                <div className="col-span-2 px-1">
                  <input type="date" value={editOrderDate} onChange={(e) => setEditOrderDate(e.target.value)} className="w-full border border-indigo-300 bg-white rounded px-1.5 py-1 text-[11px] font-medium cursor-pointer" />
                </div>
                <div className="col-span-2 px-1 flex items-center gap-0.5">
                  <input type="number" min="0" value={editOrderPrice} onChange={(e) => setEditOrderPrice(e.target.value)} placeholder="금액" className="w-full border border-indigo-300 bg-white rounded px-1.5 py-1 text-[11px] font-mono" />
                  <span className="text-[10px] font-bold">원</span>
                </div>
                <div className="col-span-1 px-0.5">
                  <select value={editOrderStatus} onChange={(e) => setEditOrderStatus(e.target.value)} className="w-full border border-indigo-300 bg-white rounded px-0.5 py-1 text-[10px] font-bold">
                    <option value="배송완료">배송완료</option>
                    <option value="배송중">배송중</option>
                    <option value="구매예정">구매예정</option>
                    <option value="취소·반품">취소·반품</option>
                  </select>
                </div>
                <div className="col-span-1 px-0.5">
                  <input type="text" value={editOrderMemo} onChange={(e) => setEditOrderMemo(e.target.value)} placeholder="메모" className="w-full border border-indigo-300 bg-white rounded px-1 py-1 text-[10px]" />
                </div>
                <div className="col-span-1 flex items-center justify-center gap-1">
                  <button onClick={() => saveEditOrder(order.id)} title="저장" className="p-1 rounded bg-indigo-600 text-white font-bold text-[10px]"><Check className="w-3 h-3" /></button>
                  <button onClick={cancelEditOrder} title="취소" className="p-1 rounded border border-neutral-300 bg-white text-neutral-600 text-[10px]"><X className="w-3 h-3" /></button>
                </div>
              </div>
            );
          }

          return (
            <div
              key={order.id}
              className="grid grid-cols-12 gap-1 items-center text-[11px] p-2.5 rounded-2xl border-2 border-indigo-400/90 bg-indigo-50/40 hover:bg-indigo-50/70 transition shadow-2xs text-center"
            >
              <div className="col-span-2 flex flex-col items-center justify-center">
                <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-900 border border-indigo-300 font-bold shadow-2xs flex items-center gap-1">
                  <span>{catIcon}</span>
                  <span>{order.category}</span>
                </span>
                <span className="text-[10px] text-neutral-500 font-medium mt-0.5">{order.platform}</span>
              </div>

              <div className="col-span-3 text-neutral-900 font-black truncate px-1 text-center" title={order.name}>
                {order.name}
              </div>

              <div className="col-span-2 text-neutral-600 font-mono font-medium truncate px-1">
                {order.orderDate}
              </div>

              <div className="col-span-2 text-indigo-950 font-black font-mono truncate px-1">
                {Number(order.price).toLocaleString()}원
              </div>

              <div className="col-span-1 flex justify-center">
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold border ${
                  order.status === "배송완료"
                    ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                    : order.status === "배송중"
                    ? "bg-blue-100 text-blue-800 border-blue-300 animate-pulse"
                    : order.status === "구매예정"
                    ? "bg-amber-100 text-amber-800 border-amber-300"
                    : "bg-neutral-100 text-neutral-600 border-neutral-300"
                }`}>
                  {order.status}
                </span>
              </div>

              <div className="col-span-1 text-neutral-500 truncate px-1 italic text-[10px]" title={order.memo}>
                {order.memo ? (
                  order.memo.startsWith("http") ? (
                    <a href={order.memo} target="_blank" rel="noreferrer" className="text-indigo-600 underline font-semibold">링크</a>
                  ) : (
                    order.memo
                  )
                ) : "-"}
              </div>

              <div className="col-span-1 flex items-center justify-center gap-1">
                <button onClick={() => startEditOrder(order)} title="수정" className="p-1 rounded text-neutral-500 hover:text-indigo-900 hover:bg-white transition"><Pencil className="w-3 h-3" /></button>
                <button onClick={() => handleDeleteOrder(order.id)} title="삭제" className="p-1 rounded text-neutral-500 hover:text-rose-600 hover:bg-white transition"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          );
        })}

        {filteredOrders.length === 0 && (
          <div className="border-2 border-dashed border-indigo-300 rounded-2xl p-12 text-center text-xs font-medium text-indigo-800/70 bg-indigo-50/20">
            등록되었거나 조건에 맞는 구매물품 내역이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}