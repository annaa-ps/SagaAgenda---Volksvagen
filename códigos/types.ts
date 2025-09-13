
export enum UserType {
  CLIENTE = 'cliente',
  VENDEDOR = 'vendedor',
  PREPARADOR = 'preparador',
  ADMINISTRADOR = 'administrador',
  ENTREGADOR = 'entregador',
  VENDEDOR_EMBELEZAMENTO = 'vendedor_embelezamento',
  VENDEDOR_ACESSORIO = 'vendedor_acessorio'
}

export interface User {
  type: UserType;
  name: string;
  password?: string; // Optional for security on frontend
}

export interface MockUser extends User {
  password_hash: string;
}

export interface Modification {
  date: string;
  user: string;
  action: string;
}

export type SaleStatus = 'aguardando_cliente' | 'agendado' | 'preparando' | 'entregue' | 'cancelado';

export interface Sale {
  id: number;
  clientCpf: string;
  clientName: string;
  chassi: string;
  model: string;
  hasAccessories: boolean;
  accessories: string[];
  hasEmbellishment: boolean;
  hasLicensePlate: boolean;
  suggestedDate: string;
  suggestedTime: string;
  confirmedDate: string | null;
  confirmedTime: string | null;
  status: SaleStatus;
  createdBy: string;
  createdAt: string;
  modifications: Modification[];
}

export interface Notification {
    id: number;
    type: 'new_sale' | 'delivery_scheduled' | 'delivery_reminder' | 'preparation_update';
    message: string;
    date: string;
    read: boolean;
    saleId?: number;
}