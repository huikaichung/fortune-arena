// 占卜相關型別定義

export interface BirthInfo {
  birth_date: string;
  birth_time?: string;
  birth_place?: string;
  gender?: string;
}

export interface FortuneRequest {
  question: string;
  birth_info: BirthInfo;
}

export interface MasterBrief {
  id: string;
  name: string;
  title: string;
  school: string;
  avatar_emoji: string;
}

export interface MasterReading {
  master: MasterBrief;
  analysis: string;
  prediction: string;
  confidence: number;
  key_points: string[];
}

export interface DebateRound {
  round_number: number;
  speaker: MasterBrief;
  statement: string;
  target_name?: string;
  emotion: 'neutral' | 'agree' | 'disagree' | 'angry' | 'sarcastic';
}

export interface Consensus {
  has_consensus: boolean;
  consensus_level: number;
  agreed_points: string[];
  disagreed_points: string[];
  final_verdict: string;
  advice: string;
  most_relevant_master?: MasterBrief;
}

export interface FortuneResponse {
  session_id: string;
  question: string;
  readings: MasterReading[];
  debate: DebateRound[];
  consensus: Consensus;
  created_at: string;
  status: string;
}
