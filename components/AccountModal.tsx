import React, { useState } from 'react';
import { X, User, Settings, LogOut, CreditCard, Bell, Shield } from 'lucide-react';
import { UserProfile } from '../types';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignOut: () => void;
  user: UserProfile | null;
}

const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, onSignOut, user }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');

  if (!isOpen || !user) return null;

  // Generate initials from username
  const initials = user.username.substring(0, 2).toUpperCase();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[500px] animate-in zoom-in-95 duration-200">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-slate-950 p-6 border-r border-slate-800 flex flex-col">
           <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-ai-accent to-purple-500 flex items-center justify-center text-slate-900 font-bold">
                {initials}
              </div>
              <div className="overflow-hidden">
                <h3 className="font-bold text-white text-sm truncate" title={user.username}>{user.username}</h3>
                <span className="text-xs text-ai-accent truncate block">{user.plan}</span>
              </div>
           </div>

           <nav className="space-y-2 flex-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
              >
                <User size={18} /> Profile
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
              >
                <Settings size={18} /> Settings
              </button>
           </nav>

           <button
              onClick={onSignOut}
              className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
           >
              <LogOut size={18} /> Sign Out
           </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto bg-slate-900 relative">
             <button
                onClick={onClose}
                className="absolute right-4 top-4 text-slate-500 hover:text-white transition-colors"
            >
                <X size={24} />
            </button>

            {activeTab === 'profile' ? (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">My Profile</h2>
                    
                    <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Username</label>
                        <p className="text-white font-mono">{user.username}</p>
                    </div>
                     <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Email</label>
                        <p className="text-white font-mono">{user.email}</p>
                    </div>

                    <div className="pt-6 border-t border-slate-800">
                        <h3 className="text-lg font-bold text-white mb-4">Subscription</h3>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                                    <CreditCard size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-white">{user.plan} Plan</p>
                                    <p className="text-xs text-slate-400">Active until Dec 2025</p>
                                </div>
                            </div>
                            <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded">Active</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Settings</h2>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30 border border-slate-700">
                            <div className="flex items-center gap-3">
                                <Bell size={20} className="text-slate-400" />
                                <div>
                                    <p className="font-medium text-white">Notifications</p>
                                    <p className="text-xs text-slate-500">Receive email updates about your generations</p>
                                </div>
                            </div>
                            <div className="w-10 h-6 bg-ai-accent rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                            </div>
                        </div>

                         <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30 border border-slate-700">
                            <div className="flex items-center gap-3">
                                <Shield size={20} className="text-slate-400" />
                                <div>
                                    <p className="font-medium text-white">Privacy Mode</p>
                                    <p className="text-xs text-slate-500">Do not store my prompts history</p>
                                </div>
                            </div>
                             <div className="w-10 h-6 bg-slate-700 rounded-full relative cursor-pointer">
                                <div className="absolute left-1 top-1 w-4 h-4 bg-slate-400 rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-800">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Danger Zone</h3>
                        <button className="text-red-400 hover:text-red-300 text-sm font-medium hover:underline">
                            Delete Account
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AccountModal;