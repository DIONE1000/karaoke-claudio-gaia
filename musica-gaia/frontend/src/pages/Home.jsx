import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  LogOut, 
  ShieldCheck
} from "lucide-react";
import { FormularioCadastro } from "../components/FormularioCadastro/FormularioCadastro";
import { BarraFiltros } from "../components/BarraFiltros/BarraFiltros";
import { TabelaMusicas } from "../components/TabelaMusicas/TabelaMusicas";
import { useAuth } from "../context/AuthContext";
import { useMusicas } from "../hooks/useMusicas";
import logo from "../assets/logo_clean.png";

const Home = () => {
    const { logoutUser, user } = useAuth();
    const navigate = useNavigate();
    const {
        busca,
        setBusca,
        editId,
        setEditId,
        editFormData,
        setEditFormData,
        filtros,
        setFiltros,
        isProcessing,
        formData,
        setFormData,
        opcoesMusica,
        opcoesCantor,
        opcoesLocal,
        opcoesVersao,
        registrosFiltrados,
        registros,
        limparTodosFiltros,
        handleSalvarNovo,
        confirmarEdicao,
        excluirRegistro
    } = useMusicas();

    const logout = () => {
        logoutUser();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 p-4 md:p-8 font-sans relative overflow-x-hidden">
            {/* HEADER */}
            <header className="max-w-7xl mx-auto flex items-center justify-between mb-10 border-b border-slate-700/30 pb-4">
                <div className="flex items-center gap-4">
                    <img src={logo} alt="Logo" className="h-16 md:h-20 w-auto" />
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end mr-2">
                        {user?.is_staff && (
                            <span className="text-[10px] font-black uppercase tracking-widest text-yellow-500 mb-0.5">Administrador</span>
                        )}
                        {!user?.is_staff && (
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-0.5">Usuário</span>
                        )}
                        <span className="text-xs font-bold text-white max-w-[150px] truncate">{user?.email}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        {user?.is_staff && (
                            <Link 
                                to="/users" 
                                className="flex items-center gap-2 px-4 py-2.5 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-yellow-950 rounded-xl transition-all border border-yellow-500/20 group"
                            >
                                <ShieldCheck size={18} className="group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-black uppercase tracking-tighter hidden md:inline">Gestão de Usuários</span>
                            </Link>
                        )}
                        <button onClick={logout} className="p-2.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all border border-red-500/20" title="Sair">
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto flex flex-col gap-8">
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
                    <BarraFiltros 
                        busca={busca}
                        setBusca={setBusca}
                        filtros={filtros}
                        setFiltros={setFiltros}
                        temFiltroAtivo={Object.values(filtros).some(Boolean)}
                        limparTodosFiltros={limparTodosFiltros}
                        registrosFiltrados={registrosFiltrados}
                        registrosLength={registros.length}
                        opcoesMusica={opcoesMusica}
                        opcoesCantor={opcoesCantor}
                        opcoesLocal={opcoesLocal}
                        opcoesVersao={opcoesVersao}
                    />

                    <TabelaMusicas 
                        registrosFiltrados={registrosFiltrados}
                        editId={editId}
                        setEditId={setEditId}
                        editFormData={editFormData}
                        setEditFormData={setEditFormData}
                        confirmarEdicao={confirmarEdicao}
                        excluirRegistro={excluirRegistro}
                        busca={busca}
                        temFiltroAtivo={Object.values(filtros).some(Boolean)}
                        limparTodosFiltros={limparTodosFiltros}
                        setBusca={setBusca}
                        isProcessing={isProcessing}
                    />
                </section>
            </main>
        </div>
    );
};

export default Home;
