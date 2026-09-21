// @ts-nocheck
/* eslint-disable */
"use client";

import React, { useState, useEffect } from "react";
import { Star, Plus, Trash2, ExternalLink } from "lucide-react";
import { supabase, getCloudData, saveCloudData } from "@/lib/supabase";

interface FavoritesTabProps {
  themeClasses: any;
}

interface FavoriteItem {
  id: string;
  title: string;
  url: string;
  category: string;
}

const defaultFavorites: FavoriteItem[] = [
  { id: "1", title: "네이버", url: "https://www.naver.com", category: "포털" },
  { id: "2", title: "유튜브", url: "https://www.youtube.com", category: "영상" },
  { id: "3", title: "구글", url: "https://www.google.com", category: "포털" },
  { id: "4", title: "치지직", url: "https://chzzk.naver.com", category: "스트리밍" },
  { id: "5", title: "SOOP", url: "https://www.sooplive.co.kr", category: "스트리밍" },
];

export default function FavoritesTab({ themeClasses }: FavoritesTabProps) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("일반");

  // 클라우드 동기화 로드 및 구독
  useEffect(() => {
    async function loadFavorites() {
      const saved = await getCloudData("jb_favorites_links_data", defaultFavorites);
      setFavorites(saved || defaultFavorites);
      setIsLoaded(true);
    }
    loadFavorites();

    const channel = supabase
      .channel("favorites_tab_sync")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "app_storage", filter: "key=eq.jb_favorites_links_data" },
        (payload) => {
          if (payload.new?.value) {
            setFavorites(payload.new.value);
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
      saveCloudData("jb_favorites_links_data", favorites);
    }
  }, [favorites, isLoaded]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    let validUrl = url.trim();
    if (!validUrl.startsWith("http://") && !validUrl.startsWith("https://")) {
      validUrl = "https://" + validUrl;
    }

    const newItem: FavoriteItem = {
      id: Date.now().toString(),
      title: title.trim(),
      url: validUrl,
      category: category.trim() || "일반",
    };

    setFavorites((prev) => [...prev, newItem]);
    setTitle("");
    setUrl("");
  };

  const handleDelete = (id: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className={`w-full h-full border-2 ${themeClasses.borderSolid} rounded-2xl p-5 ${themeClasses.bgLight} backdrop-blur-[2px] shadow-sm flex flex-col gap-4 overflow-hidden`}>
      {/* 헤더 및 등록 폼 */}
      <div className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b ${themeClasses.borderSubtle} pb-3 shrink-0`}>
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-purple-600 fill-purple-400" />
          <h2 className={`text-base font-bold ${themeClasses.textPrimary}`}>즐겨찾기 모음</h2>
        </div>

        <form onSubmit={handleAdd} className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="이름"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xs border border-neutral-300 rounded-lg px-2.5 py-1.5 w-24 bg-white focus:outline-none focus:border-purple-500"
          />
          <input
            type="text"
            placeholder="URL 주소 (https://...)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="text-xs border border-neutral-300 rounded-lg px-2.5 py-1.5 flex-1 md:w-56 bg-white focus:outline-none focus:border-purple-500"
          />
          <input
            type="text"
            placeholder="카테고리"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="text-xs border border-neutral-300 rounded-lg px-2.5 py-1.5 w-20 bg-white focus:outline-none focus:border-purple-500"
          />
          <button type="submit" className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${themeClasses.accentBtn}`}>
            <Plus className="w-3.5 h-3.5" />
            <span>추가</span>
          </button>
        </form>
      </div>

      {/* 즐겨찾기 카드 그리드 */}
      <div className="flex-1 overflow-y-auto pr-1 min-h-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="bg-white/80 rounded-xl border border-purple-200/80 p-3 shadow-xs hover:shadow-md transition flex flex-col justify-between gap-2 group"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                  {item.category}
                </span>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-neutral-300 hover:text-rose-500 transition p-0.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-bold text-neutral-900 truncate mb-0.5">{item.title}</h3>
                <p className="text-[11px] text-neutral-400 truncate">{item.url}</p>
              </div>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold flex items-center justify-center gap-1 transition"
              >
                <span>바로가기</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
        {favorites.length === 0 && (
          <div className="py-16 text-center text-xs text-neutral-400">
            등록된 즐겨찾기가 없습니다. 상단에서 추가해 보세요.
          </div>
        )}
      </div>
    </div>
  );
}