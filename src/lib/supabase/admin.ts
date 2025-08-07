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
  status: 'unread' | 'read' | 'archived';
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
