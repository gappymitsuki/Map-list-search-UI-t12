"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { ExploreActivity, ExploreFilters } from './types';
import { DEFAULT_FILTERS } from './types';
import { fetchExploreActivities } from './lib/fetchActivities';
import FiltersBar from './_components/FiltersBar';
import ActivityList from './_components/ActivityList';
import LayoutSwitcher, { type ViewMode } from './_components/LayoutSwitcher';

/**
 * Main Explore Page
 * ギャップタイムの体験をマップ＋リストで表示するUI
 *
 * This is the core "explore" experience for travelers:
 * - Map + list interface showing gap-time activities
 * - Filters by time, category, and preferences
 * - Synchronized selection between map and list
 */

// Dynamically import ExploreMap to avoid SSR issues with Leaflet
const ExploreMap = dynamic(() => import('./_components/ExploreMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      <div className="text-gray-500">Loading map...</div>
    </div>
  ),
});

export default function ExplorePage() {
  // State management
  // 状態管理
  const [filters, setFilters] = useState<ExploreFilters>(DEFAULT_FILTERS);
  const [activities, setActivities] = useState<ExploreActivity[]>([]);
  const [selectedActivityId, setSelectedActivityId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<ViewMode>('list');

  // Fetch activities when filters change
  // フィルターが変更されたときにアクティビティを取得
  useEffect(() => {
    const loadActivities = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const results = await fetchExploreActivities(filters);
        setActivities(results);

        // Clear selection if selected activity is no longer in results
        if (selectedActivityId && !results.find(a => a.id === selectedActivityId)) {
          setSelectedActivityId(undefined);
        }
      } catch (err) {
        console.error('Failed to load activities:', err);
        setError('Failed to load activities. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadActivities();
  }, [filters]); // Only re-fetch when filters change

  // Handle filter changes
  const handleFiltersChange = (newFilters: ExploreFilters) => {
    setFilters(newFilters);
  };

  // Handle activity selection
  // マップとリストの選択を同期
  const handleSelectActivity = (activityId: string) => {
    setSelectedActivityId(activityId);

    // On mobile, switch to list view when a marker is selected
    // モバイルでマーカーが選択されたらリスト表示に切り替え
    if (window.innerWidth < 768 && mobileView === 'map') {
      setMobileView('list');
    }
  };

  // Handle activity hover (for future enhancement)
  const handleHoverActivity = (activityId: string | null) => {
    // TODO: Implement hover highlighting on map
    // TODO: マップ上のホバーハイライトを実装
  };

  // Handle retry on error
  const handleRetry = () => {
    setError(null);
    setFilters({ ...filters }); // Trigger re-fetch
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Filters Bar */}
      <FiltersBar
        filters={filters}
        onFiltersChange={handleFiltersChange}
        resultsCount={activities.length}
        isLoading={isLoading}
      />

      {/* Mobile view switcher - only visible on mobile */}
      <div className="md:hidden px-4 py-3 bg-white border-b border-gray-200">
        <LayoutSwitcher
          currentView={mobileView}
          onViewChange={setMobileView}
        />
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-red-600">⚠️</span>
              <p className="text-sm text-red-700">{error}</p>
            </div>
            <button
              onClick={handleRetry}
              className="px-3 py-1 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Main content area - Map + List */}
      {/* メインコンテンツエリア - マップ＋リスト */}
      <div className="flex-1 overflow-hidden">
        {/* Desktop layout: side-by-side */}
        {/* デスクトップレイアウト: 横並び */}
        <div className="hidden md:flex h-full">
          {/* List panel - left side */}
          <div className="w-1/2 border-r border-gray-200 bg-gray-50">
            <ActivityList
              activities={activities}
              selectedActivityId={selectedActivityId}
              onSelect={handleSelectActivity}
              onHover={handleHoverActivity}
              isLoading={isLoading}
            />
          </div>

          {/* Map panel - right side */}
          <div className="w-1/2">
            <ExploreMap
              centerLat={filters.centerLat}
              centerLng={filters.centerLng}
              activities={activities}
              selectedActivityId={selectedActivityId}
              onSelectActivity={handleSelectActivity}
            />
          </div>
        </div>

        {/* Mobile layout: toggle between map and list */}
        {/* モバイルレイアウト: マップとリストを切り替え */}
        <div className="md:hidden h-full">
          {mobileView === 'list' ? (
            <div className="h-full bg-gray-50">
              <ActivityList
                activities={activities}
                selectedActivityId={selectedActivityId}
                onSelect={handleSelectActivity}
                onHover={handleHoverActivity}
                isLoading={isLoading}
              />
            </div>
          ) : (
            <div className="h-full">
              <ExploreMap
                centerLat={filters.centerLat}
                centerLng={filters.centerLng}
                activities={activities}
                selectedActivityId={selectedActivityId}
                onSelectActivity={handleSelectActivity}
              />
            </div>
          )}
        </div>
      </div>

      {/* TODO: Add bottom sheet for mobile when activity is selected */}
      {/* TODO: モバイル用のボトムシートを追加（アクティビティ選択時） */}

      {/* TODO: Integrate with TravelPreferences for personalized ranking */}
      {/* TODO: TravelPreferencesと統合してパーソナライズされたランキングを実装 */}

      {/* TODO: Add "Save to plan" or "Start gap-time session" actions */}
      {/* TODO: 「プランに保存」または「ギャップタイムセッション開始」アクションを追加 */}
    </div>
  );
}
