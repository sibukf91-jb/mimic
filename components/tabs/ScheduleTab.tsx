// @ts-nocheck
/* eslint-disable */
"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  X
} from "lucide-react";

interface ScheduleTabProps {
  themeClasses?: any;
}

export default function ScheduleTab({ themeClasses }: ScheduleTabProps) {
  // 실시간 오늘 날짜 자동 반영 (자정 지나면 자동 변경)
  const getTodayStr = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  const TODAY_STR = useMemo(() => getTodayStr(), [currentDate]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const [schedules, setSchedules] = useState<any>({
    "2026-09-07": [{ id: 1, title: "휴가1", icon: "🌴" }],
    "2026-09-08": [{ id: 2, title: "휴가2", icon: "🌴" }],
    "2026-09-09": [{ id: 3, title: "휴가3", icon: "🌴" }],
    "2026-09-16": [
      { id: 4, title: "오후반차", icon: "🌓" },
      { id: 5, title: "위어스헤어", icon: "🎀" }
    ]
  });
  const [isScheduleLoaded, setIsScheduleLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jb_bookmark_schedules_v2");
      if (saved) {
        setSchedules(JSON.parse(saved));
      }
      setIsScheduleLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isScheduleLoaded && typeof window !== "undefined") {
      localStorage.setItem("jb_bookmark_schedules_v2", JSON.stringify(schedules));
    }
  }, [schedules, isScheduleLoaded]);

  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newIcon, setNewIcon] = useState("📌");

  const iconOptions = ["📌", "🌴", "🌓", "🎀", "⭐", "🎉", "💼", "✈️", "🏥", "💡"];

  const holidays: Record<string, string> = {
    "2026-09-24": "추석 연휴",
    "2026-09-25": "추석",
    "2026-09-26": "추석 연휴",
    "2026-10-03": "개천절",
    "2026-10-09": "한글날",
    "2026-12-25": "성탄절"
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
  const handleToday = () => setCurrentDate(new Date());

  const handleAddSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDateStr || !newTitle.trim()) return;

    const newEntry = {
      id: Date.now(),
      title: newTitle.trim(),
      icon: newIcon
    };

    setSchedules((prev: any) => ({
      ...prev,
      [selectedDateStr]: [...(prev[selectedDateStr] || []), newEntry]
    }));

    setNewTitle("");
  };

  const handleDeleteSchedule = (dateStr: string, id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSchedules((prev: any) => ({
      ...prev,
      [dateStr]: (prev[dateStr] || []).filter((item: any) => item.id !== id)
    }));
  };

  return (
    <div className="h-full flex flex-col gap-2.5 pr-1 overflow-y-auto">
      {/* 캘린더 네비게이션 */}
      <div className="border-2 border-pink-400/80 rounded-2xl p-3 bg-pink-50/40 backdrop-blur-[2px] shadow-sm flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-pink-600" />
          <span className="text-base font-extrabold text-pink-950">
            {year}년 {month + 1}월
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleToday}
            className="px-2.5 py-1 text-xs font-bold border border-pink-300 bg-white/80 rounded-lg hover:bg-pink-100 text-pink-900 transition"
          >
            오늘
          </button>
          <button
            onClick={handlePrevMonth}
            className="p-1 rounded-lg border border-pink-300 bg-white/80 hover:bg-pink-100 text-pink-900 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-1 rounded-lg border border-pink-300 bg-white/80 hover:bg-pink-100 text-pink-900 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 달력 본체 */}
      <div className="border-2 border-pink-400/80 rounded-2xl p-3 bg-white/90 shadow-sm flex flex-col flex-1 min-h-[620px]">
        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 gap-1.5 text-center font-extrabold text-xs py-1.5 mb-1">
          <span className="text-red-500">일</span>
          <span className="text-neutral-700">월</span>
          <span className="text-neutral-700">화</span>
          <span className="text-neutral-700">수</span>
          <span className="text-neutral-700">목</span>
          <span className="text-neutral-700">금</span>
          <span className="text-blue-500">토</span>
        </div>

        {/* 날짜 그리드 */}
        <div className="grid grid-cols-7 gap-1.5 flex-1">
          {calendarDays.map((day, idx) => {
            if (day === null) {
              return <div key={`empty-${idx}`} className="rounded-xl bg-transparent" />;
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
            const isHoliday = Boolean(holidayName);

            const daySchedules = schedules[dateStr] || [];

            return (
              <div
                key={dateStr}
                onClick={() => setSelectedDateStr(dateStr)}
                className={`flex flex-col p-1.5 rounded-xl border transition-all cursor-pointer min-h-[95px] relative ${
                  isToday
                    ? "border-amber-400 bg-amber-50/60 ring-2 ring-amber-300 shadow-sm"
                    : isSelected
                    ? "border-pink-500 bg-pink-50/80 ring-1 ring-pink-400"
                    : "border-pink-100/90 hover:border-pink-300 hover:bg-pink-50/20 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold leading-none ${
                      isSunday || isHoliday
                        ? "text-red-500"
                        : isSaturday
                        ? "text-blue-500"
                        : "text-neutral-800"
                    }`}
                  >
                    {day}
                  </span>
                  {holidayName && (
                    <span className="text-[9px] text-red-500 font-medium truncate max-w-[65px]">
                      {holidayName}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1 mt-1.5 overflow-y-auto max-h-[70px]">
                  {daySchedules.map((item: any) => (
                    <div
                      key={item.id}
                      className="group flex items-center justify-between text-[10px] bg-pink-100/90 border border-pink-200 text-pink-950 px-1.5 py-0.5 rounded-md font-bold shadow-2xs"
                    >
                      <span className="truncate flex items-center gap-0.5">
                        <span>{item.icon}</span>
                        <span>{item.title}</span>
                      </span>
                      <button
                        onClick={(e) => handleDeleteSchedule(dateStr, item.id, e)}
                        className="opacity-0 group-hover:opacity-100 hover:text-rose-600 transition ml-0.5"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 일정 등록 모달/팝업 */}
      {selectedDateStr && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedDateStr(null)}
        >
          <div
            className="bg-white rounded-2xl p-5 border-2 border-pink-400 shadow-xl max-w-sm w-full animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-pink-100 pb-2 mb-3">
              <span className="text-sm font-extrabold text-pink-950">
                📅 {selectedDateStr} 일정 추가
              </span>
              <button
                onClick={() => setSelectedDateStr(null)}
                className="p-1 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSchedule} className="flex flex-col gap-3">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-semibold text-neutral-600 mr-1">아이콘:</span>
                {iconOptions.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setNewIcon(icon)}
                    className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center border transition ${
                      newIcon === icon
                        ? "border-pink-500 bg-pink-100 shadow-2xs"
                        : "border-neutral-200 hover:bg-neutral-50"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>

              <input
                type="text"
                autoFocus
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="일정 제목 (예: 오후반차, 휴가 등)"
                className="border border-pink-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-pink-500 font-bold"
              />

              <div className="flex items-center justify-end gap-1.5 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedDateStr(null)}
                  className="px-3 py-1.5 rounded-xl border border-neutral-300 text-xs font-medium hover:bg-neutral-50"
                >
                  닫기
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs shadow-xs"
                >
                  등록
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}