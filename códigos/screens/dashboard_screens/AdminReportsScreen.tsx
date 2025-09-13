
import React, { useContext, useMemo } from 'react';
import { AppContext } from '../../App';
import { Sale } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const AdminReportsScreen: React.FC = () => {
    const { sales } = useContext(AppContext);

    const salesByModel = useMemo(() => {
        const counts: { [key: string]: number } = {};
        sales.forEach(sale => {
            counts[sale.model] = (counts[sale.model] || 0) + 1;
        });
        return Object.entries(counts).map(([name, count]) => ({ name, Vendas: count }));
    }, [sales]);
    
    const salesOverTime = useMemo(() => {
        const counts: { [key: string]: number } = {};
        sales.forEach(sale => {
            const date = new Date(sale.createdAt).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
            counts[date] = (counts[date] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([date, count]) => ({ date, Vendas: count }))
            .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Simplified sort for example
    }, [sales]);


    const ChartCard: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">{title}</h3>
            <div style={{ width: '100%', height: 300 }}>
                {children}
            </div>
        </div>
    );

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Relatórios de Vendas</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Vendas por Modelo">
                    <ResponsiveContainer>
                        <BarChart data={salesByModel} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Vendas" fill="#0055A4" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
                 <ChartCard title="Vendas ao Longo do Tempo">
                    <ResponsiveContainer>
                       <LineChart data={salesOverTime} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Vendas" stroke="#00A4B4" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>
        </div>
    );
};

export default AdminReportsScreen;
