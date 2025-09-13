
import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';
import { Sale } from '../../types';
import { Calendar, Clock, AlertCircle } from 'lucide-react';

const MySchedulesScreen: React.FC = () => {
    const { user, sales, setSales, addNotification } = useContext(AppContext);
    const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');

    if (!user) return null;

    const clientSales = sales.filter(s => s.clientCpf === user.cpf);

    const handleConfirmSchedule = () => {
        if (!selectedSale || !scheduleDate || !scheduleTime) return;

        setSales(prevSales => prevSales.map(s =>
            s.id === selectedSale.id
                ? {
                    ...s,
                    confirmedDate: scheduleDate,
                    confirmedTime: scheduleTime,
                    status: 'agendado',
                    modifications: [
                        ...s.modifications,
                        { date: new Date().toISOString(), user: user.name + ' (Cliente)', action: `Entrega agendada para ${scheduleDate} ${scheduleTime}` }
                    ]
                }
                : s
        ));
        
        addNotification({
            type: 'delivery_scheduled',
            message: `O cliente ${user.name} agendou a entrega do ${selectedSale.model} para ${scheduleDate} às ${scheduleTime}.`
        });
        
        alert("Agendamento confirmado com sucesso! Você receberá um lembrete no dia.");
        setSelectedSale(null);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Meus Agendamentos</h2>
            
            {clientSales.length === 0 ? (
                <p>Você ainda não possui nenhuma compra registrada.</p>
            ) : (
                <div className="space-y-4">
                    {clientSales.map(sale => (
                        <div key={sale.id} className="bg-white rounded-xl shadow-sm border p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-semibold">{sale.model} - {sale.chassi}</h3>
                                    <p className="text-sm text-gray-500">Criado em: {new Date(sale.createdAt).toLocaleDateString('pt-BR')}</p>
                                </div>
                                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                                    sale.status === 'agendado' ? 'bg-green-100 text-green-800' :
                                    sale.status === 'aguardando_cliente' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-gray-100 text-gray-800'
                                }`}>
                                    {sale.status === 'agendado' ? 'Agendado' : 'Aguardando agendamento'}
                                </span>
                            </div>

                            {sale.status === 'agendado' && sale.confirmedDate && (
                                <div className="mt-4 p-4 bg-green-50 rounded-lg flex items-center space-x-3">
                                    <Calendar className="w-6 h-6 text-green-700" />
                                    <div>
                                        <p className="font-semibold text-green-800">Sua entrega está confirmada!</p>
                                        <p className="text-green-700">Data: {new Date(sale.confirmedDate).toLocaleDateString('pt-BR')} às {sale.confirmedTime}</p>
                                    </div>
                                </div>
                            )}

                            {sale.status === 'aguardando_cliente' && (
                                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                    <div className="flex items-start space-x-3">
                                        <AlertCircle className="w-5 h-5 text-blue-700 mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-blue-800">Ação necessária: Agende sua entrega</h4>
                                            <p className="text-sm text-blue-700">A data sugerida para iniciar seu agendamento é a partir de {new Date(sale.suggestedDate).toLocaleDateString('pt-BR')} às {sale.suggestedTime}.</p>
                                            
                                            {selectedSale?.id === sale.id ? (
                                                <div className="mt-4 space-y-3">
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        <input type="date" min={sale.suggestedDate} onChange={e => setScheduleDate(e.target.value)} className="w-full p-2 border rounded-md" />
                                                        <input type="time" onChange={e => setScheduleTime(e.target.value)} className="w-full p-2 border rounded-md" />
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <button onClick={handleConfirmSchedule} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700">Confirmar</button>
                                                        <button onClick={() => setSelectedSale(null)} className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">Cancelar</button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button onClick={() => { setSelectedSale(sale); setScheduleDate(sale.suggestedDate); setScheduleTime(sale.suggestedTime); }} className="mt-3 bg-primary text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-blue-700">
                                                    Escolher Data e Hora
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MySchedulesScreen;
