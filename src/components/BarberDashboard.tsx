import { useState } from 'react';
import { useCustomerSession } from '@/hooks/useCustomerSession';
import { HairAnalysis, Hairstyle, PhotoType } from '@/types/looksee';
import Logo from '@/components/Logo';
import PhotoUploadGrid from '@/components/PhotoUploadGrid';
import AnalysisLoader from '@/components/AnalysisLoader';
import HairstyleGallery from '@/components/HairstyleGallery';
import PreviewGenerator from '@/components/PreviewGenerator';
import { Button } from '@/components/ui/button';
import { LogOut, RotateCcw } from 'lucide-react';

type DashboardStep = 'upload' | 'analyzing' | 'gallery' | 'preview';

interface BarberDashboardProps {
  onLogout: () => void;
}

const BarberDashboard = ({ onLogout }: BarberDashboardProps) => {
  const [step, setStep] = useState<DashboardStep>('upload');
  const {
    session,
    updatePhoto,
    removePhoto,
    getUploadedCount,
    setAnalysis,
    selectHairstyle,
    resetSession,
  } = useCustomerSession();

  const handleSubmitPhotos = () => {
    setStep('analyzing');
  };

  const handleAnalysisComplete = (analysis: HairAnalysis) => {
    setAnalysis(analysis);
    setStep('gallery');
  };

  const handleSelectHairstyle = (hairstyle: Hairstyle) => {
    selectHairstyle(hairstyle);
    setStep('preview');
  };

  const handleBackToGallery = () => {
    setStep('gallery');
  };

  const handleStartNewSession = () => {
    resetSession();
    setStep('upload');
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo size="sm" />
            
            <div className="flex items-center gap-3">
              {step !== 'upload' && (
                <Button variant="ghost" size="sm" onClick={handleStartNewSession} className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  New Session
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={onLogout} className="gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Step Indicator */}
        {step !== 'analyzing' && (
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2">
              {['Upload', 'Analysis', 'Select', 'Preview'].map((label, index) => {
                const stepIndex = ['upload', 'analyzing', 'gallery', 'preview'].indexOf(step);
                const isActive = index === stepIndex;
                const isCompleted = index < stepIndex;

                return (
                  <div key={label} className="flex items-center">
                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : isCompleted
                          ? 'bg-primary/20 text-primary'
                          : 'bg-secondary text-muted-foreground'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium border-2 border-current">
                        {index + 1}
                      </span>
                      <span className="hidden sm:inline text-sm font-medium">{label}</span>
                    </div>
                    {index < 3 && (
                      <div className={`w-8 h-0.5 mx-1 ${isCompleted ? 'bg-primary' : 'bg-border'}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Content based on step */}
        {step === 'upload' && (
          <div className="max-w-4xl mx-auto animate-fade-up">
            <div className="text-center mb-8">
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">
                Customer Photo Upload
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Capture 6 photos of your customer from different angles for accurate hair analysis
              </p>
            </div>
            <PhotoUploadGrid
              photos={session.photos}
              onUpload={updatePhoto}
              onRemove={removePhoto}
              uploadedCount={getUploadedCount()}
              onSubmit={handleSubmitPhotos}
            />
          </div>
        )}

        {step === 'analyzing' && (
          <AnalysisLoader photos={session.photos} onComplete={handleAnalysisComplete} />
        )}

        {step === 'gallery' && session.analysis && (
          <div className="max-w-6xl mx-auto animate-fade-up">
            <div className="text-center mb-8">
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">
                Choose a Hairstyle
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Based on the analysis, we've identified the best hairstyles for your customer
              </p>
            </div>
            <HairstyleGallery
              analysis={session.analysis}
              onSelect={handleSelectHairstyle}
            />
          </div>
        )}

        {step === 'preview' && session.selectedHairstyle && session.photos.front && (
          <div className="max-w-4xl mx-auto animate-fade-up">
            <PreviewGenerator
              hairstyle={session.selectedHairstyle}
              frontPhoto={session.photos.front}
              onBack={handleBackToGallery}
              onTryAnother={handleBackToGallery}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default BarberDashboard;
