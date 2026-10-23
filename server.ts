import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { PlanTripRequest, ItineraryResponse } from './src/types/itinerary.ts';
import { generateFallbackItinerary } from './src/lib/karnataka-fallback.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// API Route: Generate Itinerary with Gemini 3.8 Flash
app.post('/api/generate-itinerary', async (req: Request, res: Response) => {
  const { city, days, budget, interests, language } = req.body as PlanTripRequest;

  if (!city || !days || !budget) {
    return res.status(400).json({ error: 'Missing required trip parameters: city, days, or budget.' });
  }

  const sanitizedInterests = Array.isArray(interests) && interests.length > 0 
    ? interests 
    : ['Heritage & Temples', 'Nature & Wildlife', 'Food & Culture'];

  const tripRequest: PlanTripRequest = {
    city: String(city),
    days: Math.min(Math.max(Number(days) || 3, 1), 10),
    budget: Number(budget) || 2000,
    interests: sanitizedInterests,
    language: language === 'kn' ? 'kn' : 'en'
  };

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.warn('GEMINI_API_KEY not configured. Serving curated Karnataka itinerary fallback.');
    const fallbackData = generateFallbackItinerary(tripRequest);
    return res.json(fallbackData);
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `You are Yaatri, an expert AI travel planner for Karnataka, India with deep knowledge of local culture, hidden gems, and authentic experiences.

Generate a detailed personalized travel itinerary. Return ONLY a valid JSON object, no markdown, no explanation.

JSON structure:
{
  "title": "Creative trip title",
  "title_kannada": "ಪ್ರವಾಸದ ಶೀರ್ಷಿಕೆ",
  "summary": "2-sentence overview of the trip",
  "summary_kannada": "2 ವಾಕ್ಯಗಳ ಸಾರಾಂಶ",
  "days": [
    {
      "day": 1,
      "theme": "Day theme in English",
      "theme_kannada": "ದಿನದ ಥೀಮ್",
      "locations": [
        {
          "name": "Place name",
          "name_kannada": "ಸ್ಥಳದ ಹೆಸರು",
          "description": "What to do here, what makes it special (2-3 sentences)",
          "description_kannada": "ಕನ್ನಡದಲ್ಲಿ ವಿವರಣೆ",
          "type": "temple|nature|food|adventure|heritage|shopping|beach|waterfall",
          "duration_hours": 2,
          "estimated_cost_inr": 200,
          "tip": "Local insider tip",
          "tip_kannada": "ಸ್ಥಳೀಯ ಸಲಹೆ",
          "lat": 12.9716,
          "lng": 77.5946
        }
      ],
      "food_recommendation": "Local dish and where to eat it",
      "food_recommendation_kannada": "ಆಹಾರ ಶಿಫಾರಸು",
      "estimated_daily_budget_inr": 1500
    }
  ],
  "total_estimated_budget_inr": 5000,
  "packing_tips": ["tip1", "tip2", "tip3"],
  "packing_tips_kannada": ["ಸಲಹೆ1", "ಸಲಹೆ2"],
  "best_time_to_visit": "October – March",
  "highlights": ["highlight1", "highlight2", "highlight3"]
}

Trip details:
- Starting city: ${tripRequest.city}
- Number of days: ${tripRequest.days}
- Daily budget: ₹${tripRequest.budget}
- Interests: ${tripRequest.interests.join(', ')}
- Include a mix of famous AND lesser-known spots unique to Karnataka
- Always include accurate approximate lat/lng for map markers
- Make it feel like advice from a local friend, not a generic tour guide`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const rawText = response.text?.trim() || '';
    if (!rawText) {
      throw new Error('Empty response from Gemini API');
    }

    // Clean potential markdown wrappers if any
    const cleanJson = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    const parsedData = JSON.parse(cleanJson) as ItineraryResponse;

    // Validate that days exists and has items
    if (!parsedData.days || !Array.isArray(parsedData.days) || parsedData.days.length === 0) {
      throw new Error('Invalid itinerary format returned');
    }

    return res.json(parsedData);
  } catch (error) {
    console.error('Gemini itinerary generation encountered an issue:', error);
    // Graceful fallback to rich curated itinerary so user is never stranded
    const fallbackData = generateFallbackItinerary(tripRequest);
    return res.json(fallbackData);
  }
});

// Full-Stack Server Integration with Vite
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Yaatri server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
