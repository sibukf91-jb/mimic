// @ts-nocheck
/* eslint-disable */
"use client";

import React, { useState, useEffect } from "react";
import { Bookmark, Plus, Trash2, ExternalLink } from "lucide-react";
import { supabase, getCloudData, saveCloudData } from "@/lib/supabase";

interface BookmarksTabProps {
  themeClasses: any;
}

interface BookmarkItem {
  id: string;
  title: string;
  desc: string;
  link: string;
  createdAt: string;
}

export default function BookmarksTab({ themeClasses }: BookmarksTabProps) {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");

  // 클라우드 동기화 로드 및 구독
  useEffect(() => {
    async function loadBookmarks() {
      const saved = await getCloudData("jb_reading_bookmarks_data", []);
      setBookmarks(saved || []);
      setIsLoaded(true);
    }
    loadBookmarks();

    const channel = supabase
      .channel("bookmarks_tab_sync")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "app_storage", filter: "key=eq.jb_reading_bookmarks_data" },
        (payload) => {
          if (payload.new?.value) {
            setBookmarks(payload.new.value);
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
      saveCloudData("jb_reading_bookmarks_data", bookmarks);
    }
  }, [bookmarks, isLoaded]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    let validLink = link.trim();
    if (validLink && !validLink.startsWith("http://") && !validLink.startsWith("https://")) {
      validLink = "https://" + validLink;
    }

    const newItem: BookmarkItem = {
      id: Date.now().toString(),
      title: title.trim(),
      desc: desc.trim(),
      link: validLink,
      createdAt: new Date().toLocaleDateString("ko-KR"),
    };

    setBookmarks((prev) => [newItem, ...prev]);
    setTitle("");
    setDesc("");
    setLink("");
  };

  const handleDelete = (id: string) => {
    setBookmarks((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className={`w-full h-full border-2 ${themeClasses.borderSolid} rounded-2xl p-5 ${themeClasses.bgLight} backdrop-blur-[2px] shadow-sm flex flex-col gap-4 overflow-hidden`}>
      {/* 헤더 */}
      <div className={`flex items-center justify-between border-b ${themeClasses.borderSubtle} pb-3 shrink-0`}>
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-amber-500 fill-amber-300" />
          <h2 className={`text-base font-bold ${themeClasses.textPrimary}`}>책갈피 및 메모 아카이브</h2>
        </div>
      </div>

      {/* 등록 입력 창 */}
      <form onSubmit={handleAdd} className="bg-white/80 rounded-xl border border-amber-200 p-3 shrink-0 flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="책갈피 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 text-xs border border-neutral-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
          />
          <input
            type="text"
            placeholder="링크 URL (선택사항)"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="flex-1 text-xs border border-neutral-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
          />
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="상세 내용 및 핵심 요약 메모"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="flex-1 text-xs border border-neutral-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
          />
          <button type="submit" className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${themeClasses.accentBtn}`}>
            <Plus className="w-3.5 h-3.5" />
            <span>등록</span>
          </button>
        </div>
      </form>

      {/* 책갈피 카드 리스트 */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 min-h-0">
        {bookmarks.map((b) => (
          <div key={b.id} className="bg-white/80 rounded-xl border border-amber-200/80 p-3.5 shadow-xs flex flex-col gap-1.5 hover:shadow-sm transition">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-amber-600 font-bold text-xs">🔖</span>
                <h3 className="text-xs font-bold text-neutral-900 truncate">{b.title}</h3>
                <span className="text-[10px] text-neutral-400 shrink-0 font-mono">{b.createdAt}</span>
              </div>
              <button onClick={() => handleDelete(b.id)} className="text-neutral-300 hover:text-rose-500 transition">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {b.desc && <p className="text-xs text-neutral-600 whitespace-pre-wrap">{b.desc}</p>}

            {b.link && (
              <div className="pt-1">
                <a
                  href={b.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-amber-700 hover:underline font-medium"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span className="truncate">{b.link}</span>
                </a>
              </div>
            )}
          </div>
        ))}
        {bookmarks.length === 0 && (
          <div className="py-16 text-center text-xs text-neutral-400">
            등록된 책갈피가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}