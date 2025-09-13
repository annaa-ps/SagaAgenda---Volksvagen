
import React from 'react';

const DailyDeliveriesScreen: React.FC = () => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Entregas do Dia</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <p className="text-gray-600">Esta tela exibirá as entregas agendadas para o dia atual, ajudando os entregadores a se organizarem.</p>
            </div>
        </div>
    );
};

export default DailyDeliveriesScreen;
