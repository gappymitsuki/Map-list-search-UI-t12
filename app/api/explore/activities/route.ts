import { NextRequest, NextResponse } from 'next/server';
import type { ExploreActivity, ExploreFilters, ActivityCategory } from '@/app/explore/types';

/**
 * Mock activities API route
 * モック体験データAPIルート
 *
 * TODO: 実際のレコメンドロジック(/api/gaptime/recommend)と接続する
 * TODO: データベースから実際のアクティビティを取得する
 */

// Mock activities data for Shibuya area
// 渋谷エリアのモックアクティビティデータ
const MOCK_ACTIVITIES: ExploreActivity[] = [
  {
    id: "act-001",
    title: "Ichiran Ramen Shibuya",
    shortDescription: "Famous tonkotsu ramen in private booth. Perfect for solo travelers.",
    latitude: 35.6612,
    longitude: 139.7006,
    durationMinutes: 45,
    category: "FOOD",
    rating: 4.5,
    popularityScore: 95,
    venueName: "一蘭 渋谷店",
    areaName: "Shibuya"
  },
  {
    id: "act-002",
    title: "Shibuya Sky Observation Deck",
    shortDescription: "360° panoramic views from 230m. Stunning sunset and night views.",
    latitude: 35.6585,
    longitude: 139.7034,
    durationMinutes: 60,
    category: "VIEWPOINT",
    rating: 4.8,
    popularityScore: 98,
    venueName: "渋谷スカイ",
    areaName: "Shibuya"
  },
  {
    id: "act-003",
    title: "Blue Bottle Coffee Shibuya",
    shortDescription: "Artisanal coffee in a minimalist space. Great for work or relaxation.",
    latitude: 35.6595,
    longitude: 139.6989,
    durationMinutes: 30,
    category: "CAFÉ",
    rating: 4.4,
    popularityScore: 87,
    venueName: "ブルーボトルコーヒー 渋谷カフェ",
    areaName: "Shibuya"
  },
  {
    id: "act-004",
    title: "Meiji Shrine",
    shortDescription: "Peaceful Shinto shrine in a forested area. Cultural experience near Harajuku.",
    latitude: 35.6764,
    longitude: 139.6993,
    durationMinutes: 45,
    category: "CULTURE",
    rating: 4.7,
    popularityScore: 92,
    venueName: "明治神宮",
    areaName: "Harajuku"
  },
  {
    id: "act-005",
    title: "Shibuya Scramble Square Shopping",
    shortDescription: "Modern shopping complex with fashion, cosmetics, and food. Rooftop view included.",
    latitude: 35.6580,
    longitude: 139.7026,
    durationMinutes: 90,
    category: "SHOPPING",
    rating: 4.3,
    popularityScore: 85,
    venueName: "渋谷スクランブルスクエア",
    areaName: "Shibuya"
  },
  {
    id: "act-006",
    title: "Nonbei Yokocho (Drunkard's Alley)",
    shortDescription: "Retro alley with tiny izakayas. Authentic Tokyo nightlife experience.",
    latitude: 35.6581,
    longitude: 139.7014,
    durationMinutes: 120,
    category: "NIGHTLIFE",
    rating: 4.6,
    popularityScore: 88,
    venueName: "のんべい横丁",
    areaName: "Shibuya"
  },
  {
    id: "act-007",
    title: "Tsutaya Books in Daikanyama",
    shortDescription: "Beautiful bookstore with cafe. Browse art and design books in a stylish space.",
    latitude: 35.6499,
    longitude: 139.7042,
    durationMinutes: 60,
    category: "CULTURE",
    rating: 4.5,
    popularityScore: 82,
    venueName: "蔦屋書店 代官山",
    areaName: "Daikanyama"
  },
  {
    id: "act-008",
    title: "Afuri Ramen Harajuku",
    shortDescription: "Light yuzu-flavored ramen. Healthy option with great atmosphere.",
    latitude: 35.6705,
    longitude: 139.7031,
    durationMinutes: 40,
    category: "FOOD",
    rating: 4.4,
    popularityScore: 86,
    venueName: "AFURI 原宿",
    areaName: "Harajuku"
  },
  {
    id: "act-009",
    title: "Tokyu Hands Shibuya",
    shortDescription: "7-floor variety store. Unique Japanese products, stationery, and souvenirs.",
    latitude: 35.6618,
    longitude: 139.6980,
    durationMinutes: 75,
    category: "SHOPPING",
    rating: 4.2,
    popularityScore: 79,
    venueName: "東急ハンズ 渋谷店",
    areaName: "Shibuya"
  },
  {
    id: "act-010",
    title: "Sound Museum Vision",
    shortDescription: "Multi-floor nightclub with international DJs. Best techno/house in Tokyo.",
    latitude: 35.6554,
    longitude: 139.6978,
    durationMinutes: 180,
    category: "NIGHTLIFE",
    rating: 4.5,
    popularityScore: 84,
    venueName: "ビジョン",
    areaName: "Dogenzaka"
  },
  {
    id: "act-011",
    title: "Streamer Coffee Company",
    shortDescription: "Award-winning latte art and specialty coffee. Cozy atmosphere.",
    latitude: 35.6571,
    longitude: 139.7018,
    durationMinutes: 35,
    category: "CAFÉ",
    rating: 4.6,
    popularityScore: 90,
    venueName: "ストリーマーコーヒーカンパニー 渋谷",
    areaName: "Shibuya"
  },
  {
    id: "act-012",
    title: "Yoyogi Park Stroll",
    shortDescription: "Spacious park perfect for picnics. Often has street performers and events.",
    latitude: 35.6719,
    longitude: 139.6960,
    durationMinutes: 60,
    category: "VIEWPOINT",
    rating: 4.4,
    popularityScore: 81,
    venueName: "代々木公園",
    areaName: "Yoyogi"
  },
  {
    id: "act-013",
    title: "Gyukatsu Motomura",
    shortDescription: "Deep-fried beef cutlet - a unique Tokyo specialty. Cook to your liking on hot stone.",
    latitude: 35.6598,
    longitude: 139.7012,
    durationMinutes: 50,
    category: "FOOD",
    rating: 4.7,
    popularityScore: 93,
    venueName: "牛かつもと村 渋谷店",
    areaName: "Shibuya"
  },
  {
    id: "act-014",
    title: "Cat Street Shopping",
    shortDescription: "Trendy pedestrian street with boutiques and cafes. Hidden fashion gems.",
    latitude: 35.6673,
    longitude: 139.7067,
    durationMinutes: 90,
    category: "SHOPPING",
    rating: 4.3,
    popularityScore: 80,
    venueName: "キャットストリート",
    areaName: "Harajuku/Omotesando"
  },
  {
    id: "act-015",
    title: "Nezu Museum",
    shortDescription: "Traditional Japanese art in a serene garden setting. Bamboo grove and tea house.",
    latitude: 35.6650,
    longitude: 139.7195,
    durationMinutes: 75,
    category: "CULTURE",
    rating: 4.6,
    popularityScore: 77,
    venueName: "根津美術館",
    areaName: "Omotesando"
  }
];

