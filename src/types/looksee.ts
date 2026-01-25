export interface Hairstyle {
  id: string;
  name: string;
  image: string;
  description: string;
  tags: string[];
  suitableFor: {
    hairTypes: string[];
    hairLengths: string[];
    faceShapes: string[];
    hairDensity: string[];
  };
}

export interface HairAnalysis {
  hairType: 'straight' | 'wavy' | 'curly';
  hairLength: 'short' | 'medium' | 'long';
  hairColor: string;
  hairDensity: 'low' | 'medium' | 'high';
  hairThickness: 'thin' | 'medium' | 'thick';
  scalpVisibility: 'visible' | 'partially_visible' | 'not_visible';
  hairlineCondition: 'receding' | 'normal' | 'mature';
  overallScore: number;
}

export interface CustomerSession {
  id: string;
  photos: {
    front: string | null;
    top: string | null;
    left: string | null;
    right: string | null;
    back: string | null;
    closeup: string | null;
  };
  analysis: HairAnalysis | null;
  selectedHairstyle: Hairstyle | null;
  generatedPreview: string | null;
}

export type PhotoType = 'front' | 'top' | 'left' | 'right' | 'back' | 'closeup';

export const PHOTO_REQUIREMENTS: Record<PhotoType, { label: string; description: string; icon: string }> = {
  front: {
    label: 'Front Face',
    description: 'Face clearly visible, looking straight at camera',
    icon: '👤',
  },
  top: {
    label: 'Top View',
    description: 'Hair density and crown area visible',
    icon: '⬆️',
  },
  left: {
    label: 'Left Side',
    description: 'Left profile of head and hair',
    icon: '◀️',
  },
  right: {
    label: 'Right Side',
    description: 'Right profile of head and hair',
    icon: '▶️',
  },
  back: {
    label: 'Back View',
    description: 'Back of head showing neckline',
    icon: '🔙',
  },
  closeup: {
    label: 'Hair Close-up',
    description: 'Detailed texture and thickness view',
    icon: '🔍',
  },
};
