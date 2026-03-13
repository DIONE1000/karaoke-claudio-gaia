import React, { useRef, useEffect, useMemo } from "react";
import { Mic2, Save, Music4, Link2 } from "lucide-react";

export function FormularioCadastro({
  formData,
  setFormData,
  handleSalvarNovo,
  opcoesMusica,
  opcoesCantor,
  opcoesLocal,
  opcoesVersao,
}) {
  const musicaInputRef = useRef(null);
  const cantorInputRef = useRef(null);
  const localInputRef = useRef(null);
  const versaoInputRef = useRef(null);
  const sugestoesMusicaRef = useRef(null);
  const sugestoesCantorRef = useRef(null);
  const sugestoesLocalRef = useRef(null);
  const sugestoesVersaoRef = useRef(null);

  const [showSugestoesMusica, setShowSugestoesMusica] = React.useState(false);
  const [showSugestoesCantor, setShowSugestoesCantor] = React.useState(false);
  const [showSugestoesLocal, setShowSugestoesLocal] = React.useState(false);
  const [showSugestoesVersao, setShowSugestoesVersao] = React.useState(false);

  const sugestoesMusica = useMemo(() => {
    const texto = formData.musica.trim().toLowerCase();
    if (texto.length < 1) return [];
    return opcoesMusica.filter((n) => n.toLowerCase().includes(texto));
  }, [formData.musica, opcoesMusica]);

  const sugestoesCantor = useMemo(() => {
    const texto = formData.cantor.trim().toLowerCase();
    if (texto.length < 1) return [];
    return opcoesCantor.filter((n) => n.toLowerCase().includes(texto));
  }, [formData.cantor, opcoesCantor]);

  const sugestoesLocal = useMemo(() => {
    const texto = formData.local.trim().toLowerCase();
    if (texto.length < 1) return [];
    return opcoesLocal.filter((n) => n.toLowerCase().includes(texto));
  }, [formData.local, opcoesLocal]);

  const sugestoesVersao = useMemo(() => {
    const texto = formData.versao.trim().toLowerCase();
    if (texto.length < 1) return [];
    return opcoesVersao.filter((n) => n.toLowerCase().includes(texto));
  }, [formData.versao, opcoesVersao]);

  useEffect(() => {
    const handler = (e) => {
      if (
        sugestoesMusicaRef.current &&
        !sugestoesMusicaRef.current.contains(e.target) &&
        musicaInputRef.current &&
        !musicaInputRef.current.contains(e.target)
      )
        setShowSugestoesMusica(false);
      if (
        sugestoesCantorRef.current &&
        !sugestoesCantorRef.current.contains(e.target) &&
        cantorInputRef.current &&
        !cantorInputRef.current.contains(e.target)
      )
        setShowSugestoesCantor(false);
      if (
        sugestoesLocalRef.current &&
        !sugestoesLocalRef.current.contains(e.target) &&
        localInputRef.current &&
        !localInputRef.current.contains(e.target)
      )
        setShowSugestoesLocal(false);
      if (
        sugestoesVersaoRef.current &&
        !sugestoesVersaoRef.current.contains(e.target) &&
        versaoInputRef.current &&
        !versaoInputRef.current.contains(e.target)
      )
        setShowSugestoesVersao(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selecionarSugestaoMusica = (nomeMusica, buscarRegistro) => {
    const registro = buscarRegistro ? buscarRegistro(nomeMusica) : null;
    if (registro) {
      setFormData({
        ...formData,
        musica: registro.musica,
        cantor: registro.cantor,
        local: registro.local,
        versao: registro.versao,
      });
    } else {
        setFormData({ ...formData, musica: nomeMusica });
    }
    setShowSugestoesMusica(false);
  };

  const selecionarSugestaoCantor = (nomeCantor) => {
    setFormData({ ...formData, cantor: nomeCantor });
    setShowSugestoesCantor(false);
  };

  return (
    <>
      <h2 className="text-xs font-bold text-red-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
        <Music4 size={18} /> Cadastrar Música
      </h2>

      <form onSubmit={handleSalvarNovo}>
        {/* ROW 1: INPUTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
          {/* MÚSICA */}
          <div className="lg:col-span-4 space-y-1 relative">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 block">Música</label>
            <div className="relative">
              <input
                ref={musicaInputRef}
                type="text"
                placeholder="Nome da canção"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all placeholder:text-slate-700 text-slate-100"
                value={formData.musica}
                onChange={(e) => {
                  setFormData({ ...formData, musica: e.target.value });
                  setShowSugestoesMusica(true);
                }}
                onFocus={() => setShowSugestoesMusica(true)}
                autoComplete="off"
              />
            </div>
            {/* Dropdown Música */}
            {showSugestoesMusica && sugestoesMusica.length > 0 && (
              <div ref={sugestoesMusicaRef} className="absolute z-20 w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden max-h-48 overflow-y-auto">
                {sugestoesMusica.map((nome, i) => (
                  <button key={i} type="button"
                    className="w-full text-left px-4 py-3 hover:bg-red-600/20 transition-colors text-sm border-b border-slate-800 last:border-0 flex items-center gap-2"
                    onClick={() => selecionarSugestaoMusica(nome, null)}>
                    <Music4 size={14} className="text-red-500 shrink-0" />
                    <span className="text-slate-200">{nome}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CANTOR */}
          <div className="lg:col-span-4 space-y-1 relative">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 block">Cantor / Banda</label>
            <div className="relative">
              <input
                ref={cantorInputRef}
                type="text"
                placeholder="Artista original"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all placeholder:text-slate-700 text-slate-100"
                value={formData.cantor}
                onChange={(e) => { setFormData({ ...formData, cantor: e.target.value }); setShowSugestoesCantor(true); }}
                onFocus={() => setShowSugestoesCantor(true)}
                autoComplete="off"
              />
            </div>
            {/* Dropdown Cantor */}
            {showSugestoesCantor && sugestoesCantor.length > 0 && (
              <div ref={sugestoesCantorRef} className="absolute z-20 w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden max-h-48 overflow-y-auto">
                {sugestoesCantor.map((nome, i) => (
                  <button key={i} type="button"
                    className="w-full text-left px-4 py-3 hover:bg-red-600/20 transition-colors text-sm border-b border-slate-800 last:border-0 flex items-center gap-2"
                    onClick={() => selecionarSugestaoCantor(nome)}>
                    <Mic2 size={14} className="text-red-500 shrink-0" />
                    <span className="text-slate-200">{nome}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* LOCAL */}
          <div className="lg:col-span-2 space-y-1 relative">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Local</label>
            <input
              ref={localInputRef}
              type="text" placeholder="Pasta-Nº"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all placeholder:text-slate-700"
              value={formData.local}
              onChange={(e) => { setFormData({ ...formData, local: e.target.value }); setShowSugestoesLocal(true); }}
              onFocus={() => setShowSugestoesLocal(true)}
              autoComplete="off"
            />
            {showSugestoesLocal && sugestoesLocal.length > 0 && (
              <div ref={sugestoesLocalRef} className="absolute z-20 w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden max-h-40 overflow-y-auto">
                {sugestoesLocal.map((nome, i) => (
                  <button key={i} type="button"
                    className="w-full text-left px-3 py-2.5 hover:bg-red-600/20 transition-colors text-xs border-b border-slate-800 last:border-0 font-mono text-red-400"
                    onClick={() => { setFormData({ ...formData, local: nome }); setShowSugestoesLocal(false); }}>
                    {nome}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* VERSÃO */}
          <div className="lg:col-span-2 space-y-1 relative">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Versão</label>
            <input
              ref={versaoInputRef}
              type="text" placeholder="Ex: Forró"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all placeholder:text-slate-700"
              value={formData.versao}
              onChange={(e) => { setFormData({ ...formData, versao: e.target.value }); setShowSugestoesVersao(true); }}
              onFocus={() => setShowSugestoesVersao(true)}
              autoComplete="off"
            />
            {showSugestoesVersao && sugestoesVersao.length > 0 && (
              <div ref={sugestoesVersaoRef} className="absolute z-20 w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden max-h-40 overflow-y-auto">
                {sugestoesVersao.map((nome, i) => (
                  <button key={i} type="button"
                    className="w-full text-left px-3 py-2.5 hover:bg-red-600/20 transition-colors text-xs border-b border-slate-800 last:border-0 text-amber-400"
                    onClick={() => { setFormData({ ...formData, versao: nome }); setShowSugestoesVersao(false); }}>
                    {nome}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ROW 2: HIPERLINK + BOTÃO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-6 items-end">
          {/* HIPERLINK */}
          <div className="lg:col-span-9 space-y-3 border border-slate-800 rounded-xl p-4 bg-slate-950/50">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5">
                <Link2 size={14} /> Hiperlink (opcional)
              </label>
              <button type="button"
                onClick={() => setFormData({ ...formData, linkAtivo: !formData.linkAtivo })}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${formData.linkAtivo ? "bg-red-600" : "bg-slate-700"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${formData.linkAtivo ? "translate-x-5" : "translate-x-0"}`} />
              </button>
            </div>
            
            {formData.linkAtivo && (
              <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-4">
                <input type="url" placeholder="Cole o link aqui..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-sky-500 outline-none transition-all placeholder:text-slate-700 text-sm"
                  value={formData.link} onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                />
                <div className="flex gap-2 p-1 bg-slate-950 rounded-lg min-w-[200px]">
                  <button type="button"
                    onClick={() => setFormData({ ...formData, linkTipo: "cantor" })}
                    className={`flex-1 py-2 px-3 text-xs font-bold rounded-md transition-all ${
                      formData.linkTipo === "cantor" ? "bg-sky-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-300 hover:bg-slate-900"
                    }`}>Sobre o Cantor</button>
                  <button type="button"
                    onClick={() => setFormData({ ...formData, linkTipo: "musica" })}
                    className={`flex-1 py-2 px-3 text-xs font-bold rounded-md transition-all ${
                      formData.linkTipo === "musica" ? "bg-sky-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-300 hover:bg-slate-900"
                    }`}>Sobre a Música</button>
                </div>
              </div>
            )}
          </div>

          {/* BOTAO SALVAR */}
          <div className="lg:col-span-3">
            <button type="submit"
              className={`w-full bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-900/40 active:scale-95 ${formData.linkAtivo ? 'h-full py-3' : 'py-4'}`}
              style={{ minHeight: '52px' }}
            >
              <Save size={18} /> SALVAR REGISTRO
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
