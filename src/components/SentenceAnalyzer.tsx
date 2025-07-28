import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AdjectiveClassifier } from '@/utils/adjectiveClassifier';
import { AdjectiveHighlight } from './AdjectiveHighlight';
import { ArrowRight, Sparkles, CheckCircle, XCircle, BarChart3, FileText } from 'lucide-react';

interface AnalysisResult {
  original: string;
  corrected: string;
  changes: boolean;
  totalAdjectives: number;
  reorderedAdjectives: number;
  adjectiveChains: number;
  reorderedChains: number;
  adjectives: Array<{ word: string; category: any; position: number }>;
}

interface BulkAnalysisResult {
  sentences: AnalysisResult[];
  summary: {
    totalSentences: number;
    sentencesWithChanges: number;
    totalAdjectives: number;
    totalReorderedAdjectives: number;
    totalChains: number;
    totalReorderedChains: number;
  };
}

export function SentenceAnalyzer() {
  const [inputText, setInputText] = useState('');
  const [bulkText, setBulkText] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [bulkResult, setBulkResult] = useState<BulkAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('single');

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

  const analyzeBulkText = async () => {
    if (!bulkText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const bulkResult = classifier.analyzeMultipleSentences(bulkText);
    setBulkResult(bulkResult);
    
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

  const renderStatistics = (data: AnalysisResult) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
      <div className="text-center">
        <div className="text-2xl font-bold text-scholar-blue">{data.totalAdjectives}</div>
        <div className="text-sm text-muted-foreground">Total Adjectives</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-destructive">{data.reorderedAdjectives}</div>
        <div className="text-sm text-muted-foreground">Needed Reordering</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-scholar-blue">{data.adjectiveChains}</div>
        <div className="text-sm text-muted-foreground">Adjective Chains</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-destructive">{data.reorderedChains}</div>
        <div className="text-sm text-muted-foreground">Chains Reordered</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="single" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Single Sentence
          </TabsTrigger>
          <TabsTrigger value="bulk" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Bulk Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="single" className="space-y-6">
          {/* Single Sentence Input */}
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
        </TabsContent>

        <TabsContent value="bulk" className="space-y-6">
          {/* Bulk Analysis Input */}
          <Card className="p-6 shadow-card bg-gradient-card">
            <h2 className="text-xl font-semibold text-foreground mb-4">Bulk Sentence Analysis</h2>
            <div className="space-y-4">
              <Textarea
                placeholder="Enter multiple sentences or paragraphs... Each sentence will be analyzed separately for adjective order."
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                className="min-h-[150px] resize-none"
              />
              <Button 
                onClick={analyzeBulkText}
                disabled={!bulkText.trim() || isAnalyzing}
                className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analyze All Sentences
                  </>
                )}
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Single Sentence Results */}
      {result && activeTab === 'single' && (
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

          {/* Statistics */}
          {renderStatistics(result)}

          <div className="space-y-6 mt-6">
            {/* Original Sentence */}
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Original Sentence:</h4>
              <div className="p-4 bg-muted/50 rounded-lg border text-lg leading-relaxed">
                {highlightAdjectives(result.original, result.adjectives)}
              </div>
            </div>

            {/* Arrow and Corrected Sentence (only if changes were made) */}
            {result.changes ? (
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
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-800 font-medium">This sentence already has perfect adjective order!</span>
                </div>
              </div>
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

      {/* Bulk Analysis Results */}
      {bulkResult && activeTab === 'bulk' && (
        <div className="space-y-6">
          {/* Summary Statistics */}
          <Card className="p-6 shadow-elegant bg-gradient-card animate-fade-in">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-scholar-blue" />
              <h3 className="text-lg font-semibold text-foreground">Bulk Analysis Summary</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-scholar-blue">{bulkResult.summary.totalSentences}</div>
                <div className="text-sm text-muted-foreground">Sentences</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-destructive">{bulkResult.summary.sentencesWithChanges}</div>
                <div className="text-sm text-muted-foreground">Needed Fixing</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-scholar-blue">{bulkResult.summary.totalAdjectives}</div>
                <div className="text-sm text-muted-foreground">Total Adjectives</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-destructive">{bulkResult.summary.totalReorderedAdjectives}</div>
                <div className="text-sm text-muted-foreground">Reordered</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-scholar-blue">{bulkResult.summary.totalChains}</div>
                <div className="text-sm text-muted-foreground">Total Chains</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-destructive">{bulkResult.summary.totalReorderedChains}</div>
                <div className="text-sm text-muted-foreground">Chains Fixed</div>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="text-scholar-blue border-scholar-blue">
                {((bulkResult.summary.totalSentences - bulkResult.summary.sentencesWithChanges) / bulkResult.summary.totalSentences * 100).toFixed(1)}% Perfect
              </Badge>
              <Badge variant="outline" className="text-destructive border-destructive">
                {(bulkResult.summary.totalReorderedAdjectives / Math.max(bulkResult.summary.totalAdjectives, 1) * 100).toFixed(1)}% Adjectives Reordered
              </Badge>
            </div>
          </Card>

          {/* Individual Sentence Results */}
          <div className="space-y-4">
            {bulkResult.sentences.map((sentence, index) => (
              <Card key={index} className="p-4 shadow-card bg-gradient-card">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-foreground">Sentence {index + 1}</h4>
                  <div className="flex items-center gap-2">
                    {sentence.changes ? (
                      <Badge variant="destructive" className="text-xs">Corrected</Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">Perfect</Badge>
                    )}
                  </div>
                </div>
                
                {/* Mini Statistics */}
                <div className="grid grid-cols-4 gap-2 mb-4 text-xs">
                  <div className="text-center p-2 bg-muted/20 rounded">
                    <div className="font-semibold">{sentence.totalAdjectives}</div>
                    <div className="text-muted-foreground">Adj</div>
                  </div>
                  <div className="text-center p-2 bg-muted/20 rounded">
                    <div className="font-semibold text-destructive">{sentence.reorderedAdjectives}</div>
                    <div className="text-muted-foreground">Fixed</div>
                  </div>
                  <div className="text-center p-2 bg-muted/20 rounded">
                    <div className="font-semibold">{sentence.adjectiveChains}</div>
                    <div className="text-muted-foreground">Chains</div>
                  </div>
                  <div className="text-center p-2 bg-muted/20 rounded">
                    <div className="font-semibold text-destructive">{sentence.reorderedChains}</div>
                    <div className="text-muted-foreground">C-Fixed</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Original:</div>
                    <div className="p-3 bg-muted/50 rounded text-sm">
                      {highlightAdjectives(sentence.original, sentence.adjectives)}
                    </div>
                  </div>
                  
                  {sentence.changes ? (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Corrected:</div>
                      <div className="p-3 bg-scholar-blue/10 rounded border border-scholar-blue/20 text-sm">
                        {highlightAdjectives(sentence.corrected, sentence.adjectives)}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-2 bg-green-50 rounded text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-800">Already perfect!</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}