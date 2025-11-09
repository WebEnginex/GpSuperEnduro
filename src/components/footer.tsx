import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section principale avec 3 colonnes sur desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Date et Horaires */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center justify-center gap-2">
                <span>Date et Horaires</span> 
              </h3>
              <div className="space-y-2 text-slate-300 text-sm">
                <p>7 Mars 2026</p>
                <p className="text-xs text-slate-400">Ouverture des portes :</p>
                <p className="text-xs">Pass Premium : 13h00</p>
                <p className="text-xs">Catégorie 1, 2 et 3 : 17h30</p>
              </div>
            </div>

            {/* Adresse */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center justify-center gap-2">
                <span>Adresse</span> 
              </h3>
              <div className="space-y-2 text-slate-300 text-sm">
                <a 
                  href="https://www.google.com/maps/dir//Gayant+Expo+Concerts,+Rives+de+Gayant,+59500+Douai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 hover:text-red-400 transition-colors duration-300 cursor-pointer"
                >
                  <span className="font-semibold">Gayant Expo Concerts</span>
                  <span>Rives de Gayant</span>
                  <span>59500 Douai</span>
                </a>
              </div>
            </div>

            {/* Suivez nous */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-red-400 mb-4">
                Suivez nous
              </h3>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                <a 
                  href="https://www.facebook.com/GP.France.SuperEnduro/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 text-sm"
                  aria-label="Suivez-nous sur Facebook"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
                
                <a 
                  href="https://www.instagram.com/superendurogpfrance/?hl=en" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 text-sm"
                  aria-label="Suivez-nous sur Instagram"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988 6.62 0 11.99-5.367 11.99-11.988C24.007 5.367 18.639.001 12.017.001zm5.12 15.988c-.063.178-.166.327-.297.446-.131.12-.291.215-.478.283a5.94 5.94 0 01-.637.18c-.228.047-.468.071-.722.071H7.556c-.254 0-.494-.024-.722-.071a5.93 5.93 0 01-.637-.18 1.775 1.775 0 01-.478-.283 1.775 1.775 0 01-.297-.446c-.069-.181-.133-.386-.192-.614a8.836 8.836 0 01-.116-.72c-.024-.256-.036-.524-.036-.806V8.15c0-.282.012-.55.036-.806.035-.24.07-.475.116-.72.059-.228.123-.433.192-.614.063-.178.166-.327.297-.446.131-.12.291-.215.478-.283.203-.078.416-.133.637-.18.228-.047.468-.071.722-.071h8.447c.254 0 .494.024.722.071.221.047.434.102.637.18.187.068.347.163.478.283.131.119.234.268.297.446.069.181.133.386.192.614.046.245.081.48.116.72.024.256.036.524.036.806v7.688c0 .282-.012.55-.036.806a8.84 8.84 0 01-.116.72c-.059.228-.123.433-.192.614zM12 7.435a4.564 4.564 0 100 9.13 4.564 4.564 0 000-9.13zm0 7.532a2.968 2.968 0 110-5.936 2.968 2.968 0 010 5.936zm5.834-7.838a1.066 1.066 0 11-2.132 0 1.066 1.066 0 012.132 0z"/>
                  </svg>
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Section du bas - Logo et Call to action */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Image
                src="/images/logos/SuperEnduro-logo.png"
                alt="SuperEnduro Logo"
                width={400}
                height={160}
                className="h-32 sm:h-40 w-auto"
              />
            </div>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-6">
              Restez connectés pour ne rien manquer de l&apos;événement SuperEnduro le plus spectaculaire de France
            </p>
            
            {/* Call to action */}
            <div className="inline-flex items-center px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700/50">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse mr-3"></div>
              <span className="text-slate-300 text-sm">
                Billeterie disponible en ligne à partir du 6 Octobre 2025
              </span>
            </div>
          </div>
        </div>
        
        {/* Séparateur et Copyright */}
        <div className="max-w-4xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-6"></div>
          
          <div className="text-center">
            <p className="text-slate-400 text-sm leading-relaxed">
              © 2025 <span className="text-slate-300 font-medium">Gp SuperEnduro</span> • Tous droits réservés
            </p>
            <p className="text-slate-500 text-xs mt-2">
              Conçu avec passion pour les amateurs d&apos;enduro
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
