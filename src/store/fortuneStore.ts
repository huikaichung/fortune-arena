import { create } from 'zustand';
import type { FortuneResponse } from '../types/fortune';
import type { Hexagram } from '../types/hexagram';

export type Stage = 
  | 'intro'      // 太極開場
  | 'form'       // 輸入問題
  | 'casting'    // 起卦動畫
  | 'loading'    // 大師解讀中
  | 'readings'   // 解讀展示
  | 'consensus'; // 共識結果

interface FortuneState {
  stage: Stage;
  question: string;
  birthDate: string;
  birthTime: string;
  hexagram: Hexagram | null;
  result: FortuneResponse | null;
  error: string | null;
  
  // Actions
  setStage: (stage: Stage) => void;
  setQuestion: (question: string) => void;
  setBirthDate: (date: string) => void;
  setBirthTime: (time: string) => void;
  setHexagram: (hexagram: Hexagram) => void;
  setResult: (result: FortuneResponse) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  stage: 'intro' as Stage,
  question: '',
  birthDate: '',
  birthTime: '',
  hexagram: null,
  result: null,
  error: null,
};

export const useFortuneStore = create<FortuneState>((set) => ({
  ...initialState,
  
  setStage: (stage) => set({ stage }),
  setQuestion: (question) => set({ question }),
  setBirthDate: (birthDate) => set({ birthDate }),
  setBirthTime: (birthTime) => set({ birthTime }),
  setHexagram: (hexagram) => set({ hexagram }),
  setResult: (result) => set({ result }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));
