
import React from 'react';
import type { Service, Question } from './types';

export const BrandLogo = ({ className = "h-32 w-32" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg_grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(56, 189, 248, 0.4)" />
        <stop offset="100%" stopColor="rgba(30, 58, 138, 0.8)" />
      </linearGradient>
      <filter id="glass_blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
      </filter>
    </defs>
    
    <circle cx="256" cy="256" r="230" fill="url(#bg_grad)" stroke="rgba(255,255,255,0.2)" strokeWidth="4"/>
    
    {/* Specular highlight for glass look */}
    <ellipse cx="180" cy="140" rx="60" ry="30" fill="rgba(255,255,255,0.1)" transform="rotate(-30, 180, 140)" />

    {/* Grid Background */}
    <path d="M120 120H392M120 200H392M120 280H392M120 360H392" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
    <path d="M120 120V392M200 120V392M280 120V392M360 120V392" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
    
    {/* Growth Arrow ZigZag with Gloss */}
    <path d="M80 420L150 340L210 380L310 220L360 270L440 130" stroke="white" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
    <path d="M80 420L150 340L210 380L310 220L360 270L440 130" stroke="#0ea5e9" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Arrow Tip */}
    <path d="M440 130L370 145M440 130L425 200" stroke="#0ea5e9" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChatbotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const ContentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const AutomationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ModelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16v4m-2-2h4m5 10v4m-2-2h4M5 3a2 2 0 00-2 2v1.5a2.5 2.5 0 005 0V5a2 2 0 00-2-2zm14 0a2 2 0 00-2 2v1.5a2.5 2.5 0 005 0V5a2 2 0 00-2-2zM5 17a2 2 0 00-2 2v1.5a2.5 2.5 0 005 0V19a2 2 0 00-2-2zm14 0a2 2 0 00-2 2v1.5a2.5 2.5 0 005 0V19a2 2 0 00-2-2z" />
  </svg>
);

const GameIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BusinessIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const VoiceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
);

export const SERVICES: Service[] = [
  {
    id: 'chatbot',
    name: 'AI Chatbot Development',
    description: 'Engage customers 24/7 with intelligent, conversational AI chatbots tailored to your business needs.',
    icon: <ChatbotIcon />
  },
  {
    id: 'content',
    name: 'AI-Powered Content Creation',
    description: 'Generate high-quality blog posts, marketing copy, and social media content at scale with AI.',
    icon: <ContentIcon />
  },
  {
    id: 'automation',
    name: 'AI Business Automation',
    description: 'Streamline your workflows, automate repetitive tasks, and increase efficiency with custom AI solutions.',
    icon: <AutomationIcon />
  },
  {
    id: 'model',
    name: 'Custom AI Model Training',
    description: 'Develop and train bespoke AI models on your data to solve unique business challenges.',
    icon: <ModelIcon />
  },
  {
    id: 'business_plan',
    name: 'AI Business Plan Generator',
    description: 'Answer a few questions to generate a comprehensive business plan, including market and competitor analysis.',
    icon: <BusinessIcon />
  },
  {
    id: 'voice_agent',
    name: 'AI Voice Agent',
    description: 'Experience a live, voice-based conversation with our advanced AI assistant. Perfect for interactive demos.',
    icon: <VoiceIcon />
  },
  {
    id: 'snake',
    name: 'Just for Fun: Snake',
    description: 'Take a break and play a classic game of Snake. A small demo of interactive development.',
    icon: <GameIcon />
  },
];

const GENERAL_QUESTIONS: Question[] = [
  {
    text: "First, could you describe your business or industry? This helps us understand your unique landscape.",
    options: ["E-commerce", "SaaS / Technology", "Healthcare", "Finance & Fintech", "Education", "Other"]
  },
  {
    text: "What specific challenge or opportunity are you hoping to address with AI?",
    options: ["Improve Customer Support", "Automate Content Creation", "Streamline Business Processes", "Data Analysis & Insights", "Lead Generation & Sales", "Other"]
  },
  {
    text: "What does a successful outcome look like for you?",
    options: ["Increase Revenue", "Reduce Operational Costs", "Improve Team Efficiency", "Enhance Customer Satisfaction", "Gain a Competitive Edge", "Other"]
  },
  {
    text: "What's your current experience level with AI solutions?",
    options: ["Just starting to explore", "We use some basic AI tools", "We have an in-house team", "Actively researching vendors", "Other"]
  },
  {
    text: "Finally, what is your estimated budget and timeline for this project? This helps us scope the solution.",
    options: ["<$5k, 1-3 months", "$5k-$15k, 1-3 months", "$15k-$50k, 3-6 months", ">$50k, 6+ months", "Flexible / Undecided"]
  }
];

export const QUESTIONS: Record<string, Question[]> = {
  chatbot: GENERAL_QUESTIONS,
  content: GENERAL_QUESTIONS,
  automation: GENERAL_QUESTIONS,
  model: GENERAL_QUESTIONS,
};

export const BUSINESS_PLAN_QUESTIONS: string[] = [
  "What industry or market will your business operate in? (e.g., 'Gourmet Coffee Shops', 'Sustainable Fashion E-commerce')",
  "Describe the primary product or service you will offer. What makes it unique?",
  "Who is your target customer? Be as specific as possible. (e.g., 'Urban professionals aged 25-40', 'Eco-conscious families')",
  "What is the primary goal of your business for the first year? (e.g., 'Reach $100k in revenue', 'Acquire 1,000 paying customers')",
  "What is your proposed business name? (This will be used to personalize your plan)"
];
