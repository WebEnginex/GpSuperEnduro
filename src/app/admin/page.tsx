'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Loader2, ArrowLeft } from "lucide-react";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
import Link from 'next/link';

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
      {/* Background avec pattern */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[url('/images/supercross-bg.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black"></div>
      </div>

      {/* Header simple pour l'admin */}
      <div className="relative z-10 border-b border-gray-800/50 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 text-white hover:text-red-400 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-lg font-semibold">Retour au site</span>
            </Link>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">
                Supercross <span className="text-red-600">Douai</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="w-full max-w-md">
          {/* En-tête avec badge */}
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-6 bg-red-600/20 text-red-400 border-red-600/30">
              Espace Administrateur
            </Badge>
            <h2 className="text-3xl font-bold mb-2">
              <span className="text-red-600">Administration</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Accès réservé aux administrateurs SX Tour Douai
            </p>
          </div>

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
      </div>
    </div>
  );
}
