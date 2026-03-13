import React, { useState, useMemo } from "react";
import { Check } from "lucide-react";
import { FormularioCadastro } from "./components/FormularioCadastro/FormularioCadastro";
import { BarraFiltros } from "./components/BarraFiltros/BarraFiltros";
import { TabelaMusicas } from "./components/TabelaMusicas/TabelaMusicas";

// ─── Componente de Filtro Dropdown ─────────────────────────────────────────
// NOTE: This component is now used by BarraFiltros, not directly by App.
// It remains here for completeness as it was part of the original file.
// In a real refactor, it would likely be moved to its own file.
import { useRef, useEffect } from "react"; // Added back for FiltroDropdown
import {
  Mic2,
  Save,
  Search,
  Trash2,
  Edit2,
  X,
  Music4,
  Link2,
  ExternalLink,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react"; // Added back for FiltroDropdown and other components

function FiltroDropdown({ label, opcoes, valorAtivo, onSelecionar, onLimpar }) {
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

// ─── App Principal ──────────────────────────────────────────────────────────
function App() {
  // --- ESTADOS ---
  const [formData, setFormData] = useState({
    musica: "",
    cantor: "",
    local: "",
    versao: "",
    link: "",
    linkTipo: "cantor",
    linkAtivo: false,
  });
  
  const [registros, setRegistros] = useState([
    {
      id: 1,
      musica: "Evidências",
      cantor: "Chitãozinho & Xororó",
      local: "P01-N12",
      versao: "Original",
      link: "",
      linkTipo: "cantor",
      linkAtivo: false,
    },
    {
      id: 2,
      musica: "Boate Azul",
      cantor: "Bruno & Marrone",
      local: "P05-N20",
      versao: "Forró",
      link: "https://www.youtube.com/watch?v=example",
      linkTipo: "musica",
      linkAtivo: true,
    },
  ]);

  const [busca, setBusca] = useState("");
  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  // FILTROS DROPDOWN
  const [filtros, setFiltros] = useState({
    musica: null,
    cantor: null,
    local: null,
    versao: null,
  });

  // TOAST
  const [toast, setToast] = useState({ visivel: false, mensagem: "", cor: "" });

  // --- OPÇÕES ÚNICAS PARA OS DROPDOWNS E AUTOCOMPLETE ---
  const opcoesMusica = useMemo(() => [...new Set(registros.map((r) => r.musica))].sort(), [registros]);
  const opcoesCantor = useMemo(() => [...new Set(registros.map((r) => r.cantor))].sort(), [registros]);
  const opcoesLocal  = useMemo(() => [...new Set(registros.map((r) => r.local))].sort(), [registros]);
  const opcoesVersao = useMemo(() => [...new Set(registros.map((r) => r.versao).filter(Boolean))].sort(), [registros]);

  // --- FUNÇÕES AUXILIARES ---
  const formatarTexto = (txt) => {
    if (!txt) return "";
    return txt.trim().charAt(0).toUpperCase() + txt.slice(1);
  };
  const formatarLocal = (txt) => txt.trim().toUpperCase();

  const dispararToast = (mensagem, cor = "bg-emerald-600") => {
    setToast({ visivel: true, mensagem, cor });
    setTimeout(() => setToast({ visivel: false, mensagem: "", cor: "" }), 3000);
  };

  const temFiltroAtivo = Object.values(filtros).some(Boolean);
  const limparTodosFiltros = () => setFiltros({ musica: null, cantor: null, local: null, versao: null });

  // --- AÇÕES ---
  const handleSalvarNovo = (e) => {
    e.preventDefault();
    if (!formData.musica || !formData.cantor)
      return alert("Preencha Música e Cantor!");

    const novoRegistro = {
      id: Date.now(),
      musica: formatarTexto(formData.musica),
      cantor: formatarTexto(formData.cantor),
      local: formatarLocal(formData.local),
      versao: formatarTexto(formData.versao),
      link: formData.linkAtivo ? formData.link.trim() : "",
      linkTipo: formData.linkTipo,
      linkAtivo: formData.linkAtivo && formData.link.trim() !== "",
    };

    setRegistros([novoRegistro, ...registros]);
    setFormData({ musica: "", cantor: "", local: "", versao: "", link: "", linkTipo: "cantor", linkAtivo: false });
    dispararToast("Música cadastrada com sucesso!", "bg-emerald-600");
  };

  const confirmarEdicao = () => {
    const registroEditado = {
      ...editFormData,
      musica: formatarTexto(editFormData.musica),
      cantor: formatarTexto(editFormData.cantor),
      local: formatarLocal(editFormData.local),
      versao: formatarTexto(editFormData.versao),
      link: editFormData.linkAtivo ? (editFormData.link || "").trim() : "",
      linkTipo: editFormData.linkTipo || "cantor",
      linkAtivo: editFormData.linkAtivo && (editFormData.link || "").trim() !== "",
    };
    setRegistros(registros.map((r) => (r.id === editId ? registroEditado : r)));
    setEditId(null);
    dispararToast("Registro atualizado!", "bg-blue-600");
  };

  const excluirRegistro = (id) => {
    if (window.confirm("Apagar este registro permanentemente?")) {
      setRegistros(registros.filter((r) => r.id !== id));
      dispararToast("Registro removido do banco!", "bg-amber-600");
    }
  };

  // --- FILTRAGEM ---
  const registrosFiltrados = registros.filter((r) => {
    // 1. Filtro de texto
    const termo = busca.toLowerCase();
    if (termo) {
      const passaBusca =
        r.musica.toLowerCase().includes(termo) ||
        r.cantor.toLowerCase().includes(termo) ||
        r.local.toLowerCase().includes(termo) ||
        (r.versao || "").toLowerCase().includes(termo);
      if (!passaBusca) return false;
    }

    // 2. Filtros dropdown
    if (filtros.musica && r.musica !== filtros.musica) return false;
    if (filtros.cantor && r.cantor !== filtros.cantor) return false;
    if (filtros.local  && r.local  !== filtros.local)  return false;
    if (filtros.versao && r.versao !== filtros.versao) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 p-4 md:p-8 font-sans relative overflow-x-hidden">
      {/* HEADER */}
      <header className="max-w-7xl mx-auto flex items-center gap-4 mb-10 border-b border-slate-800 pb-6">
        <div className="bg-red-600 p-2.5 rounded-2xl shadow-lg shadow-red-900/20">
          <Mic2 className="text-white h-7 w-7" />
        </div>
        <h1 className="text-3xl font-black tracking-tighter uppercase">
          Karaokê do <span className="text-red-600">Cláudio Gaia</span>
        </h1>
      </header>

      <main className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* FORMULÁRIO COMPONENTIZADO */}
        <section className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800 backdrop-blur-sm shadow-xl relative z-20">
          <FormularioCadastro 
            formData={formData}
            setFormData={setFormData}
            handleSalvarNovo={handleSalvarNovo}
            opcoesMusica={opcoesMusica}
            opcoesCantor={opcoesCantor}
            opcoesLocal={opcoesLocal}
            opcoesVersao={opcoesVersao}
          />
        </section>

        <section className="space-y-4 min-w-0">
          {/* BARRA DE FILTROS COMPONENTIZADA */}
          <BarraFiltros 
            busca={busca}
            setBusca={setBusca}
            filtros={filtros}
            setFiltros={setFiltros}
            temFiltroAtivo={temFiltroAtivo}
            limparTodosFiltros={limparTodosFiltros}
            registrosFiltrados={registrosFiltrados}
            registrosLength={registros.length}
            opcoesMusica={opcoesMusica}
            opcoesCantor={opcoesCantor}
            opcoesLocal={opcoesLocal}
            opcoesVersao={opcoesVersao}
          />

          {/* TABELA COMPONENTIZADA */}
          <TabelaMusicas 
            registrosFiltrados={registrosFiltrados}
            editId={editId}
            setEditId={setEditId}
            editFormData={editFormData}
            setEditFormData={setEditFormData}
            confirmarEdicao={confirmarEdicao}
            excluirRegistro={excluirRegistro}
            busca={busca}
            temFiltroAtivo={temFiltroAtivo}
            limparTodosFiltros={limparTodosFiltros}
            setBusca={setBusca}
          />
        </section>
      </main>

      {/* TOAST */}
      {toast.visivel && (
        <div className={`fixed bottom-10 right-10 z-50 animate-toast ${toast.cor} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10 backdrop-blur-md`}>
          <div className="bg-white/20 rounded-full p-1"><Check size={20} strokeWidth={3} /></div>
          <span className="font-bold text-sm tracking-tight">{toast.mensagem}</span>
        </div>
      )}
    </div>
  );
}

export default App;
