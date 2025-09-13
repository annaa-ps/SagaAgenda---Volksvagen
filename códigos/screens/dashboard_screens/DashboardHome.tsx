
import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { UserType, Sale } from '../../types';
import { Calendar, Car, CheckCircle, Clock, ShoppingCart, Users, BarChart3, AlertCircle } from 'lucide-react';

const DashboardHome: React.FC = () => {
    const { user, sales, notifications } = useContext(AppContext);

    const Card: React.FC<{ icon: React.ElementType, title: string, value: string | number, color: string }> = ({ icon: Icon, title, value, color }) => (
        <div className={`bg-white rounded-xl shadow-sm p-6 flex items-start space-x-4 border-l-4 border-${color}-500`}>
            <div className={`bg-${color}-100 p-3 rounded-full`}>
                <Icon className={`w-6 h-6 text-${color}-600`} />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className={`text-2xl font-bold text-gray-800`}>{value}</p>
            </div>
        </div>
    );

    const ClientDashboard = () => {
        const clientSales = sales.filter(s => s.clientCpf === user?.cpf);
        const upcomingDelivery = clientSales.find(s => s.status === 'agendado' && s.confirmedDate && new Date(s.confirmedDate) >= new Date());
        const deliveryReminder = notifications.find(n => n.type === 'delivery_reminder' && clientSales.some(s => s.id === n.saleId));

        return (
             <div className="space-y-6">
                 <h2 className="text-2xl font-bold text-gray-800">Olá, {user?.name}!</h2>
                {deliveryReminder && !deliveryReminder.read && (
                    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md flex items-start space-x-3">
                        <AlertCircle className="w-6 h-6 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold">Lembrete de Entrega!</h3>
                            <p>{deliveryReminder.message}</p>
                        </div>
                    </div>
                )}
                {upcomingDelivery ? (
                     <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Próxima Entrega Agendada</h3>
                        <div className="flex items-center space-x-4">
                            <Calendar className="w-10 h-10 text-primary"/>
                            <div>
                                <p className="font-bold text-xl">{upcomingDelivery.model}</p>
                                <p className="text-gray-600">
                                    Data: {new Date(upcomingDelivery.confirmedDate!).toLocaleDateString('pt-BR')} às {upcomingDelivery.confirmedTime}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800">Nenhum agendamento próximo.</h3>
                        <p className="text-gray-600">Visite a tela de "Meus Agendamentos" para ver suas vendas.</p>
                    </div>
                )}
            </div>
        );
    };

    const VendedorDashboard = () => (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard do Vendedor</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card icon={ShoppingCart} title="Vendas do Mês" value={sales.length} color="green" />
                <Card icon={Calendar} title="Entregas Agendadas" value={sales.filter(s => s.status === 'agendado').length} color="blue" />
                <Card icon={Clock} title="Aguardando Cliente" value={sales.filter(s => s.status === 'aguardando_cliente').length} color="yellow" />
            </div>
        </div>
    );
    
    const PreparadorDashboard = () => (
        <div className="space-y-6">
             <h2 className="text-2xl font-bold text-gray-800">Dashboard do Preparador</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <Card icon={Calendar} title="Entregas Hoje" value={sales.filter(s => s.confirmedDate === new Date().toISOString().split('T')[0]).length} color="blue" />
                <Card icon={CheckCircle} title="Veículos Entregues" value={sales.filter(s => s.status === 'entregue').length} color="green" />
                <Card icon={Car} title="Em Preparação" value={sales.filter(s => s.status === 'preparando').length} color="purple" />
            </div>
             <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Notificações Recentes</h3>
                 {notifications.length > 0 ? (
                    <div className="space-y-2">
                        {notifications.slice(0, 3).map(n => (
                            <div key={n.id} className={`p-3 rounded border-l-4 ${n.read ? 'border-gray-300' : 'border-blue-500 bg-blue-50'}`}>
                                <p className="text-sm text-gray-800">{n.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{new Date(n.date).toLocaleString('pt-BR')}</p>
                            </div>
                        ))}
                    </div>
                 ) : <p className="text-gray-500">Nenhuma notificação nova.</p>}
            </div>
        </div>
    );
    
    const AdministradorDashboard = () => (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard do Administrador</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card icon={BarChart3} title="Total de Vendas" value={sales.length} color="blue" />
                <Card icon={Car} title="Veículos Entregues" value={sales.filter(s => s.status === 'entregue').length} color="green" />
                <Card icon={Users} title="Usuários Ativos" value={Object.keys(user || {}).length} color="purple" />
            </div>
        </div>
    );

    const DefaultDashboard = () => (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Bem-vindo, {user?.name}!</h2>
            <p>Seu dashboard está sendo preparado.</p>
        </div>
    );

    switch (user?.type) {
        case UserType.CLIENTE: return <ClientDashboard />;
        case UserType.VENDEDOR: return <VendedorDashboard />;
        case UserType.PREPARADOR: return <PreparadorDashboard />;
        case UserType.ADMINISTRADOR: return <AdministradorDashboard />;
        default: return <DefaultDashboard />;
    }
};

export default DashboardHome;