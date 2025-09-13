
import React, { useContext, useState } from 'react';
import { Menu, User, Bell, Car, X, Check } from 'lucide-react';
import { AppContext } from '../App';

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const { user, notifications, markAsRead } = useContext(AppContext);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const unreadCount = notifications.filter(n => !n.read).length;

    const handleNotificationClick = (id: number) => {
        markAsRead(id);
    };

    return (
        <header className="bg-white shadow-sm border-b sticky top-0 z-30 no-print">
            <div className="flex items-center justify-between p-4 h-16">
                <div className="flex items-center space-x-3">
                    <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100 lg:hidden">
                        <Menu className="w-6 h-6 text-gray-700" />
                    </button>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <Car className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-800 hidden sm:block">Saga Agenda</h1>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="p-2 rounded-full hover:bg-gray-100 relative">
                            <Bell className="w-5 h-5 text-gray-600" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-white">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                        {isNotificationsOpen && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50">
                                <div className="p-3 border-b flex justify-between items-center">
                                    <h3 className="font-semibold text-gray-800">Notificações</h3>
                                    <button onClick={() => setIsNotificationsOpen(false)}><X className="w-4 h-4 text-gray-500 hover:text-gray-800"/></button>
                                </div>
                                <div className="max-h-80 overflow-y-auto">
                                    {notifications.length > 0 ? (
                                        notifications.slice().reverse().map(n => (
                                            <div key={n.id} className={`p-3 border-b hover:bg-gray-50 ${!n.read ? 'bg-blue-50' : ''}`}>
                                                <p className="text-sm text-gray-700">{n.message}</p>
                                                <p className="text-xs text-gray-500 mt-1">{new Date(n.date).toLocaleString('pt-BR')}</p>
                                                {!n.read && (
                                                    <button onClick={() => handleNotificationClick(n.id)} className="text-xs text-blue-600 hover:underline mt-1 flex items-center gap-1">
                                                        <Check size={14} /> Marcar como lida
                                                    </button>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500 p-4 text-center">Nenhuma notificação.</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 hidden md:block">{user?.name}</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
