import React, { useState } from 'react';
import { X, Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { username: string; email: string }) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Determine username to save
      // If logging in and no username provided (hidden field), extract from email
      const finalUsername = isLogin 
        ? (formData.username || formData.email.split('@')[0]) 
        : formData.username;

      const userProfile = {
        username: finalUsername || 'User',
        email: formData.email
      };

      // Reset form
      setFormData({ username: '', email: '', password: '' });
      
      onSuccess(userProfile);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}></div>
        
        {/* Modal */}
        <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-8 animate-in zoom-in-95 duration-200">
            <button 
                onClick={onClose}
                className="absolute right-4 top-4 text-slate-500 hover:text-white transition-colors"
            >
                <X size={24} />
            </button>

            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-slate-400 text-sm">
                    {isLogin 
                        ? 'Enter your credentials to access your workspace.' 
                        : 'Join AI SITE 4U to unlock limitless potential.'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <div className="space-y-2 animate-in slide-in-from-top-2 duration-200">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Username</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input 
                                type="text" 
                                required={!isLogin}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-ai-accent focus:ring-1 focus:ring-ai-accent transition-all placeholder-slate-600"
                                placeholder="johndoe"
                                value={formData.username}
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                            />
                        </div>
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input 
                            type="email" 
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-ai-accent focus:ring-1 focus:ring-ai-accent transition-all placeholder-slate-600"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input 
                            type="password" 
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-ai-accent focus:ring-1 focus:ring-ai-accent transition-all placeholder-slate-600"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                </div>

                <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-ai-accent hover:bg-sky-300 text-slate-900 font-bold py-4 rounded-xl mt-6 transition-all hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? <Loader2 className="animate-spin" /> : (isLogin ? 'Sign In' : 'Create Account')}
                    {!isLoading && <ArrowRight size={18} />}
                </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                    onClick={() => setIsLogin(!isLogin)} 
                    className="text-ai-accent hover:underline font-medium focus:outline-none"
                >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
            </div>
        </div>
    </div>
  );
};

export default AuthModal;