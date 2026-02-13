import React, { useState } from 'react';
import { FEATURES } from './constants';
import { UserProfile } from './types';
import ChatInterface from './components/ChatInterface';
import FeatureCard from './components/FeatureCard';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import AIBuilder from './components/AIBuilder';
import AuthModal from './components/AuthModal';
import AccountModal from './components/AccountModal';
import AIAssistant from './components/AIAssistant';
import { Cpu, Github, Twitter, Hammer, MessageSquare, User } from 'lucide-react';

const App: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [signupPlan, setSignupPlan] = useState<string>('Starter');

  // Helper for smooth scrolling
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAuthSuccess = (userData: { username: string; email: string }) => {
    setUser({
        username: userData.username,
        email: userData.email,
        plan: signupPlan
    });
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    
    // Smooth scroll to the AI Builder section if they are on Pro plan or just signed up via builder
    if (signupPlan === 'Pro Builder') {
        setTimeout(() => {
            scrollToSection('builder');
        }, 300);
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUser(null);
    setIsAccountModalOpen(false);
    scrollToSection('features'); // Optionally scroll to top or features
  };

  const handleFeatureClick = (featureId: string) => {
      // Direct coding/builder features to the Builder, others to Chat
      if (featureId === 'coding') {
          scrollToSection('builder');
      } else {
          scrollToSection('demo');
      }
  };

  return (
    <div className="min-h-screen bg-ai-main text-ai-text selection:bg-ai-accent selection:text-ai-main relative">
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={handleAuthSuccess}
      />

      <AccountModal 
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        onSignOut={handleSignOut}
        user={user}
      />

      {/* Floating AI Assistant */}
      <AIAssistant />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-ai-main/80 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 focus:outline-none">
              <div className="w-8 h-8 rounded bg-gradient-to-tr from-ai-accent to-ai-glow flex items-center justify-center">
                <Cpu className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold tracking-tight">AI SITE 4U</span>
            </button>
            
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                <button onClick={() => scrollToSection('features')} className="hover:text-ai-accent transition-colors">Features</button>
                <button onClick={() => scrollToSection('demo')} className="hover:text-ai-accent transition-colors">Chat</button>
                <button onClick={() => scrollToSection('builder')} className="hover:text-purple-400 transition-colors text-purple-400">AI Builder</button>
                <button onClick={() => scrollToSection('pricing')} className="hover:text-ai-accent transition-colors">Pricing</button>
            </div>

            <button 
                onClick={() => {
                  if (isAuthenticated) {
                    setIsAccountModalOpen(true);
                  } else {
                    setSignupPlan('Starter');
                    setIsAuthModalOpen(true);
                  }
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border flex items-center gap-2 ${
                  isAuthenticated 
                    ? 'bg-slate-800/50 text-ai-accent border-ai-accent/30 hover:bg-slate-800' 
                    : 'bg-slate-800 text-white hover:bg-slate-700 border-slate-700'
                }`}
            >
                {isAuthenticated ? (
                  <>
                    <User size={16} />
                    <span>My Account</span>
                  </>
                ) : (
                  'Sign In'
                )}
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        
        {/* Hero Section */}
        <Hero onNavigate={scrollToSection} />

        {/* Features Grid */}
        <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Capabilities</h2>
                <p className="text-ai-muted max-w-2xl mx-auto">
                    From simple queries to complex problem solving, AI SITE 4U is equipped with a versatile toolset.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {FEATURES.map(feature => (
                    <FeatureCard 
                        key={feature.id} 
                        feature={feature} 
                        onClick={() => handleFeatureClick(feature.id)}
                    />
                ))}
            </div>
        </section>

        {/* Builder Section */}
        <section id="builder" className="py-20 px-4 bg-slate-900/30 border-y border-slate-800 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none" />
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-12">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 mb-6 backdrop-blur-sm text-purple-400">
                        <Hammer size={14} />
                        <span className="text-xs font-mono uppercase tracking-widest">No Limits Mode</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Unlimited AI Builder</h2>
                    <p className="text-ai-muted">Describe any app, component, or idea. We build it instantly.</p>
                </div>
                <AIBuilder 
                  isAuthenticated={isAuthenticated} 
                  onSignInRequest={() => {
                      setSignupPlan('Pro Builder');
                      setIsAuthModalOpen(true);
                  }}
                />
            </div>
        </section>

        {/* Chat Demo Section */}
        <section id="demo" className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-center gap-2 mb-8 opacity-50">
                    <MessageSquare size={20} />
                    <span className="font-mono text-sm uppercase">General Assistant</span>
                </div>
                <ChatInterface />
            </div>
        </section>

        {/* Pricing Section */}
        {!isAuthenticated && (
          <Pricing onSignup={(planId) => {
              const planName = planId === 'pro' ? 'Pro Builder' : (planId === 'enterprise' ? 'Enterprise' : 'Starter');
              setSignupPlan(planName);
              setIsAuthModalOpen(true);
          }} />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <Cpu className="text-ai-accent" size={24} />
                    <span className="text-lg font-bold">AI SITE 4U</span>
                </div>
                
                <div className="text-slate-500 text-sm">
                    &copy; 2024 AI SITE 4U. Powered by Advanced AI.
                </div>

                <div className="flex gap-4">
                    <a href="https://github.com/J-speed13" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors"><Github size={20} /></a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors"><Twitter size={20} /></a>
                </div>
            </div>
        </div>
      </footer>

    </div>
  );
};

export default App;