import React from "react";
import { Disc, MapPin, Star } from "lucide-react";

const MusicDisplay = ({ music }) => {
  if (!music) return null;

  return (
    <div className="bg-gradient-to-br from-red-900 via-purple-950 to-black p-8 rounded-3xl border-2 border-red-600/50 shadow-[0_0_50px_rgba(220,38,38,0.3)] animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col items-center text-center">
        <div className="bg-white/10 p-4 rounded-full mb-6 animate-bounce">
          <Disc className="h-16 w-16 text-red-500" />
        </div>

        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-red-400 mb-2">
          {music.titulo}
        </h2>

        <p className="text-xl text-gray-300 mb-8 uppercase tracking-widest font-light">
          {music.artista}
        </p>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="bg-black/40 p-4 rounded-2xl border border-white/10">
            <div className="flex items-center justify-center text-red-400 mb-1">
              <MapPin className="h-5 w-5 mr-2" />
              <span className="text-xs font-bold uppercase">Localização</span>
            </div>
            <div className="text-2xl font-bold">{music.local}</div>
          </div>

          <div className="bg-black/40 p-4 rounded-2xl border border-white/10">
            <div className="flex items-center justify-center text-yellow-400 mb-1">
              <Star className="h-5 w-5 mr-2" />
              <span className="text-xs font-bold uppercase">Versão</span>
            </div>
            <div className="text-lg font-bold truncate">{music.versao}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicDisplay;
