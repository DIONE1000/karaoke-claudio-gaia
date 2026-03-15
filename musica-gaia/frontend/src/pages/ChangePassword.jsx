import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { changePassword } from '../api/api';
import { toast } from 'react-toastify';
import logo from '../assets/logo_clean.png';
import { KeyRound, Lock, ShieldCheck, Loader2, ArrowRight } from 'lucide-react';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            return toast.error('As senhas não coincidem.');
        }

        setLoading(true);
        try {
            await changePassword({
                old_password: oldPassword,
                new_password: newPassword
            });
            toast.success('Senha alterada com sucesso! Faça login novamente.');
            navigate('/login');
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.error || 'Erro ao alterar senha.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 -right-1/4 w-1/2 h-1/2 bg-yellow-600/5 blur-[120px] rounded-full" />
                <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-slate-400/5 blur-[120px] rounded-full" />
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-[32px] p-8 shadow-2xl">
                    <div className="flex flex-col items-center mb-8">
                        <img src={logo} alt="Logo" className="h-20 w-auto mb-4 grayscale opacity-50" />
                        <h1 className="text-xl font-black text-white tracking-tight uppercase">
                            Alterar Senha
                        </h1>
                        <p className="text-slate-500 text-xs mt-2 text-center px-4 leading-relaxed">
                            Por questões de segurança, você deve definir uma nova senha pessoal em seu primeiro acesso.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase ml-2 tracking-widest">Senha Atual</label>
                            <div className="relative group">
                                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-yellow-500 transition-colors" size={16} />
                                <input
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all font-mono"
                                    placeholder="Senha atual (padrão)"
                                    required
                                />
                            </div>
                        </div>

                        <div className="h-px bg-slate-800 w-full my-6" />

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-2 tracking-widest">Nova Senha</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-yellow-500 transition-colors" size={16} />
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all font-mono"
                                        placeholder="Nova senha secreta"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-2 tracking-widest">Confirmar Nova Senha</label>
                                <div className="relative group">
                                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-yellow-500 transition-colors" size={16} />
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all font-mono"
                                        placeholder="Repita a nova senha"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-6 bg-slate-100 text-slate-900 font-bold py-3.5 rounded-xl hover:bg-yellow-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={18} />
                            ) : (
                                <>
                                    ATUALIZAR SENHA
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
