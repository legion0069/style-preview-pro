import { useState, useCallback } from 'react';
import { CustomerSession, HairAnalysis, PhotoType, Hairstyle } from '@/types/looksee';

const initialSession: CustomerSession = {
  id: crypto.randomUUID(),
  photos: {
    front: null,
    top: null,
    left: null,
    right: null,
    back: null,
    closeup: null,
  },
  analysis: null,
  selectedHairstyle: null,
  generatedPreview: null,
};

export const useCustomerSession = () => {
  const [session, setSession] = useState<CustomerSession>(initialSession);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const updatePhoto = useCallback((type: PhotoType, dataUrl: string) => {
    setSession((prev) => ({
      ...prev,
      photos: {
        ...prev.photos,
        [type]: dataUrl,
      },
    }));
  }, []);

  const removePhoto = useCallback((type: PhotoType) => {
    setSession((prev) => ({
      ...prev,
      photos: {
        ...prev.photos,
        [type]: null,
      },
    }));
  }, []);

  const allPhotosUploaded = useCallback(() => {
    return Object.values(session.photos).every((photo) => photo !== null);
  }, [session.photos]);

  const getUploadedCount = useCallback(() => {
    return Object.values(session.photos).filter((photo) => photo !== null).length;
  }, [session.photos]);

  const setAnalysis = useCallback((analysis: HairAnalysis) => {
    setSession((prev) => ({
      ...prev,
      analysis,
    }));
  }, []);

  const selectHairstyle = useCallback((hairstyle: Hairstyle) => {
    setSession((prev) => ({
      ...prev,
      selectedHairstyle: hairstyle,
      generatedPreview: null,
    }));
  }, []);

  const setGeneratedPreview = useCallback((preview: string) => {
    setSession((prev) => ({
      ...prev,
      generatedPreview: preview,
    }));
  }, []);

  const resetSession = useCallback(() => {
    setSession({
      ...initialSession,
      id: crypto.randomUUID(),
    });
  }, []);

  return {
    session,
    isAnalyzing,
    setIsAnalyzing,
    isGenerating,
    setIsGenerating,
    updatePhoto,
    removePhoto,
    allPhotosUploaded,
    getUploadedCount,
    setAnalysis,
    selectHairstyle,
    setGeneratedPreview,
    resetSession,
  };
};
