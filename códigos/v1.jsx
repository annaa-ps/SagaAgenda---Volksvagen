import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  User, 
  Settings, 
  Clock, 
  Car, 
  ShoppingCart, 
  Users, 
  Menu,
  X,
  Plus,
  Search,
  Filter,
  Bell,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  BarChart3,
  FileText,
  Edit3,
  Eye,
  Download,
  ChevronDown,
  Home,
  News,
  Package
} from 'lucide-react';

const SagaAgendaApp = () => {
  const [currentScreen, setCurrentScreen] = useState('homepage');
  const [userType, setUserType] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [notifications, setNotifications] = useState([]);

  // Base de usuários mockados
  const mockUsers = {
    '12345678901': { type: 'cliente', name: 'João Silva', password: '123456' },
    '98765432101': { type: 'vendedor', name: 'Maria Santos', password: '123456' },
    '45678912301': { type: 'funcionario', name: 'Carlos Lima', password: '123456' },
    '78912345601': { type: 'administrador', name: 'Ana Costa', password: '123456' },
    '11223344556': { type: 'entregador', name: 'Pedro Oliveira', password: '123456' },
    '22334455667': { type: 'vendedor_embelezamento', name: 'Lucas Estética', password: '123456' },
    '33445566778': { type: 'vendedor_acessorio', name: 'Carla Acessórios', password: '123456' }
  };

  // Dados mockados expandidos
  const mockSales = [
    {
      id: 1,
      clientCpf: '12345678901',
      clientName: 'João Silva',
      chassi: 'VW123ABC789',
      model: 'Polo',
      hasAccessories: true,
      accessories: ['Alarme', 'Película'],
      hasEmbellishment: true,
      hasLicensePlate: true,
      suggestedDate: '2025-09-20',
      suggestedTime: '14:00',
      confirmedDate: null,
      confirmedTime: null,
      status: 'aguardando_cliente',
      createdBy: 'Maria Santos',
      createdAt: '2025-09-13 10:30',
      modifications: [
        { date: '2025-09-13 10:30', user: 'Maria Santos', action: 'Venda criada' },
        { date: '2025-09-13 11:15', user: 'Lucas Estética', action: 'Embelezamento confirmado' }
      ]
    },
    {
      id: 2,
      clientCpf: '98765432101',
      clientName: 'Maria Costa',
      chassi: 'VW456DEF123',
      model: 'Golf',
      hasAccessories: false,
      accessories: [],
      hasEmbellishment: false,
      hasLicensePlate: true,
      suggestedDate: '2025-09-22',
      suggestedTime: '10:00',
      confirmedDate: '2025-09-22',
      confirmedTime: '10:00',
      status: 'agendado',
      createdBy: 'Maria Santos',
      createdAt: '2025-09-12 15:20',
      modifications: [
        { date: '2025-09-12 15:20', user: 'Maria Santos', action: 'Venda criada' },
        { date: '2025-09-13 09:00', user: 'Maria Costa', action: 'Entrega agendada' }
      ]
    }
  ];

  const mockVehicleModels = [
    { id: 1, name: 'Polo', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400', price: 'A partir de R$ 75.990' },
    { id: 2, name: 'Virtus', image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=400', price: 'A partir de R$ 84.990' },
    { id: 3, name: 'T-Cross', image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400', price: 'A partir de R$ 125.990' },
    { id: 4, name: 'Nivus', image: 'https://images.unsplash.com/photo-1534650908046-dac5bf844bb3?w=400', price: 'A partir de R$ 99.990' }
  ];

  const mockNews = [
    { id: 1, title: 'Novo Polo 2025 chega com mais tecnologia', date: '13/09/2025', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=300' },
    { id: 2, title: 'T-Cross ganha nova versão Highline', date: '10/09/2025', image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300' },
    { id: 3, title: 'Promoção especial: financiamento com taxa zero', date: '08/09/2025', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=300' }
  ];

  // Helpers de login
  const formatCpfCnpj = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else {
      return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
  };

  const validateLogin = (inputCpfCnpj, inputPassword, attemptedUserType) => {
    const cleanCpfCnpj = inputCpfCnpj.replace(/\D/g, '');
    const user = mockUsers[cleanCpfCnpj];
    
    if (!user) {
      setErrorMessage('CPF/CNPJ não encontrado no sistema.');
      setShowError(true);
      return false;
    }
    if (user.password !== inputPassword) {
      setErrorMessage('Senha incorreta.');
      setShowError(true);
      return false;
    }
    if (user.type !== attemptedUserType) {
      setErrorMessage(`Este usuário não tem permissão para acessar como ${attemptedUserType}. Tipo de conta: ${user.type}.`);
      setShowError(true);
      return false;
    }
    return true;
  };

  const handleLogin = (attemptedUserType) => {
    setShowError(false);
    if (!cpfCnpj || !password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      setShowError(true);
      return;
    }
    if (validateLogin(cpfCnpj, password, attemptedUserType)) {
      setUserType(attemptedUserType);
      setCurrentScreen('dashboard');
      setCpfCnpj('');
      setPassword('');
      setShowLoginDropdown('');
    }
  };

  // Funções de negócio
  const createSale = (saleData) => {
    const newSale = {
      id: mockSales.length + 1,
      ...saleData,
      status: 'aguardando_cliente',
      createdBy: mockUsers[userType]?.name,
      createdAt: new Date().toISOString(),
      modifications: [{
        date: new Date().toISOString(),
        user: mockUsers[userType]?.name,
        action: 'Venda criada'
      }]
    };
    mockSales.push(newSale);
    
    // Notificar funcionários
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'new_sale',
      message: `Nova venda criada para ${saleData.clientName}`,
      date: new Date().toISOString()
    }]);
  };

  const scheduleDelivery = (saleId, date, time) => {
    const sale = mockSales.find(s => s.id === saleId);
    if (sale) {
      sale.confirmedDate = date;
      sale.confirmedTime = time;
      sale.status = 'agendado';
      sale.modifications.push({
        date: new Date().toISOString(),
        user: 'Cliente',
        action: 'Entrega agendada'
      });

      // Notificar funcionários
      setNotifications(prev => [...prev, {
        id: Date.now(),
        type: 'delivery_scheduled',
        message: `Cliente ${sale.clientName} agendou entrega para ${date} às ${time}`,
        date: new Date().toISOString()
      }]);
    }
  };

  // Telas
  const Homepage = () => (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Saga Volkswagen</h1>
                <p className="text-sm text-gray-500">Agenda de Entregas</p>
              </div>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 border"
              >
                <User className="w-5 h-5" />
                <span>Área do Cliente/Funcionário</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-3">Escolha seu perfil de acesso:</h3>
                    <div className="space-y-2">
                      {[
                        { type: 'cliente', label: 'Cliente', color: 'blue' },
                        { type: 'vendedor', label: 'Vendedor', color: 'green' },
                        { type: 'funcionario', label: 'Funcionário', color: 'orange' },
                        { type: 'entregador', label: 'Entregador', color: 'purple' },
                        { type: 'vendedor_embelezamento', label: 'Vendedor Embelezamento', color: 'pink' },
                        { type: 'vendedor_acessorio', label: 'Vendedor Acessório', color: 'indigo' },
                        { type: 'administrador', label: 'Administrador', color: 'red' }
                      ].map(user => (
                        <button
                          key={user.type}
                          onClick={() => setShowLoginDropdown(user.type)}
                          className={`w-full text-left px-3 py-2 rounded hover:bg-${user.color}-50 text-${user.color}-700`}
                        >
                          {user.label}
                        </button>
                      ))}
                    </div>
                    
                    {showLoginDropdown && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-3">Login como {showLoginDropdown}</h4>
                        
                        {showError && (
                          <div className="mb-3 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                            <span className="text-sm">{errorMessage}</span>
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          <input 
                            type="text" 
                            value={cpfCnpj}
                            onChange={(e) => setCpfCnpj(formatCpfCnpj(e.target.value))}
                            className="w-full px-3 py-2 border rounded text-sm"
                            placeholder="CPF/CNPJ"
                            maxLength={18}
                          />
                          <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded text-sm"
                            placeholder="Senha"
                          />
                          <button 
                            onClick={() => handleLogin(showLoginDropdown)}
                            className="w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700"
                          >
                            Entrar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Bem-vindo à Saga Volkswagen</h1>
          <p className="text-xl mb-8">Sua concessionária de confiança com os melhores veículos Volkswagen</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50">
            Conheça nossos modelos
          </button>
        </div>
      </section>

      {/* Modelos de Veículos */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nossos Modelos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockVehicleModels.map(vehicle => (
              <div key={vehicle.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{vehicle.name}</h3>
                  <p className="text-blue-600 font-semibold mb-4">{vehicle.price}</p>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Saiba mais
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Últimas Notícias */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Últimas Notícias</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockNews.map(news => (
              <article key={news.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <p className="text-blue-600 text-sm font-medium mb-2">{news.date}</p>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{news.title}</h3>
                  <button className="text-blue-600 font-medium hover:text-blue-700">
                    Leia mais →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Car className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">Saga Volkswagen</h3>
              </div>
              <p className="text-gray-400">Sua concessionária de confiança há mais de 20 anos.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>(34) 3333-4444</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>contato@sagavw.com.br</span>
                </p>
                <p className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Uberlândia, MG</span>
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Horário de Funcionamento</h4>
              <div className="text-gray-400 space-y-1">
                <p>Segunda a Sexta: 8h às 18h</p>
                <p>Sábado: 8h às 14h</p>
                <p>Domingo: Fechado</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Saga Volkswagen. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );

  const Header = () => (
    <div className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <button onClick={() => setCurrentScreen('homepage')} className="p-2 rounded-lg hover:bg-gray-100">
            <Home className="w-6 h-6" />
          </button>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Car className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">Saga Agenda</h1>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 relative">
            <Bell className="w-5 h-5 text-gray-600" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );

  const Sidebar = () => {
    const getMenuItems = () => {
      const baseItems = [
        { icon: Calendar, label: 'Agenda', screen: 'agenda' },
        { icon: User, label: 'Perfil', screen: 'profile' },
      ];

      switch(userType) {
        case 'cliente':
          return [
            ...baseItems,
            { icon: Car, label: 'Meus Agendamentos', screen: 'my_schedules' },
            { icon: Clock, label: 'Histórico', screen: 'history' }
          ];
        case 'vendedor':
          return [
            ...baseItems,
            { icon: ShoppingCart, label: 'Criar Venda', screen: 'create_sale' },
            { icon: Calendar, label: 'Cronograma Entrega', screen: 'delivery_schedule' },
            { icon: BarChart3, label: 'Relatórios', screen: 'reports' }
          ];
        case 'vendedor_embelezamento':
          return [
            ...baseItems,
            { icon: Package, label: 'Gerenciar Embelezamento', screen: 'manage_embellishment' }
          ];
        case 'vendedor_acessorio':
          return [
            ...baseItems,
            { icon: Package, label: 'Gerenciar Acessórios', screen: 'manage_accessories' }
          ];
        case 'funcionario':
          return [
            ...baseItems,
            { icon: Calendar, label: 'Cronograma', screen: 'delivery_schedule' },
            { icon: Eye, label: 'Histórico Modificações', screen: 'modification_history' },
            { icon: Download, label: 'Exportar Cronograma', screen: 'export_schedule' }
          ];
        case 'entregador':
          return [
            ...baseItems,
            { icon: MapPin, label: 'Entregas do Dia', screen: 'daily_deliveries' },
            { icon: Bell, label: 'Lembretes', screen: 'reminders' }
          ];
        case 'administrador':
          return [
            ...baseItems,
            { icon: Users, label: 'Usuários', screen: 'users' },
            { icon: Calendar, label: 'Gerenciar Datas', screen: 'manage_dates' },
            { icon: BarChart3, label: 'Relatórios', screen: 'admin_reports' },
            { icon: Settings, label: 'Sistema', screen: 'system' }
          ];
        default:
          return baseItems;
      }
    };

    return (
      <div className={`fixed left-0 top-0 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } w-80`}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-800">Saga Agenda</h2>
                <p className="text-sm text-gray-600 capitalize">{userType.replace('_', ' ')}</p>
              </div>
            </div>
            <button onClick={() => setIsMenuOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <nav className="p-4">
          <div className="space-y-2">
            {getMenuItems().map((item, index) => (
              <button
                key={index}
                onClick={() => { setCurrentScreen(item.screen); setIsMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-left transition-colors"
              >
                <item.icon className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">{item.label}</span>
              </button>
            ))}
          </div>
          
          <div className="pt-6 mt-6 border-t">
            <button
              onClick={() => { 
                setCurrentScreen('homepage'); 
                setUserType(''); 
                setCpfCnpj(''); 
                setPassword(''); 
                setShowError(false);
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 text-left transition-colors"
            >
              <User className="w-5 h-5" />
              <span>Sair</span>
            </button>
          </div>
        </nav>
      </div>
    );
  };

  const DashboardScreen = () => {
    const getDashboardContent = () => {
      switch(userType) {
        case 'cliente':
          const clientSales = mockSales.filter(sale => sale.clientCpf === Object.keys(mockUsers).find(key => mockUsers[key].type === 'cliente'));
          return (
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Seus Agendamentos</h3>
                {clientSales.length > 0 ? (
                  <div className="space-y-3">
                    {clientSales.map(sale => (
                      <div key={sale.id} className="bg-white p-4 rounded-lg">
                        <h4 className="font-medium">{sale.model} - {sale.chassi}</h4>
                        <p className="text-sm text-gray-600">
                          {sale.confirmedDate ? 
                            `Entrega agendada: ${sale.confirmedDate} às ${sale.confirmedTime}` :
                            `Sugestão: ${sale.suggestedDate} às ${sale.suggestedTime}`
                          }
                        </p>
                        {!sale.confirmedDate && (
                          <button 
                            onClick={() => scheduleDelivery(sale.id, sale.suggestedDate, sale.suggestedTime)}
                            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                          >
                            Confirmar Horário
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">Nenhum agendamento encontrado.</p>
                )}
              </div>
            </div>
          );
        case 'vendedor':
          return (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <ShoppingCart className="w-8 h-8 text-green-600 mb-2" />
                  <h3 className="font-semibold text-gray-800">Vendas do Mês</h3>
                  <p className="text-2xl font-bold text-green-600">{mockSales.length}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <Calendar className="w-8 h-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-gray-800">Entregas Agendadas</h3>
                  <p className="text-2xl font-bold text-blue-600">{mockSales.filter(s => s.confirmedDate).length}</p>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4">
                  <Clock className="w-8 h-8 text-yellow-600 mb-2" />
                  <h3 className="font-semibold text-gray-800">Aguardando Cliente</h3>
                  <p className="text-2xl font-bold text-yellow-600">{mockSales.filter(s => !s.confirmedDate).length}</p>
                </div>
              </div>
            </div>
          );
        case 'funcionario':
          return (
            <div className="space-y-6">
              <div className="bg-orange-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Notificações Recentes</h3>
                {notifications.length > 0 ? (
                  <div className="space-y-2">
                    {notifications.slice(0, 3).map(notification => (
                      <div key={notification.id} className="bg-white p-3 rounded border-l-4 border-orange-500">
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500">{new Date(notification.date).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">Nenhuma notificação.</p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <Calendar className="w-8 h-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-gray-800">Entregas Hoje</h3>
                  <p className="text-2xl font-bold text-blue-600">{mockSales.filter(s => s.confirmedDate === new Date().toISOString().split('T')[0]).length}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
                  <h3 className="font-semibold text-gray-800">Preparos Concluídos</h3>
                  <p className="text-2xl font-bold text-green-600">5</p>
                </div>
              </div>
            </div>
          );
        case 'administrador':
          return (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <BarChart3 className="w-8 h-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-gray-800">Total de Vendas</h3>
                  <p className="text-2xl font-bold text-blue-600">{mockSales.length}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <Car className="w-8 h-8 text-green-600 mb-2" />
                  <h3 className="font-semibold text-gray-800">Veículos Entregues</h3>
                  <p className="text-2xl font-bold text-green-600">15</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <Users className="w-8 h-8 text-purple-600 mb-2" />
                  <h3 className="font-semibold text-gray-800">Usuários Ativos</h3>
                  <p className="text-2xl font-bold text-purple-600">234</p>
                </div>
              </div>
            </div>
          );
        default:
          return <div>Dashboard padrão</div>;
      }
    };

    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
        {getDashboardContent()}
      </div>
    );
  };

  const CreateSaleScreen = () => {
    const [saleData, setSaleData] = useState({
      clientCpf: '',
      clientName: '',
      chassi: '',
      model: '',
      hasAccessories: false,
      accessories: [],
      hasEmbellishment: false,
      hasLicensePlate: true,
      suggestedDate: '',
      suggestedTime: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      createSale(saleData);
      alert('Venda criada com sucesso!');
      setSaleData({
        clientCpf: '',
        clientName: '',
        chassi: '',
        model: '',
        hasAccessories: false,
        accessories: [],
        hasEmbellishment: false,
        hasLicensePlate: true,
        suggestedDate: '',
        suggestedTime: ''
      });
    };

    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Criar Nova Venda</h2>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CPF do Cliente</label>
              <input
                type="text"
                value={saleData.clientCpf}
                onChange={(e) => setSaleData({...saleData, clientCpf: formatCpfCnpj(e.target.value)})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Cliente</label>
              <input
                type="text"
                value={saleData.clientName}
                onChange={(e) => setSaleData({...saleData, clientName: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Chassi</label>
              <input
                type="text"
                value={saleData.chassi}
                onChange={(e) => setSaleData({...saleData, chassi: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Modelo</label>
              <select
                value={saleData.model}
                onChange={(e) => setSaleData({...saleData, model: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Selecione...</option>
                <option value="Polo">Polo</option>
                <option value="Virtus">Virtus</option>
                <option value="T-Cross">T-Cross</option>
                <option value="Nivus">Nivus</option>
                <option value="Golf">Golf</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data Sugerida</label>
              <input
                type="date"
                value={saleData.suggestedDate}
                onChange={(e) => setSaleData({...saleData, suggestedDate: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Horário Sugerido</label>
              <input
                type="time"
                value={saleData.suggestedTime}
                onChange={(e) => setSaleData({...saleData, suggestedTime: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="hasAccessories"
                checked={saleData.hasAccessories}
                onChange={(e) => setSaleData({...saleData, hasAccessories: e.target.checked})}
                className="rounded"
              />
              <label htmlFor="hasAccessories" className="text-sm font-medium text-gray-700">
                Terá Acessórios
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="hasEmbellishment"
                checked={saleData.hasEmbellishment}
                onChange={(e) => setSaleData({...saleData, hasEmbellishment: e.target.checked})}
                className="rounded"
              />
              <label htmlFor="hasEmbellishment" className="text-sm font-medium text-gray-700">
                Terá Embelezamento
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="hasLicensePlate"
                checked={saleData.hasLicensePlate}
                onChange={(e) => setSaleData({...saleData, hasLicensePlate: e.target.checked})}
                className="rounded"
              />
              <label htmlFor="hasLicensePlate" className="text-sm font-medium text-gray-700">
                Terá Emplacamento
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
          >
            Criar Venda
          </button>
        </form>
      </div>
    );
  };

  const DeliveryScheduleScreen = () => (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Cronograma de Entregas</h2>
        {userType === 'funcionario' && (
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Exportar PDF</span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        {mockSales.map(sale => (
          <div key={sale.id} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{sale.clientName}</h3>
                <p className="text-gray-600">{sale.model} - {sale.chassi}</p>
                <p className="text-sm text-gray-500">
                  {sale.confirmedDate ? 
                    `Agendado: ${sale.confirmedDate} às ${sale.confirmedTime}` :
                    `Sugerido: ${sale.suggestedDate} às ${sale.suggestedTime}`
                  }
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    sale.hasAccessories ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {sale.hasAccessories ? 'Com Acessórios' : 'Sem Acessórios'}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    sale.hasEmbellishment ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {sale.hasEmbellishment ? 'Com Embelezamento' : 'Sem Embelezamento'}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    sale.hasLicensePlate ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {sale.hasLicensePlate ? 'Com Emplacamento' : 'Sem Emplacamento'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  sale.status === 'agendado' ? 'bg-green-100 text-green-800' :
                  sale.status === 'aguardando_cliente' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {sale.status === 'agendado' ? 'Agendado' :
                   sale.status === 'aguardando_cliente' ? 'Aguardando Cliente' :
                   'Pendente'}
                </span>
                
                {userType === 'administrador' && (
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render principal
  if (currentScreen === 'homepage') {
    return <Homepage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      <main className="transition-all duration-300">
        {currentScreen === 'dashboard' && <DashboardScreen />}
        {currentScreen === 'create_sale' && <CreateSaleScreen />}
        {currentScreen === 'delivery_schedule' && <DeliveryScheduleScreen />}
        {/* Aqui entrariam as outras telas conforme necessário */}
      </main>
    </div>
  );
};

export default SagaAgendaApp;
