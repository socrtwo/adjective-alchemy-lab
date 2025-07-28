import { AdverbCategory, AdverbClassification, ADVERB_ORDER } from '@/types/adjective';

export function findAdverbChains(sentence: string, adverbs: AdverbClassification[]): Array<{ adverbs: AdverbClassification[]; startIndex: number; endIndex: number }> {
  const words = sentence.toLowerCase().split(/\s+/);
  const chains: Array<{ adverbs: AdverbClassification[]; startIndex: number; endIndex: number }> = [];
  
  if (adverbs.length === 0) return chains;
  
  // Group consecutive adverbs into chains
  let currentChain: AdverbClassification[] = [];
  let chainStart = -1;
  
  for (let i = 0; i < words.length; i++) {
    const adverb = adverbs.find(adv => adv.position === i);
    
    if (adverb) {
      if (currentChain.length === 0) {
        chainStart = i;
      }
      currentChain.push(adverb);
    } else {
      if (currentChain.length > 1) {
        chains.push({
          adverbs: currentChain,
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
      adverbs: currentChain,
      startIndex: chainStart,
      endIndex: words.length - 1
    });
  }
  
  return chains;
}

export function reorderAdverbs(sentence: string, adverbs: AdverbClassification[], chains: Array<{ adverbs: AdverbClassification[]; startIndex: number; endIndex: number }>): { 
  original: string; 
  corrected: string; 
  changes: boolean;
  totalAdverbs: number;
  reorderedAdverbs: number;
  adverbChains: number;
  reorderedChains: number;
} {
  const words = sentence.split(/\s+/);
  
  let totalReorderedAdverbs = 0;
  let reorderedChains = 0;
  let correctedWords = [...words];
  let hasChanges = false;
  
  // Process each chain separately
  for (const chain of chains) {
    const sortedChain = [...chain.adverbs].sort((a, b) => {
      const aIndex = ADVERB_ORDER.indexOf(a.category);
      const bIndex = ADVERB_ORDER.indexOf(b.category);
      return aIndex - bIndex;
    });
    
    // Check if this chain needs reordering
    const chainNeedsReordering = chain.adverbs.some((adv, index) => 
      sortedChain[index].word !== adv.word
    );
    
    if (chainNeedsReordering) {
      hasChanges = true;
      reorderedChains++;
      totalReorderedAdverbs += chain.adverbs.length;
      
      // Replace adverbs in their sorted positions within this chain
      const chainPositions = chain.adverbs.map(adv => adv.position).sort((a, b) => a - b);
      sortedChain.forEach((adv, index) => {
        if (chainPositions[index] !== undefined) {
          correctedWords[chainPositions[index]] = adv.word;
        }
      });
    }
  }
  
  return {
    original: sentence,
    corrected: correctedWords.join(' '),
    changes: hasChanges,
    totalAdverbs: adverbs.length,
    reorderedAdverbs: totalReorderedAdverbs,
    adverbChains: chains.length,
    reorderedChains
  };
}