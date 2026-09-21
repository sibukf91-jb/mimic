// @ts-nocheck
/* eslint-disable */
"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Calendar as CalendarIcon,
  CalendarDays,
  Pencil,
  Trash2,
  Check,
  X
} from "lucide-react";

interface ScheduleTabProps {
  themeClasses?: any;
}

export default function ScheduleTab({ themeClasses }: ScheduleTabProps) {
  // 실시간 오늘 날짜 자동 계산 함수 (자정이 지나면 오늘 날짜로 자동 이동)
  const getTodayStr = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [currentDateObj, setCurrentDateObj] = useState(new Date());

  // 1초마다 시계를 갱신하여 자정(00:00:00) 통과 시 즉시 하이라이트 변경
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateObj(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const TODAY_STR = useMemo(() => getTodayStr(), [currentDateObj]);
  const todayDateObj = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, [currentDateObj]);

  const holidays: Record<string, string> = {
    "2026-09-24": "추석 연휴",
    "2026-09-25": "추석",
    "2026-09-26": "추석 연휴",
  };

  // 심볼 설정: 기존 심볼 + 모임, 병원
  const SCHEDULE_SYMBOL_CONFIG = {
    leave: { label: "연차", icon: "🌴" },
    half_leave: { label: "반차", icon: "🌓" },
    hair: { label: "헤어", icon: "✂️" },
    birthday: { label: "생일", icon: "🎂" },
    appointment: { label: "약속", icon: "📌" },
    gathering: { label: "모임", icon: "🍻" },
    hospital: { label: "병원", icon: "🏥" },
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
  const [calYear, setCalYear] = useState(() => new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(() => new Date().getMonth() + 1);
  const [modalDate, setModalDate] = useState<string | null>(null);

  const [newSchedTitle, setNewSchedTitle] = useState("");
  const [newSchedSymbol, setNewSchedSymbol] = useState("appointment");
  const [newSchedColor, setNewSchedColor] = useState("pink");

  const [popupEditingId, setPopupEditingId] = useState<number | null>(null);
  const [editPopupTitle, setEditPopupTitle] = useState("");
  const [editPopupSymbol, setEditPopupSymbol] = useState("appointment");
  const [editPopupColor, setEditPopupColor] = useState("pink");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalDate) {
        setModalDate(null);
        setPopupEditingId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalDate]);

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
    const newEntry = {
      id: Date.now(),
      date: modalDate,
      title: newSchedTitle.trim(),
      symbol: newSchedSymbol,
      color: newSchedColor
    };
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
      prev.map((item) =>
        item.id === id
          ? { ...item, title: editPopupTitle.trim(), symbol: editPopupSymbol, color: editPopupColor }
          : item
      )
    );
    setPopupEditingId(null);
  };

  const handleDeleteSchedule = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setScheduleList((prev) => prev.filter((item) => item.id !== id));
  };

  const leaveSummary = useMemo(() => {
    const currentYearStr = String(calYear);
    const leaveItems = (scheduleList || []).filter(
      (s) => s.date.startsWith(currentYearStr) && (s.symbol === "leave" || s.symbol === "half_leave")
    );
    if (leaveItems.length === 0) return null;
    let used = 0;
    leaveItems.forEach((s) => {
      if (s.symbol === "leave") used += 1.0;
      else if (s.symbol === "half_leave") used += 0.5;
    });
    const total = 16.0;
    const remaining = Math.max(0, total - used);
    return {
      used,
      remaining: remaining % 1 === 0 ? remaining.toFixed(0) : remaining.toFixed(1),
      count: leaveItems.length
    };
  }, [scheduleList, calYear]);

  const birthdaySummary = useMemo(() => {
    const birthdays = (scheduleList || [])
      .filter((s) => s.symbol === "birthday")
      .sort((a, b) => a.date.localeCompare(b.date));
    if (birthdays.length === 0) return null;
    let nextBday = birthdays.find((s) => s.date >= TODAY_STR) || birthdays[birthdays.length - 1];
    const bdayDate = new Date(nextBday.date);
    bdayDate.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((bdayDate.getTime() - todayDateObj.getTime()) / (1000 * 60 * 60 * 24));
    return {
      title: nextBday.title || "생일",
      date: nextBday.date,
      dDayText: diffDays === 0 ? "D-Day" : diffDays > 0 ? `D-${diffDays}` : `D+${Math.abs(diffDays)}`
    };
  }, [scheduleList, TODAY_STR, todayDateObj]);

  const hairSummary = useMemo(() => {
    const hairList = (scheduleList || [])
      .filter((s) => s.symbol === "hair")
      .sort((a, b) => a.date.localeCompare(b.date));
    if (hairList.length === 0) return null;
    const nextHair = hairList.find((s) => s.date > TODAY_STR);
    const pastHairs = hairList.filter((s) => s.date <= TODAY_STR);
    const lastHair = pastHairs.length > 0 ? pastHairs[pastHairs.length - 1] : null;

    if (nextHair) {
      const nDate = new Date(nextHair.date);
      nDate.setHours(0, 0, 0, 0);
      const diffDays = Math.ceil((nDate.getTime() - todayDateObj.getTime()) / (1000 * 60 * 60 * 24));
      return {
        mode: "next",
        title: nextHair.title || "이발 예약",
        date: nextHair.date,
        displayText: diffDays === 0 ? "오늘 예약" : `D-${diffDays}`,
        subText: `(예약: ${nextHair.date})`
      };
    } else if (lastHair) {
      const lDate = new Date(lastHair.date);
      lDate.setHours(0, 0, 0, 0);
      const diffDays = Math.floor((todayDateObj.getTime() - lDate.getTime()) / (1000 * 60 * 60 * 24));
      return {
        mode: "past",
        title: "이발 후 경과일 (헤어)",
        date: lastHair.date,
        displayText: `+${diffDays}일`,
        subText: `(${lastHair.date} 기준)`
      };
    }
    return null;
  }, [scheduleList, TODAY_STR, todayDateObj]);

  const upcomingAppointments = useMemo(() => {
    return (scheduleList || [])
      .filter((s) => s.symbol === "appointment" && s.date >= TODAY_STR)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 2);
  }, [scheduleList, TODAY_STR]);

  const hasAnyScheduleSummary = leaveSummary || birthdaySummary || hairSummary || upcomingAppointments.length > 0;

  return (
    <div className="h-full flex flex-col gap-3">
      {/* 상단 컨트롤 바 */}
      <div className="border-2 border-pink-400/80 rounded-2xl bg-white/95 backdrop-blur-md px-5 py-3 shadow-sm flex items-center justify-between shrink-0">
        <div className="flex-1 flex items-center justify-between pr-6 border-r border-pink-200">
          <button onClick={prevMonth} className="px-4 py-1.5 rounded-xl border border-pink-400 text-pink-700 hover:bg-pink-50 font-bold text-xs transition">
            &lt; 이전달
          </button>
          <h2 className="text-lg font-black text-pink-950 tracking-tight flex items-center gap-2">
            <span>🗓️</span>
            <span>{calYear}년 {calMonth}월 일정표</span>
          </h2>
          <button onClick={nextMonth} className="px-4 py-1.5 rounded-xl border border-pink-400 text-pink-700 hover:bg-pink-50 font-bold text-xs transition">
            다음달 &gt;
          </button>
        </div>
        <div className="w-[280px] pl-6 flex items-center gap-1.5 text-sm font-extrabold text-pink-900">
          <span>📌</span>
          <span>일정 요약</span>
        </div>
      </div>

      {/* 달력 본체 및 요약 패널 */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-3 items-stretch">
        {/* 달력 그리드 */}
        <div className="flex-1 h-full border-2 border-pink-400/80 rounded-2xl bg-white/95 backdrop-blur-md p-4 shadow-sm flex flex-col justify-between overflow-hidden">
          <div className="grid grid-cols-7 text-center font-bold text-xs pb-2 border-b border-pink-100 text-neutral-700 shrink-0">
            <span className="text-rose-600 font-extrabold">일</span>
            <span>월</span>
            <span>화</span>
            <span>수</span>
            <span>목</span>
            <span>금</span>
            <span className="text-blue-600 font-extrabold">토</span>
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
                <div
                  key={cell.dateStr}
                  onClick={() => setModalDate(cell.dateStr)}
                  className={`h-full border rounded-xl p-1.5 flex flex-col justify-between transition group relative cursor-pointer min-h-0 ${
                    isToday ? "border-amber-400 bg-amber-50/70" : "border-pink-200/90 bg-white hover:border-pink-400 hover:bg-pink-50/20"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold leading-tight">
                    <span className={isSunday || holidayName ? "text-rose-600" : isSaturday ? "text-blue-600" : "text-neutral-800"}>
                      {cell.day}
                    </span>
                    {holidayName && (
                      <span className="text-[9px] font-bold text-rose-500 truncate max-w-[55px]">{holidayName}</span>
                    )}
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-1 my-0.5 pr-0.5 scrollbar-none">
                    {daySchedules.map((item) => {
                      const symbolInfo = SCHEDULE_SYMBOL_CONFIG[item.symbol] || SCHEDULE_SYMBOL_CONFIG.appointment;
                      const colorInfo = SCHEDULE_COLOR_CONFIG[item.color] || SCHEDULE_COLOR_CONFIG.pink;
                      return (
                        <div
                          key={item.id}
                          className={`flex items-center justify-between px-1.5 py-0.5 rounded border text-[10px] font-semibold leading-none shadow-2xs ${colorInfo.class}`}
                        >
                          <span className="truncate flex items-center gap-1">
                            <span className="text-[9px]">{symbolInfo.icon}</span>
                            <span>{item.title}</span>
                          </span>
                          <button onClick={(e) => handleDeleteSchedule(item.id, e)} title="삭제" className="text-neutral-400 hover:text-rose-500 ml-1 shrink-0">
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

        {/* 우측 일정 요약 카드 */}
        <div className="w-full lg:w-[280px] h-full shrink-0 border-2 border-pink-400/80 rounded-2xl bg-white/95 backdrop-blur-md p-4 shadow-sm flex flex-col justify-start gap-3.5 overflow-y-auto">
          {leaveSummary && (
            <div className="border border-blue-200 bg-blue-50/80 rounded-2xl p-4 shadow-xs flex flex-col justify-between shrink-0">
              <div className="flex items-center justify-between text-xs font-bold text-blue-900">
                <span>남은 연차 (총 16개 기준)</span>
                <span className="text-[10px] text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-full font-bold">1월 1일 리셋</span>
              </div>
              <div className="text-3xl font-black text-blue-600 tracking-tight my-2">{leaveSummary.remaining} 개</div>
              <div className="text-[11px] text-neutral-500 font-medium">사용: {leaveSummary.used}개 (등록 {leaveSummary.count}건)</div>
            </div>
          )}

          {birthdaySummary && (
            <div className="border border-rose-200 bg-rose-50/80 rounded-2xl p-4 shadow-xs flex flex-col justify-between shrink-0">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
                <span>🎂</span>
                <span>{birthdaySummary.title}</span>
              </div>
              <div className="text-3xl font-black text-rose-600 tracking-tight my-2">{birthdaySummary.dDayText}</div>
              <div className="text-[11px] text-neutral-500 font-medium">({birthdaySummary.date} 기준)</div>
            </div>
          )}

          {hairSummary && (
            <div className="border border-purple-200 bg-purple-50/80 rounded-2xl p-4 shadow-xs flex flex-col justify-between shrink-0">
              <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900">
                <span>✂️</span>
                <span>{hairSummary.title}</span>
              </div>
              <div className="text-3xl font-black text-purple-600 tracking-tight my-2">{hairSummary.displayText}</div>
              <div className="text-[11px] text-neutral-500 font-medium">{hairSummary.subText}</div>
            </div>
          )}

          {upcomingAppointments.map((app) => (
            <div key={`app-${app.id}`} className="border border-amber-200 bg-amber-50/80 rounded-2xl p-3.5 shadow-xs flex flex-col justify-between shrink-0">
              <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                <span className="flex items-center gap-1">📌 약속: {app.title}</span>
                <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-md font-bold">D-Day</span>
              </div>
              <div className="text-[11px] text-neutral-500 font-medium mt-1">날짜: {app.date}</div>
            </div>
          ))}

          {!hasAnyScheduleSummary && (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-400">
              <CalendarDays className="w-8 h-8 mb-2 text-pink-300" />
              <span className="text-xs font-bold text-neutral-500 mb-1">일정 요약 없음</span>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                달력에 <span className="font-semibold text-pink-600">연차, 반차, 헤어, 생일</span> 일정을 등록하면 이곳에 자동으로 요약 카드가 생성됩니다.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 일정 관리 모달 팝업 */}
      {modalDate && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4"
          onClick={() => { setModalDate(null); setPopupEditingId(null); }}
        >
          <div
            className="bg-white rounded-3xl p-6 border border-pink-300 shadow-2xl max-w-md w-full max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 shrink-0">
              <h3 className="text-base font-black text-neutral-900 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-pink-500" />
                <span>{modalDate} 일정 관리</span>
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-neutral-400 font-medium bg-neutral-100 px-2 py-0.5 rounded-md">ESC로 닫기</span>
                <button onClick={() => { setModalDate(null); setPopupEditingId(null); }} className="text-neutral-400 hover:text-neutral-600 p-1.5 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 등록된 목록 */}
            <div className="my-3 overflow-y-auto space-y-2 max-h-[220px] pr-1">
              <div className="text-[11px] font-bold text-neutral-500 mb-1">
                등록된 일정 ({(scheduleList || []).filter((s) => s.date === modalDate).length}건)
              </div>

              {(scheduleList || []).filter((s) => s.date === modalDate).map((item) => {
                const isEditingThis = popupEditingId === item.id;
                const symbolObj = SCHEDULE_SYMBOL_CONFIG[item.symbol] || SCHEDULE_SYMBOL_CONFIG.appointment;
                const colorObj = SCHEDULE_COLOR_CONFIG[item.color] || SCHEDULE_COLOR_CONFIG.pink;

                if (isEditingThis) {
                  return (
                    <div key={`pop-edit-${item.id}`} className="p-3 rounded-2xl border-2 border-pink-400 bg-pink-50/50 space-y-2">
                      <input
                        type="text"
                        value={editPopupTitle}
                        onChange={(e) => setEditPopupTitle(e.target.value)}
                        className="w-full border border-pink-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-neutral-900 bg-white focus:outline-none focus:border-pink-500"
                      />
                      <div className="flex gap-1 flex-wrap">
                        {Object.entries(SCHEDULE_SYMBOL_CONFIG).map(([key, val]) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setEditPopupSymbol(key)}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition ${
                              editPopupSymbol === key
                                ? "border-pink-500 bg-pink-50 text-pink-900 font-black"
                                : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                            }`}
                          >
                            {val.icon} {val.label}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-neutral-600">색상:</span>
                        {Object.entries(SCHEDULE_COLOR_CONFIG).map(([key, val]) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setEditPopupColor(key)}
                            className={`w-5 h-5 rounded-full ${val.chip} border-2 transition ${
                              editPopupColor === key ? "border-pink-600 scale-110" : "border-white"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex justify-end gap-1.5 pt-1">
                        <button onClick={() => savePopupEdit(item.id)} className="px-3 py-1 bg-pink-500 text-white text-xs font-bold rounded-lg hover:bg-pink-600">저장</button>
                        <button onClick={() => setPopupEditingId(null)} className="px-3 py-1 bg-white border border-neutral-300 text-neutral-600 text-xs rounded-lg hover:bg-neutral-50">취소</button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={item.id} className={`flex items-center justify-between p-2 rounded-xl border text-xs font-semibold ${colorObj.class}`}>
                    <div className="flex items-center gap-1.5 min-w-0 pr-2">
                      <span className="text-sm">{symbolObj.icon}</span>
                      <span className="truncate">{item.title}</span>
                      <span className="text-[10px] opacity-75 font-normal">({symbolObj.label})</span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => startPopupEdit(item)} title="수정" className="p-1 rounded-md hover:bg-black/10 text-neutral-600"><Pencil className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDeleteSchedule(item.id)} title="삭제" className="p-1 rounded-md hover:bg-rose-100 text-neutral-600 hover:text-rose-600"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                );
              })}

              {(scheduleList || []).filter((s) => s.date === modalDate).length === 0 && (
                <div className="text-center py-4 text-neutral-400 text-xs">등록된 일정이 없습니다.</div>
              )}
            </div>

            {/* 새 일정 입력 폼 */}
            <form onSubmit={handleAddPopupSchedule} className="pt-3 border-t border-neutral-200 shrink-0 space-y-3">
              <div className="text-xs font-bold text-neutral-800">새 일정 추가</div>
              <div>
                <input
                  type="text"
                  required
                  value={newSchedTitle}
                  onChange={(e) => setNewSchedTitle(e.target.value)}
                  placeholder="일정 제목을 입력하세요 (예: 치과, 모임 등)"
                  className="w-full border border-pink-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-pink-500 font-medium"
                />
              </div>
              <div>
                <div className="text-[11px] font-bold text-neutral-600 mb-1">심볼 선택</div>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1">
                  {Object.entries(SCHEDULE_SYMBOL_CONFIG).map(([key, val]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setNewSchedSymbol(key)}
                      className={`py-1.5 rounded-xl text-[11px] font-bold border flex flex-col items-center gap-0.5 transition ${
                        newSchedSymbol === key
                          ? "border-pink-500 bg-pink-50 text-pink-900 font-black shadow-2xs"
                          : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
                      }`}
                    >
                      <span className="text-sm">{val.icon}</span>
                      <span>{val.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-bold text-neutral-600 mb-1">파스텔 태그 색상</div>
                <div className="flex items-center gap-3 bg-neutral-50 p-2 rounded-xl border border-neutral-200">
                  {Object.entries(SCHEDULE_COLOR_CONFIG).map(([key, val]) => (
                    <label key={key} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="tagColor"
                        value={key}
                        checked={newSchedColor === key}
                        onChange={() => setNewSchedColor(key)}
                        className="hidden"
                      />
                      <span className={`w-6 h-6 rounded-full ${val.chip} border-2 flex items-center justify-center transition ${
                        newSchedColor === key ? "border-pink-600 scale-110 shadow-xs" : "border-transparent opacity-70"
                      }`}>
                        {newSchedColor === key && <Check className="w-3 h-3 text-pink-950 stroke-[3]" />}
                      </span>
                      <span className="text-[11px] font-semibold text-neutral-700">{val.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => { setModalDate(null); setPopupEditingId(null); }}
                  className="flex-1 py-2 rounded-xl border border-neutral-300 text-neutral-600 text-xs font-semibold hover:bg-neutral-50 transition"
                >
                  닫기 (ESC)
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold shadow-sm transition"
                >
                  일정 추가
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}