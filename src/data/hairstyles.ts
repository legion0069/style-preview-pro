import { Hairstyle } from '@/types/looksee';

export const HAIRSTYLES: Hairstyle[] = [
  {
    id: 'fade-classic',
    name: 'Classic Fade',
    image: '/hairstyles/fade-classic.jpg',
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
    image: '/hairstyles/pompadour.jpg',
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
    image: '/hairstyles/textured-crop.jpg',
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
    image: '/hairstyles/buzz-cut.jpg',
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
    image: '/hairstyles/slick-back.jpg',
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
    image: '/hairstyles/curly-top.jpg',
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
    image: '/hairstyles/undercut.jpg',
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
    image: '/hairstyles/quiff.jpg',
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
    image: '/hairstyles/crew-cut.jpg',
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
    image: '/hairstyles/side-part.jpg',
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
    image: '/hairstyles/mullet.jpg',
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
    image: '/hairstyles/french-crop.jpg',
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
