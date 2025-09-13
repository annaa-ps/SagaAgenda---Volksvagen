
import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../../App';
import { Sale, UserType } from '../../types';
import { Download, Edit3, Eye, Calendar, Clock, Car, Info, Wrench, Brush } from 'lucide-react';
import SaleDetailModal from './SaleDetailModal';

const statusStyles: { [key in Sale['status']]: { bg: string, text: string, label: string } } = {
    aguardando_cliente: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Aguardando Cliente' },
    agendado: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Agendado' },
    preparando: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Em Preparação' },
    entregue: { bg: 'bg-green-100', text: 'text-green-800', label: 'Entregue' },
    cancelado: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelado' },
};

const SaleCard: React.FC<{ sale: Sale; onSelect: (sale: Sale) => void }> = ({ sale, onSelect }) => (
    <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 transition-shadow hover:shadow-md print-item">
        <div className="flex flex-col sm:flex-row items-start justify-between">
            <div>
                <h3 className="text-lg font-semibold text-gray-800">{sale.clientName}</h3>
                <p className="text-gray-600 text-sm"><Car size={14} className="inline mr-1"/>{sale.model} - {sale.chassi}</p>
                <p className={`text-sm mt-1 flex items-center ${sale.confirmedDate ? 'text-gray-700' : 'text-gray-500'}`}>
                    <Calendar size={14} className="inline mr-1.5"/>
                    {sale.confirmedDate ? `Agendado: ${new Date(sale.confirmedDate).toLocaleDateString('pt-BR')} às ${sale.confirmedTime}` : `Sugestão: ${new Date(sale.suggestedDate).toLocaleDateString('pt-BR')} às ${sale.suggestedTime}`}
                </p>
            </div>
            <div className="mt-4 sm:mt-0 flex flex-col items-start sm:items-end space-y-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[sale.status].bg} ${statusStyles[sale.status].text}`}>
                    {statusStyles[sale.status].label}
                </span>
                <button onClick={() => onSelect(sale)} className="text-primary hover:underline text-sm font-medium flex items-center gap-1.5 no-print">
                   <Eye size={14}/> Ver Detalhes
                </button>
            </div>
        </div>
        <div className="border-t mt-4 pt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${sale.hasAccessories ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
                <Wrench size={12}/>{sale.hasAccessories ? 'Com Acessórios' : 'Sem Acessórios'}
            </span>
            <span className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${sale.hasEmbellishment ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'}`}>
                <Brush size={12}/>{sale.hasEmbellishment ? 'Com Embelezamento' : 'Sem Embelezamento'}
            </span>
             <span className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${sale.hasLicensePlate ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                <Info size={12}/>{sale.hasLicensePlate ? 'Com Emplacamento' : 'Sem Emplacamento'}
            </span>
        </div>
    </div>
);


const DeliveryScheduleScreen: React.FC = () => {
    const { sales, user } = useContext(AppContext);
    const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
    const [filter, setFilter] = useState<Sale['status'] | 'all'>('all');

    const handleExport = () => {
        window.print();
    };
    
    const filteredSales = useMemo(() => {
        return sales
            .filter(sale => filter === 'all' || sale.status === filter)
            .sort((a, b) => {
                const dateA = a.confirmedDate ? new Date(a.confirmedDate) : new Date(a.suggestedDate);
                const dateB = b.confirmedDate ? new Date(b.confirmedDate) : new Date(b.suggestedDate);
                return dateA.getTime() - dateB.getTime();
            });
    }, [sales, filter]);

    return (
        <div className="print-container">
            {selectedSale && <SaleDetailModal sale={selectedSale} onClose={() => setSelectedSale(null)} />}
            <div className="flex items-center justify-between mb-6 no-print">
                <h2 className="text-2xl font-bold text-gray-800">Cronograma de Entregas</h2>
                <button onClick={handleExport} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Exportar</span>
                </button>
            </div>
            
            <div className="mb-4 no-print">
                <select 
                    value={filter} 
                    onChange={e => setFilter(e.target.value as Sale['status'] | 'all')}
                    className="bg-white border rounded-lg px-4 py-2"
                >
                    <option value="all">Todos os Status</option>
                    {Object.entries(statusStyles).map(([status, {label}]) => (
                        <option key={status} value={status}>{label}</option>
                    ))}
                </select>
            </div>

            <div className="space-y-4">
                {filteredSales.length > 0 ? (
                    filteredSales.map(sale => (
                       <SaleCard key={sale.id} sale={sale} onSelect={setSelectedSale} />
                    ))
                ) : (
                    <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                        <p className="text-gray-600">Nenhuma venda encontrada para o filtro selecionado.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeliveryScheduleScreen;
