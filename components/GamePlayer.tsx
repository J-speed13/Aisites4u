import React, { useState, useEffect } from 'react';
import { Game } from '../types';
import { X, Maximize2, Minimize2, AlertCircle, RefreshCw } from 'lucide-react';

interface GamePlayerProps {
  game: Game;
  onClose: () => void;
}

const GamePlayer: React.FC<GamePlayerProps> = ({ game, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Lock body scroll when player is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const toggleFullscreen = () => {
    const elem = document.getElementById('game-frame-container');
    if (!elem) return;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, [])


  return (
    <div className="fixed inset-0 z-50 bg-nexus-900/95 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-nexus-700 bg-nexus-900">
        <div className="flex items-center gap-4">
            <button 
                onClick={onClose}
                className="p-2 hover:bg-nexus-700 rounded-full text-gray-400 hover:text-white transition-colors"
            >
                <X size={24} />
            </button>
            <div>
                <h2 className="text-xl font-bold text-white font-arcade tracking-wider">{game.title}</h2>
                <span className="text-sm text-nexus-accent">{game.category}</span>
            </div>
        </div>

        <div className="flex items-center gap-3">
             <button 
                onClick={() => {
                    const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
                    if(iframe) iframe.src = iframe.src;
                    setLoading(true);
                }}
                className="p-2 hover:bg-nexus-700 rounded-lg text-gray-300 hover:text-nexus-accent flex items-center gap-2"
                title="Reload Game"
            >
                <RefreshCw size={20} />
            </button>

            <button 
                onClick={toggleFullscreen}
                className="p-2 hover:bg-nexus-700 rounded-lg text-gray-300 hover:text-nexus-accent flex items-center gap-2"
                title="Fullscreen"
            >
                {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                <span className="hidden sm:inline">Fullscreen</span>
            </button>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex bg-black relative overflow-hidden" id="game-frame-container">
        {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-nexus-900 z-10">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-nexus-accent border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-nexus-accent font-arcade animate-pulse">LOADING CARTRIDGE...</p>
                </div>
            </div>
        )}
        
        <iframe
            id="game-iframe"
            src={game.url}
            title={game.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            onLoad={() => setLoading(false)}
        />
      </div>

      {/* Instructions / Footer */}
      <div className="bg-nexus-900 p-4 border-t border-nexus-700 flex items-start gap-4 text-sm text-gray-300">
        <AlertCircle size={20} className="text-nexus-accent flex-shrink-0 mt-0.5" />
        <div>
            <span className="font-bold text-white mr-2">Controls:</span>
            {game.instructions || "Follow on-screen instructions."}
        </div>
      </div>
    </div>
  );
};

export default GamePlayer;