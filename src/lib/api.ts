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

export interface DeepData {
  zodiac_name: string;
  zodiac_element: string;
  chinese_zodiac: string;
  chinese_element: string;
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
