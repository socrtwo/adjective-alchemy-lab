import { Card } from '@/components/ui/card';
import { CATEGORY_ORDER, CATEGORY_LABELS, CATEGORY_DESCRIPTIONS, AdjectiveCategory } from '@/types/adjective';

const categoryColorMap: Record<AdjectiveCategory, string> = {
  opinion: 'bg-category-opinion',
  size: 'bg-category-size',
  age: 'bg-category-age',
  shape: 'bg-category-shape',
  color: 'bg-category-color',
  origin: 'bg-category-origin',
  material: 'bg-category-material',
  participle: 'bg-category-participle',
  purpose: 'bg-category-purpose'
};

export function CategoryLegend() {
  return (
    <Card className="p-6 shadow-card bg-gradient-card">
      <h3 className="text-lg font-semibold text-foreground mb-4">Royal Adjective Order</h3>
      <div className="space-y-3">
        {CATEGORY_ORDER.map((category, index) => (
          <div key={category} className="flex items-center gap-3">
            <div className="flex items-center gap-2 min-w-[40px]">
              <span className="text-sm font-mono text-muted-foreground">{index + 1}.</span>
              <div className={`w-4 h-4 rounded-full ${categoryColorMap[category]}`} />
            </div>
            <div className="flex-1">
              <div className="font-medium text-foreground">{CATEGORY_LABELS[category]}</div>
              <div className="text-sm text-muted-foreground">{CATEGORY_DESCRIPTIONS[category]}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}