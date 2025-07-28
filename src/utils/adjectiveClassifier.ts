import { AdjectiveCategory, AdjectiveClassification, CATEGORY_ORDER } from '@/types/adjective';

// Comprehensive adjective database organized by category
const ADJECTIVE_DATABASE: Record<AdjectiveCategory, string[]> = {
  opinion: [
    'beautiful', 'ugly', 'nice', 'good', 'bad', 'excellent', 'terrible', 'wonderful', 'awful', 'amazing',
    'horrible', 'fantastic', 'lovely', 'disgusting', 'perfect', 'awful', 'brilliant', 'stupid', 'clever',
    'foolish', 'wise', 'silly', 'smart', 'dumb', 'gorgeous', 'hideous', 'pretty', 'handsome', 'attractive',
    'repulsive', 'charming', 'delightful', 'pleasant', 'unpleasant', 'adorable', 'cute', 'sweet', 'bitter',
    'sour', 'delicious', 'tasty', 'bland', 'spicy', 'mild', 'strong', 'weak', 'powerful', 'gentle'
  ],
  size: [
    'big', 'small', 'tiny', 'huge', 'large', 'little', 'enormous', 'gigantic', 'microscopic', 'massive',
    'miniature', 'colossal', 'immense', 'petite', 'vast', 'compact', 'spacious', 'cramped', 'broad',
    'narrow', 'wide', 'thin', 'thick', 'fat', 'skinny', 'tall', 'short', 'high', 'low', 'deep', 'shallow',
    'long', 'brief', 'extensive', 'limited', 'infinite', 'finite'
  ],
  age: [
    'old', 'new', 'ancient', 'modern', 'young', 'elderly', 'aged', 'fresh', 'recent', 'contemporary',
    'vintage', 'antique', 'historic', 'prehistoric', 'medieval', 'current', 'outdated', 'obsolete',
    'brand-new', 'secondhand', 'used', 'original', 'latest', 'former', 'previous', 'future', 'past',
    'present', 'archaic', 'primitive', 'advanced', 'cutting-edge', 'state-of-the-art'
  ],
  shape: [
    'round', 'square', 'flat', 'curved', 'straight', 'circular', 'rectangular', 'triangular', 'oval',
    'spherical', 'cylindrical', 'conical', 'angular', 'pointed', 'blunt', 'sharp', 'smooth', 'rough',
    'bumpy', 'uneven', 'level', 'crooked', 'twisted', 'bent', 'stretched', 'compressed', 'hollow',
    'solid', 'dense', 'loose', 'tight', 'open', 'closed', 'narrow', 'wide'
  ],
  color: [
    'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'black', 'white', 'gray',
    'grey', 'golden', 'silver', 'bronze', 'copper', 'crimson', 'scarlet', 'maroon', 'navy', 'royal',
    'sky', 'turquoise', 'teal', 'lime', 'olive', 'forest', 'emerald', 'violet', 'lavender', 'magenta',
    'rose', 'coral', 'salmon', 'beige', 'tan', 'cream', 'ivory', 'pearl', 'jet', 'charcoal', 'slate'
  ],
  origin: [
    'american', 'chinese', 'french', 'british', 'german', 'italian', 'japanese', 'spanish', 'russian',
    'indian', 'canadian', 'australian', 'mexican', 'brazilian', 'korean', 'thai', 'greek', 'turkish',
    'egyptian', 'moroccan', 'nigerian', 'south african', 'argentinian', 'chilean', 'peruvian', 'venezuelan',
    'european', 'asian', 'african', 'american', 'latin', 'nordic', 'scandinavian', 'mediterranean',
    'middle eastern', 'western', 'eastern', 'northern', 'southern', 'tropical', 'arctic', 'antarctic'
  ],
  material: [
    'wooden', 'plastic', 'metal', 'metallic', 'cotton', 'silk', 'wool', 'leather', 'rubber', 'glass',
    'ceramic', 'stone', 'concrete', 'marble', 'granite', 'steel', 'iron', 'aluminum', 'copper', 'brass',
    'gold', 'silver', 'diamond', 'crystal', 'paper', 'cardboard', 'fabric', 'linen', 'velvet', 'satin',
    'denim', 'canvas', 'vinyl', 'foam', 'bamboo', 'cork', 'wicker', 'rattan', 'clay', 'porcelain'
  ],
  purpose: [
    'sleeping', 'running', 'cooking', 'cleaning', 'writing', 'reading', 'swimming', 'dancing', 'singing',
    'playing', 'working', 'studying', 'teaching', 'learning', 'eating', 'drinking', 'driving', 'flying',
    'sailing', 'hiking', 'camping', 'hunting', 'fishing', 'gardening', 'painting', 'drawing', 'sewing',
    'knitting', 'building', 'repairing', 'measuring', 'cutting', 'grinding', 'mixing', 'storing',
    'protecting', 'decorating', 'lighting', 'heating', 'cooling'
  ]
};

