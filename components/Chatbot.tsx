
import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage, Service, Question } from '../types';
import { AppState } from '../types';
import { BrandLogo } from '../constants';

interface ChatbotProps {
  service: Service;
  chatHistory: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  appState: AppState;
  onRestart: () => void;
  currentQuestion?: Question;
}

const LoadingIndicator: React.FC = () => (
    <div className="flex items-center space-x-2">
        <div className="h-1.5 w-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-1.5 w-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-1.5 w-1.5 bg-sky-400 rounded-full animate-bounce"></div>
    </div>
);

const BotMessage: React.FC<{ text: string }> = ({ text }) => (
    <div className="flex items-start gap-4 animate-in fade-in slide-in-from-left-4 duration-500">
        <div className="flex-shrink-0 h-10 w-10 rounded-full glass-panel flex items-center justify-center p-1 border-white/20">
             <BrandLogo className="w-full h-full" />
        </div>
        <div className="glass-panel rounded-2xl rounded-tl-none px-5 py-3.5 max-w-md border-white/10">
            <p className="text-white/90 leading-relaxed text-[15px]">{text}</p>
        </div>
    </div>
);

const UserMessage: React.FC<{ text: string }> = ({ text }) => (
    <div className="flex justify-end animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="bg-sky-500/20 backdrop-blur-md border border-sky-400/30 rounded-2xl rounded-br-none px-5 py-3.5 max-w-md">
            <p className="text-white leading-relaxed text-[15px]">{text}</p>
        </div>
    </div>
);


export const Chatbot: React.FC<ChatbotProps> = ({ service, chatHistory, onSendMessage, isLoading, appState, onRestart, currentQuestion }) => {
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, currentQuestion]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading && appState === AppState.CHAT) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleOptionClick = (option: string) => {
    if (!isLoading && appState === AppState.CHAT) {
      onSendMessage(option);
    }
  };

  const showOptions = appState === AppState.CHAT && currentQuestion && currentQuestion.options.length > 0;

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-3xl h-[85vh] max-h-[800px] glass-panel rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border-white/5">
        <header className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/5 backdrop-blur-3xl">
          <div className="flex items-center gap-4">
             <BrandLogo className="h-12 w-12" />
             <div>
                <h2 className="text-xl font-bold tracking-tight text-white leading-none">Highshift AI</h2>
                <p className="text-[11px] font-bold text-sky-400/80 uppercase tracking-widest mt-1.5">{service.name}</p>
             </div>
          </div>
          <button onClick={onRestart} className="text-xs font-bold text-white/40 hover:text-white transition uppercase tracking-widest">Restart</button>
        </header>

        <div className="flex-1 px-8 py-8 space-y-8 overflow-y-auto scrollbar-hide">
          {chatHistory.map((msg, index) =>
            msg.sender === 'bot' ? <BotMessage key={index} text={msg.text} /> : <UserMessage key={index} text={msg.text} />
          )}
          {isLoading && (
            <div className="flex justify-start animate-in fade-in duration-300">
                <div className="glass-panel rounded-xl px-4 py-2 border-white/5"><LoadingIndicator/></div>
            </div>
          )}
          
          {showOptions && (
            <div className="pt-4 flex flex-wrap gap-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="bg-white/5 backdrop-blur-md text-white/80 py-2.5 px-5 rounded-xl border border-white/10 hover:bg-sky-500/20 hover:border-sky-400/50 hover:text-white transition-all duration-300 text-sm font-medium"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {appState === AppState.BOOKING && (
             <div className="flex justify-start pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                 <a 
                    href="mailto:info@highshiftmedia.com" 
                    className="group bg-sky-500 text-white font-bold py-4 px-8 rounded-2xl hover:bg-sky-400 transition-all duration-300 shadow-lg shadow-sky-500/20 inline-flex items-center gap-3 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Book Consultation
                </a>
             </div>
          )}
          <div ref={chatEndRef} />
        </div>
        
        {!showOptions && appState !== AppState.BOOKING && (
            <div className="p-6 border-t border-white/5 bg-white/5">
            <form onSubmit={handleSubmit} className="flex items-center gap-4">
                <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={"Type your message..."}
                disabled={isLoading}
                className="w-full bg-white/5 text-white placeholder-white/20 rounded-2xl py-4 px-6 border border-white/10 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all disabled:opacity-30"
                />
                <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-sky-500 text-white rounded-2xl p-4 hover:bg-sky-400 transition-all duration-300 shadow-lg shadow-sky-500/20 disabled:bg-white/10 disabled:text-white/20 disabled:shadow-none"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                </button>
            </form>
            </div>
        )}
      </div>
    </div>
  );
};
