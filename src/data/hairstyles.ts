import { Hairstyle } from '@/types/looksee';

export const HAIRSTYLES: Hairstyle[] = [
  {
    id: 'fade-classic',
    name: 'Classic Fade',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=533&fit=crop',
    description: 'Timeless fade with clean lines and gradual transition',
    tags: ['fade', 'classic', 'professional'],
    suitableFor: {
      hairTypes: ['straight', 'wavy'],
      hairLengths: ['short', 'medium'],
      faceShapes: ['oval', 'square', 'round'],
      hairDensity: ['medium', 'high'],
    },
  },
  {
    id: 'pompadour',
    name: 'Modern Pompadour',
    image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=400&h=533&fit=crop',
    description: 'Voluminous top with slicked sides, modern twist on classic style',
    tags: ['volume', 'classic', 'bold'],
    suitableFor: {
      hairTypes: ['straight', 'wavy'],
      hairLengths: ['medium', 'long'],
      faceShapes: ['oval', 'rectangle'],
      hairDensity: ['medium', 'high'],
    },
  },
  {
    id: 'textured-crop',
    name: 'Textured Crop',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=533&fit=crop',
    description: 'Messy, textured top with short sides for a casual look',
    tags: ['textured', 'casual', 'modern'],
    suitableFor: {
      hairTypes: ['straight', 'wavy', 'curly'],
      hairLengths: ['short', 'medium'],
      faceShapes: ['oval', 'square', 'heart'],
      hairDensity: ['low', 'medium', 'high'],
    },
  },
  {
    id: 'buzz-cut',
    name: 'Buzz Cut',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=533&fit=crop',
    description: 'Ultra-short, low maintenance style',
    tags: ['minimal', 'clean', 'easy'],
    suitableFor: {
      hairTypes: ['straight', 'wavy', 'curly'],
      hairLengths: ['short'],
      faceShapes: ['oval', 'square'],
      hairDensity: ['low', 'medium', 'high'],
    },
  },
  {
    id: 'slick-back',
    name: 'Slick Back',
    image: 'https://images.unsplash.com/photo-1584367555381-35e6ff20619a?w=400&h=533&fit=crop',
    description: 'Smooth, combed back style with polished finish',
    tags: ['formal', 'sleek', 'professional'],
    suitableFor: {
      hairTypes: ['straight'],
      hairLengths: ['medium', 'long'],
      faceShapes: ['oval', 'rectangle'],
      hairDensity: ['medium', 'high'],
    },
  },
  {
    id: 'curly-top',
    name: 'Curly Top Fade',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=533&fit=crop',
    description: 'Natural curls on top with faded sides',
    tags: ['curly', 'natural', 'trendy'],
    suitableFor: {
      hairTypes: ['curly'],
      hairLengths: ['short', 'medium'],
      faceShapes: ['oval', 'round', 'heart'],
      hairDensity: ['medium', 'high'],
    },
  },
  {
    id: 'undercut',
    name: 'Disconnected Undercut',
    image: 'https://images.unsplash.com/photo-1593702288056-f5834cfcb453?w=400&h=533&fit=crop',
    description: 'Bold contrast between long top and shaved sides',
    tags: ['bold', 'modern', 'edgy'],
    suitableFor: {
      hairTypes: ['straight', 'wavy'],
      hairLengths: ['medium', 'long'],
      faceShapes: ['oval', 'square', 'rectangle'],
      hairDensity: ['medium', 'high'],
    },
  },
  {
    id: 'quiff',
    name: 'Modern Quiff',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=533&fit=crop',
    description: 'Voluminous front with tapered sides',
    tags: ['volume', 'trendy', 'versatile'],
    suitableFor: {
      hairTypes: ['straight', 'wavy'],
      hairLengths: ['medium'],
      faceShapes: ['oval', 'round', 'square'],
      hairDensity: ['medium', 'high'],
    },
  },
  {
    id: 'crew-cut',
    name: 'Crew Cut',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=533&fit=crop',
    description: 'Short, uniform length with slightly longer top',
    tags: ['classic', 'military', 'clean'],
    suitableFor: {
      hairTypes: ['straight', 'wavy'],
      hairLengths: ['short'],
      faceShapes: ['oval', 'square', 'round'],
      hairDensity: ['low', 'medium', 'high'],
    },
  },
  {
    id: 'side-part',
    name: 'Classic Side Part',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=533&fit=crop',
    description: 'Timeless, professional style with defined part',
    tags: ['classic', 'professional', 'formal'],
    suitableFor: {
      hairTypes: ['straight', 'wavy'],
      hairLengths: ['medium'],
      faceShapes: ['oval', 'rectangle', 'heart'],
      hairDensity: ['medium', 'high'],
    },
  },
  {
    id: 'mullet-modern',
    name: 'Modern Mullet',
    image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400&h=533&fit=crop',
    description: 'Trendy take on the classic with textured layers',
    tags: ['trendy', 'bold', 'retro'],
    suitableFor: {
      hairTypes: ['straight', 'wavy', 'curly'],
      hairLengths: ['medium', 'long'],
      faceShapes: ['oval', 'round'],
      hairDensity: ['medium', 'high'],
    },
  },
  {
    id: 'french-crop',
    name: 'French Crop',
    image: 'https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=400&h=533&fit=crop',
    description: 'Textured fringe with short back and sides',
    tags: ['european', 'textured', 'modern'],
    suitableFor: {
      hairTypes: ['straight', 'wavy'],
      hairLengths: ['short', 'medium'],
      faceShapes: ['oval', 'square', 'heart'],
      hairDensity: ['medium', 'high'],
    },
  },
];

export const getEligibleHairstyles = (
  hairType: string,
  hairLength: string,
  hairDensity: string
): { eligible: Hairstyle[]; ineligible: Hairstyle[] } => {
  const eligible: Hairstyle[] = [];
  const ineligible: Hairstyle[] = [];

  HAIRSTYLES.forEach((style) => {
    const typeMatch = style.suitableFor.hairTypes.includes(hairType);
    const lengthMatch = style.suitableFor.hairLengths.includes(hairLength);
    const densityMatch = style.suitableFor.hairDensity.includes(hairDensity);

    if (typeMatch && (lengthMatch || densityMatch)) {
      eligible.push(style);
    } else {
      ineligible.push(style);
    }
  });

  return { eligible, ineligible };
};
