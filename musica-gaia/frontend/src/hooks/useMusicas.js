import { useState, useMemo, useEffect } from "react";
import { getMusicas, createMusica, updateMusica, deleteMusica } from "../api/api";
import { toast } from "react-toastify";

export const useMusicas = () => {
    const [registros, setRegistros] = useState([]);
    const [busca, setBusca] = useState("");
    const [editId, setEditId] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [filtros, setFiltros] = useState({ musica: null, cantor: null, local: null, versao: null });
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({
        musica: "",
        cantor: "",
        local: "",
        versao: "",
        link: "",
        linkTipo: "cantor",
        linkAtivo: false,
    });

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

    // --- OPÇÕES ÚNICAS ---
    const opcoesMusica = useMemo(() => [...new Set(registros.map((r) => r.musica))].sort(), [registros]);
    const opcoesCantor = useMemo(() => [...new Set(registros.map((r) => r.cantor))].sort(), [registros]);
    const opcoesLocal  = useMemo(() => [...new Set(registros.map((r) => r.local))].sort(), [registros]);
    const opcoesVersao = useMemo(() => [...new Set(registros.map((r) => r.versao).filter(Boolean))].sort(), [registros]);

    // --- FILTRAGEM ---
    const registrosFiltrados = useMemo(() => {
        return registros.filter((r) => {
            const termo = busca.toLowerCase();
            if (termo) {
                const passaBusca =
                    r.musica.toLowerCase().includes(termo) ||
                    r.cantor.toLowerCase().includes(termo) ||
                    r.local.toLowerCase().includes(termo) ||
                    (r.versao || "").toLowerCase().includes(termo);
                if (!passaBusca) return false;
            }
            if (filtros.musica && r.musica !== filtros.musica) return false;
            if (filtros.cantor && r.cantor !== filtros.cantor) return false;
            if (filtros.local  && r.local  !== filtros.local)  return false;
            if (filtros.versao && r.versao !== filtros.versao) return false;
            return true;
        });
    }, [registros, busca, filtros]);

    const limparTodosFiltros = () => setFiltros({ musica: null, cantor: null, local: null, versao: null });

    const handleSalvarNovo = async (e) => {
        e.preventDefault();
        if (!formData.musica || !formData.cantor) return toast.warning("Preencha Música e Cantor!");

        setIsProcessing(true);
        try {
            const formatted = {
                ...formData,
                musica: formData.musica.trim(),
                cantor: formData.cantor.trim(),
                local: formData.local.trim().toUpperCase(),
            };
            await createMusica(formatted);
            await carregarMusicas();
            setFormData({ musica: "", cantor: "", local: "", versao: "", link: "", linkTipo: "cantor", linkAtivo: false });
            toast.success("Música cadastrada!");
        } catch (error) {
            toast.error("Erro ao salvar.");
        } finally {
            setIsProcessing(false);
        }
    };

    const confirmarEdicao = async () => {
        setIsProcessing(true);
        try {
            await updateMusica(editId, editFormData);
            await carregarMusicas();
            setEditId(null);
            toast.success("Atualizado!");
        } catch (error) {
            toast.error("Erro ao atualizar.");
        } finally {
            setIsProcessing(false);
        }
    };

    const excluirRegistro = async (id) => {
        if (window.confirm("Deseja mesmo excluir?")) {
            setIsProcessing(true);
            try {
                await deleteMusica(id);
                await carregarMusicas();
                toast.info("Removido.");
            } catch (error) {
                toast.error("Erro ao excluir.");
            } finally {
                setIsProcessing(false);
            }
        }
    };

    return {
        registros,
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
        limparTodosFiltros,
        handleSalvarNovo,
        confirmarEdicao,
        excluirRegistro
    };
};
