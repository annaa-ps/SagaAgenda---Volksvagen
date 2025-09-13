import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';
import { Sale, UserType } from '../../types';
import { X, Calendar, Clock, Car, User, Edit, Save, Plus, Trash2, Brush, Wrench, Info, Tag } from 'lucide-react';

interface SaleDetailModalProps {
    sale: Sale;
    onClose: () => void;
}

const statusStyles: { [key in Sale['status']]: { label: string } } = {
    aguardando_cliente: { label: 'Aguardando Cliente' },
    agendado: { label: 'Agendado' },
    preparando: { label: 'Em Preparação' },
    entregue: { label: 'Entregue' },
    cancelado: { label: 'Cancelado' },
};

const SaleDetailModal: React.FC<SaleDetailModalProps> = ({ sale, onClose }) => {
    const { user, setSales, addNotification } = useContext(AppContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editableSale, setEditableSale] = useState<Sale>(sale);
    const [newAccessory, setNewAccessory] = useState('');

    const canEnterEditMode = user?.type === UserType.ADMINISTRADOR ||
                           user?.type === UserType.VENDEDOR_ACESSORIO ||
                           user?.type === UserType.VENDEDOR_EMBELEZAMENTO ||
                           user?.type === UserType.PREPARADOR;

    const isSpecialtyVendor = user?.type === UserType.VENDEDOR_ACESSORIO || user?.type === UserType.VENDEDOR_EMBELEZAMENTO;

    const handleSave = () => {
        let modificationAction = 'Dados da venda atualizados.';
        if (user?.type === UserType.ADMINISTRADOR && (sale.confirmedDate !== editableSale.confirmedDate || sale.confirmedTime !== editableSale.confirmedTime)) {
            modificationAction = `Entrega reagendada para ${new Date(editableSale.confirmedDate!).toLocaleDateString('pt-BR')} às ${editableSale.confirmedTime}.`;
        } else if(sale.hasAccessories !== editableSale.hasAccessories || sale.accessories.join(',') !== editableSale.accessories.join(',')){
            modificationAction = "Acessórios atualizados."
        } else if(sale.hasEmbellishment !== editableSale.hasEmbellishment){
             modificationAction = "Embelezamento atualizado."
        } else if(user?.type === UserType.PREPARADOR && sale.status !== editableSale.status){
             modificationAction = `Status alterado para "${statusStyles[editableSale.status].label}".`
        }

        setSales(prev => prev.map(s => s.id === sale.id ? {
            ...editableSale,
            modifications: [...s.modifications, { date: new Date().toISOString(), user: user!.name, action: modificationAction }]
        } : s));
        
        addNotification({type: 'preparation_update', message: `Venda ${sale.id} foi atualizada por ${user?.name}.`, saleId: sale.id});

        setIsEditing(false);
        onClose();
    };
    
    const addAccessory = () => {
        if (newAccessory.trim() !== '' && !editableSale.accessories.includes(newAccessory.trim())) {
            setEditableSale(prev => ({...prev, accessories: [...prev.accessories, newAccessory.trim()]}));
            setNewAccessory('');
        }
    };
    
    const removeAccessory = (acc: string) => {
        setEditableSale(prev => ({...prev, accessories: prev.accessories.filter(a => a !== acc)}));
    };


    const renderField = (label: string, value: string, icon: React.ElementType) => {
        const Icon = icon;
        return (
            <div>
                <label className="text-xs font-semibold text-gray-500 flex items-center"><Icon size={12} className="mr-1.5"/>{label}</label>
                <p className="text-gray-800">{value}</p>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 no-print">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl relative max-h-[90vh] flex flex-col">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Detalhes da Venda #{sale.id}</h2>
                    <div className="flex items-center gap-4">
                       {canEnterEditMode && !isEditing && <button onClick={() => setIsEditing(true)} className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-semibold text-sm"><Edit size={14}/>Editar</button>}
                       {isEditing && <button onClick={handleSave} className="flex items-center gap-1.5 text-green-600 hover:text-green-800 font-semibold text-sm"><Save size={14}/>Salvar</button>}
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-700"><X size={24} /></button>
                    </div>
                </div>

                <div className="p-6 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {renderField('Cliente', sale.clientName, User)}
                        {renderField('CPF', sale.clientCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'), User)}
                        {renderField('Veículo', `${sale.model} - ${sale.chassi}`, Car)}
                         {!isSpecialtyVendor && renderField('Status', statusStyles[sale.status].label, Tag)}
                        
                        {!isSpecialtyVendor && (isEditing && user?.type === UserType.ADMINISTRADOR ? (
                            <div>
                                <label className="text-xs font-semibold text-gray-500 flex items-center"><Calendar size={12} className="mr-1.5"/>Data Agendada</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="date"
                                        className="w-full text-sm p-1 border rounded"
                                        value={editableSale.confirmedDate || ''}
                                        onChange={(e) => setEditableSale({...editableSale, confirmedDate: e.target.value})}
                                    />
                                    <input 
                                        type="time"
                                        className="w-full text-sm p-1 border rounded"
                                        value={editableSale.confirmedTime || ''}
                                        onChange={(e) => setEditableSale({...editableSale, confirmedTime: e.target.value})}
                                    />
                                </div>
                            </div>
                        ) : (
                            renderField('Data Agendada', sale.confirmedDate ? `${new Date(sale.confirmedDate).toLocaleDateString('pt-BR')} às ${sale.confirmedTime}` : 'Não agendado', Calendar)
                        ))}

                        {isEditing && user?.type === UserType.PREPARADOR && (
                             <div>
                                <label className="text-xs font-semibold text-gray-500 flex items-center"><Tag size={12} className="mr-1.5"/>Alterar Status</label>
                                <select 
                                    value={editableSale.status}
                                    onChange={(e) => setEditableSale({...editableSale, status: e.target.value as Sale['status']})}
                                    className="w-full text-sm p-1 border rounded bg-white"
                                >
                                    {Object.entries(statusStyles).map(([statusKey, {label}]) => (
                                        <option key={statusKey} value={statusKey}>{label}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                    
                     <div className="space-y-4 mb-6">
                        <h4 className="font-semibold text-gray-700 border-b pb-2">Detalhes do Preparo</h4>
                        <div className="flex items-center gap-2">
                             <Wrench size={16} className="text-blue-600"/>
                            <label htmlFor="hasAccessories" className="font-medium text-gray-700">Acessórios:</label>
                            <input type="checkbox" id="hasAccessories" checked={editableSale.hasAccessories} onChange={(e) => setEditableSale({...editableSale, hasAccessories: e.target.checked})} disabled={!isEditing || user?.type !== UserType.VENDEDOR_ACESSORIO} className="h-4 w-4 rounded text-primary focus:ring-primary"/>
                        </div>
                        {editableSale.hasAccessories && (
                            <div className="pl-6">
                                <ul className="list-disc list-inside text-gray-600 space-y-1">
                                    {editableSale.accessories.map(acc => (
                                        <li key={acc} className="flex items-center justify-between">
                                            <span>{acc}</span>
                                            {isEditing && user?.type === UserType.VENDEDOR_ACESSORIO && <button onClick={() => removeAccessory(acc)}><Trash2 size={14} className="text-red-500 hover:text-red-700"/></button>}
                                        </li>
                                    ))}
                                </ul>
                                {isEditing && user?.type === UserType.VENDEDOR_ACESSORIO && <div className="flex gap-2 mt-2">
                                    <input type="text" value={newAccessory} onChange={e=>setNewAccessory(e.target.value)} placeholder="Novo acessório" className="w-full text-sm p-1 border rounded"/>
                                    <button onClick={addAccessory} className="bg-blue-500 text-white rounded p-1.5 hover:bg-blue-600"><Plus size={16}/></button>
                                </div>}
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                             <Brush size={16} className="text-purple-600"/>
                            <label htmlFor="hasEmbellishment" className="font-medium text-gray-700">Embelezamento:</label>
                            <input type="checkbox" id="hasEmbellishment" checked={editableSale.hasEmbellishment} onChange={(e) => setEditableSale({...editableSale, hasEmbellishment: e.target.checked})} disabled={!isEditing || user?.type !== UserType.VENDEDOR_EMBELEZAMENTO} className="h-4 w-4 rounded text-primary focus:ring-primary"/>
                        </div>
                        <div className="flex items-center gap-2">
                            <Info size={16} className="text-green-600"/>
                             <p className="font-medium text-gray-700">Emplacamento: {sale.hasLicensePlate ? 'Sim' : 'Não'}</p>
                        </div>
                    </div>

                    {!isSpecialtyVendor && (
                        <div>
                            <h4 className="font-semibold text-gray-700 border-b pb-2">Histórico de Modificações</h4>
                            <ul className="mt-4 space-y-3 text-sm max-h-40 overflow-y-auto pr-2">
                                {editableSale.modifications.slice().reverse().map((mod, index) => (
                                    <li key={index} className="flex justify-between items-center text-gray-600">
                                        <span><span className="font-semibold">{mod.user}:</span> {mod.action}</span>
                                        <span className="text-xs text-gray-400 whitespace-nowrap">{new Date(mod.date).toLocaleString('pt-BR')}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SaleDetailModal;