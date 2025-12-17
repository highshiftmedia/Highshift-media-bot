
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob as GenAiBlob } from '@google/genai';
import { BrandLogo } from '../constants';

// --- Type Definitions ---
type Transcription = {
    sender: 'user' | 'bot';
    text: string;
    isFinal: boolean;
};
type AgentStatus = 'idle' | 'listening' | 'speaking' | 'connecting' | 'error';


// --- Audio Utility Functions ---
function encode(bytes: Uint8Array): string {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

function decode(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        for (let i = 0; i < frameCount; i++) {
            channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
        }
    }
    return buffer;
}

function createBlob(data: Float32Array): GenAiBlob {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
        int16[i] = data[i] * 32768;
    }
    return {
        data: encode(new Uint8Array(int16.buffer)),
        mimeType: 'audio/pcm;rate=16000',
    };
}


export const VoiceAgent: React.FC<{ onRestart: () => void }> = ({ onRestart }) => {
    const [status, setStatus] = useState<AgentStatus>('idle');
    const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);
    const [error, setError] = useState<string | null>(null);

    const sessionPromiseRef = useRef<any>(null);
    const inputAudioContextRef = useRef<AudioContext | null>(null);
    const outputAudioContextRef = useRef<AudioContext | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
    const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
    const nextStartTimeRef = useRef<number>(0);
    const aiRef = useRef<GoogleGenAI | null>(null);

    const currentInputTranscriptionRef = useRef('');
    const currentOutputTranscriptionRef = useRef('');

    const startConversation = async () => {
        if (status !== 'idle' && status !== 'error') return;

        setStatus('connecting');
        setError(null);
        setTranscriptions([{ sender: 'bot', text: "Highshift AI Voice Agent initialized. How can I help?", isFinal: true }]);

        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            aiRef.current = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            
            inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

            sessionPromiseRef.current = aiRef.current.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                config: {
                    responseModalities: [Modality.AUDIO],
                    inputAudioTranscription: {},
                    outputAudioTranscription: {},
                    systemInstruction: 'You are a professional AI consultant for Highshift Media. You are helping potential clients explore AI services. Be smart, concise, and helpful. You are a voice agent, so keep responses brief.',
                },
                callbacks: {
                    onopen: async () => {
                        mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
                        const source = inputAudioContextRef.current!.createMediaStreamSource(mediaStreamRef.current);
                        scriptProcessorRef.current = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);

                        scriptProcessorRef.current.onaudioprocess = (audioProcessingEvent) => {
                            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                            const pcmBlob = createBlob(inputData);
                            sessionPromiseRef.current?.then((session: any) => {
                                session.sendRealtimeInput({ media: pcmBlob });
                            });
                        };
                        
                        source.connect(scriptProcessorRef.current);
                        scriptProcessorRef.current.connect(inputAudioContextRef.current!.destination);
                        setStatus('listening');
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        handleTranscription(message);
                        await handleAudio(message);
                    },
                    onerror: (e: ErrorEvent) => {
                        setError('Connection lost. Please try again.');
                        setStatus('error');
                        stopConversation();
                    },
                    onclose: (e: CloseEvent) => {
                        stopConversation(false);
                    },
                }
            });
        } catch (err) {
            setError("Microphone access denied.");
            setStatus('error');
        }
    };

    const handleTranscription = (message: LiveServerMessage) => {
        if (message.serverContent?.inputTranscription) {
            const text = message.serverContent.inputTranscription.text;
            currentInputTranscriptionRef.current += text;
            setTranscriptions(prev => {
                const last = prev[prev.length - 1];
                if (last?.sender === 'user') {
                    return [...prev.slice(0, -1), { ...last, text: currentInputTranscriptionRef.current, isFinal: false }];
                }
                return [...prev, { sender: 'user', text: currentInputTranscriptionRef.current, isFinal: false }];
            });
        } else if (message.serverContent?.outputTranscription) {
            const text = message.serverContent.outputTranscription.text;
            currentOutputTranscriptionRef.current += text;
            setStatus('speaking');
             setTranscriptions(prev => {
                const last = prev[prev.length - 1];
                if (last?.sender === 'bot') {
                    return [...prev.slice(0, -1), { ...last, text: currentOutputTranscriptionRef.current, isFinal: false }];
                }
                return [...prev, { sender: 'bot', text: currentOutputTranscriptionRef.current, isFinal: false }];
            });
        }

        if (message.serverContent?.turnComplete) {
            setTranscriptions(prev => prev.map(t => ({...t, isFinal: true})));
            currentInputTranscriptionRef.current = '';
            currentOutputTranscriptionRef.current = '';
            setStatus('listening');
        }
    };
    
    const handleAudio = async (message: LiveServerMessage) => {
        const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
        if (audioData && outputAudioContextRef.current) {
            const outputCtx = outputAudioContextRef.current;
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
            const audioBuffer = await decodeAudioData(decode(audioData), outputCtx, 24000, 1);
            
            const source = outputCtx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(outputCtx.destination);
            
            source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) {
                   setStatus('listening');
                }
            });

            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += audioBuffer.duration;
            sourcesRef.current.add(source);
        }
         const interrupted = message.serverContent?.interrupted;
        if (interrupted) {
            for (const source of sourcesRef.current.values()) {
                source.stop();
                sourcesRef.current.delete(source);
            }
            nextStartTimeRef.current = 0;
        }
    };


    const stopConversation = useCallback((closeSession = true) => {
        if (closeSession && sessionPromiseRef.current) {
           sessionPromiseRef.current.then((s: any) => s.close());
        }
        
        mediaStreamRef.current?.getTracks().forEach(track => track.stop());
        scriptProcessorRef.current?.disconnect();
        inputAudioContextRef.current?.close();
        outputAudioContextRef.current?.close();

        sessionPromiseRef.current = null;
        scriptProcessorRef.current = null;
        mediaStreamRef.current = null;
        inputAudioContextRef.current = null;
        outputAudioContextRef.current = null;
        
        setStatus('idle');
    }, []);

    useEffect(() => {
        return () => stopConversation();
    }, [stopConversation]);
    
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4">
            <div className="w-full max-w-2xl h-[85vh] max-h-[750px] glass-panel rounded-[2.5rem] shadow-2xl flex flex-col border-white/5 overflow-hidden">
                <header className="px-8 py-6 border-b border-white/5 flex justify-between items-center flex-shrink-0 bg-white/5">
                    <div className="flex items-center gap-4">
                        <BrandLogo className="h-12 w-12" />
                        <div>
                            <h2 className="text-xl font-bold text-white tracking-tight leading-none">Voice Interface</h2>
                            <div className="flex items-center gap-2 mt-2">
                                <span className={`h-2 w-2 rounded-full shadow-[0_0_8px] ${status === 'listening' ? 'bg-emerald-400 shadow-emerald-400 animate-pulse' : status === 'speaking' ? 'bg-sky-400 shadow-sky-400' : 'bg-white/20'}`}></span>
                                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">{status}</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={onRestart} className="text-xs font-bold text-white/40 hover:text-white transition uppercase tracking-widest">Back</button>
                </header>

                <div className="flex-1 px-8 py-8 space-y-6 overflow-y-auto scrollbar-hide">
                    {transcriptions.map((t, i) => (
                        <div key={i} className={`flex ${t.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
                            <div className={`px-5 py-3 rounded-2xl max-w-[85%] ${t.sender === 'user' ? 'bg-sky-500/20 border border-sky-400/30 text-white rounded-br-none' : 'glass-panel border-white/10 text-white/80 rounded-bl-none'} ${!t.isFinal ? 'opacity-50' : ''}`}>
                                <p className="text-[15px] leading-relaxed">{t.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <footer className="p-10 border-t border-white/5 flex flex-col items-center justify-center flex-shrink-0 bg-white/5">
                    {error && <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-6">{error}</p>}
                    
                    {status === 'idle' || status === 'error' ? (
                        <button 
                            onClick={startConversation} 
                            className="group bg-sky-500 text-white font-bold py-5 px-10 rounded-2xl hover:bg-sky-400 transition-all duration-300 shadow-xl shadow-sky-500/20 flex items-center gap-4 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                            <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                                <div className="h-2 w-2 bg-white rounded-full animate-ping" />
                            </div>
                            Establish Connection
                        </button>
                    ) : (
                        <button 
                            onClick={() => stopConversation()} 
                            className="bg-red-500/20 border border-red-500/40 text-red-500 font-bold py-5 px-10 rounded-2xl hover:bg-red-500/30 hover:text-red-400 transition-all duration-300 flex items-center gap-4"
                        >
                            <div className="h-2 w-2 bg-red-500 rounded-full" />
                            Terminate Session
                        </button>
                    )}
                    
                    <p className="mt-8 text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Secure Biometric Audio Stream</p>
                </footer>
            </div>
        </div>
    );
};
