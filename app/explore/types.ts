/**
 * Type definitions for Gappy Explore feature
 * ギャップタイムの体験検索機能の型定義
 */

export type ActivityCategory =
  | "FOOD"
  | "CAFÉ"
  | "NIGHTLIFE"
  | "SHOPPING"
  | "CULTURE"
  | "VIEWPOINT"
  | "OTHER";

export type TimeOfDay = "MORNING" | "AFTERNOON" | "EVENING" | "NIGHT";

export type SortOption =
  | "BEST_MATCH"
  | "NEAREST"
  | "SHORTEST_DURATION"
  | "HIGHEST_RATING";

/**
 * ExploreActivity = マップ＋リストで表示するギャップタイム体験
 * Represents a single activity/thing-to-do that can be done during gap time
 */
export interface ExploreActivity {
  id: string;
  title: string;
  shortDescription: string;
  latitude: number;
  longitude: number;
  durationMinutes: number;
  category: ActivityCategory;
  distanceMeters?: number;
  rating?: number;
  popularityScore?: number;
  venueName?: string;
  areaName?: string;
}

/**
 * ExploreFilters = ユーザーの現在地とスキマ時間、カテゴリなどの検索条件
 * User's search criteria for finding activities
 */
export interface ExploreFilters {
  centerLat: number;
  centerLng: number;
  availableMinutes: number; // e.g. 30, 60, 90
  categories: ActivityCategory[]; // multi-select
  timeOfDay?: TimeOfDay;
  sortBy: SortOption;
}

/**
 * Category display metadata
 * カテゴリの表示メタデータ
 */
export interface CategoryMetadata {
  key: ActivityCategory;
  label: string;
  labelJa: string;
  color: string;
  emoji: string;
}

export const CATEGORY_METADATA: Record<ActivityCategory, CategoryMetadata> = {
  FOOD: {
    key: "FOOD",
    label: "Food",
    labelJa: "グルメ",
    color: "bg-orange-100 text-orange-700",
    emoji: "🍜"
  },
  CAFÉ: {
    key: "CAFÉ",
    label: "Café",
    labelJa: "カフェ",
    color: "bg-amber-100 text-amber-700",
    emoji: "☕"
  },
  NIGHTLIFE: {
    key: "NIGHTLIFE",
    label: "Nightlife",
    labelJa: "ナイトライフ",
    color: "bg-purple-100 text-purple-700",
    emoji: "🌃"
  },
  SHOPPING: {
    key: "SHOPPING",
    label: "Shopping",
    labelJa: "ショッピング",
    color: "bg-pink-100 text-pink-700",
    emoji: "🛍️"
  },
  CULTURE: {
    key: "CULTURE",
    label: "Culture",
    labelJa: "文化",
    color: "bg-blue-100 text-blue-700",
    emoji: "🏯"
  },
  VIEWPOINT: {
    key: "VIEWPOINT",
    label: "Viewpoint",
    labelJa: "絶景",
    color: "bg-green-100 text-green-700",
    emoji: "🌄"
  },
  OTHER: {
    key: "OTHER",
    label: "Other",
    labelJa: "その他",
    color: "bg-gray-100 text-gray-700",
    emoji: "📍"
  }
};

/**
 * Available time options (in minutes)
 * 利用可能時間のオプション（分）
 */
export const TIME_OPTIONS = [15, 30, 60, 90, 120] as const;

/**
 * Default filters for Shibuya
 * 渋谷のデフォルトフィルター
 */
export const DEFAULT_FILTERS: ExploreFilters = {
  centerLat: 35.6595,
  centerLng: 139.7005,
  availableMinutes: 60,
  categories: ["FOOD", "CAFÉ", "NIGHTLIFE", "SHOPPING", "CULTURE", "VIEWPOINT", "OTHER"],
  sortBy: "BEST_MATCH"
};
