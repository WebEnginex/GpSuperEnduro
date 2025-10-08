import { useCallback } from 'react';

export type TicketType = 'premium' | 'category_1' | 'category_2' | 'category_3';

export const useTicketTracking = () => {
  const trackTicketClick = useCallback(async (ticketType: TicketType) => {
    try {
      const response = await fetch('/api/track-click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticketType }),
      });

      if (!response.ok) {
        console.warn('Erreur lors du tracking du clic:', response.statusText);
      }
    } catch (error) {
      console.warn('Erreur lors du tracking du clic:', error);
      // Ne pas bloquer l'utilisateur en cas d'erreur de tracking
    }
  }, []);

  return { trackTicketClick };
};