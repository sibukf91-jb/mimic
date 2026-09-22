// @ts-nocheck
/* eslint-disable */
"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash2, Calendar, CheckSquare, Clock } from "lucide-react";
import { supabase, getCloudData, saveCloudData } from "@/lib/supabase";

interface ScheduleTabProps {
  themeClasses: any;
}

interface EventItem {
  id: string;
  date: string;
  title: string;
  type: "normal" | "dday";
}

interface TodoItem {
  id: string;
  text: string;
  done: boolean;
}

export default function ScheduleTab({ themeClasses }: ScheduleTabProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const [events, setEvents] = useState<EventItem[]>([]);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventType, setNewEventType] = useState<"normal" | "dday">("normal");
  const [newTodoText, setNewTodoText] = useState("");

  // 클라우드 데이터 로드 및 실시간 구독
  useEffect(() => {
    async function loadData() {
      const savedEvents = await getCloudData("jb_schedule_events_data", []);
      const savedTodos = await getCloudData("jb_schedule_todos_data", []);
      setEvents(savedEvents || []);
      setTodos(savedTodos || []);
      setIsLoaded(true);
    }
    loadData();

    const channel = supabase
      .channel("schedule_tab_sync")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "app_storage" },
        (payload) => {
          if (payload.new?.key === "jb_schedule_events_data") {
            setEvents(payload.new.value || []);
          }
          if (payload.new?.key === "jb_schedule_todos_data") {
            setTodos(payload.new.value || []);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // 상태 변경 시 클라우드 저장
  useEffect(() => {
    if (isLoaded) {
      saveCloudData("jb_schedule_events_data", events);
    }
  }, [events, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      saveCloudData("jb_schedule_todos_data", todos);
    }
  }, [todos, isLoaded]);

  // 달력 계산
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayIndex = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const prevMonthLastDate = new Date(year, month, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;
    const newItem: EventItem = {
      id: Date.now().toString(),
      date: selectedDateStr,
      title: newEventTitle.trim(),
      type: newEventType,
    };
    setEvents((prev) => [...prev, newItem]);
    setNewEventTitle("");
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;
    const newItem: TodoItem = {
      id: Date.now().toString(),
      text: newTodoText.trim(),
      done: false,
    };
    setTodos((prev) => [...prev, newItem]);
    setNewTodoText("");
  };

  const handleToggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const selectedDayEvents = events.filter((e) => e.date === selectedDateStr);

  const ddayList = events
    .filter((e) => e.type === "dday")
    .map((e) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const target = new Date(e.date);
      target.setHours(0, 0, 0, 0);
      const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return { ...e, diff };
    })
    .sort((a, b) => a.diff - b.diff);

  return (
    <div className={`w-full h-full border-2 ${themeClasses.borderSolid} rounded-2xl p-5 ${themeClasses.bgLight} backdrop-blur-[2px] shadow-sm flex flex-col gap-4 overflow-hidden`}>
      <div className={`flex items-center justify-between border-b ${themeClasses.borderSubtle} pb-3 shrink-0`}>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-pink-500" />
          <h2 className={`text-base font-bold ${themeClasses.textPrimary}`}>일정 및 캘린더 관리</h2>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={prevMonth} className={`p-1.5 rounded-lg border ${themeClasses.borderSubtle} hover:bg-white/80`}>
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className={`text-sm font-bold ${themeClasses.textPrimary}`}>
            {year}년 {month + 1}월
          </span>
          <button onClick={nextMonth} className={`p-1.5 rounded-lg border ${themeClasses.borderSubtle} hover:bg-white/80`}>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0 overflow-hidden">
        <div className="lg:col-span-7 bg-white/80 rounded-xl border border-pink-200/80 p-3 flex flex-col overflow-hidden">
          <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs text-neutral-500 mb-2">
            <span className="text-red-500">일</span>
            <span>월</span>
            <span>화</span>
            <span>수</span>
            <span>목</span>
            <span>금</span>
            <span className="text-blue-500">토</span>
          </div>

          <div className="grid grid-cols-7 gap-1 flex-1 min-h-0">
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`prev-${i}`} className="p-1 rounded-lg text-neutral-300 text-xs text-center select-none">
                {prevMonthLastDate - firstDayIndex + i + 1}
              </div>
            ))}

            {Array.from({ length: lastDate }).map((_, i) => {
              const day = i + 1;
              const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const isSelected = selectedDateStr === dateString;
              const hasEvents = events.some((e) => e.date === dateString);

              return (
                <div
                  key={`cur-${day}`}
                  onClick={() => setSelectedDateStr(dateString)}
                  className={`p-1 rounded-lg text-xs flex flex-col items-center justify-between cursor-pointer border transition ${
                    isSelected
                      ? "border-pink-500 bg-pink-100 font-bold text-pink-900 shadow-sm"
                      : "border-transparent hover:bg-neutral-100 text-neutral-800"
                  }`}
                >
                  <span>{day}</span>
                  {hasEvents && <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mb-1" />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-3 min-h-0 overflow-hidden">
          <div className="bg-white/80 rounded-xl border border-pink-200/80 p-3 flex flex-col shrink-0">
            <div className="text-xs font-bold text-pink-900 mb-2 flex items-center justify-between">
              <span>📌 {selectedDateStr} 일정</span>
              <span className="text-[10px] text-neutral-500">{selectedDayEvents.length}개</span>
            </div>

            <form onSubmit={handleAddEvent} className="flex gap-1.5 mb-2">
              <select
                value={newEventType}
                onChange={(e: any) => setNewEventType(e.target.value)}
                className="text-xs border border-neutral-300 rounded-lg px-2 py-1 bg-white focus:outline-none focus:border-pink-400"
              >
                <option value="normal">일반</option>
                <option value="dday">D-Day</option>
              </select>
              <input
                type="text"
                placeholder="일정 입력"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                className="flex-1 text-xs border border-neutral-300 rounded-lg px-2 py-1 focus:outline-none focus:border-pink-400"
              />
              <button type="submit" className={`p-1.5 rounded-lg ${themeClasses.accentBtn}`}>
                <Plus className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="max-h-[100px] overflow-y-auto space-y-1">
              {selectedDayEvents.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs p-1.5 bg-pink-50/50 rounded-md border border-pink-100">
                  <div className="flex items-center gap-1.5 truncate">
                    {item.type === "dday" && <span className="px-1 py-0.2 bg-pink-500 text-white rounded text-[9px] font-bold">D-Day</span>}
                    <span className="truncate">{item.title}</span>
                  </div>
                  <button onClick={() => handleDeleteEvent(item.id)} className="text-neutral-400 hover:text-red-500">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {selectedDayEvents.length === 0 && (
                <p className="text-[11px] text-neutral-400 py-1 text-center">등록된 일정이 없습니다.</p>
              )}
            </div>
          </div>

          <div className="bg-white/80 rounded-xl border border-pink-200/80 p-3 flex flex-col shrink-0">
            <div className="text-xs font-bold text-pink-900 mb-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-pink-500" />
              <span>D-Day 목록</span>
            </div>
            <div className="max-h-[80px] overflow-y-auto space-y-1">
              {ddayList.map((d) => (
                <div key={d.id} className="flex items-center justify-between text-xs p-1 bg-neutral-50 rounded border border-neutral-100">
                  <span className="truncate">{d.title}</span>
                  <span className={`text-[11px] font-bold px-1.5 rounded ${d.diff < 0 ? "bg-neutral-200 text-neutral-600" : d.diff === 0 ? "bg-red-500 text-white" : "bg-pink-100 text-pink-700"}`}>
                    {d.diff < 0 ? `D+${Math.abs(d.diff)}` : d.diff === 0 ? "D-Day" : `D-${d.diff}`}
                  </span>
                </div>
              ))}
              {ddayList.length === 0 && (
                <p className="text-[11px] text-neutral-400 text-center py-1">설정된 D-Day가 없습니다.</p>
              )}
            </div>
          </div>

          <div className="bg-white/80 rounded-xl border border-pink-200/80 p-3 flex-1 flex flex-col min-h-0">
            <div className="text-xs font-bold text-pink-900 mb-1.5 flex items-center gap-1">
              <CheckSquare className="w-3.5 h-3.5 text-pink-500" />
              <span>할 일 목록 (To-Do)</span>
            </div>

            <form onSubmit={handleAddTodo} className="flex gap-1.5 mb-2">
              <input
                type="text"
                placeholder="할 일 추가"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                className="flex-1 text-xs border border-neutral-300 rounded-lg px-2 py-1 focus:outline-none focus:border-pink-400"
              />
              <button type="submit" className={`p-1.5 rounded-lg ${themeClasses.accentBtn}`}>
                <Plus className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="flex-1 overflow-y-auto space-y-1 pr-1">
              {todos.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs p-1.5 rounded bg-neutral-50 border border-neutral-200/60 hover:bg-neutral-100/80">
                  <label className="flex items-center gap-2 cursor-pointer flex-1 min-w-0">
                    <input
                      type="checkbox"
                      checked={item.done}
                      onChange={() => handleToggleTodo(item.id)}
                      className="rounded text-pink-500 focus:ring-pink-400 cursor-pointer"
                    />
                    <span className={`truncate ${item.done ? "line-through text-neutral-400" : "text-neutral-800"}`}>
                      {item.text}
                    </span>
                  </label>
                  <button onClick={() => handleDeleteTodo(item.id)} className="text-neutral-400 hover:text-red-500 ml-1">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {todos.length === 0 && (
                <p className="text-[11px] text-neutral-400 text-center py-4">할 일이 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}