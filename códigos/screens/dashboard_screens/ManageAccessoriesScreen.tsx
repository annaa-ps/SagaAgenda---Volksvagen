import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../../App';
import { Sale } from '../../types';
import { Edit3, Car, Info, Wrench, Brush } from 'lucide-react';
import SaleDetailModal from './SaleDetailModal';

const SimplifiedSaleCard: React.FC<{ sale: Sale; onSelect: (sale: Sale) => void }> = ({ sale, onSelect }) => (
    <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 transition-shadow hover:shadow-md">
        <div className="flex flex-col sm:flex-row items-start justify-between">
            <div>
                <h3 className="text-lg font-semibold text-gray-800">{sale.clientName}</h3>
                <p className="text-gray-600 text-sm"><Car size={14} className="inline mr-1"/>{sale.model} - {sale.chassi}</p>
            </div>
            <div className="mt-4 sm:mt-0">
                <button onClick={() => onSelect(sale)} className="text-primary hover:underline text-sm font-medium flex items-center gap-1.5">
                   <Edit3 size={14}/> Gerenciar Preparo
                </button>
            </div>
        </div>
        <div className="border-t mt-4 pt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${sale.hasAccessories ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
                <Wrench size={12}/>{sale.accessories.length > 0 ? `${sale.accessories.length} Acessórios` : (sale.hasAccessories ? 'Acessórios Pendentes' : 'Sem Acessórios')}
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


const ManageAccessoriesScreen: React.FC = () => {
    const { sales } = useContext(AppContext);
    const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

    const relevantSales = useMemo(() => {
        return sales.filter(s => s.hasAccessories);
    }, [sales]);

    return (
        <div>
            {selectedSale && <SaleDetailModal sale={selectedSale} onClose={() => setSelectedSale(null)} />}
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Gerenciar Acessórios</h2>

            <p className="text-gray-600 mb-6">Abaixo estão as vendas que incluem acessórios. Clique em "Gerenciar Preparo" para adicionar ou remover itens.</p>

            <div className="space-y-4">
                {relevantSales.length > 0 ? (
                    relevantSales.map(sale => (
                       <SimplifiedSaleCard key={sale.id} sale={sale} onSelect={setSelectedSale} />
                    ))
                ) : (
                    <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                        <p className="text-gray-600">Nenhuma venda com acessórios encontrada.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageAccessoriesScreen;
