// @ts-nocheck
/* eslint-disable */
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Wallet, Plus, Trash2, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { supabase, getCloudData, saveCloudData } from "@/lib/supabase";

interface LedgerTabProps {
  themeClasses: any;
}

interface LedgerItem {
  id: string;
  date: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  note: string;
}

export default function LedgerTab({ themeClasses }: LedgerTabProps) {
  const [items, setItems] = useState<LedgerItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 입력 폼 상태
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState("식비");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  // 클라우드 동기화 로드 및 구독
  useEffect(() => {
    async function loadLedger() {
      const saved = await getCloudData("jb_ledger_records_data", []);
      setItems(saved || []);
      setIsLoaded(true);
    }
    loadLedger();

    const channel = supabase
      .channel("ledger_tab_sync")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "app_storage", filter: "key=eq.jb_ledger_records_data" },
        (payload) => {
          if (payload.new?.value) {
            setItems(payload.new.value);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // 저장
  useEffect(() => {
    if (isLoaded) {
      saveCloudData("jb_ledger_records_data", items);
    }
  }, [items, isLoaded]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseInt(amount, 10);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;

    const newItem: LedgerItem = {
      id: Date.now().toString(),
      date,
      type,
      category,
      amount: parsedAmount,
      note: note.trim(),
    };

    setItems((prev) => [newItem, ...prev]);
    setAmount("");
    setNote("");
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 통계 계산
  const { totalIncome, totalExpense, balance } = useMemo(() => {
    let inc = 0;
    let exp = 0;
    items.forEach((item) => {
      if (item.type === "income") inc += item.amount;
      else exp += item.amount;
    });
    return {
      totalIncome: inc,
      totalExpense: exp,
      balance: inc - exp,
    };
  }, [items]);

  return (
    <div className={`w-full h-full border-2 ${themeClasses.borderSolid} rounded-2xl p-5 ${themeClasses.bgLight} backdrop-blur-[2px] shadow-sm flex flex-col gap-4 overflow-hidden`}>
      {/* 상단 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 shrink-0">
        <div className="bg-white/80 rounded-xl border border-sky-200 p-3 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-neutral-500">총 수입</span>
            <div className="text-base font-extrabold text-emerald-600">+{totalIncome.toLocaleString()}원</div>
          </div>
          <ArrowUpCircle className="w-7 h-7 text-emerald-500" />
        </div>
        <div className="bg-white/80 rounded-xl border border-sky-200 p-3 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-neutral-500">총 지출</span>
            <div className="text-base font-extrabold text-rose-600">-{totalExpense.toLocaleString()}원</div>
          </div>
          <ArrowDownCircle className="w-7 h-7 text-rose-500" />
        </div>
        <div className="bg-white/80 rounded-xl border border-sky-200 p-3 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-neutral-500">현재 잔액</span>
            <div className={`text-base font-extrabold ${balance >= 0 ? "text-sky-700" : "text-rose-700"}`}>
              {balance.toLocaleString()}원
            </div>
          </div>
          <Wallet className="w-7 h-7 text-sky-600" />
        </div>
      </div>

      {/* 내역 입력 폼 */}
      <form onSubmit={handleAddItem} className="bg-white/80 rounded-xl border border-sky-200 p-3 shrink-0 flex flex-wrap items-center gap-2">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="text-xs border border-neutral-300 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus:border-sky-500"
        />
        <select
          value={type}
          onChange={(e: any) => setType(e.target.value)}
          className="text-xs border border-neutral-300 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus:border-sky-500"
        >
          <option value="expense">지출</option>
          <option value="income">수입</option>
        </select>
        <input
          type="text"
          placeholder="분류 (식비, 쇼핑 등)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="text-xs border border-neutral-300 rounded-lg px-2.5 py-1.5 w-24 focus:outline-none focus:border-sky-500"
        />
        <input
          type="number"
          placeholder="금액 (원)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="text-xs border border-neutral-300 rounded-lg px-2.5 py-1.5 w-28 focus:outline-none focus:border-sky-500"
        />
        <input
          type="text"
          placeholder="메모 (내용)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="flex-1 text-xs border border-neutral-300 rounded-lg px-2.5 py-1.5 min-w-[120px] focus:outline-none focus:border-sky-500"
        />
        <button type="submit" className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${themeClasses.accentBtn}`}>
          <Plus className="w-3.5 h-3.5" />
          <span>등록</span>
        </button>
      </form>

      {/* 내역 리스트 테이블 */}
      <div className="flex-1 bg-white/80 rounded-xl border border-sky-200 overflow-hidden flex flex-col min-h-0">
        <div className="grid grid-cols-12 gap-2 bg-sky-100/70 p-2.5 text-xs font-bold text-sky-950 border-b border-sky-200 text-center shrink-0">
          <span className="col-span-2">날짜</span>
          <span className="col-span-2">구분 / 분류</span>
          <span className="col-span-5 text-left pl-2">메모</span>
          <span className="col-span-2 text-right pr-2">금액</span>
          <span className="col-span-1">관리</span>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 min-h-0">
          {items.map((item) => (
            <div key={item.id} className="grid grid-cols-12 gap-2 p-2.5 text-xs items-center hover:bg-neutral-50/80 transition">
              <span className="col-span-2 text-center text-neutral-500 font-mono text-[11px]">{item.date}</span>
              <div className="col-span-2 flex items-center justify-center gap-1.5">
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${item.type === "income" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>
                  {item.type === "income" ? "수입" : "지출"}
                </span>
                <span className="font-semibold text-neutral-700 truncate">{item.category}</span>
              </div>
              <span className="col-span-5 text-neutral-600 pl-2 truncate">{item.note || "-"}</span>
              <span className={`col-span-2 text-right pr-2 font-bold font-mono ${item.type === "income" ? "text-emerald-600" : "text-rose-600"}`}>
                {item.type === "income" ? "+" : "-"}{item.amount.toLocaleString()}원
              </span>
              <div className="col-span-1 flex justify-center">
                <button onClick={() => handleDeleteItem(item.id)} className="text-neutral-300 hover:text-rose-500 transition">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="py-12 text-center text-xs text-neutral-400">
              작성된 가계부 내역이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}