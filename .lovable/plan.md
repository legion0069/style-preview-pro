

# Add Demo Images to Hairstyle Gallery

## Problem
The hairstyle selection gallery currently shows a placeholder emoji instead of actual reference images. The `public/hairstyles/` directory is empty, and no real images exist for the 12 defined hairstyles.

## Solution
Use high-quality, royalty-free stock images from Unsplash as demo reference photos for each hairstyle. Replace the placeholder emoji cards with proper image cards showing what each style looks like.

## Implementation Steps

### Step 1: Update hairstyle data with Unsplash image URLs
Modify `src/data/hairstyles.ts` to replace the local `/hairstyles/*.jpg` paths with Unsplash image URLs for each of the 12 hairstyles (Classic Fade, Modern Pompadour, Textured Crop, Buzz Cut, Slick Back, Curly Top Fade, Disconnected Undercut, Modern Quiff, Crew Cut, Classic Side Part, Modern Mullet, French Crop).

### Step 2: Update HairstyleGallery component
Modify `src/components/HairstyleGallery.tsx` to:
- Replace the gradient placeholder + emoji with an actual `<img>` tag loading the hairstyle image
- Add a fallback state (e.g. a subtle icon) in case the image fails to load
- Show the image filling the card's `aspect-[3/4]` area with `object-cover`
- Apply the same treatment to both eligible and ineligible hairstyle cards

## Files to Modify

| File | Change |
|------|--------|
| `src/data/hairstyles.ts` | Replace local image paths with Unsplash URLs |
| `src/components/HairstyleGallery.tsx` | Replace emoji placeholders with `<img>` elements |

## Result
Each hairstyle card will display a real reference photo of that style, making it much easier for barbers and customers to visually compare and select the right hairstyle before generating the AI preview.

