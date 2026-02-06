/**
 * API Client for knowyourself — v2
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://selfkit-backend-129518505568.asia-northeast1.run.app/api/v1';

export interface BirthInfo {
  birth_date: string;
  birth_time?: string;
  birth_place?: string;
  gender?: 'male' | 'female';
  timezone?: string;
}

export interface GenerateManualRequest {
  birth_info: BirthInfo;
}

export interface SpectrumData {
  action: number;
  social: number;
  creativity: number;
  analysis: number;
  intuition: number;
  resilience: number;
}

export interface Section {
  id: string;
  heading: string;
  content: string;
  sub_points?: string[];
}

export interface LuckyGuide {
  color: string;
  number: number;
  direction: string;
  element: string;
  season: string;
}

export interface WesternAstro {
  sun_sign: string;
  sun_element: string;
  moon_sign?: string;
  rising_sign?: string;
  sun_traits?: string;
}

export interface ChineseAstro {
  zodiac: string;
  element: string;
  bazi_day_master?: string;
  bazi_summary?: string;
}

export interface HumanDesignData {
  type?: string;
  strategy?: string;
  authority?: string;
  profile?: string;
}

export interface DeepData {
  // Legacy
  zodiac_name: string;
  zodiac_element: string;
  chinese_zodiac: string;
  chinese_element: string;
  // Expanded
  western?: WesternAstro;
  chinese?: ChineseAstro;
  human_design?: HumanDesignData;
}

export interface UserManual {
  id: string;
  birth_date: string;
  generated_at: string;
  profile: {
    label: string;
    tagline: string;
  };
  spectrum: SpectrumData;
  sections: Section[];
  lucky: LuckyGuide;
  deep_data: DeepData;
}

/**
 * Generate User Manual
 */
export async function generateManual(request: GenerateManualRequest): Promise<UserManual> {
  const response = await fetch(`${API_URL}/manual/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || '生成失敗');
  }

  return response.json();
}

/**
 * Get Manual by ID
 */
export async function getManual(manualId: string): Promise<UserManual> {
  const response = await fetch(`${API_URL}/manual/${manualId}`);

  if (!response.ok) {
    throw new Error('找不到使用說明書');
  }

  return response.json();
}

export type DetailSystem = 'western' | 'ziwei' | 'bazi' | 'human_design' | 'meihua';

export interface DetailResponse {
  system: string;
  data: Record<string, unknown>;
}

/**
 * Get detailed reading for a specific system
 */
export async function getManualDetail(manualId: string, system: DetailSystem): Promise<DetailResponse> {
  const response = await fetch(`${API_URL}/manual/${manualId}/detail/${system}`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || '載入失敗');
  }

  return response.json();
}

// ============================================================
// USER STORAGE
// ============================================================

/**
 * Save a manual to user's collection
 */
export async function saveManual(userId: string, manualId: string): Promise<{ success: boolean; doc_id: string }> {
  const response = await fetch(`${API_URL}/manual/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, manual_id: manualId }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || '儲存失敗');
  }

  return response.json();
}

export interface SavedManualSummary {
  id: string;
  birth_date: string;
  profile: { label: string; tagline: string };
  saved_at: string;
}

/**
 * List user's saved manuals
 */
export async function listSavedManuals(userId: string): Promise<{ manuals: SavedManualSummary[] }> {
  const response = await fetch(`${API_URL}/manual/user/${userId}`);

  if (!response.ok) {
    throw new Error('載入失敗');
  }

  return response.json();
}

/**
 * Get a saved manual
 */
export async function getSavedManual(userId: string, manualId: string): Promise<UserManual> {
  const response = await fetch(`${API_URL}/manual/user/${userId}/${manualId}`);

  if (!response.ok) {
    throw new Error('找不到已儲存的說明書');
  }

  return response.json();
}

/**
 * Delete a saved manual
 */
export async function deleteSavedManual(userId: string, manualId: string): Promise<{ success: boolean }> {
  const response = await fetch(`${API_URL}/manual/user/${userId}/${manualId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('刪除失敗');
  }

  return response.json();
}
