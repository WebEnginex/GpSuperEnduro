import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          <Badge variant="secondary" className="mb-4">
            Nous Contacter
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100">
            <span className="text-red-600 dark:text-red-400">Contact</span> & Informations
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Une question ? Un renseignement ? Notre équipe est là pour vous aider !
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Informations générales */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-blue-600 dark:text-blue-400 flex items-center gap-2">
                📧 Informations Générales
              </CardTitle>
              <CardDescription>
                Pour toutes vos questions sur l&apos;événement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="font-medium">Email :</p>
                <a 
                  href="mailto:info@supercross-douai.fr" 
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  info@supercross-douai.fr
                </a>
              </div>
              <div className="space-y-2">
                <p className="font-medium">Téléphone :</p>
                <a 
                  href="tel:+33327123456" 
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  03 27 12 34 56
                </a>
              </div>
              <Button variant="outline" className="w-full">
                Nous écrire
              </Button>
            </CardContent>
          </Card>

          {/* Billeterie */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-green-600 dark:text-green-400 flex items-center gap-2">
                🎫 Service Billeterie
              </CardTitle>
              <CardDescription>
                Aide à la réservation et questions sur les billets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="font-medium">Email :</p>
                <a 
                  href="mailto:billeterie@supercross-douai.fr" 
                  className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                >
                  billeterie@supercross-douai.fr
                </a>
              </div>
              <div className="space-y-2">
                <p className="font-medium">Horaires :</p>
                <p className="text-slate-600 dark:text-slate-300">
                  Lun-Ven : 9h-18h<br />
                  Sam : 9h-12h
                </p>
              </div>
              <Button variant="outline" className="w-full">
                Support billeterie
              </Button>
            </CardContent>
          </Card>

          {/* Presse & Médias */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-purple-600 dark:text-purple-400 flex items-center gap-2">
                📺 Presse & Médias
              </CardTitle>
              <CardDescription>
                Accréditations et demandes médias
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="font-medium">Email :</p>
                <a 
                  href="mailto:presse@supercross-douai.fr" 
                  className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                >
                  presse@supercross-douai.fr
                </a>
              </div>
              <div className="space-y-2">
                <p className="font-medium">Contact :</p>
                <p className="text-slate-600 dark:text-slate-300">
                  Marie Dupont<br />
                  Responsable Communication
                </p>
              </div>
              <Button variant="outline" className="w-full">
                Demande d&apos;accréditation
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Localisation */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Nous Trouver
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            L&apos;événement se déroulera au complexe sportif de Douai
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Adresse */}
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600 dark:text-red-400">
                📍 Adresse
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="font-medium">Complexe Sportif de Douai</p>
                <p className="text-slate-600 dark:text-slate-300">
                  Avenue des Sports<br />
                  59500 Douai<br />
                  France
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-medium">Transport :</p>
                <ul className="text-slate-600 dark:text-slate-300 space-y-1">
                  <li>🚗 Parking gratuit sur place</li>
                  <li>🚌 Ligne de bus 12 - Arrêt Sports</li>
                  <li>🚂 Gare SNCF à 10 min en voiture</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Accès et services */}
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600 dark:text-red-400">
                ♿ Accessibilité & Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Accès PMR disponible
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Restauration sur place
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Boutique officielle
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Espaces familles
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Wifi gratuit
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-900 dark:bg-slate-950 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Les réponses aux questions les plus posées
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-2">
                  Peut-on annuler nos billets ?
                </h3>
                <p className="text-slate-300">
                  Les billets sont remboursables jusqu&apos;à 48h avant l&apos;événement, 
                  sauf en cas d&apos;annulation de notre part.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-2">
                  Y a-t-il une limite d&apos;âge ?
                </h3>
                <p className="text-slate-300">
                  Aucune limite d&apos;âge. Les enfants de moins de 3 ans 
                  entrent gratuitement sur les genoux d&apos;un adulte.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-2">
                  Que faire en cas de pluie ?
                </h3>
                <p className="text-slate-300">
                  L&apos;événement se déroule en extérieur mais des abris 
                  sont prévus. En cas de conditions météo extrêmes, nous informerons sur notre site.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-2">
                  Peut-on apporter à manger ?
                </h3>
                <p className="text-slate-300">
                  La nourriture extérieure n&apos;est pas autorisée. 
                  Plusieurs stands de restauration seront disponibles sur place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
