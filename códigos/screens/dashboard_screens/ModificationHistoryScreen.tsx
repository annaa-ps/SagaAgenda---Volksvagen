
import React from 'react';

const ModificationHistoryScreen: React.FC = () => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Histórico de Modificações</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <p className="text-gray-600">Esta tela exibirá um log completo de todas as modificações em todas as vendas. Para ver o histórico de uma venda específica, acesse o "Cronograma de Entregas" e clique em "Ver Detalhes".</p>
            </div>
        </div>
    );
};

export default ModificationHistoryScreen;
