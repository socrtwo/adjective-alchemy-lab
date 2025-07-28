import { AdjectiveCategory, AdjectiveClassification, AdverbCategory, AdverbClassification, CATEGORY_ORDER, ADVERB_ORDER } from '@/types/adjective';
import { findAdverbChains, reorderAdverbs } from './adverbMethods';

// Comprehensive adjective database organized by category
const ADJECTIVE_DATABASE: Record<AdjectiveCategory, string[]> = {
  opinion: [
    'beautiful', 'ugly', 'nice', 'good', 'bad', 'excellent', 'terrible', 'wonderful', 'awful', 'amazing',
    'horrible', 'fantastic', 'lovely', 'disgusting', 'perfect', 'brilliant', 'stupid', 'clever',
    'foolish', 'wise', 'silly', 'smart', 'dumb', 'gorgeous', 'hideous', 'pretty', 'handsome', 'attractive',
    'repulsive', 'charming', 'delightful', 'pleasant', 'unpleasant', 'adorable', 'cute', 'sweet', 'bitter',
    'sour', 'delicious', 'tasty', 'bland', 'spicy', 'mild', 'strong', 'weak', 'powerful', 'gentle',
    'ornate', 'delicate', 'elegant', 'graceful', 'sophisticated', 'refined', 'crude', 'rough', 'smooth',
    'magnificent', 'splendid', 'marvelous', 'superb', 'outstanding', 'exceptional', 'mediocre', 'inferior',
    'superior', 'exquisite', 'stunning', 'breathtaking', 'impressive', 'remarkable', 'extraordinary', 'ordinary',
    'dusty', 'clean', 'dirty', 'spotless', 'grimy', 'pristine', 'tattered', 'worn', 'shabby', 'neat',
    'cracked', 'broken', 'damaged', 'intact', 'flawless', 'imperfect', 'colorful', 'vibrant', 'dull', 'bright'
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
    'european', 'asian', 'african', 'latin', 'nordic', 'scandinavian', 'mediterranean',
    'middle eastern', 'western', 'eastern', 'northern', 'southern', 'tropical', 'arctic', 'antarctic',
    'roman', 'celtic', 'viking', 'persian', 'byzantine', 'ottoman', 'mayan', 'aztec', 'egyptian',
    'babylonian', 'sumerian', 'phoenician', 'carthaginian', 'venetian', 'florentine', 'parisian', 'londoner',
    'new yorker', 'californian', 'texan', 'midwestern', 'southeastern', 'northwestern', 'southwestern'
  ],
  material: [
    'wooden', 'plastic', 'metal', 'metallic', 'cotton', 'silk', 'wool', 'leather', 'rubber', 'glass',
    'ceramic', 'stone', 'concrete', 'marble', 'granite', 'steel', 'iron', 'aluminum', 'copper', 'brass',
    'gold', 'silver', 'diamond', 'crystal', 'paper', 'cardboard', 'fabric', 'linen', 'velvet', 'satin',
    'denim', 'canvas', 'vinyl', 'foam', 'bamboo', 'cork', 'wicker', 'rattan', 'clay', 'porcelain',
    'embroidered', 'woven', 'knitted', 'crocheted', 'quilted', 'upholstered', 'lacquered', 'polished',
    'brushed', 'textured', 'smooth', 'rough', 'glossy', 'matte', 'shiny', 'dull', 'transparent', 'opaque'
  ],
  purpose: [
    'sleeping', 'running', 'cooking', 'cleaning', 'writing', 'reading', 'swimming', 'dancing', 'singing',
    'playing', 'working', 'studying', 'teaching', 'learning', 'eating', 'drinking', 'driving', 'flying',
    'sailing', 'hiking', 'camping', 'hunting', 'fishing', 'gardening', 'painting', 'drawing', 'sewing',
    'knitting', 'building', 'repairing', 'measuring', 'cutting', 'grinding', 'mixing', 'storing',
    'protecting', 'decorating', 'lighting', 'heating', 'cooling'
  ]
};

