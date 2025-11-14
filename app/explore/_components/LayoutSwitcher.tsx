"use client";

import clsx from 'clsx';

/**
 * LayoutSwitcher component for mobile view
 * モバイル表示用のレイアウト切り替えコンポーネント
 */

export type ViewMode = 'list' | 'map';

interface LayoutSwitcherProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export default function LayoutSwitcher({
  currentView,
  onViewChange
}: LayoutSwitcherProps) {
  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => onViewChange('list')}
        className={clsx(
          "flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors",
          currentView === 'list'
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        )}
      >
        📋 List
      </button>
      <button
        onClick={() => onViewChange('map')}
        className={clsx(
          "flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors",
          currentView === 'map'
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        )}
      >
        🗺️ Map
      </button>
    </div>
  );
}
