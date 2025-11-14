"use client";

import { useEffect, useRef } from 'react';
import type { ExploreActivity } from '../types';
import ActivityCard from './ActivityCard';

/**
 * ActivityList component
 * アクティビティリストコンポーネント - 体験のリストを表示
 */

interface ActivityListProps {
  activities: ExploreActivity[];
  selectedActivityId?: string;
  onSelect: (activityId: string) => void;
  onHover?: (activityId: string | null) => void;
  isLoading?: boolean;
}

export default function ActivityList({
  activities,
  selectedActivityId,
  onSelect,
  onHover,
  isLoading = false
}: ActivityListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const selectedCardRef = useRef<HTMLDivElement>(null);

  // Scroll to selected card when selection changes
  useEffect(() => {
    if (selectedActivityId && selectedCardRef.current) {
      selectedCardRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [selectedActivityId]);

  // Loading state
  if (isLoading) {
    return (
      <div className="h-full overflow-y-auto activity-list p-4">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse"
            >
              <div className="flex justify-between mb-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
              <div className="flex gap-2 mb-3">
                <div className="h-6 bg-gray-200 rounded w-20"></div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (activities.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No activities found
          </h3>
          <p className="text-gray-600 mb-4">
            No activities match these filters.
            <br />
            Try expanding your time or categories.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
    );
  }

  // Activity list
  return (
    <div
      ref={listRef}
      className="h-full overflow-y-auto activity-list p-4 space-y-3"
    >
      {activities.map((activity) => (
        <div
          key={activity.id}
          ref={activity.id === selectedActivityId ? selectedCardRef : null}
        >
          <ActivityCard
            activity={activity}
            isSelected={activity.id === selectedActivityId}
            onSelect={onSelect}
            onHover={onHover}
          />
        </div>
      ))}
    </div>
  );
}