const ADVERB_DATABASE: Record<AdverbCategory, string[]> = {
  manner: [
    'quickly', 'slowly', 'carefully', 'carelessly', 'loudly', 'quietly', 'softly', 'harshly', 'gently', 'roughly',
    'smoothly', 'abruptly', 'suddenly', 'gradually', 'immediately', 'instantly', 'eventually', 'finally',
    'eagerly', 'reluctantly', 'willingly', 'unwillingly', 'confidently', 'nervously', 'calmly', 'frantically',
    'patiently', 'impatiently', 'politely', 'rudely', 'kindly', 'cruelly', 'honestly', 'dishonestly',
    'clearly', 'vaguely', 'precisely', 'approximately', 'exactly', 'roughly', 'beautifully', 'uglily'
  ],
  place: [
    'here', 'there', 'everywhere', 'anywhere', 'somewhere', 'nowhere', 'nearby', 'far', 'close', 'distant',
    'inside', 'outside', 'upstairs', 'downstairs', 'underground', 'overhead', 'abroad', 'home', 'away',
    'forward', 'backward', 'sideways', 'northward', 'southward', 'eastward', 'westward', 'inward', 'outward',
    'above', 'below', 'beneath', 'behind', 'ahead', 'around', 'through', 'across', 'along', 'beyond'
  ],
  frequency: [
    'always', 'never', 'often', 'rarely', 'seldom', 'sometimes', 'occasionally', 'frequently', 'constantly',
    'regularly', 'irregularly', 'continuously', 'intermittently', 'repeatedly', 'once', 'twice', 'thrice',
    'daily', 'weekly', 'monthly', 'yearly', 'annually', 'hourly', 'usually', 'normally', 'typically',
    'commonly', 'uncommonly', 'habitually', 'traditionally', 'customarily', 'ordinarily', 'generally'
  ],
  time: [
    'now', 'then', 'today', 'yesterday', 'tomorrow', 'tonight', 'earlier', 'later', 'soon', 'immediately',
    'recently', 'formerly', 'previously', 'currently', 'presently', 'afterwards', 'beforehand', 'meanwhile',
    'simultaneously', 'eventually', 'finally', 'initially', 'originally', 'ultimately', 'temporarily',
    'permanently', 'briefly', 'momentarily', 'instantly', 'suddenly', 'gradually', 'slowly', 'quickly'
  ],
  purpose: [
    'intentionally', 'accidentally', 'deliberately', 'purposely', 'consciously', 'unconsciously', 'voluntarily',
    'involuntarily', 'willingly', 'unwillingly', 'knowingly', 'unknowingly', 'specifically', 'generally',
    'particularly', 'especially', 'mainly', 'primarily', 'chiefly', 'mostly', 'largely', 'partly', 'entirely',
    'completely', 'partially', 'fully', 'totally', 'absolutely', 'relatively', 'comparatively'
  ]
};

export class AdjectiveClassifier {
  private database: Record<AdjectiveCategory, Set<string>>;
  private adverbDatabase: Record<AdverbCategory, Set<string>>;

