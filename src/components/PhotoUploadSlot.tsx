import { useRef, useState } from 'react';
import { PhotoType, PHOTO_REQUIREMENTS } from '@/types/looksee';
import { Camera, X, Upload, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhotoUploadSlotProps {
  type: PhotoType;
  photo: string | null;
  onUpload: (type: PhotoType, dataUrl: string) => void;
  onRemove: (type: PhotoType) => void;
}

const PhotoUploadSlot = ({ type, photo, onUpload, onRemove }: PhotoUploadSlotProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const requirement = PHOTO_REQUIREMENTS[type];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(type, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(type, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative group">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <div
        onClick={() => !photo && fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-300',
          'border-2 border-dashed',
          photo
            ? 'border-primary/50 gold-glow'
            : isDragging
            ? 'border-primary bg-primary/10'
            : 'border-border hover:border-primary/50 bg-secondary/50',
        )}
      >
        {photo ? (
          <>
            <img
              src={photo}
              alt={requirement.label}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
              <Check className="w-3 h-3 text-primary-foreground" />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(type);
              }}
              className="absolute top-2 left-2 bg-destructive rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/80"
            >
              <X className="w-3 h-3 text-destructive-foreground" />
            </button>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <div className="text-3xl mb-2">{requirement.icon}</div>
            <span className="text-sm font-medium text-foreground mb-1">
              {requirement.label}
            </span>
            <span className="text-xs text-muted-foreground line-clamp-2">
              {requirement.description}
            </span>
            <div className="mt-3 flex items-center gap-1 text-xs text-primary">
              <Upload className="w-3 h-3" />
              <span>Upload</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoUploadSlot;
