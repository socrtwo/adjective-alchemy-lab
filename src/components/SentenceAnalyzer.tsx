import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AdjectiveClassifier } from '@/utils/adjectiveClassifier';
import { AdjectiveHighlight } from './AdjectiveHighlight';
import { ArrowRight, Sparkles, CheckCircle, XCircle } from 'lucide-react';

interface AnalysisResult {
  original: string;
  corrected: string;
  changes: boolean;
  adjectives: Array<{ word: string; category: any; position: number }>;
}

export function SentenceAnalyzer() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const classifier = new AdjectiveClassifier();

  const analyzeSentence = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const reorderResult = classifier.reorderAdjectives(inputText);
    const adjectives = classifier.analyzeSentence(inputText);
    
    setResult({
      ...reorderResult,
      adjectives
    });
    
    setIsAnalyzing(false);
  };

  const highlightAdjectives = (text: string, adjectives: any[]) => {
    if (!adjectives.length) return text;
    
    const words = text.split(/(\s+)/);
    
    return words.map((word, index) => {
      const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
      const adjective = adjectives.find(adj => adj.word === cleanWord);
      
      if (adjective) {
        return (
          <span key={index}>
            <AdjectiveHighlight 
              word={word.trim()} 
              category={adjective.category} 
            />
            {word.includes(' ') && ' '}
          </span>
        );
      }
      
      return word;
    });
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="p-6 shadow-card bg-gradient-card">
        <h2 className="text-xl font-semibold text-foreground mb-4">Enter Your Sentence</h2>
        <div className="space-y-4">
          <Textarea
            placeholder="Type a sentence with multiple adjectives... (e.g., 'She bought a small red beautiful dress')"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          <Button 
            onClick={analyzeSentence}
            disabled={!inputText.trim() || isAnalyzing}
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Analyze Adjective Order
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Results Section */}
      {result && (
        <Card className="p-6 shadow-elegant bg-gradient-card animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
            {result.changes ? (
              <>
                <XCircle className="w-5 h-5 text-destructive" />
                <h3 className="text-lg font-semibold text-foreground">Adjective Order Corrected</h3>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-foreground">Perfect Adjective Order!</h3>
              </>
            )}
          </div>

          <div className="space-y-6">
            {/* Original Sentence */}
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Original Sentence:</h4>
              <div className="p-4 bg-muted/50 rounded-lg border text-lg leading-relaxed">
                {highlightAdjectives(result.original, result.adjectives)}
              </div>
            </div>

            {/* Arrow and Corrected Sentence (only if changes were made) */}
            {result.changes && (
              <>
                <div className="flex justify-center">
                  <ArrowRight className="w-6 h-6 text-scholar-blue animate-slide-in" />
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Corrected Sentence:</h4>
                  <div className="p-4 bg-scholar-blue/10 rounded-lg border border-scholar-blue/20 text-lg leading-relaxed">
                    {highlightAdjectives(result.corrected, result.adjectives)}
                  </div>
                </div>
              </>
            )}

            {/* Adjective Analysis */}
            {result.adjectives.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Adjectives Found:</h4>
                <div className="flex flex-wrap gap-2">
                  {result.adjectives
                    .sort((a, b) => {
                      const orderA = ['opinion', 'size', 'age', 'shape', 'color', 'origin', 'material', 'purpose'].indexOf(a.category);
                      const orderB = ['opinion', 'size', 'age', 'shape', 'color', 'origin', 'material', 'purpose'].indexOf(b.category);
                      return orderA - orderB;
                    })
                    .map((adj, index) => (
                      <AdjectiveHighlight 
                        key={`${adj.word}-${index}`}
                        word={adj.word} 
                        category={adj.category}
                      />
                    ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}