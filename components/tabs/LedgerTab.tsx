// @ts-nocheck
/* eslint-disable */
"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Wallet
} from "lucide-react";

interface LedgerTabProps {
  themeClasses?: any;
}

export default function LedgerTab({ themeClasses }: LedgerTabProps) {
  // 기준 날짜를 21일로 설정
  const TODAY_STR = "2026-09-21";

  const [currentDate, setCurrentDate] = useState(new Date("2026-09-21"));
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const [ledgerEntries, setLedgerEntries] = useState<any[]>([]);
  const [isLedgerLoaded, setIsLedgerLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jb_bookmark_ledger_v2");
      if (saved) {
        setLedgerEntries(JSON.parse(saved));
      }
      setIsLedgerLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLedgerLoaded && typeof window !== "undefined") {
      localStorage.setItem("jb_bookmark_ledger_v2", JSON.stringify(ledgerEntries));
    }
  }, [ledgerEntries, isLedgerLoaded]);

  // 기본 선택 날짜를 21일로 설정
  const [selectedDateStr, setSelectedDateStr] = useState<string>("2026-09-21");
  const [entryType, setEntryType] = useState<"expense" | "income">("expense");
  const [entryCategory, setEntryCategory] = useState("식비");
  const [entryAmount, setEntryAmount] = useState("");
  const [entryMemo, setEntryMemo] = useState("");

  const holidays: Record<string, string> = {
    "2026-09-24": "추석 연휴",
    "2026-09-25": "추석",
    "2026-09-26": "추석 연휴"
  };

  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    for (let d = 1; d <= totalDays; d++) {
      days.push(d);
    }
    return days;
  }, [year, month]);

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const handleToday = () => {
    setCurrentDate(new Date("2026-09-21"));
    setSelectedDateStr("2026-09-21");
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDateStr || !entryAmount) return;

    const newEntry = {
      id: Date.now(),
      date: selectedDateStr,
      type: entryType,
      category: entryCategory,
      amount: Number(entryAmount) || 0,
      memo: entryMemo.trim()
    };

    setLedgerEntries([newEntry, ...ledgerEntries]);
    setEntryAmount("");
    setEntryMemo("");
  };

  const handleDeleteEntry = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLedgerEntries((prev) => prev.filter((item) => item.id !== id));
  };

  const daySummaryMap = useMemo(() => {
    const map: Record<string, { income: number; expense: number; items: any[] }> = {};
    (ledgerEntries || []).forEach((entry) => {
      if (!map[entry.date]) {
        map[entry.date] = { income: 0, expense: 0, items: [] };
      }
      if (entry.type === "income") {
        map[entry.date].income += Number(entry.amount) || 0;
      } else {
        map[entry.date].expense += Number(entry.amount) || 0;
      }
      map[entry.date].items.push(entry);
    });
    return map;
  }, [ledgerEntries]);

  const monthTotal = useMemo(() => {
    let income = 0;
    let expense = 0;
    const monthPrefix = `${year}-${String(month + 1).padStart(2, "0")}`;
    (ledgerEntries || []).forEach((entry) => {
      if (entry.date.startsWith(monthPrefix)) {
        if (entry.type === "income") income += Number(entry.amount) || 0;
        else expense += Number(entry.amount) || 0;
      }
    });
    return { income, expense, balance: income - expense };
  }, [ledgerEntries, year, month]);

  const selectedItems = daySummaryMap[selectedDateStr]?.items || [];
  const selectedDayExpense = daySummaryMap[selectedDateStr]?.expense || 0;
  const selectedDayIncome = daySummaryMap[selectedDateStr]?.income || 0;

  return (
    <div className="h-full flex flex-col gap-2.5 pr-1 overflow-y-auto">
      {/* 상단 통계 바 */}
      <div className="border-2 border-sky-400/80 rounded-2xl p-3 bg-sky-50/40 backdrop-blur-[2px] shadow-sm flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-sky-600" />
          <span className="text-base font-extrabold text-sky-950">
            {year}년 {month + 1}월 가계부
          </span>
        </div>

        <div className="flex items-center gap-2.5 text-xs font-bold">
          <span className="text-emerald-700 bg-emerald-100/70 border border-emerald-200 px-2 py-0.5 rounded-lg">
            수입: +{monthTotal.income.toLocaleString()}원
          </span>
          <span className="text-rose-700 bg-rose-100/70 border border-rose-200 px-2 py-0.5 rounded-lg">
            지출: -{monthTotal.expense.toLocaleString()}원
          </span>
          <span className="text-sky-950 bg-sky-100/70 border border-sky-200 px-2 py-0.5 rounded-lg">
            잔액: {monthTotal.balance.toLocaleString()}원
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleToday}
            className="px-2.5 py-1 text-xs font-bold border border-sky-300 bg-white/80 rounded-lg hover:bg-sky-100 text-sky-900 transition"
          >
            오늘
          </button>
          <button
            onClick={handlePrevMonth}
            className="p-1 rounded-lg border border-sky-300 bg-white/80 hover:bg-sky-100 text-sky-900 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-1 rounded-lg border border-sky-300 bg-white/80 hover:bg-sky-100 text-sky-900 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 달력 본체 */}
      <div className="border-2 border-sky-400/80 rounded-2xl p-3 bg-white/90 shadow-sm flex flex-col shrink-0">
        <div className="grid grid-cols-7 gap-1.5 text-center font-extrabold text-xs py-1 mb-1">
          <span className="text-red-500">일</span>
          <span className="text-neutral-700">월</span>
          <span className="text-neutral-700">화</span>
          <span className="text-neutral-700">수</span>
          <span className="text-neutral-700">목</span>
          <span className="text-neutral-700">금</span>
          <span className="text-blue-500">토</span>
        </div>

        <div className="grid grid-cols-7 gap-1.5">
          {calendarDays.map((day, idx) => {
            if (day === null) {
              return <div key={`empty-${idx}`} className="h-16 rounded-xl bg-transparent" />;
            }

            const dayStr = String(day).padStart(2, "0");
            const monthStr = String(month + 1).padStart(2, "0");
            const dateStr = `${year}-${monthStr}-${dayStr}`;

            const isToday = dateStr === TODAY_STR;
            const isSelected = selectedDateStr === dateStr;
            const colIndex = idx % 7;
            const isSunday = colIndex === 0;
            const isSaturday = colIndex === 6;
            const holidayName = holidays[dateStr];

            const summary = daySummaryMap[dateStr];

            return (
              <div
                key={dateStr}
                onClick={() => setSelectedDateStr(dateStr)}
                className={`flex flex-col p-1.5 rounded-xl border transition-all cursor-pointer h-16 relative ${
                  isToday
                    ? "border-amber-400 bg-amber-50/70 ring-2 ring-amber-300 shadow-sm"
                    : isSelected
                    ? "border-sky-500 bg-sky-50/80 ring-1 ring-sky-400"
                    : "border-sky-100/90 hover:border-sky-300 hover:bg-sky-50/20 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold leading-none ${
                      isSunday || holidayName
                        ? "text-red-500"
                        : isSaturday
                        ? "text-blue-500"
                        : "text-neutral-800"
                    }`}
                  >
                    {day}
                  </span>
                  {holidayName && (
                    <span className="text-[8px] text-red-500 font-medium truncate max-w-[50px]">
                      {holidayName}
                    </span>
                  )}
                </div>

                {summary && (
                  <div className="flex flex-col gap-0.5 mt-1 font-mono text-[9px] leading-tight">
                    {summary.income > 0 && (
                      <span className="text-emerald-600 font-bold truncate">
                        +{summary.income.toLocaleString()}
                      </span>
                    )}
                    {summary.expense > 0 && (
                      <span className="text-rose-600 font-bold truncate">
                        -{summary.expense.toLocaleString()}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 복구된 하단 가계부 요약창 & 입력창 */}
      <div className="border-2 border-sky-400/80 rounded-2xl p-3.5 bg-sky-50/40 backdrop-blur-[2px] shadow-sm flex flex-col gap-2.5 flex-1 min-h-[190px]">
        <div className="flex flex-wrap items-center justify-between border-b border-sky-200/80 pb-2 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-sky-950 flex items-center gap-1">
              <span>💰</span>
              <span>{selectedDateStr} 요약</span>
            </span>
            <span className="text-[10px] font-bold text-rose-700 bg-rose-100/80 px-1.5 py-0.2 rounded border border-rose-200">
              지출: -{selectedDayExpense.toLocaleString()}원
            </span>
            {selectedDayIncome > 0 && (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.2 rounded border border-emerald-200">
                수입: +{selectedDayIncome.toLocaleString()}원
              </span>
            )}
          </div>

          {/* 인라인 입력 폼 */}
          <form onSubmit={handleAddEntry} className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setEntryType(entryType === "expense" ? "income" : "expense")}
              className={`px-2 py-1 text-xs font-bold rounded-lg border transition ${
                entryType === "expense"
                  ? "bg-rose-500 text-white border-rose-600 shadow-2xs"
                  : "bg-emerald-500 text-white border-emerald-600 shadow-2xs"
              }`}
            >
              {entryType === "expense" ? "지출(-)" : "수입(+)"}
            </button>
            <input
              type="text"
              value={entryCategory}
              onChange={(e) => setEntryCategory(e.target.value)}
              placeholder="분류"
              className="w-16 border border-sky-300 bg-white rounded-lg px-2 py-1 text-xs font-bold"
            />
            <input
              type="number"
              required
              value={entryAmount}
              onChange={(e) => setEntryAmount(e.target.value)}
              placeholder="금액(원)"
              className="w-24 border border-sky-300 bg-white rounded-lg px-2 py-1 text-xs font-mono font-bold"
            />
            <input
              type="text"
              value={entryMemo}
              onChange={(e) => setEntryMemo(e.target.value)}
              placeholder="메모 (선택)"
              className="w-36 border border-sky-300 bg-white rounded-lg px-2 py-1 text-xs font-medium"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-lg shadow-2xs flex items-center gap-1 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" /> 추가
            </button>
          </form>
        </div>

        {/* 당일 내역 리스트 */}
        <div className="flex flex-wrap gap-2 overflow-y-auto max-h-[120px] pt-0.5">
          {selectedItems.map((item: any) => (
            <div
              key={item.id}
              className="flex items-center gap-2 bg-white border border-sky-300 px-2.5 py-1.5 rounded-xl shadow-2xs text-xs font-medium"
            >
              <span className="font-bold text-sky-950 px-1.5 py-0.5 bg-sky-100 rounded text-[10px]">
                {item.category}
              </span>
              <span className="text-neutral-700">{item.memo || "-"}</span>
              <span
                className={`font-mono font-bold ${
                  item.type === "income" ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {item.type === "income" ? "+" : "-"}
                {item.amount.toLocaleString()}원
              </span>
              <button
                onClick={(e) => handleDeleteEntry(item.id, e)}
                className="text-neutral-400 hover:text-rose-600 ml-1 p-0.5 transition"
                title="내역 삭제"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}

          {selectedItems.length === 0 && (
            <div className="w-full text-center py-5 text-xs font-medium text-sky-800/60">
              선택한 날짜에 등록된 가계부 내역이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}