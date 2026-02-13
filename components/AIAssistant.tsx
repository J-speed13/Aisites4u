import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Bot, X, Sparkles, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Yo! I'm Nebula AI. Need game tips or don't know what to play? Hit me up!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(userMsg.text);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-nexus-accent text-nexus-900 p-4 rounded-full shadow-[0_0_15px_rgba(0,242,255,0.5)] hover:shadow-[0_0_25px_rgba(0,242,255,0.8)] transition-all hover:scale-110 flex items-center justify-center group"
      >
        <Bot size={28} />
        <span className="absolute right-full mr-3 bg-white text-nexus-900 px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Ask Nebula AI
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 w-80 sm:w-96 bg-nexus-800 rounded-2xl shadow-2xl border border-nexus-700 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300 h-[500px]">
      {/* Header */}
      <div className="bg-nexus-900 p-4 flex items-center justify-between border-b border-nexus-700">
        <div className="flex items-center gap-2">
            <div className="bg-nexus-accent/20 p-2 rounded-lg">
                <Sparkles size={18} className="text-nexus-accent" />
            </div>
            <div>
                <h3 className="font-bold text-white text-sm">Nebula AI</h3>
                <p className="text-xs text-nexus-accent/80">Gaming Assistant</p>
            </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-nexus-900/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                msg.role === 'user'
                  ? 'bg-nexus-accent text-nexus-900 rounded-tr-none font-medium'
                  : 'bg-nexus-700 text-gray-100 rounded-tl-none border border-nexus-600'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
                <div className="bg-nexus-700 text-gray-100 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-nexus-accent" />
                    <span className="text-xs text-gray-400">Thinking...</span>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-nexus-900 border-t border-nexus-700">
        <div className="relative">
            <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask for game tips..."
            className="w-full bg-nexus-950 text-white pl-4 pr-12 py-3 rounded-xl border border-nexus-700 focus:border-nexus-accent focus:outline-none focus:ring-1 focus:ring-nexus-accent placeholder-gray-600 text-sm"
            />
            <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-nexus-800 text-nexus-accent rounded-lg hover:bg-nexus-700 disabled:opacity-50 transition-colors"
            >
            <Send size={16} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;