import { useState, useEffect } from 'react';
import { getUsers, createUser, deleteUser, toggleSuspension } from '../api/api';
import { toast } from 'react-toastify';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newEmail, setNewEmail] = useState('');
    const [lastCreated, setLastCreated] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            setUsers(response.data);
        } catch (error) {
            toast.error('Erro ao carregar usuários.');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        if (!newEmail) return;
        setIsCreating(true);
        setLastCreated(null);
        try {
            const defaultPass = 'admin123';
            await createUser({ email: newEmail, password: defaultPass });
            setLastCreated({ email: newEmail, password: defaultPass });
            toast.success('Usuário criado com sucesso!');
            setNewEmail('');
            fetchUsers();
        } catch (error) {
            toast.error('Erro ao criar usuário. O email já existe?');
        } finally {
            setIsCreating(false);
        }
    };

    const handleDeleteUser = async (id, email) => {
        if (window.confirm(`Tem certeza que deseja EXCLUIR permanentemente o usuário ${email}?`)) {
            try {
                await deleteUser(id);
                toast.success('Usuário excluído.');
                fetchUsers();
            } catch (error) {
                toast.error('Erro ao excluir usuário.');
            }
        }
    };

    const handleToggleSuspension = async (id, currentlySuspended) => {
        try {
            await toggleSuspension(id);
            toast.success(currentlySuspended ? 'Usuário reativado.' : 'Usuário suspenso.');
            fetchUsers();
        } catch (error) {
            toast.error('Erro ao alterar status do usuário.');
        }
    };

    const filteredUsers = users.filter(u => u.email.toLowerCase().includes(searchTerm.toLowerCase()));

    return {
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
        filteredUsers,
        fetchUsers
    };
};
