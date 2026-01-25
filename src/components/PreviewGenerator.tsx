import { useState, useEffect } from 'react';
import { Hairstyle } from '@/types/looksee';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, Sparkles, Star, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PreviewGeneratorProps {
  hairstyle: Hairstyle;
  frontPhoto: string;
  onBack: () => void;
  onTryAnother: () => void;
}

const PreviewGenerator = ({
  hairstyle,
  frontPhoto,
  onBack,
  onTryAnother,
}: PreviewGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [rating] = useState(4.5);

  useEffect(() => {
    // Simulate AI generation
    const timer = setTimeout(() => {
      setIsGenerating(false);
      // Use the front photo as a placeholder for the "generated" image
      setGeneratedImage(frontPhoto);
    }, 3000);

    return () => clearTimeout(timer);
  }, [frontPhoto]);

  if (isGenerating) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="card-elevated p-8 max-w-lg w-full text-center space-y-6">
          <div className="relative mx-auto w-32 h-32">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
            <img
              src={frontPhoto}
              alt="Processing"
              className="absolute inset-4 w-24 h-24 object-cover rounded-full border-4 border-primary"
            />
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold mb-2">
              Generating Preview
            </h2>
            <p className="text-muted-foreground">
              Applying <span className="text-primary font-medium">{hairstyle.name}</span> to your photo
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-primary">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>AI is working its magic...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to Styles
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Generated Preview */}
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden gold-glow">
            <img
              src={generatedImage || frontPhoto}
              alt="Generated Preview"
              className="w-full aspect-[3/4] object-cover"
            />
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground text-sm font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              AI Generated
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h2 className="font-serif text-3xl font-bold mb-2">{hairstyle.name}</h2>
            <p className="text-muted-foreground">{hairstyle.description}</p>
          </div>

          {/* Rating */}
          <div className="card-elevated p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Suitability Score</span>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        'w-5 h-5',
                        star <= Math.floor(rating)
                          ? 'fill-primary text-primary'
                          : star === Math.ceil(rating)
                          ? 'fill-primary/50 text-primary'
                          : 'text-muted-foreground'
                      )}
                    />
                  ))}
                </div>
                <span className="font-bold text-lg">{rating}/5</span>
              </div>
            </div>
          </div>

          {/* AI Explanation */}
          <div className="card-elevated p-4 space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              AI Analysis
            </h4>
            <p className="text-sm text-muted-foreground">
              This hairstyle complements your face shape and hair texture. The {hairstyle.name.toLowerCase()} 
              works well with your {'{hair density}'} hair density and {'{hair type}'} hair type, 
              creating a balanced and stylish look.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {hairstyle.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground capitalize"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button variant="gold" size="lg" className="flex-1">
              Proceed with this Style
            </Button>
            <Button variant="outline" size="lg" onClick={onTryAnother} className="flex-1 gap-2">
              <RefreshCw className="w-4 h-4" />
              Try Another
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewGenerator;
