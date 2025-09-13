
import React, { useState, useContext } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { AppContext } from '../App';
import DashboardHome from './dashboard_screens/DashboardHome';
import CreateSaleScreen from './dashboard_screens/CreateSaleScreen';
import DeliveryScheduleScreen from './dashboard_screens/DeliveryScheduleScreen';
import AdminReportsScreen from './dashboard_screens/AdminReportsScreen';
import MySchedulesScreen from './dashboard_screens/MySchedulesScreen';
import ManageEmbellishmentScreen from './dashboard_screens/ManageEmbellishmentScreen';
import ManageAccessoriesScreen from './dashboard_screens/ManageAccessoriesScreen';
import ModificationHistoryScreen from './dashboard_screens/ModificationHistoryScreen';
import DailyDeliveriesScreen from './dashboard_screens/DailyDeliveriesScreen';
import RemindersScreen from './dashboard_screens/RemindersScreen';
import ManageUsersScreen from './dashboard_screens/ManageUsersScreen';
import SystemSettingsScreen from './dashboard_screens/SystemSettingsScreen';


const Dashboard: React.FC = () => {
    const { user } = useContext(AppContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentScreen, setCurrentScreen] = useState('dashboard');

    const renderScreen = () => {
        switch (currentScreen) {
            case 'dashboard':
                return <DashboardHome />;
            case 'create_sale':
                return <CreateSaleScreen />;
            case 'delivery_schedule':
                return <DeliveryScheduleScreen />;
            case 'admin_reports':
                return <AdminReportsScreen />;
            case 'my_schedules':
                return <MySchedulesScreen />;
            case 'manage_embellishment':
                return <ManageEmbellishmentScreen />;
            case 'manage_accessories':
                return <ManageAccessoriesScreen />;
            case 'modification_history':
                 return <ModificationHistoryScreen />;
            case 'daily_deliveries':
                return <DailyDeliveriesScreen />;
            case 'reminders':
                return <RemindersScreen />;
            case 'users':
                return <ManageUsersScreen />;
            case 'system':
                return <SystemSettingsScreen />;
            default:
                return (
                    <div className="p-8 text-center">
                        <h2 className="text-2xl font-bold">Página não encontrada</h2>
                        <p className="text-gray-600">A funcionalidade que você tentou acessar ainda não foi implementada.</p>
                    </div>
                );
        }
    };
    
    if (!user) return null;

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar 
                isOpen={isSidebarOpen} 
                setIsOpen={setIsSidebarOpen}
                currentScreen={currentScreen}
                setCurrentScreen={setCurrentScreen}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 sm:p-6 lg:p-8">
                    {renderScreen()}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
