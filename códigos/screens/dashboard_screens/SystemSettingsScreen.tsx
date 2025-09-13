
import React from 'react';

const SystemSettingsScreen: React.FC = () => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Configurações do Sistema</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <p className="text-gray-600">Esta tela permitirá aos administradores configurar parâmetros gerais do sistema, como horários disponíveis para agendamento.</p>
            </div>
        </div>
    );
};

export default SystemSettingsScreen;
