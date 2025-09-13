
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { UserType, Sale, Notification, User } from './types';
import { MOCK_USERS, MOCK_SALES } from './constants';
import Homepage from './screens/Homepage';
import Dashboard from './screens/Dashboard';

export const AppContext = React.createContext<{
    user: { cpf: string, type: UserType, name: string } | null;
    login: (cpf: string, userType: UserType, name: string) => void;
    logout: () => void;
    sales: Sale[];
    setSales: React.Dispatch<React.SetStateAction<Sale[]>>;
    notifications: Notification[];
    addNotification: (notification: Omit<Notification, 'id' | 'read' | 'date'>) => void;
    markAsRead: (id: number) => void;
}>({
    user: null,
    login: () => {},
    logout: () => {},
    sales: [],
    setSales: () => {},
    notifications: [],
    addNotification: () => {},
    markAsRead: () => {},
});

const App = () => {
    const [user, setUser] = useState<{ cpf: string, type: UserType, name: string } | null>(null);
    const [sales, setSales] = useState<Sale[]>(MOCK_SALES);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const login = useCallback((cpf: string, type: UserType, name: string) => {
        setUser({ cpf, type, name });
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    const addNotification = useCallback((notification: Omit<Notification, 'id' | 'read'| 'date'>) => {
        setNotifications(prev => [
            ...prev,
            { ...notification, id: Date.now(), read: false, date: new Date().toISOString() }
        ]);
    }, []);

    const markAsRead = useCallback((id: number) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    }, []);
    
    // Simulating notifications on delivery day
    useEffect(() => {
        if (!user) return;
        
        const today = new Date().toISOString().split('T')[0];

        if (user.type === UserType.CLIENTE) {
            const clientSalesToday = sales.filter(s => s.clientCpf === user.cpf && s.confirmedDate === today);
            clientSalesToday.forEach(sale => {
                 const message = `Lembrete: A entrega do seu ${sale.model} é hoje às ${sale.confirmedTime}!`;
                 const alreadyNotified = notifications.some(n => n.saleId === sale.id && n.message === message);
                 if (!alreadyNotified) {
                    addNotification({
                        type: 'delivery_reminder',
                        message,
                        saleId: sale.id
                    });
                 }
            });
        } else if (user.type === UserType.VENDEDOR || user.type === UserType.ENTREGADOR) {
            const salesToday = sales.filter(s => s.confirmedDate === today);
            salesToday.forEach(sale => {
                const message = `Lembrete de Entrega: ${sale.model} para ${sale.clientName} hoje às ${sale.confirmedTime}.`;
                const alreadyNotified = notifications.some(n => n.saleId === sale.id && n.message === message);
                if (!alreadyNotified) {
                    addNotification({
                        type: 'delivery_reminder',
                        message,
                        saleId: sale.id
                    });
                }
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, sales, addNotification]);

    const contextValue = useMemo(() => ({
        user,
        login,
        logout,
        sales,
        setSales,
        notifications,
        addNotification,
        markAsRead
    }), [user, login, logout, sales, notifications, addNotification, markAsRead]);

    return (
        <AppContext.Provider value={contextValue}>
            <div className="bg-gray-50 min-h-screen">
                {user ? <Dashboard /> : <Homepage />}
            </div>
        </AppContext.Provider>
    );
};

export default App;