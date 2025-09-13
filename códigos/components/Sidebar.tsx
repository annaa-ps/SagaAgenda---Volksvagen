
import React, { useContext } from 'react';
import { AppContext } from '../App';
import { UserType } from '../types';
import { Calendar, User, Settings, Car, ShoppingCart, Users, X, Package, BarChart3, FileText, MapPin, Bell, LogOut, Home, Eye } from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    currentScreen: string;
    setCurrentScreen: (screen: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, currentScreen, setCurrentScreen }) => {
    const { user, logout } = useContext(AppContext);

    const getMenuItems = () => {
        const baseItems = [
            { icon: Home, label: 'Dashboard', screen: 'dashboard' },
        ];

        const roleSpecificItems = {
            [UserType.CLIENTE]: [
                { icon: Calendar, label: 'Meus Agendamentos', screen: 'my_schedules' },
            ],
            [UserType.VENDEDOR]: [
                { icon: ShoppingCart, label: 'Criar Venda', screen: 'create_sale' },
                { icon: Calendar, label: 'Cronograma de Entregas', screen: 'delivery_schedule' },
                { icon: Eye, label: 'Histórico de Vendas', screen: 'modification_history' },
            ],
            [UserType.VENDEDOR_EMBELEZAMENTO]: [
                { icon: Package, label: 'Gerenciar Embelezamento', screen: 'manage_embellishment' }
            ],
            [UserType.VENDEDOR_ACESSORIO]: [
                { icon: Package, label: 'Gerenciar Acessórios', screen: 'manage_accessories' }
            ],
            [UserType.PREPARADOR]: [
                { icon: Calendar, label: 'Cronograma de Entregas', screen: 'delivery_schedule' },
                { icon: Eye, label: 'Histórico de Vendas', screen: 'modification_history' },
            ],
            [UserType.ENTREGADOR]: [
                { icon: MapPin, label: 'Entregas do Dia', screen: 'daily_deliveries' },
                { icon: Calendar, label: 'Cronograma de Entregas', screen: 'delivery_schedule' },
                { icon: Eye, label: 'Histórico de Vendas', screen: 'modification_history' },
                { icon: Bell, label: 'Lembretes', screen: 'reminders' }
            ],
            [UserType.ADMINISTRADOR]: [
                { icon: Calendar, label: 'Cronograma de Entregas', screen: 'delivery_schedule' },
                { icon: Eye, label: 'Histórico de Vendas', screen: 'modification_history' },
                { icon: Users, label: 'Gerenciar Usuários', screen: 'users' },
                { icon: BarChart3, label: 'Relatórios de Vendas', screen: 'admin_reports' },
                { icon: Settings, label: 'Configurações', screen: 'system' }
            ]
        };
        
        return user ? [...baseItems, ...(roleSpecificItems[user.type] || [])] : baseItems;
    };

    const menuItems = getMenuItems();

    const handleNavigation = (screen: string) => {
        setCurrentScreen(screen);
        if (window.innerWidth < 1024) { // Close sidebar on mobile after navigation
            setIsOpen(false);
        }
    };

    return (
        <>
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}>
            </div>
            <aside className={`fixed top-0 left-0 h-full bg-white shadow-lg w-64 transform transition-transform duration-300 z-50 no-print ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:sticky lg:h-screen`}>
                <div className="flex items-center justify-between p-4 border-b h-16">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <Car className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="font-bold text-gray-800">Saga Agenda</h2>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="lg:hidden">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <nav className="p-4 flex flex-col justify-between h-[calc(100%-4rem)]">
                    <div>
                        <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Menu</p>
                        <div className="space-y-1">
                            {menuItems.map((item) => (
                                <button
                                    key={item.screen}
                                    onClick={() => handleNavigation(item.screen)}
                                    className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left transition-colors ${
                                        currentScreen === item.screen ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    <item.icon className={`w-5 h-5 ${currentScreen === item.screen ? 'text-white' : 'text-gray-500'}`} />
                                    <span className="font-medium text-sm">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div>
                        <button
                            onClick={logout}
                            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg hover:bg-red-50 text-red-600 text-left transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium text-sm">Sair</span>
                        </button>
                    </div>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;