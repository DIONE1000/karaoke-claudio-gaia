import React from "react";
import { Edit2, Trash2, Check, X, Link2, ExternalLink, Search as SearchIcon } from "lucide-react";

export function TabelaMusicas({
  registrosFiltrados,
  editId,
  setEditId,
  editFormData,
  setEditFormData,
  confirmarEdicao,
  excluirRegistro,
  busca,
  temFiltroAtivo,
  limparTodosFiltros,
  setBusca,
  isProcessing,
}) {
  const renderLinkIcon = (item, coluna) => {
    if (!item.linkAtivo || !item.link || item.linkTipo !== coluna) return null;
    return (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center ml-2 text-sky-400 hover:text-sky-300 transition-colors"
        title={item.link}
        onClick={(e) => e.stopPropagation()}
      >
        <ExternalLink size={14} />
      </a>
    );
  };

  return (
    <div className="bg-slate-900/20 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-900/60 text-[10px] uppercase font-black tracking-widest text-slate-500 border-b border-slate-800">
            <th className="px-6 py-4">Música</th>
            <th className="px-6 py-4">Cantor</th>
            <th className="px-6 py-4">Local</th>
            <th className="px-6 py-4">Versão</th>
            <th className="px-6 py-4 text-center">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/40">
          {registrosFiltrados.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-16 text-center">
                <div className="flex flex-col items-center gap-3">
                  <SearchIcon size={36} className="text-slate-700" />
                  <p className="text-slate-400 font-bold text-base">Nenhum registro encontrado</p>
                  <p className="text-slate-600 text-sm">Tente ajustar os filtros ou a busca</p>
                  {(busca || temFiltroAtivo) && (
                    <button
                      type="button"
                      onClick={() => {
                        setBusca("");
                        limparTodosFiltros();
                      }}
                      className="mt-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors"
                    >
                      Limpar busca e filtros
                    </button>
                  )}
                </div>
              </td>
            </tr>
          )}
          {registrosFiltrados.map((item) => (
            <React.Fragment key={item.id}>
              <tr className="hover:bg-slate-800/30 transition-colors group">
                {/* MÚSICA */}
                <td className="px-6 py-4">
                  {editId === item.id ? (
                    <input
                      className="bg-slate-950 border border-slate-700 rounded px-2 py-1 w-full text-white outline-none focus:border-amber-500"
                      value={editFormData.musica}
                      onChange={(e) => setEditFormData({ ...editFormData, musica: e.target.value })}
                    />
                  ) : (
                    <span className="font-bold text-slate-100">
                      {item.musica}
                      {renderLinkIcon(item, "musica")}
                    </span>
                  )}
                </td>
                {/* CANTOR */}
                <td className="px-6 py-4 text-slate-400 text-sm">
                  {editId === item.id ? (
                    <input
                      className="bg-slate-950 border border-slate-700 rounded px-2 py-1 w-full text-white outline-none focus:border-amber-500"
                      value={editFormData.cantor}
                      onChange={(e) => setEditFormData({ ...editFormData, cantor: e.target.value })}
                    />
                  ) : (
                    <span>
                      {item.cantor}
                      {renderLinkIcon(item, "cantor")}
                    </span>
                  )}
                </td>
                {/* LOCAL */}
                <td className="px-6 py-4">
                  {editId === item.id ? (
                    <input
                      className="bg-slate-950 border border-slate-700 rounded px-2 py-1 w-20 text-white outline-none focus:border-amber-500"
                      value={editFormData.local}
                      onChange={(e) => setEditFormData({ ...editFormData, local: e.target.value })}
                    />
                  ) : (
                    <span className="text-amber-400 font-mono bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20 text-xs">
                      {item.local}
                    </span>
                  )}
                </td>
                {/* VERSÃO */}
                <td className="px-6 py-4">
                  {editId === item.id ? (
                    <input
                      className="bg-slate-950 border border-slate-700 rounded px-2 py-1 w-24 text-white outline-none focus:border-amber-500"
                      value={editFormData.versao}
                      onChange={(e) => setEditFormData({ ...editFormData, versao: e.target.value })}
                    />
                  ) : (
                    <span className="text-cyan-400 font-mono bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20 text-xs">
                      {item.versao}
                    </span>
                  )}
                </td>
                {/* AÇÕES */}
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    {editId === item.id ? (
                      <>
                        <button
                          onClick={confirmarEdicao}
                          disabled={isProcessing}
                          className={`p-2 ${isProcessing ? 'text-slate-600 cursor-not-allowed' : 'text-emerald-400 hover:bg-emerald-400/10'} rounded-lg`}
                        >
                          {isProcessing ? (
                            <div className="w-4 h-4 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
                          ) : (
                            <Check size={18} />
                          )}
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
                            setEditFormData({
                              ...item,
                              link: item.link || "",
                              linkTipo: item.linkTipo || "cantor",
                              linkAtivo: item.linkAtivo || false,
                            });
                          }}
                          className="p-2 text-slate-600 hover:text-amber-500 transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => excluirRegistro(item.id)}
                          className="p-2 text-slate-600 hover:text-cyan-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
              {/* LINHA DE EDIÇÃO DO LINK */}
              {editId === item.id && (
                <tr className="bg-slate-900/40 border-t border-slate-800/60">
                  <td colSpan={5} className="px-6 py-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                        <Link2 size={12} /> Link
                      </span>
                      {/* Toggle */}
                      <button
                        type="button"
                        onClick={() =>
                          setEditFormData({ ...editFormData, linkAtivo: !editFormData.linkAtivo })
                        }
                        className={`relative w-9 h-5 rounded-full transition-colors duration-200 shrink-0 ${
                          editFormData.linkAtivo ? "bg-red-600" : "bg-slate-700"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                            editFormData.linkAtivo ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </button>
                      {editFormData.linkAtivo && (
                        <>
                          {/* URL input */}
                          <input
                            type="url"
                            placeholder="URL do link..."
                            className="flex-1 min-w-[180px] bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-sky-500 placeholder:text-slate-600"
                            value={editFormData.link || ""}
                            onChange={(e) =>
                              setEditFormData({ ...editFormData, link: e.target.value })
                            }
                          />
                          {/* Tipo */}
                          <div className="flex gap-1.5">
                            <button
                              type="button"
                              onClick={() => setEditFormData({ ...editFormData, linkTipo: "cantor" })}
                              className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                                editFormData.linkTipo === "cantor"
                                  ? "bg-sky-600 text-white"
                                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                              }`}
                            >
                              Cantor
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditFormData({ ...editFormData, linkTipo: "musica" })}
                              className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                                editFormData.linkTipo === "musica"
                                  ? "bg-sky-600 text-white"
                                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                              }`}
                            >
                              Música
                            </button>
                          </div>
                          {/* Preview */}
                          {editFormData.link && (
                            <a
                              href={editFormData.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sky-400 hover:text-sky-300 transition-colors"
                              title="Testar link"
                            >
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
