import React from 'react';
import { useUsers } from '../hooks/useUsers';
import { 
    Users, 
    UserPlus, 
    Trash2, 
    Ban, 
    CheckCircle2, 
    Mail, 
    Shield, 
    Loader2, 
    Search,
    UserX,
    UserCheck,
    AlertCircle
} from 'lucide-react';
import logo from '../assets/logo_clean.png';

const UserManagement = () => {
    const {
        users,
        loading,
        newEmail,
        setNewEmail,
        lastCreated,
        setLastCreated,
        isCreating,
        searchTerm,
        setSearchTerm,
        handleCreateUser,
        handleDeleteUser,
        handleToggleSuspension,
        filteredUsers
    } = useUsers();

    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 p-4 md:p-8 font-sans">
            <header className="max-w-6xl mx-auto flex items-center justify-between mb-10 border-b border-slate-700/50 pb-6">
                <div className="flex items-center gap-4">
                    <img src={logo} alt="Logo" className="h-16 w-auto grayscale opacity-80" />
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
                            GESTÃO DE USUÁRIOS
                            <Shield className="text-yellow-500" size={20} />
                        </h1>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Painel Administrativo</p>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* FORMULÁRIO DE CRIAÇÃO */}
                <section className="lg:col-span-1">
                    <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 sticky top-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-yellow-500/10 rounded-xl">
                                <UserPlus className="text-yellow-500" size={20} />
                            </div>
                            <h2 className="text-sm font-black text-white uppercase tracking-widest">Gerar Novo Usuário</h2>
                        </div>

                        <form onSubmit={handleCreateUser} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-2 tracking-widest">Endereço de Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-yellow-500 transition-colors" size={16} />
                                    <input
                                        type="email"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500/50 transition-all"
                                        placeholder="funcionario@empresa.com"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isCreating}
                                className="w-full bg-yellow-600 hover:bg-yellow-500 text-yellow-950 font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isCreating ? <Loader2 className="animate-spin" size={18} /> : 'CRIAR ACESSO'}
                            </button>

                            {lastCreated && (
                                <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl animate-in fade-in slide-in-from-top-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle2 className="text-emerald-500" size={16} />
                                        <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">Acesso Gerado!</span>
                                    </div>
                                    <p className="text-[11px] text-slate-300 leading-relaxed">
                                        Envie as credenciais abaixo para <b>{lastCreated.email}</b>:
                                    </p>
                                    <div className="mt-3 p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col gap-1.5 font-mono">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] text-slate-500 uppercase">Login:</span>
                                            <span className="text-xs text-white">{lastCreated.email}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] text-slate-500 uppercase">Senha:</span>
                                            <span className="text-xs text-yellow-500 font-bold">{lastCreated.password}</span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setLastCreated(null)}
                                        className="w-full mt-3 text-[10px] text-slate-500 hover:text-slate-300 uppercase font-bold tracking-widest transition-colors"
                                    >
                                        Dispensar
                                    </button>
                                </div>
                            )}

                            <div className="flex items-start gap-2 p-3 bg-slate-400/5 rounded-xl border border-slate-700/30 mt-4">
                                <AlertCircle className="text-slate-500 shrink-0" size={14} />
                                <p className="text-[10px] text-slate-500 leading-tight italic">
                                    O usuário será criado com a senha padrão <b>admin123</b> e deverá alterá-la no primeiro login.
                                </p>
                            </div>
                        </form>
                    </div>
                </section>

                {/* LISTA DE USUÁRIOS */}
                <section className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between gap-4 mb-2">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-yellow-500 transition-colors" size={16} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-900/40 border border-slate-700/50 rounded-2xl py-2.5 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-slate-500 transition-all"
                                placeholder="Buscar usuários..."
                            />
                        </div>
                        <div className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Total: {users.length}
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="animate-spin text-slate-700" size={40} />
                        </div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="text-center py-20 bg-slate-900/20 border border-dashed border-slate-800 rounded-3xl">
                            <Users className="mx-auto text-slate-800 mb-4" size={48} />
                            <p className="text-slate-600 text-sm">Nenhum usuário encontrado.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredUsers.map(u => (
                                <div key={u.id} className={`group bg-slate-900/40 border border-slate-700/50 rounded-2xl p-4 flex items-center justify-between transition-all hover:border-slate-600 ${u.is_suspended ? 'opacity-60 grayscale' : ''}`}>
                                    <div className="flex items-center gap-4">
                                        <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-black ${u.is_staff ? 'bg-yellow-500/20 text-yellow-500' : 'bg-slate-800 text-slate-400'}`}>
                                            {u.email.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-sm font-bold text-white">{u.email}</h3>
                                                {u.is_staff && <Shield size={12} className="text-yellow-500" title="Administrador" />}
                                            </div>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className={`text-[10px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${u.is_suspended ? 'bg-red-500/20 text-red-500' : 'bg-emerald-500/20 text-emerald-500'}`}>
                                                    {u.is_suspended ? 'Suspenso' : 'Ativo'}
                                                </span>
                                                <span className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter">
                                                    Entrou em: {new Date(u.date_joined).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleToggleSuspension(u.id, u.is_suspended)}
                                            disabled={u.is_staff}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${u.is_suspended ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white border border-emerald-500/20' : 'bg-orange-500/10 text-orange-500 hover:bg-orange-500 hover:text-white border border-orange-500/20'} disabled:opacity-10 disabled:cursor-not-allowed`}
                                            title={u.is_staff ? 'Administradores não podem ser suspensos' : (u.is_suspended ? 'Reativar Acesso' : 'Suspender Acesso')}
                                        >
                                            {u.is_suspended ? <UserCheck size={16} /> : <UserX size={16} />}
                                            <span className="hidden sm:inline">{u.is_suspended ? 'Reativar' : 'Suspender'}</span>
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(u.id, u.email)}
                                            disabled={u.is_staff}
                                            className="p-2 bg-red-500/10 text-red-500 rounded-xl transition-all hover:bg-red-500 hover:text-white border border-red-500/20 disabled:opacity-10 disabled:cursor-not-allowed"
                                            title="Excluir Permanentemente"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default UserManagement;
