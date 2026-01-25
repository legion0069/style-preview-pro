import { PhotoType } from '@/types/looksee';
import PhotoUploadSlot from '@/components/PhotoUploadSlot';
import { Button } from '@/components/ui/button';
import { Camera, Upload, AlertCircle, ArrowRight } from 'lucide-react';

interface PhotoUploadGridProps {
  photos: Record<PhotoType, string | null>;
  onUpload: (type: PhotoType, dataUrl: string) => void;
  onRemove: (type: PhotoType) => void;
  uploadedCount: number;
  onSubmit: () => void;
}

const PhotoUploadGrid = ({
  photos,
  onUpload,
  onRemove,
  uploadedCount,
  onSubmit,
}: PhotoUploadGridProps) => {
  const photoTypes: PhotoType[] = ['front', 'top', 'left', 'right', 'back', 'closeup'];
  const allUploaded = uploadedCount === 6;

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="card-elevated p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <Camera className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-serif text-xl font-semibold mb-2">Photo Requirements</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                All photos must be taken under proper lighting
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                Face and hair must be clearly visible
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                Avoid blurry or low-quality images
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                Natural hair state preferred (no products)
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Upload Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photoTypes.map((type) => (
          <PhotoUploadSlot
            key={type}
            type={type}
            photo={photos[type]}
            onUpload={onUpload}
            onRemove={onRemove}
          />
        ))}
      </div>

      {/* Progress & Submit */}
      <div className="card-elevated p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  className="fill-none stroke-secondary"
                  strokeWidth="4"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  className="fill-none stroke-primary transition-all duration-500"
                  strokeWidth="4"
                  strokeDasharray={`${(uploadedCount / 6) * 125.6} 125.6`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                {uploadedCount}/6
              </span>
            </div>
            <div>
              <p className="font-medium">
                {allUploaded ? 'All photos uploaded!' : `${6 - uploadedCount} photos remaining`}
              </p>
              <p className="text-sm text-muted-foreground">
                {allUploaded ? 'Ready for analysis' : 'Upload all 6 photos to continue'}
              </p>
            </div>
          </div>

          <Button
            variant="gold"
            size="lg"
            onClick={onSubmit}
            disabled={!allUploaded}
            className="w-full sm:w-auto"
          >
            Submit for Analysis
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploadGrid;
