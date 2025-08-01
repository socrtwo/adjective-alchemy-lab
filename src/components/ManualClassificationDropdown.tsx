import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AdjectiveCategory, CATEGORY_LABELS, CATEGORY_DESCRIPTIONS } from '@/types/adjective';
import { HelpCircle, Check } from 'lucide-react';

interface ManualClassificationDropdownProps {
  word: string;
  onClassify: (word: string, category: AdjectiveCategory) => void;
  onSkip: (word: string) => void;
}

export function ManualClassificationDropdown({ word, onClassify, onSkip }: ManualClassificationDropdownProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleClassify = () => {
    if (selectedCategory && selectedCategory !== '') {
      onClassify(word, selectedCategory as AdjectiveCategory);
    }
  };

  return (
    <Card className="p-4 border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800">
      <div className="flex items-start gap-3">
        <HelpCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div>
            <h4 className="font-medium text-amber-900 dark:text-amber-100">
              Unknown adjective: "<span className="font-semibold">{word}</span>"
            </h4>
            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
              Please classify this adjective to continue with proper ordering.
            </p>
          </div>
          
          <div className="space-y-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full bg-white dark:bg-gray-900">
                <SelectValue placeholder="Select category..." />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-900 border shadow-lg z-50">
                {(Object.keys(CATEGORY_LABELS) as AdjectiveCategory[]).map((category) => (
                  <SelectItem key={category} value={category} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{CATEGORY_LABELS[category]}</span>
                      <span className="text-xs text-muted-foreground">
                        {CATEGORY_DESCRIPTIONS[category]}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleClassify}
              disabled={!selectedCategory}
              size="sm"
              className="flex items-center gap-2"
            >
              <Check className="h-4 w-4" />
              Classify
            </Button>
            <Button 
              onClick={() => onSkip(word)}
              variant="outline"
              size="sm"
            >
              Skip
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}