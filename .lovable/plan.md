
# Plan: Implement Real AI Hair Analysis

## Problem Summary
The hair analysis component currently returns **hardcoded mock data** instead of actually analyzing the customer's photos. This defeats the purpose of the eligibility filtering system.

## Solution
Create a new edge function that uses **Google Gemini** to analyze all 6 uploaded photos and return accurate hair attributes (type, length, density, etc.).

---

## Implementation Steps

### Step 1: Create Hair Analysis Edge Function

Create `supabase/functions/analyze-hair/index.ts` that:
- Accepts all 6 customer photos (front, top, left, right, back, closeup)
- Sends them to **google/gemini-2.5-flash** (the text+vision model, NOT the image generation model)
- Uses structured output (tool calling) to extract hair attributes
- Returns proper `HairAnalysis` object

The model choice:
- **Analysis**: `google/gemini-2.5-flash` (multimodal vision - can analyze images and return structured data)
- **Generation**: `google/gemini-2.5-flash-image` (Nano Banana - creates new images)

### Step 2: Create Analysis Hook

Create `src/hooks/useHairAnalysis.ts` to:
- Invoke the new edge function
- Handle loading, error, and success states
- Return the parsed `HairAnalysis` result

### Step 3: Update AnalysisLoader Component

Modify `src/components/AnalysisLoader.tsx` to:
- Accept photos as a prop
- Call the real AI analysis on mount
- Map actual AI processing stages to the UI steps
- Return the real analysis result instead of mock data

### Step 4: Update Supabase Config

Add the new `analyze-hair` function to `supabase/config.toml`

---

## Technical Details

### AI Prompt Strategy

The analysis prompt will ask Gemini to examine the photos and identify:
- Hair type (straight/wavy/curly) - primarily from closeup and side photos
- Hair length (short/medium/long) - from all angles
- Hair color - from well-lit photos
- Hair density (low/medium/high) - from top view
- Hair thickness (thin/medium/thick) - from closeup
- Scalp visibility - from top view
- Hairline condition - from front photo

### Structured Output

Use Gemini's function calling to ensure consistent JSON response:

```typescript
tools: [{
  type: "function",
  function: {
    name: "hair_analysis",
    parameters: {
      type: "object",
      properties: {
        hairType: { type: "string", enum: ["straight", "wavy", "curly"] },
        hairLength: { type: "string", enum: ["short", "medium", "long"] },
        // ... other attributes
      }
    }
  }
}]
```

### Error Handling

- Graceful fallback if analysis fails
- Retry option for users
- Clear error messages

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `supabase/functions/analyze-hair/index.ts` | Create |
| `src/hooks/useHairAnalysis.ts` | Create |
| `src/components/AnalysisLoader.tsx` | Modify |
| `supabase/config.toml` | Modify |
| `src/components/BarberDashboard.tsx` | Minor update to pass photos |

---

## Expected Outcome

After implementation:
- Real AI analysis of customer photos
- Accurate hair attribute detection
- Meaningful hairstyle eligibility filtering
- Each customer gets personalized recommendations based on their actual hair
