import React, { useState, useContext, useMemo } from 'react';
import { AppContext } from '../App';
import { MOCK_USERS, USER_TYPE_LABELS } from '../constants';
import { UserType } from '../types';
import { X, ChevronDown, AlertCircle } from 'lucide-react';

interface LoginModalProps {
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
    const { login } = useContext(AppContext);
    
    const [selectedUserType, setSelectedUserType] = useState<UserType | null>(null);
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const formatCpfCnpj = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length <= 11) {
            return numbers
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        }
        return numbers.slice(0, 14)
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    };

    const handleLogin = () => {
        setError('');
        if (!cpfCnpj || !password || !selectedUserType) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        const cleanIdentifier = cpfCnpj.replace(/\D/g, '');
        const user = MOCK_USERS[cleanIdentifier];

        if (!user) {
            setError('CPF/CNPJ não encontrado.');
            return;
        }
        if (user.password !== password) {
            setError('Senha incorreta.');
            return;
        }
        if (user.type !== selectedUserType) {
            setError(`Este usuário é do tipo "${USER_TYPE_LABELS[user.type]}" e não pode acessar como "${USER_TYPE_LABELS[selectedUserType]}".`);
            return;
        }

        login(cleanIdentifier, user.type, user.name);
        onClose();
    };
    
    const userTypes = Object.values(UserType);

    const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUserType(e.target.value as UserType);
        setCpfCnpj('');
        setError('');
    };

    const loginIdPlaceholder = useMemo(() => {
        if (!selectedUserType) return 'CPF ou CNPJ';
        if (
            selectedUserType === UserType.VENDEDOR_EMBELEZAMENTO ||
            selectedUserType === UserType.VENDEDOR_ACESSORIO
        ) {
            return 'CNPJ';
        }
        return 'CPF';
    }, [selectedUserType]);


    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md relative animate-fade-in-up">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
                    <X size={24} />
                </button>
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Acesse sua Conta</h2>
                    <p className="text-center text-gray-500 mb-6">Selecione seu perfil e faça o login.</p>
                    
                    <div className="space-y-4">
                        <div className="relative">
                            <select
                                value={selectedUserType || ''}
                                onChange={handleUserTypeChange}
                                className={`w-full px-4 py-3 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-primary focus:outline-none ${!selectedUserType ? 'text-gray-500' : 'text-gray-900'}`}
                            >
                                <option value="" disabled>Selecione o tipo de perfil</option>
                                {userTypes.map(type => (
                                    <option key={type} value={type} className="text-gray-900">{USER_TYPE_LABELS[type]}</option>
                                ))}
                            </select>
                             <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                       
                        <input
                            type="text"
                            value={cpfCnpj}
                            onChange={(e) => setCpfCnpj(formatCpfCnpj(e.target.value))}
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary"
                            placeholder={loginIdPlaceholder}
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary"
                            placeholder="Senha"
                        />
                        
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-3 rounded-md flex items-start space-x-2">
                                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <p className="text-sm">{error}</p>
                            </div>
                        )}

                        <button
                            onClick={handleLogin}
                            disabled={!selectedUserType}
                            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Entrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;