export type AdjectiveCategory = 
  | 'opinion' 
  | 'size' 
  | 'age' 
  | 'shape' 
  | 'color' 
  | 'origin' 
  | 'material' 
  | 'purpose';

export type AdverbCategory = 
  | 'manner'
  | 'place' 
  | 'frequency'
  | 'time'
  | 'purpose';

export interface AdjectiveClassification {
  word: string;
  category: AdjectiveCategory;
  position: number;
  confidence?: number;
}

export interface AdverbClassification {
  word: string;
  category: AdverbCategory;
  position: number;
  confidence?: number;
}

export interface AnalyzedSentence {
  original: string;
  corrected: string;
  adjectives: AdjectiveClassification[];
  changes: boolean;
}

export const CATEGORY_ORDER: AdjectiveCategory[] = [
  'opinion',
  'size', 
  'age',
  'shape',
  'color',
  'origin',
  'material',
  'purpose'
];

export const ADVERB_ORDER: AdverbCategory[] = [
  'manner',
  'place',
  'frequency', 
  'time',
  'purpose'
];

export const CATEGORY_LABELS: Record<AdjectiveCategory, string> = {
  opinion: 'Opinion',
  size: 'Size',
  age: 'Age', 
  shape: 'Shape',
  color: 'Color',
  origin: 'Origin',
  material: 'Material',
  purpose: 'Purpose'
};

export const ADVERB_LABELS: Record<AdverbCategory, string> = {
  manner: 'Manner',
  place: 'Place',
  frequency: 'Frequency',
  time: 'Time',
  purpose: 'Purpose'
};

export const CATEGORY_DESCRIPTIONS: Record<AdjectiveCategory, string> = {
  opinion: 'beautiful, ugly, nice, good, bad',
  size: 'big, small, tiny, huge, little',
  age: 'old, new, ancient, modern, young',
  shape: 'round, square, flat, curved, straight',
  color: 'red, blue, green, white, black',
  origin: 'American, Chinese, French, British',
  material: 'wooden, plastic, metal, cotton, silk',
  purpose: 'sleeping (bag), running (shoes), cooking (pot)'
};

export const ADVERB_DESCRIPTIONS: Record<AdverbCategory, string> = {
  manner: 'quickly, carefully, loudly, gently',
  place: 'here, there, everywhere, nearby',
  frequency: 'always, often, sometimes, never',
  time: 'now, then, yesterday, tomorrow',
  purpose: 'intentionally, accidentally, deliberately'
};