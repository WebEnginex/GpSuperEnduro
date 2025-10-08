import { createClient } from '@/lib/supabase/client';

// Types
export interface Visit {
  id: string;
  timestamp: string;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  created_at: string;
  email?: string;
  subject?: string;
  phone?: string;
  status: 'unread' | 'read' | 'archived';
}

export interface TicketClickStats {
  ticketType: string;
  totalClicks: number;
  monthlyClicks: number;
}

interface TicketClick {
  ticket_type: string;
  clicked_at: string;
}

// Fonctions pour les visites
export const trackVisit = async () => {
  const supabase = createClient();
  
  try {
    const { error } = await supabase
      .from('visits')
      .insert([{ timestamp: new Date().toISOString() }]);
    
    if (error) {
      console.error('Erreur lors de l\'enregistrement de la visite:', error);
    }
  } catch (error) {
    console.error('Erreur inattendue:', error);
  }
};

export const getVisitsStats = async () => {
  const supabase = createClient();
  
  try {
    // Total des visites
    const { count: totalVisits } = await supabase
      .from('visits')
      .select('*', { count: 'exact', head: true });

    // Visites ce mois
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { count: monthlyVisits } = await supabase
      .from('visits')
      .select('*', { count: 'exact', head: true })
      .gte('timestamp', startOfMonth.toISOString());

    return {
      total: totalVisits || 0,
      monthly: monthlyVisits || 0
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    return { total: 0, monthly: 0 };
  }
};

// Fonctions pour les statistiques de clics sur les billets
export const getTicketClicksStats = async (): Promise<TicketClickStats[]> => {
  const supabase = createClient();
  
  try {
    console.log('Début de getTicketClicksStats...');
    
    // Récupérer tous les clics groupés par type de billet
    const { data: allClicks, error: allClicksError } = await supabase
      .from('ticket_clicks')
      .select('ticket_type, clicked_at')
      .order('ticket_type');

    console.log('Tous les clics:', allClicks);

    if (allClicksError) {
      console.error('Erreur allClicks:', allClicksError);
      throw allClicksError;
    }

    // Récupérer les clics de ce mois groupés par type de billet
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { data: monthlyClicks, error: monthlyClicksError } = await supabase
      .from('ticket_clicks')
      .select('ticket_type, clicked_at')
      .gte('clicked_at', startOfMonth.toISOString())
      .order('ticket_type');

    console.log('Clics mensuels:', monthlyClicks);

    if (monthlyClicksError) {
      console.error('Erreur monthlyClicks:', monthlyClicksError);
      throw monthlyClicksError;
    }

    // Compter les clics par type de billet (utiliser les vrais ticketType)
    const ticketTypes = [
      { key: 'premium', label: 'Premium' },
      { key: 'category_1', label: 'Catégorie 1' },
      { key: 'category_2', label: 'Catégorie 2' },
      { key: 'category_3', label: 'Catégorie 3' }
    ];
    const stats: TicketClickStats[] = [];

    for (const ticket of ticketTypes) {
      const totalClicks = allClicks?.filter((click: TicketClick) => click.ticket_type === ticket.key).length || 0;
      const monthlyClicksCount = monthlyClicks?.filter((click: TicketClick) => click.ticket_type === ticket.key).length || 0;
      
      stats.push({
        ticketType: ticket.label,
        totalClicks,
        monthlyClicks: monthlyClicksCount
      });
    }

    console.log('Stats calculées:', stats);
    return stats;
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques de clics:', error);
    // Retourner des données par défaut pour tester l'affichage
    return [
      { ticketType: 'Premium', totalClicks: 0, monthlyClicks: 0 },
      { ticketType: 'Catégorie 1', totalClicks: 0, monthlyClicks: 0 },
      { ticketType: 'Catégorie 2', totalClicks: 0, monthlyClicks: 0 },
      { ticketType: 'Catégorie 3', totalClicks: 0, monthlyClicks: 0 }
    ];
  }
};

// Fonctions pour les messages
export const createMessage = async (messageData: Omit<Message, 'id' | 'created_at' | 'status'>) => {
  const supabase = createClient();
  
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([{
        ...messageData,
        status: 'unread'
      }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Erreur lors de la création du message:', error);
    throw error;
  }
};

export const getMessages = async () => {
  const supabase = createClient();
  
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error);
    return [];
  }
};

export const updateMessageStatus = async (messageId: string, status: Message['status']) => {
  const supabase = createClient();
  
  try {
    const { error } = await supabase
      .from('messages')
      .update({ status })
      .eq('id', messageId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut:', error);
    throw error;
  }
};

export const deleteMessage = async (messageId: string) => {
  const supabase = createClient();
  
  try {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', messageId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du message:', error);
    throw error;
  }
};
