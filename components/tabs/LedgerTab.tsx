// @ts-nocheck
/* eslint-disable */
"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Wallet,
  PiggyBank,
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  Pencil,
  Trash2,
  Check,
  Plus,
  X
} from "lucide-react";

interface LedgerTabProps {
  themeClasses?: any;
}

export default function LedgerTab({ themeClasses }: LedgerTabProps) {
  const TODAY_STR = "2026-09-20";

  const holidays: Record<string, string> = {
    "2026-09-24": "추석 연휴",
    "2026-09-25": "추석",
    "2026-09-26": "추석 연휴",
  };

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
  const [editLedgerTitle, setEditLedgerTitle] = useState("");
  const [editLedgerAmount, setEditLedgerAmount] = useState("");
  const [editLedgerType, setEditLedgerType] = useState<"expense" | "income">("expense");
  const [editLedgerSymbol, setEditLedgerSymbol] = useState("fixed");
  const [editLedgerColor, setEditLedgerColor] = useState("pink");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && ledgerModalDate) {
        setLedgerModalDate(null);
        setLedgerEditingId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [ledgerModalDate]);

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
        item.id === id
          ? {
              ...item,
              title: trimmedTitle,
              amount: Number(editLedgerAmount),
              type: editLedgerType,
              symbol: editLedgerSymbol,
              color: editLedgerColor
            }
          : item
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
    return {
      income,
      expense,
      balance: income - expense,
      taxiTotal,
      deliveryTotal,
      fixedItems,
      count: monthlyList.length
    };
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

  return (
    <div className="h-full flex flex-col gap-3">
      {/* 상단 컨트롤 바 */}
      <div className="border-2 border-sky-400/80 rounded-2xl bg-white/95 backdrop-blur-md px-5 py-3 shadow-sm flex items-center justify-between shrink-0">
        <div className="flex-1 flex items-center justify-between pr-6 border-r border-sky-200">
          <button onClick={prevLedgerMonth} className="px-4 py-1.5 rounded-xl border border-sky-400 text-sky-700 hover:bg-sky-50 font-bold text-xs transition">
            &lt; 이전달
          </button>
          <h2 className="text-lg font-black text-sky-950 tracking-tight flex items-center gap-2">
            <Wallet className="w-5 h-5 text-sky-600" />
            <span>{ledgerYear}년 {ledgerMonth}월 가계부</span>
          </h2>
          <button onClick={nextLedgerMonth} className="px-4 py-1.5 rounded-xl border border-sky-400 text-sky-700 hover:bg-sky-50 font-bold text-xs transition">
            다음달 &gt;
          </button>
        </div>
        <div className="w-[280px] pl-6 flex items-center gap-1.5 text-sm font-extrabold text-sky-900">
          <PiggyBank className="w-4 h-4 text-sky-600" />
          <span>재정 요약</span>
        </div>
      </div>

      {/* 달력 본체 및 요약 패널 */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-3 items-stretch">
        {/* 달력 그리드 */}
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
              dayEntries.forEach((e) => {
                if (e.type === "income") dayIncome += Number(e.amount || 0);
                else dayExpense += Number(e.amount || 0);
              });

              return (
                <div
                  key={cell.dateStr}
                  onClick={() => { setLedgerEditingId(null); setLedgerModalDate(cell.dateStr); }}
                  className={`h-full border rounded-xl p-1.5 flex flex-col justify-between transition group relative cursor-pointer min-h-0 ${
                    isToday ? "border-amber-400 bg-amber-50/70" : "border-sky-200/90 bg-white hover:border-sky-400"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold leading-tight">
                    <span className={isSunday || holidayName ? "text-rose-600" : isSaturday ? "text-blue-600" : "text-neutral-800"}>
                      {cell.day}
                    </span>
                    {(dayIncome > 0 || dayExpense > 0) && (
                      <span className="text-[9px] font-mono font-bold text-sky-800">
                        {dayExpense > 0 && <span className="text-rose-500 mr-1">-{dayExpense.toLocaleString()}</span>}
                        {dayIncome > 0 && <span className="text-blue-600">+{dayIncome.toLocaleString()}</span>}
                      </span>
                    )}
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
                              <span className="font-mono text-[9px] opacity-85 whitespace-nowrap">
                                {isIncome ? "+" : "-"}{Number(item.amount).toLocaleString()}원
                              </span>
                            </div>
                          </div>
                          <button onClick={(e) => handleDeleteLedgerEntry(item.id, e)} title="삭제" className="text-neutral-400 hover:text-rose-500 p-0.5 shrink-0">
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

        {/* 우측 재정 요약 카드 */}
        <div className="w-full lg:w-[280px] h-full shrink-0 border-2 border-sky-400/80 rounded-2xl bg-white/95 backdrop-blur-md p-4 shadow-sm flex flex-col justify-start gap-3 overflow-y-auto">
          <div className="border border-blue-200 bg-blue-50/80 rounded-2xl p-3 shadow-xs">
            <span className="text-xs font-bold text-blue-900 flex items-center gap-1">
              <ArrowDownLeft className="w-3.5 h-3.5 text-blue-600" /> 총 수입
            </span>
            <div className="text-xl font-black text-blue-600 my-1.5">+{currentMonthLedgerSummary.income.toLocaleString()}원</div>
          </div>

          <div className="border border-rose-200 bg-rose-50/80 rounded-2xl p-3 shadow-xs">
            <span className="text-xs font-bold text-rose-900 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5 text-rose-600" /> 총 지출
            </span>
            <div className="text-xl font-black text-rose-600 my-1.5">-{currentMonthLedgerSummary.expense.toLocaleString()}원</div>
          </div>

          <div className="border border-sky-200 bg-sky-50/80 rounded-2xl p-3 shadow-xs">
            <span className="text-xs font-bold text-sky-900 flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5 text-sky-600" /> 정산 잔액
            </span>
            <div className={`text-xl font-black my-1.5 ${currentMonthLedgerSummary.balance >= 0 ? "text-sky-700" : "text-rose-600"}`}>
              {currentMonthLedgerSummary.balance >= 0 ? "+" : ""}{currentMonthLedgerSummary.balance.toLocaleString()}원
            </div>
          </div>

          <div className="border-t border-sky-200/80 my-0.5 shrink-0" />

          <div className="border border-amber-200 bg-amber-50/80 rounded-2xl p-3 shadow-xs">
            <span className="text-xs font-bold text-amber-900">🚕 택시 지출 합산</span>
            <div className="text-xl font-black text-amber-900 my-1.5">{currentMonthLedgerSummary.taxiTotal.toLocaleString()}원</div>
          </div>

          <div className="border border-pink-200 bg-pink-50/80 rounded-2xl p-3 shadow-xs">
            <span className="text-xs font-bold text-pink-900">🛵 배달 지출 합산</span>
            <div className="text-xl font-black text-pink-900 my-1.5">{currentMonthLedgerSummary.deliveryTotal.toLocaleString()}원</div>
          </div>

          <div className="border border-purple-200 bg-purple-50/80 rounded-2xl p-3 shadow-xs flex flex-col gap-2 shrink-0">
            <div className="flex items-center justify-between text-xs font-bold text-purple-900">
              <span>📌 고정 지출 목록</span>
              <button onClick={() => openFixedExpenseModal()} className="p-1 rounded bg-purple-100 hover:bg-purple-200 text-purple-800 text-[10px] font-bold flex items-center gap-0.5">
                <Plus className="w-3 h-3" /> 추가
              </button>
            </div>
            <div className="space-y-1.5">
              {currentMonthLedgerSummary.fixedItems.map((item) => (
                <div key={`fixed-tpl-${item.tplTitle}`} onClick={() => openFixedExpenseModal(item)} className="flex items-center justify-between bg-white/90 p-2 rounded-xl border border-purple-200 text-xs hover:border-purple-400 cursor-pointer transition group">
                  <div className="min-w-0 pr-1">
                    <div className="font-bold text-neutral-800 truncate leading-tight">📌 {item.tplTitle}</div>
                    <div className="text-[10px] font-mono font-bold mt-0.5">
                      {item.entry ? (
                        <span className="text-purple-700 font-black">-{Number(item.entry.amount).toLocaleString()}원</span>
                      ) : (
                        <span className="text-rose-500 italic font-semibold">금액 미입력</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={(e) => { e.stopPropagation(); openFixedExpenseModal(item); }} className="p-1 rounded-md text-neutral-400 hover:text-purple-700 hover:bg-purple-100">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={(e) => handleDeleteFixedTemplate(item.tplTitle, e)} className="p-1 rounded-md text-neutral-400 hover:text-rose-600 hover:bg-rose-50">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 가계부 모달 팝업 */}
      {ledgerModalDate && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4"
          onClick={() => { setLedgerModalDate(null); setLedgerEditingId(null); }}
        >
          <div
            className="bg-white rounded-3xl p-6 border border-sky-300 shadow-2xl max-w-md w-full max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 shrink-0">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-sky-500" />
                <h3 className="text-base font-black text-neutral-900">가계부 관리</h3>
                <input
                  type="date"
                  value={ledgerModalDate}
                  onChange={(e) => setLedgerModalDate(e.target.value)}
                  className="border border-sky-200 bg-sky-50/50 rounded-lg px-2 py-0.5 text-xs font-bold text-sky-900"
                />
              </div>
              <button onClick={() => { setLedgerModalDate(null); setLedgerEditingId(null); }} className="text-neutral-400 hover:text-neutral-600 p-1.5 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-3 overflow-y-auto space-y-2 max-h-[220px] pr-1">
              {(ledgerEntries || []).filter((s) => s.date === ledgerModalDate).map((item) => {
                const isIncome = item.type === "income";
                const colorObj = LEDGER_COLOR_CONFIG[item.color] || LEDGER_COLOR_CONFIG.pink;
                const symbolObj = LEDGER_SYMBOL_CONFIG[item.symbol] || LEDGER_SYMBOL_CONFIG.fixed;
                return (
                  <div key={item.id} className={`flex items-center justify-between p-2 rounded-xl border text-xs font-semibold ${colorObj.class}`}>
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <span className="text-base">{symbolObj.icon}</span>
                      <span className="font-bold truncate">{item.title}</span>
                      <span className="font-mono font-bold whitespace-nowrap">{isIncome ? "+" : "-"}{Number(item.amount).toLocaleString()}원</span>
                    </div>
                    <button onClick={(e) => handleDeleteLedgerEntry(item.id, e)} title="삭제" className="p-1 rounded-md hover:bg-rose-100 text-neutral-600">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleAddLedgerEntry} className="pt-3 border-t border-neutral-200 shrink-0 space-y-3">
              <div className="flex gap-2">
                <select value={newLedgerType} onChange={(e) => setNewLedgerType(e.target.value as "expense" | "income")} className="border border-sky-300 rounded-xl px-2.5 py-2 text-xs font-bold bg-white">
                  <option value="expense">지출 (-)</option>
                  <option value="income">수입 (+)</option>
                </select>
                <input
                  type="text"
                  required
                  value={newLedgerTitle}
                  onChange={(e) => setNewLedgerTitle(e.target.value)}
                  placeholder="항목 내용"
                  className="flex-1 border border-sky-300 rounded-xl px-3 py-2 text-xs font-medium"
                />
                <select value={newLedgerSymbol} onChange={(e) => setNewLedgerSymbol(e.target.value)} className="border border-sky-300 rounded-xl px-2 py-2 text-xs font-bold bg-white">
                  {Object.entries(LEDGER_SYMBOL_CONFIG).map(([key, val]) => (
                    <option key={key} value={key}>{val.icon} {val.label}</option>
                  ))}
                </select>
              </div>
              <input
                type="number"
                required
                min="0"
                value={newLedgerAmount}
                onChange={(e) => setNewLedgerAmount(e.target.value)}
                placeholder="금액을 입력하세요 (예: 15000)"
                className="w-full border border-sky-300 rounded-xl px-3 py-2 text-xs font-medium"
              />
              <div className="flex items-center gap-3 bg-neutral-50 p-2 rounded-xl border border-neutral-200">
                {Object.entries(LEDGER_COLOR_CONFIG).map(([key, val]) => (
                  <label key={key} className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="ledgerTagColor" value={key} checked={newLedgerColor === key} onChange={() => setNewLedgerColor(key)} className="hidden" />
                    <span className={`w-6 h-6 rounded-full ${val.chip} border-2 flex items-center justify-center ${newLedgerColor === key ? "border-sky-800 scale-110 shadow-xs" : "border-transparent opacity-70"}`}>
                      {newLedgerColor === key && <Check className="w-3 h-3 text-sky-950 stroke-[3]" />}
                    </span>
                    <span className="text-[11px] font-semibold text-neutral-700">{val.label}</span>
                  </label>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button type="button" onClick={() => { setLedgerModalDate(null); setLedgerEditingId(null); }} className="flex-1 py-2 rounded-xl border border-neutral-300 text-neutral-600 text-xs font-semibold">
                  닫기 (ESC)
                </button>
                <button type="submit" className="flex-1 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold">
                  내역 추가
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}