/**
 * Calculate distance between two coordinates using Haversine formula
 * 2つの座標間の距離を計算（Haversine公式）
 */
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

/**
 * Filter and sort activities based on user criteria
 * ユーザーの検索条件に基づいてアクティビティをフィルタリング・ソート
 */
function filterAndSortActivities(
  activities: ExploreActivity[],
  filters: ExploreFilters
): ExploreActivity[] {
  // 1. Filter by duration (must fit in available time)
  let filtered = activities.filter(
    (activity) => activity.durationMinutes <= filters.availableMinutes
  );

  // 2. Filter by categories
  if (filters.categories.length > 0) {
    filtered = filtered.filter((activity) =>
      filters.categories.includes(activity.category)
    );
  }

  // 3. Calculate distance for each activity
  const withDistance = filtered.map((activity) => ({
    ...activity,
    distanceMeters: calculateDistance(
      filters.centerLat,
      filters.centerLng,
      activity.latitude,
      activity.longitude
    )
  }));

  // 4. Sort based on sortBy option
  const sorted = [...withDistance].sort((a, b) => {
    switch (filters.sortBy) {
      case "NEAREST":
        return (a.distanceMeters || 0) - (b.distanceMeters || 0);

      case "SHORTEST_DURATION":
        return a.durationMinutes - b.durationMinutes;

      case "HIGHEST_RATING":
        return (b.rating || 0) - (a.rating || 0);

      case "BEST_MATCH":
      default:
        // Best match combines distance, rating, and popularity
        const scoreA = (a.popularityScore || 0) + (a.rating || 0) * 10 - (a.distanceMeters || 0) / 100;
        const scoreB = (b.popularityScore || 0) + (b.rating || 0) * 10 - (b.distanceMeters || 0) / 100;
        return scoreB - scoreA;
    }
  });

  return sorted;
}

/**
 * GET handler for activities API
 * Accept filters via query parameters or use defaults
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse filters from query parameters
    const filters: ExploreFilters = {
      centerLat: parseFloat(searchParams.get('centerLat') || '35.6595'),
      centerLng: parseFloat(searchParams.get('centerLng') || '139.7005'),
      availableMinutes: parseInt(searchParams.get('availableMinutes') || '60'),
      categories: (searchParams.get('categories')?.split(',') as ActivityCategory[]) || [
        "FOOD", "CAFÉ", "NIGHTLIFE", "SHOPPING", "CULTURE", "VIEWPOINT", "OTHER"
      ],
      timeOfDay: searchParams.get('timeOfDay') as any,
      sortBy: (searchParams.get('sortBy') as any) || 'BEST_MATCH'
    };

    // Filter and sort activities
    const results = filterAndSortActivities(MOCK_ACTIVITIES, filters);

    // Return results
    return NextResponse.json({
      success: true,
      filters,
      count: results.length,
      activities: results
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}

/**
 * POST handler for activities API
 * Accept filters in request body
 */
export async function POST(request: NextRequest) {
  try {
    const filters: ExploreFilters = await request.json();

    // Validate filters
    if (!filters.centerLat || !filters.centerLng) {
      return NextResponse.json(
        { success: false, error: 'Invalid filters: centerLat and centerLng are required' },
        { status: 400 }
      );
    }

    // Filter and sort activities
    const results = filterAndSortActivities(MOCK_ACTIVITIES, filters);

    // Return results
    return NextResponse.json({
      success: true,
      filters,
      count: results.length,
      activities: results
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}
