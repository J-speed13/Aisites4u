import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-ai-accent/20 rounded-full blur-[100px] -z-10 animate-float"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-ai-glow/20 rounded-full blur-[80px] -z-10 animate-float" style={{animationDelay: '2s'}}></div>

      <div className="text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 mb-8 backdrop-blur-sm">
            <Sparkles size={14} className="text-ai-accent" />
            <span className="text-xs font-mono text-ai-accent uppercase tracking-widest">Next Gen AI Platform</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
          Unlock the Power of <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-ai-accent to-ai-glow">Digital Intelligence</span>
        </h1>
        
        <p className="text-lg md:text-xl text-ai-muted mb-10 max-w-2xl mx-auto leading-relaxed">
          AI SITE 4U provides instant access to state-of-the-art language models. 
          Generate code, write content, and analyze data with a single prompt.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
                onClick={() => onNavigate('demo')}
                className="px-8 py-4 rounded-xl bg-ai-accent text-slate-900 font-bold hover:bg-sky-300 transition-all hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]"
            >
                Start Chatting
            </button>
            <button 
                onClick={() => onNavigate('features')}
                className="px-8 py-4 rounded-xl bg-slate-800 text-white font-medium border border-slate-700 hover:bg-slate-700 transition-all"
            >
                Explore Features
            </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;