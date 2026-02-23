import { useState, useEffect, useRef } from 'react';
import { HairAnalysis, CustomerSession } from '@/types/looksee';
import { useHairAnalysis } from '@/hooks/useHairAnalysis';
import { Loader2, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface AnalysisLoaderProps {
  photos: CustomerSession['photos'];
  onComplete: (analysis: HairAnalysis) => void;
}

const analysisSteps = [
  { label: 'Detecting face and hair region', duration: 1500 },
  { label: 'Analyzing hair type and texture', duration: 2000 },
  { label: 'Measuring hair density', duration: 1500 },
  { label: 'Evaluating hairline condition', duration: 1500 },
  { label: 'Matching suitable hairstyles', duration: 2000 },
];

const AnalysisLoader = ({ photos, onComplete }: AnalysisLoaderProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [failed, setFailed] = useState(false);
  const { analyzeHair, error } = useHairAnalysis();
  const analysisStarted = useRef(false);
  const analysisResult = useRef<HairAnalysis | null>(null);

  // Start AI analysis on mount
  useEffect(() => {
    if (analysisStarted.current) return;
    analysisStarted.current = true;

    analyzeHair(photos).then((result) => {
      if (result) {
        analysisResult.current = result;
      } else {
        setFailed(true);
      }
    });
  }, [photos, analyzeHair]);

  // Animate steps progressively
  useEffect(() => {
    if (failed) return;
    if (currentStep >= analysisSteps.length) {
      // Steps done — wait for AI result or deliver it
      const check = () => {
        if (analysisResult.current) {
          onComplete(analysisResult.current);
        } else if (failed) {
          // already handled
        } else {
          setTimeout(check, 500);
        }
      };
      setTimeout(check, 500);
      return;
    }

    const timer = setTimeout(() => {
      setCompletedSteps((prev) => [...prev, currentStep]);
      setCurrentStep((prev) => prev + 1);
    }, analysisSteps[currentStep].duration);

    return () => clearTimeout(timer);
  }, [currentStep, onComplete, failed]);

  // Show error toast
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleRetry = () => {
    setFailed(false);
    setCurrentStep(0);
    setCompletedSteps([]);
    analysisStarted.current = false;
    analysisResult.current = null;
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="card-elevated p-8 max-w-lg w-full text-center space-y-8">
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
          <div className="absolute inset-2 rounded-full bg-primary/30 animate-pulse" />
          <div className="absolute inset-4 rounded-full bg-gradient-to-r from-primary to-amber-600 flex items-center justify-center">
            {failed ? (
              <AlertCircle className="w-8 h-8 text-primary-foreground" />
            ) : (
              <Sparkles className="w-8 h-8 text-primary-foreground animate-pulse" />
            )}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-bold mb-2">
            {failed ? 'Analysis Failed' : 'Analyzing Hair'}
          </h2>
          <p className="text-muted-foreground">
            {failed
              ? 'Something went wrong during analysis. Please try again.'
              : 'Our AI is examining the photos to determine the best hairstyles'}
          </p>
        </div>

        {!failed && (
          <div className="space-y-3 text-left">
            {analysisSteps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                  completedSteps.includes(index)
                    ? 'bg-primary/10'
                    : index === currentStep
                    ? 'bg-secondary'
                    : 'opacity-50'
                }`}
              >
                {completedSteps.includes(index) ? (
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                ) : index === currentStep ? (
                  <Loader2 className="w-5 h-5 text-primary animate-spin shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 shrink-0" />
                )}
                <span
                  className={
                    completedSteps.includes(index) || index === currentStep
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {failed ? (
          <Button onClick={handleRetry} className="gap-2">
            Try Again
          </Button>
        ) : (
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-amber-600 transition-all duration-500"
              style={{ width: `${(completedSteps.length / analysisSteps.length) * 100}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisLoader;
