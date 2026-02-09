export interface PhotoWithNote {
  file: File;
  note: string;
  preview: string;
}

export interface QuizItem {
  question: string;
  answer: string;
}

export interface GiftFormData {
  partnerName: string;
  senderName: string;
  email: string;
  specialDate: string;
  bannerImage: File | null;
  photos: PhotoWithNote[];
  loveMessage: string;
  endingMessage: string;
  quizItems: QuizItem[];
  hiddenMessages: string[];
}