export class AdjectiveClassifier {
  private database: Record<AdjectiveCategory, Set<string>>;

  constructor() {
    // Convert arrays to sets for faster lookup and normalize to lowercase
    this.database = Object.entries(ADJECTIVE_DATABASE).reduce((acc, [category, words]) => {
      acc[category as AdjectiveCategory] = new Set(words.map(word => word.toLowerCase()));
      return acc;
    }, {} as Record<AdjectiveCategory, Set<string>>);
  }

  classifyAdjective(word: string): AdjectiveCategory | null {
    const lowercaseWord = word.toLowerCase();
    
    // Check each category in order of priority
    for (const category of CATEGORY_ORDER) {
      if (this.database[category].has(lowercaseWord)) {
        return category;
      }
    }
    
    return null;
  }

  extractAdjectives(sentence: string): string[] {
    // Simple word extraction - in a real application, you might use a POS tagger
    const words = sentence.toLowerCase().match(/\b[a-z]+\b/g) || [];
    
    return words.filter(word => {
      // Check if the word is in any category
      return CATEGORY_ORDER.some(category => this.database[category].has(word));
    });
  }

  analyzeSentence(sentence: string): AdjectiveClassification[] {
    const adjectives = this.extractAdjectives(sentence);
    const words = sentence.toLowerCase().split(/\s+/);
    
    return adjectives.map(adjective => {
      const category = this.classifyAdjective(adjective);
      const position = words.indexOf(adjective.toLowerCase());
      
      return {
        word: adjective,
        category: category!,
        position,
        confidence: 1.0 // In a real implementation, this could be calculated
      };
    }).filter(classification => classification.category !== null);
  }

  reorderAdjectives(sentence: string): { original: string; corrected: string; changes: boolean } {
    const words = sentence.split(/\s+/);
    const adjectives = this.analyzeSentence(sentence);
    
    if (adjectives.length < 2) {
      return { original: sentence, corrected: sentence, changes: false };
    }
    
    // Sort adjectives by their category order
    const sortedAdjectives = [...adjectives].sort((a, b) => {
      const aIndex = CATEGORY_ORDER.indexOf(a.category);
      const bIndex = CATEGORY_ORDER.indexOf(b.category);
      return aIndex - bIndex;
    });
    
    // Check if reordering is needed
    const needsReordering = adjectives.some((adj, index) => 
      sortedAdjectives[index].word !== adj.word
    );
    
    if (!needsReordering) {
      return { original: sentence, corrected: sentence, changes: false };
    }
    
    // Create a copy of words and replace adjectives in order
    const correctedWords = [...words];
    const adjectivePositions = adjectives.map(adj => adj.position).sort((a, b) => a - b);
    
    // Replace adjectives in their sorted positions
    sortedAdjectives.forEach((adj, index) => {
      if (adjectivePositions[index] !== undefined) {
        correctedWords[adjectivePositions[index]] = adj.word;
      }
    });
    
    return {
      original: sentence,
      corrected: correctedWords.join(' '),
      changes: true
    };
  }
}