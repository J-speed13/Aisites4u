import React from 'react';
import { Game } from '../types';
import { Play, Info } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onPlay: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onPlay }) => {
  return (
    <div 
      className="group relative bg-nexus-800 rounded-xl overflow-hidden shadow-lg hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all duration-300 transform hover:-translate-y-1 border border-nexus-700 hover:border-nexus-accent"
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-nexus-900 to-transparent opacity-80" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
                onClick={() => onPlay(game)}
                className="bg-nexus-accent text-nexus-900 rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300 hover:bg-white"
            >
                <Play fill="currentColor" size={24} />
            </button>
        </div>

        <div className="absolute bottom-0 left-0 p-4">
            <span className="text-xs font-bold text-nexus-accent uppercase tracking-wider bg-nexus-900/50 px-2 py-1 rounded backdrop-blur-sm">
                {game.category}
            </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-nexus-accent truncate">{game.title}</h3>
        <p className="text-gray-400 text-sm line-clamp-2 h-10">{game.description}</p>
        
        <div className="mt-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-xs text-gray-500 font-mono">ID: {game.id.toUpperCase()}</span>
             <button onClick={() => onPlay(game)} className="text-sm text-nexus-accent hover:underline flex items-center gap-1">
                Play Now
            </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;