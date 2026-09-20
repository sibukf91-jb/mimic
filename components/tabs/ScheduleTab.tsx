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
  // 기준 날짜를 21일로 설정
  const TODAY_STR = "2026-09-21";

  const [currentDate, setCurrentDate] = useState(new Date("2026-09-21"));
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

  // 기본 선택 날짜도 21일로 지정
  const [selectedDateStr, setSelectedDateStr] = useState<string>("2026-09-21");
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
  const handleToday = () => {
    setCurrentDate(new Date("2026-09-21"));
    setSelectedDateStr("2026-09-21");
  };

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

  const selectedDaySchedules = schedules[selectedDateStr] || [];

  return (
    <div className="h-full flex flex-col gap-2.5 pr-1 overflow-y-auto">
      {/* 캘린더 네비게이션 헤더 */}
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
      <div className="border-2 border-pink-400/80 rounded-2xl p-3 bg-white/90 shadow-sm flex flex-col shrink-0">
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

            const daySchedules = schedules[dateStr] || [];

            return (
              <div
                key={dateStr}
                onClick={() => setSelectedDateStr(dateStr)}
                className={`flex flex-col p-1.5 rounded-xl border transition-all cursor-pointer h-16 relative ${
                  isToday
                    ? "border-amber-400 bg-amber-50/70 ring-2 ring-amber-300 shadow-sm"
                    : isSelected
                    ? "border-pink-500 bg-pink-50/80 ring-1 ring-pink-400"
                    : "border-pink-100/90 hover:border-pink-300 hover:bg-pink-50/20 bg-white"
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

                <div className="flex flex-col gap-0.5 mt-1 overflow-hidden">
                  {daySchedules.slice(0, 2).map((item: any) => (
                    <div
                      key={item.id}
                      className="text-[9px] bg-pink-100/90 border border-pink-200 text-pink-950 px-1 py-0.2 rounded font-bold truncate flex items-center gap-0.5"
                    >
                      <span>{item.icon}</span>
                      <span className="truncate">{item.title}</span>
                    </div>
                  ))}
                  {daySchedules.length > 2 && (
                    <span className="text-[8px] text-pink-600 font-bold leading-none">
                      +{daySchedules.length - 2}개
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 복구된 하단 일정 요약창 & 등록 창 */}
      <div className="border-2 border-pink-400/80 rounded-2xl p-3.5 bg-pink-50/40 backdrop-blur-[2px] shadow-sm flex flex-col gap-2.5 flex-1 min-h-[190px]">
        <div className="flex items-center justify-between border-b border-pink-200/80 pb-2">
          <span className="text-xs font-extrabold text-pink-950 flex items-center gap-1.5">
            <span>📅</span>
            <span>{selectedDateStr} 일정 요약</span>
            <span className="text-[10px] font-bold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">
              총 {selectedDaySchedules.length}건
            </span>
          </span>

          {/* 인라인 등록 폼 */}
          <form onSubmit={handleAddSchedule} className="flex items-center gap-1.5">
            <select
              value={newIcon}
              onChange={(e) => setNewIcon(e.target.value)}
              className="border border-pink-300 bg-white rounded-lg px-1 py-1 text-xs font-medium cursor-pointer"
            >
              {iconOptions.map((icon) => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="일정 입력 (예: 휴가, 미팅)"
              className="w-48 border border-pink-300 bg-white rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-pink-500 font-bold"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs rounded-lg shadow-2xs flex items-center gap-1 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" /> 추가
            </button>
          </form>
        </div>

        {/* 선택한 날짜의 일정 목록 */}
        <div className="flex flex-wrap gap-2 overflow-y-auto max-h-[120px] pt-0.5">
          {selectedDaySchedules.map((item: any) => (
            <div
              key={item.id}
              className="flex items-center gap-1.5 bg-white border border-pink-300 px-2.5 py-1.5 rounded-xl shadow-2xs text-xs font-bold text-pink-950"
            >
              <span>{item.icon}</span>
              <span>{item.title}</span>
              <button
                onClick={(e) => handleDeleteSchedule(selectedDateStr, item.id, e)}
                className="text-neutral-400 hover:text-rose-600 ml-1 p-0.5 transition"
                title="일정 삭제"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          {selectedDaySchedules.length === 0 && (
            <div className="w-full text-center py-5 text-xs font-medium text-pink-800/60">
              선택한 날짜에 등록된 일정이 없습니다. 일정을 추가해보세요!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}