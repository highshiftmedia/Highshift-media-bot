
import React from 'react';
import type { Service, Question, IndustryAgent } from './types';

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

// ===== ICONS =====
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

// Industry Icons
export const RestaurantIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

export const ClinicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
);

export const SalonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

export const DealershipIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  </svg>
);

export const ConstructionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
  </svg>
);

export const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-green-400" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

export const SocialMediaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
  </svg>
);

export const IndustryAgentsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
  </svg>
);

export const MarketingHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
  </svg>
);

// ===== INDUSTRY AGENTS =====
export const INDUSTRY_AGENTS: IndustryAgent[] = [
  {
    id: 'restaurant',
    name: 'Restaurant AI Agent',
    industry: 'Food & Beverage',
    description: 'Handle orders via voice, WhatsApp, or chat. Integrate with POS systems, manage menus, promotions, and order tracking.',
    icon: <RestaurantIcon />,
    features: ['Voice/Chat Ordering', 'POS Integration', 'Menu Management', 'Order Tracking', 'Promotions'],
    demoAvailable: true,
  },
  {
    id: 'clinic',
    name: 'Healthcare AI Agent',
    industry: 'Healthcare',
    description: 'Book appointments, check doctor availability, sync with calendars, send reminders, and provide pre-visit instructions.',
    icon: <ClinicIcon />,
    features: ['Appointment Booking', 'Calendar Sync', 'Automated Reminders', 'Rescheduling', 'Pre-visit Info'],
    demoAvailable: true,
  },
  {
    id: 'salon',
    name: 'Salon & Spa AI Agent',
    industry: 'Beauty & Wellness',
    description: 'Reserve appointments, manage stylist availability, send reminders to reduce no-shows.',
    icon: <SalonIcon />,
    features: ['Service Booking', 'Stylist Scheduling', 'Automated Reminders', 'Customer Preferences', 'Reviews'],
    demoAvailable: true,
  },
  {
    id: 'dealership',
    name: 'Auto Dealership AI Agent',
    industry: 'Automotive',
    description: 'Answer vehicle queries, schedule test drives, connect to inventory databases and FAQs using RAG.',
    icon: <DealershipIcon />,
    features: ['Vehicle Inquiries', 'Test Drive Booking', 'Inventory Search', 'RAG-Based FAQ', 'Lead Capture'],
    demoAvailable: true,
  },
  {
    id: 'construction',
    name: 'Construction AI Agent',
    industry: 'Construction',
    description: 'Automate scheduling, safety monitoring, estimating, progress tracking, and reporting.',
    icon: <ConstructionIcon />,
    features: ['Project Scheduling', 'Safety Monitoring', 'Cost Estimation', 'Progress Tracking', 'Reporting'],
    demoAvailable: true,
  },
];

// ===== MAIN SERVICES =====
export const SERVICES: Service[] = [
  {
    id: 'industry_agents',
    name: 'Industry AI Agents',
    description: 'Pre-built AI agents for Restaurants, Clinics, Salons, Car Dealerships, and Construction companies.',
    icon: <IndustryAgentsIcon />,
    category: 'industry',
  },
  {
    id: 'marketing_hub',
    name: 'Marketing & Automation Hub',
    description: 'Content creation, social media automation, email marketing, and lead generation tools.',
    icon: <MarketingHubIcon />,
    category: 'marketing',
  },
  {
    id: 'whatsapp_bot',
    name: 'WhatsApp Business Bot',
    description: 'AI-powered WhatsApp bot for customer support, lead qualification, bookings, and follow-ups.',
    icon: <WhatsAppIcon />,
    category: 'communication',
  },
  {
    id: 'chatbot',
    name: 'AI Chatbot Development',
    description: 'Engage customers 24/7 with intelligent, conversational AI chatbots tailored to your business needs.',
    icon: <ChatbotIcon />,
    category: 'automation',
  },
  {
    id: 'content',
    name: 'AI-Powered Content Creation',
    description: 'Generate high-quality blog posts, marketing copy, and social media content at scale with AI.',
    icon: <ContentIcon />,
    category: 'marketing',
  },
  {
    id: 'automation',
    name: 'AI Business Automation',
    description: 'Streamline your workflows, automate repetitive tasks, and increase efficiency with custom AI solutions.',
    icon: <AutomationIcon />,
    category: 'automation',
  },
  {
    id: 'model',
    name: 'Custom AI Model Training',
    description: 'Develop and train bespoke AI models on your data to solve unique business challenges.',
    icon: <ModelIcon />,
    category: 'automation',
  },
  {
    id: 'business_plan',
    name: 'AI Business Plan Generator',
    description: 'Answer a few questions to generate a comprehensive business plan, including market and competitor analysis.',
    icon: <BusinessIcon />,
    category: 'other',
  },
  {
    id: 'voice_agent',
    name: 'AI Voice Agent',
    description: 'Experience a live, voice-based conversation with our advanced AI assistant. Perfect for interactive demos.',
    icon: <VoiceIcon />,
    category: 'communication',
  },
  {
    id: 'snake',
    name: 'Just for Fun: Snake',
    description: 'Take a break and play a classic game of Snake. A small demo of interactive development.',
    icon: <GameIcon />,
    category: 'other',
  },
];

