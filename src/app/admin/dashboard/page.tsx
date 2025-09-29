'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { getVisitsStats, getMessages, updateMessageStatus, deleteMessage, type Message } from '@/lib/supabase/admin';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from '@/components/header';
import { 
  LayoutDashboard, 
  MessageSquare, 
  LogOut,
  Loader2,
  Shield,
  Eye,
  TrendingUp,
  Calendar,
  Mail,
  Trash2,
  Clock,
  Phone,
  Check,
  X,
  Copy,
  Maximize2,
  Filter,
  CheckCircle,
  Circle
} from "lucide-react";
import { User } from '@supabase/supabase-js';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'messages'>('dashboard');
  const [visitsStats, setVisitsStats] = useState({ total: 0, monthly: 0 });
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [copyNotification, setCopyNotification] = useState<string | null>(null);
  const [messageFilter, setMessageFilter] = useState<'all' | 'unread' | 'read'>('all');
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        router.push('/admin');
        return;
      }
      setUser(session.user);
      setIsLoading(false);
    };

    getUser();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        if (event === 'SIGNED_OUT' || !session?.user) {
          router.push('/admin');
        } else {
          setUser(session.user);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router, supabase.auth]);

  // Charger les statistiques de visites
  useEffect(() => {
    const loadVisitsStats = async () => {
      const stats = await getVisitsStats();
      setVisitsStats(stats);
    };

    if (user) {
      loadVisitsStats();
    }
  }, [user]);

  // Charger les messages
  useEffect(() => {
    const loadMessages = async () => {
      if (activeTab === 'messages') {
        setMessagesLoading(true);
        const messagesData = await getMessages();
        setMessages(messagesData);
        setMessagesLoading(false);
      }
    };

    if (user) {
      loadMessages();
    }
  }, [user, activeTab]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleMarkAsRead = async (messageId: string) => {
    await updateMessageStatus(messageId, 'read');
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, status: 'read' } : msg
    ));
  };

  const handleDeleteMessage = async (messageId: string) => {
    await deleteMessage(messageId);
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const handleOpenMessage = (message: Message) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
    // Marquer comme lu automatiquement si pas encore lu
    if (message.status === 'unread') {
      handleMarkAsRead(message.id);
    }
  };

  const handleCloseModal = () => {
    setShowMessageModal(false);
    setSelectedMessage(null);
  };

  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopyNotification(email);
      setTimeout(() => setCopyNotification(null), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center gap-3 text-white">
          <Loader2 className="h-8 w-8 animate-spin text-red-500" />
          <span className="text-lg">Chargement du dashboard...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // L'utilisateur sera redirigé par l'useEffect
  }

  return (
  <div className="min-h-screen bg-black text-white pt-56">
      {/* Header réutilisable */}
      <Header showCountdown={false} />
      
  <div>
        {/* Header spécifique au dashboard */}
        <div className="bg-gray-900/50 border-b border-gray-800/50 shadow-sm backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 lg:py-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 lg:p-3 bg-red-600/20 rounded-lg border border-red-600/30">
                  <LayoutDashboard className="h-5 w-5 lg:h-6 lg:w-6 text-red-400" />
                </div>
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-white">
                    Dashboard <span className="text-red-400">Admin</span>
                </h1>
                <p className="text-xs lg:text-sm text-gray-400">
                  SX Tour Douai 2025
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:gap-4">
              {/* Navigation Tabs */}
              <div className="flex bg-gray-800/50 rounded-lg p-1 border border-gray-700/50 w-full sm:w-auto">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex-1 sm:flex-none px-3 lg:px-4 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors ${
                    activeTab === 'dashboard'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`flex-1 sm:flex-none px-3 lg:px-4 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors relative ${
                    activeTab === 'messages'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  Messages
                  {messages.filter(m => m.status === 'unread').length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center">
                      {messages.filter(m => m.status === 'unread').length}
                    </span>
                  )}
                </button>
              </div>
              
              <div className="flex items-center justify-between w-full sm:w-auto gap-3">
                <div className="text-left sm:text-right">
                  <p className="text-xs lg:text-sm font-medium text-white truncate max-w-[150px] lg:max-w-none">
                    {user.email}
                  </p>
                  <Badge variant="secondary" className="text-xs bg-red-600/20 text-red-400 border-red-600/30">
                    <Shield className="h-3 w-3 mr-1" />
                    Admin
                  </Badge>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleSignOut}
                  className="flex items-center gap-1 lg:gap-2 bg-gray-800/50 border-gray-600/50 text-white hover:bg-gray-700/50 hover:border-gray-500 px-3 py-2 text-xs lg:text-sm"
                >
                  <LogOut className="h-3 w-3 lg:h-4 lg:w-4" />
                  <span className="hidden sm:inline">Déconnexion</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 pt-32">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Statistiques de visites */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-900/50 border-gray-800/50 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-400">
                      Visites Totales
                    </CardTitle>
                    <Eye className="h-4 w-4 text-blue-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">
                    {visitsStats.total.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Depuis le lancement
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800/50 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-400">
                      Visites ce Mois
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-green-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">
                    {visitsStats.monthly.toLocaleString()}
                  </div>
                  <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    Depuis le 1er du mois
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-6">
            {/* En-tête et filtres */}
            <div className="bg-gray-900/30 rounded-2xl p-4 lg:p-6 border border-gray-800/50">
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-white mb-2">Messages de contact</h2>
                  <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-sm">
                    <span className="text-gray-400">
                      {messages.length} message{messages.length !== 1 ? 's' : ''} au total
                    </span>
                    {messages.filter(m => m.status === 'unread').length > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-red-400 font-medium">
                          {messages.filter(m => m.status === 'unread').length} non lu{messages.filter(m => m.status === 'unread').length > 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Filtres */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Filter className="h-4 w-4" />
                    <span>Filtrer :</span>
                  </div>
                  <div className="flex bg-gray-800/50 rounded-lg p-1 border border-gray-700/50 w-full sm:w-auto">
                    <button
                      onClick={() => setMessageFilter('all')}
                      className={`flex-1 sm:flex-none px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                        messageFilter === 'all'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                      }`}
                    >
                      Tous
                    </button>
                    <button
                      onClick={() => setMessageFilter('unread')}
                      className={`flex-1 sm:flex-none px-3 py-2 rounded-md text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
                        messageFilter === 'unread'
                          ? 'bg-red-600 text-white shadow-sm'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                      }`}
                    >
                      <Circle className="h-3 w-3" />
                      <span className="hidden sm:inline">Non lus</span>
                      <span className="sm:hidden">Non lus</span>
                    </button>
                    <button
                      onClick={() => setMessageFilter('read')}
                      className={`flex-1 sm:flex-none px-3 py-2 rounded-md text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
                        messageFilter === 'read'
                          ? 'bg-green-600 text-white shadow-sm'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                      }`}
                    >
                      <CheckCircle className="h-3 w-3" />
                      <span className="hidden sm:inline">Lus</span>
                      <span className="sm:hidden">Lus</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {messagesLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-red-500 mx-auto mb-4" />
                  <p className="text-gray-400">Chargement des messages...</p>
                </div>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MessageSquare className="h-8 w-8 text-gray-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Aucun message
                  </h3>
                  <p className="text-gray-400">
                    Les messages envoyés depuis la page contact apparaîtront ici.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 lg:space-y-4">
                {messages
                  .filter(message => {
                    if (messageFilter === 'unread') return message.status === 'unread';
                    if (messageFilter === 'read') return message.status === 'read';
                    return true;
                  })
                  .map((message) => (
                  <div 
                    key={message.id} 
                    className={`group relative bg-white border rounded-2xl p-4 lg:p-6 transition-all duration-300 hover:shadow-xl cursor-pointer transform hover:-translate-y-1 ${
                      message.status === 'unread' 
                        ? 'border-red-200 shadow-lg ring-1 ring-red-100' 
                        : 'border-gray-200 hover:border-gray-300 shadow-sm'
                    }`}
                    onClick={() => handleOpenMessage(message)}
                  >
                    {/* Badge de statut en haut à droite */}
                    <div className="absolute top-3 lg:top-4 right-3 lg:right-4">
                      {message.status === 'unread' ? (
                        <div className="flex items-center gap-1 lg:gap-2">
                          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                          <span className="bg-red-100 text-red-700 px-2 py-1 text-xs font-medium rounded-full border border-red-200">
                            Non lu
                          </span>
                        </div>
                      ) : (
                        <span className="bg-green-100 text-green-700 px-2 py-1 text-xs font-medium rounded-full border border-green-200 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Lu
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-start gap-3 lg:gap-4 pr-16 lg:pr-20">
                      {/* Avatar */}
                      <div className="flex-shrink-0 self-start sm:self-auto">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                          <Mail className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                        </div>
                      </div>

                      {/* Contenu */}
                      <div className="flex-1 min-w-0">
                        {/* En-tête */}
                        <div className="flex flex-col gap-2 mb-3">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <h3 className="text-base lg:text-lg font-semibold text-gray-900 truncate">
                              {message.sender}
                            </h3>
                            {message.email && (
                              <div className="relative">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCopyEmail(message.email!);
                                  }}
                                  className="text-xs lg:text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 bg-blue-50 px-2 lg:px-3 py-1 rounded-full border border-blue-200 hover:bg-blue-100 flex items-center gap-1 lg:gap-2 w-fit"
                                >
                                  <Copy className="h-3 w-3" />
                                  <span className="truncate max-w-[120px] sm:max-w-[180px] lg:max-w-none">
                                    {message.email}
                                  </span>
                                </button>
                                {copyNotification === message.email && (
                                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap z-10 shadow-lg">
                                    Copié !
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-600"></div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Aperçu du contenu */}
                        <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-3 lg:mb-4 line-clamp-2">
                          {message.content}
                        </p>

                        {/* Métadonnées */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 lg:gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span className="whitespace-nowrap">
                              {new Date(message.created_at).toLocaleString('fr-FR', {
                                day: '2-digit',
                                month: '2-digit', 
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </span>
                          {message.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span className="truncate">{message.phone}</span>
                            </span>
                          )}
                          <span className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="h-3 w-3" />
                            <span className="hidden sm:inline">Cliquer pour ouvrir</span>
                            <span className="sm:hidden">Ouvrir</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions rapides au survol */}
                    <div className="absolute bottom-3 lg:bottom-4 right-3 lg:right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMessage(message.id);
                        }}
                        className="h-7 w-7 lg:h-8 lg:w-8 p-0 bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-full shadow-md"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Message si aucun résultat avec le filtre */}
            {messages.length > 0 && 
             messages.filter(message => {
               if (messageFilter === 'unread') return message.status === 'unread';
               if (messageFilter === 'read') return message.status === 'read';
               return true;
             }).length === 0 && (
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="h-6 w-6 text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Aucun message trouvé
                </h3>
                <p className="text-gray-400">
                  Aucun message ne correspond au filtre sélectionné.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal pour afficher le message en grand */}
      {showMessageModal && selectedMessage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 lg:p-4">
          <div className="bg-white rounded-xl lg:rounded-2xl max-w-4xl w-full max-h-[95vh] lg:max-h-[90vh] overflow-hidden shadow-2xl">
            {/* En-tête du modal */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 lg:p-6 border-b border-gray-200 gap-3">
              <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 lg:h-5 lg:w-5 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base lg:text-lg font-semibold text-gray-900 truncate">
                    Message de {selectedMessage.sender}
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-500">
                    {new Date(selectedMessage.created_at).toLocaleDateString('fr-FR', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
              >
                <X className="h-4 w-4 lg:h-5 lg:w-5" />
              </button>
            </div>

            {/* Contenu du modal */}
            <div className="p-4 lg:p-6 overflow-y-auto max-h-[calc(95vh-120px)] lg:max-h-[calc(90vh-200px)]">
              {/* Informations de contact */}
              <div className="mb-4 lg:mb-6 p-3 lg:p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Informations de contact</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Nom</span>
                    <p className="text-sm font-medium text-gray-900 truncate">{selectedMessage.sender}</p>
                  </div>
                  {selectedMessage.email && (
                    <div className="sm:col-span-2 md:col-span-1">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Email</span>
                      <div className="relative">
                        <button
                          onClick={() => handleCopyEmail(selectedMessage.email!)}
                          className="block text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 bg-blue-50 px-2 lg:px-3 py-1 rounded-md border border-blue-200 hover:bg-blue-100 mt-1 w-full"
                        >
                          <span className="flex items-center gap-1 lg:gap-2 justify-center sm:justify-start">
                            <Copy className="h-3 w-3" />
                            <span className="truncate">{selectedMessage.email}</span>
                          </span>
                        </button>
                        {copyNotification === selectedMessage.email && (
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap z-10 shadow-lg">
                            Copié !
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-600"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {selectedMessage.phone && (
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Téléphone</span>
                      <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        <span className="truncate">{selectedMessage.phone}</span>
                      </p>
                    </div>
                  )}
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Statut</span>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium mt-1 ${
                      selectedMessage.status === 'unread' 
                        ? 'bg-red-100 text-red-700 border border-red-200' 
                        : 'bg-green-100 text-green-700 border border-green-200'
                    }`}>
                      {selectedMessage.status === 'unread' ? 'Non lu' : 'Lu'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sujet si présent */}
              {selectedMessage.subject && (
                <div className="mb-4 lg:mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Sujet</h4>
                  <p className="text-sm lg:text-base text-gray-900 font-medium break-words">{selectedMessage.subject}</p>
                </div>
              )}

              {/* Contenu du message */}
              <div className="mb-4 lg:mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Message</h4>
                <div className="bg-white border border-gray-200 rounded-lg p-3 lg:p-4">
                  <p className="text-sm lg:text-base text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                    {selectedMessage.content}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-gray-200">
                {selectedMessage.status === 'unread' && (
                  <Button
                    onClick={() => {
                      handleMarkAsRead(selectedMessage.id);
                      setSelectedMessage({ ...selectedMessage, status: 'read' });
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm lg:text-base"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Marquer comme lu
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => {
                    handleDeleteMessage(selectedMessage.id);
                    handleCloseModal();
                  }}
                  className="border-red-200 text-red-700 hover:bg-red-50 text-sm lg:text-base"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer le message
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification de copie globale - supprimée car maintenant inline */}
      </div>
    </div>
  );
}
