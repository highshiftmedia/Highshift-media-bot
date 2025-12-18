
// FIX: Import React to make React.ReactNode available.
import React from 'react';

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  externalUrl?: string;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

export interface Question {
  text: string;
  options: string[];
}

export enum AppState {
  SERVICE_SELECTION,
  CHAT,
  BOOKING,
  SNAKE_GAME,
  BUSINESS_PLAN,
  VOICE_AGENT,
}
