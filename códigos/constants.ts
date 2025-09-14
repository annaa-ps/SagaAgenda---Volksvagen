
import { Sale, UserType } from './types';

export const MOCK_USERS: { [key: string]: { type: UserType, name: string, password: string } } = {
    '12345678901': { type: UserType.CLIENTE, name: 'João Silva', password: '123' },
    '98765432109': { type: UserType.CLIENTE, name: 'Maria Costa', password: '123' },
    '11122233344': { type: UserType.VENDEDOR, name: 'Carlos Pereira', password: '123' },
    '22233344455': { type: UserType.PREPARADOR, name: 'Ana Souza', password: '123' },
    '33344455566': { type: UserType.ADMINISTRADOR, name: 'Roberto Lima', password: '123' },
    '44455566677': { type: UserType.ENTREGADOR, name: 'Pedro Alves', password: '123' },
    '11222333000144': { type: UserType.VENDEDOR_EMBELEZAMENTO, name: 'Lucas Estética', password: '123' },
    '44555666000177': { type: UserType.VENDEDOR_ACESSORIO, name: 'Carla Acessórios', password: '123' }
};

export const MOCK_SALES: Sale[] = [
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
      createdBy: 'Carlos Pereira',
      createdAt: '2025-09-13T10:30:00Z',
      modifications: [
        { date: '2025-09-13T10:30:00Z', user: 'Carlos Pereira', action: 'Venda criada' },
        { date: '2025-09-13T11:15:00Z', user: 'Lucas Estética', action: 'Embelezamento confirmado' }
      ]
    },
    {
      id: 2,
      clientCpf: '98765432109',
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
      createdBy: 'Carlos Pereira',
      createdAt: '2025-09-12T15:20:00Z',
      modifications: [
        { date: '2025-09-12T15:20:00Z', user: 'Carlos Pereira', action: 'Venda criada' },
        { date: '2025-09-13T09:00:00Z', user: 'Maria Costa (Cliente)', action: 'Entrega agendada' }
      ]
    }
];

export const MOCK_VEHICLE_MODELS = [
    { id: 1, name: 'Polo', image: 'https://picsum.photos/seed/polo/400/300', price: 'A partir de R$ 75.990' },
    { id: 2, name: 'Virtus', image: 'https://picsum.photos/seed/virtus/400/300', price: 'A partir de R$ 84.990' },
    { id: 3, name: 'T-Cross', image: 'https://picsum.photos/seed/tcross/400/300', price: 'A partir de R$ 125.990' },
    { id: 4, name: 'Nivus', image: 'https://picsum.photos/seed/nivus/400/300', price: 'A partir de R$ 99.990' }
];
  
export const MOCK_NEWS = [
    { id: 1, title: 'Novo Polo 2025 chega com mais tecnologia', date: '13/09/2025', image: 'https://picsum.photos/seed/news1/400/300' },
    { id: 2, title: 'T-Cross ganha nova versão Highline', date: '10/09/2025', image: 'https://picsum.photos/seed/news2/400/300' },
    { id: 3, title: 'Promoção especial: financiamento com taxa zero', date: '08/09/2025', image: 'https://picsum.photos/seed/news3/400/300' }
];

export const USER_TYPE_LABELS: { [key in UserType]: string } = {
    [UserType.CLIENTE]: 'Cliente',
    [UserType.VENDEDOR]: 'Vendedor',
    [UserType.PREPARADOR]: 'Preparador',
    [UserType.ADMINISTRADOR]: 'Administrador',
    [UserType.ENTREGADOR]: 'Entregador',
    [UserType.VENDEDOR_EMBELEZAMENTO]: 'Vendedor Embelezamento',
    [UserType.VENDEDOR_ACESSORIO]: 'Vendedor Acessório',
};