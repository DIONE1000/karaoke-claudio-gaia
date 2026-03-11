import React from "react";
import { Music, Mic2 } from "lucide-react";

const SuggestionsList = ({ suggestions, onSelect }) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="absolute z-10 w-full mt-1 bg-purple-950/90 border border-purple-800 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md">
      {suggestions.map((music) => (
        <button
          key={music.id}
          onClick={() => onSelect(music)}
          className="w-full flex items-center p-4 hover:bg-red-900/40 border-b border-purple-900/50 last:border-0 transition-colors text-left"
        >
          <div className="bg-red-600/20 p-2 rounded-lg mr-4">
            <Music className="h-5 w-5 text-red-400" />
          </div>
          <div>
            <div className="font-bold text-white">{music.titulo}</div>
            <div className="text-sm text-gray-400 flex items-center">
              <Mic2 className="h-3 w-3 mr-1" /> {music.artista}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default SuggestionsList;
