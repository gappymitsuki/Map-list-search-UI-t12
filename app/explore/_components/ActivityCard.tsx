"use client";

import type { ExploreActivity } from '../types';
import { CATEGORY_METADATA } from '../types';
import clsx from 'clsx';

/**
 * ActivityCard component
 * アクティビティカードコンポーネント - 1つの体験を表示するカード
 */

interface ActivityCardProps {
  activity: ExploreActivity;
  isSelected?: boolean;
  onSelect?: (activityId: string) => void;
  onHover?: (activityId: string | null) => void;
}

export default function ActivityCard({
  activity,
  isSelected = false,
  onSelect,
  onHover
}: ActivityCardProps) {
  const categoryMeta = CATEGORY_METADATA[activity.category];

  // Format distance
  const formatDistance = (meters?: number) => {
    if (!meters) return null;
    if (meters < 1000) {
      return `${Math.round(meters)}m away`;
    }
    return `${(meters / 1000).toFixed(1)}km away`;
  };

  // Format rating
  const formatRating = (rating?: number) => {
    if (!rating) return null;
    return '⭐'.repeat(Math.round(rating));
  };

  const handleClick = () => {
    if (onSelect) {
      onSelect(activity.id);
      // TODO: EventLogにACTIVITY_VIEWイベントを送信
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => onHover?.(activity.id)}
      onMouseLeave={() => onHover?.(null)}
      className={clsx(
        "bg-white border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md",
        isSelected
          ? "border-primary-600 ring-2 ring-primary-100 shadow-md"
          : "border-gray-200 hover:border-primary-300"
      )}
    >
      {/* Header with title and category badge */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-semibold text-gray-900 text-lg flex-1">
          {activity.title}
        </h3>
        <span
          className={clsx(
            "px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap",
            categoryMeta.color
          )}
        >
          {categoryMeta.emoji} {categoryMeta.label}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {activity.shortDescription}
      </p>

      {/* Metadata badges */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {/* Duration */}
        <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
          ⏱️ {activity.durationMinutes} min
        </span>

        {/* Distance */}
        {activity.distanceMeters !== undefined && (
          <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
            📍 {formatDistance(activity.distanceMeters)}
          </span>
        )}

        {/* Rating */}
        {activity.rating && (
          <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
            {formatRating(activity.rating)} {activity.rating.toFixed(1)}
          </span>
        )}
      </div>

      {/* Venue name */}
      {activity.venueName && (
        <p className="text-xs text-gray-500 mb-3">
          {activity.venueName}
          {activity.areaName && ` • ${activity.areaName}`}
        </p>
      )}

      {/* Action button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
        className={clsx(
          "w-full py-2 rounded-lg font-medium text-sm transition-colors",
          isSelected
            ? "bg-primary-600 text-white hover:bg-primary-700"
            : "bg-primary-50 text-primary-700 hover:bg-primary-100"
        )}
      >
        {isSelected ? "Selected" : "View Details"}
      </button>
    </div>
  );
}
