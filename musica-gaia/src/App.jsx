import React, { useState } from "react";
import {
  Mic2,
  Save,
  Search,
  Trash2,
  Edit2,
  Check,
  X,
  Disc3,
  Music4,
} from "lucide-react";

function App() {
  // --- ESTADOS ---
  const [formData, setFormData] = useState({
    musica: "",
    cantor: "",
    local: "",
    versao: "",
  });
  const [registros, setRegistros] = useState([
    {
      id: 1,
      musica: "Evidências",
      cantor: "Chitãozinho & Xororó",
      local: "P01-N12",
      versao: "Original",
    },
    {
      id: 2,
      musica: "Boate Azul",
      cantor: "Bruno & Marrone",
      local: "P05-N20",
      versao: "Forró",
    },
  ]);
  const [busca, setBusca] = useState("");
  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  // ESTADO DO POPUP DINÂMICO
  const [toast, setToast] = useState({ visivel: false, mensagem: "", cor: "" });

  // --- FUNÇÕES DE AUXÍLIO ---
  const formatarTexto = (txt) => {
    if (!txt) return "";
    return txt.trim().charAt(0).toUpperCase() + txt.slice(1);
  };

  const formatarLocal = (txt) => txt.trim().toUpperCase();

  // FUNÇÃO PARA DISPARAR O POPUP
  const dispararToast = (mensagem, cor = "bg-emerald-600") => {
    setToast({ visivel: true, mensagem, cor });
    setTimeout(() => setToast({ ...toast, visivel: false }), 3000);
  };

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
    };

    setRegistros([novoRegistro, ...registros]);
    setFormData({ musica: "", cantor: "", local: "", versao: "" });
    dispararToast("Música cadastrada com sucesso!", "bg-emerald-600"); // VERDE
  };

  const confirmarEdicao = () => {
    const registroEditado = {
      ...editFormData,
      musica: formatarTexto(editFormData.musica),
      cantor: formatarTexto(editFormData.cantor),
      local: formatarLocal(editFormData.local),
      versao: formatarTexto(editFormData.versao),
    };

    setRegistros(registros.map((r) => (r.id === editId ? registroEditado : r)));
    setEditId(null);
    dispararToast("Registro atualizado!", "bg-blue-600"); // AZUL
  };

  const excluirRegistro = (id) => {
    if (window.confirm("Apagar este registro permanentemente?")) {
      setRegistros(registros.filter((r) => r.id !== id));
      dispararToast("Registro removido do banco!", "bg-amber-600"); // LARANJA/AMBAR
    }
  };

  const registrosFiltrados = registros.filter(
    (r) =>
      r.musica.toLowerCase().includes(busca.toLowerCase()) ||
      r.cantor.toLowerCase().includes(busca.toLowerCase()) ||
      r.local.toLowerCase().includes(busca.toLowerCase()),
  );

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

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[350px,1fr] gap-8">
        {/* FORMULÁRIO */}
        <section className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800 h-fit backdrop-blur-sm shadow-xl">
          <h2 className="text-xs font-bold text-red-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <Music4 size={18} /> Cadastrar Música
          </h2>

          <form onSubmit={handleSalvarNovo} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                Música
              </label>
              <input
                type="text"
                placeholder="Nome da canção"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all placeholder:text-slate-700"
                value={formData.musica}
                onChange={(e) =>
                  setFormData({ ...formData, musica: e.target.value })
                }
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                Cantor / Banda
              </label>
              <input
                type="text"
                placeholder="Artista original"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all placeholder:text-slate-700"
                value={formData.cantor}
                onChange={(e) =>
                  setFormData({ ...formData, cantor: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                  Local
                </label>
                <input
                  type="text"
                  placeholder="Pasta-Nº"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all placeholder:text-slate-700"
                  value={formData.local}
                  onChange={(e) =>
                    setFormData({ ...formData, local: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                  Versão
                </label>
                <input
                  type="text"
                  placeholder="Ex: Forró"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all placeholder:text-slate-700"
                  value={formData.versao}
                  onChange={(e) =>
                    setFormData({ ...formData, versao: e.target.value })
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl mt-4 flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-900/40 active:scale-95"
            >
              <Save size={18} /> SALVAR REGISTRO
            </button>
          </form>
        </section>

        {/* BUSCA E TABELA */}
        <section className="space-y-4">
          <div className="relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-red-500 transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Pesquisar por música, cantor ou pasta..."
              className="w-full bg-slate-900/30 border border-slate-800 rounded-2xl pl-12 pr-4 py-5 outline-none focus:border-red-600 transition-all text-lg"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <div className="bg-slate-900/20 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-900/60 text-[10px] uppercase font-black tracking-widest text-slate-500 border-b border-slate-800">
                  <th className="px-6 py-4">Música</th>
                  <th className="px-6 py-4">Cantor</th>
                  <th className="px-6 py-4">Local</th>
                  <th className="px-6 py-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {registrosFiltrados.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-800/30 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      {editId === item.id ? (
                        <input
                          className="bg-slate-950 border border-slate-700 rounded px-2 py-1 w-full text-white outline-none focus:border-red-600"
                          value={editFormData.musica}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              musica: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <span className="font-bold text-slate-100">
                          {item.musica}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm">
                      {editId === item.id ? (
                        <input
                          className="bg-slate-950 border border-slate-700 rounded px-2 py-1 w-full text-white outline-none focus:border-red-600"
                          value={editFormData.cantor}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              cantor: e.target.value,
                            })
                          }
                        />
                      ) : (
                        item.cantor
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editId === item.id ? (
                        <input
                          className="bg-slate-950 border border-slate-700 rounded px-2 py-1 w-20 text-white outline-none focus:border-red-600"
                          value={editFormData.local}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              local: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <span className="text-red-500 font-mono bg-red-500/10 px-2 py-1 rounded border border-red-500/20 text-xs">
                          {item.local}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        {editId === item.id ? (
                          <>
                            <button
                              onClick={confirmarEdicao}
                              className="p-2 text-emerald-400 hover:bg-emerald-400/10 rounded-lg"
                            >
                              <Check size={18} />
                            </button>
                            <button
                              onClick={() => setEditId(null)}
                              className="p-2 text-slate-400 hover:bg-slate-400/10 rounded-lg"
                            >
                              <X size={18} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setEditId(item.id);
                                setEditFormData(item);
                              }}
                              className="p-2 text-slate-600 hover:text-red-500 transition-colors"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => excluirRegistro(item.id)}
                              className="p-2 text-slate-600 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* POPUP DINÂMICO (TOAST) */}
      {toast.visivel && (
        <div
          className={`fixed bottom-10 right-10 z-50 animate-toast ${toast.cor} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10 backdrop-blur-md`}
        >
          <div className="bg-white/20 rounded-full p-1">
            <Check size={20} strokeWidth={3} />
          </div>
          <span className="font-bold text-sm tracking-tight">
            {toast.mensagem}
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
