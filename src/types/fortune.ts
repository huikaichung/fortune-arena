// 占卜相關型別定義

export interface BirthInfo {
  birth_date: string;
  birth_time?: string;
  birth_place?: string;
  gender?: string;
}

export interface HexagramData {
  upper_trigram: string;
  lower_trigram: string;
  changing_line: number;
  name: string;
  changed_hexagram?: string;
}

export interface FortuneRequest {
  question: string;
  birth_date: string;
  birth_time?: string;
  birth_place?: string;
  hexagram?: HexagramData;
}

export interface MasterBrief {
  id: string;
  name: string;
  title: string;
  school?: string;
  avatar_emoji?: string;
}

export interface MasterReading {
  master: MasterBrief;
  reading: string;
  aspects?: Record<string, string>;
  confidence?: number;
  key_points?: string[];
  // 舊格式相容
  analysis?: string;
  prediction?: string;
}

export interface DebateRound {
  round_number: number;
  speaker: MasterBrief;
  statement: string;
  target_name?: string;
  emotion: 'neutral' | 'agree' | 'disagree' | 'angry' | 'sarcastic';
}

export interface Consensus {
  consensus_score: number;
  consensus_reading: string;
  answer_summary?: string;
  consensus_details?: Record<string, string>;
  conflicts?: string[];
  unified_advice?: string;
  fun_fact?: string;
  // 舊格式相容
  has_consensus?: boolean;
  consensus_level?: number;
  agreed_points?: string[];
  disagreed_points?: string[];
  final_verdict?: string;
  advice?: string;
  most_relevant_master?: MasterBrief;
}

export interface FortuneResponse {
  session_id?: string;
  question: string;
  readings: MasterReading[];
  debate?: DebateRound[];
  consensus: Consensus;
  created_at?: string;
  status?: string;
}
