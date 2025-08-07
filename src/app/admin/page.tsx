'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Mail, Loader2 } from "lucide-react";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

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
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          router.push('/admin/dashboard');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router, supabase.auth]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 flex items-center justify-center">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 p-3 bg-red-100 dark:bg-red-900/30 rounded-full w-fit">
            <Lock className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Administration
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Accès réservé aux administrateurs SX Tour Douai
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/30">
              <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-blue-800 dark:text-blue-200">
                Connectez-vous avec votre adresse email autorisée pour accéder au dashboard administrateur.
              </AlertDescription>
            </Alert>
            
            <Auth
              supabaseClient={supabase}
              view="sign_in"
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#dc2626',
                      brandAccent: '#b91c1c',
                    }
                  }
                },
                className: {
                  container: 'space-y-4',
                  button: 'bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700',
                  input: 'border-slate-300 dark:border-slate-600',
                }
              }}
              localization={{
                variables: {
                  sign_in: {
                    email_label: 'Adresse email',
                    password_label: 'Mot de passe',
                    button_label: 'Se connecter',
                    loading_button_label: 'Connexion en cours...',
                    social_provider_text: 'Se connecter avec {{provider}}',
                    link_text: "Vous avez déjà un compte ? Connectez-vous",
                    email_input_placeholder: 'Votre adresse email',
                    password_input_placeholder: 'Votre mot de passe'
                  },
                  sign_up: {
                    email_label: 'Adresse email',
                    password_label: 'Mot de passe',
                    button_label: "S'inscrire",
                    loading_button_label: 'Inscription en cours...',
                    social_provider_text: "S'inscrire avec {{provider}}",
                    link_text: "Vous n'avez pas de compte ? Inscrivez-vous",
                    confirmation_text: 'Vérifiez votre email pour le lien de confirmation'
                  }
                }
              }}
              providers={[]}
              redirectTo={typeof window !== 'undefined' ? `${window.location.origin}/admin/dashboard` : '/admin/dashboard'}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
