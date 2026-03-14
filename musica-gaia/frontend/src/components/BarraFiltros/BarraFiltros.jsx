import React from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { FiltroDropdown } from "../ui/FiltroDropdown";

export function BarraFiltros({
  busca,
  setBusca,
  filtros,
  setFiltros,
  temFiltroAtivo,
  limparTodosFiltros,
  registrosFiltrados,
  registrosLength,
  opcoesMusica,
  opcoesCantor,
  opcoesLocal,
  opcoesVersao,
}) {
  return (
    <>
      {/* BARRA DE PESQUISA (TEXTO) */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-amber-500 transition-colors" size={20} />
        <input
          type="text"
          placeholder="Pesquisar por música, cantor ou pasta..."
          className="w-full bg-slate-400/5 border border-slate-700/50 rounded-2xl pl-12 pr-4 py-5 outline-none focus:border-amber-500 transition-all text-lg backdrop-blur-sm"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {/* FILTROS DROPDOWN */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-slate-600 mr-1">
          <SlidersHorizontal size={15} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Filtrar</span>
        </div>
        <FiltroDropdown
          label="Música"
          opcoes={opcoesMusica}
          valorAtivo={filtros.musica}
          onSelecionar={(v) => setFiltros({ ...filtros, musica: v })}
          onLimpar={() => setFiltros({ ...filtros, musica: null })}
        />
        <FiltroDropdown
          label="Cantor"
          opcoes={opcoesCantor}
          valorAtivo={filtros.cantor}
          onSelecionar={(v) => setFiltros({ ...filtros, cantor: v })}
          onLimpar={() => setFiltros({ ...filtros, cantor: null })}
        />
        <FiltroDropdown
          label="Local"
          opcoes={opcoesLocal}
          valorAtivo={filtros.local}
          onSelecionar={(v) => setFiltros({ ...filtros, local: v })}
          onLimpar={() => setFiltros({ ...filtros, local: null })}
        />
        <FiltroDropdown
          label="Versão"
          opcoes={opcoesVersao}
          valorAtivo={filtros.versao}
          onSelecionar={(v) => setFiltros({ ...filtros, versao: v })}
          onLimpar={() => setFiltros({ ...filtros, versao: null })}
        />

        {temFiltroAtivo && (
          <button
            type="button"
            onClick={limparTodosFiltros}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-bold text-slate-500 hover:text-amber-400 transition-colors"
          >
            <X size={11} /> Limpar tudo
          </button>
        )}

        {registrosFiltrados.length !== registrosLength && (
          <span className="ml-auto text-xs text-slate-600">
            {registrosFiltrados.length} de {registrosLength} registros
          </span>
        )}
      </div>
    </>
  );
}