  constructor() {
    // Convert arrays to sets for faster lookup and normalize to lowercase
    this.database = Object.entries(ADJECTIVE_DATABASE).reduce((acc, [category, words]) => {
      acc[category as AdjectiveCategory] = new Set(words.map(word => word.toLowerCase()));
      return acc;
    }, {} as Record<AdjectiveCategory, Set<string>>);

    this.adverbDatabase = Object.entries(ADVERB_DATABASE).reduce((acc, [category, words]) => {
      acc[category as AdverbCategory] = new Set(words.map(word => word.toLowerCase()));
      return acc;
    }, {} as Record<AdverbCategory, Set<string>>);
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

  classifyAdverb(word: string): AdverbCategory | null {
    const lowercaseWord = word.toLowerCase();
    
    // Check each category in order of priority
    for (const category of ADVERB_ORDER) {
      if (this.adverbDatabase[category].has(lowercaseWord)) {
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

  extractAdverbs(sentence: string): string[] {
    const words = sentence.toLowerCase().match(/\b[a-z]+\b/g) || [];
    
    return words.filter(word => {
      return ADVERB_ORDER.some(category => this.adverbDatabase[category].has(word));
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

  analyzeAdverbs(sentence: string): AdverbClassification[] {
    const adverbs = this.extractAdverbs(sentence);
    const words = sentence.toLowerCase().split(/\s+/);
    
    return adverbs.map(adverb => {
      const category = this.classifyAdverb(adverb);
      const position = words.indexOf(adverb.toLowerCase());
      
      return {
        word: adverb,
        category: category!,
        position,
        confidence: 1.0
      };
    }).filter(classification => classification.category !== null);
  }

  findAdjectiveChains(sentence: string): Array<{ adjectives: AdjectiveClassification[]; startIndex: number; endIndex: number }> {
    const words = sentence.toLowerCase().split(/\s+/);
    const adjectives = this.analyzeSentence(sentence);
    const chains: Array<{ adjectives: AdjectiveClassification[]; startIndex: number; endIndex: number }> = [];
    
    if (adjectives.length === 0) return chains;
    
    // Group consecutive adjectives into chains
    let currentChain: AdjectiveClassification[] = [];
    let chainStart = -1;
    
    for (let i = 0; i < words.length; i++) {
      const adjective = adjectives.find(adj => adj.position === i);
      
      if (adjective) {
        if (currentChain.length === 0) {
          chainStart = i;
        }
        currentChain.push(adjective);
      } else {
        if (currentChain.length > 1) {
          chains.push({
            adjectives: currentChain,
            startIndex: chainStart,
            endIndex: i - 1
          });
        }
        currentChain = [];
      }
    }
    
    // Handle chain at end of sentence
    if (currentChain.length > 1) {
      chains.push({
        adjectives: currentChain,
        startIndex: chainStart,
        endIndex: words.length - 1
      });
    }
    
    return chains;
  }

  reorderAdjectives(sentence: string): { 
    original: string; 
    corrected: string; 
    changes: boolean;
    totalAdjectives: number;
    reorderedAdjectives: number;
    adjectiveChains: number;
    reorderedChains: number;
  } {
    const words = sentence.split(/\s+/);
    const adjectives = this.analyzeSentence(sentence);
    const chains = this.findAdjectiveChains(sentence);
    
    let totalReorderedAdjectives = 0;
    let reorderedChains = 0;
    let correctedWords = [...words];
    let hasChanges = false;
    
    // Process each chain separately
    for (const chain of chains) {
      const sortedChain = [...chain.adjectives].sort((a, b) => {
        const aIndex = CATEGORY_ORDER.indexOf(a.category);
        const bIndex = CATEGORY_ORDER.indexOf(b.category);
        return aIndex - bIndex;
      });
      
      // Check if this chain needs reordering
      const chainNeedsReordering = chain.adjectives.some((adj, index) => 
        sortedChain[index].word !== adj.word
      );
      
      if (chainNeedsReordering) {
        hasChanges = true;
        reorderedChains++;
        totalReorderedAdjectives += chain.adjectives.length;
        
        // Replace adjectives in their sorted positions within this chain
        const chainPositions = chain.adjectives.map(adj => adj.position).sort((a, b) => a - b);
        sortedChain.forEach((adj, index) => {
          if (chainPositions[index] !== undefined) {
            correctedWords[chainPositions[index]] = adj.word;
          }
        });
      }
    }
    
    return {
      original: sentence,
      corrected: correctedWords.join(' '),
      changes: hasChanges,
      totalAdjectives: adjectives.length,
      reorderedAdjectives: totalReorderedAdjectives,
      adjectiveChains: chains.length,
      reorderedChains
    };
  }

  analyzeMultipleSentences(text: string): {
    sentences: Array<{
      original: string;
      corrected: string;
      changes: boolean;
      totalAdjectives: number;
      reorderedAdjectives: number;
      adjectiveChains: number;
      reorderedChains: number;
      adjectives: AdjectiveClassification[];
      totalAdverbs: number;
      reorderedAdverbs: number;
      adverbChains: number;
      reorderedAdverbChains: number;
      adverbs: AdverbClassification[];
    }>;
    summary: {
      totalSentences: number;
      sentencesWithChanges: number;
      totalAdjectives: number;
      totalReorderedAdjectives: number;
      totalChains: number;
      totalReorderedChains: number;
      totalAdverbs: number;
      totalReorderedAdverbs: number;
      totalAdverbChains: number;
      totalReorderedAdverbChains: number;
    };
  } {
    // Split text into sentences
    const sentenceRegex = /[.!?]+/;
    const sentences = text.split(sentenceRegex)
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    const results = sentences.map(sentence => {
      const reorderResult = this.reorderAdjectives(sentence);
      const adverbResult = this.reorderAdverbs(sentence);
      const adjectives = this.analyzeSentence(sentence);
      const adverbs = this.analyzeAdverbs(sentence);
      
      return {
        ...reorderResult,
        adjectives,
        totalAdverbs: adverbResult.totalAdverbs,
        reorderedAdverbs: adverbResult.reorderedAdverbs,
        adverbChains: adverbResult.adverbChains,
        reorderedAdverbChains: adverbResult.reorderedChains,
        adverbs
      };
    });
    
    const summary = {
      totalSentences: results.length,
      sentencesWithChanges: results.filter(r => r.changes).length,
      totalAdjectives: results.reduce((sum, r) => sum + r.totalAdjectives, 0),
      totalReorderedAdjectives: results.reduce((sum, r) => sum + r.reorderedAdjectives, 0),
      totalChains: results.reduce((sum, r) => sum + r.adjectiveChains, 0),
      totalReorderedChains: results.reduce((sum, r) => sum + r.reorderedChains, 0),
      totalAdverbs: results.reduce((sum, r) => sum + r.totalAdverbs, 0),
      totalReorderedAdverbs: results.reduce((sum, r) => sum + r.reorderedAdverbs, 0),
      totalAdverbChains: results.reduce((sum, r) => sum + r.adverbChains, 0),
      totalReorderedAdverbChains: results.reduce((sum, r) => sum + r.reorderedAdverbChains, 0)
    };
    
    return { sentences: results, summary };
  }

  reorderAdverbs(sentence: string): { 
    original: string; 
    corrected: string; 
    changes: boolean;
    totalAdverbs: number;
    reorderedAdverbs: number;
    adverbChains: number;
    reorderedChains: number;
  } {
    const words = sentence.split(/\s+/);
    const adverbs = this.analyzeAdverbs(sentence);
    const chains = findAdverbChains(sentence, adverbs);
    
    return reorderAdverbs(sentence, adverbs, chains);
  }
}