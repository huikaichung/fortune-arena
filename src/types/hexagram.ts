// 八卦
export type TrigramName = '乾' | '兌' | '離' | '震' | '巽' | '坎' | '艮' | '坤';

export interface Trigram {
  name: TrigramName;
  symbol: string;
  nature: string;  // 天、澤、火、雷、風、水、山、地
  attribute: string;  // 剛健、喜悅、光明...
}

export interface Hexagram {
  upperTrigram: Trigram;
  lowerTrigram: Trigram;
  changingLine: number;  // 動爻 1-6
  name: string;          // 卦名
  changedHexagram?: string;  // 變卦
  mutualHexagram?: string;   // 互卦
}

// 八卦資料
export const TRIGRAMS: Record<number, Trigram> = {
  1: { name: '乾', symbol: '☰', nature: '天', attribute: '剛健' },
  2: { name: '兌', symbol: '☱', nature: '澤', attribute: '喜悅' },
  3: { name: '離', symbol: '☲', nature: '火', attribute: '光明' },
  4: { name: '震', symbol: '☳', nature: '雷', attribute: '行動' },
  5: { name: '巽', symbol: '☴', nature: '風', attribute: '順入' },
  6: { name: '坎', symbol: '☵', nature: '水', attribute: '險陷' },
  7: { name: '艮', symbol: '☶', nature: '山', attribute: '止靜' },
  0: { name: '坤', symbol: '☷', nature: '地', attribute: '柔順' },  // 8 % 8 = 0
};

// 64卦名稱
export const HEXAGRAM_NAMES: Record<string, string> = {
  '乾乾': '乾為天', '坤坤': '坤為地', '坎坎': '坎為水', '離離': '離為火',
  '震震': '震為雷', '艮艮': '艮為山', '巽巽': '巽為風', '兌兌': '兌為澤',
  '乾坤': '天地否', '坤乾': '地天泰', '乾坎': '天水訟', '坎乾': '水天需',
  '乾離': '天火同人', '離乾': '火天大有', '乾震': '天雷無妄', '震乾': '雷天大壯',
  '乾巽': '天風姤', '巽乾': '風天小畜', '乾艮': '天山遯', '艮乾': '山天大畜',
  '乾兌': '天澤履', '兌乾': '澤天夬', '坤坎': '地水師', '坎坤': '水地比',
  '坤離': '地火明夷', '離坤': '火地晉', '坤震': '地雷復', '震坤': '雷地豫',
  '坤巽': '地風升', '巽坤': '風地觀', '坤艮': '地山謙', '艮坤': '山地剝',
  '坤兌': '地澤臨', '兌坤': '澤地萃', '坎離': '水火既濟', '離坎': '火水未濟',
  '坎震': '水雷屯', '震坎': '雷水解', '坎巽': '水風井', '巽坎': '風水渙',
  '坎艮': '水山蹇', '艮坎': '山水蒙', '坎兌': '水澤節', '兌坎': '澤水困',
  '離震': '火雷噬嗑', '震離': '雷火豐', '離巽': '火風鼎', '巽離': '風火家人',
  '離艮': '火山旅', '艮離': '山火賁', '離兌': '火澤睽', '兌離': '澤火革',
  '震巽': '雷風恆', '巽震': '風雷益', '震艮': '雷山小過', '艮震': '山雷頤',
  '震兌': '雷澤歸妹', '兌震': '澤雷隨', '巽艮': '風山漸', '艮巽': '山風蠱',
  '巽兌': '風澤中孚', '兌巽': '澤風大過', '艮兌': '山澤損', '兌艮': '澤山咸',
};

// 梅花易數起卦：時間起卦法
export function castByTime(date: Date = new Date()): Hexagram {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = Math.floor(date.getHours() / 2) + 1; // 時辰 1-12
  
  // 上卦 = (年 + 月 + 日) % 8
  const upperNum = (year + month + day) % 8;
  // 下卦 = (年 + 月 + 日 + 時) % 8
  const lowerNum = (year + month + day + hour) % 8;
  // 動爻 = (年 + 月 + 日 + 時) % 6 + 1
  const changingLine = ((year + month + day + hour) % 6) + 1;
  
  const upperTrigram = TRIGRAMS[upperNum] || TRIGRAMS[0];
  const lowerTrigram = TRIGRAMS[lowerNum] || TRIGRAMS[0];
  
  const hexagramKey = `${upperTrigram.name}${lowerTrigram.name}`;
  const name = HEXAGRAM_NAMES[hexagramKey] || `${upperTrigram.nature}${lowerTrigram.nature}卦`;
  
  // 計算變卦（動爻變化後的卦）
  const changedHexagram = getChangedHexagram(upperTrigram, lowerTrigram, changingLine);
  
  return {
    upperTrigram,
    lowerTrigram,
    changingLine,
    name,
    changedHexagram,
  };
}

// 計算變卦
function getChangedHexagram(_upper: Trigram, _lower: Trigram, changingLine: number): string {
  // 動爻在上卦還是下卦
  const isUpper = changingLine > 3;
  const lineInTrigram = isUpper ? changingLine - 3 : changingLine;
  
  // 簡化：返回一個描述性文字
  if (isUpper) {
    return `上卦第${lineInTrigram}爻動`;
  }
  return `下卦第${lineInTrigram}爻動`;
}

// 根據問題字數起卦
export function castByQuestion(question: string): Hexagram {
  const chars = question.replace(/\s/g, '').length;
  const now = new Date();
  const hour = Math.floor(now.getHours() / 2) + 1;
  
  // 上卦 = 字數 % 8
  const upperNum = chars % 8;
  // 下卦 = (字數 + 時辰) % 8
  const lowerNum = (chars + hour) % 8;
  // 動爻 = (字數 + 時辰) % 6 + 1
  const changingLine = ((chars + hour) % 6) + 1;
  
  const upperTrigram = TRIGRAMS[upperNum] || TRIGRAMS[0];
  const lowerTrigram = TRIGRAMS[lowerNum] || TRIGRAMS[0];
  
  const hexagramKey = `${upperTrigram.name}${lowerTrigram.name}`;
  const name = HEXAGRAM_NAMES[hexagramKey] || `${upperTrigram.nature}${lowerTrigram.nature}卦`;
  
  return {
    upperTrigram,
    lowerTrigram,
    changingLine,
    name,
    changedHexagram: getChangedHexagram(upperTrigram, lowerTrigram, changingLine),
  };
}
