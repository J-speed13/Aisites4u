import React from 'react';
import { Feature } from '../types';
import { Brain, Terminal, PenTool, BarChart, ArrowRight, Eye, Music } from 'lucide-react';

// Map icon names to components
const IconMap: Record<string, React.ElementType> = {
    'Brain': Brain,
    'Terminal': Terminal,
    'PenTool': PenTool,
    'BarChart': BarChart,
    'Eye': Eye,
    'Music': Music
};

interface FeatureCardProps {
  feature: Feature;
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, onClick }) => {
  const Icon = IconMap[feature.iconName] || Brain;

  return (
    <button 
        onClick={onClick}
        className="group w-full text-left p-6 rounded-2xl bg-ai-surface border border-slate-700 hover:border-ai-accent/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.1)] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-ai-accent/50"
    >
      <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-slate-800 group-hover:border-ai-accent">
        <Icon className="text-ai-accent" size={24} />
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2 font-display">{feature.title}</h3>
      <p className="text-ai-muted text-sm leading-relaxed mb-4">
        {feature.description}
      </p>
      
      <div className="flex items-center text-ai-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
        <span>Try it now</span>
        <ArrowRight size={16} className="ml-1" />
      </div>
    </button>
  );
};

export default FeatureCard;