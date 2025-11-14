"use client";

import { useState } from 'react';
import type { ExploreFilters, ActivityCategory, SortOption } from '../types';
import { CATEGORY_METADATA, TIME_OPTIONS } from '../types';
import clsx from 'clsx';

/**
 * FiltersBar component
 * フィルターバーコンポーネント - ユーザーが検索条件を設定できるUI
 */

interface FiltersBarProps {
  filters: ExploreFilters;
  onFiltersChange: (filters: ExploreFilters) => void;
  resultsCount: number;
  isLoading?: boolean;
}

export default function FiltersBar({
  filters,
  onFiltersChange,
  resultsCount,
  isLoading = false
}: FiltersBarProps) {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Handle available time change
  const handleTimeChange = (minutes: number) => {
    onFiltersChange({ ...filters, availableMinutes: minutes });
    // TODO: EventLogにFILTER_CHANGEDイベントを送信して、どのフィルタがよく使われているか計測する
  };

  // Handle category toggle
  const handleCategoryToggle = (category: ActivityCategory) => {
    const isSelected = filters.categories.includes(category);
    const newCategories = isSelected
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];

    // Prevent deselecting all categories
    if (newCategories.length === 0) {
      return;
    }

    onFiltersChange({ ...filters, categories: newCategories });
  };

  // Handle select all categories
  const handleSelectAllCategories = () => {
    const allCategories: ActivityCategory[] = [
      "FOOD", "CAFÉ", "NIGHTLIFE", "SHOPPING", "CULTURE", "VIEWPOINT", "OTHER"
    ];
    onFiltersChange({ ...filters, categories: allCategories });
  };

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ ...filters, sortBy: e.target.value as SortOption });
  };

  // Handle location reset (back to Shibuya)
  const handleLocationReset = () => {
    onFiltersChange({
      ...filters,
      centerLat: 35.6595,
      centerLng: 139.7005
    });
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4 space-y-4">
      {/* Header with location and results count */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Explore Gap-time Activities
          </h2>
          <p className="text-sm text-gray-600">
            {isLoading ? (
              <span>Searching...</span>
            ) : (
              <span>{resultsCount} activities in Shibuya</span>
            )}
          </p>
        </div>
        <button
          onClick={handleLocationReset}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          📍 Shibuya
        </button>
      </div>

      {/* Available time selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Available time
        </label>
        <div className="flex flex-wrap gap-2">
          {TIME_OPTIONS.map((minutes) => (
            <button
              key={minutes}
              onClick={() => handleTimeChange(minutes)}
              disabled={isLoading}
              className={clsx(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                filters.availableMinutes === minutes
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
            >
              {minutes} min
            </button>
          ))}
        </div>
      </div>

      {/* Category selector */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Categories
          </label>
          <button
            onClick={handleSelectAllCategories}
            className="text-xs text-primary-600 hover:text-primary-700 font-medium"
          >
            Select all
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.values(CATEGORY_METADATA).map((category) => {
            const isSelected = filters.categories.includes(category.key);
            return (
              <button
                key={category.key}
                onClick={() => handleCategoryToggle(category.key)}
                disabled={isLoading}
                className={clsx(
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-colors inline-flex items-center gap-1",
                  isSelected
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                  isLoading && "opacity-50 cursor-not-allowed"
                )}
              >
                <span>{category.emoji}</span>
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sort by selector */}
      <div className="flex items-center gap-3">
        <label htmlFor="sort" className="text-sm font-medium text-gray-700">
          Sort by:
        </label>
        <select
          id="sort"
          value={filters.sortBy}
          onChange={handleSortChange}
          disabled={isLoading}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
        >
          <option value="BEST_MATCH">Best match</option>
          <option value="NEAREST">Nearest</option>
          <option value="SHORTEST_DURATION">Shortest duration</option>
          <option value="HIGHEST_RATING">Highest rating</option>
        </select>
      </div>
    </div>
  );
}
