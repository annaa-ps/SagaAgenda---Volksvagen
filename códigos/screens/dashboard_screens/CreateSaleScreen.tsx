
import React, { useState, useContext } from 'react';
import { AppContext } from '../../App';
import { Sale, Modification } from '../../types';

const CreateSaleScreen: React.FC = () => {
    const { user, sales, setSales, addNotification } = useContext(AppContext);
    const [saleData, setSaleData] = useState({
        clientCpf: '',
        clientName: '',
        chassi: '',
        model: '',
        hasAccessories: false,
        hasEmbellishment: false,
        hasLicensePlate: true,
        suggestedDate: '',
        suggestedTime: ''
    });

    const formatCpf = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        return numbers.slice(0, 11)
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        const newModification: Modification = {
            date: new Date().toISOString(),
            user: user.name,
            action: 'Venda criada'
        };
        
        const newSale: Sale = {
            id: sales.length + 1,
            ...saleData,
            clientCpf: saleData.clientCpf.replace(/\D/g, ''),
            accessories: [],
            confirmedDate: null,
            confirmedTime: null,
            status: 'aguardando_cliente',
            createdBy: user.name,
            createdAt: new Date().toISOString(),
            modifications: [newModification]
        };

        setSales(prev => [...prev, newSale]);
        addNotification({
            type: 'new_sale',
            message: `Nova venda para ${newSale.clientName} (Chassi: ${newSale.chassi}) foi criada.`
        });

        alert('Venda criada com sucesso!');
        setSaleData({
            clientCpf: '', clientName: '', chassi: '', model: '',
            hasAccessories: false, hasEmbellishment: false, hasLicensePlate: true,
            suggestedDate: '', suggestedTime: ''
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Criar Nova Venda</h2>
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-6 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CPF do Cliente</label>
                        <input type="text" value={saleData.clientCpf} onChange={(e) => setSaleData({...saleData, clientCpf: formatCpf(e.target.value)})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Cliente</label>
                        <input type="text" value={saleData.clientName} onChange={(e) => setSaleData({...saleData, clientName: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Chassi</label>
                        <input type="text" value={saleData.chassi} onChange={(e) => setSaleData({...saleData, chassi: e.target.value.toUpperCase()})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
                        <select value={saleData.model} onChange={(e) => setSaleData({...saleData, model: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary bg-white" required>
                            <option value="">Selecione...</option>
                            <option value="Polo">Polo</option>
                            <option value="Virtus">Virtus</option>
                            <option value="T-Cross">T-Cross</option>
                            <option value="Nivus">Nivus</option>
                            <option value="Golf">Golf</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Data Sugerida para Agendamento</label>
                        <input type="date" value={saleData.suggestedDate} onChange={(e) => setSaleData({...saleData, suggestedDate: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Horário Sugerido</label>
                        <input type="time" value={saleData.suggestedTime} onChange={(e) => setSaleData({...saleData, suggestedTime: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary" required />
                    </div>
                </div>
                <div className="border-t pt-6">
                     <h3 className="text-base font-semibold text-gray-800 mb-4">Opções de Preparo</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 space-y-4 sm:space-y-0">
                        <label htmlFor="hasAccessories" className="flex items-center space-x-2 cursor-pointer"><input type="checkbox" id="hasAccessories" checked={saleData.hasAccessories} onChange={(e) => setSaleData({...saleData, hasAccessories: e.target.checked})} className="h-4 w-4 rounded text-primary focus:ring-primary" /> <span className="text-sm font-medium text-gray-700">Terá Acessórios</span></label>
                        <label htmlFor="hasEmbellishment" className="flex items-center space-x-2 cursor-pointer"><input type="checkbox" id="hasEmbellishment" checked={saleData.hasEmbellishment} onChange={(e) => setSaleData({...saleData, hasEmbellishment: e.target.checked})} className="h-4 w-4 rounded text-primary focus:ring-primary" /> <span className="text-sm font-medium text-gray-700">Terá Embelezamento</span></label>
                        <label htmlFor="hasLicensePlate" className="flex items-center space-x-2 cursor-pointer"><input type="checkbox" id="hasLicensePlate" checked={saleData.hasLicensePlate} onChange={(e) => setSaleData({...saleData, hasLicensePlate: e.target.checked})} className="h-4 w-4 rounded text-primary focus:ring-primary" /> <span className="text-sm font-medium text-gray-700">Terá Emplacamento</span></label>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors">Criar Venda</button>
                </div>
            </form>
        </div>
    );
};

export default CreateSaleScreen;
