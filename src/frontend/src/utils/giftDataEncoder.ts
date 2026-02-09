import type { QuizItem } from '../types/gift';

export interface DecodedGiftData {
  partnerName: string;
  senderName: string;
  email: string;
  loveMessage: string;
  endingMessage: string;
  quizItems: QuizItem[];
  hiddenMessages: string[];
  photoNotes: string[];
}

export function encodeGiftData(data: DecodedGiftData): string {
  return JSON.stringify(data);
}

export function decodeGiftData(encoded: string): DecodedGiftData | null {
  try {
    const parsed = JSON.parse(encoded);
    return {
      partnerName: parsed.partnerName || '',
      senderName: parsed.senderName || '',
      email: parsed.email || '',
      loveMessage: parsed.loveMessage || '',
      endingMessage: parsed.endingMessage || '',
      quizItems: parsed.quizItems || [],
      hiddenMessages: parsed.hiddenMessages || [],
      photoNotes: parsed.photoNotes || [],
    };
  } catch (error) {
    console.error('Failed to decode gift data:', error);
    return null;
  }
}
