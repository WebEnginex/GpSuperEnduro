'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Loader2 } from "lucide-react";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Header } from '@/components/header';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';

// Composant Alert local temporaire
const Alert = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`relative w-full rounded-lg border p-4 ${className}`} role="alert">
    {children}
  </div>
);

const AlertDescription = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`text-sm [&_p]:leading-relaxed ${className}`}>
    {children}
  </div>
);

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        router.push('/admin/dashboard');
      }
      setIsLoading(false);
    };

    checkUser();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        if (event === 'SIGNED_IN' && session?.user) {
          router.push('/admin/dashboard');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router, supabase.auth]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center gap-3 text-white">
          <Loader2 className="h-8 w-8 animate-spin text-red-500" />
          <span className="text-lg">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header réutilisable */}
      <Header showCountdown={false} />
      
      {/* Section noire sous le header */}
      <section className="relative bg-black py-16 pt-56 sm:pt-60 lg:pt-64">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4 bg-red-600/20 text-red-400 border-red-600/30">
            Espace Administrateur
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-red-600">Administration</span> Douai
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Accès sécurisé à l&apos;espace de gestion
          </p>
        </div>
      </section>

      {/* Section de connexion avec dégradé */}
      <section className="py-16 bg-gradient-to-b from-black via-gray-900/30 to-gray-900/50">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          {/* Carte de connexion */}
          <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm shadow-2xl">
            <CardContent className="p-8">
              <div className="space-y-6">
                <Alert className="border-blue-600/30 bg-blue-600/10 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <AlertDescription className="text-blue-200">
                      Connectez-vous avec votre adresse email autorisée pour accéder au dashboard administrateur.
                    </AlertDescription>
                  </div>
                </Alert>
                
                <div className="auth-container">
                  <Auth
                    supabaseClient={supabase as import('@supabase/supabase-js').SupabaseClient}
                    view="sign_in"
                    showLinks={false}
                    appearance={{
                      theme: ThemeSupa,
                      variables: {
                        default: {
                          colors: {
                            brand: '#dc2626',
                            brandAccent: '#b91c1c',
                            inputBackground: 'rgba(17, 24, 39, 0.8)',
                            inputBorder: 'rgba(75, 85, 99, 0.5)',
                            inputBorderFocus: '#dc2626',
                            inputText: '#ffffff',
                            inputLabelText: '#d1d5db',
                            inputPlaceholder: '#9ca3af',
                          }
                        }
                      },
                      className: {
                        container: 'space-y-4',
                        button: 'bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700 text-white font-semibold transition-all duration-300 hover:scale-105',
                        input: 'bg-gray-900/80 border-gray-600/50 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500/20',
                        label: 'text-gray-300 font-medium',
                        message: 'text-gray-300',
                        anchor: 'hidden',
                      }
                    }}
                    localization={{
                      variables: {
                        sign_in: {
                          email_label: 'Adresse email',
                          password_label: 'Mot de passe',
                          button_label: 'Se connecter',
                          loading_button_label: 'Connexion en cours...',
                          email_input_placeholder: 'Votre adresse email',
                          password_input_placeholder: 'Votre mot de passe'
                        }
                      }
                    }}
                    providers={[]}
                    redirectTo={typeof window !== 'undefined' ? `${window.location.origin}/admin/dashboard` : '/admin/dashboard'}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>© 2025 Supercross Douai - Tous droits réservés</p>
          </div>
        </div>
      </section>
    </div>
  );
}
