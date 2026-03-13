import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Check } from "lucide-react";

export function FiltroDropdown({ label, opcoes, valorAtivo, onSelecionar, onLimpar }) {
  const [aberto, setAberto] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setAberto(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const ativo = !!valorAtivo;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
          ativo
            ? "bg-red-600 text-white border-red-500 shadow-lg shadow-red-900/40"
            : "bg-slate-800/70 text-slate-400 border-slate-700 hover:border-slate-500 hover:text-slate-200"
        }`}
      >
        {ativo ? (
          <>
            <span className="max-w-[90px] truncate">{valorAtivo}</span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                onLimpar();
              }}
              className="ml-1 hover:text-white/60 transition-colors"
              title="Limpar filtro"
            >
              <X size={11} />
            </span>
          </>
        ) : (
          <>
            {label}
            <ChevronDown
              size={12}
              className={`transition-transform ${aberto ? "rotate-180" : ""}`}
            />
          </>
        )}
      </button>

      {aberto && (
        <div className="absolute top-full mt-2 left-0 z-30 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden min-w-[180px] max-h-64 overflow-y-auto">
          <div className="px-3 pt-3 pb-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
            {label}
          </div>
          {opcoes.length === 0 ? (
            <p className="px-4 py-3 text-xs text-slate-600">Sem opções</p>
          ) : (
            opcoes.map((op) => (
              <button
                key={op}
                type="button"
                onClick={() => {
                  onSelecionar(op === valorAtivo ? null : op);
                  setAberto(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors border-b border-slate-800/50 last:border-0 flex items-center justify-between gap-2 ${
                  op === valorAtivo
                    ? "bg-red-600/20 text-red-400 font-bold"
                    : "hover:bg-slate-800/60 text-slate-300"
                }`}
              >
                {op}
                {op === valorAtivo && <Check size={13} className="text-red-400 shrink-0" />}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
