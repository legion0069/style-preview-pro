import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Hairstyle } from '@/types/looksee';
import { toast } from 'sonner';

interface GenerationResult {
  generatedImage: string;
  aiExplanation: string;
  suitabilityScore: number;
}

export const useHairstyleGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateHairstyle = useCallback(async (
    frontPhoto: string,
    hairstyle: Hairstyle
  ): Promise<GenerationResult | null> => {
    setIsGenerating(true);
    setError(null);
    setResult(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('generate-hairstyle', {
        body: {
          frontPhoto,
          hairstyleName: hairstyle.name,
          hairstyleDescription: hairstyle.description,
        },
      });

      if (functionError) {
        console.error('Function error:', functionError);
        throw new Error(functionError.message || 'Failed to generate hairstyle');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      const generationResult: GenerationResult = {
        generatedImage: data.generatedImage,
        aiExplanation: data.aiExplanation,
        suitabilityScore: data.suitabilityScore,
      };

      setResult(generationResult);
      return generationResult;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate hairstyle preview';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    isGenerating,
    result,
    error,
    generateHairstyle,
    reset,
  };
};
