/**
 * API Client for SelfKit Backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://selfkit-backend-22akuoiitq-an.a.run.app/api/v1';

export interface BirthInfo {
  birth_date: string;
  birth_time?: string;
  birth_place?: string;
  gender?: 'male' | 'female';
  timezone?: string;
}

export interface GenerateManualRequest {
  birth_info: BirthInfo;
  perspectives?: string[];
}

export interface UserManual {
  id: string;
  user_id: string;
  generated_at: string;
  profile: {
    core_label: string;
    one_liner: string;
  };
  chapters: Record<string, Chapter>;
}

export interface Chapter {
  title: string;
  summary: string;
  points: InsightPoint[];
}

export interface InsightPoint {
  insight: string;
  explanation: string;
  psychology_perspective?: string;
  sources: string[];
  confidence: 'high' | 'medium' | 'low';
}

export interface ChatRequest {
  message: string;
  manual_id?: string;
  conversation_id?: string;
  include_meihua?: boolean;
}

export interface ChatResponse {
  conversation_id: string;
  message: {
    role: 'assistant';
    content: string;
    sources?: string[];
  };
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
    const error = await response.json();
    throw new Error(error.error?.message || '生成失敗');
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

/**
 * Chat with AI Advisor
 */
export async function chat(request: ChatRequest): Promise<ChatResponse> {
  const response = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || '對話失敗');
  }

  return response.json();
}
