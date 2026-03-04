

# Plan: Replace Hairstyle Preview Images with Uploaded Photos

## What
Replace the current Unsplash placeholder images with the user's uploaded hairstyle reference images so customers can clearly see each style before selecting.

## Uploaded Images (10 of 12 styles covered)

| Style | File |
|---|---|
| Classic Fade | `Classic_fade.png` |
| Modern Pompadour | `modern_pompadour.png` |
| Buzz Cut | `buzz_cut.png` |
| Curly Top Fade | `curly_top_fade.png` |
| Disconnected Undercut | `disconnected_undercut.png` |
| Modern Quiff | `modern_quff.png` |
| Crew Cut | `crew_cut.png` |
| Classic Side Part | `classic_side_part.png` |
| Modern Mullet | `modern_mullet.png` |
| French Crop | `french_crop.png` |

**Missing**: Textured Crop, Slick Back — these will keep existing Unsplash images.

## Implementation

1. **Copy all 10 images** to `src/assets/hairstyles/`
2. **`src/data/hairstyles.ts`**: Import each image as an ES6 module and replace the Unsplash URLs in the `image` field for the 10 matching hairstyles

