import React, { useState } from 'react';
import { generateAppCode } from '../services/geminiService';
import { Terminal, Play, Code, Layout, Loader2, Sparkles, Lock } from 'lucide-react';

interface AIBuilderProps {
  isAuthenticated: boolean;
  onSignInRequest: () => void;
}

const AIBuilder: React.FC<AIBuilderProps> = ({ isAuthenticated, onSignInRequest }) => {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');

  const handleBuild = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    const generatedCode = await generateAppCode(prompt);
    setCode(generatedCode);
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col h-[800px] relative">
      
      {!isAuthenticated && (
        <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-500">
            <div className="bg-slate-800 p-6 rounded-full mb-6 shadow-2xl border border-slate-700 animate-bounce" style={{ animationDuration: '3s' }}>
                <Lock size={48} className="text-purple-400" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Unlock the AI Studio</h3>
            <p className="text-slate-300 max-w-md mb-8 text-lg">
                Sign in to access unlimited AI app generation, code exports, and advanced prototyping features.
            </p>
            <button 
                onClick={onSignInRequest}
                className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:-translate-y-1 flex items-center gap-2"
            >
                Sign In to Build
            </button>
        </div>
      )}

      {/* Builder Header */}
      <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-500/20 rounded-lg">
                <Terminal size={20} className="text-purple-400" />
            </div>
            <div>
                <h3 className="text-white font-bold font-mono tracking-tight">AI BUILDER <span className="text-xs bg-purple-500 text-white px-1 rounded ml-2">PRO</span></h3>
                <p className="text-xs text-slate-500">Unlimited Generation</p>
            </div>
        </div>
        
        {/* View Toggle */}
        {code && (
            <div className="flex bg-slate-800 p-1 rounded-lg">
                <button 
                    onClick={() => setViewMode('preview')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${viewMode === 'preview' ? 'bg-purple-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    <Layout size={14} /> Preview
                </button>
                <button 
                    onClick={() => setViewMode('code')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${viewMode === 'code' ? 'bg-purple-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    <Code size={14} /> Source
                </button>
            </div>
        )}
      </div>

      {/* Input Section */}
      <div className="bg-slate-900 p-6 border-b border-slate-800">
        <div className="flex gap-4">
            <div className="flex-1 relative">
                <input 
                    type="text" 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe an app to build (e.g., 'A modern calculator with neon buttons' or 'A landing page for a coffee shop')" 
                    className="w-full bg-slate-800 text-white pl-4 pr-32 py-4 rounded-xl border border-slate-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none placeholder-slate-500 font-mono text-sm"
                    onKeyDown={(e) => e.key === 'Enter' && handleBuild()}
                    disabled={!isAuthenticated}
                />
                <div className="absolute right-2 top-2 bottom-2">
                    <button 
                        onClick={handleBuild}
                        disabled={isLoading || !prompt.trim() || !isAuthenticated}
                        className="h-full px-6 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                        BUILD
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-black relative">
        {!code && !isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600">
                <Layout size={64} className="mb-4 opacity-20" />
                <p className="font-mono">Ready to build. Enter a prompt above.</p>
                <div className="mt-6 flex gap-2">
                    <button onClick={() => setPrompt("A snake game with retro green styling")} className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-full transition-colors" disabled={!isAuthenticated}>Snake Game</button>
                    <button onClick={() => setPrompt("A weather dashboard card with sunny animation")} className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-full transition-colors" disabled={!isAuthenticated}>Weather Card</button>
                    <button onClick={() => setPrompt("A login form with floating labels")} className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-full transition-colors" disabled={!isAuthenticated}>Login Form</button>
                </div>
            </div>
        )}

        {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/50 backdrop-blur-sm z-10">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles size={20} className="text-purple-400 animate-pulse" />
                    </div>
                </div>
                <p className="mt-4 text-purple-400 font-mono text-sm animate-pulse">Generating Code...</p>
            </div>
        )}

        {code && (
            <div className="h-full w-full">
                {viewMode === 'preview' ? (
                    <iframe 
                        srcDoc={code}
                        title="Preview"
                        className="w-full h-full border-0 bg-white"
                        sandbox="allow-scripts allow-modals"
                    />
                ) : (
                    <div className="w-full h-full overflow-auto bg-[#1e1e1e] p-4">
                        <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap">
                            {code}
                        </pre>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default AIBuilder;