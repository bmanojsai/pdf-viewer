import { z } from 'zod';

const envSchema = z.object({
  VITE_GEMINI_API_KEY: z.string().min(1),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  console.warn(
    '[env] VITE_GEMINI_API_KEY is not set — AI extraction will be skipped, mock data will be used.\n' +
      'Copy .env.example to .env and add your key from https://aistudio.google.com/apikey'
  );
}

/** Validated env vars. `null` when VITE_GEMINI_API_KEY is missing. */
export const env = parsed.success ? parsed.data : null;

/** True only when a valid Gemini API key is present. */
export const hasGeminiKey = parsed.success;
