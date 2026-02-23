import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { HairAnalysis, CustomerSession } from '@/types/looksee';

export const useHairAnalysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeHair = useCallback(async (photos: CustomerSession['photos']): Promise<HairAnalysis | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('analyze-hair', {
        body: { photos },
      });

      if (fnError) {
        throw new Error(fnError.message || 'Analysis failed');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      return data.analysis as HairAnalysis;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to analyze hair';
      setError(message);
      console.error('Hair analysis error:', message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { analyzeHair, isLoading, error };
};
