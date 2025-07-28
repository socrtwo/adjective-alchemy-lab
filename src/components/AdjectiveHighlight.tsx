import { AdjectiveCategory, CATEGORY_LABELS } from '@/types/adjective';
import { cn } from '@/lib/utils';

interface AdjectiveHighlightProps {
  word: string;
  category: AdjectiveCategory;
  className?: string;
}

const categoryColorMap: Record<AdjectiveCategory, string> = {
  opinion: 'bg-category-opinion/20 text-black border-category-opinion/30',
  size: 'bg-category-size/20 text-black border-category-size/30',
  age: 'bg-category-age/20 text-black border-category-age/30',
  shape: 'bg-category-shape/20 text-black border-category-shape/30',
  color: 'bg-category-color/20 text-black border-category-color/30',
  origin: 'bg-category-origin/20 text-black border-category-origin/30',
  material: 'bg-category-material/20 text-black border-category-material/30',
  purpose: 'bg-category-purpose/20 text-black border-category-purpose/30'
};

export function AdjectiveHighlight({ word, category, className }: AdjectiveHighlightProps) {
  return (
    <span
      className={cn(
        'inline-block px-2 py-1 rounded-md border text-sm font-medium transition-all duration-200 hover:scale-105',
        categoryColorMap[category],
        className
      )}
      title={`${word} - ${CATEGORY_LABELS[category]}`}
    >
      {word}
    </span>
  );
}