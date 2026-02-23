import { Hairstyle, HairAnalysis } from '@/types/looksee';
import { HAIRSTYLES, getEligibleHairstyles } from '@/data/hairstyles';
import { Check, Lock, TrendingUp, Sparkles, Scissors } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useCallback } from 'react';

interface HairstyleGalleryProps {
  analysis: HairAnalysis;
  onSelect: (hairstyle: Hairstyle) => void;
}

const HairstyleImage = ({ src, alt }: { src: string; alt: string }) => {
  const [failed, setFailed] = useState(false);
  const onError = useCallback(() => setFailed(true), []);

  if (failed) {
    return (
      <div className="aspect-[3/4] bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
        <Scissors className="w-10 h-10 text-muted-foreground" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={onError}
      loading="lazy"
      className="aspect-[3/4] w-full object-cover"
    />
  );
};

const HairstyleGallery = ({ analysis, onSelect }: HairstyleGalleryProps) => {
  const { eligible, ineligible } = getEligibleHairstyles(
    analysis.hairType,
    analysis.hairLength,
    analysis.hairDensity
  );

  return (
    <div className="space-y-8">
      {/* Analysis Summary */}
      <div className="card-elevated p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-serif text-xl font-semibold mb-3">Hair Analysis Results</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 rounded-lg bg-secondary">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Type</p>
                <p className="font-medium capitalize">{analysis.hairType}</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Length</p>
                <p className="font-medium capitalize">{analysis.hairLength}</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Density</p>
                <p className="font-medium capitalize">{analysis.hairDensity}</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Score</p>
                <p className="font-medium">{analysis.overallScore}/5</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Eligible Hairstyles */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="font-serif text-xl font-semibold">
            Recommended Styles ({eligible.length})
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {eligible.map((style) => (
            <div
              key={style.id}
              onClick={() => onSelect(style)}
              className={cn(
                'group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300',
                'border-2 border-transparent hover:border-primary gold-glow',
                'hover:scale-[1.02]'
              )}
            >
              <HairstyleImage src={style.image} alt={style.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-sm">{style.name}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {style.description}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                </div>
              </div>
              <div className="absolute top-2 right-2">
                <span className="px-2 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-full">
                  Match
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ineligible Hairstyles */}
      {ineligible.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-serif text-xl font-semibold text-muted-foreground">
              Not Recommended ({ineligible.length})
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ineligible.map((style) => (
              <div
                key={style.id}
                className="relative rounded-xl overflow-hidden opacity-40 grayscale cursor-not-allowed"
              >
                <HairstyleImage src={style.image} alt={style.name} />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent">
                  <h4 className="font-semibold text-sm">{style.name}</h4>
                  <p className="text-xs text-muted-foreground">Not suitable</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="w-8 h-8 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HairstyleGallery;
