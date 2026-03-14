import React, { useState, useMemo } from "react";
import { Check } from "lucide-react";
import { FormularioCadastro } from "./components/FormularioCadastro/FormularioCadastro";
import { BarraFiltros } from "./components/BarraFiltros/BarraFiltros";
import { TabelaMusicas } from "./components/TabelaMusicas/TabelaMusicas";
import { getMusicas, createMusica, updateMusica, deleteMusica } from "./api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "./assets/logo_clean.png";

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
  
  const [registros, setRegistros] = useState([]);

  // --- CARREGAR DADOS ---
  useEffect(() => {
    carregarMusicas();
  }, []);

  const carregarMusicas = async () => {
    try {
      const response = await getMusicas();
      setRegistros(response.data);
    } catch (error) {
      console.error("Erro ao carregar músicas:", error);
      toast.error("Erro ao carregar músicas do servidor.");
    }
  };

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

  const [toastAtivo, setToastAtivo] = useState({ visivel: false, mensagem: "", cor: "" }); // Deprecated, will be removed
  const [isProcessing, setIsProcessing] = useState(false);

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

  const dispararToast = (mensagem, cor = "") => {
    // Keep for legacy if needed, but we'll use toast.success/error
    if (cor.includes("red")) toast.error(mensagem);
    else if (cor.includes("emerald") || cor.includes("blue")) toast.success(mensagem);
    else toast.info(mensagem);
  };

  const temFiltroAtivo = Object.values(filtros).some(Boolean);
  const limparTodosFiltros = () => setFiltros({ musica: null, cantor: null, local: null, versao: null });

  // --- AÇÕES ---
  const handleSalvarNovo = async (e) => {
    e.preventDefault();
    if (!formData.musica || !formData.cantor)
      return toast.warning("Preencha Música e Cantor!");

    setIsProcessing(true);
    const novoRegistro = {
      musica: formatarTexto(formData.musica),
      cantor: formatarTexto(formData.cantor),
      local: formatarLocal(formData.local),
      versao: formatarTexto(formData.versao),
      link: formData.linkAtivo ? formData.link.trim() : "",
      linkTipo: formData.linkTipo,
      linkAtivo: formData.linkAtivo && formData.link.trim() !== "",
    };

    try {
      await createMusica(novoRegistro);
      await carregarMusicas();
      setFormData({ musica: "", cantor: "", local: "", versao: "", link: "", linkTipo: "cantor", linkAtivo: false });
      toast.success("Música cadastrada com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar música:", error);
      toast.error("Não foi possível salvar a música. Tente novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  const confirmarEdicao = async () => {
    setIsProcessing(true);
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
    
    try {
      await updateMusica(editId, registroEditado);
      await carregarMusicas();
      setEditId(null);
      toast.success("Registro atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar música:", error);
      toast.error("Erro ao atualizar o registro.");
    } finally {
      setIsProcessing(false);
    }
  };

  const excluirRegistro = async (id) => {
    if (window.confirm("Apagar este registro permanentemente?")) {
      setIsProcessing(true);
      try {
        await deleteMusica(id);
        await carregarMusicas();
        toast.info("Registro removido do banco.");
      } catch (error) {
        console.error("Erro ao excluir música:", error);
        toast.error("Erro ao excluir o registro.");
      } finally {
        setIsProcessing(false);
      }
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
      <header className="max-w-7xl mx-auto flex items-center justify-start mb-10 border-b border-slate-700/50 pb-2 relative group">
        <div className="flex items-center gap-4 relative">
          <div className="absolute -inset-4 bg-slate-400/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          <img 
            src={logo} 
            alt="Karaokê do Cláudio Gaia" 
            className="h-24 md:h-32 w-auto hover:scale-105 transition-transform duration-500 drop-shadow-2xl relative"
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* FORMULÁRIO COMPONENTIZADO */}
        <section className="bg-slate-400/5 p-6 rounded-3xl border border-slate-700/30 backdrop-blur-sm shadow-xl relative z-20">
          <FormularioCadastro 
            formData={formData}
            setFormData={setFormData}
            handleSalvarNovo={handleSalvarNovo}
            opcoesMusica={opcoesMusica}
            opcoesCantor={opcoesCantor}
            opcoesLocal={opcoesLocal}
            opcoesVersao={opcoesVersao}
            isProcessing={isProcessing}
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
            isProcessing={isProcessing}
          />
        </section>
      </main>

      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
