
import React from 'react';

const RemindersScreen: React.FC = () => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Lembretes</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <p className="text-gray-600">Esta tela exibirá lembretes importantes para entregadores e vendedores, como as entregas do dia.</p>
            </div>
        </div>
    );
};

export default RemindersScreen;
