'use client';

import { useState } from 'react';
import { createMessage } from '@/lib/supabase/admin';
import { Badge } from "@/components/ui/badge";
import { Loader2, Send, Mail, Phone, MapPin, Clock, Users, Wifi, Car, Bus } from "lucide-react";

// Composants de formulaire locaux
const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`flex h-10 w-full rounded-md border border-gray-700 bg-gray-800/50 text-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Textarea = ({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    className={`flex min-h-[80px] w-full rounded-md border border-gray-700 bg-gray-800/50 text-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${className}`}
    {...props}
  />
);

const Label = ({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300 ${className}`}
    {...props}
  />
);

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

export default function Contact() {
  const [formData, setFormData] = useState({
    sender: '',
    email: '',
    subject: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await createMessage(formData);
      setSubmitStatus('success');
      setFormData({ sender: '', email: '', subject: '', content: '' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative bg-black py-16 pt-56 sm:pt-60 lg:pt-64">
        {/* Image de fond avec overlay */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-[url('/images/supercross-bg.jpg')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4 bg-red-600/20 text-red-400 border-red-600/30">
            Supercross Douai 2025
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-red-600">Contact</span> & Support
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Une question sur l&apos;événement, la billetterie ou les modalités pratiques ? Notre équipe est là pour vous accompagner.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulaire de Contact */}
            <div className="order-2 lg:order-1">
              <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Envoyez-nous un message
                </h2>
                
                {submitStatus === 'success' && (
                  <Alert className="mb-6 border-green-600/30 bg-green-600/20">
                    <AlertDescription className="text-green-400">
                      Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                    </AlertDescription>
                  </Alert>
                )}

                {submitStatus === 'error' && (
                  <Alert className="mb-6 border-red-600/30 bg-red-600/20">
                    <AlertDescription className="text-red-400">
                      Une erreur est survenue lors de l&apos;envoi. Veuillez réessayer ou nous contacter directement.
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sender">Nom complet *</Label>
                      <Input
                        id="sender"
                        name="sender"
                        type="text"
                        value={formData.sender}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        placeholder="Votre nom et prénom"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        placeholder="votre@email.fr"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Sujet *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                      placeholder="Objet de votre message"
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Message *</Label>
                    <Textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      required
                      className="mt-1 min-h-[120px]"
                      placeholder="Décrivez votre demande en détail..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Informations de Contact */}
            <div className="order-1 lg:order-2">
              <div className="space-y-8">
                {/* Contact Principal */}
                <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Informations de Contact
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-red-600/20 p-3 rounded-lg">
                        <Mail className="h-5 w-5 text-red-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Email</h3>
                        <p className="text-gray-300">contact@sxtour-douai.fr</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-red-600/20 p-3 rounded-lg">
                        <Phone className="h-5 w-5 text-red-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Téléphone</h3>
                        <p className="text-gray-300">03 27 XX XX XX</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-red-600/20 p-3 rounded-lg">
                        <MapPin className="h-5 w-5 text-red-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Lieu</h3>
                        <p className="text-gray-300">
                          Circuit de Supercross<br />
                          Douai, France
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Horaires */}
                <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Horaires d&apos;Ouverture
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Clock className="h-5 w-5 text-red-400" />
                      <div>
                        <p className="font-semibold text-white">Jour de l&apos;événement</p>
                        <p className="text-gray-300">09h00 - 18h00</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Services Disponibles
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-red-400" />
                      <span className="text-sm text-gray-300">Groupes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wifi className="h-4 w-4 text-red-400" />
                      <span className="text-sm text-gray-300">WiFi gratuit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-red-400" />
                      <span className="text-sm text-gray-300">Parking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bus className="h-4 w-4 text-red-400" />
                      <span className="text-sm text-gray-300">Transport</span>
                    </div>
                  </div>
                </div>

                {/* FAQ Rapide */}
                <div className="bg-gray-900/30 rounded-xl border border-gray-800 p-8">
                  <h2 className="text-xl font-bold text-white mb-4">
                    Questions Fréquentes
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-white text-sm">Puis-je modifier ma réservation ?</h4>
                      <p className="text-gray-300 text-sm">Oui, jusqu&apos;à 48h avant l&apos;événement.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">Où récupérer mes billets ?</h4>
                      <p className="text-gray-300 text-sm">À l&apos;accueil le jour J ou par email.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">L&apos;événement a-t-il lieu par tous les temps ?</h4>
                      <p className="text-gray-300 text-sm">Oui, l&apos;événement est maintenu sauf conditions extrêmes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
