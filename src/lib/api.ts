/**
 * API Client for knowyourself — v2
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://selfkit-backend-129518505568.asia-northeast1.run.app/api/v1';

export interface BirthInfo {
  birth_date: string;
  birth_time?: string;
  birth_place?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  gender?: 'male' | 'female';
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

export interface PlanetPosition {
  name: string;
  name_en?: string;
  sign: string;
  sign_en?: string;
  element?: string;
  degree?: number;
  retrograde?: boolean;
  house?: number;
}

export interface AspectData {
  planet1: string;
  planet2: string;
  aspect: string;
  orb: number;
}

export interface ChartPattern {
  name: string;           // Grand Trine
  name_cn: string;        // 大三角
  planets: string[];      // [太陽, 月亮, 木星]
  element?: string;       // 水象 (for Grand Trine)
  sign?: string;          // 巨蟹座 (for Stellium)
  apex?: string;          // 頂點行星 (for T-Square)
  interpretation?: string;
}

export interface WesternAstro {
  sun_sign: string;
  sun_element: string;
  moon_sign?: string;
  rising_sign?: string;
  sun_traits?: string;
  // Enhanced precision fields
  sun_degree?: number;
  moon_degree?: number;
  asc_degree?: number;
  planets?: PlanetPosition[];
  aspects?: AspectData[];
  patterns?: ChartPattern[];   // 格局：大三角、T三角等
  calculation_method?: 'ai_estimated' | 'kerykeion_swiss_ephemeris';
  has_birth_time?: boolean;
}

export interface ZiweiPattern {
  id?: string;
  name: string;           // 紫府同宮格
  category?: string;      // 富貴格
  interpretation?: string;
  matched_stars?: string[];
}

export interface ZiweiPalace {
  name: string;           // 命宮
  branch: string;         // 子
  major_stars: string[];  // [紫微, 天府]
  minor_stars?: string[];
  sihua?: string[];       // [化祿, 化權]
}

export interface ZiweiChart {
  lunar_date?: string;    // 農曆 1990年6月15日
  year_pillar?: string;   // 庚午
  wu_xing_ju?: string;    // 土五局
  ming_gong_branch?: string;
  shen_gong_branch?: string;
  palaces?: ZiweiPalace[];
  patterns?: ZiweiPattern[];
  calculation_method?: string;
}

export interface ChineseAstro {
  zodiac: string;
  element: string;
  bazi_day_master?: string;
  bazi_summary?: string;
  ziwei?: ZiweiChart;
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
 * Get detailed reading for a specific system (requires auth)
 */
export async function getManualDetail(manualId: string, system: DetailSystem, accessToken?: string): Promise<DetailResponse> {
  const headers: Record<string, string> = {};
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }
  
  const response = await fetch(`${API_URL}/manual/${manualId}/detail/${system}`, { headers });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('NEED_LOGIN');
    }
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
