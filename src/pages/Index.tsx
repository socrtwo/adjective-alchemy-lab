import { SentenceAnalyzer } from '@/components/SentenceAnalyzer';
import { CategoryLegend } from '@/components/CategoryLegend';
import { GraduationCap, BookOpen } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-gradient-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <GraduationCap className="w-10 h-10" />
              <h1 className="text-4xl md:text-5xl font-bold">Royal Word Order Analyzer</h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Automatically reorder adjectives and adverbs in sentences according to proper English grammar hierarchy
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-white/80">
              <BookOpen className="w-5 h-5" />
              <span className="text-lg">Adjectives: Opinion → Size → Age → Shape → Color → Origin → Material → Purpose</span>
            </div>
            <div className="flex items-center justify-center gap-2 mt-2 text-white/80">
              <BookOpen className="w-5 h-5" />
              <span className="text-lg">Adverbs: Manner → Place → Frequency → Time → Purpose</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Analyzer - Takes 2/3 width on large screens */}
          <div className="lg:col-span-2">
            <SentenceAnalyzer />
          </div>
          
          {/* Legend - Takes 1/3 width on large screens */}
          <div className="lg:col-span-1">
            <CategoryLegend />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
