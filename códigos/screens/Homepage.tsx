
import React, { useState } from 'react';
import { Car, User, Phone, Mail, MapPin } from 'lucide-react';
import { MOCK_VEHICLE_MODELS, MOCK_NEWS } from '../constants';
import LoginModal from './LoginModal';

const Homepage: React.FC = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white">
            {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
            
            {/* Header */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                <Car className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Saga Volkswagen</h1>
                                <p className="text-sm text-gray-500">Agenda de Entregas</p>
                            </div>
                        </div>
                        
                        <button
                            onClick={() => setIsLoginModalOpen(true)}
                            className="flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-blue-700 transition-colors"
                        >
                            <User className="w-5 h-5" />
                            <span>Acessar</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-primary to-blue-800 text-white">
                 <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: "url('https://picsum.photos/seed/vw-bg/1920/1080')"}}></div>
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24 relative">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Bem-vindo à Saga Volkswagen</h1>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Sua concessionária de confiança com os melhores veículos Volkswagen.</p>
                    <a href="#modelos" className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-transform hover:scale-105 inline-block">
                        Conheça nossos modelos
                    </a>
                </div>
            </section>

            {/* Modelos de Veículos */}
            <section id="modelos" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nossos Modelos</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {MOCK_VEHICLE_MODELS.map(vehicle => (
                            <div key={vehicle.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
                                <img src={vehicle.image} alt={vehicle.name} className="w-full h-48 object-cover"/>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{vehicle.name}</h3>
                                    <p className="text-primary font-semibold mb-4">{vehicle.price}</p>
                                    <button className="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                                        Saiba mais
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Últimas Notícias */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Últimas Notícias</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {MOCK_NEWS.map(news => (
                            <article key={news.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
                                <img src={news.image} alt={news.title} className="w-full h-48 object-cover"/>
                                <div className="p-6">
                                    <p className="text-primary text-sm font-medium mb-2">{news.date}</p>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 h-14">{news.title}</h3>
                                    <a href="#" className="text-primary font-semibold hover:text-blue-700 group">
                                        Leia mais <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                                    </a>
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
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                    <Car className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-xl font-bold">Saga Volkswagen</h3>
                            </div>
                            <p className="text-gray-400">Sua concessionária de confiança há mais de 20 anos.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Contato</h4>
                            <div className="space-y-2 text-gray-400">
                                <p className="flex items-center space-x-2"><Phone className="w-4 h-4" /> <span>(34) 3333-4444</span></p>
                                <p className="flex items-center space-x-2"><Mail className="w-4 h-4" /> <span>contato@sagavw.com.br</span></p>
                                <p className="flex items-center space-x-2"><MapPin className="w-4 h-4" /> <span>Uberlândia, MG</span></p>
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
                        <p>&copy; {new Date().getFullYear()} Saga Volkswagen. Todos os direitos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Homepage;
