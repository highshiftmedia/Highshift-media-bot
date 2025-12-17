
import React from 'react';
import type { Service } from '../types';
import { SERVICES, BrandLogo } from '../constants';

interface ServiceSelectionProps {
  onSelect: (service: Service) => void;
}

const ServiceCard: React.FC<{ service: Service; onClick: () => void }> = ({ service, onClick }) => (
  <button
    onClick={onClick}
    className="glass-card p-6 rounded-2xl text-left w-full h-full flex flex-col group overflow-hidden relative"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative z-10">
      <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
        {service.icon}
      </div>
      <h3 className="font-bold text-lg text-white mb-2">{service.name}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
    </div>
  </button>
);

export const ServiceSelection: React.FC<ServiceSelectionProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 sm:p-10 lg:p-16 relative">
      <div className="text-center mb-16 max-w-4xl flex flex-col items-center">
        <div className="relative mb-10 group">
            <div className="absolute inset-0 bg-sky-500 blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
            <BrandLogo className="h-40 w-40 sm:h-48 sm:w-48 relative z-10 drop-shadow-2xl transition-transform hover:scale-105 duration-700 ease-out" />
        </div>
        
        <h1 className="text-6xl sm:text-8xl font-black tracking-tighter liquid-text mb-4">
          Highshift Media
        </h1>
        <p className="text-xl sm:text-2xl text-white/70 font-light tracking-wide max-w-2xl">
          The next era of intelligence. Fluid, fast, and bespoke.
        </p>
         <p className="mt-6 text-sm text-sky-400/60 uppercase tracking-[0.2em] font-bold">
          Choose Your Path
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl w-full px-4">
        {SERVICES.map((service, index) => (
            <div 
              key={service.id} 
              className={`${service.id === 'snake' || service.id === 'voice_agent' ? 'xl:col-span-2' : ''} h-full`}
            >
                <ServiceCard service={service} onClick={() => onSelect(service)} />
            </div>
        ))}
      </div>
      
       <footer className="w-full text-center mt-20 p-4 text-xs font-medium tracking-widest text-white/30 uppercase">
        &copy; {new Date().getFullYear()} Highshift Media &bull; Artificial Intelligence Bureau
      </footer>
    </div>
  );
};
