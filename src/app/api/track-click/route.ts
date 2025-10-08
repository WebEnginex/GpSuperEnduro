import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { ticketType } = await request.json();

    // Validation du type de billet
    const validTicketTypes = ['premium', 'category_1', 'category_2', 'category_3'];
    if (!validTicketTypes.includes(ticketType)) {
      return NextResponse.json({ error: 'Type de billet invalide' }, { status: 400 });
    }

    // Récupération des informations de la requête
    const userAgent = request.headers.get('user-agent') || null;
    const referrer = request.headers.get('referer') || null;
    
    // Récupération de l'IP (en tenant compte des proxys)
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ipAddress = forwardedFor?.split(',')[0] || realIp || null;

    // Génération d'un session_id basé sur les headers (pour éviter les doublons rapides)
    const sessionData = `${userAgent}-${ipAddress}-${Date.now()}`;
    const sessionId = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(sessionData))
      .then(buffer => {
        const hashArray = Array.from(new Uint8Array(buffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 32);
      });

    // Insertion dans la base de données
    const { error } = await supabase
      .from('ticket_clicks')
      .insert({
        ticket_type: ticketType,
        user_agent: userAgent,
        ip_address: ipAddress,
        referrer: referrer,
        session_id: sessionId
      });

    if (error) {
      console.error('Erreur lors de l\'insertion du clic:', error);
      return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Erreur API track-click:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}