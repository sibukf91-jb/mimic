// @ts-nocheck
/* eslint-disable */
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nqkltbgnockqctirgsmc.supabase.co";
const supabaseAnonKey = "sb_publishable_YsBmgxxiwbn7Ty5o4M6OpQ_sO5VAONN";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * 클라우드 DB와 로컬 캐시를 양방향 동기화하는 헬퍼 함수
 */
export async function getCloudData(key: string, fallbackData: any) {
  try {
    const { data, error } = await supabase
      .from("app_storage")
      .select("value")
      .eq("key", key)
      .maybeSingle();

    if (error || !data) {
      // 클라우드에 아직 데이터가 없으면 기존 로컬스토리지 값 확인
      if (typeof window !== "undefined") {
        const local = localStorage.getItem(key);
        if (local) {
          const parsed = JSON.parse(local);
          await saveCloudData(key, parsed);
          return parsed;
        }
      }
      return fallbackData;
    }
    return data.value;
  } catch (err) {
    console.error("Supabase load error:", err);
    if (typeof window !== "undefined") {
      const local = localStorage.getItem(key);
      if (local) return JSON.parse(local);
    }
    return fallbackData;
  }
}

export async function saveCloudData(key: string, value: any) {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
    await supabase.from("app_storage").upsert({
      key,
      value,
      updated_at: new Date().toISOString()
    });
  } catch (err) {
    console.error("Supabase save error:", err);
  }
}