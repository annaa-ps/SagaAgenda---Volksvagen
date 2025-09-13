
import React from 'react';

const ManageUsersScreen: React.FC = () => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Gerenciar Usuários</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <p className="text-gray-600">Esta tela permitirá aos administradores criar, editar e remover usuários do sistema.</p>
            </div>
        </div>
    );
};

export default ManageUsersScreen;