const GENERAL_QUESTIONS: Question[] = [
  {
    text: "First, could you describe your business or industry? This helps us understand your unique landscape.",
    options: ["E-commerce", "SaaS / Technology", "Healthcare", "Finance & Fintech", "Education", "Restaurant/Food", "Automotive", "Construction", "Other"]
  },
  {
    text: "What specific challenge or opportunity are you hoping to address with AI?",
    options: ["Improve Customer Support", "Automate Content Creation", "Streamline Business Processes", "Data Analysis & Insights", "Lead Generation & Sales", "Appointment Booking", "Order Management", "Other"]
  },
  {
    text: "What does a successful outcome look like for you?",
    options: ["Increase Revenue", "Reduce Operational Costs", "Improve Team Efficiency", "Enhance Customer Satisfaction", "Gain a Competitive Edge", "24/7 Availability", "Other"]
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
  whatsapp_bot: [
    {
      text: "What type of business do you operate?",
      options: ["E-commerce", "Service Business", "Restaurant/Food", "Healthcare", "Real Estate", "Other"]
    },
    {
      text: "What's the primary use case for your WhatsApp bot?",
      options: ["Customer Support", "Lead Qualification", "Order Taking", "Appointment Booking", "FAQ Automation", "All of the above"]
    },
    {
      text: "How many customer messages do you typically receive per day?",
      options: ["Less than 50", "50-200", "200-500", "500-1000", "1000+"]
    },
    {
      text: "Do you need integration with other systems?",
      options: ["CRM Integration", "E-commerce Platform", "Calendar/Booking System", "Payment Gateway", "Multiple Integrations", "Not sure yet"]
    },
    {
      text: "What's your timeline for implementation?",
      options: ["ASAP - Within 2 weeks", "1-2 months", "3-6 months", "Just exploring options"]
    }
  ],
};

export const BUSINESS_PLAN_QUESTIONS: string[] = [
  "What industry or market will your business operate in? (e.g., 'Gourmet Coffee Shops', 'Sustainable Fashion E-commerce')",
  "Describe the primary product or service you will offer. What makes it unique?",
  "Who is your target customer? Be as specific as possible. (e.g., 'Urban professionals aged 25-40', 'Eco-conscious families')",
  "What is the primary goal of your business for the first year? (e.g., 'Reach $100k in revenue', 'Acquire 1,000 paying customers')",
  "What is your proposed business name? (This will be used to personalize your plan)"
];

// ===== RESTAURANT MENU (for demo) =====
export const SAMPLE_MENU = {
  categories: [
    {
      name: 'Starters',
      items: [
        { id: 's1', name: 'Garlic Bread', price: 5.99, description: 'Crispy bread with garlic butter' },
        { id: 's2', name: 'Caesar Salad', price: 8.99, description: 'Fresh romaine with caesar dressing' },
        { id: 's3', name: 'Soup of the Day', price: 6.99, description: 'Ask about today\'s special' },
      ]
    },
    {
      name: 'Main Courses',
      items: [
        { id: 'm1', name: 'Grilled Salmon', price: 22.99, description: 'Atlantic salmon with seasonal vegetables' },
        { id: 'm2', name: 'Chicken Parmesan', price: 18.99, description: 'Breaded chicken with marinara sauce' },
        { id: 'm3', name: 'Beef Burger', price: 15.99, description: 'Angus beef with all the fixings' },
        { id: 'm4', name: 'Pasta Primavera', price: 14.99, description: 'Fresh vegetables in creamy sauce' },
      ]
    },
    {
      name: 'Desserts',
      items: [
        { id: 'd1', name: 'Chocolate Cake', price: 7.99, description: 'Rich chocolate layer cake' },
        { id: 'd2', name: 'Cheesecake', price: 8.99, description: 'New York style cheesecake' },
        { id: 'd3', name: 'Ice Cream', price: 5.99, description: 'Three scoops of your choice' },
      ]
    }
  ]
};

// ===== SAMPLE SERVICES (for Salon demo) =====
export const SALON_SERVICES = [
  { id: 'haircut', name: 'Haircut', duration: 30, price: 35 },
  { id: 'coloring', name: 'Hair Coloring', duration: 90, price: 85 },
  { id: 'styling', name: 'Styling', duration: 45, price: 50 },
  { id: 'manicure', name: 'Manicure', duration: 30, price: 25 },
  { id: 'pedicure', name: 'Pedicure', duration: 45, price: 35 },
  { id: 'facial', name: 'Facial Treatment', duration: 60, price: 65 },
];

// ===== SAMPLE DOCTORS (for Clinic demo) =====
export const CLINIC_DOCTORS = [
  { id: 'dr1', name: 'Dr. Sarah Johnson', specialty: 'General Practice', available: ['Mon', 'Wed', 'Fri'] },
  { id: 'dr2', name: 'Dr. Michael Chen', specialty: 'Pediatrics', available: ['Tue', 'Thu', 'Sat'] },
  { id: 'dr3', name: 'Dr. Emily Williams', specialty: 'Dermatology', available: ['Mon', 'Tue', 'Wed'] },
  { id: 'dr4', name: 'Dr. James Brown', specialty: 'Cardiology', available: ['Wed', 'Thu', 'Fri'] },
];

// ===== SAMPLE VEHICLES (for Dealership demo) =====
export const DEALERSHIP_VEHICLES = [
  { id: 'v1', make: 'Toyota', model: 'Camry', year: 2024, price: 28500, type: 'Sedan', available: true },
  { id: 'v2', make: 'Honda', model: 'CR-V', year: 2024, price: 32000, type: 'SUV', available: true },
  { id: 'v3', make: 'Ford', model: 'F-150', year: 2024, price: 45000, type: 'Truck', available: true },
  { id: 'v4', make: 'Tesla', model: 'Model 3', year: 2024, price: 42000, type: 'Electric', available: false },
  { id: 'v5', make: 'BMW', model: 'X5', year: 2024, price: 65000, type: 'Luxury SUV', available: true },
];
