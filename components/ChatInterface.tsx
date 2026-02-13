import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, Loader2, RefreshCw } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { SUGGESTED_PROMPTS } from '../constants';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: "Welcome to AI SITE 4U. I am online and ready to assist. What can I create or solve for you today?",
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
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(text);

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
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-[600px] flex flex-col bg-ai-surface rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900/50 p-4 border-b border-slate-700 flex justify-between items-center backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
          <span className="font-mono text-sm text-ai-accent">AI-LIVE-V3</span>
        </div>
        <button 
            onClick={() => setMessages([messages[0]])} 
            className="text-ai-muted hover:text-white transition-colors"
            title="Reset Chat"
        >
            <RefreshCw size={18} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'model' && (
              <div className="w-8 h-8 rounded-full bg-ai-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Sparkles size={16} className="text-ai-accent" />
              </div>
            )}
            
            <div
              className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-sm ${
                msg.role === 'user'
                  ? 'bg-ai-accent text-slate-900 rounded-tr-none font-medium'
                  : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700/50'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 mt-1">
                <User size={16} className="text-slate-300" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
           <div className="flex gap-4 justify-start">
             <div className="w-8 h-8 rounded-full bg-ai-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Loader2 size={16} className="text-ai-accent animate-spin" />
              </div>
              <div className="bg-slate-800 rounded-2xl rounded-tl-none px-5 py-3.5 border border-slate-700/50">
                <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                </div>
              </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-900 border-t border-slate-700">
        
        {/* Quick Suggestions (only show if no messages yet or idle) */}
        {messages.length === 1 && !isLoading && (
            <div className="flex gap-2 overflow-x-auto pb-4 mb-2 scrollbar-hide">
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSend(prompt)}
                        className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs text-ai-muted hover:text-ai-accent hover:border-ai-accent transition-all"
                    >
                        {prompt}
                    </button>
                ))}
            </div>
        )}

        <div className="relative flex items-center gap-2">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask AI SITE 4U anything..."
                className="flex-1 bg-slate-800 text-white pl-4 pr-12 py-4 rounded-xl border border-slate-700 focus:border-ai-accent focus:ring-1 focus:ring-ai-accent focus:outline-none placeholder-slate-500 transition-all font-light"
            />
            <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-2 bg-ai-accent hover:bg-sky-300 text-slate-900 rounded-lg disabled:opacity-50 disabled:hover:bg-ai-accent transition-colors"
            >
                <Send size={20} />
            </button>
        </div>
        <div className="text-center mt-2">
            <p className="text-[10px] text-slate-600">Powered by Advanced AI. AI may display inaccurate info.</p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;