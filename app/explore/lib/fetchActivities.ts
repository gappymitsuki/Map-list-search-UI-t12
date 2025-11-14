import type { ExploreActivity, ExploreFilters } from '../types';

/**
 * Fetch activities from the API based on filters
 * フィルターに基づいてAPIからアクティビティを取得
 *
 * TODO: 実際のレコメンドロジック(/api/gaptime/recommend)と接続する
 */
export async function fetchExploreActivities(
  filters: ExploreFilters
): Promise<ExploreActivity[]> {
  try {
    const response = await fetch('/api/explore/activities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filters),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch activities');
    }

    return data.activities;
  } catch (error) {
    console.error('Error fetching explore activities:', error);
    throw error;
  }
}
