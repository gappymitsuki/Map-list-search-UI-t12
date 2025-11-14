"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { ExploreActivity } from '../types';
import { CATEGORY_METADATA } from '../types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/**
 * ExploreMap component
 * ExploreMap = ギャップタイムの体験スポットをマップ上で可視化するコンポーネント
 */

interface ExploreMapProps {
  centerLat: number;
  centerLng: number;
  activities: ExploreActivity[];
  selectedActivityId?: string;
  onSelectActivity?: (id: string) => void;
}

// Fix for default marker icon in Next.js
// Next.jsでデフォルトマーカーアイコンが表示されない問題を修正
const createCustomIcon = (isSelected: boolean, category: string) => {
  const emoji = CATEGORY_METADATA[category as keyof typeof CATEGORY_METADATA]?.emoji || '📍';

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${isSelected ? '#0284c7' : '#ffffff'};
        color: ${isSelected ? '#ffffff' : '#000000'};
        border: 2px solid ${isSelected ? '#0369a1' : '#0284c7'};
        border-radius: 50%;
        width: ${isSelected ? '48px' : '40px'};
        height: ${isSelected ? '48px' : '40px'};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${isSelected ? '24px' : '20px'};
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        transition: all 0.2s ease;
        cursor: pointer;
      ">
        ${emoji}
      </div>
    `,
    iconSize: [isSelected ? 48 : 40, isSelected ? 48 : 40],
    iconAnchor: [isSelected ? 24 : 20, isSelected ? 24 : 20],
    popupAnchor: [0, isSelected ? -24 : -20],
  });
};

// Component to handle map updates when center changes
function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}

export default function ExploreMap({
  centerLat,
  centerLng,
  activities,
  selectedActivityId,
  onSelectActivity
}: ExploreMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMarkerClick = (activityId: string) => {
    if (onSelectActivity) {
      onSelectActivity(activityId);
      // TODO: EventLogにMAP_PIN_CLICKイベントを送信
    }
  };

  const handleRecenter = () => {
    // This will trigger MapUpdater to recenter the map
    window.location.reload();
  };

  // Don't render map on server side
  if (!isClient) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={14}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater center={[centerLat, centerLng]} zoom={14} />

        {/* Activity markers */}
        {activities.map((activity) => {
          const isSelected = activity.id === selectedActivityId;

          return (
            <Marker
              key={activity.id}
              position={[activity.latitude, activity.longitude]}
              icon={createCustomIcon(isSelected, activity.category)}
              eventHandlers={{
                click: () => handleMarkerClick(activity.id),
              }}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {activity.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      ⏱️ {activity.durationMinutes} min
                    </span>
                    {activity.rating && (
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        ⭐ {activity.rating.toFixed(1)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleMarkerClick(activity.id)}
                    className="w-full bg-primary-600 text-white py-1.5 rounded text-sm font-medium hover:bg-primary-700"
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Re-center button */}
      <button
        onClick={handleRecenter}
        className="absolute top-4 right-4 bg-white shadow-lg rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 z-[1000] flex items-center gap-2"
        title="Back to area center"
      >
        <span>🎯</span>
        <span>Re-center</span>
      </button>

      {/* Activity count badge */}
      <div className="absolute bottom-4 left-4 bg-white shadow-lg rounded-lg px-3 py-2 text-sm font-medium text-gray-700 z-[1000]">
        📍 {activities.length} activities nearby
      </div>
    </div>
  );
}
