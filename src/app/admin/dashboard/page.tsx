'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { getVisitsStats, getMessages, updateMessageStatus, deleteMessage, type Message } from '@/lib/supabase/admin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  LogOut,
  Loader2,
  Shield,
  Eye,
  TrendingUp,
  Calendar,
  Mail,
  Trash2,
  MoreVertical
} from "lucide-react";
import { User } from '@supabase/supabase-js';

// Composant Alert local temporaire
const LocalAlert = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`relative w-full rounded-lg border p-4 ${className}`} role="alert">
    {children}
  </div>
);

const LocalAlertDescription = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`text-sm [&_p]:leading-relaxed ${className}`}>
    {children}
  </div>
);

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'messages'>('dashboard');
  const [visitsStats, setVisitsStats] = useState({ total: 0, monthly: 0 });
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
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
      async (event, session) => {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 flex items-center justify-center">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Chargement du dashboard...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // L'utilisateur sera redirigé par l'useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <LayoutDashboard className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Dashboard Admin
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    SX Tour Douai 2025
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Navigation Tabs */}
              <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'dashboard'
                      ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-slate-100 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
                    activeTab === 'messages'
                      ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-slate-100 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  Messages
                  {messages.filter(m => m.status === 'unread').length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {messages.filter(m => m.status === 'unread').length}
                    </span>
                  )}
                </button>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {user.email}
                </p>
                <Badge variant="secondary" className="text-xs">
                  <Shield className="h-3 w-3 mr-1" />
                  Administrateur
                </Badge>
              </div>
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Statistiques de visites */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Visites Totales
                    </CardTitle>
                    <Eye className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    {visitsStats.total.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Depuis le lancement
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Visites ce Mois
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    {visitsStats.monthly.toLocaleString()}
                  </div>
                  <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 mt-1">
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
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Messages</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  {messages.length} message{messages.length !== 1 ? 's' : ''} au total
                </p>
              </div>
            </div>

            {messagesLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-slate-600 dark:text-slate-400" />
                <span className="ml-2 text-slate-600 dark:text-slate-400">Chargement des messages...</span>
              </div>
            ) : messages.length === 0 ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="py-12 text-center">
                  <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Aucun message
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Les messages envoyés depuis la page contact apparaîtront ici.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <Card key={message.id} className={`border-0 shadow-lg hover:shadow-xl transition-all ${
                    message.status === 'unread' ? 'bg-blue-50 dark:bg-blue-900/10 border-l-4 border-l-blue-500' : ''
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-slate-400" />
                              <span className="font-semibold text-slate-900 dark:text-slate-100">
                                {message.sender}
                              </span>
                              {message.email && (
                                <span className="text-sm text-slate-500 dark:text-slate-400">
                                  ({message.email})
                                </span>
                              )}
                            </div>
                            <Badge variant={message.status === 'unread' ? 'default' : 'secondary'}>
                              {message.status === 'unread' ? 'Non lu' : 'Lu'}
                            </Badge>
                          </div>
                          
                          {message.subject && (
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                              {message.subject}
                            </h4>
                          )}
                          
                          <p className="text-slate-600 dark:text-slate-400 mb-3 line-clamp-3">
                            {message.content}
                          </p>
                          
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {new Date(message.created_at).toLocaleString('fr-FR')}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          {message.status === 'unread' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMarkAsRead(message.id)}
                            >
                              Marquer comme lu
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteMessage(message.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
