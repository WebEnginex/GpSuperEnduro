'use client';

import { useEffect } from 'react';
import { trackVisit } from '@/lib/supabase/admin';

export const useVisitTracker = () => {
  useEffect(() => {
    // Vérifier si la visite a déjà été enregistrée dans cette session
    const visitTracked = sessionStorage.getItem('visitTracked');
    
    if (!visitTracked) {
      trackVisit();
      sessionStorage.setItem('visitTracked', 'true');
    }
  }, []);
};
